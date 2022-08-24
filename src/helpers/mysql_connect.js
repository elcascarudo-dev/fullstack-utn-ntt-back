const mysql = require('mysql2');

const db_connect = () => {
  return mysql.createConnection({
    host: localhost,
    user: 'root',
    password: '',
    database: 'imagenes'
  });

}

module.exports = {
  db_connect
}