import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', onHandleSubmit);

function onHandleSubmit(evt) {
  evt.preventDefault();

  const input = evt.target.elements;
  let delay = +input.delay.value;
  const delayStep = +input.step.value;
  const amount = +input.amount.value;

  for(let position = 1; position <= amount; position += 1) {

    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });

      delay += delayStep;
  };
    
}

function createPromise(position, delay) {
  
  return new Promise((resolve, reject) => {
      const shouldResolve = Math.random() > 0.3;

      setTimeout(() => {
        if (shouldResolve) {
          resolve({ position, delay });
        } else {
          reject({ position, delay });
        }
      }, delay);
  })
};
