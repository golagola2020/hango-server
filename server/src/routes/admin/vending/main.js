/* routes/admin/vending/main.js */

// 라우팅을 위한 기본 모듈 포함
const express = require('express')
const router = express.Router()
const db = require('../../../database/db.js')

// 외부 클래스 포함
const String = require('../../../class/String.js')
const Http = require('../../../class/Http.js')

// 자판기 메인 페이지 렌더링
router.get('/', (req, res) => {
  res.render('admin/vending/main')
})

// 자판기 목록 요청 밎 응답
router.post('/read', (req, res) => {
  // 클라이언트의 요청 데이터를 터미널에 출력
  console.log('클라이언트 조회 요청 경로 : /admin/vending/read \n요청 데이터 없음')

  // 응답 객체 선언
  const response = {}

  db.query(
    "SELECT serial_number, user_id, vending_name, date_format(vending_in_date, '%Y년 %m월 %d일 %H시 %i분 %s초') AS date FROM vendings",
    (err, results) => {
      if (err) {
        // 자판기 등록이 실패하면 false 응답
        response.success = false
        response.msg = err
      } else {
        // 성공시 자판기 정보를 Object로 선언
        response.success = true
        response.vendings = []

        // DB에서 받아온 데이터 전체 삽입
        let vending = {}
        for (const result of results) {
          // DB 데이터를 Object로 초기화
          vending = {
            serialNumber: result.serial_number,
            userId: result.user_id,
            name: result.vending_name,
            inDate: result.date,
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
})

// 자판기 검색 목록 요청 밎 응답
router.post('/search', (req, res) => {
  const search = req.body
  // 클라이언트의 요청 데이터를 터미널에 출력
  console.log('클라이언트 검색 요청 경로 : /admin/vending/search \n요청 데이터 : ')
  console.log(req.body)

  // 응답 객체 선언
  const response = {}

  // 검색 쿼리 만들기
  const query =
    search.type == 'whole'
      ? `WHERE serial_number LIKE '%${search.text}%' OR user_id LIKE '%${search.text}%' OR vending_name LIKE '%${search.text}%' OR 
        vending_description LIKE '%${search.text}%'`
      : `WHERE ${search.type} LIKE '%${search.text}%'`

  // 클라이언트가 요청한 데이터가 있는지 검사
  if (!String.isEmpty(req.body)) {
    db.query(
      `SELECT serial_number, user_id, vending_name, date_format(vending_in_date, '%Y년 %m월 %d일 %H시 %i분 %s초') AS date 
        FROM vendings ${query}`,
      (err, results) => {
        if (err) {
          // 자판기 등록이 실패하면 false 응답
          response.success = false
          response.msg = err
        } else {
          // 성공시 자판기 정보를 Object로 선언
          response.success = true
          response.vendings = []

          // DB에서 받아온 데이터 전체 삽입
          let vending = {}
          for (const result of results) {
            // DB 데이터를 Object로 초기화
            vending = {
              serialNumber: result.serial_number,
              userId: result.user_id,
              name: result.vending_name,
              inDate: result.date,
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
    response.msg = 'The search datas of the server is empty.'

    // 데이터 응답
    Http.printResponse(response)
    res.json(response)
  }
})

// 자판기 등록 페이지 렌더링
router.get('/create', (req, res) => {
  res.render('admin/vending/create')
})

// 자판기 등록 요청 및 응답
router.post('/create', (req, res) => {
  // 클라이언트가 요청한 데이터 저장
  const user = {
    id: req.body.id,
  }

  // 클라이언트의 요청 데이터를 터미널에 출력
  console.log('클라이언트 등록 요청 경로 : /admin/vending/create \n데이터 : ')
  console.log(req.body)

  // 응답 객체 선언
  const response = {}

  // 클라이언트가 요청한 데이터가 있는지 검사
  if (!String.isEmpty(user.id)) {
    // 클라이언트가 전송한 "userId" 가 있다면, DB 검사 => 요청 아이디와 패스워드가 일치하는 데이터를 찾아 검사한다.
    db.query(
      "INSERT INTO vendings(serial_number, user_id, vending_name) VALUES(concat(date_format(now(), '%Y%m%d%H%i%s'), cast( cast( rand()*1000 as unsigned) as char)), ?, serial_number);",
      [user.id],
      (err) => {
        if (err) {
          // 자판기 등록이 실패하면 false 응답
          response.success = false
          response.msg = err
        } else {
          // 성공하면 true 응답
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
    response.msg = 'The user datas of the server is empty.'

    // 데이터 응답
    Http.printResponse(response)
    res.json(response)
  }
})

// 자판기 상세 페이지 렌더링
router.get('/:serialNumber', (req, res) => {
  res.render('admin/vending/detail', {serialNumber: req.params.serialNumber})
})

// 자판기 상세 페이지 정보 응답 API
router.post('/:serialNumber', (req, res) => {
  const {serialNumber} = req.params

  // 클라이언트의 요청 데이터를 터미널에 출력
  console.log('클라이언트 조회 요청 경로 : /admin/vending/:serialNumber \n요청 데이터 : ')
  console.log(serialNumber)

  // 응답 객체 선언
  const response = {}

  db.query(
    `SELECT user_id, vending_name, vending_description, vending_full_size,
    date_format(vending_in_date, '%Y년 %m월 %d일 %H시 %i분 %s초') AS in_date,
    date_format(vending_update_date, '%Y년 %m월 %d일 %H시 %i분 %s초') AS update_date
    FROM vendings WHERE serial_number=?`,
    [serialNumber],
    (err, result) => {
      if (err) {
        // 자판기 등록이 실패하면 false 응답
        response.success = false
        response.msg = err
      } else {
        // 성공시 자판기 정보를 Object로 선언
        response.success = true
        response.vending = {
          serialNumber,
          userId: result[0].user_id,
          name: result[0].vending_name,
          description: result[0].vending_description,
          fullSize: result[0].vending_full_size,
          inDate: result[0].in_date,
          updateDate: result[0].update_date,
        }
      }

      // 데이터 응답
      Http.printResponse(response)
      res.json(response)
    },
  )
})

// 자판기 상세 수정화면 렌더링
router.get('/:serialNumber/update', (req, res) => {
  const {serialNumber} = req.params

  // 클라이언트의 요청 데이터를 터미널에 출력
  console.log('클라이언트 조회 요청 경로 : /admin/vending/:serialNumber/update \n요청 데이터 : ')
  console.log(serialNumber)

  // 응답 객체 선언
  let response = {}

  db.query(`SELECT * FROM vendings WHERE serial_number=?`, [serialNumber], (err, vending) => {
    if (err) {
      // 실패시 false 응답
      response.success = false
      response.msg = err
    } else {
      // 성공시 true 응답
      response = vending[0]
    }

    // 데이터 응답
    Http.printResponse(response)
    res.render('admin/vending/update', response)
  })
})

// 자판기 상세 수정 API
router.put('/:serialNumber/update', (req, res) => {
  const {serialNumber} = req.params,
    {vending} = req.body

  // 클라이언트의 요청 데이터를 터미널에 출력
  console.log('클라이언트 수정 요청 경로 : /admin/vending/:serialNumber/update \n요청 데이터 : ')
  console.log(req.body)

  // 응답 객체 선언
  const response = {}

  // 클라이언트가 요청한 데이터가 있는지 검사
  if (!String.isEmpty(vending)) {
    // 클라이언트가 전송한 "vending" 이 있다면, 자판기 정보 수정
    db.query(
      'UPDATE vendings SET vending_name=?, vending_description=?, vending_full_size=?, vending_update_date=NOW() WHERE serial_number=?;',
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

// 자판기 삭제 API
router.delete('/:serialNumber', (req, res) => {
  const {serialNumber} = req.params

  // 클라이언트의 요청 데이터를 터미널에 출력
  console.log('클라이언트 삭제 요청 경로 : /admin/vending/:serialNumber \n요청 데이터 : ')
  console.log(serialNumber)

  // 응답 객체 선언
  const response = {}

  db.query(`DELETE FROM vendings WHERE serial_number=?;`, [serialNumber], (err) => {
    if (err) {
      // 자판기 등록이 실패하면 false 응답
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
})

// 모듈 내보내기
module.exports = router
