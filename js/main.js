import { initializeNavAndCloud } from './navbar.mjs';
import { initializeImageSlider } from './aboutMeCarousel.mjs';

window.onload = function() {
  const loadingScreen = document.getElementById('loading-screen');
  loadingScreen.classList.add('hide'); // Add the class to hide the loading screen
};


document.addEventListener('DOMContentLoaded', () => {
  initializeNavAndCloud();
  initializeImageSlider();

  const noTabsMessage = document.getElementById('noTabsMessage');
  const tabContent = document.querySelectorAll('.tab-content');
  const tabLinks = document.querySelectorAll('.tab-link');

  // Initially hide all tab content and remove active classes
  tabContent.forEach(content => content.style.display = 'none');
  tabLinks.forEach(link => link.classList.remove('active'));

  // Load the last active tab from localStorage or show the noTabsMessage
  const lastActiveTab = localStorage.getItem('activeTab');
  if (lastActiveTab && document.getElementById(lastActiveTab)) {
    document.getElementById(lastActiveTab).style.display = 'block';
    document.querySelector(`[data-tab="${lastActiveTab}"]`).classList.add('active');
    noTabsMessage.style.display = 'none';  // Hide the message since a tab is active
  } else {
    noTabsMessage.style.display = 'block';  // Show the message if no tabs are active
  }

  // Add event listeners to all tab links
  tabLinks.forEach(link => {
    link.addEventListener('click', function(event) {
      const tabName = this.getAttribute('data-tab');
      toggleTab(event, tabName);
    });
  });

  // Add event listeners to close-tab buttons (if they exist)
  const closeTabButtons = document.querySelectorAll('.close-tab-button');
  closeTabButtons.forEach(button => {
    button.addEventListener('click', closeTab);
  });
});

document.addEventListener('DOMContentLoaded', function() {
  adjustBackgroundContainers();
});

function adjustBackgroundContainers() {
  const contentHeight = document.body.scrollHeight; // Total height of the content
  const viewportHeight = window.innerHeight; // Height of the viewport
  const bgContainerHeight = viewportHeight; // Each bg-container is 100vh
  const requiredContainers = Math.ceil(contentHeight / bgContainerHeight + 1); // Add 1 extra container to ensure coverage

  const bgContainerParent = document.body;
  
  // Select all bg-containers, excluding the loading screen
  let existingContainers = Array.from(document.querySelectorAll('.bg-container')).filter(container => container.id !== 'loading-screen');
  const currentContainers = existingContainers.length;

  // Add more containers if there aren't enough
  if (currentContainers < requiredContainers) {
    for (let i = currentContainers; i < requiredContainers; i++) {
      const newContainer = document.createElement('div');
      newContainer.classList.add('bg-container');
      
      // Alternate between 'normal' and 'flipped' class
      if (i % 2 === 0) {
        newContainer.classList.add('normal');
      } else {
        newContainer.classList.add('flipped');
      }
      
      bgContainerParent.appendChild(newContainer);
    }
  }

  // Remove extra containers if there are too many
  if (currentContainers > requiredContainers) {
    for (let i = currentContainers - 1; i >= requiredContainers; i--) {
      existingContainers[i].remove();
    }
  }
}





function toggleTab(evt, tabName) {
  const noTabsMessage = document.getElementById('noTabsMessage');
  const currentTabContent = document.getElementById(tabName);
  const currentTabLink = evt.currentTarget;

  // If the tab is already open, close it
  if (currentTabContent.style.display === 'block') {
    closeTab();
    return;
  }

  // Hide all tabs and remove active classes from all links
  const tabContent = document.querySelectorAll('.tab-content');
  tabContent.forEach(content => content.style.display = 'none');

  const tabLinks = document.querySelectorAll('.tab-link');
  tabLinks.forEach(link => link.classList.remove('active'));

  // Show the clicked tab and add the active class to the clicked link
  currentTabContent.style.display = 'block';
  currentTabLink.classList.add('active');

  // Save the active tab in localStorage
  localStorage.setItem('activeTab', tabName);

  // Hide the "Open a tab to learn more" message
  noTabsMessage.style.display = 'none';

  // Scroll to the top of the tabs section with an offset
  const tabsSection = document.querySelector('.tabs');
  const offset = 100;  // Adjust the offset to your needs
  const sectionTop = tabsSection.getBoundingClientRect().top + window.pageYOffset;

  window.scrollTo({
    top: sectionTop - offset,
    behavior: 'smooth'
  });
}

function closeTab() {
  const noTabsMessage = document.getElementById('noTabsMessage');

  // Hide all tabs and remove active state from all links
  const tabContent = document.querySelectorAll('.tab-content');
  tabContent.forEach(content => content.style.display = 'none');

  const tabLinks = document.querySelectorAll('.tab-link');
  tabLinks.forEach(link => link.classList.remove('active'));

  // Remove the active tab from localStorage
  localStorage.removeItem('activeTab');

  // Show the "Open a tab to learn more" message
  noTabsMessage.style.display = 'block';

  // Scroll back to the top of the tabs section with an offset
  const tabsSection = document.querySelector('.tabs');
  const offset = 100;  // Adjust the offset as needed
  const sectionTop = tabsSection.getBoundingClientRect().top + window.pageYOffset;

  window.scrollTo({
    top: sectionTop - offset,
    behavior: 'smooth'
  });
}
