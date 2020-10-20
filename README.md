# hango-server (행고 웹서버)
> 주의 : [GitHub Pages](https://pages.github.com/)에 대해서 충분히 숙지할 것.  
주의 : [Collaborating with issues and pull requests](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests)을 정독할 것

## 안내
#### 하드웨어
   1. [아두이노 시작하기](https://github.com/golagola2020/hango-arduino)를 통해 사물을 감지하고, 라즈베리파이로 감지 데이터를 송신할 수 있습니다.
   2. [라즈베리파이 시작하기](https://github.com/golagola2020/hango-raspberry-pi)를 통해 아두이노의 감지 데이터를 수신하고, 데이터를 가공하여 스피커로 출력할 수 있습니다.
   
#### 모바일
   1. [안드로이드 시작하기](https://github.com/golagola2020/hango-mobile)를 통해 hango 자판기를 관리하고, 음료 잔량을 파악하는 등의 데이터를 제공받을 수 있습니다.
   
#### 웹서버
   1. [웹서버 시작하기](https://github.com/golagola2020/hango-server)를 통해 hango-server와 hango-mysql을 구축하고, API 서버를 통해 클라이언트에게 데이터를 제공하며, 고객 관리 시스템을 이용할 수 있습니다.

## 시작하기에 앞서
[hango-server](https://github.com/golagola2020/hango-server) 프로젝트를 실행시키기 위한 도구 및 프로그램 설치  
> 도커로 개발환경을 구축하실 분은 [도커로 한 방에 끝내기](https://github.com/golagola2020/hango-server#도커로-한-방에-끝내기)를 참고해주세요.
   1. [Node](https://nodejs.org/ko/download/) 설치
   2. [MySQL](https://dev.mysql.com/downloads/installer/) 설치

## 설치(로컬)
* https://github.com/golagola2020/hango-server 에 push 권한이 있다면 :  
   * git fetch or pull or clone
   ```
   $ git clone https://github.com/golagola2020/hango-server.git
   $ cd hango-server
   ```

* https://github.com/golagola2020/hango-server 에 push 권한이 없다면 :  
   1. https://github.com/golagola2020/hango-server 에서 ```Fork```버튼 클릭하고,
   2. 포크 저장소 계정(maybe 개인 계정) 선택
   3. git fetch or pull or clone
   ```
   # 포크한 저장소 clone
   $ git clone https://github.com:YOUR_GITHUB_ACCOUNT/hango-server.git
   $ cd hango-server
   
   # hango-server 레포지터리를 upstream으로 리모트 설정
   $ git remote add upstream https://github.com/golagola2020/hango-server.git
   
   # 로컬 코드와 hango-server 동기화
   $ git fetch upstream
   $ git checkout master
   $ git merge upstream/master
   ```

## 실행(로컬)
> 주의 : 먼저, [설치](https://github.com/golagola2020/hango-server#설치로컬)를 통해 hango-server를 설치해주십시오.   
> 도커로 개발환경을 구축하실 분은 [도커로 한 방에 끝내기](https://github.com/golagola2020/hango-server#도커로-한-방에-끝내기)를 참고해주십시오.   
> DB 초기 데이터셋은 [init.sql](https://github.com/golagola2020/hango-server/blob/master/db/init.sql)을 참고해주십시오.

   1. 패키지 설치
   ```
   $ npm install
   ```
   2. '.env' 파일 생성
   ```
   $ touch .env
   $ vi .env
   ```
   3. '.env' 파일에 환경 변수 등록.
      * [여기](https://myaccount.google.com/lesssecureapps)에서 구글 이메일 계정의 액세스를 허용시켜주어야 합니다.    
      * 해당 Gmail로 Hango 관리자 회원가입 승인 요청이 전달됩니다.
   ```
   # 데이터베이스 환경변수
   DB_HOST=데이터베이스_호스트명
   DB_USER=데이터베이스_유저명
   DB_PASSWORD=데이터베이스_비밀번호
   DB_NAME=데이터베이스_이름
   
   # 고객관리시스템 회원가입시 승인요청 받을 구글 계정 환경변수
   HANGO_MANAGER_EMAIL=시스템_관리자_구글_이메일      
   HANGO_MANAGER_PASSWORD=시스템_관리자_구글_이메일_비밀번호
   ```
   4. 실행
   ```
   $ sudo node server.js
   ```
   
### 도커로 한 방에 끝내기
> 주의 : 아래 명령은 hango-server의 Dockerfile이 있는 루트 경로에서 실행되어야 합니다.

* 개인이 구축한 MySQL 서버가 있다면
   1. [dnfla960/hango-server:latest](https://hub.docker.com/repository/docker/dnfla960/hango-server) 도커 이미지 PULL
   ```
   $ docker pull dnfla960/hango-server:latest
   ```
   2. 도커 컨테이너 실행
      * [여기](https://myaccount.google.com/lesssecureapps)에서 구글 이메일 계정의 액세스를 허용시켜주어야 합니다.    
      * 해당 Gmail로 Hango 관리자 회원가입 승인 요청이 전달됩니다.
   ```
   $ docker run -p 9700:9700 -d \
   -e DB_HOST=데이터베이스_호스트명 \
   -e DB_USER=데이터베이스_유저명 \
   -e DB_PASSWORD=데이터베이스_비밀번호 \
   -e DB_NAME=데이터베이스_이름 \
   -e HANGO_MANAGER_EMAIL=시스템_관리자_구글_이메일 \
   -e HANGO_MANAGER_PASSWORD=시스템_관리자_구글_이메일_비밀번호 \
   dnfla960/hango-server:latest
   ```
   3. 실행중인 컨테이너의 로그 확인 -> 서버 출력 확인 ( -f 옵션은 로그를 지속적으로 확인하기 위함 )
   ```
   $ docker logs 컨테이너-아이디 -f
   ```

* MySQL까지 한 번에 구축하기
   * 도커 컴포즈 실행
      * 현 로컬 저장소의 코드를 서버로하고, MySQL은 5.7버전으로 자동 설치되며 초기 데이터 셋도 자동으로 구축됩니다.
   ```
   $ docker-compose up
   ```
   * hango-mysql에 접속하는 법
      * 도커 컴포즈가 실행된 상태여야 합니다.
   ```
   $ docker exec -it hango-mysql bash
   
   > mysql -u root -p
   > password
   
   mysql > "접속 완료"
   ```
   
   * docker-compose.yml 파일 수정하기
      * [여기](https://myaccount.google.com/lesssecureapps)에서 구글 이메일 계정의 액세스를 허용시켜주어야 합니다.    
      * 해당 Gmail로 Hango 관리자 회원가입 승인 요청이 전달됩니다.
   ```
   HANGO_MANAGER_EMAIL=시스템_관리자_구글_이메일
   HANGO_MANAGER_PASSWORD=시스템_관리자_구글_이메일_비밀번호
   ```

#### 동작 확인
> http://localhost:9700 접속 후 아래 화면처럼 출력되면 잘 동작하는 것임.    
> 관리자 시스템 링크 : http://localhost:9700/admin 
<img width="876" alt="스크린샷 2020-08-30 오후 11 22 54" src="https://user-images.githubusercontent.com/56839474/91661551-c596f000-eb17-11ea-9c87-d35a2d107142.png">

## 배포(발행)

* https://github.com/golagola2020/hango-server 에 push 권한이 있다면 :  
```
$ git checkout -b 'features to develop'
$ git commit -m '[features to develop] message...'
$ git push origin 'features to develop'
```

* https://github.com/golagola2020/hango-server 에 push 권한이 없다면 :  
   1. 포크 동기화 [Syncing a fork](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/syncing-a-fork)
   2. Pull Request 보내기 [Creating a pull request](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request)

## 의존성

```json
"dependencies": {
    "body-parser": "^1.19.0",
    "connect-flash": "^0.1.1",
    "dotenv": "^8.2.0",
    "ejs": "^3.1.5",
    "express": "^4.17.1",
    "express-mysql-session": "^2.1.4",
    "express-session": "^1.17.1",
    "mysql": "^2.18.1",
    "nodemailer": "^6.4.14",
    "passport": "^0.4.1",
    "passport-local": "^1.0.0",
    "serve-favicon": "^2.5.0"
 }
 
 "devDependencies": {
    "nodemon": "^1.11.0",
    "babel-eslint": "^10.1.0",
    "eslint": "^7.10.0",
    "eslint-config-prettier": "^6.12.0",
    "eslint-plugin-import": "^2.22.1",
    "eslint-plugin-prettier": "^3.1.4",
    "husky": "^4.3.0",
    "lint-staged": "^10.4.0",
    "prettier": "2.1.2"
 }
```

## 기여하기
[CONTRIBUTING.md](https://github.com/golagola2020/hango-server/blob/master/CONTRIBUTING.md) 를 읽으신 후 기여를 해주십시오.     
자세한 Pull Request 절차와 행동 규칙을 확인하실 수 있습니다.

## 개발자

  - **박우림** [woorim960](https://github.com/woorim960)


[기여자 목록](https://github.com/golagola2020/hango-server/graphs/contributors)을 확인하여 이 프로젝트에 참가하신 분들을 보실 수 있습니다.

## 라이센스

이 프로젝트는 Apache 2.0을 사용합니다 - [LICENSE](https://github.com/golagola2020/hango-server/blob/master/LICENSE) 파일에서 자세히 알아보세요.


