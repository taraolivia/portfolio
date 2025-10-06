/**
 * Navigation and cloud indicator module
 * @module navbar
 */

/**
 * Initializes navigation functionality including smooth scrolling, active section tracking, and cloud indicator
 */
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



    /**
     * Moves the cloud indicator to the active navigation item
     * @param {HTMLElement} navItem - The active navigation link element
     */
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

    /**
     * Toggles mobile navigation menu visibility
     */
    window.toggleMenu = function() {
        const navMenu = document.querySelector('.header__nav-menu');
        const hamburger = document.querySelector('.hamburger');
        const isActive = navMenu.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', isActive);
    };

    // Toggle Hamburger Menu
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.header__nav-menu');
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            window.toggleMenu();
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Prevent menu clicks from closing
        navMenu.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
}
