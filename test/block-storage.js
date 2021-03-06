/**
 * Created by aajdinov on 1/20/2018.
 */

var assert = require('assert');
var oneandone = require('../lib/liboneandone');
var helper = require('../test/testHelper');
var server = {};
var blockStorage = {};
var appliance = {};
var dataCenter = {};


describe('Block Storage tests', function () {
    this.timeout(900000);

    before(function (done) {
        helper.authenticate(oneandone);
        var options = {
            query: "centos6"
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
                    "name": "Node Block Storage Server 2",
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
                    "appliance_id": appliance.id,
                    "datacenter_id": dataCenter.id
                };
                oneandone.createServer(serverData, function (error, response, body) {
                    server = JSON.parse(body);
                    var storageData = {
                        "name": "Node block storage test 3",
                        "description": "My block storage test description",
                        "size": 20,
                        "datacenter_id": dataCenter.id
                    };
                    helper.checkServerReady(server, function () {
                        oneandone.createBlockStorage(storageData, function (error, response, body) {
                            helper.assertNoError(201, response, function (result) {
                                assert(result);
                            });
                            assert.notEqual(response, null);
                            blockStorage = JSON.parse(body);
                            done();
                        });
                    });
                });
            });
        });
    });

    removeServer = function (serverToRemove, callback) {
        if (serverToRemove.id) {
            helper.checkServerReady(serverToRemove, function () {
                oneandone.deleteServer(serverToRemove.id,false, function (error, response, body) {
                    callback();
                });
            });
        }
        else {
            callback();
        }
    };

    removeStorage = function (storageToRemove, callback) {
        if (storageToRemove.id) {
            oneandone.deleteBlockStorage(storageToRemove.id, function (error, response, body) {
                callback();
            });
        }
        else {
            callback();
        }
    };
    after(function (done) {
        removeStorage(blockStorage, function () {
            setTimeout(function () {
                removeServer(server, function () {
                    done();
                });
            }, 100000);
        });
    });

    it('List Block Storages', function (done) {
        setTimeout(function () {
            oneandone.listBlockStorages(function (error, response, body) {
                helper.assertNoError(200, response, function (result) {
                    assert(result);
                });
                assert.notEqual(response, null);
                assert.notEqual(body, null);
                var object = JSON.parse(body);
                assert(object.length > 0);
                done();
            });
        }, 7000);
    });

    it('List Block Storages with options', function (done) {
        var options = {
            query: "node"
        };

        setTimeout(function () {
            oneandone.listBlockStoragesWithOptions(options, function (error, response, body) {
                helper.assertNoError(200, response, function (result) {
                    assert(result);
                });
                assert.notEqual(response, null);
                assert.notEqual(body, null);
                var object = JSON.parse(body);
                assert(object.length > 0);
                done();
            });
        }, 5000);
    });

    it('Get Block Storage', function (done) {
        oneandone.getBlockStorage(blockStorage.id, function (error, response, body) {
            helper.assertNoError(200, response, function (result) {
                assert(result);
            });
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.id, blockStorage.id);
            done();
        });
    });

    it('Update Block Storage', function (done) {
        updateData = {
            "name": "node js block storage test rename",
            "description": "My block storage rename"
        };
        oneandone.updateBlockStorage(blockStorage.id, updateData, function (error, response, body) {
            helper.assertNoError(202, response, function (result) {
                assert(result);
            });
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.name, updateData.name);
            done();
        });
    });

    it('Attach block storage', function (done) {
        attachData = {
            "server_id": server.id
        };
        oneandone.attachBlockStorage(blockStorage.id, attachData, function (error, response, body) {
            helper.assertNoError(202, response, function (result) {
                assert(result);
            });
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            setTimeout(function () {
                done();
            }, 10000);
        });
    });

    it('Detach block storage', function (done) {
        oneandone.detachBlockStorage(blockStorage.id, function (error, response, body) {
            helper.assertNoError(202, response, function (result) {
                assert(result);
            });
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.id, blockStorage.id);
            done();
        });

    });
});
