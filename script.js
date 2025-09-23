// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Calculator Functions
function calculateAttendance() {
    const attended = parseInt(document.getElementById('attended').value) || 0;
    const total = parseInt(document.getElementById('total').value) || 0;
    const target = parseFloat(document.getElementById('target').value) || 75;
    
    // Validation
    if (total === 0) {
        alert('Please enter a valid number for total classes');
        return;
    }
    
    if (attended > total) {
        alert('Classes attended cannot be more than total classes');
        return;
    }
    
    if (target < 0 || target > 100) {
        alert('Target percentage should be between 0 and 100');
        return;
    }
    
    // Calculate current percentage
    const currentPercentage = (attended / total) * 100;
    
    // Get result elements
    const resultDiv = document.getElementById('result');
    const currentPercentageDiv = document.getElementById('currentPercentage');
    const statusMessageDiv = document.getElementById('statusMessage');
    const recommendationDiv = document.getElementById('recommendation');
    const progressFill = document.getElementById('progressFill');
    
    // Update current percentage display
    currentPercentageDiv.textContent = `${currentPercentage.toFixed(1)}% Current Attendance`;
    
    // Update progress bar
    progressFill.style.width = `${Math.min(currentPercentage, 100)}%`;
    
    // Calculate and display results
    let statusMessage = '';
    let recommendation = '';
    let resultClass = '';
    
    if (currentPercentage >= target) {
        // Above or at target
        resultClass = 'success';
        statusMessage = `🎉 Excellent! You've achieved your target of ${target}%`;
        
        // Calculate how many classes can be missed
        let canMiss = 0;
        let futureTotal = total;
        
        while (attended / (futureTotal + 1) * 100 >= target && futureTotal < total + 100) {
            canMiss++;
            futureTotal++;
        }
        
        if (canMiss > 0) {
            recommendation = `You can afford to miss up to ${canMiss} future classes and still maintain your ${target}% target. Stay consistent with your attendance!`;
        } else {
            recommendation = `You need to attend all upcoming classes to maintain your ${target}% target. Keep up the good work!`;
        }
    } else {
        // Below target
        resultClass = 'warning';
        statusMessage = `⚠️ You need to improve your attendance to reach ${target}%`;
        
        // Calculate lectures needed to reach target
        if (target < 100) {
            const lecturesNeeded = Math.ceil((target * total - 100 * attended) / (100 - target));
            
            if (lecturesNeeded > 0) {
                const newTotal = total + lecturesNeeded;
                const newAttended = attended + lecturesNeeded;
                const newPercentage = (newAttended / newTotal * 100);
                
                recommendation = `You need to attend the next ${lecturesNeeded} consecutive classes without missing any to reach ${target}%. This will bring your attendance to ${newPercentage.toFixed(1)}%.`;
            } else {
                recommendation = `You're very close to your target! Just attend a few more classes consistently.`;
            }
        } else {
            const classesNeeded = total - attended;
            recommendation = `To achieve 100% attendance, you need to attend all remaining classes. You cannot miss any of the upcoming ${classesNeeded} classes.`;
        }
    }
    
    // Apply results
    statusMessageDiv.textContent = statusMessage;
    recommendationDiv.textContent = recommendation;
    resultDiv.className = `result-container ${resultClass}`;
    
    // Show result with animation
    resultDiv.style.display = 'block';
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function resetCalculator() {
    // Clear all input fields
    document.getElementById('attended').value = '';
    document.getElementById('total').value = '';
    document.getElementById('target').value = '75';
    
    // Hide result
    document.getElementById('result').style.display = 'none';
    
    // Reset progress bar
    document.getElementById('progressFill').style.width = '0%';
}

// Input validation
document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('input', function() {
        // Prevent negative values
        if (this.value < 0) this.value = 0;
        
        // Limit target percentage to 100
        if (this.id === 'target' && this.value > 100) this.value = 100;
        
        // Prevent attended classes from exceeding total
        if (this.id === 'attended') {
            const total = parseInt(document.getElementById('total').value) || 0;
            if (total > 0 && this.value > total) {
                this.value = total;
            }
        }
        
        // Update attended when total is changed and attended exceeds it
        if (this.id === 'total') {
            const attended = parseInt(document.getElementById('attended').value) || 0;
            if (attended > this.value) {
                document.getElementById('attended').value = this.value;
            }
        }
    });
});

