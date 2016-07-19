/**
 * Created by henryleu on 7/15/16.
 */
var redisClient = require('./redis')();
var objKeyGen = function(id){ return 'bench:obj:' + id;};

module.exports = {
    multply: function(x, y, callback){
        callback(null, x*y);
    },

    saveObject: function(id, obj, callback){
        var key = objKeyGen(id);
        redisClient.hmset(key, obj, function(err, result){
            if(err){
                if(callback) callback(err);
                return;
            }
            if(result=='OK'){
                if(callback) callback();
            }
            else{
                if(callback) callback(new Error('Fail to call hmset: ' + result));
            }
        });

    },

    getObject: function(objId, callback){

    }
};