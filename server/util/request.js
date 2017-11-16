/**
 * Created by nap on 16/12/19.
 */
var requset = require('request')
var config = require('../local/config')
var baseServer = config['baseServer']

var reqs = requset.defaults({})

function get (option) {
  reqs.get({
    url: baseServer[option.baseUrl] + option.url,
    headers: option.req.headers,
    qs: option.query,
    gzip: true
  }, function (error, response, body) {
    option.callback(body, response, error)
  })
}

function post (option) {
  reqs.post({
    url: baseServer[option.baseUrl] + option.url,
    headers: option.req.headers,
    form: option.body,
    gzip: true
  }, function (error, response, body) {
    option.callback(body, response, error)
  })
}

module.exports = {
  get: get,
  post: post
}
