/**
 * Created by Ali on 8/1/2016.
 */

var assert = require('assert');
var oneandone = require('../lib/liboneandone');
var helper = require('../test/testHelper');
var server = {};
var currentIp = {};
var firewallPolicy = {};
var loadBalancer = {};

var serverData = {
    "name": "Node Server network test",
    "description": "description",
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
    "appliance_id": "81504C620D98BCEBAA5202D145203B4B",
    "datacenter_id": "908DC2072407C94C8054610AD5A53B8C"
};

var checkServerReady = function (currentServer, callback) {
    var checkServer = {};
    oneandone.getServer(currentServer.id, function (error, response, body) {
        checkServer = JSON.parse(body);
        if ((checkServer.status.state != oneandone.ServerState.POWERED_OFF
            && checkServer.status.state != oneandone.ServerState.POWERED_ON)
            || (checkServer.status.percent != null && checkServer.status.percent != 0)) {
            setTimeout(function () {
                checkServerReady(checkServer, callback);
            }, 5000);
        } else {
            callback();
        }
    });

};

describe('Server Network tests', function () {
    this.timeout(900000);

    before(function (done) {
        helper.authenticate(oneandone);
        oneandone.createServer(serverData, function (error, response, body) {
            assert.equal(error, null);
            server = JSON.parse(body);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            assert.equal(server.name, serverData.name)
            done();
        });
    });

    removeServer = function (serverToRemove, callback) {
        if (serverToRemove.id) {
            checkServerReady(serverToRemove, function () {
                oneandone.deleteServer(serverToRemove.id, function (error, response, body) {
                    assert.equal(error, null);
                    callback();
                });
            });
        }
        else {
            callback();
        }
    };

    removeIp = function (serverToRemove, ip_id, callback) {
        if (serverToRemove.id && ip_id) {
            checkServerReady(serverToRemove, function () {
                oneandone.deleteIp(serverToRemove.id, ip_id, function (error, response, body) {
                    assert.equal(error, null);
                    callback();
                });
            });
        }
        else {
            callback();
        }
    };
    after(function (done) {
        removeServer(server, function () {
            done();
        });
    });

    it('Add Ip to the server', function (done) {
        ipData = {
            "type": "IPV4"
        };
        checkServerReady(server, function () {
            oneandone.addIp(server.id, ipData, function (error, response, body) {
                assert.equal(error, null);
                var result = JSON.parse(body);
                checkServerReady(server, function () {
                    assert.notEqual(response, null);
                    assert.notEqual(body, null);
                    assert.notEqual(result, null);
                    done();
                });
            });
        });
    });

    it('List servers Ips', function (done) {
        oneandone.listIps(server.id, function (error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            currentIp = object[0];
            assert(object.length > 0);
            done();
        });
    });

    it('Get servers Ip', function (done) {
        oneandone.getIp(server.id, currentIp.id, function (error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.id, currentIp.id);
            done();
        });
    });

    it('Add Firewall Policy to an IP', function (done) {
        //todo: replace with real data
        firewallPolicyData = {
            "id": "34A7E423DA3253E6D38563ED06F1041F"
        };
        checkServerReady(server, function () {
            oneandone.addFirewallPolicy(server.id, currentIp.id, firewallPolicyData, function (error, response, body) {
                checkServerReady(server, function () {
                    assert.equal(error, null);
                    assert.notEqual(body, null);
                    done();
                });
            });
        });
    });

    it('List ip FirewallPolicies', function (done) {
        checkServerReady(server, function () {
            oneandone.listIpFirewallPolicies(server.id, currentIp.id, function (error, response, body) {
                assert.equal(error, null);
                assert.notEqual(body, null);
                var object = JSON.parse(body);
                if (Array.isArray(object)) {
                    assert(object.length > 0);
                    firewallPolicy = object[0];
                } else {
                    firewallPolicy = object;
                }
                done();
            });
        });
    });

    it('Remove Firewall Policy from  an IP', function (done) {
        checkServerReady(server, function () {
            oneandone.deleteIpFirewallPolicy(server.id, currentIp.id, function (error, response, body) {
                assert.equal(error, null);
                assert.notEqual(response, null);
                assert.notEqual(body, null);
                done();
            });
        });

    });

    it('Add LoadBalancer to an IP', function (done) {
        loadBalancerData = {
            "load_balancer_id": "13C3F75BA55AF28B8B2B4E508786F48B"
        };
        checkServerReady(server, function () {
            oneandone.addIpLoadBalancer(server.id, currentIp.id, loadBalancerData, function (error, response, body) {
                checkServerReady(server, function () {
                    assert.equal(error, null);
                    assert.notEqual(body, null);
                    done();
                });
            });
        });
    });

    it('List ip Load Balancers', function (done) {
        checkServerReady(server, function () {
            oneandone.listIpLoadBalancer(server.id, currentIp.id, function (error, response, body) {
                assert.equal(error, null);
                assert.notEqual(body, null);
                var object = JSON.parse(body);
                assert(object.length > 0);
                loadBalancer = object[0];
                done();
            });
        });
    });

    it('Remove Load Balancers from  an IP', function (done) {
        checkServerReady(server, function () {
            oneandone.deleteIpLoadBalancer(server.id, currentIp.id, loadBalancer.id, function (error, response, body) {
                assert.equal(error, null);
                assert.notEqual(response, null);
                assert.notEqual(body, null);
                done();
            });
        });

    });


});
