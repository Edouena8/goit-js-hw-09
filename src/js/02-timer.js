import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const refs = {
    input: document.querySelector('input#datetime-picker'),
    startBtn: document.querySelector('button[data-start]'),

    days: document.querySelector('span[data-days]'),
    hours: document.querySelector('span[data-hours]'),
    minutes: document.querySelector('span[data-minutes]'),
    seconds: document.querySelector('span[data-seconds]'),
};

let timerId = null;

refs.startBtn.setAttribute('disabled', true);


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
            const isTrue = new Date() < selectedDates[0];

            if(isTrue) {
                refs.startBtn.disabled = false;
                refs.startBtn.addEventListener('click', () => {
                    timerId = setInterval(() => {
                        const currentTime = new Date().getTime();    
                        const inputTime = selectedDates[0].getTime();
                        const deltaTime = inputTime - currentTime;
                        refs.startBtn.disabled = true;

                        const { days, hours, minutes, seconds } = convertMs(deltaTime);

                        refs.days.textContent = days;
                        refs.hours.textContent = hours;
                        refs.minutes.textContent = minutes;
                        refs.seconds.textContent = seconds;
                        
                        if(deltaTime < 1000){
                            clearInterval(timerId);
                            Report.success('Congratulations! 🎉', 'You are a fucking lucky guy!😏', 'Accept');
                        }
                    }, 1000);
                    });
            } else {
                Notify.failure("Please choose a date in the future");
            };
    },
};

flatpickr(refs.input, options);


function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
}

