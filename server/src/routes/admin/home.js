/* routes/admin/home.js */

// 라우팅을 위한 기본 모듈 포함
const express = require('express')

const router = express.Router()

const isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) return next()
  res.redirect('/admin/')
}

// admin 홈 렌더링
router.get('/', isAuthenticated, (req, res) => {
  res.render('admin/home')
})

// 모듈 내보내기
module.exports = router
