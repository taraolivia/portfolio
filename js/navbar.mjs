export function initializeNavAndCloud() {
    const navLinks = document.querySelectorAll('.header__nav-menu li a');
    const sections = document.querySelectorAll('section');
    const cloud = document.querySelector('.cloud');
    const nameElement = document.querySelector('.header__name');
    const offset = 90;

    if (!navLinks || !sections || !cloud || !nameElement) {
        console.error("Navigation elements not found");
        return;
    }

    // Smooth scrolling for anchor links
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            const sectionTop = targetSection.getBoundingClientRect().top + window.pageYOffset;

            window.scrollTo({
                top: sectionTop - offset,
                behavior: 'smooth'
            });
        });
    });

    // Intersection Observer to detect section in view
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => link.parentElement.classList.remove('active'));

                const activeLink = document.querySelector(`.header__nav-menu li a[href="#${entry.target.id}"]`);
                if (activeLink) {
                    activeLink.parentElement.classList.add('active');
                    moveCloudToNavItem(activeLink);
                }
            }
        });
    }, { threshold: 0.5 });

    sections.forEach(section => observer.observe(section));

    function moveCloudToNavItem(navItem) {
        const navItemRect = navItem.getBoundingClientRect();
        cloud.style.left = `${navItemRect.left}px`;
        cloud.style.width = `${navItemRect.width}px`;
    }

    // Show/Hide the name based on scroll position
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        const triggerPoint = 600;

        if (scrollPosition >= triggerPoint) {
            nameElement.classList.add('visible');
        } else {
            nameElement.classList.remove('visible');
        }

        const activeLink = document.querySelector('.header__nav-menu li.active a');
        if (activeLink) {
            const activeText = activeLink.textContent;
            document.querySelector('.active-section').textContent = activeText;
        }
    });

    // Toggle Hamburger Menu
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.header__nav-menu');
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
}
