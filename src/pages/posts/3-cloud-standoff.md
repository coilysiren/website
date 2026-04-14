---

template-key: blog-post
title: "3 Cloud Standoff: IAM Across AWS, GCP, and Azure"
date: 2026-04-13
description: >-
  A practical mapping of identity fundamentals across AWS, GCP, and Azure. What the words mean in each cloud, and where the mental models diverge.

---

The hardest part of moving between clouds isn't the compute or the networking. It's figuring out what "identity" even means in a given ecosystem. Maybe your company acquired something that runs on GCP. Maybe the data science team got a budget for Azure OpenAI. Maybe you're just tired of AWS. Either way, you have to relearn IAM from scratch, and the vocabulary is a minefield.

This post maps the three clouds against each other. I'll walk through each cloud's identity fundamentals, then line them up adjacent to each other, and finally call out the places where the mental models genuinely diverge (as opposed to just using different words for the same thing).

This post assumes you already understand IAM in at least one cloud. If you don't, start with [the AWS IAM docs](https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html). They're the most thorough and the concepts transfer reasonably well.

## The fundamentals, by cloud

### AWS

AWS has the oldest and most-copied identity model, so it's a reasonable starting point.

- **IAM User**. A long-lived identity, usually with an access key ID and secret access key. Meant for humans before SSO existed, and for machines that live outside AWS. Today, best practice is to have as few of these as possible.
- **IAM Role**. An identity with _no_ long-lived credentials. You _assume_ a role via STS (`sts:AssumeRole`), which hands you back temporary credentials (typically valid for one hour). Roles have a _trust policy_ that says who's allowed to assume them.
- **IAM Group**. A bag of users, used only for attaching policies. Groups are not identities; you can't "log in as" a group.
- **Instance Profile**. A wrapper around a role that lets an EC2 instance use it. The EC2 metadata service (IMDS) hands out temporary credentials based on the attached instance profile.
- **IAM Policy**. The permission document itself. Attached to users, groups, roles, or (for some services) to resources directly.
- **IAM Identity Center** (formerly AWS SSO). The modern way to give humans access. It federates from an external IdP and vends short-lived role sessions.

The basic AWS idea: **roles are portable identities that nothing owns**. An EC2 instance, a Lambda function, a pod in EKS, and a user from another AWS account can all assume the same role.

### GCP

GCP's identity model looks superficially similar to AWS, but the center of gravity is in a totally different place.

- **Google Account / Workspace User**. A human identity, managed entirely outside your GCP project (in Google Workspace or Cloud Identity). You can't create one "inside" a project the way you create an IAM user in AWS.
- **Service Account**. GCP's machine identity. This is the one that trips people up, because a service account is simultaneously:
  1. An _identity_ (it has an email like `my-sa@my-project.iam.gserviceaccount.com` and can be granted roles on resources), and
  2. A _resource_ (you can be granted roles _on_ the service account itself, such as `roles/iam.serviceAccountTokenCreator` to impersonate it).
- **Google Group**. A bag of users. Same idea as AWS IAM groups, but managed in Workspace rather than in GCP itself.
- **IAM Role**. In GCP, a "role" is _not_ an identity. It's a collection of permissions (what AWS would call a managed policy). Roles come in three flavors: basic (Owner/Editor/Viewer, avoid these), predefined (per-service, curated by Google), and custom.
- **IAM Binding / Allow Policy**. The grant itself. On each resource, there's an "allow policy" that says "principal X has role Y on this resource." This is the opposite direction from AWS, where policies are usually attached to the principal.
- **Workload Identity Federation**. Lets external identities (like a GitHub Actions OIDC token or an AWS IAM role) act as a GCP service account without a long-lived JSON key.

The basic GCP idea: **permissions are granted on resources, not on principals**. You walk up to a resource and say "who can do what here." That's the opposite of AWS, where you walk up to a principal and ask "what can this identity do."

### Azure

Azure has the most confusing vocabulary of the three, largely because the identity layer (Entra ID, formerly Azure AD) and the resource layer (Azure Resource Manager) were duct taped together later.

- **User**. A human identity in an Entra ID tenant. Managed at the tenant level, not the subscription level.
- **App Registration**. The _definition_ of an application in Entra ID. It lives in the tenant where the app was created ("home tenant") and describes the app's identity, permissions, and secrets. This is just a blueprint, it's not the thing that actually signs in.
- **Service Principal**. The _instance_ of an app registration in a given tenant. The service principal is what actually gets assigned permissions and signs in. If you see the Azure portal distinguish between "App registrations" and "Enterprise applications," that's this split: app registrations are definitions, enterprise applications are service principals.
- **Managed Identity**. A service principal whose credentials are managed entirely by Azure. You never see a secret. Comes in two flavors: _system-assigned_ (tied 1:1 to the lifecycle of a single Azure resource) and _user-assigned_ (a standalone resource you can attach to multiple things).
- **Azure RBAC Role**. Like GCP, this is a permission set, not an identity. Comes as built-in roles (curated by Microsoft) or custom roles.
- **Role Assignment**. The three-tuple of `(principal, role, scope)` that actually grants access. Scope can be management group, subscription, resource group, or individual resource.

