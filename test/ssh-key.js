/**
 * Created by aajdinov on 1/20/2018.
 */
var assert = require('assert');
var oneandone = require('../lib/liboneandone');
var helper = require('../test/testHelper');
var sshKey = {};

describe('SSH Keys tests', function () {
    this.timeout(900000);

    before(function (done) {
        helper.authenticate(oneandone);
        var sshKeyData = {
            "name": "node SSH Key",
            "description": "My SSH Key description",
            "public_key": "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQC6U+LbJPFNDkORkrVUSg78IJjNDSBY1NgDzhr0S9rLvRVInHDT+3DsojZDqXglCpaLwNcdIQM1saGlIKlmxJro8Qw2kJRKqhP/DZLmvcz+niUKZ/0ho1a5HAlTJl6ct8DFto/z+hhDIHTRL4i7n+M/n9SNGjQ28EQy6SztsqwV8yheiUIgNO2lOXDi1Pjs7znBLFE305AHpf6pv4jlUE7r280+WAuloZJaNtu2YL4XXKsemBliDet54OJaW/4e+/5TexX0wZwkibdhuCSFJvhCJ6jbJZbdUwCyqlz6tiu75bSUTV7WGlxWtUjZCY0KBO9BPwbTDhxmIAeigDxnSRhekC/5b7cYUVys0JgvxBKiBVg6Bc32c7fjeOrNpUixzVxtm6UQtZDYyOa+1OvPKPpHg1Ugy28aUtqV4yRYQbltkLB8JSKaZvCqzm9d6qXhkCKV2GmMs5glBE0MyZMiwgoc+Ar0HuN3RnYNzIWIZc1CYTfKB+otHEwmb8V4hS6/k50obPa4J81RJekLU/8yY0WDRWVven6hyriBhNJXpI3V84XqSB4cl1HNcFgeat+EbM5e5QuLUn3Uwdt15kugQt5t9LqVK1jyqWQ4CrJ+Yg7/uU7l7fPHH0rvk9LvSv4BXlHETbScUDOnaZnr8m+4HJyucVq1tXdPCCDSyGGNO/IFBw== test@email.com"
        };
        oneandone.createSshKey(sshKeyData, function (error, response, body) {
            helper.assertNoError(201, response, function (result) {
                assert(result);
            });
            assert.notEqual(response, null);
            sshKey = JSON.parse(body);
            done();
        });
    });

    removeSshKey = function (sshKeyToRemove, callback) {
        if (sshKeyToRemove.id) {
            oneandone.deleteSshKey(sshKeyToRemove.id, function (error, response, body) {
                callback();
            });
        }
        else {
            callback();
        }
    };

    after(function (done) {
        removeSshKey(sshKey, function () {
            done();
        });
    });

    it('List ssh keys', function (done) {
        oneandone.listSshKeys(function (error, response, body) {
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

    it('List ssh keys with options', function (done) {
        var options = {
            query: "node"
        };

        setTimeout(function () {
            oneandone.listSshKeysWithOptions(options, function (error, response, body) {
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

    it('Get ssh key', function (done) {
        oneandone.getSshKey(sshKey.id, function (error, response, body) {
            helper.assertNoError(200, response, function (result) {
                assert(result);
            });
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.id, sshKey.id);
            done();
        });
    });

    it('Update ssh key', function (done) {
        updateData = {
            "name": "node SSH Key rename",
            "description": "node SSH Key rename description"
        };
        oneandone.updateSshKey(sshKey.id, updateData, function (error, response, body) {
            helper.assertNoError(200, response, function (result) {
                assert(result);
            });
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.name, updateData.name);
            done();
        });
    });
});