import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const inputDelay = document.querySelector('input[name="delay"]');
const inputStep = document.querySelector('input[name="step"]');
const inputAmount = document.querySelector('input[name="amount"]');

form.addEventListener('submit', startP);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({position, delay})
      };
      reject({position, delay})
    }, delay);
  });
};


function startP(){

  let delay = Number(inputDelay.value);
  let step = Number(inputStep.value);
  let amount = Number(inputAmount.value);
  let position = 0;

  for (let i = 1; i <= amount; i++) {
    position = i;

    createPromise(position, delay)
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`Promesa Cumplida ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`Promesa Rechazada ${position} in ${delay}ms`);
    });
    delay += step;
}};
