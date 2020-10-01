// public/js/admin/home.js

'use strict';

// HTML 오브젝트 변수 선언
const btnLeft = document.querySelector('#left'),
  btnRight = document.querySelector('#right');

function init() {
  btnLeft.addEventListener('click', function() {
    location.href = '/admin/vending';
  });

  btnRight.addEventListener('click', function() {
    alert('업데이트 중입니다.');
  });
}

init();
