document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.scroll-div');
    const navItems = document.querySelectorAll('.header__nav-menu li a');

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
            navItem.parentElement.classList.remove('active');
            if (navItem.getAttribute('href').includes(currentSection)) {
                navItem.parentElement.classList.add('active');
            }
        });
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
    activateNavItem(); // Call the function initially to set the active item based on the initial scroll position

    navItems.forEach(navItem => {
        navItem.addEventListener('click', smoothScroll);
    });
});
