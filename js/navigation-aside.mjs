document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.scroll-link');
    const sections = document.querySelectorAll('.scroll-div');
    const cloud = document.querySelector('.cloud');
    const offset = 100;

    // Smooth scrolling for anchor links (unchanged)
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1); // Get the ID without the #
            const targetSection = document.getElementById(targetId);
            const sectionTop = targetSection.getBoundingClientRect().top + window.pageYOffset;

            window.scrollTo({
                top: sectionTop - offset, // Adjust based on nav height or desired offset
                behavior: 'smooth'
            });
        });
    });

    // Intersection Observer to detect section in view (modified)
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove 'active' class from all links
                navLinks.forEach(link => link.classList.remove('active'));

                // Add 'active' class to the current section's corresponding link
                const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                    moveCloudToNavItem(activeLink); // Move the cloud to the active nav item
                }
            }
        });
    }, {
        threshold: [0.05, 0.5], // You can tweak this for the section visibility
        rootMargin: "-38% 0px -38% 0px" // Adjust based on your layout
    });

    // Observe each section
    sections.forEach(section => observer.observe(section));

    function moveCloudToNavItem(navItem) {
        const navItemRect = navItem.getBoundingClientRect();
        cloud.style.left = `${navItemRect.left}px`;
        cloud.style.width = `${navItemRect.width}px`;
    }
    
});
