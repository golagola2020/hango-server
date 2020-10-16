/* routes/admin/login.js */

// 라우팅을 위한 기본 모듈 포함
const express = require('express')
const router = express.Router()
const db = require('../../database/db.js')
const crypto = require('crypto')
const nodemailer = require('nodemailer')

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

// 외부 클래스 포함
const String = require('../../class/String.js')
const Http = require('../../class/Http.js')

const isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) return next()
  res.render('admin/login')
}

// 로그인 페이지 렌더링
router.get('/', isAuthenticated, (req, res) => {
  res.render('admin/home')
})

// 로그인처리 요청 및 응답
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, manager, info) => {
    if (err) {
      return next(err)
    }

    // 응답 객체 선언
    const response = {}

    // 로그인 성공 여부 검사 -> 유저 정보가 있으면 로그인 성공
    if (manager) {
      // customCallback 사용시 req.logIn()메서드 필수
      req.logIn(manager, (err) => {
        if (err) {
          return next(err)
        }
        response.success = true
        return res.json(response)
      })
    } else {
      // 로그인 실패
      response.success = false
      response.msg = info.message
      res.json(response)
    }
  })(req, res, next)
})

passport.use(
  new LocalStrategy(
    {
      usernameField: 'id',
      passwordField: 'passwd',
      passReqToCallback: true, //인증을 수행하는 인증 함수로 HTTP request를 그대로  전달할지 여부를 결정한다
    },
    function (req, id, passwd, done) {
      // 클라이언트가 요청한 데이터 저장
      const manager = {
        id: id,
        passwd: passwd,
      }

      // 클라이언트의 요청 데이터를 터미널에 출력
      console.log('클라이언트 요청 경로 : /admin/login \n데이터 : ')
      console.log(manager.id)

      // 클라이언트가 요청한 데이터가 있는지 검사
      if (!String.isEmpty(manager.id)) {
        // 클라이언트가 전송한 "managerId" 가 있다면
        let passwd = ''

        // DB 검사 => 요청 아이디와 패스워드가 일치하는 데이터를 찾아 검사한다.
        db.query(
          `SELECT * FROM managers WHERE manager_id LIKE ?`,
          [manager.id],
          (err, managerDB) => {
            if (err) {
              return done(null, false, {
                message: err,
              })
            }

            if (String.isEmpty(managerDB)) {
              // DB에 해당하는 아이디가 없을 경우 실행
              return done(null, false, {
                message: '존재하지 않는 아이디입니다.',
              })
            } else {
              // 비밀번호 해쉬 값 찾기
              crypto.pbkdf2(
                manager.passwd,
                managerDB[0].manager_salt,
                100000,
                64,
                'sha512',
                (err, key) => {
                  if (err) {
                    return done(null, false, {
                      message: err,
                    })
                  }
                  passwd = key.toString('hex')

                  if (
                    managerDB != false &&
                    managerDB[0].manager_id === manager.id &&
                    managerDB[0].manager_passwd === passwd
                  ) {
                    // 아이디 패스워드가 일치하고 Hango가 승인한 아이디일 경우 manager 정보 응답
                    if (managerDB[0].manager_approbation_flag === 1) {
                      console.log(manager)
                      return done(null, manager)
                    } else {
                      return done(null, false, {
                        message: 'Hango의 승인이 필요합니다. 승인 후 이용바랍니다.',
                      })
                    }
                  } else {
                    // 일치하지 않으면 False 응답
                    return done(null, false, {
                      message: '아이디와 비밀번호가 일치하지 않습니다.',
                    })
                  }
                },
              )
            }
          },
        )
      } else {
        // 클라이언트가 전송한 데이터가 없다면 false 반환
        return done(null, false, {
          message: '클라이언트의 요청 데이터가 존재하지 않습니다.',
        })
      }
    },
  ),
)

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

              // 데이터 응답
              Http.printResponse(response)
              res.json(response)
            } else {
              // Hango 운영자에게 승인 요청 이메일 전송
              const sendMail = async () => {
                let transporter = nodemailer.createTransport({
                  service: 'gmail',
                  host: 'smtp.gmail.com',
                  port: 587,
                  secure: false,
                  auth: {
                    user: process.env.HANGO_MANAGER_EMAIL,
                    pass: process.env.HANGO_MANAGER_PASSWORD,
                  },
                })

                // send mail with defined transport object
                let info = await transporter.sendMail({
                  from: `"Hango Team" <${process.env.HANGO_MANAGER_EMAIL}>`,
                  to: process.env.HANGO_MANAGER_EMAIL,
                  subject: `Hango 운영자 승인 요청 from ${manager.email}`,
                  html: `<b>이름</b> : ${manager.name}<br>
                  <b>아이디</b> : ${manager.id}<br>
                  <b>이메일</b> : ${manager.email}<br><br>
                  새로운 운영자 승인 요청이 들어왔습니다.
                  `,
                })

                // 메일 전송 코드 첫자리가 2이면 -> 메일이 정상적으로 전송됐다면
                if (info.response[0] === '2') {
                  response.success = true
                  response.mailInfo = info

                  // 데이터 응답
                  Http.printResponse(response)
                  res.json(response)
                }
              }

              sendMail().catch(console.error)
            }
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
