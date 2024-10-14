import { initializePortfolio } from './personalized-portfolio.mjs';
import { initializeNavAndCloud } from './navbar.mjs';
import { initializeImageSlider } from './aboutMeCarousel.mjs';



document.addEventListener('DOMContentLoaded', () => {
  initializePortfolio();
  initializeNavAndCloud();
  initializeImageSlider();
});

function openTab(evt, tabName) {
  // Hide all tab contents
  let tabContent = document.querySelectorAll('.tab-content');
  tabContent.forEach(content => content.style.display = 'none');

  // Remove "active" class from all tab links
  let tabLinks = document.querySelectorAll('.tab-link');
  tabLinks.forEach(link => link.classList.remove('active'));

  // Show the selected tab and mark the clicked tab as active
  document.getElementById(tabName).style.display = 'block';
  evt.currentTarget.classList.add('active');
}

document.addEventListener('DOMContentLoaded', () => {
  // Initialize by showing the default active tab
  document.getElementById('skills').style.display = 'block';
});



