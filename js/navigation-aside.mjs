document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.header__nav-menu li a');
    const sections = document.querySelectorAll('section');
    const cloud = document.querySelector('.cloud');
    const nameElement = document.querySelector('.header__name');
    const heroSection = document.querySelector('#hero__section');
    const offset = 90;

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
                // Remove 'active' class from all links
                navLinks.forEach(link => link.parentElement.classList.remove('active'));

                // Add 'active' class to the current section's corresponding link
                const activeLink = document.querySelector(`.header__nav-menu li a[href="#${entry.target.id}"]`);
                if (activeLink) {
                    activeLink.parentElement.classList.add('active');
                    moveCloudToNavItem(activeLink);
                }
            }
        });
    }, {
        threshold: 0.5
    });

    // Observe each section
    sections.forEach(section => observer.observe(section));

    function moveCloudToNavItem(navItem) {
        const navItemRect = navItem.getBoundingClientRect();
        cloud.style.left = `${navItemRect.left}px`;
        cloud.style.width = `${navItemRect.width}px`;
    }

    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        const triggerPoint = 600; // Adjust this value for when you want the name to appear
    
        if (scrollPosition >= triggerPoint) {
            nameElement.classList.add('visible');
        } else {
            nameElement.classList.remove('visible');
        }
    });
    
});
