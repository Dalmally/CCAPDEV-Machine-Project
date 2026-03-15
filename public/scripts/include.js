// include.js
function includeHeader() {
  fetch('../components/header.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('header-placeholder').innerHTML = data;
    })
    .catch(error => console.error('Error loading header:', error));
}

// Run when page loads
document.addEventListener('DOMContentLoaded', includeHeader);