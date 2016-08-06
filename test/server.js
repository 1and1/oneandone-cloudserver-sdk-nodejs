/**
 * Created by Ali on 7/28/2016.
 */

var assert = require('assert');
var oneandone = require('../lib/liboneandone');
var helper = require('../test/testHelper');
var server = {};
var fixedInstaceserver = {};
var hardwareFlavour = {};
var currentHdd = {};
var currentImage = {};
var serverData = {
    "name": "Node Server",
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

var turnOffServer = function (serverToTurnOff, callback) {
    updateData = {
        "action": oneandone.ServerUpdateAction.POWER_OFF,
        "method": oneandone.ServerUpdateMethod.SOFTWARE

    };
    checkServerReady(serverToTurnOff, function () {
        oneandone.updateServerStatus(serverToTurnOff.id, updateData, function (error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            callback();
        });
    });
};

describe('Server tests', function () {
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
        //oneandone.getServer("B88A32C96FB1EEF13767FF7B2EB5657C", function (error, response, body) {
        //    server = JSON.parse(body);
        //    done();
        //});

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
    after(function (done) {
        removeServer(server, function () {
            removeServer(fixedInstaceserver, function () {
                done();
            });
        });
    });

    it('Create Fixed Instance server', function (done) {
        fixedInstace = {
            "name": "Node Fixed Instance server",
            "description": "My server description",
            "hardware": {
                "fixed_instance_size_id": "65929629F35BBFBA63022008F773F3EB"
            },
            "appliance_id": "81504C620D98BCEBAA5202D145203B4B",
            "datacenter_id": "908DC2072407C94C8054610AD5A53B8C"
        };
        oneandone.createServer(fixedInstace, function (error, response, body) {
            assert.equal(error, null);
            fixedInstaceserver = JSON.parse(body);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            assert.equal(fixedInstaceserver.name, fixedInstace.name)
            done();
        });
        //oneandone.getServer("860B87CFE3CD9023BAF77D6A883B0664", function (error, response, body) {
        //    fixedInstaceserver = JSON.parse(body);
        //    done();
        //});
    });

    it('List servers', function (done) {
        oneandone.listServers(function (error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert(object.length > 0);
            done();
        });
    });

    it('List servers with options', function (done) {
        var options = {
            query: "node"
        };
        oneandone.listServersWithOptions(options, function (error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert(object.length > 0);
            done();
        });
    });

    it('List Server Flavours', function (done) {
        oneandone.listHardwareFlavours(function (error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert(object.length > 0);
            hardwareFlavour = object[0];
            done();
        });
    });

    it('Get Server Flavour', function (done) {
        oneandone.getHardwareFlavour(hardwareFlavour.id, function (error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            done();
        });
    });

    it('Get server status', function (done) {
        oneandone.getServerStatus(server.id, function (error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            done();
        });
    });

    it('Get server', function (done) {
        oneandone.getServer(server.id, function (error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.id, server.id);
            assert.equal(object.name, server.name);
            done();
        });
    });

    it('Update server', function (done) {
        updateData = {
            "name": "Node22 Server - UPDATED",
            "description": "desc",

        };
        checkServerReady(server, function () {
            oneandone.updateServer(server.id, updateData, function (error, response, body) {
                assert.equal(error, null);
                assert.notEqual(response, null);
                assert.notEqual(body, null);
                var object = JSON.parse(body);
                assert.equal(object.id, server.id);
                assert.equal(object.name, updateData.name);
                assert.equal(object.description, updateData.description);
                done();
            });
        });
    });

    it('Update server status', function (done) {
        updateData = {
            "action": oneandone.ServerUpdateAction.REBOOT,
            "method": oneandone.ServerUpdateMethod.SOFTWARE

        };
        checkServerReady(server, function () {
            oneandone.updateServerStatus(server.id, updateData, function (error, response, body) {
                assert.equal(error, null);
                assert.notEqual(response, null);
                assert.notEqual(body, null);
                var object = JSON.parse(body);
                assert.equal(object.id, server.id);
                done();
            });
        });
    });

    it('Get Server Hardware', function (done) {
        oneandone.getHardware(server.id, function (error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            done();
        });
    });

    it('Update server Hardware', function (done) {
        updateHardwareData = {
            "vcore": 4,
            "cores_per_processor": 2,
            "ram": 6
        };
        turnOffServer(server, function () {
            checkServerReady(server, function () {
                oneandone.updateHardware(server.id, updateHardwareData, function (error, response, body) {
                    assert.equal(error, null);
                    assert.notEqual(response, null);
                    assert.notEqual(body, null);
                    var object = JSON.parse(body);
                    assert.equal(object.id, server.id);
                    done();
                });
            });
        });
    });

    it('List Servers HDDs ', function (done) {
        checkServerReady(server, function () {
            oneandone.listHdds(server.id, function (error, response, body) {
                assert.equal(error, null);
                assert.notEqual(body, null);
                var object = JSON.parse(body);
                assert(object.length > 0);
                currentHdd = object[0];
                done();
            });
        });
    });

    it('Add Hdd to the server', function (done) {
        hddData = {
            "hdds": [
                {
                    "size": 40,
                    "is_main": false
                }
            ]
        };
        checkServerReady(server, function () {
            oneandone.addHdd(server.id, hddData, function (error, response, body) {
                assert.equal(error, null);
                var hdds = JSON.parse(body);
                //give time for the Hdd to be added
                checkServerReady(server, function () {
                    assert.notEqual(response, null);
                    assert.notEqual(body, null);
                    assert(hdds.hardware.hdds.length > 0);
                    done();
                });
            });
        });
    });

    it('Get Server specific Hdd', function (done) {
        oneandone.getHdd(server.id, currentHdd.id, function (error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            done();
        });
    });

    it('Update server specific Hdd', function (done) {
        updateData = {
            "size": 40
        };
        checkServerReady(server, function () {
            oneandone.updateHdd(server.id, currentHdd.id, updateData, function (error, response, body) {
                assert.equal(error, null);
                assert.notEqual(response, null);
                assert.notEqual(body, null);
                var object = JSON.parse(body);
                assert.equal(object.id, server.id);
                done();
            });
        });
    });

    it('Delete server specific Hdd', function (done) {
        checkServerReady(server, function () {
            oneandone.listHdds(server.id, function (error, response, body) {
                var hddList = JSON.parse(body);
                var hddToDelete;
                for (var i = 0; i < hddList.length; i++) {
                    var curHdd = hddList[i];
                    if (!curHdd.is_main) {
                        hddToDelete = curHdd;
                        break;
                    }
                }
                if (hddToDelete) {
                    oneandone.deleteHdd(server.id, hddToDelete.id, function (error, response, body) {
                        assert.equal(error, null);
                        assert.notEqual(response, null);
                        assert.notEqual(body, null);
                        var object = JSON.parse(body);
                        assert.equal(object.id, server.id);
                        done();
                    });
                }
            });

        });
    });

    it('Get Server Image', function (done) {
        oneandone.getImage(fixedInstaceserver.id, function (error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            currentImage = object;
            done();
        });
    });

    it('Update server Image', function (done) {
        updateData = {
            "id": currentImage.id,
            "password": "Test123!"
        };
        checkServerReady(server, function () {
            oneandone.updateImage(fixedInstaceserver.id, updateData, function (error, response, body) {
                assert.equal(error, null);
                assert.notEqual(response, null);
                assert.notEqual(body, null);
                var object = JSON.parse(body);
                assert.equal(object.id, fixedInstaceserver.id);
                done();
            });
        });
    });

});
