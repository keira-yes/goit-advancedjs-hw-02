import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const submitBtn = form.querySelector('button[type="submit"]');

const messageOptions = {
  messageColor: '#FFF6F4',
  position: 'topRight',
  timeout: 3000,
  animateInside: false,
  progressBar: false,
  transitionIn: 'fadeIn',
  transitionOut: 'fadeOut',
  close: false,
};

const handleSubmit = e => {
  e.preventDefault();

  const delay = form.elements.delay.value;
  const state = form.elements.state.value;

  form.reset();

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(delay => {
      iziToast.show({
        message: `✅ Fulfilled promise in ${delay}ms`,
        backgroundColor: '#33C682',
        ...messageOptions,
      });
    })
    .catch(delay => {
      iziToast.show({
        message: `❌ Rejected promise in ${delay}ms`,
        backgroundColor: '#FF736A',
        ...messageOptions,
      });
    });
};

submitBtn.addEventListener('click', handleSubmit);
