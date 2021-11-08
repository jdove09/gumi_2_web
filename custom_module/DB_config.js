var mysql = require('mysql');
//변경해야함
var db_info = {
    host: '192.168.100.66',
    port: '3306',
    user: 'developer',
    password: 'qlalfqjsgh123',
    database: 'testdb'
}

module.exports = {
    init: function () {
        return mysql.createConnection(db_info);
    },
    connect: function(conn) {
        conn.connect(function(err) {
            if(err) console.error('mysql connection error : ' + err);
            else console.log('mysql is connected successfully!');
        });
    }
}
