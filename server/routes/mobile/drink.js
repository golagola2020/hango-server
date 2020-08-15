/* routes/mobile.js */

const { json } = require('body-parser');

// 라우팅을 위한 기본 모듈 포함
const express = require('express'),
    app = express(),
    router = express.Router(),
    db = require('./../../database/db.js');

// 외부 클래스 포함
const String = require('./../../class/String.js');

// 자판기 상세 혹은 음료수 조회화면 로딩시 요청 경로 => 자판기 정보 응답
router.post('/read', (req, res) => {
    // 클라이언트가 요청한 데이터 저장
    const serialNumber = req.body.serialNumber;
    console.log('클라이언트 요청 데이터 : ');
    console.log(req.body);

    // 클라이언트가 요청한 데이터가 있는지 검사
    if (!String.isEmpty(serialNumber)) {
        // 성공시 자판기 정보를 Object로 선언
        const response = {
            success: true,
            drinks: [],
        };
        // 음료 정보 조회
        db.query(`SELECT drink_position, drink_name, drink_price, exist_flag, drink_count FROM drinks WHERE serial_number = ?;`,
            [serialNumber], (err, results) => {
                // 실패시 "False" 응답
                if (err) {
                    console.log(err);
                    res.json({
                        success: false,
                        msg: err
                    });
                }

                // DB를 조회 결과 값이 없을 경우
                if (String.isEmpty(results)) {
                    res.json({
                        success: false,
                        msg: "Drinks isn't exist in the vending machine right now."
                    });
                    
                }

                //  음료 정보 삽입
                let drink = {};
                for (let result of results) {
                    // DB 데이터를 Object로 초기화
                    drink = {
                        position: result.drink_position,
                        name: result.drink_name,
                        price: result.drink_price,
                        isExist: result.exist_flag,
                        count: result.drink_count
                    }
                    // 자판기별 데이터를 Array에 삽입
                    response.drinks.push(drink);
                }

                // 서버 응답 데이터 출력
                console.log('서버 응답 데이터 : ');
                console.log(response);
                // 자판기 정보를 JSON 형태로 응답
                if (!String.isEmpty(response.drinks)) {
                    res.json(response);
                }
            });
    } else {
        // 클라이언트가 전송한 데이터가 없다면 false 반환
        res.json({
            success: false,
            msg: "The serial number of the server is empty."
        });
    }
});

// 음료 등록
router.post('/create', (req, res) => {
    // 클라이언트가 요청한 데이터 저장
    const serialNumber = req.body.serialNumber,
        drink = {
            position: req.body.drink.position,
            name: req.body.drink.name,
            price: req.body.drink.price
        };

    // 클라이언트가 요청한 데이터가 있는지 검사
    if (!String.isEmpty(serialNumber)) {
        // 클라이언트가 전송한 "serialNumber" 가 있다면, DB 등록
        db.query(`INSERT INTO drinks(serialNumber, drink_position, drink_name, drink_price) VALUES(?, ?, ?, ?)`,
            [serialNumber, drink.position, drink.name, drink.price], (err, result) => {
                // 실패시 false 응답
                if (err) {
                    console.log(err);
                    res.json({
                        success: false,
                        msg: err
                    });
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
            msg: "The drink data of the server is empty."
        });
    }

});

// 음료 수정
router.post('/update', (req, res) => {
    // 클라이언트가 요청한 데이터 저장
    const serialNumber = req.body.serialNumber,
        drink = {
            position: req.body.drink.position,
            name: req.body.drink.name,
            price: req.body.drink.price
        };

    // 클라이언트가 요청한 데이터가 있는지 검사
    if (!String.isEmpty(serialNumber)) {
        // 클라이언트가 전송한 "serialNumber" 가 있다면, 음료 정보 수정
        db.query(`UPDATE drinks SET drink_name=?, drink_price=? WHERE serial_number=? AND drink_position=?;`,
            [drink.name, drink.price, serialNumber, drink.position], (err, result) => {
                // 실패시 false 응답
                if (err) {
                    console.log(err);
                    res.json({
                        success: false,
                        msg: err
                    });
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
            msg: "The drink data of the server is empty."
        });
    }
});

// 모듈 내보내기
module.exports = router;