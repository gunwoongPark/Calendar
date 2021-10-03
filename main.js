const buildCalendar = () => {
    const tbody = document.querySelector('tbody');
    // date 객체 선언
    let date = new Date();

    document.querySelector('.month').innerHTML = date.getMonth() + 1;
    document.querySelector('.year').innerHTML = date.getFullYear();

    let lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    let days = 1;
    // 해당 월의 1일이 무슨 요일인지 파악하기 위해 설정
    date.setMonth(11, 1);
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
            cell.innerHTML = "<font color = blue>" + days;
        }
        else if (cellCnt === 0) {
            cell.innerHTML = "<font color = red>" + days;
        }
        else cell.innerHTML = days;

        days += 1;
        cellCnt += 1;
    }

    for (let idx = cellCnt; idx < 6; ++idx) {
        row.insertCell();
    }
}

const init = () => {
    buildCalendar();
}

init();