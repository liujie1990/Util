const mysql = require('mysql');
const connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	database: 'mysql',
	user: 'root',
	password: 'root'
});

connection.connect(function(err) {
	if(err) {
		console.log('mysql数据库连接失败');
	}
	else {
		console.log('mysql数据库连接成功');
		connection.end(function(err) {
			if(err) {
				console.log('关闭mysql数据库失败');
			}
			else {
				console.log('关闭mysql数据库成功');
			}
		});
	}
});