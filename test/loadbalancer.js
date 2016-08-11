/**
 * Created by Ali on 8/11/2016.
 */

var assert = require('assert');
var oneandone = require('../lib/liboneandone');
var helper = require('../test/testHelper');
var server = {};
var loadBalancer = {};
var serverData = {
    "name": "Node loadbalancer ",
    "description": "description",
    "hardware": {
        "vcore": 2,
        "cores_per_processor": 1,
        "ram": 2,
        "hdds": [
            {
                "size": 40,
                "is_main": true
            }
        ]
    },
    "appliance_id": "81504C620D98BCEBAA5202D145203B4B",
    "datacenter_id": "908DC2072407C94C8054610AD5A53B8C"
};


describe('LoadBalancer tests', function () {
    this.timeout(900000);

    before(function (done) {
        helper.authenticate(oneandone);
        oneandone.createServer(serverData, function (error, response, body) {
            server = JSON.parse(body);
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
            helper.checkServerReady(server, function () {
                oneandone.createLoadBalancer(balancerData, function (error, response, body) {
                    assert.equal(error, null);
                    assert.notEqual(response, null);
                    loadBalancer = JSON.parse(body);
                    done();
                });
            });
        });
    });

    removeServer = function (serverToRemove, callback) {
        if (serverToRemove.id) {
            helper.checkServerReady(serverToRemove, function () {
                oneandone.deleteServer(serverToRemove.id, function (error, response, body) {
                    callback();
                });
            });
        }
        else {
            callback();
        }
    };

    removeLoadBalancer = function (toRemove, callback) {
        if (toRemove.id) {
            oneandone.deleteLoadBalancer(toRemove.id, function (error, response, body) {
                callback();
            });
        }
        else {
            callback();
        }
    };
    after(function (done) {
        removeLoadBalancer(loadBalancer, function () {
            setTimeout(function () {
                removeServer(server, function () {
                    done();
                });
            }, 100000);
        });
    });

    it('List Load Balancers', function (done) {
        setTimeout(function () {
            oneandone.listLoadBalancers(function (error, response, body) {
                assert.equal(error, null);
                assert.notEqual(response, null);
                assert.notEqual(body, null);
                var object = JSON.parse(body);
                assert(object.length > 0);
                done();
            });
        }, 7000);
    });

    it('List Load Balancers with options', function (done) {
        var options = {
            query: "node"
        };
        setTimeout(function () {
            oneandone.listLoadBalancersWithOptions(options, function (error, response, body) {
                assert.equal(error, null);
                assert.notEqual(response, null);
                assert.notEqual(body, null);
                var object = JSON.parse(body);
                assert(object.length > 0);
                done();
            });
        }, 5000);
    });

    it('Get Load Balancer', function (done) {
        oneandone.getLoadBalancer(loadBalancer.id, function (error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.id, loadBalancer.id);
            done();
        });
    });

    it('Update Load Balancer', function (done) {
        updateData = {
            "name": "node balancer rename",
            "description": "My load balancer rename description",
            "health_check_test": oneandone.HealthCheckTestTypes.TCP,
            "health_check_interval": 40,
            "persistence": true,
            "persistence_time": 1200,
            "method": oneandone.LoadBalancerMethod.ROUND_ROBIN
        };
        oneandone.updateLoadBalancer(loadBalancer.id, updateData, function (error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.name, updateData.name);
            done();
        });
    });

    it('Assign server ip', function (done) {
        setTimeout(function () {
            helper.updateServerData(server, function (updatedServer) {
                server = updatedServer;
                assignData = {
                    "server_ips": [
                        server.ips[0].id
                    ]
                };
                oneandone.assignServerIpToLoadBalancer(loadBalancer.id, assignData, function (error, response, body) {
                    assert.equal(error, null);
                    assert.notEqual(response, null);
                    assert.notEqual(body, null);

                    var object = JSON.parse(body);
                    assert(object.server_ips.length > 0);
                    done();
                });
            });
        }, 10000);
    });

    it('List Load Balancer server ips', function (done) {
        oneandone.listLoadBalancerServerIps(loadBalancer.id, function (error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert(object.length > 0);
            done();
        });
    });

    it('Get Load Balancer server ip', function (done) {
        oneandone.getLoadBalancerServerIp(loadBalancer.id, server.ips[0].id, function (error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.id, server.ips[0].id);
            done();
        });
    });

    it('Delete Load Balancer server ip', function (done) {
        oneandone.unassignServerIpFromLoadBalancer(loadBalancer.id, server.ips[0].id, function (error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.id, loadBalancer.id);
            done();
        });

    });

    it('Add rules', function (done) {
        ruleData = {
            "rules": [
                {
                    "protocol": oneandone.RuleProtocol.TCP,
                    "port_balancer": 82,
                    "port_server": 82,
                    "source": "0.0.0.0"
                }
            ]
        };
        oneandone.addRulesToLoadBalancer(loadBalancer.id, ruleData, function (error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            setTimeout(function () {
                var object = JSON.parse(body);
                assert(object.rules.length > 0);
                done();
            }, 10000);
        });
    });

    it('List Load Balancer Rules', function (done) {
        oneandone.listLoadBalancerRules(loadBalancer.id, function (error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert(object.length > 0);
            done();
        });
    });

    it('Get Load Balancer Rule', function (done) {
        oneandone.getLoadBalancerRule(loadBalancer.id, loadBalancer.rules[0].id, function (error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            done();
        });
    });

    it('Delete Load Balancer Rule', function (done) {
        oneandone.removeRuleFromLoadBalancer(loadBalancer.id, loadBalancer.rules[0].id, function (error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.id, loadBalancer.id);
            done();
        });

    });


});
