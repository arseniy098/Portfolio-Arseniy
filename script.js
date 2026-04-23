document.addEventListener('DOMContentLoaded', () => {

    const navbar = document.getElementById('navbar');
    const navLinks = document.getElementById('navLinks');
    const navToggle = document.getElementById('navToggle');
    const allLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    /* ---- Navbar scroll ---- */
    function onScroll() {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    }
    window.addEventListener('scroll', onScroll, { passive: true });

    /* ---- Mobile menu ---- */
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('open');
        document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    allLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    /* ---- Smooth scroll ---- */
    allLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const el = document.querySelector(link.getAttribute('href'));
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        });
    });

    document.querySelector('.nav-logo').addEventListener('click', e => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });




    /* ---- Active link ---- */
    function setActive() {
        let current = '';

        // If at bottom of page, activate last section
        if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight - 50) {
            current = sections[sections.length - 1].id;
        } else {
            sections.forEach(sec => {
                if (window.scrollY >= sec.offsetTop - 140) current = sec.id;
            });
        }

        allLinks.forEach(l => {
            l.classList.remove('active');
            if (l.dataset.section === current) l.classList.add('active');
        });
    }
    window.addEventListener('scroll', setActive, { passive: true });

    /* ---- Reveal on scroll ---- */
    const reveals = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    const revealObs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('revealed');
                revealObs.unobserve(e.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => revealObs.observe(el));

    /* ---- Counter animation ---- */
    
    const nums = document.querySelectorAll('.stat-number[data-target]');
    const numObs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                const el = e.target;
                const end = parseFloat(el.dataset.target);
                const isFloat = end % 1 !== 0;
                const dur = 1600;
                const t0 = performance.now();
                (function tick(now) {
                    const p = Math.min((now - t0) / dur, 1);
                    const val = (1 - Math.pow(1 - p, 3)) * end;
                    el.textContent = isFloat ? val.toFixed(1).replace('.', ',') : Math.round(val);
                    if (p < 1) requestAnimationFrame(tick);
                })(t0);
                numObs.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    nums.forEach(n => numObs.observe(n));




    /* ---- Parallax on hero glows ---- */
    const glows = document.querySelectorAll('.hero-glow');
    window.addEventListener('mousemove', e => {
        const x = (e.clientX / innerWidth - 0.5) * 2;
        const y = (e.clientY / innerHeight - 0.5) * 2;
        glows.forEach((g, i) => {
            const s = (i + 1) * 14;
            g.style.transform = `translate(${x * s}px, ${y * s}px)`;
        });
    }, { passive: true });

    onScroll();
    setActive();
});
