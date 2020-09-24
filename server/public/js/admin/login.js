// public/js/admin/login.js

'use strict';

// HTML 오브젝트 변수 선언
const btnLogin = document.querySelector('#login-btn');

// 로그인
function login() {
  const id = document.querySelector('#id'),
    passwd = document.querySelector('#pw');

  const manager = {
    id : id.value,
    passwd : passwd.value
  };

  fetch('/admin/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(manager)
  })
    .then(res => res.json())
    .then(manager => {
      if (manager.success) {
        alert('로그인에 성공하셨습니다.');
      } else {
        alert(manager.msg);
      }

    });
}

function init() {
  btnLogin.addEventListener('click', login);
}

init();
