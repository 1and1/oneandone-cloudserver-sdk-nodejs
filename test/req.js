/**
 * Created by Ali on 7/28/2016.
 */

var assert = require('assert');
var oneandone = require('../lib/liboneandone');
var helper = require('../test/testHelper');

describe('req tests', function () {
    this.timeout(20000);

    it('Set full header', function (done) {
        oneandone.fullheader();
        assert.equal(oneandone.options.headers['Content-Type'], 'application/json');
        done();
    });

    it('Set patch header', function (done) {
        oneandone.putheader();
        assert.equal(oneandone.options.headers['Content-Type'], 'application/json');
        done();
    });

    it('oneandone authentication', function (token) {
        oneandone.oneandoneauth(token);
        assert.equal(oneandone.options.headers['X-TOKEN'], token);
        done();
    });

    it('Make URL', function (done) {
        var url = oneandone.mk_url(["datacenters", "123456789", "servers", "000000000", "cdroms", "111111111"], function (data) {
        });
        assert.equal(url, 'https://api.profitbricks.com/rest/v2/datacenters/123456789/servers/000000000/cdroms/111111111');
        done();
    });

    it('Delete request', function (done) {
        oneandone.is_del(["datacenters", "123456789", "servers", "000000000", "cdroms", "111111111"], function (error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            assert.equal(oneandone.options.url, 'https://api.profitbricks.com/rest/v2/datacenters/123456789/servers/000000000/cdroms/111111111');
            assert.equal(oneandone.options.headers['Content-Type'], 'application/vnd.profitbricks.resource+json');
            assert.equal(response.request.method, "DELETE");
            done();
        });
    });

    it('Get request', function (done) {
        oneandone.is_get(["datacenters", "123456789", "servers", "000000000", "cdroms", "111111111"], function (error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            assert.equal(oneandone.options.url, 'https://api.profitbricks.com/rest/v2/datacenters/123456789/servers/000000000/cdroms/111111111?depth=1');
            assert.equal(oneandone.options.headers['Content-Type'], 'application/vnd.profitbricks.resource+json');
            assert.equal(response.request.method, "GET");
            done();
        });
    });

    it('Patch request', function (done) {
        oneandone.is_patch(["datacenters", "123456789", "servers", "000000000", "cdroms", "111111111"], {"test": "true"}, function (error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            assert.equal(oneandone.options.url, 'https://api.profitbricks.com/rest/v2/datacenters/123456789/servers/000000000/cdroms/111111111');
            assert.equal(oneandone.options.body, '{"test":"true"}');
            assert.equal(oneandone.options.headers['Content-Type'], 'application/vnd.profitbricks.partial-properties+json');
            assert.equal(response.request.method, "PATCH");
            done();
        });
    });

    it('Put request', function (done) {
        oneandone.is_put(["datacenters", "123456789", "servers", "000000000", "cdroms", "111111111"], {"test": "true"}, function (error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            assert.equal(oneandone.options.url, 'https://api.profitbricks.com/rest/v2/datacenters/123456789/servers/000000000/cdroms/111111111');
            assert.equal(oneandone.options.body, '{"test":"true"}');
            assert.equal(oneandone.options.headers['Content-Type'], 'application/vnd.profitbricks.resource+json');
            assert.equal(response.request.method, "PUT");
            done();
        });
    });

    it('Post request', function (done) {
        oneandone.is_post(["datacenters", "123456789", "servers", "000000000", "cdroms", "111111111"], {"test": "true"}, function (error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            assert.equal(oneandone.options.url, 'https://api.profitbricks.com/rest/v2/datacenters/123456789/servers/000000000/cdroms/111111111');
            assert.equal(oneandone.options.body, '{"test":"true"}');
            assert.equal(oneandone.options.headers['Content-Type'], 'application/vnd.profitbricks.resource+json');
            assert.equal(response.request.method, "POST");
            done();
        });
    });

    it('Command request', function (done) {
        oneandone.is_command(["datacenters", "123456789", "servers", "000000000", "cdroms", "111111111"], {"test": "true"}, function (error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            assert.equal(oneandone.options.url, 'https://api.profitbricks.com/rest/v2/datacenters/123456789/servers/000000000/cdroms/111111111');
            assert.equal(oneandone.options.body, '{"test":"true"}');
            assert.equal(oneandone.options.headers['Content-Type'], 'application/x-www-form-urlencoded');
            assert.equal(response.request.method, "POST");
            done();
        });
    });

    it('Restore request', function (done) {
        oneandone.is_restore(["datacenters", "123456789", "servers", "000000000", "cdroms", "111111111"], 'test=true', function (error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            assert.equal(oneandone.options.url, 'https://api.profitbricks.com/rest/v2/datacenters/123456789/servers/000000000/cdroms/111111111');
            assert.equal(oneandone.options.body, 'test=true');
            assert.equal(oneandone.options.headers['Content-Type'], 'application/x-www-form-urlencoded');
            assert.equal(response.request.method, "POST");
            done();
        });
    });

    //This method is dangerous, if used it will case epic failure on all other requests
    //Error: options.uri must be a path when using options.baseUrl
    it.skip('Set endpoint', function (done) {
        oneandone.setendpoint('http://test.endpoint.com');
        assert.equal(oneandone.options.baseUrl, 'http://test.endpoint.com');
        oneandone.setendpoint('https://api.profitbricks.com/rest');
        done();
    });

});