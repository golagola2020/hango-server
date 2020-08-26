# hango-server (행고 웹서버)
> 주의 : [GitHub Pages](https://pages.github.com/)에 대해서 충분히 숙지할 것.  
주의 : [Collaborating with issues and pull requests](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests)을 정독할 것

## 시작하기

이 지침을 따르시면 로컬 컴퓨터에서 개발과 테스트를 위한 프로젝트 사본을 실행시킬 수 있습니다. 배포 항목을 확인하여 실제 시스템에 프로젝트를 배포하는 방법을 알아보세요.

## 시작하기에 앞서

[hango-server](https://github.com/golagola2020/hango-server) 프로젝트를 실행시키기 위한 도구 및 프로그램을 설치해주세요.  
   1. [Node](https://nodejs.org/ko/download/) 설치
   2. [MySQL](https://dev.mysql.com/downloads/installer/) 설치

### 설치
https://github.com/golagola2020/hango-server 에 push 권한이 있다면 :  
   1. git fetch or pull or clone
   2. 패키지 설치
   3. '.env' 파일 생성 후 DB 환경 변수 등록
```
# git clone
$ git clone https://github.com/golagola2020/hango-server.git
$ cd hango-server

# 패키지 설치
$ npm install

# '.env' 파일 생성 후 DB 환경 변수 등록
$ touch .env
$ vi .env
```
이어서 '.env' 파일에 DB 환경 변수를 등록해주세요.
```
# ENV
DB_DOMAIN="Your DB Host Domain"
DB_USER="Your DB User Name"
DB_PASSWORD="Your DB User Password"
DB_NAME="Your DB Name"
```

마무리로 시스템에서 데이터를 추출하는 방법이나 데모를 실행하는 방법을 설명해 주세요.

## 배포

추가로 실제 시스템에 배포하는 방법을 노트해 두세요.

## 사용된 도구

* [Node.js](https://nodejs.org/ko/about/) - 서버 프레임워크
* [Express.js](https://expressjs.com/ko/) - 웹 프레임워크
* [AWS EC2](https://aws.amazon.com/ko/ec2/) - 아마존 클라우드 서버
* [AWS RDS](https://aws.amazon.com/ko/rds/) - 아마존 클라우드 관계형 데이터베이스
* [MySQL](https://www.mysql.com/about/) - 관계형 데이터베이스 관리시스템
* [MySQL Workbench](https://www.mysql.com/products/workbench/) - 관계형 데이터베이스 시각적 관리도구   

## 기여하기

[CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) 를 읽으신 후 기여를 해주십시오. 자세한 Pull Request 절차와 행동 규칙을 확인하실 수 있습니다.

## 개발자
  - **박우림** [woorim960](https://github.com/woorim960) : 라즈베리파이와 모바일간 통신을 위한 서버


[기여자 목록](https://github.com/golagola2020/hango-server/graphs/contributors)을 확인하여 이 프로젝트에 참가하신 분들을 보실 수 있습니다.

## 라이센스

이 프로젝트는 MIT 허가서를 사용합니다 - [LICENSE.md](LICENSE.md) 파일에서 자세히 알아보세요.


