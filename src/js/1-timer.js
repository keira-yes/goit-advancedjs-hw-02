import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import closeImg from '../img/close.svg';

const datetimePicker = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
let userSelectedDate;

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const diff = selectedDates[0].getTime() - Date.now();
    if (diff > 0) {
      userSelectedDate = selectedDates[0];
      startBtn.disabled = false;
    } else {
      iziToast.show({
        message: 'Please choose a date in the future',
        messageColor: '#FFDFDB',
        backgroundColor: '#FD4B3F',
        iconUrl: `${closeImg}`,
        position: 'topRight',
        timeout: 5000,
        animateInside: false,
        progressBar: false,
        transitionIn: 'fadeIn',
        transitionOut: 'fadeOut',
        close: false,
      });
      startBtn.disabled = true;
    }
  },
};

flatpickr(datetimePicker, options);

const timer = {
  deadline: null,
  timerId: null,
  elements: {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
  },

  start() {
    this.deadline = userSelectedDate;
    this.timerId = setInterval(() => {
      const diff = this.deadline.getTime() - Date.now();

      if (diff <= 0) {
        this.stop();
        return;
      }

      const { days, hours, minutes, seconds } = this.convertMs(diff);

      this.elements.days.textContent = this.addLeadingZero(days);
      this.elements.hours.textContent = this.addLeadingZero(hours);
      this.elements.minutes.textContent = this.addLeadingZero(minutes);
      this.elements.seconds.textContent = this.addLeadingZero(seconds);
    }, 1000);
  },

  convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  },

  addLeadingZero(value) {
    return String(value).padStart(2, '0');
  },

  stop() {
    clearInterval(this.timerId);
    datetimePicker.disabled = false;
  },
};

startBtn.addEventListener('click', () => {
  timer.start();
  datetimePicker.disabled = true;
  startBtn.disabled = true;
});
