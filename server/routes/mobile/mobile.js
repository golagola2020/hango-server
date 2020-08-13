/* routes/mobile.js */

const { json } = require('body-parser');

// 라우팅을 위한 기본 모듈 포함
const express = require('express'),
    router = express.Router(),
    db = require('./../../database/db.js');

// 외부 클래스 포함
const String = require('./../../class/String.js');

// 로그인 요청 및 응답
router.post('/login', (req, res) => {
    // 클라이언트가 요청한 데이터 저장
    const user = {
        id : req.body.userId,
        passwd : req.body.userPasswd
    };
    
    // 클라이언트가 요청한 데이터가 있는지 검사
    if (!String.isEmpty(user.id)) {
        // 클라이언트가 전송한 "userId" 가 있다면, DB 검사 => 요청 아이디와 패스워드가 일치하는 데이터를 찾아 검사한다.
        db.query(`SELECT * FROM users WHERE user_id LIKE ?`, [user.id], (err, userDB) => {
            // 실패시 "false" 응답
            if (err) {
                console.log(err);
                res.json({ 
                    success : false,
                    msg : err
                });
            }
            
            // DB에 해당하는 아이디가 없을 경우 실행
            if (String.isEmpty(userDB)) {
                res.json({ 
                    success : false,
                    msg : "The ID does not exist."
                });
            }

            // 아이디와 패스워드 비교
            if (userDB != false && userDB[0].user_id == user.id && userDB[0].user_passwd == user.passwd)
                // 아이디 패스워드 일치시 True 응답
                res.json({ success : true });
            else {
                // 일치하지 않으면 False 응답
                res.json({ 
                    success : false,
                    msg : "The ID and Password do not Match."
                });
            }

        });
    } else {
        // 클라이언트가 전송한 데이터가 없다면 false 반환
        res.json({
            success : false,
            msg : "The user datas of the server is empty."
        });
    }
});

// 회원가입 요청 및 응답
router.post('/signup', (req, res) => {
    // 클라이언트가 요청한 데이터 저장
    const user = {
            name : req.body.userName,
            id : req.body.userId,
            passwd : req.body.userPasswd
        };

    // 클라이언트가 요청한 데이터가 있는지 검사
    if (!String.isEmpty(user.id)) {
        // 클라이언트가 전송한 "userId" 가 있다면, DB 등록
        db.query(`INSERT INTO users(user_id, user_name, user_passwd) VALUES(?, ?, ?)`, [user.id, user.name, user.passwd], (err, result) => {
            // 실패시 "false" 응답
            if (err) {
                console.log(err);
                res.json({ 
                    success : false,
                    msg : err
                });
            }
            // 성공시 True 응답
            res.json({ success : true });
        });
    } else {
        // 클라이언트가 전송한 데이터가 없다면 false 반환
        res.json({
            success : false,
            msg : "The user datas of the server is empty."
        });
    }
});

// 모듈 내보내기
module.exports = router;