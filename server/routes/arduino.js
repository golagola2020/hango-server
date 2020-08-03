/* routes/arduino.js */

// 라우팅을 위한 기본 모듈 포함
const express = require('express'),
  router = express.Router(),
  db = require('../database/db.js');

// 아두이노에서 데이터 요청시 JSON API 응답
router.post('/', (req, res) => {
  // 클라이언트에게 전달할 데이터
  const data = {
    sensor : 'gps',
    time : 132352342451,
    data : [
      1.5352515,
      4642.5352
    ],
    distance : 2.5
  }; 

  // 클라이언트가 전송한 url의 파라미터를 파싱하여 데이터를 처리하는 부분
  const receivedData = req.body;
  console.log(`관리자 : ${receivedData.userId}`);
  console.log(`고유번호 : ${receivedData.serialNumber}`);

  // json으로 응답
  res.json(data);
});

// 모듈 내보내기
module.exports = router;
