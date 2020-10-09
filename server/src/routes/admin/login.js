/* routes/admin/login.js */

// 라우팅을 위한 기본 모듈 포함
const express = require('express')
const router = express.Router()
const db = require('../../database/db.js')
const crypto = require('crypto')

// 외부 클래스 포함
const String = require('../../class/String.js')
const Http = require('../../class/Http.js')

// 로그인 페이지 렌더링
router.get('/', (req, res) => {
  res.render('admin/login')
})

// 로그인처리 요청 및 응답
router.post('/login', (req, res) => {
  // 클라이언트가 요청한 데이터 저장
  const manager = {
    id: req.body.id,
    passwd: req.body.passwd,
  }

  // 클라이언트의 요청 데이터를 터미널에 출력
  console.log('클라이언트 요청 경로 : /admin/login \n데이터 : ')
  console.log(manager.id)

  // 응답 객체 선언
  const response = {}

  // 클라이언트가 요청한 데이터가 있는지 검사
  if (!String.isEmpty(manager.id)) {
    // 클라이언트가 전송한 "managerId" 가 있다면
    let passwd = ''

    // DB 검사 => 요청 아이디와 패스워드가 일치하는 데이터를 찾아 검사한다.
    db.query(`SELECT * FROM managers WHERE manager_id LIKE ?`, [manager.id], (err, managerDB) => {
      if (err) {
        // 실패시 false 응답
        response.success = false
        response.msg = err

        // 데이터 응답
        Http.printResponse(response)
        res.json(response)
      }

      if (String.isEmpty(managerDB)) {
        // DB에 해당하는 아이디가 없을 경우 실행
        response.success = false
        response.msg = 'The ID does not exist.'

        // 데이터 응답
        Http.printResponse(response)
        res.json(response)
      } else {
        // 비밀번호 해쉬 값 찾기
        crypto.pbkdf2(
          manager.passwd,
          managerDB[0].manager_salt,
          100000,
          64,
          'sha512',
          (err, key) => {
            passwd = key.toString('hex')

            if (
              managerDB != false &&
              managerDB[0].manager_id == manager.id &&
              managerDB[0].manager_passwd == passwd
            ) {
              // 아이디 패스워드 일치시 True 응답
              response.success = true
            } else {
              // 일치하지 않으면 False 응답
              response.success = false
              response.msg = 'The ID and Password do not Match.'
            }

            // 데이터 응답
            Http.printResponse(response)
            res.json(response)
          },
        )
      }
    })
  } else {
    // 클라이언트가 전송한 데이터가 없다면 false 반환
    response.success = false
    response.msg = 'The manager datas of the server is empty.'

    // 데이터 응답
    Http.printResponse(response)
    res.json(response)
  }
})

// 회원가입 페이지 렌더링
router.get('/signup', (req, res) => {
  res.render('admin/signup')
})

// 회원가입 요청 및 응답
router.post('/signup', (req, res) => {
  // 클라이언트가 요청한 데이터 저장
  const manager = req.body

  // 클라이언트의 요청 데이터를 터미널에 출력
  console.log('클라이언트 요청 경로 : /admin/signup \n데이터 : ')
  console.log(manager.id)

  // 응답 객체 선언
  const response = {}

  // 클라이언트가 요청한 데이터가 있는지 검사
  if (!String.isEmpty(manager.id)) {
    // 클라이언트가 전송한 "managerId" 가 있다면
    let passwd = '',
      salt = ''

    // 비밀번호 암호화 => 해쉬 암호만들기
    crypto.randomBytes(64, (err, buf) => {
      salt = buf.toString('hex')

      // 해쉬 만들기
      crypto.pbkdf2(manager.passwd, salt, 100000, 64, 'sha512', (err, key) => {
        passwd = key.toString('hex')

        // DB 등록
        db.query(
          'INSERT INTO managers(manager_id, manager_name, manager_email, manager_passwd, manager_salt) VALUES(?, ?, ?, ?, ?)',
          [manager.id, manager.name, manager.email, passwd, salt],
          (err) => {
            if (err) {
              // 실패시 false 응답
              response.success = false
              response.msg = err
            } else {
              // 응답 데이터 생성
              response.success = true
            }

            // 데이터 응답
            Http.printResponse(response)
            res.json(response)
          },
        )
      })
    })
  } else {
    // 클라이언트가 전송한 데이터가 없다면 false 반환
    response.success = false
    response.msg = 'The manager datas of the server is empty.'

    // 데이터 응답
    Http.printResponse(response)
    res.json(response)
  }
})

// 모듈 내보내기
module.exports = router
