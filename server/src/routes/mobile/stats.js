/* routes/mobile/stats.js */

// 라우팅을 위한 기본 모듈 포함
const express = require('express');
  const router = express.Router();
  const db = require('./../../database/db.js');

// 외부 클래스 포함
const String = require('./../../class/String.js');
  const Http = require('./../../class/Http.js');

// 유저별 판매데이터 조회 요청 및 응답
router.post('/read', (req, res) => {
  // 클라이언트가 요청한 데이터 저장
  const {userId} = req.body;

  // 클라이언트의 요청 데이터를 터미널에 출력
  console.log('클라이언트 조회 요청 경로 : /mobile/stats/read \n요청 데이터 : ');
  console.log(req.body);

  // 응답 객체 선언
  const response = {};

  // 클라이언트가 요청한 데이터가 있는지 검사
  if (!String.isEmpty(userId)) {
    // 클라이언트가 전송한 "userId" 가 있다면 판매데이터 조회
    db.query(
      `SELECT date_format(sale_date, '%y-%m') AS sale_date, SUM(drink_price) AS price
      FROM sales 
      WHERE user_id = ? AND sale_date > (NOW() - INTERVAL 1 YEAR)
      GROUP BY month(sale_date)
      ORDER BY sale_date;`,
      [userId],
      (err, results1) => {
        // 실패시 "false" 응답
        if (err) {
          response.success = false;
          response.msg = err;
        } else {
          // 응답 데이터 생성
          response.success = true;
          response.users = {
            saleDate: [],
            price: [],
          };

          // 데이터 삽입
          for (const result of results1) {
            response.users.saleDate.push(result.sale_date);
            response.users.price.push(result.price);
          }

          // 데이터 응답
          Http.printResponse(response);
          res.json(response);
        }
      },
    );
  } else {
    // 클라이언트가 전송한 데이터가 없다면 false 반환
    response.success = false;
    response.msg = 'The userId of the server is empty.';

    // 데이터 응답
    Http.printResponse(response);
    res.json(response);
  }
});

// 자판기별 판매데이터 조회 요청 및 응답
router.post('/vending/read', (req, res) => {
  // 클라이언트가 요청한 데이터 저장
  const {userId} = req.body;

  // 클라이언트의 요청 데이터를 터미널에 출력
  console.log('클라이언트 조회 요청 경로 : /mobile/stats/vending/read \n요청 데이터 : ');
  console.log(req.body);

  // 응답 객체 선언
  const response = {};

  // 클라이언트가 요청한 데이터가 있는지 검사
  if (!String.isEmpty(userId)) {
    // 클라이언트가 전송한 "userId" 가 있다면 판매데이터 조회
    db.query(
      `SELECT v.vending_name, date_format(s.sale_date, '%y-%m') AS sale_date, SUM(s.drink_price) AS price
            FROM sales AS s
            JOIN vendings AS v
            ON s.serial_number = v.serial_number
            WHERE s.user_id = ? AND s.sale_date > (NOW() - INTERVAL 1 YEAR)
            GROUP BY month(s.sale_date), s.serial_number
            ORDER BY s.serial_number, sale_date;`,
      [userId],
      (err, results2) => {
        // 실패시 "false" 응답
        if (err) {
          response.success = false;
          response.msg = err;
        } else {
          // 응답 데이터 생성
          response.success = true;
          response.vendings = {
            name: [],
          };

          // 데이터 삽입
          for (const result of results2) {
            response.vendings.name.push(result.vending_name);
            response.vendings[result.vending_name] = {
              saleDate: [],
              price: [],
            };
          }

          // 중복 제거
          // eslint-disable-next-line no-undef
          response.vendings.name = Array.from(new Set(response.vendings.name));

          // 데이터 삽입
          for (const result of results2) {
            response.vendings[result.vending_name].saleDate.push(result.sale_date);
            response.vendings[result.vending_name].price.push(result.price);
          }

          // 데이터 응답
          Http.printResponse(response);
          res.json(response);
        }
      },
    );
  } else {
    // 클라이언트가 전송한 데이터가 없다면 false 반환
    response.success = false;
    response.msg = 'The userId of the server is empty.';

    // 데이터 응답
    Http.printResponse(response);
    res.json(response);
  }
});

// 음료수별 판매데이터 조회 요청 및 응답
router.post('/drink/read', (req, res) => {
  // 클라이언트가 요청한 데이터 저장
  const {userId} = req.body;

  // 클라이언트의 요청 데이터를 터미널에 출력
  console.log('클라이언트 조회 요청 경로 : /mobile/stats/drink/read \n요청 데이터 : ');
  console.log(req.body);

  // 응답 객체 선언
  const response = {};

  // 클라이언트가 요청한 데이터가 있는지 검사
  if (!String.isEmpty(userId)) {
    // 클라이언트가 전송한 "userId" 가 있다면 판매데이터 조회
    db.query(
      `SELECT drink_name, date_format(sale_date, '%y-%m') AS sale_date, SUM(drink_price) AS price
          FROM sales 
          WHERE user_id = ? AND sale_date > (NOW() - INTERVAL 1 YEAR)
          GROUP BY month(sale_date), drink_name
          ORDER BY drink_name, sale_date;`,
      [userId],
      (err, results3) => {
        // 실패시 "false" 응답
        if (err) {
          response.success = false;
          response.msg = err;
        } else {
          // 응답 데이터 생성
          response.success = true;
          response.drinks = {
            name: [],
          };

          // 데이터 삽입
          for (const result of results3) {
            response.drinks.name.push(result.drink_name);
            response.drinks[result.drink_name] = {
              saleDate: [],
              price: [],
            };
          }

          // 중복 제거
          // eslint-disable-next-line no-undef
          response.drinks.name = Array.from(new Set(response.drinks.name));

          // 데이터 삽입
          for (const result of results3) {
            response.drinks[result.drink_name].saleDate.push(result.sale_date);
            response.drinks[result.drink_name].price.push(result.price);
          }
        }

        // 데이터 응답
        Http.printResponse(response);
        res.json(response);
      },
    );
  } else {
    // 클라이언트가 전송한 데이터가 없다면 false 반환
    response.success = false;
    response.msg = 'The userId of the server is empty.';

    // 데이터 응답
    Http.printResponse(response);
    res.json(response);
  }
});

// 모듈 내보내기
module.exports = router;
