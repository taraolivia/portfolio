export function initializeNavAndCloud() {
    const navLinks = document.querySelectorAll('.header__nav-menu li a');
    const sections = document.querySelectorAll('section');
    const cloud = document.querySelector('.cloud');
    const nameElement = document.querySelector('.header__name');
    const activeSectionDisplay = document.querySelector('.active-section');
    const offset = 60;

    if (!navLinks.length || !sections.length || !nameElement || !activeSectionDisplay) {
        return;
    }

    // Smooth scrolling for anchor links
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                const sectionTop = targetSection.getBoundingClientRect().top + window.pageYOffset;

                window.scrollTo({
                    top: sectionTop - offset,
                    behavior: 'smooth'
                });

                // Close the hamburger menu on mobile after clicking a link
                const navMenu = document.querySelector('.header__nav-menu');
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                }
            }
        });
    });

    // Intersection Observer to detect section in view
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Clear all active states
                navLinks.forEach(link => link.parentElement.classList.remove('active'));
                cloud.classList.remove('active');
                
                const activeLink = document.querySelector(`.header__nav-menu li a[href="#${entry.target.id}"]`);
                
                if (activeLink) {
                    activeLink.parentElement.classList.add('active');
                    activeSectionDisplay.textContent = activeLink.textContent;
                    moveCloudToNavItem(activeLink);
                } else {
                    activeSectionDisplay.textContent = '';
                }
            }
        });
    }, { threshold: 0.2 });

    sections.forEach(section => observer.observe(section));

    function moveCloudToNavItem(navItem) {
        if (cloud && navItem) {
            const navItemRect = navItem.getBoundingClientRect();
            const navRect = document.querySelector('.header__nav-menu').getBoundingClientRect();
            
            cloud.style.left = `${navItemRect.left - navRect.left - 20}px`;
            cloud.style.width = `${navItemRect.width + 40}px`;
            cloud.classList.add('active');
        }
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
    });

    // Make toggleMenu globally accessible
    window.toggleMenu = function() {
        const navMenu = document.querySelector('.header__nav-menu');
        navMenu.classList.toggle('active');
    };

    // Toggle Hamburger Menu
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.header__nav-menu');
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', window.toggleMenu);
    }
}
