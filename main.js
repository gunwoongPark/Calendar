// 달력 생성
const buildCalendar = () => {
    const tbody = document.querySelector('tbody');

    tbody.innerHTML = ""

    document.querySelector('.month').innerHTML = date.getMonth() + 1;
    document.querySelector('.year').innerHTML = date.getFullYear();

    const lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    let days = 1;
    date.setMonth(date.getMonth(), 1);
    let cellCnt = date.getDay();

    // 이전 공백
    const prevMonthLast = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    let row = tbody.insertRow();
    for (let idx = prevMonthLast - (cellCnt - 1); idx <= prevMonthLast; ++idx) {
        const cell = row.insertCell();

        cell.innerHTML = `
        <div class="day-container">
            <p>${idx}</p>
            <div class="event-container">
            </div>
        </div>
        `
        cell.children[0].children[0].style.color = "lightgray"
    }

    // 달력 채우기
    while (1) {
        if (days - 1 === lastDate)
            break;

        if (cellCnt === 7) {
            row = tbody.insertRow();
            cellCnt = 0;
        }

        const cell = row.insertCell();

        cell.innerHTML = `
        <div id="day-${days}" class="day-container">
            <p>${days}</p>
            <div class="event-container">
            </div>
        </div>
        `
        cell.addEventListener('click', addEvt)

        if (cellCnt === 0 || cellCnt === 6) {
            cell.children[0].children[0].style.color = "red"
        }

        days += 1;
        cellCnt += 1;
    }

    // 이후 공백
    for (let idx = 1; idx <= 7 - cellCnt; ++idx) {
        const cell = row.insertCell();

        cell.innerHTML = `
        <div class="day-container">
            <p>${idx}</p>
            <div class="event-container">
            </div>
        </div>
        `
        cell.children[0].children[0].style.color = "lightgray"
    }
}

// 일정 추가
const addEvt = (e) => {
    if (e.target.className !== 'day-container')
        return;

    const dim = document.querySelector('.dim');
    const modal = document.querySelector('.modal-container');
    const selectedDate = parseInt(e.target.children[0].innerHTML)

    date.setMonth(date.getMonth(), selectedDate);

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

    modal.children[0].innerHTML = `${dayNames[date.getDay()]}, ${selectedDate} ${monthNames[date.getMonth()]}`;

    dim.style.visibility = 'visible'
    modal.style.visibility = 'visible'

    document.querySelector('.confirm').onclick = () => {
        modal.style.visibility = 'hidden';
        dim.style.visibility = 'hidden';

        if (modal.children[1].value !== '') {
            const rgb = getRandomRGB();

            // daily
            if (document.querySelector('#daily').checked) {
                const node = document.createElement('div');
                node.innerHTML = modal.children[1].value;
                node.style.background = rgb;
                e.target.children[1].appendChild(node);
            }

            // long
            if (document.querySelector('#long').checked) {
                const lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
                const randVal = Math.floor(Math.random() * (lastDate - selectedDate + 1) + selectedDate);

                for (let idx = selectedDate; idx <= randVal; ++idx) {
                    const node = document.createElement('div');
                    node.innerHTML = modal.children[1].value;
                    node.style.background = rgb;
                    document.querySelector(`#day-${idx}`).children[1].appendChild(node);
                }
            }
            modal.children[1].value = ""
        }
    }

    // 모달 닫기(딤처리)
    document.querySelector('.dim').onclick = () => {
        modal.style.visibility = 'hidden';
        dim.style.visibility = 'hidden';
    }
}

// 랜덤 RGB
const getRandomRGB = () => {
    const R = Math.random() * 255;
    const G = Math.random() * 255;
    const B = Math.random() * 255;
    return `rgb(${R}, ${G}, ${B})`;
}

// 화살표 버튼을 통한 월 변경
const changeMonth = (e) => {
    if (e.target.className === "prev") {
        date = new Date(date.getFullYear(), date.getMonth() - 1);
        buildCalendar();
    }
    else {
        date = new Date(date.getFullYear(), date.getMonth() + 1);
        buildCalendar();
    }
}

// *** //

const init = () => {
    buildCalendar(date.getMonth());
    document.querySelector('.prev').addEventListener('click', changeMonth);
    document.querySelector('.next').addEventListener('click', changeMonth);
}

let date = new Date();
init();