// class/Http.js

// Http 클래스 정의
class Http {

    // 서버 응답 데이터 출력
    static printResponse(res) { 
        console.log('서버 응답 데이터 : ');
        console.log(res)
    }
}

// 외부로 반환
module.exports = Http;