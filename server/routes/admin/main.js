/* routes/admin/login.js */

// 라우팅을 위한 기본 모듈 포함
const express = require('express'),
    router = express.Router(),
    db = require('../../database/db.js');

// 외부 클래스 포함
const String = require('../../class/String.js'),
    Http = require('../../class/Http.js');

// 로그인 페이지 렌더링
router.get('/', (req, res) => {
    res.render('admin/main');
});

// 로그인처리 요청 및 응답
router.post('/vending/create', (req, res) => {
    // 클라이언트가 요청한 데이터 저장
    const user = {
        id : req.body.id
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