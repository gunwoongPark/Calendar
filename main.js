// 테이블 생성 함수
function buildTable() {
    let tbody = document.querySelector('#calTable');

    let row = tbody.insertRow();

    for (let idx = 0; idx < 6; ++idx) {
        let row = tbody.insertRow();
        for (let jdx = 0; jdx < 7; ++jdx) {
            row.insertCell();
        }
    }
}

// 달력 생성 함수
function buildCalendar() {

    document.querySelector('#yearMonth').innerHTML = String(date.getFullYear()) + '년 ' + String(date.getMonth() + 1) + '월';

    let tbody = document.querySelector('#calTable');

    // 달력 초기화
    for (let idx = 1; idx < 7; ++idx) {
        for (let jdx = 0; jdx < 7; ++jdx) {
            tbody.rows[idx].cells[jdx].innerHTML = "";
        }
    }

    // 각 달의 마지막 일을 담는 변수
    lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

    let days = 1;
    let rowCnt = 1;
    let cellCnt = date.getDay();

    // 테이블에 숫자들 입력
    while (1) {
        if (cellCnt == 6) {
            tbody.rows[rowCnt].cells[cellCnt].innerHTML = "<font color = blue>" + days;
        }
        else if (cellCnt == 0) {
            tbody.rows[rowCnt].cells[cellCnt].innerHTML = "<font color = red>" + days;
        }
        else
            tbody.rows[rowCnt].cells[cellCnt].innerHTML = days;
        cellCnt += 1;
        if (cellCnt == 7) {
            rowCnt += 1;
            cellCnt = 0;
        }
        days += 1;
        if (days - 1 == lastDate)
            break;
    }
}

// 날짜가 그려진 테이블 속성에만 클래스 추가 -> hover 속성 추가
function setHover() {
    let tbody = document.querySelector('#calTable');
    for (let idx = 1; idx < 7; ++idx) {
        for (let jdx = 0; jdx < 7; ++jdx) {
            if (tbody.rows[idx].cells[jdx].innerText !== "") {
                tbody.rows[idx].cells[jdx].classList.add('clcikableTd');
            }
        }
    }
}

// 날짜가 그려지지 않은 테이블 속성의 hover 속성을 제거
function delHover() {
    let tbody = document.querySelector('#calTable');

    for (let idx = 1; idx < 7; ++idx) {
        for (let jdx = 0; jdx < 7; ++jdx) {
            tbody.rows[idx].cells[jdx].classList.remove('clcikableTd');
        }
    }
}

// 테이블 내부의 일을 눌렀을 때, 하단에 표시하는 함수
function alertDay(tableCell) {

    let tbody = document.querySelector('#calTable');
    for (let idx = 1; idx < 7; ++idx) {
        for (let jdx = 0; jdx < 7; ++jdx) {
            tbody.rows[idx].cells[jdx].style.backgroundColor = "";
        }
    }

    let day = tableCell.innerText;

    let dayOfTheWeek

    let saturdayFlag = false;
    let sundayFlag = false;

    switch (tableCell.cellIndex) {
        case 0:
            dayOfTheWeek = "일";
            sundayFlag = true;
            break;
        case 1:
            dayOfTheWeek = "월";
            break;
        case 2:
            dayOfTheWeek = "화";
            break;
        case 3:
            dayOfTheWeek = "수";
            break;
        case 4:
            dayOfTheWeek = "목";
            break;
        case 5:
            dayOfTheWeek = "금";
            break;
        case 6:
            dayOfTheWeek = "토";
            saturdayFlag = true;
            break;
    }

    document.querySelector('#day').innerHTML = day + " (" + dayOfTheWeek + ")";

    if (saturdayFlag) {
        document.querySelector('#day').style.color = "blue";
    }

    else if (sundayFlag) {
        document.querySelector('#day').style.color = "red";
    }

    else {
        document.querySelector('#day').style.color = "";
    }

}

// 테이블 내부의 일을 눌렀을 때, 이벤트 함수
function clickTd() {
    let tbody = document.querySelector('#calTable');
    for (let idx = 1; idx < 7; ++idx) {
        for (let jdx = 0; jdx < 7; ++jdx) {

            tbody.rows[idx].cells[jdx].onclick = function () {

                if (this.innerText !== "") {
                    alertDay(this);
                    this.style.backgroundColor = "yellow";
                }

            }
        }
    }
}

// 시계
function getTime() {
    const time = new Date();
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    document.querySelector("#time").innerHTML = `${hours < 10 ? `0${hours}` : hours}시 ${minutes < 10 ? `0${minutes}` : minutes}분 ${seconds < 10 ? `0${seconds}` : seconds}초`
}

function clock() {
    setInterval(getTime, 1000);
}

// 테이블 생성
buildTable();

// 달력 생성 전 객체 생성
let date = new Date();
// 해당 월의 1일이 무슨 요일인지 파악하기 위해 설정
date.setMonth(date.getMonth(), 1);

// 달력 생성
buildCalendar();

// 호버 속성 생성
setHover();

// 전 달 버튼 누를 때 이벤트 함수
document.querySelector('#beforeBtn').onclick = function () {
    date = new Date(date.getFullYear(), date.getMonth() - 1, date.getDate());
    buildCalendar();
    document.querySelector("#day").innerHTML = "";
    let tbody = document.querySelector('#calTable');
    for (let idx = 1; idx < 7; ++idx) {
        for (let jdx = 0; jdx < 7; ++jdx) {
            tbody.rows[idx].cells[jdx].style.backgroundColor = "";
        }
    }

    delHover();
    setHover();
}

// 다음 달 버튼 누를 때 이벤트 함수
document.querySelector('#afterBtn').onclick = function () {
    date = new Date(date.getFullYear(), date.getMonth() + 1, date.getDate());
    buildCalendar();
    document.querySelector("#day").innerHTML = "";
    let tbody = document.querySelector('#calTable');
    for (let idx = 1; idx < 7; ++idx) {
        for (let jdx = 0; jdx < 7; ++jdx) {
            tbody.rows[idx].cells[jdx].style.backgroundColor = "";
        }
    }

    delHover();
    setHover();
}

// 테이블 내부 속성 클릭시 함수
clickTd();

// 시계
clock();