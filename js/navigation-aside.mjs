document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.scroll-div');
    const navItems = document.querySelectorAll('.header__nav-menu li a');
    const cloud = document.querySelector('.cloud');
    const firstNavItem = document.querySelector('.header__nav-menu li:first-child');
    const cloudPadding = 50;
    const headerName = document.querySelector('.header__name');
    const navHeight = document.querySelector('.header__nav').offsetHeight;
    let isScrollingWithLink = false;

    // Set initial cloud position
    function setInitialCloudPosition() {
        const navContainerRect = document.querySelector('.header__nav').getBoundingClientRect();
        const firstNavItemRect = firstNavItem.getBoundingClientRect();
        cloud.style.left = `${firstNavItemRect.left - navContainerRect.left - firstNavItemRect.width - cloudPadding}px`;
    }

    // Function to detect the current section based on scroll position
    function getCurrentSection() {
        let currentSection = '';
        const scrollPosition = window.scrollY + navHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        return currentSection;
    }

    // Function to update the nav item and cloud based on the current section
    function activateNavItem() {
        let currentSection = getCurrentSection();

        navItems.forEach(navItem => {
            const parentLi = navItem.parentElement;
            parentLi.classList.remove('active');

            if (navItem.getAttribute('href').includes(currentSection)) {
                parentLi.classList.add('active');

                // Move the cloud behind the active item
                const navItemRect = parentLi.getBoundingClientRect();
                const navContainerRect = document.querySelector('.header__nav').getBoundingClientRect();

                cloud.style.left = `${navItemRect.left - navContainerRect.left}px`;
                cloud.style.width = `${navItemRect.width}px`;

                // Show the name when not in hero section
                if (currentSection !== 'hero__section') {
                    headerName.classList.add('visible');
                }

                // Update the URL hash manually if scrolling manually
                if (!isScrollingWithLink) {
                    history.replaceState(null, null, `#${currentSection}`);
                }
            }
        });

        if (currentSection === 'hero__section') {
            setInitialCloudPosition();
            headerName.classList.remove('visible');
        }
    }

    // Smooth scrolling when clicking on a navigation link
    function smoothScroll(event) {
        event.preventDefault();
        isScrollingWithLink = true; // Prevent hash update during smooth scroll

        const targetId = event.currentTarget.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const topOffset = targetSection.offsetTop - navHeight;

            window.scrollTo({
                top: topOffset,
                behavior: 'smooth'
            });

            // Delay updating the URL hash until scroll completes
            setTimeout(() => {
                history.pushState(null, null, targetId);
                isScrollingWithLink = false;
            }, 600); // 600ms to match the smooth scroll duration
        }
    }

    // Detect if the page has a hash and scroll to the respective section on load
    if (window.location.hash) {
        const targetSection = document.querySelector(window.location.hash);
        if (targetSection) {
            const topOffset = targetSection.offsetTop - navHeight;
            window.scrollTo({
                top: topOffset,
                behavior: 'smooth'
            });
        }
    }

    // Listen for scrolling to update the active section
    window.addEventListener('scroll', activateNavItem);

    // Attach smooth scroll to navigation links
    navItems.forEach(navItem => {
        navItem.addEventListener('click', smoothScroll);
    });

    // Initial setup: activate the correct nav item and set the initial cloud position
    activateNavItem();
    setInitialCloudPosition();
});



