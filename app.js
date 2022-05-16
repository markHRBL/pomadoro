let startingMinutes, time, timer, count, timeOfRest, restVar;

const countDownEl = document.getElementById('countdown'),
    sessionTime = document.getElementById('sessionTime'),
    startBtn = document.getElementById('startBtn'),
    sessionCount = document.getElementById('sessionCount'),
    restTime = document.getElementById('restTime');

function startAll() {
    if (startBtn.innerText === 'Stop') {
        countDownEl.innerText = '00:00';
        startBtn.innerText = startBtn.innerText === 'Start' ? 'Stop' : 'Start';
        document.querySelector('.controls').classList.toggle('active');
        clearInterval(timer);
        return;
    }

    clearInterval(timer);

    if (+sessionTime.value && +restTime.value && +sessionCount.value) {
        startingMinutes = +sessionTime.value;
        time = (startingMinutes * 60);
        timer = setInterval(update, 1000);
        count = (Number(sessionCount.value)-1)*2;
        timeOfRest = +restTime.value;
        restVar = false;
        startBtn.innerText = startBtn.innerText === 'Start' ? 'Stop' : 'Start';
        document.querySelector('.controls').classList.toggle('active');
        resetInputs();
    } else {
        alert('! All values must be numbers !');
        resetInputs();
    }
}

function update() {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    countDownEl.innerText = `${minutes}:${seconds}`;
    time--;

    time <= -1 ? newTimer() : 0;
}

function newTimer() {
    restVar = !restVar;
    clearInterval(timer);

    if (count) {
        count--;

        time = (restVar ? timeOfRest : startingMinutes) * 60;
        timer = setInterval(update, 1000);
    } else {
        startBtn.innerText = 'Start';
        document.querySelector('.controls').classList.toggle('active');
        countDownEl.innerText = '00:00';
    }
}

function resetInputs() {
    sessionTime.value = '';
    restTime.value = '';
    sessionCount.value = '';
}

startBtn.addEventListener('click', startAll);