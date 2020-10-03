// public/js/admin/user/main.js

'use strict';

// HTML 오브젝트 변수 선언
const btnBack = document.querySelector('#back-btn'),
  tbody = document.querySelector('#read-table tbody');

// 자판기 읽어오는 함수
function readUsers() {
  fetch('/admin/user/read', {
    method : 'POST',
    headers : {
      'Content-Type' : 'application/json'
    }
  })
    .then(res => res.json())
    .then(results => {
      if (results.success) {
        const users = results.users;
        let tr = '';
        for (let i = 0; i < users.length; i++) {
          tr += `<tr>
              <td>${users[i].id}</td>
              <td>${users[i].name}</td>
              <td>${users[i].email}</td>
              <td>${users[i].inDate}</td>
            `;
          tr += '</tr>'
        }
        tbody.innerHTML = tr;
      }
    })
    .catch(err => alert(err));
}

// 유저 상세 페이지 이동
function showUserDetail(event) {
  const userId = event.target.parentNode.childNodes[1].innerText;
  location.href = `/admin/user/${userId}`;
}

// 초기 실행 함수
function init() {
  readUsers(); // 자판기 읽어오는 함수
  tbody.addEventListener('click', showUserDetail);

  btnBack.addEventListener('click', function() {
    location.href = `/admin/home`;
  });
}

init();
