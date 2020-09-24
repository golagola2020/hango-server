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
    res.render('admin/login');
});

// 로그인처리 요청 및 응답
router.post('/', (req, res) => {
    // 클라이언트가 요청한 데이터 저장
    const manager = {
        id : req.body.id,
        passwd : req.body.passwd
    };

    // 클라이언트의 요청 데이터를 터미널에 출력
    console.log('클라이언트 요청 경로 : /admin/login \n데이터 : ');
    console.log(req.body);

    // 응답 객체 선언
    const response = {}
    
    // 클라이언트가 요청한 데이터가 있는지 검사
    if (!String.isEmpty(manager.id)) {
        // 클라이언트가 전송한 "managerId" 가 있다면, DB 검사 => 요청 아이디와 패스워드가 일치하는 데이터를 찾아 검사한다.
        db.query(`SELECT * FROM managers WHERE manager_id LIKE ?`, [manager.id], (err, managerDB) => {
            if (err) {
                // 실패시 false 응답
                response.success = false;
                response.msg = err;
            } else if (String.isEmpty(managerDB)) {
                // DB에 해당하는 아이디가 없을 경우 실행
                response.success = false;
                response.msg = "The ID does not exist.";
            } else if (managerDB != false && managerDB[0].manager_id == manager.id && managerDB[0].manager_passwd == manager.passwd) {
                // 아이디 패스워드 일치시 True 응답
                response.success = true;
            } else {
                // 일치하지 않으면 False 응답
                response.success = false;
                response.msg = "The ID and Password do not Match.";
            }

            // 데이터 응답
            Http.printResponse(response);
            res.json(response);
        });
    } else {
        // 클라이언트가 전송한 데이터가 없다면 false 반환
        response.success = false;
        response.msg = "The manager datas of the server is empty.";

        // 데이터 응답
        Http.printResponse(response);
        res.json(response);
    }
});

// 모듈 내보내기
module.exports = router;