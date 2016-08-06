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
    "appliance_id": "81504C620D98BCEBAA5202D145203B4B",
    "datacenter_id": "908DC2072407C94C8054610AD5A53B8C"
};
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

describe(' Server operation tests', function () {
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
        //oneandone.getServer("D0CC982DDF4C55C43FACAD3C03F68461", function (error, response, body) {
        //    server = JSON.parse(body);
        //    done();
        //});
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
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            done();
        });
    });

    it('load a DVD', function (done) {
        updateDVD = {
            "id": "81504C620D98BCEBAA5202D145203B4B"
        };
        checkServerReady(server, function () {
            oneandone.loadDvd(server.id, updateDVD, function (error, response, body) {
                assert.equal(error, null);
                assert.notEqual(response, null);
                assert.notEqual(body, null);
                var object = JSON.parse(body);
                assert.equal(object.id, server.id);
                done();
            });
        });
    });

    it('unload a DVD', function (done) {
        checkServerReady(server, function () {
            oneandone.unloadDvd(server.id, function (error, response, body) {
                assert.equal(error, null);
                assert.notEqual(response, null);
                assert.notEqual(body, null);
                done();
            });
        });
    });

    it('Assign a private network', function (done) {
        pnData = {
            "id": "44700F362BA19969E7482BE0696D388F"
        };
        checkServerReady(server, function () {
            oneandone.assignPrivateNetwork(server.id, pnData, function (error, response, body) {
                assert.equal(error, null);
                assert.notEqual(response, null);
                assert.notEqual(body, null);
                done();
            });
        });
    });

    it('List Private networks', function (done) {
        checkServerReady(server, function () {
            oneandone.listPrivateNetworks(server.id, function (error, response, body) {
                assert.equal(error, null);
                assert.notEqual(body, null);
                var object = JSON.parse(body);
                currentPrivateNetwork = object[0];
                done();
            });
        });
    });

    it('Get a Private network', function (done) {
        oneandone.getPrivateNetwork(server.id, currentPrivateNetwork.id, function (error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            done();
        });
    });

    it('Delete a Private network', function (done) {
        checkServerReady(server, function () {
            oneandone.deletePrivateNetwork(server.id, currentPrivateNetwork.id, function (error, response, body) {
                assert.equal(error, null);
                assert.notEqual(response, null);
                assert.notEqual(body, null);
                done();
            });
        });
    });

    it('Create a snapshot', function (done) {
        checkServerReady(server, function () {
            oneandone.createSnapshot(server.id, null, function (error, response, body) {
                assert.equal(error, null);
                assert.notEqual(response, null);
                assert.notEqual(body, null);
                var object = JSON.parse(body);
                assert.notEqual(object, null);
                done();
            });
        });
    });

    it('List snapshots', function (done) {
        setTimeout(function () {
            checkServerReady(server, function () {
                oneandone.listSnapshots(server.id, function (error, response, body) {
                    assert.equal(error, null);
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
        checkServerReady(server, function () {
            oneandone.restoreSnapshot(server.id, currentsnapShot.id, null, function (error, response, body) {
                assert.equal(error, null);
                assert.notEqual(response, null);
                assert.notEqual(body, null);
                done();
            });
        });
    });

    it('Delete snapshot', function (done) {
        checkServerReady(server, function () {
            oneandone.deleteSnapshot(server.id, currentsnapShot.id, function (error, response, body) {
                assert.equal(error, null);
                assert.notEqual(response, null);
                assert.notEqual(body, null);
                done();
            });
        });
    });

    it('Create a clone', function (done) {
        cloneData = {
            "name": "node clone",
            "datacenter_id": server.datacenter.id
        };
        checkServerReady(server, function () {
            oneandone.clone(server.id, cloneData, function (error, response, body) {
                assert.equal(error, null);
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