const skillsData = [
    { name: "JavaScript / ES6", icon: "fab fa-js" },
    { name: "jQuery", icon: "fab fa-js" },
    { name: "React / Next", icon: "fab fa-react" },
    { name: "Vue / Nuxt", icon: "fab fa-vuejs" },
    { name: "HTML5/CSS3", icon: "fab fa-html5" },
    { name: "Tailwind / SCSS", icon: "fab fa-css3-alt" },
    { name: "Node.js", icon: "fab fa-node-js" },
    { name: "Three.js", icon: "fas fa-cube" },
    { name: "Git & CI/CD", icon: "fab fa-git-alt" },
    { name: "Figma → Code", icon: "fab fa-figma" },
    { name: "PHP", icon: "fab fa-php" },
    { name: "Python", icon: "fab fa-python" }
];

const projectsData = [
    {
        title: "AnimeStream Portal",
        desc: "Стриминговая платформа для аниме с неоновым UI, рекомендательной системой и плеером на JS.",
        tech: ["React", "Node.js", "Socket.io", "jQuery"],
        iconEmoji: "🎬"
    },
    {
        title: "Kawaii Dashboard",
        desc: "Интерактивная админ-панель с 3D-графиками, аниме-виджетами и живой кастомизацией тем.",
        tech: ["Vue 3", "D3.js", "Chart.js", "jQuery"],
        iconEmoji: "🌸"
    },
    {
        title: "Cyberpunk RPG Hub",
        desc: "Лендинг для киберпанк-RPG с анимацией персонажей, параллаксом и эффектами на jQuery/GSAP.",
        tech: ["GSAP", "jQuery", "Three.js", "CSS3"],
        iconEmoji: "🎮"
    },
    {
        title: "AI Waifu Chatbot",
        desc: "Чат-бот с ИИ, имитирующий аниме-персонажа. Frontend на jQuery + интеграция с API.",
        tech: ["JavaScript", "jQuery", "Fetch API", "CSS"],
        iconEmoji: "🤖"
    },
    {
        title: "Sakura Blog CMS",
        desc: "Блог-платформа с админ-зоной на чистом JS, посты в стиле дзен и комментарии.",
        tech: ["jQuery", "LocalStorage", "Bootstrap"],
        iconEmoji: "🍃"
    },
    {
        title: "Pixel Anime Gallery",
        desc: "Галерея иллюстраций с фильтрацией, лайками и анимациями. Реактивность без фреймворков.",
        tech: ["jQuery", "Framer Motion", "CSS Grid"],
        iconEmoji: "🖼️"
    }
];

// Рендер скиллов
$(document).ready(function () {
    const skillsContainer = $('#skillsContainer');
    skillsData.forEach((skill, idx) => {
        const card = $(`<div class="skill-card" style="animation-delay: ${idx * 0.03}s">
                <i class="${skill.icon}"></i>
                <span>${skill.name}</span>
            </div>`);
        skillsContainer.append(card);
    });

    // Рендер проектов
    const projectsContainer = $('#projectsContainer');
    projectsData.forEach((proj, idx) => {
        const techHtml = proj.tech.map(t => `<span>${t}</span>`).join('');
        const card = $(`<div class="project-card" style="animation-delay: ${idx * 0.05}s">
                <div class="project-img">
                    <div style="font-size: 3.8rem;">${proj.iconEmoji}</div>
                </div>
                <div class="project-info">
                    <h3>${proj.title}</h3>
                    <p>${proj.desc}</p>
                    <div class="tech-stack">${techHtml}</div>
                </div>
            </div>`);
        projectsContainer.append(card);
    });

    const typingElement = document.getElementById('typingEffect');
    const roles = [
        "Full-Stack разработка",
        "Descktop-разработка",
        "Аналитика",
        "Графика и фото",
        "UI/UX",
    ];
    let roleIndex = 0, charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        if (typingElement.style.width === '' || typingElement.innerHTML.length === 0) {
            typingElement.style.width = 'auto';
            const maxWidth = Math.max(...roles.map(r => r.length)) * 12 + 20;
            typingElement.style.width = maxWidth + 'px';
        }

        const currentRole = roles[roleIndex];

        if (!isDeleting) {
            typingElement.innerHTML = currentRole.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === currentRole.length) {
                isDeleting = true;
                setTimeout(typeEffect, 3000);
                return;
            }
        } else {
            typingElement.innerHTML = currentRole.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                setTimeout(typeEffect, 300);
                return;
            }
        }
        setTimeout(typeEffect, isDeleting ? 50 : 100);
    }
    typeEffect();

    // ----- Обработка контактной формы с анимацией и сохранением в localStorage-----
    $('#contactForm').on('submit', function (e) {
        e.preventDefault();
        const name = $('#name').val().trim();
        const email = $('#email').val().trim();
        const message = $('#message').val().trim();

        if (!name || !email || !message) {
            showToast('Пожалуйста, заполните все поля!!!', 'error');
            $('#formStatus').html('<span style="color:#ffaaaa;"><i class="fas fa-exclamation-triangle"></i> Все поля обязательны!</span>');
            setTimeout(() => $('#formStatus').html(''), 3000);
            return;
        }

        if (!email.match(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)) {
            showToast('Введите корректный email', 'error');
            $('#formStatus').html('<span style="color:#ffaaaa;"><i class="fas fa-envelope"></i> Неверный email</span>');
            setTimeout(() => $('#formStatus').html(''), 3000);
            return;
        }

        // Сохраняем сообщение в localStorage (имитация бэкенда)
        const messages = JSON.parse(localStorage.getItem('anime_contacts') || '[]');
        messages.push({
            id: Date.now(),
            name: name,
            email: email,
            message: message,
            date: new Date().toLocaleString()
        });
        localStorage.setItem('anime_contacts', JSON.stringify(messages));

        // Очистка формы
        $('#name').val('');
        $('#email').val('');
        $('#message').val('');

        // Показываем успех
        $('#formStatus').html('<span style="color:#aaffaa;"><i class="fas fa-check-circle"></i> Сообщение отправлено! Сенпай скоро ответит ✨</span>');
        showToast('Сообщение успешно отправлено!', 'success');
        setTimeout(() => $('#formStatus').html(''), 4000);
    });

    // Функция всплывающего тоста
    function showToast(text, type = 'info') {
        const toast = $('#toastMsg');
        toast.html(`<i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i> ${text}`);
        toast.addClass('show');
        setTimeout(() => {
            toast.removeClass('show');
        }, 3000);
    }

    // Плавный скролл для якорей
    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        const target = $(this.attr('href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 20
            }, 600);
        }
    });

    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    let particlesArray = [];

    function resizeCanvas() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 2.5 + 0.8;
            this.speedX = (Math.random() - 0.5) * 0.35;
            this.speedY = (Math.random() - 0.5) * 0.25 + 0.08;
            this.color = `rgba(255, ${100 + Math.random() * 120}, 200, ${Math.random() * 0.5 + 0.2})`;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0) this.x = width;
            if (this.x > width) this.x = 0;
            if (this.y < 0) this.y = height;
            if (this.y > height) this.y = 0;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    function initParticles(count = 150) {
        for (let i = 0; i < count; i++) {
            particlesArray.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, width, height);
        particlesArray.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animateParticles);
    }

    initParticles(140);
    animateParticles();

    $('.project-card').on('mouseenter', function () {
        $(this).css('transition', 'all 0.2s');
    });
});