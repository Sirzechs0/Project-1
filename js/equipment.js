// --- EQUIPMENT CATEGORY SWITCHING ---
function showCategory(category) {
  // Hide all categories
  const categories = document.querySelectorAll('.equipment-category');
  categories.forEach(cat => cat.classList.remove('active'));
  
  // Show selected category
  const selectedCategory = document.getElementById(category);
  if (selectedCategory) {
    selectedCategory.classList.add('active');
  }
  
  // Update tab buttons
  const buttons = document.querySelectorAll('.tab-btn');
  buttons.forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
  
  // Scroll to top of category
  window.scrollTo({ top: 0, behavior: 'smooth' });
}