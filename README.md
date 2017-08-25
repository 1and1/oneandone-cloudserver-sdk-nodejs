# 1&1 Cloudserver Node.js SDK

The 1&1 Node.js SDK is a Node.js library designed for interaction with the 1&1 cloud platform over the REST API.

This guide contains instructions on getting started with the library and automating various management tasks available through the 1&1 Cloud Panel UI. For more information on the 1&1 Cloudserver Node.js SDK see the [1&1 Community Portal](https://www.1and1.com/cloud-community/).

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
  * [Installation](#installation)
  * [Authentication](#authentication)
  * [Error Handling](#error-handling)
- [Operations](#operations)
  - [Servers](#servers)
  - [Images](#images)
  - [Shared Storages](#shared-storages)
  - [Firewall Policies](#firewall-policies)
  - [Load Balancers](#load-balancers)
  - [Public IPs](#public-ips)
  - [Private Networks](#private-networks)
  - [VPNs](#vpns)  
  - [Monitoring Center](#monitoring-center)
  - [Monitoring Policies](#monitoring-policies)
  - [Logs](#logs)
  - [Users](#users)
  - [Roles](#roles)
  - [Usages](#usages)
  - [Server Appliances](#server-appliances)
  - [DVD ISO](#dvd-iso)
  - [Ping](#ping)
  - [Pricing](#pricing)
  - [Data Centers](#data-centers)
- [Example](#example)
- [Index](#index)


## Overview

This SDK is a wrapper for the 1&1 REST API written in Node.js. All operations against the API are performed over SSL and authenticated using your 1&1 token key. The Node.js library facilitates the access to the REST API within an instance running on 1&1 platform.

For more information on the 1&1 Cloud Server for Node.js, visit the [Community Portal](https://www.1and1.com/cloud-community/).

## Getting Started

Before you begin you will need to have signed up for a 1&1 account. The credentials you create during sign-up will be used to authenticate against the API.

The Node.js Client Library is available on npm. You can install the latest stable version using npm:

### Installation

The official Node.js library is available from the 1&1 GitHub account found [here](https://github.com/1and1/oneandone-cloudserver-sdk-nodejs).

### Authentication

Set the authentication token and create the API client:

```
oneandone.oneandoneauth("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
```
Set the url of the API as follows
as follows

```
oneandone.setendpoint("https://cloudpanel-api.1and1.com/v1");
```

### Error Handling

Please note that the 1&1 API always returns the error message in the body of the response, in the testhelper.js there is the method below, check its usages for how to handle errors:
```
//expectedStatus you pass this parameter to define what is the expected http status code
//response is the parameter returned from the 1&1 response
helper.assertNoError = function (expectedStatus, response, callback) {
    callback(expectedStatus == response.statusCode);
};
```


Refer to the [Examples](#examples) and [Operations](#operations) sections for additional information.


## Operations
### Servers

**List all servers:**

`oneandone.listServers(function (error, response, body) { //consume the result });`

**List all servers with options:**

```
var options = {
	query: "node",	
	page:1,
	perPage:1,
	sort:""
};
```
```
oneandone.listServersWithOptions(options, function (error, response, body) {//consume the result });
```

To paginate the list of servers received in the response use `page` and `perPage` parameters. Set `perPage` to the number of servers that will be shown in each page. `page` indicates the current page. When set to an integer value that is less than or equal to zero, the parameters are ignored by the framework.

To receive the list of servers sorted in expected order pass a server property (e.g. `"name"`) in `sort` parameter.

Use `query` parameter to search for a string in the response and return only the server instances that contain it.

To retrieve a collection of servers containing only the requested fields, pass a list of comma-separated properties (e.g. `"id,name,description,hardware.ram"`) in `fields` parameter.

If any of the parameters `sort`, `query` or `fields` is set to an empty string, it is ignored in the request.

**Retrieve a single server:**

`oneandone.getServer("server_id", function (error, response, body) {//consume the result });`

**List fixed-size server templates:**

`oneandone.listHardwareFlavours(function (error, response, body) {//consume the result });`

**Retrieve information about a fixed-size server template:**

`oneandone.getHardwareFlavour(hardware_flavour_id, function (error, response, body) {//consume the result });`

**Retrieve information about a server's hardware:**

`oneandone.getHardware(server.id, function (error, response, body) {//consume the result });`

**List a server's HDDs:**

`oneandone.listHdds(server_id, function (error, response, body) {//consume the result });`

**Retrieve a single server HDD:**

`oneandone.getHdd(server_id, hdd_id, function (error, response, body) {//consume the result });`

**Retrieve information about a server's image:**

`oneandone.getServerImage(server_id, function (error, response, body) {//consume the result });`

**List a server's IPs:**

`oneandone.listIps(server_id, function (error, response, body) {//consume the result });`

**Retrieve information about a single server IP:**

`oneandone.getIp(server_id, ip_id, function (error, response, body) {//consume the result });`

**List all firewall policies assigned to a server IP:**

`oneandone.listIpFirewallPolicies(server_id, ip_id, function (error, response, body) {//consume the result });`

**List all load balancers assigned to a server IP:**

`oneandone.listIpLoadBalancer(server_id, ip_id, function (error, response, body) {//consume the result });`

**Retrieve information about a server's status:**

`oneandone.getServerStatus(server_id, function (error, response, body) {//consume the result });`

**Retrieve information about the DVD loaded into the virtual DVD unit of a server:**

` oneandone.getDvd(server_id, function (error, response, body) {//consume the result });`

**List a server's private networks:**

` oneandone.listServerPrivateNetworks(server_id, function (error, response, body) {//consume the result });`

**Retrieve information about a server's private network:**

`oneandone.getServerPrivateNetwork(server_id, current_privateNetwork_id, function (error, response, body) {//consume the result });`

**List all server's snapshots:**

`oneandone.listSnapshots(server_id, function (error, response, body) {//consume the result });`

**Create a server:**

```
var serverData = {
  "name": "My server",
  "description": "My server description",
  "hardware": {
    "vcore": 2,
    "cores_per_processor": 1,
    "ram": 2,
    "hdds": [
    {
      "size": 40,
      "is_main": true
    },
    {
      "size": 20,
      "is_main": false
    }
    ]
  },
  "appliance_id": "B5F778B85C041347BCDCFC3172AB3F3C",
  "datacenter_id": "908DC2072407C94C8054610AD5A53B8C"
};
```
```
oneandone.createServer(serverData, function (error, response, body) {//consume the result });
```

**Create a fixed-size server and return back the server's IP address and first password:**

```
var serverData = {
	"name": "Node Fixed Instance server",
	"description": "My server description",
	"hardware": {
		"fixed_instance_size_id": "65929629F35BBFBA63022008F773F3EB"
	},
	"appliance_id": "B5F778B85C041347BCDCFC3172AB3F3C",
	"datacenter_id": "908DC2072407C94C8054610AD5A53B8C"
};
```
```
oneandone.createServer(serverData, function (error, response, body) {//consume the result });
```

**Update a server:**

```
var updateData = {
	"name": "Node Server - UPDATED",
	"description": "desc"
};
oneandone.updateServer(server_id, updateData, function (error, response, body) {//consume the result });
```

**Delete a server:**

`oneandone.deleteServer(server_id,keep_ips, function (error, response, body) {//consume the result });`

Set `keep_ips` parameter to `true` for keeping server IPs after deleting a server.

**Update a server's hardware:**

```
var updateHardwareData = {
	"vcore": 4,
	"cores_per_processor": 2,
	"ram": 6
};
oneandone.updateHardware(server_id, updateHardwareData, function (error, response, body) {//consume the result });       
```

**Add new hard disk(s) to a server:**

```
var hddData = {
	"hdds": [
		{
			"size": 40,
			"is_main": false
		}
	]
};
```
```
oneandone.addHdd(server_id, hddData, function (error, response, body) {//consume the result }); 
```

**Resize a server's hard disk:**

```
 var updateData = {
	"size": 40
};
oneandone.updateHdd(server_id, hdd_id, updateData, function (error, response, body) {//consume the result }); 
```

**Remove a server's hard disk:**

`oneandone.deleteHdd(server_id, hdd_id, function (error, response, body) {//consume the result });`

**Load a DVD into the virtual DVD unit of a server:**

```
var updateDVD = {
	"id": "908DC2072407C94C8054610AD5A53B8C"
};
oneandone.loadDvd(server_id, updateDVD, function (error, response, body) {//consume the result });
```

**Unload a DVD from the virtual DVD unit of a server:**

`oneandone.unloadDvd(server_id, function (error, response, body) {//consume the result });`

**Reinstall a new image into a server:**

```
var updateData = {
	"id": "908DC2072407C94C8054610AD5A53B8C",//imageid
	"password": "Test123!"
};
oneandone.updateServerImage(server_id, updateData, function (error, response, body) {//consume the result });
```

**Assign a new IP to a server:**

```
var ipData = {
	"type": "IPV4"
};
oneandone.addIp(server_id, ipData, function (error, response, body) {//consume the result });
```

**Release an IP and optionally remove it from a server:**

```
 var keepip = {
	"keep_ip": false
};
oneandone.deleteIp(server_id, ip_id,keepip, function (error, response, body) {//consume the result });
```

Set `keep_ip` to true for releasing the IP without removing it.

**Assign a new firewall policy to a server's IP:**

```
var firewallPolicyData = {
	"id": "071C8EB665DBA2EE574F3ED1256E5694"
};
oneandone.addFirewallPolicy(server_id, ip_id, firewallPolicyData, function (error, response, body) {//consume the result });
```

**Remove a firewall policy from a server's IP:**

`oneandone.deleteIpFirewallPolicy(server_id, ip_id, function (error, response, body) {//consume the result });`

**Assign a new load balancer to a server's IP:**

```
var loadBalancerData = {
	"load_balancer_id": "071C8EB665DBA2EE574F3ED1256E5694"
};
oneandone.addIpLoadBalancer(server_id, ip_id, loadBalancerData, function (error, response, body) {//consume the result });
```

**Remove a load balancer from a server's IP:**

`oneandone.deleteIpLoadBalancer(server_id, ip_id, load_balancer_id, function (error, response, body) {//consume the result });`

**Start a server:**

```
var updateData = {
	"action": oneandone.ServerUpdateAction.POWER_ON,
	"method": oneandone.ServerUpdateMethod.SOFTWARE
};
oneandone.updateServerStatus(server_id, updateData, function (error, response, body) {//consume the result });
```

Set `setMethod` to either for `Types.ServerActionMethod.SOFTWARE` or `Types.ServerActionMethod.HARDWARE`for method of rebooting.

**Reboot a server:**

```
var updateData = {
	"action": oneandone.ServerUpdateAction.REBOOT,
	"method": oneandone.ServerUpdateMethod.SOFTWARE
	};
oneandone.updateServerStatus(server_id, updateData, function (error, response, body) {//consume the result });
```

Set `setMethod` to either for `Types.ServerActionMethod.SOFTWARE` or `Types.ServerActionMethod.HARDWARE`for method of rebooting.

**Shutdown a server:**

```
var updateData = {
	"action": oneandone.ServerUpdateAction.POWER_OFF,
	"method": oneandone.ServerUpdateMethod.SOFTWARE
	};
oneandone.updateServerStatus(server_id, updateData, function (error, response, body) {//consume the result });
```

Set `method` to either for `oneandone.ServerUpdateMethod.SOFTWARE` or `oneandone.ServerUpdateMethod.HARDWARE`for method of rebooting.

**Assign a private network to a server:**

```
var pnData = {
	"id": "071C8EB665DBA2EE574F3ED1256E5694"
};
oneandone.assignPrivateNetworkToServer(server_id, pnData, function (error, response, body) {//consume the result });
```

**Remove a server's private network:**

`oneandone.deletePrivateNetworkFromServer(server_id, current_privateNetwork_id, function (error, response, body) {//consume the result });`

**Create a new server's snapshot:**

`oneandone.createSnapshot(server_id, null, function (error, response, body) {//consume the result });`

**Restore a server's snapshot:**

`oneandone.restoreSnapshot(server_id, current_snapShot_id, null, function (error, response, body) {//consume the result });`

**Remove a server's snapshot:**

`oneandone.deleteSnapshot(server_id, current_snapShot_id, function (error, response, body) {//consume the result });`

**Clone a server:**

```
var cloneData = {
	"name": "node clone",
	"datacenter_id": "datacenter_id"
};
oneandone.clone(server.id, cloneData, function (error, response, body) {//consume the result });
```


### Images

**List all images:**

` oneandone.listImages(function (error, response, body) {//consume the result });`

**List all images with options:**

```
var options = {
	query: "node",	
	page:1,
	perPage:1,
	sort:""
};
```
```
oneandone.listImagesWithOptions(options, function (error, response, body) {//consume the result });
```

To paginate the list of load balancers received in the response use `page` and `perPage` parameters. Set `perPage` to the number of load balancers that will be shown in each page. `page` indicates the current page. When set to an integer value that is less than or equal to zero, the parameters are ignored by the framework.

To receive the list of load balancers sorted in expected order, pass a load balancer property (e.g. `"name"`) in `sort` parameter. Prefix the sorting attribute with `-` sign for sorting in descending order.

Use `query` parameter to search for a string in the response and return only the load balancer instances that contain it.

To retrieve a collection of load balancers containing only the requested fields, pass a list of comma-separated properties (e.g. `"ip,name,method"`) in `fields` parameter.

If any of the parameters `sort`, `query` or `fields` is set to an empty string, it is ignored in the request.

**Retrieve a single image:**

`oneandone.getImage(image_id, function (error, response, body) {//consume the result });`


**Create an image:**

```
var imageData = {
	"server_id": server.id,
	"name": "node image",
	"description": "My image description",
	"frequency": oneandone.ImageFrequency.WEEKLY,
	"num_images": 1
};
oneandone.createImage(imageData, function (error, response, body) {//consume the result });
```
All fields except `Description` are required. `Frequency` may be set to `"ONCE"`, `"DAILY"` or `"WEEKLY"`.

**Update an image:**

```
var updateData = {
	"name": "image updated nodejs",
	"description": "New image description",
	"frequency": oneandone.ImageFrequency.ONCE
};
oneandone.updateImage(image_id, updateData, function (error, response, body) {//consume the result });
```

`Frequency` may be set to `"ONCE"`, `"DAILY"` or `"WEEKLY"`.

**Delete an image:**

`oneandone.deleteImage(image_id, function (error, response, body) {//consume the result });`

### Shared Storages

**List all Shared Storages:**

`oneandone.listSharedStorages(function (error, response, body) {//consume the result });`

**List all Shared Storages with options:**

```
var options = {
	query: "node",	
	page:1,
	perPage:1,
	sort:""
};
```
```
oneandone.listSharedStoragesWithOptions(options, function (error, response, body) {//consume the result });
```

To paginate the list of load balancers received in the response use `page` and `perPage` parameters. Set `perPage` to the number of load balancers that will be shown in each page. `page` indicates the current page. When set to an integer value that is less than or equal to zero, the parameters are ignored by the framework.

To receive the list of load balancers sorted in expected order, pass a load balancer property (e.g. `"name"`) in `sort` parameter. Prefix the sorting attribute with `-` sign for sorting in descending order.

Use `query` parameter to search for a string in the response and return only the load balancer instances that contain it.

To retrieve a collection of load balancers containing only the requested fields, pass a list of comma-separated properties (e.g. `"ip,name,method"`) in `fields` parameter.

If any of the parameters `sort`, `query` or `fields` is set to an empty string, it is ignored in the request.

**Retrieve a shared storage:**

`oneandone.getSharedStorage(shared_storage_id, function (error, response, body) {//consume the result });`


**Create a shared storage:**

```
var storageData = {
	"name": "Node storage test",
	"description": "My shared storage test description",
	"size": 50
};
oneandone.createSharedStorage(storageData, function (error, response, body) {//consume the result });
```

`Description` is optional parameter.


**Update a shared storage:**

```
updateData = {
	"name": "node js storage test rename",
	"description": "My shared storage rename"
};
oneandone.updateSharedStorage(shared_storage_id, updateData, function (error, response, body) {//consume the result });
```
All request's parameters are optional.


**Remove a shared storage:**

`oneandone.deleteSharedStorage(shared_storage_id, function (error, response, body) {//consume the result });`


**List a shared storage servers:**

`oneandone.listSharedStorageServers(shared_storage_id, function (error, response, body) {//consume the result });`


**Retrieve a shared storage server:**

`oneandone.getSharedStorageServer(shared_storage_id, server_id, function (error, response, body) {//consume the result });`


**Add servers to a shared storage:**

```
var attachData = {
	"servers": [
		{
			"id": server_id,
			"rights": oneandone.StorageServerRights.RW
		}
	]
};
oneandone.attachServerToSharedStorage(shared_storage_id, attachData, function (error, response, body) {//consume the result });
```

`StorageServerRights` may be set to `R` or `RW` string.

				
**Remove a server from a shared storage:**

`oneandone.detachServerFromSharedStorage(shared_storage_id, server_id, function (error, response, body) {//consume the result });`


**Retrieve the credentials for accessing the shared storages:**

`oneandone.getAccessCredentials(function (error, response, body) {//consume the result });`


**Change the password for accessing the shared storages:**

```
var updateData = {
	"password": "Test123!"
};
oneandone.changePassword(updateData, function (error, response, body) {//consume the result });	
```


### Firewall Policies

**List firewall policies:**

`oneandone.listFirewallPolicies(function (error, response, body) {//consume the result });`

**List all firewall policies with options:**

```
var options = {
	query: "node",	
	page:1,
	perPage:1,
	sort:""
};
```
```
oneandone.listFirewallPoliciesWithOptions(options, function (error, response, body) {//consume the result });
```

To paginate the list of load balancers received in the response use `page` and `perPage` parameters. Set `perPage` to the number of load balancers that will be shown in each page. `page` indicates the current page. When set to an integer value that is less than or equal to zero, the parameters are ignored by the framework.

To receive the list of load balancers sorted in expected order, pass a load balancer property (e.g. `"name"`) in `sort` parameter. Prefix the sorting attribute with `-` sign for sorting in descending order.

Use `query` parameter to search for a string in the response and return only the load balancer instances that contain it.

To retrieve a collection of load balancers containing only the requested fields, pass a list of comma-separated properties (e.g. `"ip,name,method"`) in `fields` parameter.

If any of the parameters `sort`, `query` or `fields` is set to an empty string, it is ignored in the request.

**Retrieve a single firewall policy:**

`oneandone.getFirewallPolicy(firewall_policy_id, function (error, response, body) {//consume the result });`


**Create a firewall policy:**

```
var firewallData = {
	"name": "node firewall policy",
	"description": "My firewall policy description",
	"rules": [
		{
			"protocol": "TCP",
			"port_from": 80,
			"port_to": 80,
			"source": "0.0.0.0"
		},
		{
			"protocol": "TCP",
			"port_from": 443,
			"port_to": 443,
			"source": "0.0.0.0"
		}
	]
};
```
```
oneandone.createFirewallPolicy(firewallData, function (error, response, body) {//consume the result });
```

`setSource` and `setDescription` are optional parameters.

			
**Update a firewall policy:**

```
var updateData = {
	"name": "node js Firewall test rename",
	"description": "My Firewall Policy rename"
};
```
```
oneandone.updateFirewallPolicy(firewall_policy_id, updateData, function (error, response, body) {//consume the result });
```

			
**Delete a firewall policy:**

`oneandone.deleteFirewallPolicy(firewall_policy_id, function (error, response, body) {//consume the result });`


**List servers/IPs attached to a firewall policy:**

`oneandone.listFirewallPolicyServerIps(firewall_policy_id, function (error, response, body) {//consume the result });`


**Retrieve information about a server/IP assigned to a firewall policy:**

`oneandone.getFirewallPolicyServerIp(firewall_policy_id, server_ip_id, function (error, response, body) {//consume the result });`


**Add servers/IPs to a firewall policy:**

```
var assignData = {
	"server_ips": [
		server_ip_id
	]
};
oneandone.assignServerIpToFirewallPolicy(firewall_policy_id, assignData, function (error, response, body) {//consume the result });
```

**Remove a server/IP from a firewall policy:**

`oneandone.unassignServerIpFromFirewallPolicy(firewall_policy_id, server_ip_id, function (error, response, body) {//consume the result });`


**List rules of a firewall policy:**

`oneandone.listFirewallPolicyRules(firewall_policy_id, function (error, response, body) {//consume the result });`


**Retrieve information about a rule of a firewall policy:**

`oneandone.getFirewallPolicyRule(firewall_policy_id, firewall_policy_rule_id, function (error, response, body) {//consume the result });`


**Adds new rules to a firewall policy:**

```
var ruleData = {
	"rules": [
		{
			"protocol": oneandone.RuleProtocol.TCP,
			"port_from": 4567,
			"port_to": 4567,
			"source": "0.0.0.0"
		}
	]
};
```
```
oneandone.addRulesToFirewallPolicy(firewall_policy_id, ruleData, function (error, response, body) {//consume the result });
```

**Remove a rule from a firewall policy:**

`oneandone.removeRuleFromFirewallPolicy(firewall_policy_id, firewall_policy_rule_id, function (error, response, body) {//consume the result });`


### Load Balancers

**List load balancers:**

`oneandone.listLoadBalancers(function (error, response, body) {//consume the result });`

**List all load balancers with options:**

```
var options = {
	query: "node",	
	page:1,
	perPage:1,
	sort:""
};
```
```
oneandone.listLoadBalancersWithOptions(options, function (error, response, body) {//consume the result });
```

To paginate the list of load balancers received in the response use `page` and `perPage` parameters. Set `perPage` to the number of load balancers that will be shown in each page. `page` indicates the current page. When set to an integer value that is less than or equal to zero, the parameters are ignored by the framework.

To receive the list of load balancers sorted in expected order, pass a load balancer property (e.g. `"name"`) in `sort` parameter. Prefix the sorting attribute with `-` sign for sorting in descending order.

Use `query` parameter to search for a string in the response and return only the load balancer instances that contain it.

To retrieve a collection of load balancers containing only the requested fields, pass a list of comma-separated properties (e.g. `"ip,name,method"`) in `fields` parameter.

If any of the parameters `sort`, `query` or `fields` is set to an empty string, it is ignored in the request.

**Retrieve a single load balancer:**

`oneandone.getLoadBalancer(load_balancer_id, function (error, response, body) {//consume the result });`


**Create a load balancer:**

```
var balancerData = {
	"name": "node balancer",
	"description": "My load balancer description",
	"health_check_test": oneandone.HealthCheckTestTypes.TCP,
	"health_check_interval": 1,
	"health_check_path": "path",
	"health_check_parser": null,
	"persistence": true,
	"persistence_time": 200,
	"method": oneandone.LoadBalancerMethod.ROUND_ROBIN,
	"rules": [
		{
			"protocol": "TCP",
			"port_balancer": 80,
			"port_server": 80,
			"source": "0.0.0.0"
		},
		{
			"protocol": "TCP",
			"port_balancer": 9999,
			"port_server": 8888,
			"source": "0.0.0.0"
		}
	]
};
```
```
oneandone.createLoadBalancer(balancerData, function (error, response, body) {//consume the result });
```
Optional parameters are `HealthCheckPath`, `HealthCheckPathParser`, `Source` and `Description`. Load balancer `Method` must be set to `"ROUND_ROBIN"` or `"LEAST_CONNECTIONS"`.

**Update a load balancer:**
```
var updateData = {
            "name": "node balancer rename",
            "description": "My load balancer rename description",
            "health_check_test": oneandone.HealthCheckTestTypes.TCP,
            "health_check_interval": 40,
            "persistence": true,
            "persistence_time": 1200,
            "method": oneandone.LoadBalancerMethod.ROUND_ROBIN
        };
oneandone.updateLoadBalancer(load_balancer_id, updateData, function (error, response, body) {//consume the result });
```
All updatable fields are optional.


**Delete a load balancer:**

`oneandone.deleteLoadBalancer(load_balancer_id, function (error, response, body) {//consume the result });`


**List servers/IPs attached to a load balancer:**

`oneandone.listLoadBalancerServerIps(load_balancer_id, function (error, response, body) {//consume the result });`


**Retrieve information about a server/IP assigned to a load balancer:**

`oneandone.getLoadBalancerServerIp(load_balancer_id, server_ip_id, function (error, response, body) {//consume the result });`


**Add servers/IPs to a load balancer:**

```
var assignData = {
	"server_ips": [
		server_ip_id
	]
};
oneandone.assignServerIpToLoadBalancer(load_balancer_id, assignData, function (error, response, body) {//consume the result });
```


**Remove a server/IP from a load balancer:**

`oneandone.unassignServerIpFromLoadBalancer(load_balancer_id, server_ip_id, function (error, response, body) {//consume the result });`


**List rules of a load balancer:**

`oneandone.listLoadBalancerRules(load_balancer_id, function (error, response, body) {//consume the result });`


**Retrieve information about a rule of a load balancer:**

`oneandone.getLoadBalancerRule(load_balancer_id, loadBalancer_rule_id, function (error, response, body) {//consume the result });`


**Adds new rules to a load balancer:**

```
var ruleData = {
	"rules": [
		{
			"protocol": oneandone.RuleProtocol.TCP,
			"port_balancer": 82,
			"port_server": 82,
			"source": "0.0.0.0"
		}
	]
};
oneandone.addRulesToLoadBalancer(load_balancer_id, ruleData, function (error, response, body) {//consume the result });
```

**Remove a rule from a load balancer:**

`oneandone.removeRuleFromLoadBalancer(load_balancer_id, loadBalancer_rule_id, function (error, response, body) {//consume the result });`


### Public IPs

**Retrieve a list of your public IPs:**

`oneandone.listPublicIps(function (error, response, body) {//consume the result });`

**Retrieve a list of your public IPs with options:**

```
var options = {
	query: "node",	
	page:1,
	perPage:1,
	sort:""
};
```

```oneandone.listPublicIpsWithOptions(options, function (error, response, body) {//consume the result });```

To paginate the list of public IPs received in the response use `page` and `per_page` parameters. Set `per_page` to the number of public IPs that will be shown in each page. `page` indicates the current page. When set to an integer value that is less than or equal to zero, the parameters are ignored by the framework.

To receive the list of public IPs sorted in expected order, pass a public IP property (e.g. `"ip"`) in `sort` parameter. Prefix the sorting attribute with `-` sign for sorting in descending order.

Use `query` parameter to search for a string in the response and return only the public IP instances that contain it.

To retrieve a collection of public IPs containing only the requested fields, pass a list of comma-separated properties (e.g. `"id,ip,reverse_dns"`) in `fields` parameter.

If any of the parameters `sort`, `query` or `fields` is set to an empty string, it is ignored in the request.


**Retrieve a single public IP:**

`oneandone.getPublicIp(public_ip_id, function (error, response, body) {//consume the result });`


**Create a public IP:**

```
 var publicIpData = {
	"reverse_dns": "node.com",
	"type": oneandone.IPType.IPV4
};
oneandone.createPublicIp(publicIpData, function (error, response, body) {//consume the result });
```
	
Both parameters are optional and may be left blank. `type` may be set to `"IPV4"` or `"IPV6"`. Presently, only IPV4 is supported.

**Update the reverse DNS of a public IP:**

```
var updateData = {
	"reverse_dns": "example.es"
};
oneandone.updatePublicIp(public_ip_id, updateData, function (error, response, body) {//consume the result });
```

If an empty string is passed in `reverseDns,` it removes previous reverse dns of the public IP.

**Remove a public IP:**

`oneandone.deletePublicIp(public_ip_id, function (error, response, body) {//consume the result });`


### Private Networks

**List all private networks:**

`oneandone.listPrivateNetworks(function (error, response, body) {//consume the result });`

**Retrieve a list of your private networks with options:**

```
var options = {
	query: "node",	
	page:1,
	perPage:1,
	sort:""
};
```
```
oneandone.listPrivateNetworksWithOptions(options, function (error, response, body) {//consume the result });
```

To paginate the list of private networks received in the response use `page` and `per_page` parameters. Set `per_page` to the number of private networks that will be shown in each page. `page` indicates the current page. When set to an integer value that is less than or equal to zero, the parameters are ignored by the framework.

To receive the list of private networks sorted in expected order pass a private network property (e.g. `"-creation_date"`) in `sort` parameter. Prefix the sorting attribute with `-` sign for sorting in descending order.

Use `query` parameter to search for a string in the response and return only the private network instances that contain it.

To retrieve a collection of private networks containing only the requested fields, pass a list of comma-separated properties (e.g. `"id,name,creation_date"`) in `fields` parameter.

If any of the parameters `sort`, `query` or `fields` is blank, it is ignored in the request.

**Retrieve information about a private network:**

`oneandone.getPrivateNetwork(private_network_id, function (error, response, body) {//consume the result });`

**Create a new private network:**

```
var pnData = {
	"name": "node Private Network",
	"description": "node Private network description",
	"network_address": "192.168.1.0",
	"subnet_mask": "255.255.255.0"
};
oneandone.createPrivateNetwork(pnData, function (error, response, body) {//consume the result });
```
Private network `Name` is required parameter.


**Modify a private network:**

```
updateData = {
	"name": "node update Private Network",
	"description": "Private network description",
	"network_address": "192.168.1.0",
	"subnet_mask": "255.255.255.0"
};
```
```
oneandone.updatePrivateNetwork(private_network_id, updateData, function (error, response, body) {//consume the result });
```
All parameters in the request are optional.


**Delete a private network:**

`oneandone.deletePrivateNetwork(private_network_id, function (error, response, body) {//consume the result });`


**List all servers attached to a private network:**

`oneandone.listPrivateNetworkServers(private_network_id, function (error, response, body) {//consume the result });`


**Retrieve a server attached to a private network:**

`oneandone.getPrivateNetworkServer(private_network_id, server_id, function (error, response, body) {//consume the result });`


**Attach servers to a private network:**

```
var attach = {
	"servers": [
		"server_id"
	]
};
oneandone.attachServerToPrivateNetwork(private_network_id, attach, function (error, response, body) {
```
*Note:* Servers cannot be attached to a private network if they currently have a snapshot.


**Remove a server from a private network:**

`oneandone.detachServerFromPrivateNetwork(private_network_id, server_id, function (error, response, body) {`

*Note:* The server cannot be removed from a private network if it currently has a snapshot or it is powered on.

### VPNs

**List all VPNs:**

`oneandone.listVpns(function (error, response, body) {//consume the result });`

**Retrieve a list of your VPNs with options:**

```
var options = {
	query: "node",	
	page:1,
	perPage:1,
	sort:""
};
```

```oneandone.listVpnsWithOptions(options, function (error, response, body) {//consume the result });```

To paginate the list of VPNs received in the response use `page` and `per_page` parameters. Set ` per_page` to the number of VPNs that will be shown in each page. `page` indicates the current page. When set to an integer value that is less or equal to zero, the parameters are ignored by the framework.

To receive the list of VPNs sorted in expected order pass a VPN property (e.g. `"name"`) in `sort` parameter. Prefix the sorting attribute with `-` sign for sorting in descending order.

Use `query` parameter to search for a string in the response and return only the VPN instances that contain it.

To retrieve a collection of VPNs containing only the requested fields pass a list of comma separated properties (e.g. `"id,name,creation_date"`) in `fields` parameter.

If any of the parameters `sort`, `query` or `fields` is set to an empty string, it is ignored in the request.

**Retrieve information about a VPN:**

`oneandone.getVpn(vpn.id, function (error, response, body) {//consume the result });`

**Create a VPN:**

``` 
var vpnData = {
  "name": "My VPN",
  "description": "My VPN description",
  "datacenter_id": "D0F6D8C8ED29D3036F94C27BBB7BAD36"
};
```
```
oneandone.createVpn(vpnData, function (error, response, body) {//consume the result });
```

**Modify a VPN:**

```
var updateData = {
	"name": "node VPN rename",
	"description": "node VPN rename description"
};
```
```
oneandone.updateVpn(vpn.id, updateData, function (error, response, body) {//consume the result });
```

**Delete a VPN:**

`oneandone.deleteVpn(vpnToRemove.id, function (error, response, body) {//consume the result });`

**Retrieve a VPN's configuration file:**

`oneandone.getConfigurationFile(vpn.id, function (error, response, body) {//consume the result });`

### Monitoring Center

**List all usages and alerts of monitoring servers:**

`oneandone.listMonitoringCenters(function (error, response, body) {//consume the result });`

**List all usages and alerts of monitoring servers with options:**

```
var options = {
	query: "node",	
	page:1,
	perPage:1,
	sort:""
};
```

```oneandone.listMonitoringCentersWithOption(options, function (error, response, body) {//consume the result });```

To paginate the list of server usages received in the response use `page` and `per_page` parameters. Set `per_page` to the number of server usages that will be shown in each page. `page` indicates the current page. When set to an integer value that is less than or equal to zero, the parameters are ignored by the framework.

To receive the list of server usages sorted in expected order, pass a server usage property (e.g. `"name"`) in `sort` parameter. Prefix the sorting attribute with `-` sign for sorting in descending order.

Use `query` parameter to search for a string in the response and return only the usage instances that contain it.

To retrieve a collection of server usages containing only the requested fields, pass a list of comma-separated properties (e.g. `"id,name,status.state"`) in `fields` parameter.

If any of the parameters `sort`, `query` or `fields` is blank, it is ignored in the request.

**Retrieve the usages and alerts for a monitoring server:**

`oneandone.getServerMonitoringCenterFixedPeriod(server_id, oneandone.PeriodType.LAST_24H, function (error, response, body) {//consume the result });`

`period` may be set to `"LAST_HOUR"`, `"LAST_24H"`, `"LAST_7D"`, `"LAST_30D"`, `"LAST_365D"` or `"CUSTOM"`. If `period` is set to `"CUSTOM"`, 

**Retrieve the usages and alerts for a monitoring server for a customer period:**

`Mneandone.getServerMonitoringCenterCustomPeriod(server_id, start_date, end_date, function (error, response, body) {//consume the result });`


### Monitoring Policies

**List all monitoring policies:**

`oneandone.listMonitoringPolicies(function (error, response, body) {//consume the result });`

**List all usages and alerts of monitoring servers with options:**

```
var options = {
	query: "node",	
	page:1,
	perPage:1,
	sort:""
};
```
```
oneandone.listMonitoringPoliciesWithOptions(options, function (error, response, body) {//consume the result });
```

To paginate the list of monitoring policies received in the response use `page` and `per_page` parameters. Set `per_page` to the number of monitoring policies that will be shown in each page. `page` indicates the current page. When set to an integer value that is less than or equal to zero, the parameters are ignored by the framework.

To receive the list of monitoring policies sorted in expected order, pass a monitoring policy property (e.g. `"name"`) in `sort` parameter. Prefix the sorting attribute with `-` sign for sorting in descending order.

Use `query` parameter to search for a string in the response and return only the monitoring policy instances that contain it.

To retrieve a collection of monitoring policies containing only the requested fields, pass a list of comma-separated properties (e.g. `"id,name,creation_date"`) in `fields` parameter.

If any of the parameters `sort`, `query` or `fields` is set to an empty string, it is ignored in the request.

**Retrieve a single monitoring policy:**

` oneandone.getMonitoringPolicy(policy_id, function (error, response, body) {//consume the result });`


**Create a monitoring policy:**

```
var policyData = {
    "name": "node monitoring policy",
    "description": "node monitoring policy description",
    "email": "",
    "agent": true,
    "thresholds": {
        "cpu": {
            "warning": {
                "value": 90,
                "alert": false
            },
            "critical": {
                "value": 95,
                "alert": false
            }
        },
        "ram": {
            "warning": {
                "value": 90,
                "alert": false
            },
            "critical": {
                "value": 95,
                "alert": false
            }
        },
        "disk": {
            "warning": {
                "value": 80,
                "alert": false
            },
            "critical": {
                "value": 90,
                "alert": false
            }
        },
        "transfer": {
            "warning": {
                "value": 1000,
                "alert": false
            },
            "critical": {
                "value": 2000,
                "alert": false
            }
        },
        "internal_ping": {
            "warning": {
                "value": 50,
                "alert": false
            },
            "critical": {
                "value": 100,
                "alert": false
            }
        }
    },
    "ports": [
        {
            "protocol": "TCP",
            "port": "22",
            "alert_if": "RESPONDING",
            "email_notification": true
        }
    ],
    "processes": [
        {
            "process": "test",
            "alert_if": "NOT_RUNNING",
            "email_notification": true
        }
    ]
};
```
```
oneandone.createMonitoringPolicy(policyData, function (error, response, body) {//consume the result });
```
All fields, except `Description`, are required. `AlertIf` property accepts values `"RESPONDING"`/`"NOT_RESPONDING"` for ports, and `"RUNNING"`/`"NOT_RUNNING"` for processes.


**Update a monitoring policy:**

```
var updateData = {
	"name": "node Monitoring Policy reName",
	"description": "node Monitoring Policy Description",
	"email": "test2@gmail.com",
	"thresholds": {
		"cpu": {
			"warning": {
				"value": 90,
				"alert": false
			},
			"critical": {
				"value": 95,
				"alert": false
			}
		},
		"ram": {
			"warning": {
				"value": 90,
				"alert": false
			},
			"critical": {
				"value": 95,
				"alert": false
			}
		},
		"disk": {
			"warning": {
				"value": 80,
				"alert": false
			},
			"critical": {
				"value": 90,
				"alert": false
			}
		},
		"transfer": {
			"warning": {
				"value": 1000,
				"alert": false
			},
			"critical": {
				"value": 2000,
				"alert": false
			}
		},
		"internal_ping": {
			"warning": {
				"value": 50,
				"alert": false
			},
			"critical": {
				"value": 100,
				"alert": false
			}
		}
	}
};
oneandone.updateMonitoringPolicy(policy_id, updateData, function (error, response, body) {//consume the result });
```
All fields of the request are optional. When a threshold is specified in the request, the threshold fields are required.

**Delete a monitoring policy:**

`oneandone.deleteMonitoringPolicy(policy_id, function (error, response, body) {//consume the result });`


**List all ports of a monitoring policy:**

`oneandone.listMonitoringPoliciesPorts(policy_id, function (error, response, body) {//consume the result });`


**Retrieve information about a port of a monitoring policy:**

`oneandone.getPortsMonitoringPolicy(policy_id, port_id, function (error, response, body) {//consume the result });`


**Add new ports to a monitoring policy:**

```
var portsData = {
	"ports": [
		{
			"protocol": oneandone.ProtocolType.TCP,
			"port": "80",
			"alert_if": oneandone.AlertIfType.NOT_RESPONDING,
			"email_notification": false
		}
	]
};
```
```
oneandone.createMonitoringPolicyForPorts(policy_id, portsData, function (error, response, body) {//consume the result });
```

Port properties are mandatory.

**Modify a port of a monitoring policy:**

```
var updatePortData = {
	"ports": {
		"protocol": oneandone.ProtocolType.TCP,
		"port": "80",
		"alert_if": oneandone.AlertIfType.RESPONDING,
		"email_notification": false
	}
};
```
```
oneandone.updatePortsMonitoringPolicy(policy_id, port_id, updatePortData, function (error, response, body) {//consume the result });
```
*Note:* `Protocol` and `Port` cannot be changed.


**Remove a port from a monitoring policy:**

`oneandone.deletePortsMonitoringPolicy(policy.id, port.id, function (error, response, body) {//consume the result });`


**List the processes of a monitoring policy:**

`oneandone.listMonitoringPoliciesProcesses(policy_id, function (error, response, body) {//consume the result });`


**Retrieve information about a process of a monitoring policy:**

`oneandone.getProcessesMonitoringPolicy(policy_id, process_id, function (error, response, body) {//consume the result });`


**Add new processes to a monitoring policy:**

```
var processesData = {
	"processes": [
		{
			"process": "taskmmgr",
			"alert_if": oneandone.ProcessAlertType.RUNNING,
			"email_notification": false
		}
	]
};
```
```
oneandone.createMonitoringPolicyForProcesses(policy_id, processesData, function (error, response, body) {//consume the result });
```

All properties of the `MonitoringProcess` instance are required.


**Modify a process of a monitoring policy:**

```
var updatePortData = {
	"processes": {
		"process": "test",
		"alert_if": oneandone.ProcessAlertType.RUNNING,
		"email_notification": false
	}
};
```
```
oneandone.updateProcessesMonitoringPolicy(policy_id, process_id, updatePortData, function (error, response, body) {//consume the result });
```

*Note:* Process name cannot be changed.

**Remove a process from a monitoring policy:**

`oneandone.deleteProcessesMonitoringPolicy(policy_id, process_id, function (error, response, body) {//consume the result });`

**List all servers attached to a monitoring policy:**

`oneandone.listMonitoringPoliciesServers(policy_id, function (error, response, body) {//consume the result });`

**Retrieve information about a server attached to a monitoring policy:**

`oneandone.getServersMonitoringPolicy(policy_id, server_id, function (error, response, body) {//consume the result });`

**Attach servers to a monitoring policy:**

```
var serversData = {
	"servers": [
		"server_id"
	]
};
```
```
oneandone.createMonitoringPolicyForServers(policy_id, serversData, function (error, response, body) {//consume the result });
```

**Remove a server from a monitoring policy:**

`oneandone.deleteServersMonitoringPolicy(policy_id, server_id, function (error, response, body) {//consume the result });`


### Logs

**List all logs:**

```
var options = {
	query: "node",	
	page:1,
	perPage:1,
	sort:""
};
```

```oneandone.listLogsFixedPeriodWithOptions(oneandone.PeriodType.LAST_7D, options, function (error, response, body) {//consume the result });```

`period` can be set to `"LAST_HOUR"`, `"LAST_24H"`, `"LAST_7D"`, `"LAST_30D"`, `"LAST_365D"`.

Additional query parameters can be used.

To paginate the list of logs received in the response use `page` and `per_page` parameters. Set ` per_page` to the number of logs that will be shown in each page. `page` indicates the current page. When set to an integer value that is less than or equal to zero, the parameters are ignored by the framework.

To receive the list of logs sorted in expected order, pass a logs property (e.g. `"action"`) in `sort` parameter. Prefix the sorting attribute with `-` sign for sorting in descending order.

Use `query` parameter to search for a string in the response and return only the logs instances that contain it.

To retrieve a collection of logs containing only the requested fields, pass a list of comma-separated properties (e.g. `"id,action,type"`) in `fields` parameter.

If any of the parameters `sort`, `query` or `fields` is set to an empty string, it is ignored in the request.

**List all logs for a custom period:**

```
var options = {
	query: "node",	
	page:1,
	perPage:1,
	sort:""
};
```
```oneandone.listLogsCustomPeriodWithOptions(start_date, end_date, options, function (error, response, body) {//consume the result });```

Additional query parameters can be used.

To paginate the list of logs received in the response use `page` and `per_page` parameters. Set ` per_page` to the number of logs that will be shown in each page. `page` indicates the current page. When set to an integer value that is less than or equal to zero, the parameters are ignored by the framework.

To receive the list of logs sorted in expected order, pass a logs property (e.g. `"action"`) in `sort` parameter. Prefix the sorting attribute with `-` sign for sorting in descending order.

Use `query` parameter to search for a string in the response and return only the logs instances that contain it.

To retrieve a collection of logs containing only the requested fields, pass a list of comma-separated properties (e.g. `"id,action,type"`) in `fields` parameter.

If any of the parameters `sort`, `query` or `fields` is set to an empty string, it is ignored in the request.

**Retrieve a single log:**

`oneandone.getLog(log.id, function (error, response, body) {//consume the result });`


### Users

**List all users:**

`oneandone.listUsers(function (error, response, body) {//consume the result });`

**List all users with options:**

```
var options = {
	query: "node",	
	page:1,
	perPage:1,
	sort:""
};
```
```
oneandone.listUsersWithOptions(options, function (error, response, body) {//consume the result });
```

To paginate the list of users received in the response use `page` and `per_page` parameters. Set ` per_page` to the number of users that will be shown in each page. `page` indicates the current page. When set to an integer value that is less than or equal to zero, the parameters are ignored by the framework.

To receive the list of users sorted in expected order, pass a user property (e.g. `"name"`) in `sort` parameter. Prefix the sorting attribute with `-` sign for sorting in descending order.

Use `query` parameter to search for a string in the response and return only the user instances that contain it.

To retrieve a collection of users containing only the requested fields, pass a list of comma-separated properties (e.g. `"id,name,creation_date,email"`) in `fields` parameter.

If any of the parameters `sort`, `query` or `fields` is set to an empty string, it is ignored in the request.

**Retrieve information about a user:**

`oneandone.getUser(user_id, function (error, response, body) {//consume the result });`

**Create a user:**

```
var userData = {
    "name": " node user",
    "description": "User description",
    "password": "test2015",
    "email": "test@arsys.es"
};
```
```
oneandone.createUser(userData, function (error, response, body) {//consume the result });
```

`Name` and `Password` are required parameters. The password must contain at least 8 characters using uppercase letters, numbers and other special symbols.

**Modify a user:**

```
var updateData = {
	"name": "Manager role",
	"description": "Manager role description",
	"state": "ACTIVE"
};
```
```
oneandone.updateUser(user_id, updateData, function (error, response, body) {//consume the result });
```

All listed fields in the request are optional. `State` can be set to `"ACTIVE"` or `"DISABLED"`.

**Delete a user:**

`oneandone.deleteUser(user_id, function (error, response, body) {//consume the result });`

**Retrieve information about a user's API privileges:**

`oneandone.getUserApiInformation(user_id, function (error, response, body) {//consume the result });

**Retrieve a user's API key:**

`oneandone.getUserApiKey(user_id, function (error, response, body) {//consume the result });`

**List IP's from which API access is allowed for a user:**

`oneandone.getUserApiAllowedIPs(user_id, function (error, response, body) {//consume the result });`

**Add new IP's to a user:**

```
var ipList = {
	"ips": [
		"192.168.1.1"
	]
};
```
```
oneandone.addUserAPIAllowedIPs(user_id, ipList, function (error, response, body) {//consume the result });
```

**Remove an IP and forbid API access from it:**

`oneandone.deleteUserAPIAllowedIPs(user_id, "192.168.1.1", function (error, response, body) {//consume the result });`

**Modify a user's API privileges:**

```
var updateApi = {
	"active": true
};
```
```
oneandone.updateUserApiInformation(user.id, updateApi, function (error, response, body) {//consume the result });
```

**Renew a user's API key:**

`oneandone.updateUserApiKey(user.id, function (error, response, body) {//consume the result });`

### Roles

**List all roles:**

`oneandone.listRoles(function (error, response, body) {//consume the result });`

**List all roles with options:**

```
var options = {
	query: "node",	
	page:1,
	perPage:1,
	sort:""
};
```
```
oneandone.listRolesWithOptions(options, function (error, response, body) {//consume the result });
```

To paginate the list of roles received in the response use `page` and `per_page` parameters. Set ` per_page` to the number of roles that will be shown in each page. `page` indicates the current page. When set to an integer value that is less or equal to zero, the parameters are ignored by the framework.

To receive the list of roles sorted in expected order pass a role property (e.g. `"name"`) in `sort` parameter. Prefix the sorting attribute with `-` sign for sorting in descending order.

Use `query` parameter to search for a string in the response and return only the role instances that contain it.

To retrieve a collection of roles containing only the requested fields pass a list of comma separated properties (e.g. `"id,name,creation_date"`) in `fields` parameter.

If any of the parameters `sort`, `query` or `fields` is set to an empty string, it is ignored in the request.

**Retrieve information about a role:**

`oneandone.getRole(role_id, function (error, response, body) {//consume the result });`

**Create a role:**

```
var roleData = {
	"name": "node role"
};
```
```
oneandone.createRole(roleData, function (error, response, body) {//consume the result });
```

**Clone a role:**

```
var cloneRoleData = {
	"name": "node role"
};
```
```
oneandone.cloneRole(role_id, cloneRoleData, function (error, response, body) {//consume the result });
```

**Modify a role:**

```
var updateRole = {
	"name": "node Manager role",
	"description": "Manager role description",
	"state": "ACTIVE"
};
```
```
oneandone.updateRole(role_id, updateRole, function (error, response, body) {//consume the result });
```

`ACTIVE` and `DISABLE` are valid values for the state.

**Delete a role:**

`oneandone.deleteRole(role_id, function (error, response, body) {//consume the result });`

**Retrieve information about a role's permissions:**

`oneandone.getRolePermissions(role_id, function (error, response, body) {//consume the result });`

**Modify a role's permissions:**

```
var updatePermissions = {
	"servers": {
		"show": true,
		"create": true,
		"delete": false,
		"set_name": true,
		"set_description": true,
		"start": true,
		"restart": true,
		"shutdown": true
	},
	"images": {
		"show": true,
		"create": true,
		"delete": false,
		"set_name": true,
		"set_description": true,
		"disable_automatic_creation": true
	}
};
```
```
oneandone.updateRolePermissions(role_id, updatePermissions, function (error, response, body) {//consume the result });
```


**Assign users to a role:**

```
var usersToAdd = {
	"users": [
		user_id
	]
};
```

`usersList` is a String List of user ID's.

**List a role's users:**

`oneandone.listRoleUsers(role_id, function (error, response, body) {//consume the result });`

**Retrieve information about a role's user:**

`oneandone.getRoleUser(role_id, user_id, function (error, response, body) {//consume the result });`

**Remove a role's user:**

`oneandone.removeRoleFromUser(role_id, user_id, function (error, response, body) {//consume the result });`


### Usages

**List your usages with options:**

```
var options = {
	query: "node",	
	page:1,
	perPage:1,
	sort:""
};
```

```oneandone.listUsagesFixedPeriodWithOptions(oneandone.PeriodType.LAST_30D, options, function (error, response, body) {//consume the result });```

`period` can be set to `"LAST_HOUR"`, `"LAST_24H"`, `"LAST_7D"`, `"LAST_30D"`, `"LAST_365D"` .

**List your usages for a custom period:**

```
var options = {
	query: "node",	
	page:1,
	perPage:1,
	sort:""
};
```

```oneandone.listUsagesCustomPeriodWithOptions(start_date, end_date, null, function (error, response, body) {//consume the result });```

To paginate the list of usages received in the response use `page` and `per_page` parameters. Set ` per_page` to the number of usages that will be shown in each page. `page` indicates the current page. When set to an integer value that is less than or equal to zero, the parameters are ignored by the framework.

To receive the list of usages sorted in expected order, pass a usages property (e.g. `"name"`) in `sort` parameter. Prefix the sorting attribute with `-` sign for sorting in descending order.

Use `query` parameter to search for a string in the response and return only the usages instances that contain it.

To retrieve a collection of usages containing only the requested fields, pass a list of comma-separated properties (e.g. `"id,name"`) in `fields` parameter.

If any of the parameters `sort`, `query` or `fields` is set to an empty string, it is ignored in the request.


### Server Appliances

**List all the appliances that you can use to create a server:**

`oneandone.listServerAppliances(function (error, response, body) {//consume the result });`

```
var options = {
	query: "node",	
	page:1,
	perPage:1,
	sort:""
};
```

```oneandone.listServerAppliancesWithOptions(options, function (error, response, body) {//consume the result });```

To paginate the list of server appliances received in the response use `page` and `per_page` parameters. Set `per_page` to the number of server appliances that will be shown in each page. `page` indicates the current page. When set to an integer value that is less than or equal to zero, the parameters are ignored by the framework.

To receive the list of server appliances sorted in expected order, pass a server appliance property (e.g. `"os"`) in `sort` parameter. Prefix the sorting attribute with `-` sign for sorting in descending order.

Use `query` parameter to search for a string in the response and return only the server appliance instances that contain it.

To retrieve a collection of server appliances containing only the requested fields, pass a list of comma separated properties (e.g. `"id,os,architecture"`) in `fields` parameter.

If any of the parameters `sort`, `query` or `fields` is blank, it is ignored in the request.

**Retrieve information about specific appliance:**

`oneandone.getServerAppliance(appliance.id, function (error, response, body) {//consume the result });`


### DVD ISO

**List all operative systems and tools that you can load into your virtual DVD unit:**

`oneandone.listDvdIso(function (error, response, body) {//consume the result });`

```
var options = {
	query: "node",	
	page:1,
	perPage:1,
	sort:""
};
```
```
oneandone.listDvdIsoWithOptions(options, function (error, response, body) {//consume the result });
```

To paginate the list of ISO DVDs received in the response use `page` and `per_page` parameters. Set `per_page` to the number of ISO DVDs that will be shown in each page. `page` indicates the current page. When set to an integer value that is less than or equal to zero, the parameters are ignored by the framework.

To receive the list of ISO DVDs sorted in expected order, pass a ISO DVD property (e.g. `"type"`) in `sort` parameter. Prefix the sorting attribute with `-` sign for sorting in descending order.

Use `query` parameter to search for a string in the response and return only the ISO DVD instances that contain it.

To retrieve a collection of ISO DVDs containing only the requested fields, pass a list of comma-separated properties (e.g. `"id,name,type"`) in `fields` parameter.

If any of the parameters `sort`, `query` or `fields` is blank, it is ignored in the request.

**Retrieve a specific ISO image:**

`oneandone.getDvdIso(dvdIso.id, function (error, response, body) {//consume the result });`

### Ping

**Check if 1&amp;1 REST API is running:**

`oneandone.pingApi(function (error, response, body) {//consume the result });`

If the API is running, the response is `PONG`.

**Validate if 1&amp;1 REST API is running and the authorization token is valid:**

`oneandone.pingApiAuthentication(function (error, response, body) {//consume the result });`

The response is `PONG`. if the API is running and the token is valid.


### Pricing

**Show prices for all available resources in the Cloud Panel:**

`oneandone.getPricing(function (error, response, body) {//consume the result });`


### Data Centers

**List all 1&amp;1 Cloud Server data centers:**

`oneandone.listDatacenters(function (error, response, body) {//consume the result });`

**List all 1&amp;1 Cloud Server data centers with options:**

```
var options = {
	query: "node",	
	page:1,
	perPage:1,
	sort:""
};
```
```
oneandone.listDatacentersWithOptions(options, function (error, response, body) {//consume the result });
```

**Retrieve a specific data center:**

`oneandone.getDatacenters(dataCenter.id, function (error, response, body) {//consume the result });`

## Example

The example below is a main class in Node.js that creates an IP, firewall policy, and a load balancer. After that it creates a server and waits for it to deploy and power on.

After the server is created we assign the firewall policy and the load balancer to the server and in the end we clean everything out.

```
public class main {

    static OneAndOneApi oneandoneApi = new OneAndOneApi();

    /**
     * @param args the command line arguments
     * @throws Node.js.lang.InterruptedException
     */
    public static void main(String[] args) throws InterruptedException {
        try {
            CreateServers();
        } catch (Exception ex) {
            Logger.getLogger(main.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    static void CreateServers() throws RestClientException, IOException, InterruptedException {
        String firewallPolicyName = "TestfirewallPolicyNode.js";
        String loadBalancerName = "TestLoadBalancerNode.js";
        String serverName = "ExampleServerNode.js";
        String publicIpId = "";

        try {
            //create a firewall policy
            //define the required rules
            System.out.println("Creating Firewall Policy with name " + firewallPolicyName);
            List<CreateFirewallPocliyRule> newRules = new ArrayList<CreateFirewallPocliyRule>();
            CreateFirewallPocliyRule rule1 = new CreateFirewallPocliyRule();
            rule1.setPortTo(80);
            rule1.setPortFrom(80);
            rule1.setProtocol(Types.RuleProtocol.TCP);
            rule1.setSource("0.0.0.0");

            CreateFirewallPocliyRule rule2 = new CreateFirewallPocliyRule();
            rule2.setPortTo(443);
            rule2.setPortFrom(443);
            rule2.setProtocol(Types.RuleProtocol.TCP);
            rule2.setSource("0.0.0.0");

            CreateFirewallPocliyRule rule3 = new CreateFirewallPocliyRule();
            rule3.setPortTo(8447);
            rule3.setPortFrom(8447);
            rule3.setProtocol(Types.RuleProtocol.TCP);
            rule3.setSource("0.0.0.0");

            CreateFirewallPocliyRule rule4 = new CreateFirewallPocliyRule();
            rule4.setPortTo(3389);
            rule4.setPortFrom(3389);
            rule4.setProtocol(Types.RuleProtocol.TCP);
            rule4.setSource("0.0.0.0");

            CreateFirewallPocliyRule rule5 = new CreateFirewallPocliyRule();
            rule5.setPortTo(8443);
            rule5.setPortFrom(8443);
            rule5.setProtocol(Types.RuleProtocol.TCP);
            rule5.setSource("0.0.0.0");

            newRules.add(rule1);
            newRules.add(rule2);
            newRules.add(rule3);
            newRules.add(rule4);
            newRules.add(rule5);

            CreateFirewallPolicyRequest policyRequest = new CreateFirewallPolicyRequest();
            policyRequest.setName(firewallPolicyName);
            policyRequest.setRules(newRules);
            policyRequest.setDescription("test firewall policy with 80,443,8447,3389 and 8443 ports open");

            FirewallPolicyResponse firewallPolicyResult = oneandoneApi.getFirewallPoliciesApi().createFirewallPolicy(policyRequest);

            System.out.println("Creating LoadBalancer with name " + loadBalancerName);
            //create a loadbalancer
            List<LoadBalancerRuleRequest> loadBalancersRules = new ArrayList<LoadBalancerRuleRequest>();
            LoadBalancerRuleRequest rule = new LoadBalancerRuleRequest();
            rule.setPortServer(80);
            rule.setPortBalancer(80);
            rule.setProtocol(Types.LBRuleProtocol.TCP);
            rule.setSource("0.0.0.0");
            loadBalancersRules.add(rule);

            CreateLoadBalancerRequest loadBalancerRequest = new CreateLoadBalancerRequest();
            loadBalancerRequest.setName(loadBalancerName);
            loadBalancerRequest.setDescription("LB with a round robin method and works on port 80");
            loadBalancerRequest.setHealthCheckInterval(1);
            loadBalancerRequest.setPersistence(true);
            loadBalancerRequest.setPersistenceTime(30);
            loadBalancerRequest.setHealthCheckTest(Types.HealthCheckTestTypes.NONE);
            loadBalancerRequest.setMethod(Types.LoadBalancerMethod.ROUND_ROBIN);
            loadBalancerRequest.setRules(loadBalancersRules);

            LoadBalancerResponse loadBalancerResult = oneandoneApi.getLoadBalancerApi().createLoadBalancer(loadBalancerRequest);

            //create a public IP and use it for the server creation
            CreatePublicIPRequest ipRequest = new CreatePublicIPRequest();
            ipRequest.setType(Types.IPType.IPV4);
            PublicIPResponse publicIP = oneandoneApi.getPublicIPApi().createPublicIp(ipRequest);
            publicIpId = publicIP.getId();

            System.out.println("Creating Server with name 'Example Server Node.js'");
            //define the number of cores to give the server
            int vcore = 4;
            //number of cores per processor
            int CoresPerProcessor = 2;
            //get server appliance with OS family type Windows
            List<ServerAppliancesResponse> appliances = oneandoneApi.getServerAppliancesApi().getServerAppliances(0, 0, null, "", "");
            ServerAppliancesResponse appliance = null;
            if (appliances != null && !appliances.isEmpty()) {
                appliance = appliances.get(0);
            }

            CreateServerRequest serverRequest = new CreateServerRequest();
            if (appliance != null) {
                serverRequest.setApplianceId(appliance.getId());
            }
            if (publicIP != null) {
                serverRequest.setIpId(publicIP.getId());
            }

            serverRequest.setName(serverName);
            serverRequest.setDescription("a server with a firewall policy and a loadbalancer");
            //hardware request
            HardwareRequest hardwareRequest = new HardwareRequest();
            //creating a list of hdds to add
            List<HddRequest> hdds = new ArrayList<HddRequest>();
            HddRequest hdd = new HddRequest();
            hdd.setIsMain(Boolean.TRUE);
            hdd.setSize(80);
            hdds.add(hdd);
            hardwareRequest.setCoresPerProcessor(CoresPerProcessor);
            hardwareRequest.setRam(8);
            hardwareRequest.setVcore(vcore);
            hardwareRequest.setHdds(hdds);

            serverRequest.setHardware(hardwareRequest);
            serverRequest.setPowerOn(Boolean.TRUE);
            serverRequest.setPassword("Test123!");

            System.out.println("Server created waiting to be deployed and turned on");

            ServerResponse result = oneandoneApi.getServerApi().createServer(serverRequest);

            //check if the server is deployed and ready for further operations
            ServerResponse testServer = oneandoneApi.getServerApi().getServer(result.getId());
            String serverLoading = ".";
            while (testServer.getStatus().getState() != ServerState.POWERED_ON) {
                serverLoading += ".";
                System.out.println(serverLoading);
                Thread.sleep(1000);
                testServer = oneandoneApi.getServerApi().getServer(testServer.getId());
            }

            System.out.println("Server is Powered up and running");
            //attaching a firewall policy to the server after creation:
            //Get a windows firewall policy by sending the query parameter Windows
            System.out.println("Assigning " + firewallPolicyName + "to " + serverName);

            FirewallPolicyResponse firewallPolicy = oneandoneApi.getFirewallPoliciesApi().getFirewallPolicies(0, 0, null, firewallPolicyName, null).get(0);
            IdRequest fpRequest = new IdRequest();
            fpRequest.setId(firewallPolicy.getId());
            oneandoneApi.getServerIpsApi().updateServerIPFirewallPolicy(testServer.getId(), testServer.getIps().get(0).getId(), fpRequest);
            System.out.println("Assigning " + loadBalancerName + "to " + serverName);
            // attaching a loadbalancer to the server
            LoadBalancerResponse loadbalancer = oneandoneApi.getLoadBalancerApi().getLoadBalancers(0, 0, null, loadBalancerName, null).get(0);
            AssignLoadBalancerRequest lbRequest = new AssignLoadBalancerRequest();
            lbRequest.setLoadBalancerId(loadbalancer.getId());
            oneandoneApi.getServerIpsApi().createServerIPLoadBalancer(testServer.getId(), testServer.getIps().get(0).getId(), lbRequest);
            //cleaning up
            System.out.println("Cleaning up all the created test data");
            System.out.println("Press any key to start cleaning");
            System.in.read();

            oneandoneApi.getServerApi().deleteServer(testServer.getId(), true);
            System.out.println("Server removed");
            oneandoneApi.getLoadBalancerApi().deleteLoadBalancer(loadBalancerResult.getId());
            System.out.println("loadbalancer removed");
            oneandoneApi.getFirewallPoliciesApi().deleteFirewallPolicy(firewallPolicyResult.getId());
            System.out.println("firewall policy removed");
            if (!publicIpId.isEmpty()) {
                oneandoneApi.getPublicIPApi().deletePublicIp(publicIpId);
                System.out.println("public ip removed");
            }

            System.out.println("Finished cleaning press any key to exit");

            System.in.read();
        } catch (Exception ex) {
            Logger.getLogger(main.class.getName()).log(Level.SEVERE, null, ex);
            try {

                List<ServerResponse> servers = oneandoneApi.getServerApi().getAllServers(0, 0, null, serverName, null);
                if (servers.size() > 0) {
                    oneandoneApi.getServerApi().deleteServer(servers.get(0).getId(), true);
                }
            } catch (Exception serverEx) {
                Logger.getLogger(main.class.getName()).log(Level.SEVERE, null, serverEx);
            }
            try {
                List<LoadBalancerResponse> balancers = oneandoneApi.getLoadBalancerApi().getLoadBalancers(0, 0, null, loadBalancerName, null);
                if (balancers.size() > 0) {
                    oneandoneApi.getLoadBalancerApi().deleteLoadBalancer(balancers.get(0).getId());
                }
            } catch (Exception balancerEx) {
                Logger.getLogger(main.class.getName()).log(Level.SEVERE, null, balancerEx);
            }
            try {
                List<FirewallPolicyResponse> firewallPolices = oneandoneApi.getFirewallPoliciesApi().getFirewallPolicies(0, 0, null, firewallPolicyName, null);
                if (firewallPolices.size() > 0) {
                    oneandoneApi.getFirewallPoliciesApi().deleteFirewallPolicy(firewallPolices.get(0).getId());
                }
            } catch (Exception firewallPolicyex) {
                Logger.getLogger(main.class.getName()).log(Level.SEVERE, null, firewallPolicyex);
            }
            try {
                if (!publicIpId.isEmpty()) {
                    oneandoneApi.getPublicIPApi().deletePublicIp(publicIpId);
                }
            } catch (Exception firewallPolicyex) {
                Logger.getLogger(main.class.getName()).log(Level.SEVERE, null, firewallPolicyex);
            }
        }
    }
}
```


## Index

```javascript
 listDvdIso: function (callback) {
        req.is_get([this.dvdIsoEndPointPath], callback)
    }
```
```javascript
getDvdIso: function (dvd_id, callback) {
        req.is_get([this.dvdIsoEndPointPath, dvd_id], callback)
    }
```
```javascript
listFirewallPolicies: function (callback) {
        req.is_get([this.fpEndPointPath], callback)
    }
```
```javascript
getFirewallPolicy: function (fp_id, callback) {
        req.is_get([this.fpEndPointPath, fp_id], callback)
    }
```
```javascript
getFirewallPolicy: function (fp_id, callback) {
        req.is_get([this.fpEndPointPath, fp_id], callback)
    }
```
```javascript
deleteFirewallPolicy: function (fp_id, callback) {
        req.is_del([this.fpEndPointPath, fp_id], callback)
    }
```
```javascript
updateFirewallPolicy: function (fp_id, json, callback) {
        req.is_put([this.fpEndPointPath, fp_id], json, callback)
    }
```
```javascript
listFirewallPolicyRules: function (fp_id, callback) {
        req.is_get([this.fpEndPointPath, fp_id, "rules"], callback)
    }
```
```javascript
getFirewallPolicyRule: function (fp_id, rule_id, callback) {
        req.is_get([this.fpEndPointPath, fp_id, "rules", rule_id], callback)
    }
```
```javascript
addRulesToFirewallPolicy: function (fp_id, json, callback) {
        req.is_post([this.fpEndPointPath, fp_id, "rules"], json, callback)
    }
```
```javascript
removeRuleFromFirewallPolicy: function (fp_id, rule_id, json, callback) {
        req.is_del([this.fpEndPointPath, fp_id, "rules", rule_id], json, callback)
    }
```
```javascript
listFirewallPolicyServerIps: function (fp_id, callback) {
        req.is_get([this.fpEndPointPath, fp_id, "server_ips"], callback)
    }
```
```javascript
getFirewallPolicyServerIp: function (fp_id, ip_id, callback) {
        req.is_get([this.fpEndPointPath, fp_id, "server_ips", ip_id], callback)
    }
```
```javascript
assignServerIpToFirewallPolicy: function (fp_id, json, callback) {
        req.is_post([this.fpEndPointPath, fp_id, "server_ips"], json, callback)
    }
```
```javascript
unassignServerIpFromFirewallPolicy: function (fp_id, ip_id, json, callback) {
        req.is_del([this.fpEndPointPath, fp_id, "server_ips", ip_id], json, callback)
    }
```
```javascript
listImages: function (callback) {
        req.is_get([this.imageEndPointPath], callback)
    }
```
```javascript
getImage: function (srv_id, callback) {
        req.is_get([this.imageEndPointPath, srv_id], callback)
    }
```
```javascript
 createImage: function (json, callback) {
        req.is_post([this.imageEndPointPath], json, callback)
    }
```
```javascript
deleteImage: function (srv_id, callback) {
        req.is_del([this.imageEndPointPath, srv_id], callback)
    }
```
```javascript
updateImage: function (srv_id, json, callback) {
        req.is_put([this.imageEndPointPath, srv_id], json, callback)
    }
```
```javascript
listLoadBalancerRules: function (lb_id, callback) {
        req.is_get([this.lbEndPointPath, lb_id, "rules"], callback)
    }
```
```javascript
getLoadBalancerRule: function (lb_id, rule_id, callback) {
        req.is_get([this.lbEndPointPath, lb_id, "rules", rule_id], callback)
    }
```
```javascript
addRulesToLoadBalancer: function (lb_id, json, callback) {
        req.is_post([this.lbEndPointPath, lb_id, "rules"], json, callback)
    }
```
```javascript
removeRuleFromLoadBalancer: function (lb_id, rule_id, json, callback) {
        req.is_del([this.lbEndPointPath, lb_id, "rules", rule_id], json, callback)
    }
```
```javascript
 listLoadBalancers: function (callback) {
        req.is_get([this.lbEndPointPath], callback)
    }
```
```javascript
getLoadBalancer: function (lb_id, callback) {
        req.is_get([this.lbEndPointPath, lb_id], callback)
    }
```
```javascript
 createLoadBalancer: function (json, callback) {
        req.is_post([this.lbEndPointPath], json, callback)
    }
```
```javascript
deleteLoadBalancer: function (lb_id, callback) {
        req.is_del([this.lbEndPointPath, lb_id], callback)
    }
```
```javascript
updateLoadBalancer: function (lb_id, json, callback) {
        req.is_put([this.lbEndPointPath, lb_id], json, callback)
    }
```
```javascript
listLoadBalancerServerIps: function (lb_id, callback) {
        req.is_get([this.lbEndPointPath, lb_id, "server_ips"], callback)
    }
```
```javascript
 getLoadBalancerServerIp: function (lb_id, ip_id, callback) {
        req.is_get([this.lbEndPointPath, lb_id, "server_ips", ip_id], callback)
    }
```
```javascript
assignServerIpToLoadBalancer: function (lb_id, json, callback) {
        req.is_post([this.lbEndPointPath, lb_id, "server_ips"], json, callback)
    }
```
```javascript
unassignServerIpFromLoadBalancer: function (lb_id, ip_id, json, callback) {
        req.is_del([this.lbEndPointPath, lb_id, "server_ips", ip_id], json, callback)
    }
```
```javascript
listLogsCustomPeriodWithOptions: function (startDate, endDate, options, callback) {
        var path = this.logEndPointPath + "?period=CUSTOM";
        path += "&start_date=" + startDate + "&end_date=" + endDate;

        if (options) {
            if (options.page) {
                path += "&page=" + options.page;
            }
            if (options.perPage) {
                path += "&per_page=" + options.perPage;
            }
            if (options.sort) {
                path += "&sort=" + options.sort;
            }
            if (options.query) {
                path += "&q=" + options.query;
            }
            if (options.fields) {
                path += "&fields=" + options.fields;
            }
        }
        req.is_get([path], callback)
    }
```
```javascript
listLogsFixedPeriodWithOptions: function (period, options, callback) {
        var path = this.logEndPointPath + "?period=" + period;
        if (options) {
            if (options.page) {
                path += "&page=" + options.page;
            }
            if (options.perPage) {
                path += "&per_page=" + options.perPage;
            }
            if (options.sort) {
                path += "&sort=" + options.sort;
            }
            if (options.query) {
                path += "&q=" + options.query;
            }
            if (options.fields) {
                path += "&fields=" + options.fields;
            }
        }
        req.is_get([path], callback)
    }
```
```javascript
getLog: function (log_id, callback) {
        req.is_get([this.logEndPointPath, log_id], callback)
    }
```
```javascript
listMonitoringCenters: function (callback) {
        req.is_get([this.mcEndPointPath], callback)
    }
```
```javascript
 getServerMonitoringCenterCustomPeriod: function (srv_id, startDate, endDate, callback) {
        var path = "?period=CUSTOM";
        path += "&start_date=" + startDate + "&end_date=" + endDate;
        req.is_get([this.mcEndPointPath, srv_id, path], callback)
    }
```
```javascript
getServerMonitoringCenterFixedPeriod: function (srv_id, period, callback) {
        var path = "?period=" + period;
        req.is_get([this.mcEndPointPath, srv_id, path], callback)
    }
```
```javascript
listMonitoringPolicies: function (callback) {
        req.is_get([this.mpEndPointPath], callback)
    }
```
```javascript
 getMonitoringPolicy: function (mp_id, callback) {
        req.is_get([this.mpEndPointPath, mp_id], callback)
    }
```
```javascript
createMonitoringPolicy: function (json, callback) {
        req.is_post([this.mpEndPointPath], json, callback)
    }
```
```javascript
deleteMonitoringPolicy: function (mp_id, callback) {
        req.is_del([this.mpEndPointPath, mp_id], callback)
    }
```
```javascript
updateMonitoringPolicy: function (mp_id, json, callback) {
        req.is_put([this.mpEndPointPath, mp_id], json, callback)
    }
```
```javascript
listMonitoringPoliciesPorts: function (mp_id, callback) {
        req.is_get([this.mpEndPointPath, mp_id, this.portsPath], callback)
    }
```
```javascript
getPortsMonitoringPolicy: function (mp_id, port_id, callback) {
        req.is_get([this.mpEndPointPath, mp_id, this.portsPath, port_id], callback)
    }
```
```javascript
createMonitoringPolicyForPorts: function (mp_id, json, callback) {
        req.is_post([this.mpEndPointPath, mp_id, this.portsPath], json, callback)
    }
```
```javascript
deletePortsMonitoringPolicy: function (mp_id, port_id, callback) {
        req.is_del([this.mpEndPointPath, mp_id, this.portsPath, port_id], callback)
    }
```
```javascript
updatePortsMonitoringPolicy: function (mp_id, port_id, json, callback) {
        req.is_put([this.mpEndPointPath, mp_id, this.portsPath, port_id], json, callback)
    }
```
```javascript
listMonitoringPoliciesProcesses: function (mp_id, callback) {
        req.is_get([this.mpEndPointPath, mp_id, this.processesPath], callback)
    }
```
```javascript
getProcessesMonitoringPolicy: function (mp_id, process_id, callback) {
        req.is_get([this.mpEndPointPath, mp_id, this.processesPath, process_id], callback)
    }
```
```javascript
createMonitoringPolicyForProcesses: function (mp_id, json, callback) {
        req.is_post([this.mpEndPointPath, mp_id, this.processesPath], json, callback)
    }
```
```javascript
deleteProcessesMonitoringPolicy: function (mp_id, process_id, callback) {
        req.is_del([this.mpEndPointPath, mp_id, this.processesPath, process_id], callback)
    }
```
```javascript
updateProcessesMonitoringPolicy: function (mp_id, process_id, json, callback) {
        req.is_put([this.mpEndPointPath, mp_id, this.processesPath, process_id], json, callback)
    }
```
```javascript
listMonitoringPoliciesServers: function (mp_id, callback) {
        req.is_get([this.mpEndPointPath, mp_id, this.serversPath], callback)
    }
```
```javascript
getServersMonitoringPolicy: function (mp_id, server_id, callback) {
        req.is_get([this.mpEndPointPath, mp_id, this.serversPath, server_id], callback)
    }
```
```javascript
createMonitoringPolicyForServers: function (mp_id, json, callback) {
        req.is_post([this.mpEndPointPath, mp_id, this.serversPath], json, callback)
    }
```
```javascript
deleteServersMonitoringPolicy: function (mp_id, server_id, callback) {
        req.is_del([this.mpEndPointPath, mp_id, this.serversPath, server_id], callback)
    }
```
```javascript
listPrivateNetworkServers: function (pn_id, callback) {
        req.is_get([this.pnEndPointPath, pn_id, "servers"], callback)
    }
```
```javascript
getPrivateNetworkServer: function (pn_id, srv_id, callback) {
        req.is_get([this.pnEndPointPath, pn_id, "servers", srv_id], callback)
    }
```
```javascript
attachServerToPrivateNetwork: function (pn_id, json, callback) {
        req.is_post([this.pnEndPointPath, pn_id, "servers"], json, callback)
    }
```
```javascript
detachServerFromPrivateNetwork: function (pn_id, srv_id, json, callback) {
        req.is_del([this.pnEndPointPath, pn_id, "servers", srv_id], json, callback)
    }
```
```javascript
listPrivateNetworks: function (callback) {
        req.is_get([this.pnEndPointPath], callback)
    }
```
```javascript
getPrivateNetwork: function (pn_id, callback) {
        req.is_get([this.pnEndPointPath, pn_id], callback)
    }
```
```javascript
 createPrivateNetwork: function (json, callback) {
        req.is_post([this.pnEndPointPath], json, callback)
    }
```
```javascript
deletePrivateNetwork: function (pn_id, callback) {
        req.is_del([this.pnEndPointPath, pn_id], callback)
    }
```
```javascript
updatePrivateNetwork: function (pn_id, json, callback) {
        req.is_put([this.pnEndPointPath, pn_id], json, callback)
    }
```
```javascript
listPublicIps: function (callback) {
        req.is_get([this.ipEndPointPath], callback)
    }
```
```javascript
getPublicIp: function (ip_id, callback) {
        req.is_get([this.ipEndPointPath, ip_id], callback)
    }
```
```javascript
createPublicIp: function (json, callback) {
        req.is_post([this.ipEndPointPath], json, callback)
    }
```
```javascript
deletePublicIp: function (ip_id, callback) {
        req.is_del([this.ipEndPointPath, ip_id], callback)
    }
```
```javascript
updatePublicIp: function (ip_id, json, callback) {
        req.is_put([this.ipEndPointPath, ip_id], json, callback)
    }
```
```javascript
listServers: function (callback) {
        req.is_get(["servers"], callback)
    }
```
```javascript
getServer: function (srv_id, callback) {
        req.is_get(["servers", srv_id], callback)
    }
```
```javascript
 listHardwareFlavours: function (callback) {
        req.is_get(["servers/fixed_instance_sizes"], callback)
    }
```
```javascript
getHardwareFlavour: function (favour_id, callback) {
        req.is_get(["servers", "fixed_instance_sizes", favour_id], callback)
    }
```
```javascript
getServerStatus: function (srv_id, callback) {
        req.is_get(["servers", srv_id, "status"], callback)
    }
```
```javascript
createServer: function (json, callback) {
        req.is_post(["servers"], json, callback)
    }
```
```javascript
deleteServer: function (srv_id, keep_ips, callback) {
        if (!keep_ips) {
            keep_ips = false;
        }
        req.is_del(["servers", srv_id + "?keep_ips=" + keep_ips], callback)
    }
```
```javascript
updateServer: function (srv_id, json, callback) {
        req.is_put(["servers", srv_id], json, callback)
    }
```
```javascript
updateServerStatus: function (srv_id, json, callback) {
        req.is_put(["servers", srv_id, "status/action"], json, callback)
    }
```
```javascript
listServerPrivateNetworks: function (srv_id, callback) {
        req.is_get(["servers", srv_id, "private_networks"], callback)
    }
```
```javascript
getServerPrivateNetwork: function (srv_id, private_network_id, callback) {
        req.is_get(["servers", srv_id, "private_networks", private_network_id], callback)
    }
```
```javascript
assignPrivateNetworkToServer: function (srv_id, json, callback) {
        req.is_post(["servers", srv_id, "private_networks"], json, callback)
    }
```
```javascript
deletePrivateNetworkFromServer: function (srv_id, private_network_id, callback) {
        req.is_del(["servers", srv_id, "private_networks", private_network_id], callback)
    }
```
```javascript
 listSnapshots: function (srv_id, callback) {
        req.is_get(["servers", srv_id, "snapshots"], callback)
    }
```
```javascript
 restoreSnapshot: function (srv_id, snapshot_id, callback) {
        req.is_put(["servers", srv_id, "snapshots", snapshot_id], null, callback)
    }
```
```javascript
createSnapshot: function (srv_id, callback) {
        req.is_post(["servers", srv_id, "snapshots"], null, callback)
    }
```
```javascript
deleteSnapshot: function (srv_id, snapshot_id, callback) {
        req.is_del(["servers", srv_id, "snapshots", snapshot_id], callback)
    }
```
```javascript
clone: function (srv_id, json, callback) {
        req.is_post(["servers", srv_id, "clone"], json, callback)
    }
```javascript
listServerAppliances: function (callback) {
        req.is_get([this.appliancesEndPointPath], callback)
    }
```
```javascript
getServerAppliance: function (aplnc_id, callback) {
        req.is_get([this.appliancesEndPointPath, aplnc_id], callback)
    }
```
```javascript
getHardware: function (srv_id, callback) {
        req.is_get(["servers", srv_id, "hardware"], callback)
    }
```
```javascript
updateHardware: function (srv_id, json, callback) {
        req.is_put(["servers", srv_id, "hardware"], json, callback)
    }
```
```javascript
getDvd: function (srv_id, callback) {
        req.is_get(["servers", srv_id, "dvd"], callback)
    }
```
```javascript
loadDvd: function (srv_id, json, callback) {
        req.is_put(["servers", srv_id, "dvd"], json, callback)
    }
```
```javascript
unloadDvd: function (srv_id, callback) {
        req.is_del(["servers", srv_id, "dvd"], callback)
    }
```
```javascript
listHdds: function (srv_id, callback) {
        req.is_get(["servers", srv_id, "hardware/hdds"], callback)
    }
```
```javascript
getHdd: function (srv_id, hdd_id, callback) {
        req.is_get(["servers", srv_id, "hardware/hdds", hdd_id], callback)
    }
```
```javascript
addHdd: function (srv_id, json, callback) {
        req.is_post(["servers", srv_id, "hardware/hdds"], json, callback)
    }
```
```javascript
updateHdd: function (srv_id, hdd_id, json, callback) {
        req.is_put(["servers", srv_id, "hardware/hdds", hdd_id], json, callback)
    }
```
```javascript
deleteHdd: function (srv_id, hdd_id, callback) {
        req.is_del(["servers", srv_id, "hardware/hdds", hdd_id], callback)
    }
```
```javascript
getServerImage: function (srv_id, callback) {
        req.is_get(["servers", srv_id, "image"], callback)
    }
```
```javascript
 updateServerImage: function (srv_id, json, callback) {
        req.is_put(["servers", srv_id, "image"], json, callback)
    }
```
```javascript
getIp: function (srv_id, ip_id, callback) {
        req.is_get(["servers", srv_id, "ips", ip_id], callback)
    }
```
```javascript
addIp: function (srv_id, json, callback) {
        req.is_post(["servers", srv_id, "ips"], json, callback)
    }
```
```javascript
listIps: function (srv_id, callback) {
        req.is_get(["servers", srv_id, "ips"], callback)
    }
```
```javascript
deleteIp: function (srv_id, ip_id,json, callback) {
        req.is_delWithBody(["servers", srv_id, "ips", ip_id],json, callback)
    }
```
```javascript
listIpFirewallPolicies: function (srv_id, ip_id, callback) {
        req.is_get(["servers", srv_id, "ips", ip_id, "firewall_policy"], callback)
    }
```
```javascript
addFirewallPolicy: function (srv_id, ip_id, json, callback) {
        req.is_put(["servers", srv_id, "ips", ip_id, "firewall_policy"], json, callback)
    }
```
```javascript
deleteIpFirewallPolicy: function (srv_id, ip_id, callback) {
        req.is_del(["servers", srv_id, "ips", ip_id, "firewall_policy"], callback)
    }
```
```javascript
listIpLoadBalancer: function (srv_id, ip_id, callback) {
        req.is_get(["servers", srv_id, "ips", ip_id, "load_balancers"], callback)
    }
```
```javascript
addIpLoadBalancer: function (srv_id, ip_id, json, callback) {
        req.is_post(["servers", srv_id, "ips", ip_id, "load_balancers"], json, callback)
    }
```
```javascript
deleteIpLoadBalancer: function (srv_id, ip_id, load_balancer_id, callback) {
        req.is_del(["servers", srv_id, "ips", ip_id, "load_balancers", load_balancer_id], callback)
    }
```
```javascript
listSharedStorages: function (callback) {
        req.is_get([this.ssEndPointPath], callback)
    }
```
```javascript
getSharedStorage: function (strg_id, callback) {
        req.is_get([this.ssEndPointPath, strg_id], callback)
    }
```
```javascript
createSharedStorage: function (json, callback) {
        req.is_post([this.ssEndPointPath], json, callback)
    }
```
```javascript
deleteSharedStorage: function (strg_id, callback) {
        req.is_del([this.ssEndPointPath, strg_id], callback)
    }
```
```javascript
 updateSharedStorage: function (strg_id, json, callback) {
        req.is_put([this.ssEndPointPath, strg_id], json, callback)
    }
```
```javascript
 listSharedStorageServers: function (strg_id, callback) {
        req.is_get([this.ssEndPointPath, strg_id, "servers"], callback)
    }
```
```javascript
getSharedStorageServer: function (strg_id, srv_id, callback) {
        req.is_get([this.ssEndPointPath, strg_id, "servers", srv_id], callback)
    }
```
```javascript
attachServerToSharedStorage: function (strg_id, json, callback) {
        req.is_post([this.ssEndPointPath, strg_id, "servers"], json, callback)
    }
```
```javascript
detachServerFromSharedStorage: function (strg_id, srv_id, json, callback) {
        req.is_del([this.ssEndPointPath, strg_id, "servers", srv_id], json, callback)
    }
```
```javascript
getAccessCredentials: function (callback) {
        req.is_get([this.ssEndPointPath, "access"], callback)
    }
```
```javascript
changePassword: function (json, callback) {
        req.is_put([this.ssEndPointPath, "access"], json, callback)
    }
```
```javascript
listUsagesCustomPeriodWithOptions: function (startDate, endDate, options, callback) {
        var path = this.usagesEndPointPath + "?period=CUSTOM";
        path += "&start_date=" + startDate + "&end_date=" + endDate;

        if (options) {
            if (options.page) {
                path += "&page=" + options.page;
            }
            if (options.perPage) {
                path += "&per_page=" + options.perPage;
            }
            if (options.sort) {
                path += "&sort=" + options.sort;
            }
            if (options.query) {
                path += "&q=" + options.query;
            }
            if (options.fields) {
                path += "&fields=" + options.fields;
            }
        }
        req.is_get([path], callback)
    }
```
```javascript
listUsagesFixedPeriodWithOptions: function (period, options, callback) {
        var path = this.usagesEndPointPath + "?period=" + period;
        if (options) {
            if (options.page) {
                path += "&page=" + options.page;
            }
            if (options.perPage) {
                path += "&per_page=" + options.perPage;
            }
            if (options.sort) {
                path += "&sort=" + options.sort;
            }
            if (options.query) {
                path += "&q=" + options.query;
            }
            if (options.fields) {
                path += "&fields=" + options.fields;
            }
        }
        req.is_get([path], callback)
    }
```
```javascript
getUserApiInformation: function (usr_id, callback) {
        req.is_get([this.usrEndPointPath, usr_id, "api"], callback)
    }
```
```javascript
updateUserApiInformation: function (usr_id, json, callback) {
        req.is_put([this.usrEndPointPath, usr_id, "api"], json, callback)
    }
```
```javascript
 getUserApiKey: function (usr_id, callback) {
        req.is_get([this.usrEndPointPath, usr_id, "api", "key"], callback)
    }
```
```javascript
updateUserApiKey: function (usr_id, callback) {
        req.is_put([this.usrEndPointPath, usr_id, "api", "key"], null, callback)
    }
```
```javascript
getUserApiAllowedIPs: function (usr_id, callback) {
        req.is_get([this.usrEndPointPath, usr_id, "api", "ips"], callback)
    }
```
```javascript
addUserAPIAllowedIPs: function (usr_id, json, callback) {
        req.is_post([this.usrEndPointPath, usr_id, "api", "ips"], json, callback)
    }
```
```javascript
deleteUserAPIAllowedIPs: function (usr_id, ip, callback) {
        req.is_del([this.usrEndPointPath, usr_id, "api", "ips", ip], callback)
    }
```
```javascript
listUsers: function (callback) {
        req.is_get([this.usrEndPointPath], callback)
    }
```
```javascript
getUser: function (usr_id, callback) {
        req.is_get([this.usrEndPointPath, usr_id], callback)
    }
```
```javascript
createUser: function (json, callback) {
        req.is_post([this.usrEndPointPath], json, callback)
    }
```
```javascript
deleteUser: function (usr_id, callback) {
        req.is_del([this.usrEndPointPath, usr_id], callback)
    }
```
```javascript
updateUser: function (usr_id, json, callback) {
        req.is_put([this.usrEndPointPath, usr_id], json, callback)
    }
```
```javascript
listVpns: function (callback) {
        req.is_get([this.vpnEndPointPath], callback)
    }
```
```javascript
getVpn: function (vpn_id, callback) {
        req.is_get([this.vpnEndPointPath, vpn_id], callback)
    }
```
```javascript
getConfigurationFile: function (vpn_id, callback) {
        req.is_get([this.vpnEndPointPath, vpn_id, "configuration_file"], callback)
    }
```
```javascript
createVpn: function (json, callback) {
        req.is_post([this.vpnEndPointPath], json, callback)
    }
```
```javascript
deleteVpn: function (vpn_id, callback) {
        req.is_del([this.vpnEndPointPath, vpn_id], callback)
    }
```
```javascript
updateVpn: function (vpn_id, json, callback) {
        req.is_put([this.vpnEndPointPath, vpn_id], json, callback)
    }
```
```javascript
listRoles: function (callback) {
        req.is_get([this.roleEndPointPath], callback)
    }
```
```javascript
getRole: function (role_id, callback) {
        req.is_get([this.roleEndPointPath, role_id], callback)
    }
```
```javascript
 createRole: function (json, callback) {
        req.is_post([this.roleEndPointPath], json, callback)
    }
```
```javascript
deleteRole: function (role_id, callback) {
        req.is_del([this.roleEndPointPath, role_id], callback)
    }
```
```javascript
updateRole: function (role_id, json, callback) {
        req.is_put([this.roleEndPointPath, role_id], json, callback)
    }
```
```javascript
cloneRole: function (role_id, json, callback) {
        req.is_post([this.roleEndPointPath, role_id, "clone"], json, callback)
    }
```
```javascript
getRolePermissions: function (role_id, callback) {
        req.is_get([this.roleEndPointPath, role_id, "permissions"], callback)
    }
```
```javascript
updateRolePermissions: function (role_id, json, callback) {
        req.is_put([this.roleEndPointPath, role_id, "permissions"], json, callback)
    }
```
```javascript
listRoleUsers: function (role_id, callback) {
        req.is_get([this.roleEndPointPath, role_id, "users"], callback)
    }
```
```javascript
getRoleUser: function (role_id, usr_id, callback) {
        req.is_get([this.roleEndPointPath, role_id, "users", usr_id], callback)
    }
```
```javascript
addUsersToRole: function (role_id, json, callback) {
        req.is_post([this.roleEndPointPath, role_id, "users"], json, callback)
    }
```
```javascript
removeRoleFromUser: function (role_id, usr_id, callback) {
        req.is_del([this.roleEndPointPath, role_id, "users", usr_id], callback)
    }
```
```javascript
pingApi: function (callback) {
        req.is_get(["ping"], callback)
    }
```
```javascript
pingApiAuthentication: function (callback) {
        req.is_get(["ping_auth"], callback)
    }
```
```javascript
getPricing: function (callback) {
        req.is_get(["pricing"], callback)
    }
```
```javascript
listDatacenters: function (callback) {
        req.is_get([this.datacentersEndPointPath], callback)
    }
```
```javascript
 getDatacenters: function (dc_id, callback) {
        req.is_get([this.datacentersEndPointPath, dc_id], callback)
    }
```
