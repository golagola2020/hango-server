/* routes/admin/home.js */

// 라우팅을 위한 기본 모듈 포함
const express = require('express'),
    router = express.Router(),
    db = require('../../database/db.js');

// 로그인 페이지 렌더링
router.get('/', (req, res) => {
    res.render('admin/home');
});

// 모듈 내보내기
module.exports = router;