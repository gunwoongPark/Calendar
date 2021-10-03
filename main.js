const buildCalendar = () => {
    const tbody = document.querySelector('tbody');
    tbody.addEventListener('click', addSch)
    // date 객체 선언
    let date = new Date();

    document.querySelector('.month').innerHTML = date.getMonth() + 1;
    document.querySelector('.year').innerHTML = date.getFullYear();

    let lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    let days = 1;
    // 해당 월의 1일이 무슨 요일인지 파악하기 위해 설정
    date.setMonth(date.getMonth(), 1);
    let cellCnt = date.getDay();

    // 공백 칸 형성
    let row = tbody.insertRow();
    for (let idx = 0; idx < cellCnt; ++idx) {
        row.insertCell();
    }

    while (1) {
        if (days - 1 === lastDate)
            break;

        if (cellCnt === 7) {
            row = tbody.insertRow();
            cellCnt = 0;
        }

        let cell = row.insertCell();
        if (cellCnt === 6) {
            cell.style.color = "blue"
        }
        else if (cellCnt === 0) {
            cell.style.color = "red"
        }
        cell.innerHTML = days;

        days += 1;
        cellCnt += 1;
    }

    for (let idx = cellCnt; idx < 6; ++idx) {
        row.insertCell();
    }
}

const addSch = (e) => {
    const dim = document.querySelector('.dim');
    const modal = document.querySelector('.modal-container');

    dim.style.visibility = 'visible'
    modal.style.visibility = 'visible'

    document.querySelector('.confirm').onclick = () => {
        modal.style.visibility = 'hidden';
        dim.style.visibility = 'hidden';
    }
}

const init = () => {
    buildCalendar();
}

init();