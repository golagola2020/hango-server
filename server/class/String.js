// class/String.js

// String 클래스 정의
class String {

    // 빈 문자열 검사 함수
    static isEmpty(value) { 
        if ( value == "" || value == null || value == undefined || ( value != null && typeof value == "object" && !Object.keys(value).length ) ) { 
            return true;
        } else { 
            return false;
        } 
    }

}

// 외부로 반환
module.exports = String;