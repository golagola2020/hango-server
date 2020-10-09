// public/js/admin/user/detail.js

'use strict'

// HTML 오브젝트 변수 선언
const btnUserUpdate = document.querySelector('#user-update-btn')
const btnUserDelete = document.querySelector('#user-delete-btn')
const btnBack = document.querySelector('#back-btn')
const userId = document.querySelector('hidden').attributes.value.value

// 자판기 읽어오는 함수
function readUserDetail() {
  fetch(`/admin/user/${userId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((result) => {
      // 자판기 정보를 DB에서 읽어오는데 성공하면 브라우저에 띄우고, 실패하면 콘솔창에 오류 메시지 출력
      if (result.success) {
        const title = document.querySelector('#user-detail-form h1')
        const textName = document.querySelector('#name span')
        const textEmail = document.querySelector('#email span')
        const textInDate = document.querySelector('#in-date span')

        // DB 데이터 저장
        const {user} = result

        // 브라우저에 띄우기
        title.innerHTML = userId
        textName.innerHTML = user.name
        textEmail.innerHTML = user.email
        textInDate.innerHTML = user.inDate
      } else {
        console.log(result.msg)
      }
    })
    .catch((err) => alert(err))
}

function updateUser() {
  location.href = `/admin/user/${userId}/update`
}

function deleteUser() {
  fetch(`/admin/user/${userId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((result) => {
      if (result.success) {
        location.href = '/admin/user'
        alert('정상적으로 삭제되었습니다.')
      } else {
        alert(result.msg)
      }
    })
    .catch((err) => alert(err))
}

// 초기 실행 함수
function init() {
  readUserDetail() // 자판기 읽어오는 함수
  btnUserUpdate.addEventListener('click', updateUser)
  btnUserDelete.addEventListener('click', deleteUser)
  btnBack.addEventListener('click', () => {
    location.href = '/admin/user/'
  })
}

init()
