// public/js/admin/vending/update.js

'use strict'

// HTML 오브젝트 변수 선언
const btnVendingUpdate = document.querySelector('#vending-update-btn')
const btnBack = document.querySelector('#back-btn')
const serialNumber = document.querySelector('hidden').attributes.value.value

// 자판기 정보 수정 요청 함수
function updateVending() {
  const name = document.querySelector('#name').value
  const description = document.querySelector('#description').value
  const fullSize = document.querySelector('#full-size').value

  const request = {
    vending: {
      name,
      description,
      fullSize,
    },
  }

  fetch(`/admin/vending/${serialNumber}/update`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  })
    .then((res) => res.json())
    .then((result) => {
      if (result.success) {
        location.href = `/admin/vending/${serialNumber}`
        alert('데이터가 수정되었습니다.')
      } else {
        alert(result.msg)
      }
    })
    .catch((err) => alert(err))
}

// 초기 실행 함수
function init() {
  btnVendingUpdate.addEventListener('click', updateVending)
  btnBack.addEventListener('click', () => {
    location.href = `/admin/vending/${serialNumber}`
  })
}

init()
