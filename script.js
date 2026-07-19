/* ══ Custom Cursor ══ */
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.transform = `translate(${mouseX - 6}px, ${mouseY - 6}px)`;
});

(function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.transform = `translate(${followerX - 18}px, ${followerY - 18}px)`;
    requestAnimationFrame(animateFollower);
})();

document.querySelectorAll('a, button, .btn, .services-box, .portfolio-box, .social-media a').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform += ' scale(2)';
        cursor.style.opacity = '0.6';
        follower.style.transform += ' scale(1.5)';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.opacity = '1';
    });
});

/* ══ Particle Background ══ */
(function createParticles() {
    const bg = document.getElementById('particles-bg');
    const colors = ['#00ffaa', '#00c8ff', '#7b2fff', '#ff4fcb', '#00e6fa', '#a0ffdd'];
    const count = 35;

    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const size = Math.random() * 4 + 1.5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const duration = Math.random() * 20 + 12;
        const delay = Math.random() * 15;
        const left = Math.random() * 100;

        Object.assign(p.style, {
            width: size + 'px',
            height: size + 'px',
            background: color,
            left: left + '%',
            animationDuration: duration + 's',
            animationDelay: delay + 's',
            boxShadow: `0 0 ${size * 3}px ${color}`,
            opacity: '0'
        });
        bg.appendChild(p);
    }
})();

/* ══ Navbar Toggle ══ */
const menuIcon = document.querySelector('#menu-icon');
const navbar   = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('fa-xmark');
    navbar.classList.toggle('active');
};

/* ══ Scroll: Active Links + Sticky Header ══ */
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');
const header   = document.querySelector('header');

window.addEventListener('scroll', () => {
    const top = window.scrollY;

    sections.forEach(sec => {
        const offset = sec.offsetTop - 160;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');
        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => link.classList.remove('active'));
            const active = document.querySelector(`header nav a[href*="${id}"]`);
            if (active) active.classList.add('active');
        }
    });

    header.classList.toggle('sticky', top > 80);

    // Close mobile nav on scroll
    menuIcon.classList.remove('fa-xmark');
    navbar.classList.remove('active');
});

/* ══ Scroll Reveal (custom lightweight) ══ */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, i * 80);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));

/* ══ ScrollReveal library animations ══ */
ScrollReveal({
    distance: '60px',
    duration: 1000,
    delay: 150,
    easing: 'cubic-bezier(0.25, 0.8, 0.25, 1)'
});

ScrollReveal().reveal('.home-content', { origin: 'left' });
ScrollReveal().reveal('.home-img',     { origin: 'right' });
ScrollReveal().reveal('.about-img',    { origin: 'left' });
ScrollReveal().reveal('.about-content',{ origin: 'right' });
ScrollReveal().reveal('.heading',      { origin: 'top', delay: 100 });
ScrollReveal().reveal('.services-box', { origin: 'bottom', interval: 150 });
ScrollReveal().reveal('.portfolio-box',{ origin: 'bottom', interval: 150 });
ScrollReveal().reveal('.contact form', { origin: 'bottom' });

/* ══ Typed.js ══ */
const typed = new Typed('.multiple-text', {
    strings: ['Frontend Developer', 'UI/UX Designer', 'Creative Coder', 'Problem Solver'],
    typeSpeed: 80,
    backSpeed: 60,
    backDelay: 1800,
    loop: true,
    cursorChar: '|'
});

/* ══ Smooth reveal on page load ══ */
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.6s ease';
    requestAnimationFrame(() => {
        document.body.style.opacity = '1';
    });
});

/* ══ 3D Tilt on Cards ══ */
document.querySelectorAll('.services-box, .portfolio-box').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width  / 2;
        const cy = rect.height / 2;
        const rotX = ((y - cy) / cy) * -6;
        const rotY = ((x - cx) / cx) *  6;
        card.style.transform = `translateY(-10px) perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

/* ══ Aurora orb that follows cursor subtly ══ */
const orb = document.createElement('div');
Object.assign(orb.style, {
    position: 'fixed',
    width: '500px',
    height: '500px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(0,255,170,0.06) 0%, transparent 70%)',
    pointerEvents: 'none',
    zIndex: '1',
    transform: 'translate(-50%,-50%)',
    transition: 'left 0.8s ease, top 0.8s ease',
    mixBlendMode: 'screen'
});
document.body.appendChild(orb);
document.addEventListener('mousemove', e => {
    orb.style.left = e.clientX + 'px';
    orb.style.top  = e.clientY + 'px';
});