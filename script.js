// Vietnamese Police Database Investigation Game
// Client-side JavaScript for puzzle functionality

// Update current time in header
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('vi-VN', { hour12: false });
    const timeElement = document.getElementById('current-time');
    if (timeElement) {
        timeElement.textContent = timeString;
    }
}

// Navigation handler for main page folder clicks
function navigateToAct(actPage) {
    const folder = event.target.closest('.evidence-folder');
    if (folder && folder.classList.contains('locked')) {
        // Show locked message
        const lockMessage = folder.querySelector('.lock-message');
        if (lockMessage) {
            lockMessage.style.animation = 'shake 0.5s ease-in-out';
            setTimeout(() => {
                lockMessage.style.animation = '';
            }, 500);
        }
        return; // Don't navigate
    }
    window.location.href = actPage;
}

// Update folder states based on completion
function updateFolderStates() {
    const currentPage = window.location.pathname.split('/').pop();
    
    // Only update on main page
    if (currentPage === 'index.html' || currentPage === '') {
        const act2Folder = document.getElementById('act2-folder');
        const act3Folder = document.getElementById('act3-folder');
        const act4Folder = document.getElementById('act4-folder');
        
        // Check Act 1 completion
        if (localStorage.getItem('act1_completed') === 'true') {
            if (act2Folder) {
                act2Folder.classList.remove('locked');
            }
        }
        
        // Check Act 2 completion
        if (localStorage.getItem('act2_completed') === 'true') {
            if (act3Folder) {
                act3Folder.classList.remove('locked');
            }
        }
        
        // Check Act 3 completion
        if (localStorage.getItem('act3_completed') === 'true') {
            if (act4Folder) {
                act4Folder.classList.remove('locked');
            }
        }
    }
}

// Initialize time update and folder states
document.addEventListener('DOMContentLoaded', function() {
    updateTime();
    setInterval(updateTime, 1000);
    updateFolderStates();
});

// ACT 1 - Caesar Cipher Puzzle
// Expected answer: "SOYTIET IS GUILTY OF CARD THEFT"
function checkAct1Answer() {
    const input = document.getElementById('act1-answer');
    const result = document.getElementById('act1-result');
    const act2Link = document.getElementById('act2-link');
    
    if (!input || !result) return;
    
    const answer = input.value.toUpperCase().trim();
    const correctAnswer = "INNOCENTPERSON";
    
    if (answer === correctAnswer) {
        result.textContent = "✓ CORRECT! Access granted to ACT 2.";
        result.className = "result-message success";
        
        // Enable ACT 2 link
        if (act2Link) {
            act2Link.classList.remove('disabled');
            act2Link.style.pointerEvents = 'auto';
        }
        
        // Store progress
        localStorage.setItem('act1_completed', 'true');
    } else {
        result.textContent = "✗ INCORRECT. Try again. Remember: Caesar cipher with shift of 3.";
        result.className = "result-message error";
    }
}

// ACT 2 - Number to Letter Conversion
// Expected answer: "PIKACHU"
function checkAct2Answer() {
    const input = document.getElementById('act2-answer');
    const result = document.getElementById('act2-result');
    const act3Link = document.getElementById('act3-link');
    
    if (!input || !result) return;
    
    const answer = input.value.toUpperCase().trim();
    const correctAnswer = "SCALPERS";
    
    if (answer === correctAnswer) {
        result.textContent = "✓ CORRECT! Security code accepted. Access granted to ACT 3.";
        result.className = "result-message success";
        
        // Enable ACT 3 link
        if (act3Link) {
            act3Link.classList.remove('disabled');
            act3Link.style.pointerEvents = 'auto';
        }
        
        // Store progress
        localStorage.setItem('act2_completed', 'true');
    } else {
        result.textContent = "✗ INCORRECT. Convert each number to its corresponding letter (A=1, B=2, etc.).";
        result.className = "result-message error";
    }
}

// ACT 3 - Password Construction
// Expected answer: "BULBASAUR19901"
function checkAct3Answer() {
    const input = document.getElementById('act3-answer');
    const result = document.getElementById('act3-result');
    const act4Link = document.getElementById('act4-link');
    
    if (!input || !result) return;
    
    const answer = input.value.toUpperCase().trim();
    const correctAnswer = "95288361";
    
    if (answer === correctAnswer) {
        result.textContent = "✓ CORRECT! Phone unlocked. Accessing messages... Access granted to ACT 4.";
        result.className = "result-message success";
        
        // Enable ACT 4 link
        if (act4Link) {
            act4Link.classList.remove('disabled');
            act4Link.style.pointerEvents = 'auto';
        }
        
        // Store progress
        localStorage.setItem('act3_completed', 'true');
    } else {
        result.textContent = "✗ INCORRECT. Format: FirstPokemon + YearOfBirth + LastDigitOfCaseNumber";
        result.className = "result-message error";
    }
}

