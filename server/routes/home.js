/* routes/home.js */

// 라우팅을 위한 기본 모듈 포함
const express = require('express'),
  router = express.Router(),
  db = require('../database/db.js');

// '/' 루트 경로 요청시 main 뷰 렌더링
router.get('/', (req, res) => {
  res.render('home/main');
});

// rasp 테스트 경로
router.post('/rasp', (req, res) => {
  // 클라이언트가 전송한 url의 파라미터를 파싱하여 데이터를 처리하는 부분
  const receivedData = req.body;

  // 클라이언트의 요청 데이터를 터미널에 출력
  console.log('클라이언트 요청 데이터 : ');
  console.log(receivedData);
  console.log(`고유번호 : ${receivedData.serialNumber}`);

  // 테스트 데이터 생성
  results = [{
    serial_number : "2029230284058230",
    drink_position :  1,
    drink_name : "썬키스트 자몽"
  }, {
    serial_number : "2029230284058230",
    drink_position :  2,
    drink_name : "썬키스트 사과"
  }, {
    serial_number : "2029230284058230",
    drink_position :  3,
    drink_name : "코코팜 피치"
  }, {
    serial_number : "2029230284058230",
    drink_position :  4,
    drink_name : "레쓰비"
  }, {
    serial_number : "2029230284058230",
    drink_position :  5,
    drink_name : "비락식혜"
  }, {
    serial_number : "2029230284058230",
    drink_position :  6,
    drink_name : "초록 매실"
  }, {
    serial_number : "2029230284058230",
    drink_position :  7,
    drink_name : "오란씨 파인애플"
  }, {
    serial_number : "2029230284058230",
    drink_position :  8,
    drink_name : "환타 포도"
  }, {
    serial_number : "2029230284058230",
    drink_position :  9,
    drink_name : "코카콜라"
  }, {
    serial_number : "2029230284058230",
    drink_position :  10,
    drink_name : "칠성 사이다"
  }, ];
  
  // 전송 데이터 구조 생성
  const response = {
    success : true,
    drinks : []
  };
  
  // DB에서 불러온 음료 정보들을 reponse Object에 담아 JSON 형태로 응답
  let drink = [];
  for (let result of results) {
    // 음료 이름을 16진수 문자열로 변경
    let drinkName = result.drink_name;
    hexas = Buffer.from(drinkName, 'utf8').toString('hex').toUpperCase();
  
    // 16진수 문자열을 2개씩 끊어 헥사값으로 변환
    convertedName = []
    for (let i = 0; i < hexas.length; i += 2) {
      hexa = '0x' + hexas.substr(i, 2);
      convertedName.push(hexa);
    }
    
    // 음료 정보 초기화
    drink = {
      serialNumber : result.serial_number,
      drinkPosition : result.drink_position,
      drinkName : convertedName.toString()
    }
  
    // 음료 정보 삽입
    response.drinks.push(drink);
  }
  
  // 클라이언트에게 응답하는 데이터를 터미널에 출력
  console.log(response);
  // 클라이언트에게 응답
  res.json(response);
});

// 모듈 내보내기
module.exports = router;
