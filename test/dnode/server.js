/**
 * Created by henryleu on 7/15/16.
 */
var dnode = require("dnode");
var net = require('net');
var operations = require("../operations");
var util = require("../util");
var PORT = 8100;
var HOST = 'localhost';

var server = net.createServer(function (c) {
    var d = dnode({
        multiply : function(x, y, cb){
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
    c.pipe(d).pipe(c);
});

// var server = dnode(function (remote, conn) {
//     this.multiply = function(x, y, cb){
//         operations.multply(x, y, function(err, result){
//             if(err){
//                 util.handleError(err, cb);
//                 return;
//             }
//             cb(result);
//         });
//     };
//
// });

server.listen(PORT, HOST, function(){
    console.log('dnode server is listening on ' + HOST + ':' + PORT);
});
