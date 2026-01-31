// --- REAL-TIME CLOCK ---
function updateClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  
  const clockElement = document.getElementById('clock');
  if (clockElement) {
    clockElement.textContent = `${hours}:${minutes}:${seconds}`;
  }
}

// Update clock every second
setInterval(updateClock, 1000);
updateClock(); // Initial call

// --- MISSION LOG TOGGLE ---
function toggleLog(element) {
  element.classList.toggle('expanded');
}

// --- DYNAMIC STATS COUNTER ---
function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

// Animate stats on load
window.addEventListener('load', () => {
  const threatsElement = document.getElementById('threats');
  const missionsElement = document.getElementById('missions');
  const powerElement = document.getElementById('power');
  
  if (threatsElement) animateCounter(threatsElement, 5, 1500);
  if (missionsElement) animateCounter(missionsElement, 47, 2000);
  if (powerElement) animateCounter(powerElement, 100, 1800);
});

// --- LOCATION CYCLING ---
const locations = [
  'GOTHAM_CITY',
  'WAYNE_MANOR',
  'BATCAVE',
  'ARKHAM_ASYLUM',
  'GCPD_HQ'
];

let locationIndex = 0;

function cycleLocation() {
  locationIndex = (locationIndex + 1) % locations.length;
  const locationElement = document.getElementById('location');
  if (locationElement) {
    locationElement.style.opacity = '0';
    setTimeout(() => {
      locationElement.textContent = locations[locationIndex];
      locationElement.style.opacity = '1';
    }, 200);
  }
}

// Cycle location every 5 seconds
setInterval(cycleLocation, 5000);

// Add transition to location element
window.addEventListener('load', () => {
  const locationElement = document.getElementById('location');
  if (locationElement) {
    locationElement.style.transition = 'opacity 0.3s ease';
  }
});

// --- EQUIPMENT BAR ANIMATION ---
window.addEventListener('load', () => {
  const equipmentFills = document.querySelectorAll('.equipment-fill');
  
  // Reset widths to 0
  equipmentFills.forEach(fill => {
    const targetWidth = fill.style.width;
    fill.setAttribute('data-target', targetWidth);
    fill.style.width = '0';
  });
  
  // Animate after a delay
  setTimeout(() => {
    equipmentFills.forEach((fill, index) => {
      setTimeout(() => {
        fill.style.width = fill.getAttribute('data-target');
      }, index * 100);
    });
  }, 500);
});

// --- KEYBOARD SHORTCUTS ---
document.addEventListener('keydown', (e) => {
  // Press 'L' to expand all logs
  if (e.key === 'l' || e.key === 'L') {
    const logs = document.querySelectorAll('.log-entry');
    const allExpanded = Array.from(logs).every(log => log.classList.contains('expanded'));
    
    logs.forEach(log => {
      if (allExpanded) {
        log.classList.remove('expanded');
      } else {
        log.classList.add('expanded');
      }
    });
  }
  
  // Press 'ESC' to collapse all logs
  if (e.key === 'Escape') {
    const logs = document.querySelectorAll('.log-entry');
    logs.forEach(log => log.classList.remove('expanded'));
  }
});

// --- RANDOM STAT FLUCTUATION (Simulate Activity) ---
setInterval(() => {
  const powerElement = document.getElementById('power');
  if (powerElement && Math.random() > 0.7) {
    const currentPower = parseInt(powerElement.textContent);
    const fluctuation = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
    const newPower = Math.max(95, Math.min(100, currentPower + fluctuation));
    powerElement.textContent = newPower;
  }
}, 3000);

// --- CARD INTERACTION SOUND EFFECT (Visual Feedback) ---
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      // Add a subtle scale effect on the content
      const content = card.querySelector('.card-content');
      if (content) {
        content.style.transform = 'translateY(0) scale(1.02)';
      }
    });
    
    card.addEventListener('mouseleave', () => {
      const content = card.querySelector('.card-content');
      if (content) {
        content.style.transform = 'translateY(100%) scale(1)';
      }
    });
  });
});

// --- CONSOLE EASTER EGG ---
console.log('%c⚠️ WAYNE ENTERPRISES SECURITY ALERT ⚠️', 'color: #f1c40f; font-size: 20px; font-weight: bold; background: #05070a; padding: 10px;');
console.log('%cUNAUTHORIZED ACCESS DETECTED', 'color: #ff3333; font-size: 16px; font-weight: bold;');
console.log('%cUser credentials required for access to Batcomputer mainframe.', 'color: #00f0ff; font-size: 12px;');
console.log('%cAll activity is being monitored and logged.', 'color: #999; font-size: 10px;');
console.log('%c\nTip: Press "L" to toggle all mission logs', 'color: #f1c40f; font-size: 12px; font-style: italic;');

// --- PERFORMANCE MONITORING ---
if (performance && performance.navigation) {
  window.addEventListener('load', () => {
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    console.log(`%cSystem Boot Time: ${loadTime}ms`, 'color: #00ff41; font-size: 10px;');
  });
}
// --- NAVIGATION TOGGLE ---
function toggleNav() {
  const navMenu = document.querySelector('.nav-menu');
  if (navMenu) {
    navMenu.classList.toggle('active');
  }
}

// Close nav when clicking outside
document.addEventListener('click', (e) => {
  const nav = document.querySelector('.main-nav');
  const navMenu = document.querySelector('.nav-menu');
  
  if (navMenu && nav && !nav.contains(e.target) && navMenu.classList.contains('active')) {
    navMenu.classList.remove('active');
  }
});