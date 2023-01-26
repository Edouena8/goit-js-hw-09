const refs = {
    btnStart: document. querySelector('button[data-start]'),
    btnStop: document.querySelector('button[data-stop]'),
};

let timerId = null;

refs.btnStart.addEventListener('click', onStartBtnClick);
refs.btnStop.addEventListener('click', onStopBtnClick);


function onStartBtnClick(evt) {
    refs.btnStart.setAttribute('disabled', true);
    refs.btnStop.disabled = false;
    timerId = setInterval(changeColor, 1000);
}

function changeColor() {
    const randomHexColor = getRandomHexColor();
    document.body.style.backgroundColor = randomHexColor;
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

function onStopBtnClick(evt) {
    evt.currentTarget.disabled = true;
    refs.btnStart.disabled = false;
    clearInterval(timerId);
}