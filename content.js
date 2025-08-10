// 🎓 Learning: Content scripts run on web pages and can interact with the page's HTML

(function() {
    'use strict';
    
    // 🎓 Learning: IIFE (Immediately Invoked Function Expression) 
    // This prevents our variables from conflicting with the website's code
    
    console.log('🎓 Waterloo Login Helper: Content script loaded!');
    
    // Wait a bit for the page to fully load
    setTimeout(initializeAutoLogin, 1000);
    
    function initializeAutoLogin() {
        // 🎓 Learning: Look for login form elements
        const emailField = findEmailField();
        const passwordField = findPasswordField();
        const loginButton = findLoginButton();
        
        if (emailField && passwordField) {
            console.log('🎓 Login form detected! Preparing auto-fill...');
            
            // Get saved credentials and fill the form
            chrome.storage.sync.get(['uwEmail', 'uwPassword'], function(result) {
                if (result.uwEmail && result.uwPassword) {
                    fillLoginForm(emailField, passwordField, result.uwEmail, result.uwPassword);
                    
                    // Add a helpful indicator
                    addAutoFillIndicator(emailField);
                } else {
                    console.log('🎓 No saved credentials found. Set them up in the extension popup!');
                }
            });
        } else {
            console.log('🎓 No login form found on this page.');
        }
    }
    
    function findEmailField() {
        // 🎓 Learning: Multiple ways to find HTML elements
        // Try different selectors that might match the email field
        const selectors = [
            'input[name="UserName"]',           // ADFS specific
            'input[id="userNameInput"]',        // ADFS specific  
            'input[type="email"]',
            'input[name="email"]',
            'input[name="username"]',
            'input[id*="email"]',
            'input[id*="user"]',
            'input[placeholder*="email" i]',
            'input[placeholder*="username" i]'
        ];
        
        for (let selector of selectors) {
            const element = document.querySelector(selector);
            if (element) {
                console.log(`🎓 Found email field using selector: ${selector}`);
                return element;
            }
        }
        
        return null;
    }
    
    function findPasswordField() {
        // 🎓 Learning: Finding password fields
        const selectors = [
            'input[name="Password"]',           // ADFS specific
            'input[id="passwordInput"]',        // ADFS specific
            'input[type="password"]',
            'input[name="password"]',
            'input[id*="password"]',
            'input[placeholder*="password" i]'
        ];
        
        for (let selector of selectors) {
            const element = document.querySelector(selector);
            if (element) {
                console.log(`🎓 Found password field using selector: ${selector}`);
                return element;
            }
        }
        
        return null;
    }
    
    function findLoginButton() {
        // 🎓 Learning: Finding submit buttons
        const selectors = [
            'input[id="submitButton"]',         // ADFS specific
            'input[value="Sign in"]',           // ADFS specific
            'button[type="submit"]',
            'input[type="submit"]'
        ];
        
        for (let selector of selectors) {
            const element = document.querySelector(selector);
            if (element) {
                return element;
            }
        }
        
        // Alternative: find buttons by text content (safer approach)
        const buttons = document.querySelectorAll('button, input[type="submit"], input[type="button"]');
        for (let button of buttons) {
            const text = button.textContent || button.value || '';
            if (text.toLowerCase().includes('sign in') || 
                text.toLowerCase().includes('login') || 
                text.toLowerCase().includes('log in')) {
                return button;
            }
        }
        
        return null;
    }
    
    function fillLoginForm(emailField, passwordField, email, password) {
        // 🎓 Learning: Simulating user input properly
        // Just setting .value doesn't always work - we need to trigger events
        
        // Fill email field
        setInputValue(emailField, email);
        
        // Small delay before filling password (more natural)
        setTimeout(() => {
            setInputValue(passwordField, password);
            
            // Focus on password field to show it's ready
            passwordField.focus();
            
            console.log('🎓 Credentials filled! You can now click login or press Enter.');
            
            // Optional: Show a subtle notification
            showAutoFillNotification();
            
        }, 500);
    }
    
    function setInputValue(input, value) {
        // 🎓 Learning: Properly setting input values to trigger form validation
        
        // Focus the input first
        input.focus();
        
        // Clear existing value
        input.value = '';
        
        // Set new value
        input.value = value;
        
        // Trigger events that websites expect
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
        input.dispatchEvent(new Event('blur', { bubbles: true }));
    }
    
    function addAutoFillIndicator(emailField) {
        // 🎓 Learning: Adding visual feedback to show auto-fill is active
        
        const indicator = document.createElement('div');
        indicator.innerHTML = '🎓 Auto-filled by UW Helper';
        indicator.style.cssText = `
            position: absolute;
            background: #4CAF50;
            color: white;
            padding: 4px 8px;
            font-size: 11px;
            border-radius: 3px;
            z-index: 10000;
            font-family: Arial, sans-serif;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            margin-top: 2px;
        `;
        
        // Position it near the email field
        emailField.parentNode.insertBefore(indicator, emailField.nextSibling);
        
        // Remove indicator after 3 seconds
        setTimeout(() => {
            if (indicator.parentNode) {
                indicator.parentNode.removeChild(indicator);
            }
        }, 3000);
    }
    
    function showAutoFillNotification() {
        // 🎓 Learning: Creating temporary notifications
        
        const notification = document.createElement('div');
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 8px;">
                <span>🎓</span>
                <span>Credentials auto-filled! Click login or press Enter.</span>
            </div>
        `;
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
            animation: slideIn 0.3s ease-out;
        `;
        
        // Add CSS animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(notification);
        
        // Remove notification after 4 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideIn 0.3s ease-out reverse';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }
        }, 4000);
    }
    
    // 🎓 Learning: Handle dynamic content loading
    // Some websites load login forms dynamically, so we watch for changes
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length > 0) {
                // Check if a login form was added
                const hasEmailField = document.querySelector('input[name="UserName"], input[id="userNameInput"], input[type="email"], input[name="email"], input[name="username"]');
                const hasPasswordField = document.querySelector('input[name="Password"], input[id="passwordInput"], input[type="password"]');
                
                if (hasEmailField && hasPasswordField) {
                    console.log('🎓 Dynamic login form detected!');
                    setTimeout(initializeAutoLogin, 500);
                }
            }
        });
    });
    
    // Start observing the document for changes
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
})();