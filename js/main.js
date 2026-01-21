const popup = document.getElementById('popup');
const openBtns = [document.getElementById('openForm'), document.getElementById('openForm2')];
const closePopup = document.getElementById('closePopup');
const form = document.getElementById('form');
const success = document.getElementById('success');

const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');

burger.onclick = () => {
  burger.classList.toggle('active');
  mobileMenu.classList.toggle('active');
};



openBtns.forEach(btn => {
  if (btn) btn.onclick = () => popup.style.display = 'flex';
});

closePopup.onclick = () => popup.style.display = 'none';

form.onsubmit = e => {
  e.preventDefault();

  const formData = new FormData(form);

  fetch('send.php', {
    method: 'POST',
    body: formData
  })
  .then(() => {
    form.style.display = 'none';
    success.style.display = 'block';

    setTimeout(() => {
      popup.style.display = 'none';
      form.reset();
      form.style.display = 'block';
      success.style.display = 'none';
    }, 3000);
  });
};



const openBtn = document.getElementById('openContact');
const modal = document.getElementById('contactOptions');
const closeBtn = document.getElementById('closeContact');
const owerfloydiv = document.querySelector('.owerfloy-div'); // элемент для overlay

// Открытие модалки
openBtn.addEventListener('click', () => {
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden'; // блокируем скролл
  if(owerfloydiv) {
    owerfloydiv.classList.add('active'); // добавляем класс active
  }
});

// Закрытие модалки
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
  document.body.style.overflow = ''; // восстанавливаем скролл
  if(owerfloydiv) {
    owerfloydiv.classList.remove('active'); // убираем класс active
  }
});

// Закрытие при клике вне модалки
window.addEventListener('click', (e) => {
  if(e.target === modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
    if(owerfloydiv) {
      owerfloydiv.classList.remove('active');
    }
  }
});

// Текущий год
document.getElementById('year').textContent = new Date().getFullYear();


