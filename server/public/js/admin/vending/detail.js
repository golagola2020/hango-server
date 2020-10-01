// public/js/admin/vending/detail.js

'use strict';

// HTML 오브젝트 변수 선언
const btnVendingDelete = document.querySelector('#vending-delete-btn'),
  serialNumber = document.querySelector('hidden').attributes.value.value;

// 자판기 읽어오는 함수
function readVendingDetail() {
  fetch(`/admin/vending/${serialNumber}`, {
    method : 'POST',
    headers : {
      'Content-Type' : 'application/json'
    }
  })
    .then(res => res.json())
    .then(result => {
      if (result.success) {
        const title = document.querySelector('#vending-detail-form h1'),
          textSerialNumber = document.querySelector('#serial-number span'),
          textUserId = document.querySelector('#user-id span'),
          textDescription = document.querySelector('#description span'),
          textInDate = document.querySelector('#in-date span'),
          textUpdateDate = document.querySelector('#update-date span');

        const vending = result.vending;

        title.innerHTML = vending.name;
        textSerialNumber.innerHTML = vending.serialNumber;
        textUserId.innerHTML = vending.userId;
        textDescription.innerHTML = vending.description;
        textInDate.innerHTML = vending.inDate;
        textUpdateDate.innerHTML = vending.updateDate;
      }
    })
    .catch(err => alert(err));
}

function deleteVending(event) {
  fetch(`/admin/vending/${serialNumber}/delete`, {
    method : 'POST',
    headers : {
      'Content-Type' : 'application/json'
    }
  })
    .then(res => res.json())
    .then(result => {
      if (result.success) {
        alert('정상적으로 삭제되었습니다.')
      } else {
        alert(result.msg)
      }
    })
    .catch(err => alert(err));
}

// 초기 실행 함수
function init() {
  readVendingDetail(); // 자판기 읽어오는 함수
  btnVendingDelete.addEventListener('click', deleteVending);
}

init();
