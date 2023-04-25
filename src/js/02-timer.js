// Descrito en la documentación
import flatpickr from "flatpickr";
// Importación adicional de estilos
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from "notiflix/build/notiflix-notify-aio";

const datetimePicker = document.querySelector('#datetime-picker');
const dataDays = document.querySelector('span[data-days]');
const dataHours= document.querySelector('span[data-hours]');
const dataMinutes = document.querySelector('span[data-minutes]');
const dataSeconds = document.querySelector('span[data-seconds]');
const dataStartbtn = document.querySelector('button[data-start]');

dataStartbtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const startDate = Date.now();

    if (selectedDate < startDate) {
      Notify.failure('Please choose a date in the future');
      dataStartbtn.disabled = true;
      return;
    };
    
    dataStartbtn.disabled = false;
    let interval = null;

    dataStartbtn.addEventListener('click', startTimer);

     function startTimer() {
      dataStartbtn.disabled = true;
      datetimePicker.disabled = true;

      interval = setInterval(() => {
        const currentTime = Date.now();

        if (selectedDate < currentTime) {
          Notify.failure('Too late for start button');
          clearInterval(interval);
          datetimePicker.disabled = false;
          return;
        };

        const time = selectedDate - currentTime;
        const { days, hours, minutes, seconds } = convertMs(time);
        
        dataDays.textContent = formatCeros(days);
        dataHours.textContent = formatCeros(hours);
        dataMinutes.textContent = formatCeros(minutes);
        dataSeconds.textContent = formatCeros(seconds);
      }, 1000);
    };
  },
};

flatpickr("#datetime-picker", options);

function formatCeros(data) {
    return String(data).padStart(2, '0');
};


function convertMs(ms) {
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
  }
  
