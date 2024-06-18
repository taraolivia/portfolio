document.addEventListener('DOMContentLoaded', () => {
    const projectMenuItems = document.querySelectorAll('.project-menu li');
    const projectContent = document.getElementById('project-content');
    const projectSection = document.querySelector('section.scroll-div#my-projects__section');

    const projects = {
        project1: {
            title: "Game Hub: the universe of games",
            description: "",
            images: ["/assets/photos/projects/game-hub-hero.png"],
            links: ["https://taraolivia.github.io/GameHub-taraolivia-js_integration/index.html"],
            backgroundImage: "/assets/photos/projects/hero-image-game-hub.jpg"
        },
        project2: {
            title: "Galaxy Garden Community Museum",
            description: "Come join us at the Community Science Museum where we’re committed to making science accessible to all. The aim of our museum is to create a space where everyone can experience the wonders of our discoveries and perhaps even ignite a lifelong passion to continue the exploration of the world around us.",
            images: ["/assets/photos/projects/galaxy-garden-hero.png"],
            links: ["https://taraolivia.github.io/semester-project-tara-bjorheim/index.html"],
            backgroundImage: "/assets/photos/projects/galaxy-garden-background.png" 
        },
        project3: {
            title: "Project 3",
            description: "Description for project 3",
            images: ["image5.jpg", "image6.jpg"],
            links: ["http://example.com/project3"],
            backgroundImage: "/assets/photos/background/project3-bg.jpg"
        }
    };

    projectMenuItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all items
            projectMenuItems.forEach(i => i.classList.remove('active'));
            // Add active class to clicked item
            item.classList.add('active');

            // Get the project data
            const projectKey = item.getAttribute('data-project');
            const project = projects[projectKey];

            // Display the project details
            if (project) {
                projectContent.innerHTML = `
                    <h2>${project.title}</h2>
                    <p>${project.description}</p>
                    <div class="gallery">
                        ${project.images.map(img => `<img src="${img}" alt="${project.title}">`).join('')}
                    </div>
                    <div class="links">
                        ${project.links.map(link => `<a href="${link}" target="_blank">${link}</a>`).join('')}
                    </div>
                `;

                // Change the section's background image
                projectSection.style.backgroundImage = `url(${project.backgroundImage})`;
                projectSection.style.backgroundRepeat = `no-repeat`;
                projectSection.style.backgroundSize = `cover`;

            }
        });
    });
});
