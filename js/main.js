/**
 * Main entry point for portfolio website functionality
 * @module main
 */

import { initializeNavAndCloud } from './navbar.mjs?v=20260609';
import { initializeImageSlider } from './aboutMeCarousel.mjs?v=20260609';

// Prevent scrolling during loading
document.body.classList.add('no-scroll');
const backgroundContainerSelector = '.bg-container:not(#loading-screen)';

/**
 * Handles loading screen fade out and re-enables scrolling
 */
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(() => {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      loadingScreen.classList.add('hide');
    }
    document.body.classList.remove('no-scroll');
  }, 250);
});

/**
 * Dynamically adjusts the number of background containers based on content height
 */
function adjustBackgroundContainers() {
  const contentContainer = document.querySelector(backgroundContainerSelector);
  if (!contentContainer) {
    return;
  }

  const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 1;
  const contentHeight = Math.max(contentContainer.scrollHeight, viewportHeight);
  const requiredContainers = Math.ceil(contentHeight / viewportHeight);
  const existingContainers = Array.from(document.querySelectorAll(backgroundContainerSelector));
  const fillerContainers = existingContainers.slice(1);
  const requiredFillers = Math.max(0, requiredContainers - 1);

  if (fillerContainers.length < requiredFillers) {
    for (let i = fillerContainers.length; i < requiredFillers; i++) {
      const newContainer = document.createElement('div');
      newContainer.classList.add('bg-container');
      if ((i + 1) % 2 === 0) {
        newContainer.classList.add('normal');
      } else {
        newContainer.classList.add('flipped');
      }
      document.body.appendChild(newContainer);
    }
  }

  if (fillerContainers.length > requiredFillers) {
    for (let i = fillerContainers.length - 1; i >= requiredFillers; i--) {
      fillerContainers[i].remove();
    }
  }
}

let backgroundAdjustmentFrame;
function scheduleBackgroundAdjustment() {
  if (backgroundAdjustmentFrame) {
    cancelAnimationFrame(backgroundAdjustmentFrame);
  }

  backgroundAdjustmentFrame = requestAnimationFrame(() => {
    adjustBackgroundContainers();
    backgroundAdjustmentFrame = null;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  scheduleBackgroundAdjustment();

  const observedContent = document.querySelector('main') || document.querySelector(backgroundContainerSelector);
  if ('ResizeObserver' in window && observedContent) {
    const resizeObserver = new ResizeObserver(scheduleBackgroundAdjustment);
    resizeObserver.observe(observedContent);
  } else {
    window.addEventListener('load', scheduleBackgroundAdjustment, { once: true });
  }
});
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(scheduleBackgroundAdjustment, 250);
}, { passive: true });

/**
 * Initializes all interactive components on page load
 */
document.addEventListener('DOMContentLoaded', () => {
  initializeNavAndCloud();
  initializeImageSlider();

  const noTabsMessage = document.getElementById('noTabsMessage');
  const tabContent = document.querySelectorAll('.tab-content');
  const tabLinks = document.querySelectorAll('.tab-link');

  if (!noTabsMessage || tabContent.length === 0 || tabLinks.length === 0) {
    return;
  }

  // Initially hide all tab content and remove active states
  tabContent.forEach(content => content.style.display = 'none');
  tabLinks.forEach(link => {
    link.classList.remove('active');
    link.setAttribute('aria-selected', 'false');
  });

  // Load the last active tab from localStorage, falling back to Skills
  const defaultActiveTab = 'skills';
  const savedActiveTab = localStorage.getItem('activeTab');
  const savedTabContent = savedActiveTab ? document.getElementById(savedActiveTab) : null;
  const savedTabLink = savedActiveTab ? document.querySelector(`[data-tab="${savedActiveTab}"]`) : null;
  const initialActiveTab = savedTabContent && savedTabLink ? savedActiveTab : defaultActiveTab;
  const activeTabContent = document.getElementById(initialActiveTab);
  const activeTabLink = document.querySelector(`[data-tab="${initialActiveTab}"]`);

  if (savedActiveTab && initialActiveTab !== savedActiveTab) {
    localStorage.removeItem('activeTab');
  }

  if (activeTabContent && activeTabLink) {
    activeTabContent.style.display = 'block';
    activeTabLink.classList.add('active');
    activeTabLink.setAttribute('aria-selected', 'true');
    noTabsMessage.style.display = 'none';  // Hide the message since a tab is active
  } else {
    localStorage.removeItem('activeTab');
    noTabsMessage.style.display = 'block';  // Show the message if no tabs are active
  }

  // Add event listeners to all tab links
  tabLinks.forEach(link => {
    link.addEventListener('click', function(event) {
      const tabName = this.getAttribute('data-tab');
      toggleTab(event, tabName);
      setTimeout(adjustBackgroundContainers, 100);
    });
  });

  // Add event listeners to close-tab buttons (if they exist)
  const closeTabButtons = document.querySelectorAll('.close-tab-button');
  closeTabButtons.forEach(button => {
    button.addEventListener('click', () => {
      closeTab();
      setTimeout(adjustBackgroundContainers, 100);
    });
  });
});



/**
 * Toggles tab visibility and manages active states
 * @param {Event} evt - Click event
 * @param {string} tabName - ID of the tab to toggle
 */
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
  tabLinks.forEach(link => {
    link.classList.remove('active');
    link.setAttribute('aria-selected', 'false');
  });

  // Show the clicked tab and add the active class to the clicked link
  currentTabContent.style.display = 'block';
  currentTabLink.classList.add('active');
  currentTabLink.setAttribute('aria-selected', 'true');

  // Save the active tab in localStorage
  localStorage.setItem('activeTab', tabName);

  // Hide the "Open a tab to learn more" message
  noTabsMessage.style.display = 'none';

  // Scroll to the top of the tabs section with an offset
  const tabsSection = document.querySelector('.tabs');
  if (!tabsSection) {
    return;
  }
  const offset = 100;  // Adjust the offset to your needs
  const sectionTop = tabsSection.getBoundingClientRect().top + window.pageYOffset;

  window.scrollTo({
    top: sectionTop - offset,
    behavior: 'smooth'
  });
}

/**
 * Closes all tabs and shows the default message
 */
function closeTab() {
  const noTabsMessage = document.getElementById('noTabsMessage');

  // Hide all tabs and remove active state from all links
  const tabContent = document.querySelectorAll('.tab-content');
  tabContent.forEach(content => content.style.display = 'none');

  const tabLinks = document.querySelectorAll('.tab-link');
  tabLinks.forEach(link => {
    link.classList.remove('active');
    link.setAttribute('aria-selected', 'false');
  });

  // Remove the active tab from localStorage
  localStorage.removeItem('activeTab');

  // Show the "Open a tab to learn more" message
  noTabsMessage.style.display = 'block';

  // Scroll back to the top of the tabs section with an offset
  const tabsSection = document.querySelector('.tabs');
  if (!tabsSection) {
    return;
  }
  const offset = 100;  // Adjust the offset as needed
  const sectionTop = tabsSection.getBoundingClientRect().top + window.pageYOffset;

  window.scrollTo({
    top: sectionTop - offset,
    behavior: 'smooth'
  });
}
