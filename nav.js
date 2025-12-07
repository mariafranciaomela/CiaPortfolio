/* nav.js - lightweight vanilla JS for navbar scroll effect and theme toggle */

document.addEventListener('DOMContentLoaded', function() {
    // Scroll effect: toggle sticky styles
    const navbar = document.getElementById('navbar');
    const navLogo = document.getElementById('nav-logo');
    const navCustomLinks = document.querySelectorAll('.nav-custom-link');
    const navbarBtns = document.querySelectorAll('.navbar-btn');

    function handleScroll() {
        const scrolled = window.scrollY || document.documentElement.scrollTop;
        if (scrolled > 86) {
            navbar.classList.add('sticky');
            navLogo && navLogo.classList.add('color-white');
            navCustomLinks.forEach(el => el.classList.add('color-white'));
            navbarBtns.forEach(el => el.classList.add('nav-btn-icon'));
        } else {
            navbar.classList.remove('sticky');
            navLogo && navLogo.classList.remove('color-white');
            navCustomLinks.forEach(el => el.classList.remove('color-white'));
            navbarBtns.forEach(el => el.classList.remove('nav-btn-icon'));
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Theme toggle: light-theme / dark-theme
    const themeToggle = document.getElementById('theme-toggle-btn');
    const body = document.body;

    function updateThemeIcon(theme) {
        if (!themeToggle) return;
        const icon = themeToggle.querySelector('i');
        if (!icon) return;
        // using Font Awesome v4 icon names
        if (theme === 'dark-theme') {
            icon.classList.remove('fa-moon-o');
            icon.classList.add('fa-sun-o');
        } else {
            icon.classList.remove('fa-sun-o');
            icon.classList.add('fa-moon-o');
        }
    }

    // Initialize theme from localStorage or existing class on body
    (function initTheme() {
        const saved = localStorage.getItem('theme');
        const defaultTheme = saved || (body.classList.contains('dark-theme') ? 'dark-theme' : 'light-theme');
        body.classList.remove('light-theme', 'dark-theme');
        body.classList.add(defaultTheme);
        updateThemeIcon(defaultTheme);
    })();

    if (themeToggle) {
        themeToggle.addEventListener('click', function(e) {
            e.preventDefault();
            const isDark = body.classList.contains('dark-theme');
            if (isDark) {
                body.classList.replace('dark-theme', 'light-theme');
                localStorage.setItem('theme', 'light-theme');
                updateThemeIcon('light-theme');
            } else {
                body.classList.replace('light-theme', 'dark-theme');
                localStorage.setItem('theme', 'dark-theme');
                updateThemeIcon('dark-theme');
            }
        });
    }
});