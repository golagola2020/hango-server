/* routes/mobile.js */

const { json } = require('body-parser');

// 라우팅을 위한 기본 모듈 포함
const express = require('express'),
  router = express.Router(),
  db = require('../database/db.js');

// 외부 클래스 포함
const String = require('../class/String.js');

// 로그인 요청 및 응답
router.post('/login', (req, res) => {
    // 모바일 요청 데이터
    const user = {
        id : req.body.userId,
        passwd : req.body.userPasswd
    };
    
    // DB 검사 => 요청 아이디와 패스워드가 일치하는 데이터를 찾아 검사한다.
    db.query(`SELECT * FROM users WHERE user_id LIKE ?`, [user.id], (err, userDB) => {
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
    db.query(`INSERT INTO users(user_id, user_name, user_passwd) VALUES(?, ?, ?)`, [user.id, user.name, user.passwd], (err, result) => {
        // 실패시 "false" 응답
        if (err) {
            console.log(err);
            res.json( { success : false } );
        }
        // 성공시 True 응답
        res.json( { success : true } );
    });
});

// 모바일 메인화면 로딩시 요청 경로 => 자판기 정보 응답
router.post('/vending/read', (req, res) => {
    // 클라이언트가 요청한 데이터 저장
    const userId = req.body.userId;

    // 클라이언트가 요청한 데이터가 있는지 검사
    if (!String.isEmpty(userId)) {
        // 클라이언트가 전송한 "userId" 가 있다면, 유저 아이디에 따른 자판기 정보 검색 후 응답
        db.query(`SELECT user_id, serial_number, vending_name, vending_description, vending_full_size 
            FROM vendings WHERE user_id = ?;`, 
            [userId], (err, results) => {
                // 실패시 "False" 응답
                if (err) {
                    console.log(err);
                    res.json({
                        success : false,
                        msg : err
                    });
                }

                // 성공시 자판기 정보를 Object로 선언
                const response = {
                success : true,
                vendings : []
                };
                
                // DB에서 받아온 데이터 전체 삽입
                let rest = {};
                for (let result of results) {
                    // DB 데이터를 Object로 초기화
                    rest = {
                        userId : result.user_id,
                        serialNumber : result.serial_number,
                        name : result.user_id,
                        description : result.vending_name,
                        fullSize : result.vending_full_size,
                    }

                    // 자판기별 데이터를 Array에 삽입
                    response.vendings.push(rest);
                }

                // 자판기 정보를 JSON 형태로 응답
                res.json(response);
        });
    } else {
        // 클라이언트가 전송한 데이터가 없다면 false 반환
        res.json({
            success : false,
            msg : "The userId of the server is empty."
        });
    }
});

// 자판기 수정 요청
router.post('/vending/update', (req, res) => {
    const vending = req.body.vending;
    
    db.query(`UPDATE vendings SET vending_name=?, vending_description=?, vending_full_size=? WHERE serial_number=?;`, 
        [vending.name, vending.description, vending.fullSize, vending.serialNumber], (err, result) => {
            // 실패시 false 응답
            if (err) {
                console.log(err);
                res.json({ success : false });
            }

            // 성공시 true 응답
            res.json({ success : true });
    });
});

// 자판기 삭제 요청
router.post('/vending/delete', (req, res) => {
    const serialNumber = req.body.serialNumber;

    db.query(`DELETE FROM vendings WHERE serial_number=?;`, [serialNumber], (err, result) => {
        // 실패시 false 응답
        if (err) {
            console.log(err);
            res.json({ success : false });
        }

        // 성공시 true 응답
        res.json({ success : true });
    })
});

// 모듈 내보내기
module.exports = router;
