// public/js/admin/vending/main.js

'use strict';

// HTML 오브젝트 변수 선언
const btnVendingCreate = document.querySelector('#vending-create-btn'),
  tbody = document.querySelector('#read-table tbody');

// 자판기 읽어오는 함수
function readVendings() {
  fetch('/admin/vending/read', {
    method : 'POST',
    headers : {
      'Content-Type' : 'application/json'
    }
  })
    .then(res => res.json())
    .then(results => {
      if (results.success) {
        const vendings = results.vendings;
        let tr = '';
        for (let i = 0; i < vendings.length; i++) {
          tr += `<tr>
              <td>${vendings[i].serialNumber}</td>
              <td>${vendings[i].userId}</td>
              <td>${vendings[i].name}</td>
              <td>${vendings[i].inDate}</td>
            `;
          tr += '</tr>'
        }
        tbody.innerHTML = tr;
      }
    })
    .catch(err => alert(err));
}

// 자판기 상세 페이지 이동
function showVendingDetail(event) {
  const serialNumber = event.target.parentNode.childNodes[1].innerText;
  location.href = `/admin/vending/${serialNumber}`;
}

// 초기 실행 함수
function init() {
  readVendings(); // 자판기 읽어오는 함수
  tbody.addEventListener('click', showVendingDetail);

  btnVendingCreate.addEventListener('click', function () {
    location.href = '/admin/vending/create';
  });
}

init();
