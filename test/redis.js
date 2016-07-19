var cfg = {
    mode: 'single',
        host: '127.0.0.1',
        port: 6379,
        auth: 'guoer'
};
var logger = console;
var redis = require('redis');
var DEFAULT_NAME = 'default';
var clients = {};

/*
 * event handlers - logging
 */
var logInfo = function (msg) {
    return function() {logger.info(msg);}
};
var logWarn = function (msg) {
    return function() {logger.warn(msg);}
};
var logError = function (msg) {
    return function() {logger.error(msg);}
};

var redisClient = function(name){
    name = name || DEFAULT_NAME;
    if(clients[name]) return clients[name];
    return clients[name] = createRedisClient(name);
};

var createRedisClient = function(name){
    var redisClient = {};
    if (cfg.mode == 'single') {
        redisClient = redis.createClient(cfg.port, cfg.host, {} ); //TODO: need options
    } else {
        redisClient = null; //TODO: sentinel
    }

    if (cfg.auth != '') {redisClient.auth(cfg.auth);}

    var url = 'redis://' + redisClient.address;
    redisClient.on('connect'     , logInfo('Redis client ' + name + ' is connecting to ' + url));
    redisClient.on('ready'       , logInfo('Redis client ' + name + ' is ready'));
    redisClient.on('reconnecting', logWarn('Redis client ' + name + ' is reconnecting to ' + url));
    redisClient.on('error'       , logError('Redis client ' + name + ' error happens'));
    redisClient.on('end'         , logInfo('Redis client ' + name + ' is ended'));
    return redisClient;
};

module.exports = redisClient;
