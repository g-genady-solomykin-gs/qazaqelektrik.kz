class UIController {
  constructor() {
    this.body = document.body;
    this.overlay = document.getElementById('pageOverlay');
    this.burger = document.getElementById('burger');
    this.mobileMenu = document.getElementById('mobileMenu');
    
    this.contactModal = document.getElementById('contactOptions');
    this.btnOpenContact = document.getElementById('openContact');
    this.btnCloseContact = document.getElementById('closeContact');
    
    this.leadPopup = document.getElementById('popup');
    this.btnClosePopup = document.getElementById('closePopup');
    this.leadForm = document.getElementById('leadForm');
    this.successMsg = document.getElementById('successMessage');

    this.init();
  }

  init() {
    this.bindEvents();
    this.setCurrentYear();
  }

  bindEvents() {
    if (this.burger) {
      this.burger.addEventListener('click', () => this.toggleMobileMenu());
    }

    if (this.overlay) {
      this.overlay.addEventListener('click', () => this.closeAllModals());
    }

    if (this.btnOpenContact) {
      this.btnOpenContact.addEventListener('click', () => this.openContactModal());
    }

    if (this.btnCloseContact) {
      this.btnCloseContact.addEventListener('click', () => this.closeAllModals());
    }

    if (this.btnClosePopup) {
      this.btnClosePopup.addEventListener('click', () => this.closeAllModals());
    }

    if (this.leadForm) {
      this.leadForm.addEventListener('submit', (e) => this.handleFormSubmit(e));
    }
  }

  toggleMobileMenu() {
    const isActive = this.mobileMenu.classList.toggle('active');
    this.burger.classList.toggle('active', isActive);
    this.burger.setAttribute('aria-expanded', isActive);
    this.toggleOverlay(isActive);
  }

  openContactModal() {
    this.contactModal.style.display = 'block';
    this.toggleOverlay(true);
    this.btnOpenContact.setAttribute('aria-expanded', 'true');
  }

  closeAllModals() {
    if (this.mobileMenu.classList.contains('active')) {
      this.mobileMenu.classList.remove('active');
      this.burger.classList.remove('active');
      this.burger.setAttribute('aria-expanded', 'false');
    }

    this.contactModal.style.display = 'none';
    this.leadPopup.style.display = 'none';
    if (this.btnOpenContact) this.btnOpenContact.setAttribute('aria-expanded', 'false');

    this.toggleOverlay(false);
  }

  toggleOverlay(isActive) {
    if (isActive) {
      this.overlay.classList.add('active');
      this.body.style.overflow = 'hidden';
    } else {
      this.overlay.classList.remove('active');
      this.body.style.overflow = '';
    }
  }

  async handleFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData(this.leadForm);

    try {
      const response = await fetch('send.php', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        this.leadForm.style.display = 'none';
        this.successMsg.style.display = 'block';

        setTimeout(() => {
          this.closeAllModals();
          this.leadForm.reset();
          this.leadForm.style.display = 'block';
          this.successMsg.style.display = 'none';
        }, 3000);
      } else {
        alert('Ошибка при отправке. Пожалуйста, попробуйте связаться через WhatsApp.');
      }
    } catch (error) {
      console.error('Ошибка отправки формы:', error);
      alert('Ошибка соединения. Пожалуйста, попробуйте позже.');
    }
  }

  setCurrentYear() {
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
      yearSpan.textContent = new Date().getFullYear();
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new UIController();
});