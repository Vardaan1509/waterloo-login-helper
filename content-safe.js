// 🛡️ Safe version of content script with error handling

(function() {
    'use strict';
    
    console.log('🎓 Waterloo Login Helper: Content script starting...');
    
    // Check if we're in a valid environment
    if (typeof document === 'undefined') {
        console.error('🎓 ERROR: Document not available');
        return;
    }
    
    // Check if Chrome extension APIs are available
    if (typeof chrome === 'undefined' || !chrome.storage) {
        console.error('🎓 ERROR: Chrome extension APIs not available');
        return;
    }
    
    console.log('🎓 Environment check passed, initializing...');
    
    // Wait for page to load with error handling
    try {
        setTimeout(initializeAutoLogin, 1000);
    } catch (error) {
        console.error('🎓 ERROR in setTimeout:', error);
    }
    
    function initializeAutoLogin() {
        try {
            console.log('🎓 Starting auto-login initialization...');
            
            // Look for login form elements with error handling
            const emailField = findEmailField();
            const passwordField = findPasswordField();
            
            console.log('🎓 Email field found:', !!emailField);
            console.log('🎓 Password field found:', !!passwordField);
            
            if (emailField && passwordField) {
                console.log('🎓 Login form detected! Preparing auto-fill...');
                
                // Get saved credentials with error handling
                try {
                    chrome.storage.sync.get(['uwEmail', 'uwPassword'], function(result) {
                        if (chrome.runtime.lastError) {
                            console.error('🎓 Storage error:', chrome.runtime.lastError);
                            return;
                        }
                        
                        console.log('🎓 Retrieved credentials:', {
                            hasEmail: !!result.uwEmail,
                            hasPassword: !!result.uwPassword
                        });
                        
                        if (result.uwEmail && result.uwPassword) {
                            fillLoginForm(emailField, passwordField, result.uwEmail, result.uwPassword);
                        } else {
                            console.log('🎓 No saved credentials found. Set them up in the extension popup!');
                        }
                    });
                } catch (error) {
                    console.error('🎓 ERROR accessing storage:', error);
                }
            } else {
                console.log('🎓 No login form found on this page.');
                // Debug: show what inputs we did find
                const allInputs = document.querySelectorAll('input');
                console.log('🎓 Debug: Found inputs:', allInputs.length);
                allInputs.forEach((input, i) => {
                    console.log(`🎓 Input ${i}:`, {
                        name: input.name,
                        type: input.type,
                        id: input.id
                    });
                });
            }
        } catch (error) {
            console.error('🎓 ERROR in initializeAutoLogin:', error);
        }
    }
    
    function findEmailField() {
        try {
            const selectors = [
                'input[name="UserName"]',
                'input[id="userNameInput"]',
                'input[type="email"]',
                'input[name="email"]',
                'input[name="username"]'
            ];
            
            for (let selector of selectors) {
                try {
                    const element = document.querySelector(selector);
                    if (element) {
                        console.log(`🎓 Found email field using: ${selector}`);
                        return element;
                    }
                } catch (selectorError) {
                    console.error(`🎓 Error with selector ${selector}:`, selectorError);
                }
            }
            
            return null;
        } catch (error) {
            console.error('🎓 ERROR in findEmailField:', error);
            return null;
        }
    }
    
    function findPasswordField() {
        try {
            const selectors = [
                'input[name="Password"]',
                'input[id="passwordInput"]',
                'input[type="password"]'
            ];
            
            for (let selector of selectors) {
                try {
                    const element = document.querySelector(selector);
                    if (element) {
                        console.log(`🎓 Found password field using: ${selector}`);
                        return element;
                    }
                } catch (selectorError) {
                    console.error(`🎓 Error with selector ${selector}:`, selectorError);
                }
            }
            
            return null;
        } catch (error) {
            console.error('🎓 ERROR in findPasswordField:', error);
            return null;
        }
    }
    
    function fillLoginForm(emailField, passwordField, email, password) {
        try {
            console.log('🎓 Starting to fill login form...');
            
            // Fill email field
            setInputValue(emailField, email);
            
            // Small delay before filling password
            setTimeout(() => {
                try {
                    setInputValue(passwordField, password);
                    passwordField.focus();
                    console.log('🎓 Credentials filled successfully!');
                    showAutoFillNotification();
                } catch (error) {
                    console.error('🎓 ERROR filling password:', error);
                }
            }, 500);
            
        } catch (error) {
            console.error('🎓 ERROR in fillLoginForm:', error);
        }
    }
    
    function setInputValue(input, value) {
        try {
            if (!input) {
                console.error('🎓 ERROR: Input element is null');
                return;
            }
            
            input.focus();
            input.value = '';
            input.value = value;
            
            // Trigger events safely
            ['input', 'change', 'blur'].forEach(eventType => {
                try {
                    input.dispatchEvent(new Event(eventType, { bubbles: true }));
                } catch (eventError) {
                    console.error(`🎓 ERROR dispatching ${eventType} event:`, eventError);
                }
            });
            
        } catch (error) {
            console.error('🎓 ERROR in setInputValue:', error);
        }
    }
    
    function showAutoFillNotification() {
    try {
        const notification = document.createElement('div');
        notification.innerHTML = '🎓 Credentials auto-filled!';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #2196F3;
            color: white;
            padding: 12px 16px;
            border-radius: 6px;
            z-index: 10001;
            font-family: Arial, sans-serif;
            font-size: 14px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        `;
        
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            try {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            } catch (removeError) {
                console.error('🎓 ERROR removing notification:', removeError);
            }
        }, 3000);
        
    } catch (error) {
        console.error('🎓 ERROR showing notification:', error);
    }
}

    
    console.log('🎓 Content script initialization complete');
    
})();

