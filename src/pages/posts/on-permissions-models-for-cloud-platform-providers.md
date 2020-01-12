---

template-key: blog-post
title: On Permissions Models for Cloud Platform Providers
date: 2020-01-12T03:16:57.613Z
description: >-
  If I were doing permissions for a cloud platform provider, I'd do them like this!

---

I was [recently reflecting](https://twitter.com/lynncyrin/status/1215860950684667904) on the fact that [AWS IAM](https://aws.amazon.com/iam/) has the best permissions model on the market, and wondering why I think most other platforms have such a dramatically inferior setup. I had never put much thought into this prior, so my first conclusion was _"wow everyone but Amazon is bad at this!"_.

Except that's not actually how the world works 🙂 In reality there are concrete tradeoffs and decisions that lead to products being in a certain state. And in situations like this? A well designed foundation will get you 90% of the way there. With that context I imagined: how would I design a platform such that future people working on it _(eg. without my direct assistance)_ would replicate the success and effectiveness of IAM? This post is me taking a shot at that.

## Guiding Principles

To start, there's a few principles we want to establish. The principles establish the direction and essence of our foundation, and all of the large design choices will flow from the principles. Some of the principles are lifted verbatim from AWS, which is to be expected since AWS is the clear leader in it's realm. Here they are:

- [all services must interact exclusively through public APIs](https://news.ycombinator.com/item?id=18916406)
- all service endpoints and clients must be created and validated with code generation
- all service operations must take fully qualified unique resource identifiers (RSIDs) as inputs
- all service operations must only use the resources passed in as RSIDs during their operation
- every unique independent resource within a service must be able to by specified via a RSID
- if a resource is a child of another resource, that must be encoded into the RSID
- every resource is a child of a "organization", which generally presents a company
- every unique independent action that can be taken on a service must have a unique action identifier (ACID)
- ACIDs must follow the Create Read Update Delete (CRUD) naming scheme, but may also include additional verbs such as "List"
- IAM is the only service that gets any degree of special treatment
- the code generation must wrap every service operation with the same IAM checks
- the platform must be capable of running itself
- service usage can be simplified for customers by creating aliases that group operations, but never by compromising on the functionality of the operations themselves
- everything defaults to allowing no access

## An example case

With the principles above, I want to detail an example case. Say our cloud platform (`cloudOps`) just launched, and we want to provide a database service (`kittenDB`) to our clients. Our platform itself also runs on that same database service! How do we go about setting that up? We start by defining all the RSIDs and ACIDs for both our permissions service (`IAM`) and our database service (`kittenDB`), both for our use and for use by our clients.

Service IAM has 3 resources: "users", "policies", and "organizations". Policies can be granted to users and organizations. The complete layout of ids is like so:

```
RSID::IAM::{{ organization }}::/organization/*
RSID::IAM::{{ organization }}::/user/*
RSID::IAM::{{ organization }}::/policy/*
RSID::IAM::{{ organization }}::/policy/{{ policy }}/user/*
RSID::IAM::{{ organization }}::/policy/{{ policy }}/organization/*

ACID::IAM::create-organization
ACID::IAM::list-organization
ACID::IAM::read-organization
ACID::IAM::update-organization
ACID::IAM::delete-organization

ACID::IAM::create-user
ACID::IAM::list-user
ACID::IAM::read-user
ACID::IAM::update-user
ACID::IAM::delete-user

ACID::IAM::create-policy
ACID::IAM::list-policy
ACID::IAM::read-policy
ACID::IAM::update-policy
ACID::IAM::delete-policy

ACID::IAM::attach-policy-to-user
ACID::IAM::attach-policy-to-organization
```

Service kittenDB has 2 resources: "maps" and "entries", in addition to the database itself. Entries are contained with maps. The complete layout of ids is like so:

```
RSID::KITTENDB::{{ organization }}::/database/*
RSID::KITTENDB::{{ organization }}::/map/*
RSID::KITTENDB::{{ organization }}::/map/{{ map }}/entry/*

ACID::KITTENDB::create-database
ACID::KITTENDB::read-database
ACID::KITTENDB::update-database
ACID::KITTENDB::delete-database

ACID::KITTENDB::create-map
ACID::KITTENDB::read-map
ACID::KITTENDB::update-map
ACID::KITTENDB::delete-map

ACID::KITTENDB::create-entry-in-map
ACID::KITTENDB::read-entry-in-map
ACID::KITTENDB::update-entry-in-map
ACID::KITTENDB::delete-entry-in-map
```

## Platform Bootstrapping

The very very first thing we need to do, is allow the platform to manage itself. And in the beginning... there is no platform! So someone at cloudOps need to run some commands to spin up the very first kittenDB instance. We'll assume this some employee on the physical cloudDB server running `make build` after doing `git clone kittenDB ...` or whatever.

From there we have to "hand load" a few policies into the database. Our goal here is to do all of the manual direct-to-database work required in order to let our users utilize the platform. It's important to recall here that cloudOps is using kittenDB as it's database, and every action requires a database call, so for even very mundane actions like "organization creation" we need to start defining access policies. We'll do this with a single instance "global policy" that applies to everyone. It'll look like this:

```yaml
# in case you're unacquainted, this is cloudformation syntax!

GlobalPolicy:
    Name: "global-policy"
    Type: "IAM::Policy"
    Properties:
        Rules:
            - Name: "allow-creating-organizations"
              Resources:
                # for any organization name
                - "IAM::*::/organization/*"
              Actions:
                # allow seeing if an organization of that name exists
                - "IAM::list-organization"
                # allow creating an organization with that name
                - "IAM::create-organization"
```

This would translate to API calls that, in a CLI for example, would look like this

```
cloud-ops iam create-organization --name "my-new-organization"
```

## More Policy Definitions

The last section described the most basic action for the platform: organization creation. From there we have a few more "personas" we need to consider. The personas represent either a distinct state for a given user, or a "machine user" created for a specific purpose. At any rate, they all need policies!

```yaml
# this is for an "admin" user for the organization
OrgAdmin:
    Name: "org-admin"
    Type: "IAM::Policy"
    Properties:
        Rules:
            - Name: "allow-managing-my-organization"
              Resources:
                # for anything within my organization
                - "IAM::my-new-organization::*"
              Actions:
                # allow me to do anything
                - "IAM::*"
            - Name: "allow-database-access"
              Resources:
                # for a database within my organization
                - "KITTENDB::my-new-organization::*"
              Actions:
                # allow "database" level actions such as creating and deleting
                # the database, but not reading its contents
                - "KITTENDB::*database*"

# this is for an "operator" user for the organization, such as an engineer
OrgOperator:
    Name: "org-operator"
    Type: "IAM::Policy"
    Properties:
        Rules:
            - Name: "allow-database-access"
              Resources:
                # for a database within my organization
                - "KITTENDB::my-new-organization::*"
              Actions:
                # allow me to see anything I might need to for debugging
                - "KITTENDB::*list*"
                - "KITTENDB::*read*"
```

```yaml
# these are for two distinct types of "machine user"

MachineUserReadAccess:
    Name: "machine-read-access"
    Type: "IAM::Policy"
    Properties:
        Rules:
            - Name: "database-read"
              Resources:
                # for a database within my organization
                - "KITTENDB::my-new-organization::*"
              Actions:
                # allow read actions
                - "KITTENDB::*read*"
                - "KITTENDB::*list*"

MachineUserWriteAccess:
    Name: "machine-write-access"
    Type: "IAM::Policy"
    Properties:
        Rules:
            - Name: "database-read"
              Resources:
                # for a database within my organization
                - "KITTENDB::my-new-organization::*"
              Actions:
                # allow read actions
                - "KITTENDB::*read*"
                - "KITTENDB::*list*"
            - Name: "database-contents-write"
              Resources:
                # for the contents of my organization's database
                - "KITTENDB::my-new-organization::/map/*"
              Actions:
                # allow all actions
                - "KITTENDB::*"
```

These policies would be pre-populated in the user's new organization, so they could assign them to people as needed. So you would create your new organization, and be presented with a list of policies like:

- org-admin
- org-operator
- machine-read-access
- machine-write-access
- etc etc

The policies would be editable and for whatever specific purpose the user requires. A fairly common one would likely be giving read / write access only to certain paths:

```yaml
Rules:
    - Name: "read-shared-paths"
      Resources:
        # for all shared paths
        - "KITTENDB::my-new-organization::/map/shared/*"
      Actions:
        # allow read actions
        - "KITTENDB::*read*"
        - "KITTENDB::*list*"
    - Name: "write-my-shared-paths"
      Resources:
        # for my shared paths
        - "KITTENDB::my-new-organization::/map/shared/my-paths/*"
      Actions:
        # allow all actions
        - "KITTENDB::*"
```

## Implementation Challenges

This is an "overview" level description of how one would setup a system like this, but there are a great many things that represent implementation challenges. Including:

- given the auto-generated stub kittenDB API endpoints, how do you implement the actual logic?
- given how "hot" the code and data paths will be for the IAM access systems, how do you keep performance high?
- how do you resolve intersecting / conflicting access policies, ideally in such a way that users can debug them?
- how do you consistently ensure that every single API endpoint effectively communicates to the user when there's a permissions issue?

Those are all "tactical" level challenges that will remain relevant for the entire course of the business. You'll need people dedicated to solving them, and also people working on expanding cloudOps out horizontally to support more types of data stores. That said! All of that ongoing work would happen on top of the existing strong fundamental permissions model, and you would be well suited to provide high flexibility access control for any client's business needs. You could also look into expanding the permissions model for more fine grain cases 👀 such as [attribute and tag based conditions](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_condition.html).