// ACT 4 - Final Master Code
// Expected answer: "JUSTICEPOKEMONSOLVED"
function checkAct4Answer() {
    const input = document.getElementById('act4-answer');
    const result = document.getElementById('act4-result');
    const finalMessage = document.getElementById('final-message');
    
    if (!input || !result) return;
    
    const answer = input.value.toUpperCase().trim();
    const correctAnswer = "JUSTICE FOR COLLECTORS";
    
    if (answer === correctAnswer) {
        result.textContent = "✓ MASTER CODE ACCEPTED! Case officially closed.";
        result.className = "result-message success";
        
        // Show final message
        if (finalMessage) {
            finalMessage.style.display = 'block';
            finalMessage.scrollIntoView({ behavior: 'smooth' });
        }
        
        // Store completion
        localStorage.setItem('act4_completed', 'true');
        localStorage.setItem('case_completed', 'true');
        
        // Add celebration effect
        setTimeout(() => {
            document.body.style.animation = 'celebration 2s ease-in-out';
        }, 1000);
    } else {
        result.textContent = "✗ INCORRECT. Enter The Master Code";
        result.className = "result-message error";
    }
}

// Check progress on page load
document.addEventListener('DOMContentLoaded', function() {
    // Check if previous acts are completed and enable links accordingly
    const currentPage = window.location.pathname.split('/').pop();
    
    if (currentPage === 'act2.html' || currentPage === 'act3.html' || currentPage === 'act4.html') {
        // Enable previous act links if completed
        if (localStorage.getItem('act1_completed') === 'true') {
            const act2Link = document.getElementById('act2-link');
            if (act2Link) {
                act2Link.classList.remove('disabled');
                act2Link.style.pointerEvents = 'auto';
            }
        }
        
        if (localStorage.getItem('act2_completed') === 'true') {
            const act3Link = document.getElementById('act3-link');
            if (act3Link) {
                act3Link.classList.remove('disabled');
                act3Link.style.pointerEvents = 'auto';
            }
        }
        
        if (localStorage.getItem('act3_completed') === 'true') {
            const act4Link = document.getElementById('act4-link');
            if (act4Link) {
                act4Link.classList.remove('disabled');
                act4Link.style.pointerEvents = 'auto';
            }
        }
    }
});

// Add keyboard support for inputs
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const activeElement = document.activeElement;
        if (activeElement && activeElement.classList.contains('puzzle-input')) {
            const actNumber = activeElement.id.match(/act(\d+)/);
            if (actNumber) {
                const actNum = actNumber[1];
                const checkFunction = window[`checkAct${actNum}Answer`];
                if (checkFunction) {
                    checkFunction();
                }
            }
        }
    }
});

// Celebration animation is now handled in CSS

// Video reveal function for Act 4
function revealVideo() {
    const videoPrompt = document.getElementById('video-prompt');
    const videoContainer = document.getElementById('video-container');
    
    if (videoPrompt && videoContainer) {
        videoPrompt.style.display = 'none';
        videoContainer.style.display = 'block';
        videoContainer.scrollIntoView({ behavior: 'smooth' });
    }
}

// Show box message after video ends
function showBoxMessage() {
    const boxMessage = document.getElementById('box-message');
    if (boxMessage) {
        boxMessage.style.display = 'block';
        boxMessage.scrollIntoView({ behavior: 'smooth' });
    }
}

// Debug function for development (remove in production)
function debugUnlockAll() {
    localStorage.setItem('act1_completed', 'true');
    localStorage.setItem('act2_completed', 'true');
    localStorage.setItem('act3_completed', 'true');
    localStorage.setItem('act4_completed', 'true');
    location.reload();
}

// Console welcome message
console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║                    VIETNAM POLICE INVESTIGATION DATABASE                     ║
║                                                                              ║
║  Welcome, Detective! You are now accessing the classified investigation      ║
║  system. Your mission: Solve the case of Soytiet and the stolen Pokémon     ║
║  card through careful analysis of evidence and solving puzzles.             ║
║                                                                              ║
║  Good luck with your investigation!                                          ║
╚══════════════════════════════════════════════════════════════════════════════╝
`);
