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
    
    // Show result
    resultDiv.style.display = 'block';
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

// Contact Window Functions
function toggleContact() {
    const contactWindow = document.getElementById('contactWindow');
    contactWindow.classList.toggle('active');
}

// Contact form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    this.reset();
    toggleContact();
});

