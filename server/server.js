/**
 *   MAIN - server.js
 *
 *   Copyright (C) 2020 Golagola
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */

// 기본 모듈 포함
const express = require('express'), // 웹 프레임워크
  bodyParser = require('body-parser'),
  favicon = require('serve-favicon'), // 파비콘 모듈
  session = require('express-session'),
  MySQLStore = require('express-mysql-session')(session),
  passport = require('passport'),
  flash = require('connect-flash')

// eslint-disable-next-line no-unused-vars
const dotenv = require('dotenv').config() // 환경변수 관리용 모듈

// 기본 인스턴스 생성
const app = express() // express를 사용하기 위한 인스턴스 생성

// 포트 설정
const PORT = process.env.PORT || 9700

// MySQL에 세션을 저장하기 위한 설정
app.use(
  session({
    secret: 'spemnv2395@#lsore*&@#oso3$%^#&#$@#$!',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60, // 유효시간 1시간
    },
    store: new MySQLStore({
      host: process.env.DB_HOST,
      port: 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    }),
  }),
)

// 패스포트 미들웨어 등록
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

// 로그인 성공시 세션 저장
passport.serializeUser(function (manager, done) {
  done(null, manager)
})

// 저장된 세션 불러오기
passport.deserializeUser(function (manager, done) {
  done(null, manager)
})

// 기본 앱 세팅
app.set('views', './src/client/views') // 뷰 엔진의 기본 경로 세팅
app.set('view engine', 'ejs') // 뷰 엔진은 ejs 사용
app.use(express.static(`${__dirname}/src/public`))
app.use(favicon(`${__dirname}/src/public/images/favicon.ico`))
app.use(bodyParser.json()) // 클라이언트의 요청 데이터 중 json 객체를 파싱할 수 있게 하기 위함
app.use(bodyParser.urlencoded({extended: true})) // body-parser의 기본 셋

// 라우팅
app.use('/', require('./src/routes/home'))
app.use('/admin/', require('./src/routes/admin/login'))
app.use('/admin/home', require('./src/routes/admin/home'))
app.use('/admin/vending', require('./src/routes/admin/vending/main'))
app.use('/admin/user', require('./src/routes/admin/user/main'))

app.use('/rasp', require('./src/routes/rasp'))

app.use('/mobile', require('./src/routes/mobile/mobile'))
app.use('/mobile/vending', require('./src/routes/mobile/vending'))
app.use('/mobile/drink', require('./src/routes/mobile/drink'))
app.use('/mobile/stats', require('./src/routes/mobile/stats'))

// 404 렌더링
app.get('*', (req, res) => {
  res.render('404')
})

// 서버 오픈
app.listen(PORT, () => console.log(`서버가 ${PORT} 포트에서 정상 가동되었습니다.`))
