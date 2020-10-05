/* routes/admin/user/main.js */

// 라우팅을 위한 기본 모듈 포함
const express = require('express'),
    router = express.Router(),
    db = require('../../../database/db.js');

// 외부 클래스 포함
const String = require('../../../class/String.js'),
    Http = require('../../../class/Http.js');

// 유저 메인 페이지 렌더링
router.get('/', (req, res) => {
    res.render('admin/user/main');
});

// 유저 목록 요청 밎 응답
router.post('/read', (req, res) => {
    // 클라이언트의 요청 데이터를 터미널에 출력
    console.log('클라이언트 조회 요청 경로 : /admin/user/read \n요청 데이터 없음');

    // 응답 객체 선언
    const response = {}

    db.query(`SELECT user_id, user_name, user_email, date_format(user_in_date, '%Y년 %m월 %d일 %H시 %i분 %s초') AS date FROM users`, (err, results) => {
        if (err) {
            // 유저 등록이 실패하면 false 응답
            response.success = false;
            response.msg = err;
        } else {
            // 성공시 유저 정보를 Object로 선언
            response.success = true;
            response.users = [];
            
            // DB에서 받아온 데이터 전체 삽입
            let user = {};
            for (let result of results) {
                // DB 데이터를 Object로 초기화
                user = {
                    id: result.user_id,
                    name: result.user_name,
                    email: result.user_email,
                    inDate: result.date,
                }

                // 유저별 데이터를 Array에 삽입
                response.users.push(user);
            }
        }

        // 데이터 응답
        Http.printResponse(response);
        res.json(response);
    });
});

// 자판기 검색 목록 요청 밎 응답
router.post('/search', (req, res) => {
    const search = req.body;
    // 클라이언트의 요청 데이터를 터미널에 출력
    console.log('클라이언트 검색 요청 경로 : /admin/user/search \n요청 데이터 : ');
    console.log(req.body);

    // 응답 객체 선언
    const response = {}

    // 검색 쿼리 만들기
    const query = (search.type == 'whole') ? 
        `WHERE user_id LIKE '%${search.text}%' OR user_name LIKE '%${search.text}%' OR 
        user_email LIKE '%${search.text}%'` :
        `WHERE ${search.type} LIKE '%${search.text}%'`;
    
    // 클라이언트가 요청한 데이터가 있는지 검사
    if (!String.isEmpty(req.body)) {
        db.query(`SELECT user_id, user_name, user_email, date_format(user_in_date, '%Y년 %m월 %d일 %H시 %i분 %s초') AS date 
        FROM users ${query}`, (err, results) => {
            if (err) {
                // 자판기 등록이 실패하면 false 응답
                response.success = false;
                response.msg = err;
            } else {
                // 성공시 자판기 정보를 Object로 선언
                response.success = true;
                response.users = [];
                
                // DB에서 받아온 데이터 전체 삽입
                let user = {};
                for (let result of results) {
                    // DB 데이터를 Object로 초기화
                    user = {
                        id: result.user_id,
                        name: result.user_name,
                        email: result.user_email,
                        inDate: result.date,
                    }

                    // 자판기별 데이터를 Array에 삽입
                    response.users.push(user);
                }
            }

            // 데이터 응답
            Http.printResponse(response);
            res.json(response);
        });
    } else {
        // 클라이언트가 전송한 데이터가 없다면 false 반환
        response.success = false;
        response.msg = "The search datas of the server is empty.";

        // 데이터 응답
        Http.printResponse(response);
        res.json(response);
    }
});

// 유저 상세 페이지 렌더링
router.get('/:userId', (req, res) => {
    res.render('admin/user/detail', { userId : req.params.userId });
});

// 유저 상세 페이지 정보 응답 API
router.post('/:userId', (req, res) => {
    const userId = req.params.userId;

    // 클라이언트의 요청 데이터를 터미널에 출력
    console.log('클라이언트 조회 요청 경로 : /admin/user/:userId \n요청 데이터 : ');
    console.log(userId)

    // 응답 객체 선언
    const response = {}

    db.query(`SELECT user_id, user_name, user_email,
    date_format(user_in_date, '%Y년 %m월 %d일 %H시 %i분 %s초') AS in_date
    FROM users WHERE user_id=?`, [userId], (err, result) => {
        if (err) {
            // 유저 등록이 실패하면 false 응답
            response.success = false;
            response.msg = err;
        } else {
            // 성공시 유저 정보를 Object로 선언
            response.success = true;
            response.user = {
                userId : userId,
                name : result[0].user_name,
                email : result[0].user_email,
                inDate : result[0].in_date,
            };
        }

        // 데이터 응답
        Http.printResponse(response);
        res.json(response);
    });
});

// 유저 상세 수정화면 렌더링
router.get('/:userId/update', (req, res) => {
    const userId = req.params.userId;

    // 클라이언트의 요청 데이터를 터미널에 출력
    console.log('클라이언트 조회 요청 경로 : /admin/user/:userId/update \n요청 데이터 : ');
    console.log(userId)

    db.query(`SELECT * FROM users WHERE user_id=?`, [userId], (err, user) => {
        if (err) {
            // 실패시 false 응답
            response.success = false;
            response.msg = err;
        } else {
            // 성공시 true 응답
            response = user[0];
        }

        // 데이터 응답
        Http.printResponse(response);
        res.render('admin/user/update', response);
    });
});

// 유저 상세 수정 API
router.put('/:userId/update', (req, res) => {
    const userId = req.params.userId,
        user = req.body.user;

    // 클라이언트의 요청 데이터를 터미널에 출력
    console.log('클라이언트 수정 요청 경로 : /admin/user/:userId/update \n요청 데이터 : ');
    console.log(req.body)

    // 응답 객체 선언
    const response = {}

    // 클라이언트가 요청한 데이터가 있는지 검사
    if (!String.isEmpty(user)) {
        // 클라이언트가 전송한 "user" 이 있다면, 유저 정보 수정
        db.query(`UPDATE users SET user_id=?, user_name=?, user_email=? WHERE user_id=?;`,
            [user.id, user.name, user.email, userId], (err, result) => {
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
            });
    } else {
        // 클라이언트가 전송한 데이터가 없다면 false 반환
        response.success = false;
        response.msg = "The user of the server is empty.";

        // 데이터 응답
        Http.printResponse(response);
        res.json(response);
    }
});

// 유저 삭제 API
router.delete('/:userId', (req, res) => {
    const userId = req.params.userId;

    // 클라이언트의 요청 데이터를 터미널에 출력
    console.log('클라이언트 삭제 요청 경로 : /admin/user/:userId \n요청 데이터 : ');
    console.log(userId)

    // 응답 객체 선언
    const response = {}

    db.query(`DELETE FROM users WHERE user_id=?;`, [userId], (err, result) => {
        if (err) {
            // 유저 등록이 실패하면 false 응답
            response.success = false;
            response.msg = err;
        } else {
            // 성공시 true 응답
            response.success = true;
        }

        // 데이터 응답
        Http.printResponse(response);
        res.json(response);
    });
});

// 모듈 내보내기
module.exports = router;