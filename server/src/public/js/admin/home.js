// public/js/admin/home.js

'use strict';

// HTML 오브젝트 변수 선언
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');

function init() {
  btnLeft.addEventListener('click', () => {
    location.href = '/admin/vending';
  });

  btnRight.addEventListener('click', () => {
    location.href = '/admin/user';
  });
}

init();
