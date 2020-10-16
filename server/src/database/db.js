/* database/db.js */

// mysql 모듈 포함
const mysql = require('mysql')

// mysql 연결을 위한 인스턴스 생성
const db = mysql.createConnection({
  host: process.env.DB_HOST, // DB 서버 호스트
  user: process.env.DB_USER, // 지정한 유저 아이디
  password: process.env.DB_PASSWORD, //  지정한 패스워드
  database: process.env.DB_NAME, // 데이터 베이스 이름
})

// mysql 연결. -> 연결이 끊어지면 재연결
function handleDisconnect() {
  db.connect(function (err) {
    if (err) {
      console.log('error when connecting to db:', err)
      setTimeout(handleDisconnect, 2000)
    }
  })

  db.on('error', function (err) {
    console.log('db error', err)
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      return handleDisconnect()
    } else {
      throw err
    }
  })
}

handleDisconnect()

// 외부와 연결시키기 위해 exports
module.exports = db
