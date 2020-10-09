// public/js/admin/vending/create.js

'use strict';

// HTML 오브젝트 변수 선언
const btnVendingCreate = document.querySelector('#vending-create-btn');

// 로그인
function createVending() {
  const id = document.querySelector('#id');

  const user = {
    id: id.value,
  };

  if (user.id != '') {
    fetch('/admin/vending/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((user) => {
        if (user.success) {
          alert('자판기 등록에 성공하셨습니다.');
          id.value = '';
        } else {
          alert('없는 정보입니다.');
        }
      });
  } else {
    alert('자판기 관리자 아이디를 입력해주세요.');
  }
}

function init() {
  btnVendingCreate.addEventListener('click', createVending);
}

init();
