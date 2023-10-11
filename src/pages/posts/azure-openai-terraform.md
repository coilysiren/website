---
template-key: blog-post
title: Deploying Azure OpenAI via Terraform
date: 2023-10-11
description: An end to end description of how to get Azure OpenAI deployed via Terraform

---

Hello! If you're here then I assume you are a reasonably experienced engineer, who is deploying Azure OpenAI for your day job. This blog post assumes that you are familiar with:

- cloud deployments in general
- terraform specifically

As such, this post functions primarily as a reference for the terraform configuration you would need. If you are looking for a more basic understanding of how terraform works, [then Hashicorp has some great tutorials for you!](https://developer.hashicorp.com/terraform/tutorials)

## Prerequisites

In order to get started here, you need to have already done a few things:

- [Setup terraform locally with the state backend that most fits your needs](https://developer.hashicorp.com/terraform/tutorials/state).
- Signed up for an Azure account.

  - Circa October 2023: a simple personal Azure account will not work here. The Azure OpenAI signup process requires that your Azure account have enterprise support. I would not recommend creating a totally new Azure account as a part of this process.

- [Created a subscription within Azure](https://learn.microsoft.com/en-us/microsoft-365/enterprise/subscriptions-licenses-accounts-and-tenants-for-microsoft-cloud-offerings?view=o365-worldwide). This post assumes you are using a paid subscription, which will need to be setup by someone in your company with billing permissions.
- [Installed the Azure CLI](https://learn.microsoft.com/en-us/cli/azure/), [and logged into it](https://learn.microsoft.com/en-us/cli/azure/authenticate-azure-cli).
- Been granted an Azure role [like the Contributor role](https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles) that allows you perform the relevant API actions within Azure. While it would be ideal to mention the fine grain access control you need to perform these actions, that is out of scope for this blog post. Someone with the `Owner` role on your subscription should be able to grant you the `Contributor` role.

The above steps will likely require the assistance of your finance and IT teams. Feel free to come back to this post once you've finished coordinating with them!

After setting up all of the above, then the should have all the fundamentals you need to deploy things! Lets go...

## Security Preface

...okay wait.

Before I mention the terraform itself, I must give an important caveat. The terraform configuration describes here is in its **_least secure configuration_**. Specifically, its in its least secure configuration with regards to network security. If you are following this configuration as-is, then you should only be doing so as a prototype. Essentially you deploying this to prove to your stakeholders, _"yes I have the skills required to deploy Azure OpenAI via Terraform"_. You must then follow-up via starting work up the network security improvements.

Having said that. Lets go...

## Terraform Configuration

...deploy this thing! This blog post presents the configuration as two terraform files. This is for display simplicity, and you really shouldn't be just stuffing everything into two adjacent files like this. The files have the following folder structure:

```bash
# folder structure

terraform/main.tf
terraform/modules/azure-openai/main.tf
```

And here are the files:

<!-- author note: my queendom for a HCL syntax highlighter... -->

```HCL
# file: terraform/main.tf

# Set required versions.
#
# docs: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3"
    }
  }
}

# Configure your Azure authentication. At my job we use multiple providers with
# the `alias` key to configure prod vs non-prod resources.
#
# docs: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs
provider "azurerm" {
  features {}
}

# Here we init our module which contains all of our actual resources. The keys
# here (eg. stage, vnet_cidr, etc) are all defined in our next file.
#
# docs: https://developer.hashicorp.com/terraform/language/modules
module "azure_openai" {
  source = "modules/azure-openai"

  # eg. prod, staging, dev, etc...
  stage = "prod"

  # Pick somewhere close to you, or close to your customers.
  # Use the following command to get locations:
  #
  #   $ az account list-locations -o table
  location = "westus"

  # The SKU is the pricing tier. I haven't been able to find a page or command
  # that provides a flat list of all the available SKUs. This page describes some
  # of them, though:
  #
  # https://learn.microsoft.com/en-us/azure/search/search-limits-quotas-capacity
  cognitive_sku = "S0"

  # This configuration is for our network architecture. A complete description
  # of what these numbers mean, and how to set them, is beyond the scope of this
  # post. But I will try my best to describe it in brief!
  #
  # A "vent" is a virtual network group. This network group needs an address,
  # similar to a street address. The "cidr" is that address, represented as a range.
  # A "subnet" or "sub network" is simply a sub group of the broader vnet.
  # A vnet is like a house. The vnet cdir is the address to that house. The
  # subnets are individual rooms within that house. The subnet cidr is the address
  # for each room. The cidrs are all ranges, so the subnet cidrs are ranges contained
  # within the vnet range. You can use a website like https://cidr.xyz/ to confirm this.
  #
  # ...This was a lot. It deserves its own post...!
  vnet_cidr    = "10.0.0.0/19"
  subnet0_cidr = "10.0.0.0/24"
  subnet1_cidr = "10.0.1.0/24"
  subnet2_cidr = "10.0.10.0/24"
  subnet3_cidr = "10.0.11.0/24"
}
```

```HCL
# file: terraform/modules/azure-openai/main.tf

# Set required versions. The module probably doesn't need to do this
# when the parent context is already doing it. But it's here anyway, can't hurt.
#
# docs: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3"
    }
  }
}

# These variables are the inputs for our module. Their context us best understood
# by looking at where they are used inside this module.
#
# docs: https://developer.hashicorp.com/terraform/language/values/variables
variable "stage"          { type = string }
variable "location"       { type = string }
variable "cognitive_sku"  { type = string }
variable "vnet_cidr"      { type = string }
variable "subnet0_cidr"   { type = string }
variable "subnet1_cidr"   { type = string }
variable "subnet2_cidr"   { type = string }
variable "subnet3_cidr"   { type = string }

###########
# PREFACE #
###########

# Past this point, documentation is mostly non-existent on my part.
# This is primarily due to the wall clock time I had available to write this post.
# All of these resources do deserve documentation to some extent!

####################
# SHARED RESOURCES #
####################

# docs: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/resource_group
resource "azurerm_resource_group" "default" {
  name     = "azure-openai-${var.stage}"
  location = var.location
}

# docs: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/virtual_network
resource "azurerm_virtual_network" "default" {
  name                = "azure-openai-${var.stage}"
  address_space       = [var.vnet_cidr]
  location            = azurerm_resource_group.default.location
  resource_group_name = azurerm_resource_group.default.name
}

# docs: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/route_table
resource "azurerm_route_table" "default" {
  name                = "azure-openai-${var.stage}"
  location            = azurerm_resource_group.default.location
  resource_group_name = azurerm_resource_group.default.name
}

# docs: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/route
resource "azurerm_route" "local" {
  name                = "local"
  resource_group_name = azurerm_resource_group.default.name
  route_table_name    = azurerm_route_table.default.name
  address_prefix      = var.vnet_cidr
  next_hop_type       = "VnetLocal"
}

# docs: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/route
resource "azurerm_route" "internet" {
  name                = "internet"
  resource_group_name = azurerm_resource_group.default.name
  route_table_name    = azurerm_route_table.default.name
  address_prefix      = "0.0.0.0/0"
  next_hop_type       = "Internet"
}

####################
# PUBLIC RESOURCES #
####################

# docs: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/subnet
resource "azurerm_subnet" "subnet2" {
  name                 = "subnet2"
  resource_group_name  = azurerm_resource_group.default.name
  virtual_network_name = azurerm_virtual_network.default.name
  address_prefixes     = [var.subnet2_cidr]
}

# docs: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/subnet
resource "azurerm_subnet" "subnet3" {
  name                 = "subnet3"
  resource_group_name  = azurerm_resource_group.default.name
  virtual_network_name = azurerm_virtual_network.default.name
  address_prefixes     = [var.subnet3_cidr]
}

# docs: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/subnet_route_table_association
resource "azurerm_subnet_route_table_association" "subnet2" {
  subnet_id      = azurerm_subnet.subnet2.id
  route_table_id = azurerm_route_table.default.id
}

# docs: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/subnet_route_table_association
resource "azurerm_subnet_route_table_association" "subnet3" {
  subnet_id      = azurerm_subnet.subnet3.id
  route_table_id = azurerm_route_table.default.id
}

#####################
# PRIVATE RESOURCES #
#####################

# docs: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/subnet
resource "azurerm_subnet" "subnet0" {
  name                                          = "subnet0"
  resource_group_name                           = azurerm_resource_group.default.name
  virtual_network_name                          = azurerm_virtual_network.default.name
  address_prefixes                              = [var.subnet0_cidr]
  service_endpoints                             = ["Microsoft.CognitiveServices"]
  private_link_service_network_policies_enabled = true
}

# docs: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/subnet
resource "azurerm_subnet" "subnet1" {
  name                                          = "subnet1"
  resource_group_name                           = azurerm_resource_group.default.name
  virtual_network_name                          = azurerm_virtual_network.default.name
  address_prefixes                              = [var.subnet1_cidr]
  service_endpoints                             = ["Microsoft.CognitiveServices"]
  private_link_service_network_policies_enabled = true
}

# docs: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/subnet_route_table_association
resource "azurerm_subnet_route_table_association" "subnet0" {
  subnet_id      = azurerm_subnet.subnet0.id
  route_table_id = azurerm_route_table.default.id
}

# docs: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/subnet_route_table_association
resource "azurerm_subnet_route_table_association" "subnet1" {
  subnet_id      = azurerm_subnet.subnet1.id
  route_table_id = azurerm_route_table.default.id
}

# docs: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/public_ip
resource "azurerm_public_ip" "nat0" {
  name                = "azure-openai-${var.stage}-nat0"
  location            = azurerm_resource_group.default.location
  resource_group_name = azurerm_resource_group.default.name
  allocation_method   = "Static"
  sku                 = "Standard"
}

# docs: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/nat_gateway
resource "azurerm_nat_gateway" "nat0" {
  name                = "azure-openai-${var.stage}-nat0"
  location            = azurerm_resource_group.default.location
  resource_group_name = azurerm_resource_group.default.name
  sku_name            = "Standard"
}

# docs: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/nat_gateway_public_ip_association
resource "azurerm_nat_gateway_public_ip_association" "nat0" {
  nat_gateway_id       = azurerm_nat_gateway.nat0.id
  public_ip_address_id = azurerm_public_ip.nat0.id
}

# docs: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/subnet_nat_gateway_association
resource "azurerm_subnet_nat_gateway_association" "nat0" {
  subnet_id      = azurerm_subnet.subnet0.id
  nat_gateway_id = azurerm_nat_gateway.nat0.id
}

# docs: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/public_ip
resource "azurerm_public_ip" "nat1" {
  name                = "azure-openai-${var.stage}-nat1"
  location            = azurerm_resource_group.default.location
  resource_group_name = azurerm_resource_group.default.name
  allocation_method   = "Static"
  sku                 = "Standard"
}

# docs: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/nat_gateway
resource "azurerm_nat_gateway" "nat1" {
  name                = "azure-openai-${var.stage}-nat1"
  location            = azurerm_resource_group.default.location
  resource_group_name = azurerm_resource_group.default.name
  sku_name            = "Standard"
}

# docs: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/nat_gateway_public_ip_association
resource "azurerm_nat_gateway_public_ip_association" "nat1" {
  nat_gateway_id       = azurerm_nat_gateway.nat1.id
  public_ip_address_id = azurerm_public_ip.nat1.id
}

# docs: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/subnet_nat_gateway_association
resource "azurerm_subnet_nat_gateway_association" "nat1" {
  subnet_id      = azurerm_subnet.subnet1.id
  nat_gateway_id = azurerm_nat_gateway.nat1.id
}

# docs: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/private_dns_zone
resource "azurerm_private_dns_zone" "openai" {
  name                = "azure-openai-${var.stage}.privatelink.openai.azure.com"
  resource_group_name = azurerm_resource_group.default.name
}

# docs: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/private_dns_zone_virtual_network_link
resource "azurerm_private_dns_zone_virtual_network_link" "openai" {
  name                  = "azure-openai-${var.stage}"
  resource_group_name   = azurerm_resource_group.default.name
  private_dns_zone_name = azurerm_private_dns_zone.openai.name
  virtual_network_id    = azurerm_virtual_network.default.id
}

# docs: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/private_endpoint
resource "azurerm_private_endpoint" "private0" {
  name                = "azure-openai-${var.stage}-private0"
  location            = azurerm_resource_group.default.location
  resource_group_name = azurerm_resource_group.default.name
  subnet_id           = azurerm_subnet.subnet0.id

  private_service_connection {
    name                           = "azure-openai-${var.stage}-private0"
    private_connection_resource_id = azurerm_cognitive_account.private.id
    subresource_names              = ["account"]
    is_manual_connection           = false
  }

  private_dns_zone_group {
    name                 = "default"
    private_dns_zone_ids = [azurerm_private_dns_zone.openai.id]
  }
}

# docs: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/private_endpoint
resource "azurerm_private_endpoint" "private1" {
  name                = "azure-openai-${var.stage}-private1"
  location            = azurerm_resource_group.default.location
  resource_group_name = azurerm_resource_group.default.name
  subnet_id           = azurerm_subnet.subnet1.id

  private_service_connection {
    name                           = "azure-openai-${var.stage}-private1"
    private_connection_resource_id = azurerm_cognitive_account.private.id
    subresource_names              = ["account"]
    is_manual_connection           = false
  }

  private_dns_zone_group {
    name                 = "default"
    private_dns_zone_ids = [azurerm_private_dns_zone.openai.id]
  }
}

#######################
# COGNITIVE RESOURCES #
#######################

# docs: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/cognitive_account
resource "azurerm_cognitive_account" "private" {
  name                               = "azure-openai-${var.stage}"
  location                           = azurerm_resource_group.default.location
  resource_group_name                = azurerm_resource_group.default.name
  kind                               = "OpenAI"
  sku_name                           = var.cognitive_sku
  outbound_network_access_restricted = false
  local_auth_enabled                 = true

  public_network_access_enabled = true
  # public_network_access_enabled is a misleading setting name. It is best understood in
  # connection with the network_acls.defeault_action setting. Here's effect of various
  # combinations of these two settings:
  #
  # public_network_access_enabled: true, default_action: Allow
  #   - Accessible anyhere from the internet. THIS IS DANGEROUS.
  #
  # public_network_access_enabled: true, default_action: Deny
  #   - Accessible from the specified IP ranges in `ip_rules`.
  #
  # public_network_access_enabled: false, default_action: Allow
  #   - Adding `ip_rules` has no effect, they're fake news.
  #
  # public_network_access_enabled: false, default_action: Deny
  #   - Same as above.
  #
  # At a high level, this setting needs only to be `true` when you haven't yet
  # setup private network ingress points from your primary network group (vnet, VPC, VPN, etc)
  # to this new vnet. Explaining that in detail is beyond the scope of this post!

  custom_subdomain_name = "azure-openai-${var.stage}-v1"
  # custom_subdomain_name has a version incrementor because it's a global resource,
  # and doesn't always get deleted immediately when the resource is destroyed.
  # The error message you get will look something like:
  #
  # > The subdomain name ... is not available as it's already used by a resource
  #
  # When I get that message, I simply increment the version.

  network_acls {
    default_action = "Deny"
    ##########################################
    # !!! IMPORTANT SECURITY ACTION ITEM !!! #
    ##########################################
    # This is a "prototype" configuration where you just grab your IP address
    # via `$ curl http://ifconfig.me` and stick it right this file. This is bad
    # security practice and is only fit for proving to your stackholders that
    # you are skilled enough to deploy Azure OpenAI via terraform.
    #
    # What you want to do, is setup a peering connection from your main network groups
    # to the new network groups created by this terraform file. You will need
    # to setup the peering connection to support network requests from humans
    # (via a VPN or similar) and network requests from automated services
    # (via another network group, like a different vnet).
    #
    # Once you do that, you can set `public_network_access_enabled = false`,
    # because the network requests will be coming from private IPs routed through
    # your peering connection. Then you will set these ip_rules to private cidrs.
    ip_rules = [
      "255.255.255.255", # <= !!! your IP address goes here !!!
    ]
    virtual_network_rules {
      subnet_id = azurerm_subnet.subnet0.id
    }
    virtual_network_rules {
      subnet_id = azurerm_subnet.subnet1.id
    }
  }
}

# docs: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/cognitive_deployment
resource "azurerm_cognitive_deployment" "private" {
  name                 = "azure-openai-${var.stage}"
  cognitive_account_id = azurerm_cognitive_account.private.id
  model {
    format  = "OpenAI"
    name    = "gpt-35-turbo"
    version = "0301"
  }

  scale {
    type = "Standard"
  }
}
```

All of that! Should be deploy-able with a `terraform apply` without requiring much additional configuration. With, of course, the significant except of putting your IP address into the `ip_rules`.

Good luck! And do follow-up with those network security improvements, dear reader.
