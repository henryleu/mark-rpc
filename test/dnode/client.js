/**
 * Created by henryleu on 7/15/16.
 */
var dnode = require("dnode");
var operations = require("../operations");
var util = require("../util");
var Meter = require("../../lib/meter");
var PORT = 8100;
var HOST = 'localhost';
var TIMES = 10000;
var d = dnode.connect(PORT, HOST, function(){
    console.log('dnode client is connected to ' + HOST + ':' + PORT);
});

var call_multiply = function(remote, ruler){
    ruler.start();
    remote.multiply(3, 7, function(result){
        ruler.end();
    });
};

var call_saveObject = function(remote, ruler){
    var id = util.id();
    var obj = {
        id: id,
        name: 'henry',
        birth: new Date().getTime(),
        gender: 1
    };

    ruler.start();
    remote.saveObject(id, obj, function(){
        ruler.end();
    });
};

var op = 'saveObject';
var meter = new Meter(op, TIMES);
meter.init();
d.on('remote', function (remote) {
    meter.start();
    for(var i = 0; i < TIMES; i++){ call_saveObject(remote, meter.metrics[i]); }
});

