/**
 * Created by henryleu on 7/15/16.
 */

var seq = (new Date().getTime()) * 1000;

module.exports = {
    handleError: function(err, cb){
        cb(''+err);
    },

    id: function(){return seq++;},

    emptyFn: function(){}
};