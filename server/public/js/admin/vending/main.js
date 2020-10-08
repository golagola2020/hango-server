// public/js/admin/vending/main.js

"use strict";

// HTML 오브젝트 변수 선언
const btnVendingCreate = document.querySelector("#vending-create-btn"),
  btnBack = document.querySelector("#back-btn"),
  btnSearch = document.querySelector("#search-btn"),
  tbody = document.querySelector("#read-table tbody");

// 자판기 읽어오는 함수
function readVendings() {
  fetch("/admin/vending/read", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((results) => {
      if (results.success) {
        const vendings = results.vendings;
        let tr = "";
        for (let i = 0; i < vendings.length; i++) {
          tr += `<tr>
              <td>${vendings[i].serialNumber}</td>
              <td>${vendings[i].userId}</td>
              <td>${vendings[i].name}</td>
              <td>${vendings[i].inDate}</td>
            `;
          tr += "</tr>";
        }
        tbody.innerHTML = tr;
      } else {
        alert(results.msg);
      }
    })
    .catch((err) => alert(err));
}

// 자판기 상세 페이지 이동
function showVendingDetail(event) {
  const serialNumber = event.target.parentNode.childNodes[1].innerText;
  location.href = `/admin/vending/${serialNumber}`;
}

// 검색 데이터 조회
function readSearchData() {
  const tabSearch = document.querySelector("#search-tab"),
    searchText = document.querySelector("#search-input").value;

  const search = {
    type: tabSearch.options[tabSearch.selectedIndex].value,
    text: searchText,
  };

  // 검색 조회 요청
  fetch(`/admin/vending/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(search),
  })
    .then((res) => res.json())
    .then((results) => {
      if (results.success) {
        const vendings = results.vendings;
        let tr = "";
        for (let i = 0; i < vendings.length; i++) {
          tr += `<tr>
              <td>${vendings[i].serialNumber}</td>
              <td>${vendings[i].userId}</td>
              <td>${vendings[i].name}</td>
              <td>${vendings[i].inDate}</td>
            `;
          tr += "</tr>";
        }
        tbody.innerHTML = tr;
      } else {
        alert(results.msg);
      }
    })
    .catch((err) => alert(err));
}

// 초기 실행 함수
function init() {
  readVendings(); // 자판기 읽어오는 함수
  tbody.addEventListener("click", showVendingDetail);

  btnVendingCreate.addEventListener("click", function () {
    location.href = "/admin/vending/create";
  });

  btnBack.addEventListener("click", function () {
    location.href = `/admin/home`;
  });

  btnSearch.addEventListener("click", readSearchData);
}

init();
