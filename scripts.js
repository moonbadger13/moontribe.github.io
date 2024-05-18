// scripts.js

document.addEventListener('DOMContentLoaded', (event) => {
    const toggleButton = document.getElementById('toggle-links');
    const linkLists = document.querySelectorAll('.link-list li');

    toggleButton.addEventListener('click', () => {
        linkLists.forEach(link => {
            const description = link.textContent.split('-')[1];
            if (description) {
                const trimmedDescription = description.trim();
                if (link.innerHTML.includes(trimmedDescription)) {
                    link.innerHTML = link.innerHTML.split('-')[0];
                } else {
                    link.innerHTML += ` - ${trimmedDescription}`;
                }
            }
        });
    });
});