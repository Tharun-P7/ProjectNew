const sqlConnection = require("../services/sqlConnection");

function listCategories(cb){
        var sql = "SELECT ID as categoryID,Name as name FROM Categories";
        var data=[];
        sqlConnection.executeQuery(sql,data,function(err,result){
            cb(err,result);
        });
    }
module.exports ={listCategories};