/* routes/mobile.js */

const { json } = require('body-parser');

// 라우팅을 위한 기본 모듈 포함
const express = require('express'),
    router = express.Router(),
    db = require('./../../database/db.js');

// 외부 클래스 포함
const String = require('./../../class/String.js'),
    Http = require('./../../class/Http.js');

// 로그인 요청 및 응답
router.post('/login', (req, res) => {
    // 클라이언트가 요청한 데이터 저장
    const user = {
        id: req.body.userId,
        passwd: req.body.userPasswd
    };

    // 클라이언트의 요청 데이터를 터미널에 출력
    console.log('클라이언트 요청 경로 : /mobile/login \n데이터 : ');
    console.log(req.body);

    // 응답 객체 선언
    const response = {}

    // 클라이언트가 요청한 데이터가 있는지 검사
    if (!String.isEmpty(user.id)) {
        // 클라이언트가 전송한 "userId" 가 있다면, DB 검사 => 요청 아이디와 패스워드가 일치하는 데이터를 찾아 검사한다.
        db.query(`SELECT * FROM users WHERE user_id LIKE ?`, [user.id], (err, userDB) => {
            if (err) {
                // 실패시 false 응답
                response.success = false;
                response.msg = err;
            } else if (String.isEmpty(userDB)) {
                // DB에 해당하는 아이디가 없을 경우 실행
                response.success = false;
                response.msg = "The ID does not exist.";
            } else if (userDB != false && userDB[0].user_id == user.id && userDB[0].user_passwd == user.passwd) {
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
        response.msg = "The user datas of the server is empty.";

        // 데이터 응답
        Http.printResponse(response);
        res.json(response);
    }
});

// 회원가입 요청 및 응답
router.post('/signup', (req, res) => {
    // 클라이언트가 요청한 데이터 저장
    const user = {
        name: req.body.userName,
        id: req.body.userId,
        email: req.body.userEmail,
        passwd: req.body.userPasswd
    };

    // 클라이언트의 요청 데이터를 터미널에 출력
    console.log('클라이언트 요청 경로 : /mobile/signup \n데이터 : ');
    console.log(req.body);

    // 응답 객체 선언
    const response = {}

    // 클라이언트가 요청한 데이터가 있는지 검사
    if (!String.isEmpty(user.id)) {
        // 클라이언트가 전송한 "userId" 가 있다면, DB 등록
        db.query(`INSERT INTO users(user_id, user_name, user_email, user_passwd) VALUES(?, ?, ?, ?)`, [user.id, user.name, user.email, user.passwd], (err, result) => {
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

// 회원정보 조회 요청 및 응답
router.post('/user/read', (req, res) => {
    // 클라이언트가 요청한 데이터 저장
    const userId = req.body.userId;

    // 클라이언트의 요청 데이터를 터미널에 출력
    console.log('클라이언트 요청 경로 : /mobile/user/read \n데이터 : ');
    console.log(req.body);

    // 응답 객체 선언
    const response = {}

    // 클라이언트가 요청한 데이터가 있는지 검사
    if (!String.isEmpty(userId)) {
        // 클라이언트가 전송한 "userId" 가 있다면 조회
        db.query(`SELECT * FROM users WHERE user_id=?`, [userId], (err, result) => {
            // 실패시 "false" 응답
            if (err) {
                response.success = false;
                response.msg = err;
            } else {
                // 응답 데이터 생성
                response.success = true;
                response.user = {
                    id: result[0].user_id,
                    name: result[0].user_name,
                    email: result[0].user_email,
                };
            }

            // 데이터 응답
            Http.printResponse(response);
            res.json(response);
        });
    } else {
        // 클라이언트가 전송한 데이터가 없다면 false 반환
        response.success = false;
        response.msg = "The userId of the server is empty.";

        // 데이터 응답
        Http.printResponse(response);
        res.json(response);
    }
});

// 회원정보 수정 요청 및 응답
router.post('/user/update', (req, res) => {
    // 클라이언트가 요청한 데이터 저장
    const user = req.body.user;

    // 클라이언트의 요청 데이터를 터미널에 출력
    console.log('클라이언트 요청 경로 : /mobile/user/update \n데이터 : ');
    console.log(req.body);

    // 응답 객체 선언
    const response = {}

    // 클라이언트가 요청한 데이터가 있는지 검사
    if (!String.isEmpty(user)) {
        // 클라이언트가 전송한 "userId" 가 있다면 수정
        db.query(`UPDATE users SET user_id=?, user_name=?, user_email=?, user_passwd=? WHERE user_id=?`,
            [user.newId, user.name, user.email, user.newPasswd, user.id], (err, result) => {
                if (err) {
                    // 실패시 "false" 응답
                    response.success = false;
                    response.msg = err;
                } else {
                    // 성공시 True 응답
                    response.success = true;
                }

                // 데이터 응답
                Http.printResponse(response);
                res.json(response);
            });
    } else {
        // 클라이언트가 전송한 데이터가 없다면 false 반환
        response.success = false;
        response.msg = "The userId of the server is empty.";

        // 데이터 응답
        Http.printResponse(response);
        res.json(response);
    }
});

// 회원탈퇴 요청 및 응답
router.post('/user/delete', (req, res) => {
    // 클라이언트가 요청한 데이터 저장
    const userId = req.body.userId;

    // 클라이언트의 요청 데이터를 터미널에 출력
    console.log('클라이언트 요청 경로 : /mobile/user/delete \n데이터 : ');
    console.log(req.body);

    // 응답 객체 선언
    const response = {}

    // 클라이언트가 요청한 데이터가 있는지 검사
    if (!String.isEmpty(userId)) {
        // 클라이언트가 전송한 "userId" 가 있다면, DB에서 제거
        db.query(`DELETE FROM users WHERE user_id=?`, [userId], (err, result) => {
            if (err) {
                // 실패시 "false" 응답
                response.success = false;
                response.msg = err;
            } else {
                // 성공시 True 응답
                response.success = true;
            }

            // 데이터 응답
            Http.printResponse(response);
            res.json(response);
        });
    } else {
        // 클라이언트가 전송한 데이터가 없다면 false 반환
        response.success = false;
        response.msg = "The userId of the server is empty.";

        // 데이터 응답
        Http.printResponse(response);
        res.json(response);
    }
});

// 모듈 내보내기
module.exports = router;
