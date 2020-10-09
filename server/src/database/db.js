/* database/db.js */

// mysql 모듈 포함
const mysql = require('mysql');

// mysql 연결을 위한 인스턴스 생성
const db = mysql.createConnection({
  host: process.env.DB_HOST, // DB 서버 호스트
  user: process.env.DB_USER, // 지정한 유저 아이디
  password: process.env.DB_PASSWORD, //  지정한 패스워드
  database: process.env.DB_NAME, // 데이터 베이스 이름
});

// // 연결 요청
db.connect();

// 외부와 연결시키기 위해 exports
module.exports = db;
