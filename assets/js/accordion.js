/* accordion.js — reusable accordion behaviour */

function initAccordions() {
  document.querySelectorAll('.accordion__trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.accordion__item');
      const isOpen = item.classList.contains('is-open');
      // Optional: close others in same accordion
      const accordion = item.closest('.accordion');
      accordion.querySelectorAll('.accordion__item.is-open').forEach(open => {
        if (open !== item) open.classList.remove('is-open');
      });
      item.classList.toggle('is-open', !isOpen);
    });
  });
}

function initTodos() {
  document.querySelectorAll('.todo-check').forEach(check => {
    check.addEventListener('click', () => {
      const item = check.closest('.todo-item');
      item.classList.toggle('is-done');
    });
  });
}
