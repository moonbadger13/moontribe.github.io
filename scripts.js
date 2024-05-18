document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('toggle-links');
    const funLinks = document.querySelector('.link-list:last-of-type');

    toggleButton.addEventListener('click', function() {
        if (funLinks.style.display === 'none' || funLinks.style.display === '') {
            funLinks.style.display = 'block';
            toggleButton.textContent = 'Show Less Links';
        } else {
            funLinks.style.display = 'none';
            toggleButton.textContent = 'Show More Links';
        }
    });

    // Initially hide the fun links
    funLinks.style.display = 'none';
});
