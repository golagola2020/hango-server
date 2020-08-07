/* routes/arduino.js */

// 라우팅을 위한 기본 모듈 포함
const express = require('express'),
  router = express.Router(),
  db = require('../database/db.js');

// 외부 클래스 포함
const String = require('../class/String.js');

// 아두이노에서 데이터 요청시 JSON API 응답
router.post('/', (req, res) => {
  // 클라이언트에게 전달할 데이터
  const data = {
    sensor : 'gps',
    time : 132352342451,
    data : [
      1.5352515,
      4642.5352
    ],
    distance : 2.5
  }; 

  // 클라이언트가 전송한 url의 파라미터를 파싱하여 데이터를 처리하는 부분
  const receivedData = req.body;
  console.log(`관리자 : ${receivedData.userId}`);
  console.log(`고유번호 : ${receivedData.serialNumber}`);

  // json으로 응답
  res.json(data);
});

// 해당 자판기의 각 칸 별 음료수 이름과 위치를 응답
router.post('/drink/read', (req, res) => {
  // 시리얼 넘버를 받아온다.
  const serialNumber = req.body.serialNumber;

  // 시리얼 넘버 존재 여부 검사
  if (!String.isEmpty(serialNumber)) {
    // 시리얼 넘버가 있다면 DB에서 음료수 정보를 불러온다.
    db.query(`SELECT serial_number, drink_position, drink_name FROM drinks WHERE serial_number = ?;`, 
      [serialNumber], (err, drinks) => {
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
          drinks : []
        };

        // DB에서 불러온 음료 정보들을 reponse Object에 담아 JSON 형태로 응답
        let rest = [];
        for (let drink of drinks) {
          // 음료 정보 초기화
          rest = {
            serialNumber : drink.serial_number,
            drinkPosition : drink.drink_position,
            drinkName : drink.drink_name
          }

          // 음료 정보 삽입
          response.drinks.push(rest);
        }

        // 응답
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
