export function initializePortfolio() {
    const categoryHeaders = document.querySelectorAll('.category-header');
    const submitButton = document.getElementById('submitButton');
    const portfolioContent = document.getElementById('personalizedPortfolioContent');

    if (!categoryHeaders || !submitButton || !portfolioContent) {
        console.error("Portfolio elements not found");
        return;
    }

    // Category expand/collapse functionality
    categoryHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            content.style.display = content.style.display === 'block' ? 'none' : 'block';
        });
    });

    // Handle form submission to generate personalized portfolio
    submitButton.addEventListener('click', function() {
        const selectedAnswers = [];
        const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
        portfolioContent.innerHTML = ''; // Clear previous content

        // Gather selected answers
        checkboxes.forEach(checkbox => {
            let answerContent = '';
            switch (checkbox.value) {
                case 'currentJob':
                    answerContent = `<h3>What do you currently do for work?</h3><p>I am an Administrative Coordinator at the Stavanger Region European Office in Brussels...</p>`;
                    break;
                case 'professionalExperience':
                    answerContent = `<h3>How has your professional experience shaped your approach to front-end development?</h3><p>Working in various administrative roles taught me the importance of organization, communication...</p>`;
                    break;
                case 'careerChallenge':
                    answerContent = `<h3>What has been your biggest challenge in your career so far?</h3><p>The biggest challenge was transitioning from administrative work into front-end development...</p>`;
                    break;
                case 'alternativeCareer':
                    answerContent = `<h3>If you weren’t a developer, what would you be doing?</h3><p>If I weren’t a developer, I’d probably be working in a creative field like design or psychology...</p>`;
                    break;
                case 'workingInBrussels':
                    answerContent = `<h3>What’s your favorite part of working in Brussels?</h3><p>The diversity of cultures and the international environment make working in Brussels so exciting...</p>`;
                    break;
                // Add other cases as needed
            }

            selectedAnswers.push(answerContent);
        });

        if (selectedAnswers.length === 0) {
            portfolioContent.innerHTML = `<p>No questions selected. Please choose some questions to generate your personalized portfolio.</p>`;
        } else {
            selectedAnswers.forEach(answer => {
                portfolioContent.innerHTML += answer;
            });
        }
    });
}
