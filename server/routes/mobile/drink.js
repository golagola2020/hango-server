/* routes/mobile.js */

const { json } = require("body-parser");

// 라우팅을 위한 기본 모듈 포함
const express = require("express"),
  app = express(),
  router = express.Router(),
  db = require("./../../database/db.js");

// 외부 클래스 포함
const String = require("./../../class/String.js"),
  Http = require("./../../class/Http.js");

// 자판기 상세 혹은 음료수 조회화면 로딩시 요청 경로 => 자판기 정보 응답
router.post("/read", (req, res) => {
  // 클라이언트가 요청한 데이터 저장
  const serialNumber = req.body.serialNumber;

  // 클라이언트의 요청 데이터를 터미널에 출력
  console.log("클라이언트 요청 경로 : /mobile/drink/read \n데이터 : ");
  console.log(req.body);

  // 응답 객체 선언
  const response = {};

  // 클라이언트가 요청한 데이터가 있는지 검사
  if (!String.isEmpty(serialNumber)) {
    // 음료 정보 조회
    db.query(
      `SELECT drink_position, drink_name, drink_price, drink_count, drink_max_count FROM drinks WHERE serial_number = ?;`,
      [serialNumber],
      (err, results) => {
        if (err) {
          // 실패시 "False" 응답
          response.success = false;
          response.msg = err;
        } else {
          // 성공시 true 응답
          response.success = true;
          response.drinks = [];

          //  음료 정보 삽입
          let drink = {};
          for (let result of results) {
            // DB 데이터를 Object로 초기화
            drink = {
              position: result.drink_position,
              name: result.drink_name,
              price: result.drink_price,
              count: result.drink_count,
              maxCount: result.drink_max_count,
            };
            // 자판기별 데이터를 Array에 삽입
            response.drinks.push(drink);
          }
        }

        // 데이터 응답
        Http.printResponse(response);
        res.json(response);
      }
    );
  } else {
    // 클라이언트가 전송한 데이터가 없다면 false 반환
    response.success = false;
    response.msg = "The serial number of the server is empty.";

    // 데이터 응답
    Http.printResponse(response);
    res.json(response);
  }
});

// 음료 등록
router.post("/create", (req, res) => {
  // 클라이언트가 요청한 데이터 저장
  const serialNumber = req.body.serialNumber,
    drink = req.body.drink;

  // 클라이언트의 요청 데이터를 터미널에 출력
  console.log("클라이언트 요청 경로 : /mobile/drink/create \n데이터 : ");
  console.log(req.body);

  // 응답 객체 선언
  const response = {};

  // 클라이언트가 요청한 데이터가 있는지 검사
  if (!String.isEmpty(serialNumber)) {
    // 클라이언트가 전송한 "serialNumber" 가 있다면, DB 등록
    db.query(
      `INSERT INTO drinks(serial_number, drink_position, drink_name, drink_price, drink_count, drink_max_count) VALUES(?, ?, ?, ?, ?, ?)`,
      [
        serialNumber,
        drink.position,
        drink.name,
        drink.price,
        drink.maxCount,
        drink.maxCount,
      ],
      (err, result) => {
        if (err) {
          // 실패시 false 응답
          response.success = false;
          response.msg = err;
        } else {
          // 성공시 true 응답
          response.success = true;
        }

        // 데이터 응답
        Http.printResponse(response);
        res.json(response);
      }
    );
  } else {
    // 클라이언트가 전송한 데이터가 없다면 false 반환
    response.success = false;
    response.msg = "The drink data of the server is empty.";

    // 데이터 응답
    Http.printResponse(response);
    res.json(response);
  }
});

// 음료 수정
router.post("/update", (req, res) => {
  // 클라이언트가 요청한 데이터 저장
  const serialNumber = req.body.serialNumber,
    drink = req.body.drink;

  // 클라이언트의 요청 데이터를 터미널에 출력
  console.log("클라이언트 요청 경로 : /mobile/drink/update \n데이터 : ");
  console.log(req.body);

  // 응답 객체 선언
  const response = {};

  // 클라이언트가 요청한 데이터가 있는지 검사
  if (!String.isEmpty(serialNumber)) {
    // 클라이언트가 전송한 "serialNumber" 가 있다면, 음료 정보 수정
    db.query(
      `UPDATE drinks SET drink_name=?, drink_price=?, drink_count=?, drink_max_count=? WHERE serial_number=? AND drink_position=?;`,
      [
        drink.name,
        drink.price,
        drink.maxCount,
        drink.maxCount,
        serialNumber,
        drink.position,
      ],
      (err, result) => {
        if (err) {
          // 실패시 false 응답
          response.success = false;
          response.msg = err;
        } else {
          // 성공시 true 응답
          response.success = true;
        }

        // 데이터 응답
        Http.printResponse(response);
        res.json(response);
      }
    );
  } else {
    // 클라이언트가 전송한 데이터가 없다면 false 반환
    response.success = false;
    response.msg = "The drink data of the server is empty.";

    // 데이터 응답
    Http.printResponse(response);
    res.json(response);
  }
});

// drink_count를 drink_max_count로 초기화
router.post("/refresh", (req, res) => {
  // 클라이언트가 요청한 데이터 저장
  const serialNumber = req.body.serialNumber;

  // 클라이언트의 요청 데이터를 터미널에 출력
  console.log("클라이언트 요청 경로 : /mobile/drink/refresh \n데이터 : ");
  console.log(req.body);

  // 응답 객체 선언
  const response = {};

  // 클라이언트가 요청한 데이터가 있는지 검사
  if (!String.isEmpty(req.body)) {
    // 클라이언트가 전송한 데이터가 있다면, drink_count를 drink_max_count로 초기화
    db.query(
      `UPDATE drinks
        SET drink_count = drink_max_count
        WHERE serial_number=?;`,
      [serialNumber],
      (err, result) => {
        if (err) {
          // 실패시 false 응답
          response.success = false;
          response.msg = err;
        } else {
          // 응답 데이터 생성
          response.success = true;
        }

        // 데이터 응답
        Http.printResponse(response);
        res.json(response);
      }
    );
  } else {
    // 클라이언트가 전송한 데이터가 없다면 false 반환
    response.success = false;
    response.msg = "The client request is empty.";

    // 데이터 응답
    Http.printResponse(response);
    res.json(response);
  }
});

// 모듈 내보내기
module.exports = router;
