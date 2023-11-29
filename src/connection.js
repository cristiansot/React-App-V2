let mysql = require('mysql');

let connection = mysql.createConnection({
        host: 'shared14.hostgator.cl',
        port: 3306,
        database: 'gssdcl_project2',
        user: 'gssdcl_cristian',
        password: 'Line6spider.',
});
connection.connect(function(err) {
    if (err) {
        throw err;
    } else {
        console.log('successful connection');
   
    }
});