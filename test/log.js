/**
 * Created by Ali on 8/16/2016.
 */

var assert = require('assert');
var oneandone = require('../lib/liboneandone');
var helper = require('../test/testHelper');
var log = {};

describe('Monitoring center tests', function () {
    this.timeout(900000);

    before(function (done) {
        helper.authenticate(oneandone);
        done();
    });

    it('List Logs with fixed period', function (done) {
        var options = {
            page: 1
        };
        oneandone.listLogsFixedPeriodWithOptions(oneandone.PeriodType.LAST_7D, options, function (error, response, body) {
            helper.assertNoError(200, response, function (result) {
                assert(result);
            });
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert(object.length > 0);
            log = object[0];
            done();
        });
    });

    it('List Logs with custom period', function (done) {
        var start_date = "2015-19-05T00:05:00Z";
        var end_date = "2016-19-07T00:05:00Z";
        oneandone.listLogsCustomPeriodWithOptions(start_date, end_date, null, function (error, response, body) {
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

    it('Get Log', function (done) {
        oneandone.getLog(log.id, function (error, response, body) {
            helper.assertNoError(200, response, function (result) {
                assert(result);
            });
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            done();
        });
    });
});