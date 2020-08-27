/* routes/mobile.js */

const { json } = require('body-parser');

// 라우팅을 위한 기본 모듈 포함
const express = require('express'),
    app = express(),
    router = express.Router(),
    db = require('./../../database/db.js');

// 외부 클래스 포함
const String = require('./../../class/String.js');

// 모바일 메인화면 로딩시 요청 경로 => 자판기 정보 응답
router.post('/read', (req, res) => {
    // 클라이언트가 요청한 데이터 저장
    const userId = req.body.userId;

    // 클라이언트의 요청 데이터를 터미널에 출력
    console.log('클라이언트 요청 경로 : /mobile/vending/read \n데이터 : ');
    console.log(req.body);

    // 클라이언트가 요청한 데이터가 있는지 검사
    if (!String.isEmpty(userId)) {
        // 클라이언트가 전송한 "userId" 가 있다면, 유저 아이디에 따른 자판기 정보 검색 후 응답
        db.query(`SELECT u.user_id, u.user_name, v.serial_number, v.vending_name, v.vending_description, v.vending_full_size 
            FROM users AS u
            JOIN vendings AS v
            ON u.user_id = v.user_id
            WHERE u.user_id = 'rltn123';`,
            [userId], (err, results) => {
                // 실패시 "False" 응답
                if (err) {
                    console.log(err);
                    res.json({
                        success: false,
                        msg: err
                    });
                    return;
                }

                // 성공시 자판기 정보를 Object로 선언
                const response = {
                    success : true,
                    userName : results[0].user_name,
                    vendings : []
                };

                // DB에서 받아온 데이터 전체 삽입
                let vending = {};
                for (let result of results) {
                    // DB 데이터를 Object로 초기화
                    vending = {
                        serialNumber: result.serial_number,
                        name: result.vending_name,
                        description: result.vending_description,
                        fullSize: result.vending_full_size,
                    }

                    // 자판기별 데이터를 Array에 삽입
                    response.vendings.push(vending);
                }

                // 서버 응답 데이터 출력
                console.log('서버 응답 데이터 : ');
                console.log(response);

                // 자판기 정보 존재 여부 검사
                if (!String.isEmpty(response.vendings)) {
                    // 자판기 정보를 JSON 형태로 응답
                    res.json(response);
                } else {
                    res.json({
                        success: false,
                        msg: "Vending machine of the userId isn't exist right now."
                    });
                }
            });
    } else {
        // 클라이언트가 전송한 데이터가 없다면 false 반환
        res.json({
            success: false,
            msg: "The userId of the server is empty."
        });
    }
});

// 자판기 수정 요청
router.post('/update', (req, res) => {
    // 클라이언트가 요청한 데이터 저장
    const serialNumber = req.body.serialNumber,
        vending = req.body.vending;
    
    // 클라이언트의 요청 데이터를 터미널에 출력
    console.log('클라이언트 요청 경로 : /mobile/vending/update \n데이터 : ');
    console.log(req.body);

    // 클라이언트가 요청한 데이터가 있는지 검사
    if (!String.isEmpty(vending)) {
        // 클라이언트가 전송한 "vending" 이 있다면, 자판기 정보 수정
        db.query(`UPDATE vendings SET vending_name=?, vending_description=?, vending_full_size=? WHERE serial_number=?;`,
            [vending.name, vending.description, vending.fullSize, serialNumber], (err, result) => {
                // 실패시 false 응답
                if (err) {
                    console.log(err);
                    res.json({
                        success: false,
                        msg: err
                    });
                    return;
                }

                // 성공시 true 응답
                res.json({
                    success: true
                });
            });
    } else {
        // 클라이언트가 전송한 데이터가 없다면 false 반환
        res.json({
            success: false,
            msg: "The vending of the server is empty."
        });
    }
});

// 자판기 삭제 요청
router.post('/delete', (req, res) => {
    // 클라이언트가 요청한 데이터 저장
    const serialNumber = req.body.serialNumber;

    // 클라이언트의 요청 데이터를 터미널에 출력
    console.log('클라이언트 요청 경로 : /mobile/vending/delete \n데이터 : ');
    console.log(req.body);

    // 클라이언트가 요청한 데이터가 있는지 검사
    if (!String.isEmpty(serialNumber)) {
        // 클라이언트가 전송한 "serialNumber" 가 있다면, 자판기 정보 수정
        db.query(`DELETE FROM vendings WHERE serial_number=?;`, [serialNumber], (err, result) => {
            // 실패시 false 응답
            if (err) {
                console.log(err);
                res.json({
                    success: false,
                    msg: err
                });
                return;
            }

            // 성공시 true 응답
            res.json({
                success: true
            });
        });
    } else {
        // 클라이언트가 전송한 데이터가 없다면 false 반환
        res.json({
            success: false,
            msg: "The serial number of the server is empty."
        });
    }
});

// 모듈 내보내기
module.exports = router;