The basic Azure idea: **identity and resource access are two separate systems stitched together by role assignments**. The identity lives in Entra ID; the thing it's allowed to do lives in Azure RBAC; the role assignment is the bridge.

## The adjacent view

Here's the side-by-side mapping. Rows are concepts; cells are the closest equivalent in each cloud.

| Concept                           | AWS                                         | GCP                                          | Azure                                               |
| --------------------------------- | ------------------------------------------- | -------------------------------------------- | --------------------------------------------------- |
| Human identity                    | IAM User _or_ Identity Center user          | Google / Workspace account                   | Entra ID user                                       |
| Grouping of humans                | IAM Group                                   | Google Group                                 | Entra ID security group                             |
| Long-lived machine identity       | IAM User with access keys                   | Service Account with JSON key                | Service Principal with client secret or certificate |
| Credential-less workload identity | IAM Role (via instance profile, IRSA, etc.) | Service Account attached to a workload       | Managed Identity                                    |
| Permission set / definition       | Managed or inline IAM policy                | IAM Role (predefined or custom)              | Azure RBAC role definition                          |
| Permission grant                  | Policy attached to principal (or resource)  | IAM binding on a resource                    | Role assignment `(principal, role, scope)`          |
| "Assume another identity"         | `sts:AssumeRole`                            | Service account impersonation                | No direct equivalent (see below)                    |
| Federation from external IdP      | IAM Identity Center, SAML, OIDC provider    | Workload Identity Federation                 | Entra ID external federation / B2B                  |
| Temporary credentials source      | STS                                         | Metadata server (OAuth2 access tokens)       | IMDS (bearer tokens)                                |
| Kubernetes workload identity      | IRSA or EKS Pod Identity                    | GKE Workload Identity                        | Entra Workload Identity                             |
| Cross-boundary access             | Role trust policy allowing external account | Grant role to principal from another project | Guest users or multi-tenant app registrations       |

## Where the mental models actually diverge

The table above makes things look tidier than they are. If you're going to get tripped up, it'll be on one of the following.

### 1. Which direction do permissions flow?

This is the biggest one.

- **AWS**: Policies mostly attach to the _principal_. "This user / role can do X, Y, Z across these resources." Resource-based policies (S3 bucket policies, KMS key policies, etc.) exist as an escape hatch, but the default direction is principal-first.
- **GCP**: Bindings attach to the _resource_. Every resource has an allow policy listing which principals have which roles. You almost never "look up what a service account can do" as a top-level operation. You look up resources and see who's on them.
- **Azure**: Role assignments are a three-tuple stored in the subscription. You can query them by principal, by role, or by scope with roughly equal effort. In practice, most teams think about them resource-first, like GCP.

Why this matters: your mental debugging process is different. In AWS, "why can't this thing do X?" usually starts with `aws iam get-role-policy`. In GCP, it usually starts with `gcloud projects get-iam-policy` on the _target_ resource. In Azure, it's `az role assignment list --assignee <principal>` or `--scope <resource>`.

### 2. Is the machine identity an "it" or a "thing"?

- **AWS IAM roles** are abstract. Nothing owns them. Multiple EC2 instances, Lambdas, and EKS pods can all assume the same role simultaneously, and the role doesn't know or care.
- **GCP service accounts** are real resources. They live in a project, they have an email, you can grant IAM roles _on_ them (like `roles/iam.serviceAccountUser` to let someone attach the SA to a VM), and you can impersonate them if you have the right permission. They feel more like "a user that happens to be a robot" than AWS's "a hat anyone can wear."
- **Azure managed identities** sit in the middle. System-assigned managed identities are tied to the lifecycle of exactly one Azure resource. Delete the VM, the identity is gone. User-assigned managed identities are standalone Azure resources that you can attach to multiple things, which makes them closer to AWS roles.

If you're coming from AWS and expect to "just assume the role from wherever," GCP and Azure will feel more constrained. If you're coming from GCP and expect your identity to have an email you can grant things to, AWS roles will feel invisible in a way that's hard to get used to.

### 3. Where does "a machine's identity" actually come from at runtime?

All three clouds have a metadata endpoint that hands out short-lived credentials to workloads running on their compute. The mechanism is remarkably similar across all three:

- **AWS**: IMDSv2 at `169.254.169.254`, returns STS credentials for the attached instance profile.
- **GCP**: Metadata server at `metadata.google.internal` (also `169.254.169.254`), returns OAuth2 access tokens for the attached service account.
- **Azure**: IMDS at `169.254.169.254`, returns bearer tokens for the attached managed identity.