// Enter key support
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        const target = e.target;
        if (target.matches('#attended, #total, #target')) {
            calculateAttendance();
        }
    }
});

// Auto-calculate on input change (optional - can be enabled/disabled)
let autoCalculateTimeout;
document.querySelectorAll('#attended, #total, #target').forEach(input => {
    input.addEventListener('input', function() {
        // Clear previous timeout
        clearTimeout(autoCalculateTimeout);
        
        // Set new timeout for auto-calculate (uncomment to enable)
        // autoCalculateTimeout = setTimeout(() => {
        //     const attended = document.getElementById('attended').value;
        //     const total = document.getElementById('total').value;
        //     if (attended && total) {
        //         calculateAttendance();
        //     }
        // }, 1000); // Auto-calculate after 1 second of no typing
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.feature-card, .stat-item, .calculator-container');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Number formatting for better UX
function formatNumber(num) {
    return new Intl.NumberFormat().format(num);
}

// Local storage to save user preferences (optional)
function saveCalculatorState() {
    const state = {
        attended: document.getElementById('attended').value,
        total: document.getElementById('total').value,
        target: document.getElementById('target').value,
        timestamp: Date.now()
    };
    localStorage.setItem('attendanceCalculatorState', JSON.stringify(state));
}

function loadCalculatorState() {
    try {
        const savedState = localStorage.getItem('attendanceCalculatorState');
        if (savedState) {
            const state = JSON.parse(savedState);
            // Only load if saved within last 24 hours
            if (Date.now() - state.timestamp < 24 * 60 * 60 * 1000) {
                document.getElementById('attended').value = state.attended || '';
                document.getElementById('total').value = state.total || '';
                document.getElementById('target').value = state.target || '75';
            }
        }
    } catch (error) {
        console.log('Could not load saved state:', error);
    }
}

// Save state when inputs change
document.querySelectorAll('#attended, #total, #target').forEach(input => {
    input.addEventListener('change', saveCalculatorState);
});

// Load saved state on page load
document.addEventListener('DOMContentLoaded', loadCalculatorState);

// Accessibility improvements
document.addEventListener('DOMContentLoaded', () => {
    // Add ARIA labels for better screen reader support
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        const label = input.previousElementSibling;
        if (label && label.tagName === 'LABEL') {
            input.setAttribute('aria-describedby', input.id + '-desc');
        }
    });
    
    // Add keyboard navigation for buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                button.click();
            }
        });
    });
});

// Error handling and user feedback
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'error' ? '#ff4757' : '#2ed573'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-weight: 500;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Enhanced validation with user feedback
function validateInputs() {
    const attended = parseInt(document.getElementById('attended').value) || 0;
    const total = parseInt(document.getElementById('total').value) || 0;
    const target = parseFloat(document.getElementById('target').value) || 75;
    
    if (total === 0) {
        showNotification('Please enter a valid number for total classes', 'error');
        return false;
    }
    
    if (attended > total) {
        showNotification('Classes attended cannot exceed total classes', 'error');
        return false;
    }
    
    if (target < 0 || target > 100) {
        showNotification('Target percentage must be between 0 and 100', 'error');
        return false;
    }
    
    return true;
}

// Update calculateAttendance function to use new validation
const originalCalculateAttendance = calculateAttendance;
calculateAttendance = function() {
    if (validateInputs()) {
        originalCalculateAttendance();
        showNotification('Attendance calculated successfully!', 'success');
    }
};