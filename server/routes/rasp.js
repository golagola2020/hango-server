/* routes/rasp.js */

// 라우팅을 위한 기본 모듈 포함
const express = require('express'),
  router = express.Router(),
  db = require('../database/db.js');

// 외부 클래스 포함
const String = require('../class/String.js');

// 음료 정보 요청 및 응답 경로
router.post('/drink/read', (req, res) => {
  // 시리얼 넘버를 받아온다.
  const serialNumber = req.body.serial_number;

  // 클라이언트의 요청 데이터를 터미널에 출력
  console.log('클라이언트 요청 경로 : /rasp/drink/read \n데이터 : ');
  console.log(req.body);

  // 시리얼 넘버 존재 여부 검사
  if (!String.isEmpty(serialNumber)) {
    // 시리얼 넘버가 있다면 DB에서 음료수 정보를 불러온다.
    db.query(`SELECT serial_number, drink_position, drink_name, drink_price, drink_count FROM drinks WHERE serial_number = ?;`, 
      [serialNumber], (err, results) => {
        // 실패시 false 응답
        if (err) {
          console.log(err);
          res.json({
            success : false,
            msg : err
          });
          return;
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
            price : result.drink_price,
            count : result.drink_count
          }

          // 음료 정보 삽입
          response.drinks.push(drink);
        }

        // 응답 데이터 존재 여부 검사
        if (!String.isEmpty(response.drinks)) {
          // 응답 및 출력
          console.log('서버 응답 데이터 : ');
          console.log(response);
          res.json(response);
        } else {
          // 시리얼 넘버에 해당하는 데이터가 없다면 false 응답
          res.json({ 
            success : false,
            msg : "The serial number isn't exist."
          });
        }
    });
  } else {
    // 시리얼 넘버를 받아오지 못했다면 false 응답
    res.json({ 
      success : false,
      msg : "The serial number of the server is empty."
    });
  }
});

// 판매된 음료 위치 요청 및 응답 경로 => 음료수가 판매되면 DB에서 개수를 1개 차감하여 다시 저장한다.
router.post('/drink/update', (req, res) => {
  // 시리얼 넘버를 받아온다.
  const serialNumber = req.body.serial_number,
    soldPosition = req.body.sold_position;

  // 클라이언트의 요청 데이터를 터미널에 출력
  console.log('클라이언트 요청 경로 : /rasp/drink/update \n데이터 : ');
  console.log(req.body);

  // 시리얼 넘버 존재 여부 검사
  if (!String.isEmpty(req.body)) {
    // 시리얼 넘버가 있다면 DB에서 음료수 정보를 불러온다.
    db.query(`SELECT drink_count FROM drinks WHERE serial_number=? AND drink_position=?;`, 
      [serialNumber, soldPosition], (err, drinkCounts) => {
        // 실패시 false 응답
        if (err) {
          console.log(err);
          res.json({
            success : false,
            msg : err
          });
          return;
        }

        // 현재 음료 개수에서 1개 제거
        drinkCount = drinkCounts[0].drink_count - 1;

        // 수정된 음료 개수 저장
        db.query(`UPDATE drinks SET drink_count=? WHERE serial_number=? AND drink_position=?;`,
          [drinkCount, serialNumber, soldPosition], (err2, results) => {
            // 실패시 false 응답
            if (err2) {
              console.log(err);
              res.json({
                success : false,
                msg : err
              });
              return;
            }
            
            // 성공시 전송 데이터 선언
            const response = {
              success : true
            };

            // 응답 데이터 존재 여부 검사
            if (!String.isEmpty(response.success)) {
              // 응답 및 출력
              console.log('서버 응답 데이터 : ');
              console.log(response);
              res.json(response);
            } else {
              // 시리얼 넘버에 해당하는 데이터가 없다면 false 응답
              res.json({ 
                success : false,
                msg : "The serial_number or sold_position isn't exist."
              });
            }
        });        
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