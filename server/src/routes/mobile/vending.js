/* routes/mobile.js */

// 라우팅을 위한 기본 모듈 포함
const express = require('express')
const router = express.Router()
const db = require('./../../database/db.js')

// 외부 클래스 포함
const String = require('./../../class/String.js')
const Http = require('./../../class/Http.js')

// 모바일 메인화면 로딩시 요청 경로 => 자판기 정보 응답
router.post('/read', (req, res) => {
  // 클라이언트가 요청한 데이터 저장
  const {userId} = req.body

  // 클라이언트의 요청 데이터를 터미널에 출력
  console.log('클라이언트 요청 경로 : /mobile/vending/read \n데이터 : ')
  console.log(req.body)

  // 응답 객체 선언
  const response = {}

  // 클라이언트가 요청한 데이터가 있는지 검사
  if (!String.isEmpty(userId)) {
    // 클라이언트가 전송한 "userId" 가 있다면, 유저 아이디에 따른 자판기 정보 검색 후 응답
    db.query(
      `SELECT u.user_id, u.user_name, v.serial_number, v.vending_name, v.vending_description, v.vending_full_size
            FROM users AS u
            JOIN vendings AS v
            ON u.user_id = v.user_id
            WHERE u.user_id=?;`,
      [userId],
      (err, results) => {
        if (err) {
          // 실패시 "False" 응답
          response.success = false
          response.msg = err
        } else {
          // 성공시 자판기 정보를 Object로 선언
          response.success = true
          response.userName = results[0].user_name
          response.vendings = []

          // DB에서 받아온 데이터 전체 삽입
          let vending = {}
          for (const result of results) {
            // DB 데이터를 Object로 초기화
            vending = {
              serialNumber: result.serial_number,
              name: result.vending_name,
              description: result.vending_description,
              fullSize: result.vending_full_size,
            }

            // 자판기별 데이터를 Array에 삽입
            response.vendings.push(vending)
          }
        }

        // 데이터 응답
        Http.printResponse(response)
        res.json(response)
      },
    )
  } else {
    // 클라이언트가 전송한 데이터가 없다면 false 반환
    response.success = false
    response.msg = 'The userId of the server is empty.'

    // 데이터 응답
    Http.printResponse(response)
    res.json(response)
  }
})

// 자판기 수정 요청
router.post('/update', (req, res) => {
  // 클라이언트가 요청한 데이터 저장
  const {serialNumber} = req.body,
    {vending} = req.body

  // 클라이언트의 요청 데이터를 터미널에 출력
  console.log('클라이언트 요청 경로 : /mobile/vending/update \n데이터 : ')
  console.log(req.body)

  // 응답 객체 선언
  const response = {}

  // 클라이언트가 요청한 데이터가 있는지 검사
  if (!String.isEmpty(vending)) {
    // 클라이언트가 전송한 "vending" 이 있다면, 자판기 정보 수정
    db.query(
      'UPDATE vendings SET vending_name=?, vending_description=?, vending_full_size=? WHERE serial_number=?;',
      [vending.name, vending.description, vending.fullSize, serialNumber],
      (err) => {
        if (err) {
          // 실패시 false 응답
          response.success = false
          response.msg = err
        } else {
          // 성공시 true 응답
          response.success = true
        }

        // 데이터 응답
        Http.printResponse(response)
        res.json(response)
      },
    )
  } else {
    // 클라이언트가 전송한 데이터가 없다면 false 반환
    response.success = false
    response.msg = 'The vending of the server is empty.'

    // 데이터 응답
    Http.printResponse(response)
    res.json(response)
  }
})

// 자판기 삭제 요청
router.post('/delete', (req, res) => {
  // 클라이언트가 요청한 데이터 저장
  const {serialNumber} = req.body

  // 클라이언트의 요청 데이터를 터미널에 출력
  console.log('클라이언트 요청 경로 : /mobile/vending/delete \n데이터 : ')
  console.log(req.body)

  // 응답 객체 선언
  const response = {}

  // 클라이언트가 요청한 데이터가 있는지 검사
  if (!String.isEmpty(serialNumber)) {
    // 클라이언트가 전송한 "serialNumber" 가 있다면, 자판기 정보 수정
    db.query(`DELETE FROM vendings WHERE serial_number=?;`, [serialNumber], (err) => {
      if (err) {
        // 실패시 false 응답
        response.success = false
        response.msg = err
      } else {
        // 성공시 true 응답
        response.success = true
      }

      // 데이터 응답
      Http.printResponse(response)
      res.json(response)
    })
  } else {
    // 클라이언트가 전송한 데이터가 없다면 false 반환
    response.success = false
    response.msg = 'The serial number of the server is empty.'

    // 데이터 응답
    Http.printResponse(response)
    res.json(response)
  }
})

// 모듈 내보내기
module.exports = router
