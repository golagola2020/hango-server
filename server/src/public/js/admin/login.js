// public/js/admin/login.js

'use strict'

// HTML 오브젝트 변수 선언
const btnLogin = document.querySelector('#login-btn')
const btnSignup = document.querySelector('#signup-btn')

// 로그인
function login() {
  const id = document.querySelector('#id')
  const passwd = document.querySelector('#pw')

  const manager = {
    id: id.value,
    passwd: passwd.value,
  }

  if (manager.id !== '') {
    if (manager.passwd !== '') {
      fetch('/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(manager),
      })
        .then((res) => res.json())
        .then((manager) => {
          if (manager.success) {
            location.href = '/admin/home'
            alert('로그인에 성공하셨습니다.')
          } else {
            alert(manager.msg)
          }
        })
        .catch((err) => console.log(err))
    } else {
      alert('비밀번호를 입력해주세요.')
    }
  } else {
    alert('아이디를 입력해주세요.')
  }
}

function init() {
  btnLogin.addEventListener('click', login)
  btnSignup.addEventListener('click', () => {
    location.href = '/admin/signup'
  })
}

init()
