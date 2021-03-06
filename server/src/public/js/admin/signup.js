// public/js/admin/signup.js

'use strict'

// HTML 오브젝트 변수 선언
const btnBack = document.querySelector('#back-btn')
const btnSignup = document.querySelector('#signup-btn')

const id = document.querySelector('#id')
const name = document.querySelector('#name')
const email = document.querySelector('#email')
const passwd = document.querySelector('#pw')
const pwCheck = document.querySelector('#pw-check')

// 회원가입 가능 여부
let isAvailable = true

// input창에 경고메세지 출력
function printWarningMsg(html, is_pw) {
  html.placeholder = html.value === '' || is_pw === true ? '필수 입력 사항입니다.' : html.value
  html.value = ''
  html.classList.add('placeholder')
  isAvailable = false
}

// 로그인
function signup() {
  const manager = {
    id: id.value,
    name: name.value,
    email: email.value,
    passwd: passwd.value,
    pwCheck: pwCheck.value,
  }

  if (manager.id.match(/^[a-z0-9_]{5,14}$/) === null) {
    alert('아이디가 양식(영숫자 5-14자)에 벗어났습니다.')
    printWarningMsg(id)
  } else if (manager.name.match(/^[a-zA-Z가-힣\s]{0,20}$/) === null) {
    alert('이름이 양식(한영 20자 이내)에 벗어났거나 올바른 표기법이 아닙니다.')
    printWarningMsg(name)
  } else if (
    manager.email !== '' &&
    manager.email.match(
      /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/,
    ) === null
  ) {
    alert('이메일 형식을 유지해주세요.')
    printWarningMsg(email)
  } else if (
    manager.passwd.match(/^.*(?=^.{9,20}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/) === null
  ) {
    alert('비밀번호가 양식(영대소문자, 숫자, 특수문자 조합 9-20자)에 벗어났습니다.')
    printWarningMsg(passwd, true)
  } else if (manager.passwd !== manager.pwCheck) {
    alert('비밀번호가 일치하지 않습니다.')
    pwCheck.placeholder = '비밀번호가 일치하지 않습니다.'
    pwCheck.value = ''
    pwCheck.classList.add('placeholder')
    isAvailable = false
  } else isAvailable = true

  // 회원가입이 가능하면 실행
  if (isAvailable) {
    fetch('/admin/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(manager),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          location.href = '/admin'
          alert('관리자 등록이 완료 되었습니다.')
        } else {
          alert(result.msg)
        }
      })
      .catch((err) => alert(err))
  }
}

function init() {
  btnBack.addEventListener('click', () => {
    location.href = '/admin/'
  })
  btnSignup.addEventListener('click', signup)
}

init()
