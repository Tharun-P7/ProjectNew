const mysql = require("mysql");
const Config = require("../constants/backendConfig");
var pool = mysql.createPool(Config.mysql.prod);

module.exports = {
	executeQuery: function (sql, data, callback) {
		pool.getConnection(function (err, connection) {
			if (err) {
				callback(err);
				//console.log("Error");
			} else {
				connection.query(sql, data, function (err1, results) {
					//console.log("Successful");
					connection.release();
					callback(err1, results);
				});
			}
		});
	}
};