They all default to a roughly one-hour token lifetime. They all require the SDK (or your own code) to refresh before expiry. They all fail in subtle ways if the workload's network egress to `169.254.169.254` is blocked, which is a fun thing to remember the first time you put a service mesh in front of a pod.

### 4. Kubernetes workload identity is a zoo

If you run Kubernetes on any of these, you'll eventually need to map a Kubernetes service account (KSA) to a cloud identity, so that pods can call cloud APIs without a mounted secret.

- **AWS** has two options that both work. [IRSA](https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html) uses an OIDC provider on the EKS cluster; pods get STS tokens via a projected service account token. [EKS Pod Identity](https://docs.aws.amazon.com/eks/latest/userguide/pod-identity.html) is the newer mechanism that removes the OIDC provider setup. IRSA is still more widely deployed.
- **GCP** has [Workload Identity](https://cloud.google.com/kubernetes-engine/docs/concepts/workload-identity), which maps a KSA to a GCP service account via an annotation. Under the hood it's also OIDC-based, but you don't manage the provider.
- **Azure** has [Entra Workload Identity](https://learn.microsoft.com/en-us/azure/aks/workload-identity-overview), which replaced the deprecated AAD Pod Identity. Like the others, it's OIDC-based. AKS publishes an issuer, and the federated credential on an Entra app or managed identity trusts tokens from that issuer bound to a specific KSA.

All three are "the same idea" (projected service account tokens + OIDC federation), but each has its own setup tax. Expect to do some real reading the first time you touch a new one.

### 5. Long-lived credentials: dangerous in different ways

Every cloud has a "here be dragons" credential type:

- **AWS IAM user access keys** are the oldest of these, and the worst-behaved. They live forever, they're often committed to git, and they're the reason [gitleaks](https://github.com/gitleaks/gitleaks) exists. Modern AWS guidance is: don't create them at all. Use Identity Center for humans and roles for machines.
- **GCP service account JSON keys** are the same problem in a different wrapper. They look innocuous (just a JSON file!) but they're long-lived bearer tokens that bypass every "no external access" control you have. [GCP now disables key creation by default at the org level](https://cloud.google.com/iam/docs/service-account-creds), and for good reason. Prefer impersonation or Workload Identity Federation.
- **Azure service principal client secrets** have the same failure mode. Prefer certificate-based auth or (ideally) managed identities, which never expose a credential in the first place.

The common thread: any time you're holding a credential that doesn't have an expiry measured in hours, you're holding a bomb.

## A worked example: "give this CI job read access to one bucket"

To make the differences concrete, here's the same task expressed three ways.

**AWS**: create an IAM role with a policy granting `s3:GetObject` on `arn:aws:s3:::my-bucket/*`, and a trust policy that allows your CI's OIDC provider (e.g. `token.actions.githubusercontent.com`) to assume it for a specific repo/branch. The CI job calls `sts:AssumeRoleWithWebIdentity` and gets temporary credentials.

**GCP**: create a Workload Identity Pool and Provider for your CI's OIDC issuer. Grant the external identity (e.g. a specific GitHub repo) the `roles/storage.objectViewer` role directly on the bucket, or have it impersonate a service account that has the role. The CI job exchanges its OIDC token for a GCP access token at the STS endpoint.

**Azure**: create an app registration (or user-assigned managed identity) with a federated credential trusting your CI's OIDC issuer for a specific repo/branch. Give the resulting service principal the `Storage Blob Data Reader` role, scoped to the storage account or container. The CI job exchanges its OIDC token for an Azure access token.

Notice the shape is identical: OIDC issuer, federation trust, role grant, scoped resource. The words and the order of operations are all different. This is why "I know AWS IAM, how hard can GCP be?" is a trap. The concepts transfer, but the muscle memory doesn't.

## Where to go next

An adjacent view only gets you to the point of being able to read signs. To actually _work_ in a second cloud, go read the primary docs for its identity system end to end:

- AWS: [IAM User Guide](https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html)
- GCP: [IAM overview](https://cloud.google.com/iam/docs/overview)
- Azure: [Azure RBAC overview](https://learn.microsoft.com/en-us/azure/role-based-access-control/overview) _and_ [Entra ID fundamentals](https://learn.microsoft.com/en-us/entra/fundamentals/whatis). You need both, because they're genuinely two separate systems.

And when you get stuck debugging a permission error in a cloud you don't live in full-time, remember which direction that cloud flows permissions. Half the "why isn't this working" problems across clouds come from looking at the wrong end of the grant.

---

_This post was drafted autonomously by Claude (Opus 4.6), then edited by me for tone and voice. The technical claims are mine to stand behind. If you find an error, [let me know](https://github.com/coilysiren)._
