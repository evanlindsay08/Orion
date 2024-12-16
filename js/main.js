// Main JavaScript file
document.addEventListener('DOMContentLoaded', function() {
    // Typing effect for title
    const typingText = document.querySelector('.typing-text');
    const text = 'Orion';
    let charIndex = 0;
    
    function typeText() {
        if (charIndex < text.length) {
            let char = text.charAt(charIndex);
            if (charIndex >= 5) { // For 'Nix' part
                typingText.innerHTML += `<span style="font-weight: 300">${char}</span>`;
            } else { // For 'Neuro' part
                typingText.innerHTML += char;
            }
            charIndex++;
            setTimeout(typeText, 500); // 500ms per character (8 chars * 0.5s = 4s total)
        } else {
            typingText.style.borderRight = 'none'; // Remove cursor when typing is complete
        }
    }
    
    setTimeout(typeText, 1000); // Start typing after 1 second

    const startButton = document.querySelector('.action-button.green');
    const conduitButton = document.querySelector('.action-button.white');
    const commandLines = document.querySelectorAll('.command-line');

    // Add typing effect to command lines
    commandLines.forEach((line, index) => {
        setTimeout(() => {
            line.classList.add('typing');
        }, 500 + (index * 700));
    });

    // Show buttons after last command line appears
    setTimeout(() => {
        startButton.classList.add('active');
    }, 3600);

    // Show conduit button slightly later
    setTimeout(() => {
        conduitButton.classList.add('active');
    }, 3800);

    startButton.addEventListener('click', function() {
        document.body.classList.add('fade-out');
        setTimeout(() => {
            window.location.href = 'main.html';
        }, 1000);
    });

    // Contract copy functionality
    document.querySelector('.contract-button').addEventListener('click', async function(e) {
        e.preventDefault();
        const contractAddress = this.querySelector('.contract-text').textContent;
        const copyIcon = this.querySelector('.copy-icon');
        const originalIcon = copyIcon.innerHTML;

        try {
            await navigator.clipboard.writeText(contractAddress);
            this.style.background = 'rgba(0, 0, 0, 0.7)';
            this.style.opacity = '1';
            copyIcon.innerHTML = '<span style="position: relative; top: -1px;">✓</span>';
            
            setTimeout(() => {
                this.style.background = 'rgba(0, 0, 0, 0.5)';
                this.style.opacity = '0.6';
                copyIcon.innerHTML = originalIcon;
            }, 3000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    });

    // Handle all navigation and button clicks
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a[href], button[onclick*="location"], .action-button, .social-button, .purchase-button, .configure-button, .submit-button');
        if (!link) return;

        // Get target URL
        let targetUrl = link.href;
        if (!targetUrl && link.getAttribute('onclick')) {
            const onclickValue = link.getAttribute('onclick');
            const match = onclickValue.match(/window\.location\.href='([^']+)'/);
            if (match) targetUrl = match[1];
        }

        // Handle internal navigation
        if (targetUrl && !targetUrl.startsWith('http')) {
            e.preventDefault();
            
            // Add fade out effect
            document.body.style.opacity = '0';
            
            // Navigate after transition
            setTimeout(() => {
                window.location.href = targetUrl;
            }, 100);
        }
    });

    // Add fade in effect when page loads
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 10);

    // Add transition style to body
    document.body.style.transition = 'opacity 0.1s ease';
});

// Handle back/forward browser buttons
window.addEventListener('popstate', function() {
    document.body.style.opacity = '0';
    setTimeout(() => {
        window.location.reload();
    }, 100);
}); 