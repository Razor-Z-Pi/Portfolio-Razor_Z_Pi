// ==================== ДАННЫЕ ДЛЯ САЙТА (ЛЕГКО РЕДАКТИРОВАТЬ) ====================
// Список скиллов — добавляй/удаляй/меняй здесь
const skillsData = [
    { name: "PHP / Laravel", icon: "fab fa-php" },
    { name: "JavaScript", icon: "fab fa-js" },
    { name: "TypeScript", icon: "fab fa-js" },
    { name: "React / Next", icon: "fab fa-react" },
    { name: "Vue / Nuxt", icon: "fab fa-vuejs" },
    { name: "Python", icon: "fab fa-python" },
    { name: "HTML5/CSS3", icon: "fab fa-html5" },
    { name: "Node.js", icon: "fab fa-node-js" },
    { name: "Three.js", icon: "fas fa-cube" },
    { name: "MySQL", icon: "fas fa-database" },
    { name: "PostgreSQL", icon: "fas fa-database" },
    { name: "MSSQlServer", icon: "fas fa-database" },
    { name: "Git & CI/CD", icon: "fab fa-git-alt" },
    { name: "Docker", icon: "fab fa-docker" }
];

// ПРОЕКТЫ — обновляй здесь напрямую (изображение, описание, технологии)
const projectsData = [
    {
        title: "AnimeStream Portal",
        desc: "Стриминговая платформа для аниме с неоновым UI, рекомендательной системой и комментариями в реальном времени.",
        tech: ["React", "Node.js", "MongoDB", "Socket.io"],
        iconEmoji: "🎬",
        bgEmoji: "📺"
    },
    {
        title: "Kawaii Dashboard",
        desc: "Интерактивная админ-панель с 3D-графиками, аниме-виджетами и живой кастомизацией тем.",
        tech: ["Vue 3", "D3.js", "PHP", "Tailwind"],
        iconEmoji: "🌸",
        bgEmoji: "📊"
    },
    {
        title: "Cyberpunk RPG Hub",
        desc: "Лендинг для киберпанк-RPG с анимацией персонажей, параллаксом и системой регистрации через PHP.",
        tech: ["GSAP", "PHP", "Three.js", "MySQL"],
        iconEmoji: "🎮",
        bgEmoji: "🤖"
    },
    {
        title: "AI Waifu Chatbot",
        desc: "Чат-бот с ИИ, имитирующий аниме-персонажа. Интеграция с OpenAI API и голосовые команды.",
        tech: ["Python", "Flask", "JS", "WebSocket"],
        iconEmoji: "🤖",
        bgEmoji: "💬"
    },
    {
        title: "Sakura Blog CMS",
        desc: "Полноценная блог-платформа с админ-зоной, постами в стиле дзен и комментариями.",
        tech: ["PHP", "MySQL", "Bootstrap", "jQuery"],
        iconEmoji: "🍃",
        bgEmoji: "📝"
    },
    {
        title: "Pixel Anime Gallery",
        desc: "Галерея иллюстраций с фильтрацией, лайками и анимациями перехода. React + Framer Motion.",
        tech: ["React", "Framer Motion", "Firebase"],
        iconEmoji: "🖼️",
        bgEmoji: "✨"
    }
];

// Рендер скиллов
const skillsContainer = document.getElementById('skillsContainer');
skillsData.forEach((skill, idx) => {
    const card = document.createElement('div');
    card.className = 'skill-card';
    card.style.animationDelay = `${idx * 0.03}s`;
    card.innerHTML = `<i class="${skill.icon}"></i><span>${skill.name}</span>`;
    skillsContainer.appendChild(card);
});

// Рендер проектов
const projectsContainer = document.getElementById('projectsContainer');
projectsData.forEach((proj, idx) => {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.style.animationDelay = `${idx * 0.05}s`;
    card.innerHTML = `
            <div class="project-img">
                <div style="font-size: 3.8rem;">${proj.iconEmoji}</div>
            </div>
            <div class="project-info">
                <h3>${proj.title}</h3>
                <p>${proj.desc}</p>
                <div class="tech-stack">
                    ${proj.tech.map(t => `<span>${t}</span>`).join('')}
                </div>
            </div>
        `;
    projectsContainer.appendChild(card);
});

// Эффект печатающего текста (аниме-динамика)
const typingElement = document.getElementById('typingEffect');
const roles = [
    "Full-Stack",
    "Аниме энтузиаст",
    "UI/UX",
    "PHP и JS"
];
let roleIndex = 0, charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentRole = roles[roleIndex];
    if (!isDeleting) {
        typingElement.innerHTML = currentRole.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === currentRole.length) {
            isDeleting = true;
            setTimeout(typeEffect, 2000);
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

function initParticles(count = 160) {
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

// Плавный скролл для якорей
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});