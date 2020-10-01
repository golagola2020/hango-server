/* routes/admin/vending/main.js */

// 라우팅을 위한 기본 모듈 포함
const express = require('express'),
    router = express.Router(),
    db = require('../../../database/db.js');

// 외부 클래스 포함
const String = require('../../../class/String.js'),
    Http = require('../../../class/Http.js');

// 자판기 메인 페이지 렌더링
router.get('/', (req, res) => {
    res.render('admin/vending/main');
});

// 자판기 목록 요청 밎 응답
router.post('/read', (req, res) => {
    // 클라이언트의 요청 데이터를 터미널에 출력
    console.log('클라이언트 요청 경로 : /admin/vending/read \n요청 데이터 없음');

    // 응답 객체 선언
    const response = {}

    db.query(`SELECT serial_number, user_id, vending_name, date_format(vending_in_date, '%Y년 %m월 %d일 %H시 %i분 %s초') AS date FROM vendings`, (err, results) => {
        if (err) {
            // 자판기 등록이 실패하면 false 응답
            response.success = false;
            response.msg = err;
        } else {
            // 성공시 자판기 정보를 Object로 선언
            response.success = true;
            response.vendings = [];
            console.log(results)
            // DB에서 받아온 데이터 전체 삽입
            let vending = {};
            for (let result of results) {
                // DB 데이터를 Object로 초기화
                vending = {
                    serialNumber: result.serial_number,
                    userId: result.user_id,
                    name: result.vending_name,
                    inDate: result.date,
                }

                // 자판기별 데이터를 Array에 삽입
                response.vendings.push(vending);
            }
        }

        // 데이터 응답
        Http.printResponse(response);
        res.json(response);
    });
});

// 자판기 등록 페이지 렌더링
router.get('/create', (req, res) => {
    res.render('admin/vending/create');
});

// 자판기 등록 요청 및 응답
router.post('/create', (req, res) => {
    // 클라이언트가 요청한 데이터 저장
    const user = {
        id: req.body.id
    };

    // 클라이언트의 요청 데이터를 터미널에 출력
    console.log('클라이언트 요청 경로 : /admin/vending/create \n데이터 : ');
    console.log(req.body);

    // 응답 객체 선언
    const response = {}

    // 클라이언트가 요청한 데이터가 있는지 검사
    if (!String.isEmpty(user.id)) {
        // 클라이언트가 전송한 "userId" 가 있다면, DB 검사 => 요청 아이디와 패스워드가 일치하는 데이터를 찾아 검사한다.
        db.query(`INSERT INTO vendings(serial_number, user_id, vending_name) VALUES(concat(date_format(now(), '%Y%m%d%H%i%s'), cast( cast( rand()*1000 as unsigned) as char)), ?, serial_number);`,
            [user.id], (err, userDB) => {
                if (err) {
                    // 자판기 등록이 실패하면 false 응답
                    response.success = false;
                    response.msg = err;
                } else {
                    // 성공하면 true 응답
                    response.success = true;
                }

                // 데이터 응답
                Http.printResponse(response);
                res.json(response);
            });
    } else {
        // 클라이언트가 전송한 데이터가 없다면 false 반환
        response.success = false;
        response.msg = "The user datas of the server is empty.";

        // 데이터 응답
        Http.printResponse(response);
        res.json(response);
    }
});

// 모듈 내보내기
module.exports = router;