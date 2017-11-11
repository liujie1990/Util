const mysql = require('mysql');
const pool = mysql.createPool({
	host: 'localhost',
	port: 3306,
	database: 'mysql',
	user: 'root',
	password: 'root'
});

pool.getConnection(function(err, connection) {
	if(err) {
		console.log('mysql数据库连接失败');
	}
	else {
		console.log('mysql数据库连接成功');
		connection.query('select * from users', function(err, rows) {
			if(err) {
				console.log('查询数据库操作失败');
			}
			else {
				console.log(rows);
				pool.end();//关闭数据库连接池
			}
		});
	}
});