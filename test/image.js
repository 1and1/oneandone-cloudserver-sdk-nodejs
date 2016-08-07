/**
 * Created by Ali on 8/6/2016.
 */
var assert = require('assert');
var oneandone = require('../lib/liboneandone');
var helper = require('../test/testHelper');
var server = {};
var image = {};
var serverData = {
    "name": "Node Image Server",
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


describe('Images tests', function () {
    this.timeout(900000);

    before(function (done) {
        helper.authenticate(oneandone);
        oneandone.createServer(serverData, function (error, response, body) {
            server = JSON.parse(body);
            var imageData = {
                "server_id": server.id,
                "name": "node image",
                "description": "My image description",
                "frequency": oneandone.ImageFrequency.WEEKLY,
                "num_images": 1
            };
            helper.checkServerReady(server, function () {
                oneandone.createImage(imageData, function (error, response, body) {
                    assert.equal(error, null);
                    assert.notEqual(response, null);
                    image = JSON.parse(body);
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

    removeImage = function (imageToRemove, callback) {
        if (imageToRemove.id) {
            oneandone.deleteImage(imageToRemove.id, function (error, response, body) {
                callback();
            });
        }
        else {
            callback();
        }
    };
    after(function (done) {
        removeImage(image, function () {
            setTimeout(function () {
                removeServer(server, function () {
                    done();
                });
            }, 100000);
        });
    });

    it('List images', function (done) {
        oneandone.listImages(function (error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert(object.length > 0);
            done();
        });
    });

    it('List images with options', function (done) {
        var options = {
            query: "node"
        };

        setTimeout(function () {
            oneandone.listImagesWithOptions(options, function (error, response, body) {
                assert.equal(error, null);
                assert.notEqual(response, null);
                assert.notEqual(body, null);
                var object = JSON.parse(body);
                assert(object.length > 0);
                done();
            });
        }, 5000);
    });

    it('Get image', function (done) {
        oneandone.getImage(image.id, function (error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.id, image.id);
            done();
        });
    });

    it('Update image', function (done) {
        updateData = {
            "name": "image updated nodejs",
            "description": "New image description",
            "frequency": oneandone.ImageFrequency.ONCE
        };
        oneandone.updateImage(image.id, updateData, function (error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.name, updateData.name);
            done();
        });
    });

});
