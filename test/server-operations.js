/**
 * Created by Ali on 8/5/2016.
 */

var assert = require('assert');
var oneandone = require('../lib/liboneandone');
var helper = require('../test/testHelper');
var server = {};
var clone = {};
var currentPrivateNetwork = {};
var currentsnapShot = {};
var appliance = {};
var dataCenter = {};


removeServer = function (serverToRemove, callback) {
    if (serverToRemove.id) {
        helper.checkServerReady(serverToRemove, function () {
            oneandone.deleteServer(serverToRemove.id, false, function (error, response, body) {
                assert.equal(error, null);
                callback();
            });
        });
    }
    else {
        callback();
    }
};


describe(' Server operation tests', function () {
    this.timeout(900000);

    before(function (done) {
        helper.authenticate(oneandone);
        var options = {
            query: "centos"
        };
        oneandone.listServerAppliancesWithOptions(options, function (error, response, body) {
            var res = JSON.parse(body);
            appliance = res[0];
            var options = {
                query: "us"
            };
            oneandone.listDatacentersWithOptions(options, function (error, response, body) {
                var res1 = JSON.parse(body);
                dataCenter = res1[0];
                var serverData = {
                    "name": "Node Server operations test",
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
                    "appliance_id": appliance.id,
                    "dataCenter": dataCenter.id
                };
                oneandone.createServer(serverData, function (error, response, body) {
                    helper.assertNoError(202, response, function (result) {
                        assert(result);
                    });
                    server = JSON.parse(body);
                    assert.notEqual(response, null);
                    assert.notEqual(body, null);
                    assert.equal(server.name, serverData.name)
                    done();
                });
            });
        });
    });

    after(function (done) {
        setTimeout(function () {
            removeServer(clone, function () {
                removeServer(server, function () {
                    done();
                });
            });
        }, 100000)
    });


    it('Get DVD', function (done) {
        oneandone.getDvd(server.id, function (error, response, body) {
            helper.assertNoError(200, response, function (result) {
                assert(result);
            });
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            done();
        });
    });

    it('load a DVD', function (done) {
        oneandone.listDvdIso(function (error, response, body) {
            var dvds = JSON.parse(body);
            updateDVD = {
                "id": dvds[0].id
            };
            helper.checkServerReady(server, function () {
                oneandone.loadDvd(server.id, updateDVD, function (error, response, body) {
                    helper.assertNoError(202, response, function (result) {
                        assert(result);
                    });
                    assert.notEqual(response, null);
                    assert.notEqual(body, null);
                    var object = JSON.parse(body);
                    assert.equal(object.id, server.id);
                    done();
                });
            });
        });
    });


    it('unload a DVD', function (done) {
        helper.checkServerReady(server, function () {
            oneandone.unloadDvd(server.id, function (error, response, body) {
                helper.assertNoError(202, response, function (result) {
                    assert(result);
                });
                assert.notEqual(response, null);
                assert.notEqual(body, null);
                done();
            });
        });
    });

    it('Assign a private network', function (done) {
        oneandone.listPrivateNetworks(function (error, response, body) {
            var privateNetwork = JSON.parse(body);
            var pn_id = {};
            pn_id = privateNetwork[0].id;
            var pnData = {
                "id": pn_id
            };
            helper.checkServerReady(server, function () {
                oneandone.assignPrivateNetworkToServer(server.id, pnData, function (error, response, body) {
                    helper.assertNoError(202, response, function (result) {
                        assert(result);
                    });
                    assert.notEqual(response, null);
                    assert.notEqual(body, null);
                    done();
                });
            });
        });

    });

    it('List Private networks', function (done) {
        helper.checkServerReady(server, function () {
            oneandone.listServerPrivateNetworks(server.id, function (error, response, body) {
                helper.assertNoError(200, response, function (result) {
                    assert(result);
                });
                assert.notEqual(body, null);
                var object = JSON.parse(body);
                currentPrivateNetwork = object[0];
                done();
            });
        });
    });

    it('Get a Private network', function (done) {
        oneandone.getServerPrivateNetwork(server.id, currentPrivateNetwork.id, function (error, response, body) {
            helper.assertNoError(200, response, function (result) {
                assert(result);
            });
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            done();
        });
    });

    it('Delete a Private network', function (done) {
        helper.checkServerReady(server, function () {
            helper.checkPrivateNetworkReady(server, currentPrivateNetwork, function () {
                oneandone.deletePrivateNetworkFromServer(server.id, currentPrivateNetwork.id, function (error, response, body) {
                    helper.assertNoError(202, response, function (result) {
                        assert(result);
                    });
                    assert.notEqual(response, null);
                    assert.notEqual(body, null);
                    done();
                });
            });
        });
    });

    it('Create a snapshot', function (done) {
        setTimeout(function () {
            helper.checkServerReady(server, function () {
                oneandone.createSnapshot(server.id, function (error, response, body) {
                    helper.assertNoError(202, response, function (result) {
                        assert(result);
                    });
                    assert.notEqual(response, null);
                    assert.notEqual(body, null);
                    var object = JSON.parse(body);
                    assert.notEqual(object, null);
                    done();
                });
            });
        }, 8000);
    });

    it('List snapshots', function (done) {
        setTimeout(function () {
            helper.checkServerReady(server, function () {
                oneandone.listSnapshots(server.id, function (error, response, body) {
                    helper.assertNoError(200, response, function (result) {
                        assert(result);
                    });
                    assert.notEqual(body, null);
                    var object = JSON.parse(body);
                    assert.notEqual(object, null);
                    currentsnapShot = object;
                    done();
                });
            });
        }, 5000);
    });

    it('Update snapshot', function (done) {
        helper.checkServerReady(server, function () {
            oneandone.restoreSnapshot(server.id, currentsnapShot.id, function (error, response, body) {
                helper.assertNoError(202, response, function (result) {
                    assert(result);
                });
                assert.notEqual(response, null);
                assert.notEqual(body, null);
                done();
            });
        });
    });

    it('Delete snapshot', function (done) {
        helper.checkServerReady(server, function () {
            oneandone.deleteSnapshot(server.id, currentsnapShot.id, function (error, response, body) {
                helper.assertNoError(202, response, function (result) {
                    assert(result);
                });
                assert.notEqual(response, null);
                assert.notEqual(body, null);
                done();
            });
        });
    });

    it('Create a clone', function (done) {
        cloneData = {
            "name": "node clone",
            "datacenter_id": dataCenter.id
        };
        helper.checkServerReady(server, function () {
            oneandone.clone(server.id, cloneData, function (error, response, body) {
                helper.assertNoError(202, response, function (result) {
                    assert(result);
                });
                assert.notEqual(response, null);
                assert.notEqual(body, null);
                var object = JSON.parse(body);
                clone = object;
                done();
            });
        });
    });
})
;