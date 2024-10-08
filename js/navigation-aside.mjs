document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.scroll-div');
    const navItems = document.querySelectorAll('.header__nav-menu li a');
    const cloud = document.querySelector('.cloud');
    const firstNavItem = document.querySelector('.header__nav-menu li:first-child'); // First nav item after hero section
    const cloudPadding = 50; // Add padding here
    const headerName = document.querySelector('.header__name');
    const heroSection = document.querySelector('#hero__section');


    // Set initial cloud position for hero section
    function setInitialCloudPosition() {
        const navContainerRect = document.querySelector('.header__nav').getBoundingClientRect();
        const firstNavItemRect = firstNavItem.getBoundingClientRect();

        // Position the cloud just to the left of the first visible nav item, with added padding
        cloud.style.left = `${firstNavItemRect.left - navContainerRect.left - firstNavItemRect.width - cloudPadding}px`;
    }

    function activateNavItem() {
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (window.scrollY >= sectionTop - sectionHeight / 3) {
                currentSection = section.getAttribute('id');
            }
        });

        navItems.forEach(navItem => {
            const parentLi = navItem.parentElement;
            parentLi.classList.remove('active');
            
            if (navItem.getAttribute('href').includes(currentSection)) {
                parentLi.classList.add('active');
                
                // Move the cloud behind the active item
                const navItemRect = parentLi.getBoundingClientRect();
                const navContainerRect = document.querySelector('.header__nav').getBoundingClientRect();

                // Update cloud position and width based on the active item
                cloud.style.left = `${navItemRect.left - navContainerRect.left}px`;
                cloud.style.width = `${navItemRect.width}px`;

                // If the cloud reaches "About me" or any section after, show the name
                if (navItem.getAttribute('href') === "#about-me__section" || window.scrollY >= document.querySelector("#about-me__section").offsetTop) {
                    headerName.classList.add('visible');
                }
            }
        });

        // Special case: if currentSection is hero__section, set cloud to initial position and hide the name
        if (currentSection === 'hero__section') {
            setInitialCloudPosition();
            headerName.classList.remove('visible'); // Hide the name while in the hero section
        }
    }

    function smoothScroll(event) {
        event.preventDefault();
        const targetId = event.currentTarget.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        const topOffset = targetSection.offsetTop - document.querySelector('.header__nav').offsetHeight;

        window.scrollTo({
            top: topOffset,
            behavior: 'smooth'
        });
    }

    window.addEventListener('scroll', activateNavItem);
    activateNavItem(); // Initial call to set the active item and cloud position
    setInitialCloudPosition(); // Set the cloud position on page load

    navItems.forEach(navItem => {
        navItem.addEventListener('click', smoothScroll);
    });
});
