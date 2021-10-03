const buildCalendar = () => {
    const tbody = document.querySelector('tbody');
    const date = new Date();

    document.querySelector('.month').innerHTML = date.getMonth() + 1;
    document.querySelector('.year').innerHTML = date.getFullYear();

    const lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    let days = 1;
    date.setMonth(date.getMonth(), 1);
    let cellCnt = date.getDay();

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

        const cell = row.insertCell();

        cell.innerHTML = `
        <div class="day-container">
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

    for (let idx = cellCnt; idx < 6; ++idx) {
        row.insertCell();
    }
}

const addEvt = (e) => {
    if (e.target.className !== 'day-container')
        return;

    const dim = document.querySelector('.dim');
    const modal = document.querySelector('.modal-container');

    const date = new Date();

    date.setMonth(date.getMonth(), parseInt(e.target.children[0].innerHTML));

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

    modal.children[0].innerHTML = `${dayNames[date.getDay()]}, ${parseInt(e.target.children[0].innerHTML)} ${monthNames[date.getMonth()]}`;

    dim.style.visibility = 'visible'
    modal.style.visibility = 'visible'

    document.querySelector('.confirm').onclick = () => {
        modal.style.visibility = 'hidden';
        dim.style.visibility = 'hidden';

        if (modal.children[1].value !== '') {
            const node = document.createElement('div');
            node.innerHTML = modal.children[1].value
            e.target.children[1].appendChild(node);

            modal.children[1].value = ""
        }
    }

    document.querySelector('.dim').onclick = () => {
        modal.style.visibility = 'hidden';
        dim.style.visibility = 'hidden';
    }
}

const changeMonth = (e) => {
    const date = new Date();
    console.log(date.getMonth())

    if (e.target.className === "prev") {

    }
    else {
        console.log('next!')
    }
}

const init = () => {
    const date = new Date();
    buildCalendar();
    document.querySelector('.prev').addEventListener('click', changeMonth);
    document.querySelector('.next').addEventListener('click', changeMonth);
}

init();