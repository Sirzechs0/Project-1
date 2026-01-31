// --- MISSION FILTERING ---
function filterMissions(category) {
  const entries = document.querySelectorAll('.log-entry');
  const buttons = document.querySelectorAll('.filter-btn');
  
  // Update active button
  buttons.forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
  
  // Filter mission logs
  entries.forEach(entry => {
    const status = entry.getAttribute('data-status');
    
    if (category === 'all') {
      entry.style.display = 'block';
    } else if (category === 'active' && status === 'active') {
      entry.style.display = 'block';
    } else if (category === 'complete' && status === 'complete') {
      entry.style.display = 'block';
    } else if (category === 'critical' && entry.classList.contains('active-mission')) {
      entry.style.display = 'block';
    } else {
      entry.style.display = 'none';
    }
  });
}