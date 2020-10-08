// public/js/admin/vending/detail.js

"use strict";

// HTML 오브젝트 변수 선언
const btnVendingUpdate = document.querySelector("#vending-update-btn"),
  btnVendingDelete = document.querySelector("#vending-delete-btn"),
  btnBack = document.querySelector("#back-btn"),
  serialNumber = document.querySelector("hidden").attributes.value.value;

// 자판기 읽어오는 함수
function readVendingDetail() {
  fetch(`/admin/vending/${serialNumber}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((result) => {
      // 자판기 정보를 DB에서 읽어오는데 성공하면 브라우저에 띄우고, 실패하면 콘솔창에 오류 메시지 출력
      if (result.success) {
        const title = document.querySelector("#vending-detail-form h1"),
          textSerialNumber = document.querySelector("#serial-number span"),
          textUserId = document.querySelector("#user-id span"),
          textDescription = document.querySelector("#description span"),
          textFullSize = document.querySelector("#full-size span"),
          textInDate = document.querySelector("#in-date span"),
          textUpdateDate = document.querySelector("#update-date span");

        // DB 데이터 저장
        const vending = result.vending;

        // 브라우저에 띄우기
        title.innerHTML = vending.name;
        textSerialNumber.innerHTML = vending.serialNumber;
        textUserId.innerHTML = vending.userId;
        textDescription.innerHTML = vending.description;
        textFullSize.innerHTML = vending.fullSize;
        textInDate.innerHTML = vending.inDate;
        textUpdateDate.innerHTML = vending.updateDate;
      } else {
        console.log(result.msg);
      }
    })
    .catch((err) => alert(err));
}

function updateVending() {
  location.href = `/admin/vending/${serialNumber}/update`;
}

function deleteVending() {
  fetch(`/admin/vending/${serialNumber}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((result) => {
      if (result.success) {
        location.href = "/admin/vending";
        alert("정상적으로 삭제되었습니다.");
      } else {
        alert(result.msg);
      }
    })
    .catch((err) => alert(err));
}

// 초기 실행 함수
function init() {
  readVendingDetail(); // 자판기 읽어오는 함수
  btnVendingUpdate.addEventListener("click", updateVending);
  btnVendingDelete.addEventListener("click", deleteVending);
  btnBack.addEventListener("click", function () {
    location.href = `/admin/vending/`;
  });
}

init();
