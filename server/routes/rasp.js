/* routes/rasp.js */

// 라우팅을 위한 기본 모듈 포함
const express = require('express'),
  router = express.Router(),
  db = require('../database/db.js');

// 외부 클래스 포함
const String = require('../class/String.js');

// 라즈베리파이 음료 정보 요청 및 응답 경로
router.get('/drink/read', (req, res) => {
  // 시리얼 넘버를 받아온다.
  const serialNumber = req.body.serialNumber;

  // 클라이언트의 요청 데이터를 터미널에 출력
  console.log('클라이언트 요청 데이터 : ');
  console.log(req.body);
  console.log(`고유번호 : ${serialNumber}`);

  // 시리얼 넘버 존재 여부 검사
  if (!String.isEmpty(serialNumber)) {
    // 시리얼 넘버가 있다면 DB에서 음료수 정보를 불러온다.
    db.query(`SELECT serial_number, drink_position, drink_name, drink_price FROM drinks WHERE serial_number = ?;`, 
      [serialNumber], (err, results) => {
        // 실패시 false 응답
        if (err) {
          console.log(err);
          res.json({
            success : false,
            msg : err
          });
        }

        // 성공시 전송 데이터 선언
        const response = {
          success : true,
          serialNumber : results[0].serial_number,
          drinks : []
        };

        // DB에서 불러온 음료 정보들을 reponse Object에 담아 JSON 형태로 응답
        let drink = [];
        for (let result of results) {          
          // 음료 정보 초기화
          drink = {
            position : result.drink_position,
            name : result.drink_name,
            price : result.drink_price
          }

          // 음료 정보 삽입
          response.drinks.push(drink);
        }

        // 응답 및 출력
        console.log('서버 응답 데이터 : ');
        console.log(response);
        res.json(response);
    });
  } else {
    // 시리얼 넘버를 받아오지 못했다면 false 응답
    res.json({ 
      success : false,
      msg : "The serial number of the server is empty."
    });
  }
});

// 모듈 내보내기
module.exports = router;