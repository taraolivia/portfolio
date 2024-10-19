export function initializeNavAndCloud() {
    const navLinks = document.querySelectorAll('.header__nav-menu li a');
    const sections = document.querySelectorAll('section');
    const nameElement = document.querySelector('.header__name');
    const activeSectionDisplay = document.querySelector('.active-section');
    const offset = 90;

    if (!navLinks.length || !sections.length || !nameElement || !activeSectionDisplay) {
        console.error("Navigation elements not found");
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
                navLinks.forEach(link => link.parentElement.classList.remove('active'));

                const activeLink = document.querySelector(`.header__nav-menu li a[href="#${entry.target.id}"]`);
                
                // Only show the current active section, otherwise display nothing
                if (activeLink) {
                    activeLink.parentElement.classList.add('active');
                    activeSectionDisplay.textContent = activeLink.textContent; // Set active section text
                } else {
                    activeSectionDisplay.textContent = ''; // Clear text if no matching section
                }
            }
        });
    }, { threshold: 0.3 });

    sections.forEach(section => observer.observe(section));

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

    // Toggle Hamburger Menu
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.header__nav-menu');
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
}
