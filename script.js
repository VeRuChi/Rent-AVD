    document.addEventListener('DOMContentLoaded', function() {
    const steps = document.querySelectorAll('.step');

    const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
    if (entry.isIntersecting) {
    entry.target.style.opacity = '1';
    entry.target.style.transform = 'translateY(0)';
}
});
}, { threshold: 0.3 });

    steps.forEach(step => {
    step.style.opacity = '0';
    step.style.transform = 'translateY(30px)';
    step.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(step);
});
});
    document.addEventListener('DOMContentLoaded', function() {
        // Анимация для FAQ аккордеона
        const faqItems = document.querySelectorAll('.faq-ping');

        faqItems.forEach(item => {
            // Находим элемент с ответом рядом с текущим вопросом
            const answer = item.querySelector('.faq-answers');

            // Сначала скрываем все ответы
            if (answer) {
                answer.style.maxHeight = '0';
                answer.style.opacity = '0';
                answer.style.overflow = 'hidden';
                answer.style.transition = 'max-height 0.3s ease, opacity 0.3s ease';
            }

            // Вешаем обработчик клика на вопрос
            item.addEventListener('click', function() {
                // Закрываем все открытые ответы
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        const otherAnswer = otherItem.querySelector('.faq-answers');
                        if (otherAnswer) {
                            otherAnswer.style.maxHeight = '0';
                            otherAnswer.style.opacity = '0';
                        }
                    }
                });

                // Открываем/закрываем текущий ответ
                if (answer) {
                    if (answer.style.maxHeight === '0px' || answer.style.maxHeight === '') {
                        answer.style.maxHeight = answer.scrollHeight + 'px';
                        answer.style.opacity = '1';
                    } else {
                        answer.style.maxHeight = '0';
                        answer.style.opacity = '0';
                    }
                }
            });
        });
    });
    document.addEventListener('DOMContentLoaded', function() {
        const animatedSections = document.querySelectorAll('.main, .about, .FAQ, .steps, .contacts, .semifinal');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 }); // Сработает, когда 10% элемента видно

        animatedSections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(section);
        });
    });
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    function initModal() {
        const modal = document.getElementById('consultationModal');
        const openButtons = document.querySelectorAll('[data-modal="consultation"]');
        const closeButton = modal.querySelector('.modal__close');
        const form = document.getElementById('consultationForm');

        // Открытие модального окна
        openButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                openModal();
            });
        });

        // Закрытие модального окна
        closeButton.addEventListener('click', closeModal);
        modal.querySelector('.modal__overlay').addEventListener('click', closeModal);

        // Закрытие по ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });

        // Обработка отправки формы
        form.addEventListener('submit', handleFormSubmit);

        function openModal() {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Блокируем скролл страницы
        }

        function closeModal() {
            modal.classList.remove('active');
            document.body.style.overflow = ''; // Разблокируем скролл
            form.reset(); // Сбрасываем форму
        }

        function handleFormSubmit(e) {
            e.preventDefault();

            const formData = {
                name: form.name.value,
                phone: form.phone.value,
                message: form.message.value
            };

            // Здесь можно добавить отправку данных на сервер
            console.log('Данные формы:', formData);

            // Показываем сообщение об успехе
            alert('Спасибо! Ваша заявка принята. Мы свяжемся с вами в ближайшее время.');

            closeModal();
        }

        // Маска для телефона (опционально)
        const phoneInput = document.getElementById('phone');
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0) {
                value = '+7 (' + value;
                if (value.length > 7) value = value.slice(0, 7) + ') ' + value.slice(7);
                if (value.length > 12) value = value.slice(0, 12) + '-' + value.slice(12);
                if (value.length > 15) value = value.slice(0, 15) + '-' + value.slice(15);
            }
            e.target.value = value;
        });
    }

    // Инициализация при загрузке страницы
    document.addEventListener('DOMContentLoaded', function() {
        initModal();
    });
    function validateForm(formData) {
        const errors = [];

        if (!formData.name.trim()) errors.push('Укажите ваше имя');
        if (!formData.phone.trim()) errors.push('Укажите телефон');
        if (formData.phone.replace(/\D/g, '').length < 11) errors.push('Некорректный номер телефона');

        return errors;
    }
    function sendToTelegram(formData) {
        const botToken = 'YOUR_BOT_TOKEN';
        const chatId = 'YOUR_CHAT_ID';
        const text = `Новая заявка!\nИмя: ${formData.name}\nТелефон: ${formData.phone}\nСообщение: ${formData.message || 'Не указано'}`;

        fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: chatId, text: text })
        });
    }
    document.addEventListener('DOMContentLoaded', function() {
        console.log('DOM loaded'); // Проверка загрузки

        const burger = document.querySelector('.burger-menu');
        const menu = document.querySelector('.menu-container');
        const body = document.body;

        if (!burger || !menu) {
            console.error('Elements not found!');
            return;
        }

        console.log('Elements found:', burger, menu);

        // Клик по бургеру
        burger.addEventListener('click', function(e) {
            e.stopPropagation();
            console.log('Burger clicked');

            this.classList.toggle('active');
            menu.classList.toggle('active');
            body.classList.toggle('menu-open');
        });

        // Клик по ссылкам меню
        const menuLinks = document.querySelectorAll('.menu a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                burger.classList.remove('active');
                menu.classList.remove('active');
                body.classList.remove('menu-open');
            });
        });

        // Клик вне меню
        document.addEventListener('click', function(e) {
            if (menu.classList.contains('active') &&
                !menu.contains(e.target) &&
                !burger.contains(e.target)) {
                burger.classList.remove('active');
                menu.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });

        // ESC для закрытия
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && menu.classList.contains('active')) {
                burger.classList.remove('active');
                menu.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });

        // Закрытие при ресайзе
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                burger.classList.remove('active');
                menu.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });
    });