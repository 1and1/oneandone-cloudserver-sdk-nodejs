/**
 * Created by Ali on 8/17/2016.
 */
var assert = require('assert');
var oneandone = require('../lib/liboneandone');
var helper = require('../test/testHelper');
var role = {};
var roleClone = {};
var user = {};

describe('Role tests', function () {
    this.timeout(900000);

    before(function (done) {
        helper.authenticate(oneandone);
        var roleData = {
            "name": "node role"
        };
        oneandone.createRole(roleData, function (error, response, body) {
            role = JSON.parse(body);
            done();
        });
    });


    after(function (done) {
        oneandone.deleteRole(role.id, function (error, response, body) {
            done();
        });

        oneandone.deleteRole(roleClone.id, function (error, response, body) {
            done();
        });
    });

    it('List roles', function (done) {
        oneandone.listRoles(function (error, response, body) {
            helper.assertNoError(200, response, function (result) {
                assert(result);
            });
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert(object.length > 0);
            done();
        });
    });

    it('List roles with options', function (done) {
        var options = {
            query: "node"
        };
        setTimeout(function () {
            oneandone.listRolesWithOptions(options, function (error, response, body) {
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

    it('Get role', function (done) {
        oneandone.getRole(role.id, function (error, response, body) {
            helper.assertNoError(200, response, function (result) {
                assert(result);
            });
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.id, role.id);
            done();
        });
    });

    it('Update role', function (done) {
        updateRole = {
            "name": "node Manager role",
            "description": "Manager role description",
            "state": "ACTIVE"
        };
        oneandone.updateRole(role.id, updateRole, function (error, response, body) {
            helper.assertNoError(200, response, function (result) {
                assert(result);
            });
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.name, updateRole.name);
            done();
        });
    });

    it('Get role permissions', function (done) {
        oneandone.getRolePermissions(role.id, function (error, response, body) {
            helper.assertNoError(200, response, function (result) {
                assert(result);
            });
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            done();
        });
    });

    it('Update role permissions', function (done) {
        updatePermissions = {
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
        oneandone.updateRolePermissions(role.id, updatePermissions, function (error, response, body) {
            helper.assertNoError(200, response, function (result) {
                assert(result);
            });
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            done();
        });
    });

    it('List role users', function (done) {
            oneandone.listRoleUsers(role.id, function (error, response, body) {
            helper.assertNoError(200, response, function (result) {
                assert(result);
            });
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            done();
        });
    });

    it('Add role to users', function (done) {
        oneandone.listUsers(function (error, response, body) {
            var users = JSON.parse(body);
            user = users[0];
            var usersToAdd = {
                "users": [
                    user.id
                ]
            };
            oneandone.addUsersToRole(role.id, usersToAdd, function (error, response, body) {
                helper.assertNoError(201, response, function (result) {
                    assert(result);
                });
                assert.notEqual(response, null);
                assert.notEqual(body, null);
                done();
            });
        });
    });

    it('Get Role User Information', function (done) {
        oneandone.getRoleUser(role.id, user.id, function (error, response, body) {
            helper.assertNoError(200, response, function (result) {
                assert(result);
            });
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            done();
        });
    });

    it('Delete Role User Information', function (done) {
        oneandone.removeRoleFromUser(role.id, user.id, function (error, response, body) {
            helper.assertNoError(202, response, function (result) {
                assert(result);
                assert.notEqual(response, null);
                assert.notEqual(body, null);
                done();
            });
        });
    });

    it('Clone role', function (done) {
        var cloneRoleData = {
            "name": "node role"
        };
        oneandone.cloneRole(role.id, cloneRoleData, function (error, response, body) {
            helper.assertNoError(201, response, function (result) {
                assert(result);
            });
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            roleClone = JSON.parse(body);
            done();
        });
    });

});