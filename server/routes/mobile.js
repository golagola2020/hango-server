/* routes/mobile.js */

// 라우팅을 위한 기본 모듈 포함
const express = require('express'),
  router = express.Router(),
  db = require('../database/db.js');

// 로그인 요청 및 응답
router.post('/login', (req, res) => {
    // 모바일 요청 데이터
    const user = {
        id : req.body.userId,
        passwd : req.body.userPasswd
    };
    
    // DB 검사 => 요청 아이디와 패스워드가 일치하는 데이터를 찾아 검사한다.
    db.query(`SELECT * FROM users WHERE id LIKE ?`, [user.id], (err, userDB) => {
        // 에러시 실행
        if (err) {
            console.log(err);
            res.json( { success : false } );
        }
        
        // 아이디와 패스워드 비교
        if (userDB != false && userDB[0].user_id == user.id && userDB[0].user_passwd == user.passwd)
            // 아이디 패스워드 일치시 True 응답
            res.json( { success : true } );
        else 
            // 일치하지 않으면 False 응답
            res.json( { success : false } );

    });
});

// 회원가입 요청 및 응답
router.post('/signup', (req, res) => {
    // 모바일 요청 데이터
    const user = {
            name : req.body.userName,
            id : req.body.userId,
            passwd : req.body.userPasswd
        };

    // DB 등록
    db.query(`INSERT INTO users(user_name, user_id, user_passwd, in_date) VALUES('${user.name}', '${user.id}', '${user.passwd}', NOW())`, (err, result) => {
        if (err) {
            console.log(err);
            res.json( { success : false } );
        }
        // 성공시 True 응답
        res.json( {success : true} );
    });
});

// 모듈 내보내기
module.exports = router;
