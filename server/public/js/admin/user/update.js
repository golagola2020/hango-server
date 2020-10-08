// public/js/admin/user/update.js

"use strict";

// HTML 오브젝트 변수 선언
const btnUserUpdate = document.querySelector("#user-update-btn"),
  btnBack = document.querySelector("#back-btn"),
  userId = document.querySelector("hidden").attributes.value.value;

// 자판기 정보 수정 요청 함수
function updateUser() {
  const id = document.querySelector("#id").value,
    name = document.querySelector("#name").value,
    email = document.querySelector("#email").value;

  const request = {
    user: {
      id: id,
      name: name,
      email: email,
    },
  };

  fetch(`/admin/user/${userId}/update`, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  })
    .then((res) => res.json())
    .then((result) => {
      if (result.success) {
        location.href = `/admin/user/${id}`;
        alert("데이터가 수정되었습니다.");
      } else {
        alert(result.msg);
      }
    })
    .catch((err) => alert(err));
}

// 초기 실행 함수
function init() {
  btnUserUpdate.addEventListener("click", updateUser);
  btnBack.addEventListener("click", function () {
    location.href = `/admin/user/${userId}`;
  });
}

init();
