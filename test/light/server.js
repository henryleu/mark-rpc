/**
 * Created by henryleu on 7/18/16.
 */
var LightRPC = require("../../lib/light");
var operations = require("../operations");
var util = require("../util");
var PORT = 8101;
var HOST = 'localhost';

var rpc = new LightRPC({
    multiply: function(x, y, cb){
        operations.multply(x, y, function(err, result){
            if(err){
                util.handleError(err, cb);
                return;
            }
            cb(result);
        });

    },

    saveObject : function(id, obj, cb){
        operations.saveObject(id, obj, function(err, result){
            if(err){
                util.handleError(err, cb);
                return;
            }
            cb();
        });
    }

});

rpc.listen(PORT, HOST, function(){
    console.log('light server is listening on ' + HOST + ':' + PORT);
});
