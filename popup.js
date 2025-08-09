// 🎓 Learning: This file handles the popup interface interactions

// Wait for the page to load before running our code
document.addEventListener('DOMContentLoaded', function() {
    // Get references to our HTML elements
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const saveButton = document.getElementById('save');
    const clearButton = document.getElementById('clear');
    const statusDiv = document.getElementById('status');
    
    // 🎓 Learning: chrome.storage.sync stores data in the cloud and syncs across devices
    // Load saved credentials when popup opens
    loadSavedCredentials();
    
    // 🎓 Learning: Event listeners - what happens when user clicks buttons
    saveButton.addEventListener('click', saveCredentials);
    clearButton.addEventListener('click', clearCredentials);
    
    // Allow Enter key to save credentials
    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            saveCredentials();
        }
    });
    
    function loadSavedCredentials() {
        // 🎓 Learning: Chrome storage API - retrieving data
        chrome.storage.sync.get(['uwEmail', 'uwPassword'], function(result) {
            if (result.uwEmail) {
                emailInput.value = result.uwEmail;
            }
            if (result.uwPassword) {
                passwordInput.value = result.uwPassword;
            }
        });
    }
    
    function saveCredentials() {
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        
        // 🎓 Learning: Input validation
        if (!email || !password) {
            showStatus('Please enter both email and password!', 'error');
            return;
        }
        
        // Validate email format (basic check)
        if (!email.includes('@uwaterloo.ca')) {
            showStatus('Please use your @uwaterloo.ca email!', 'error');
            return;
        }
        
        // 🎓 Learning: Saving data to Chrome storage
        chrome.storage.sync.set({
            uwEmail: email,
            uwPassword: password
        }, function() {
            if (chrome.runtime.lastError) {
                showStatus('Error saving credentials!', 'error');
            } else {
                showStatus('✅ Credentials saved! Auto-login is now active.', 'success');
                
                // Auto-close popup after 2 seconds
                setTimeout(() => {
                    window.close();
                }, 2000);
            }
        });
    }
    
    function clearCredentials() {
        // 🎓 Learning: Removing data from storage
        chrome.storage.sync.remove(['uwEmail', 'uwPassword'], function() {
            emailInput.value = '';
            passwordInput.value = '';
            showStatus('Credentials cleared!', 'success');
        });
    }
    
    function showStatus(message, type) {
        // 🎓 Learning: DOM manipulation - changing elements dynamically
        statusDiv.textContent = message;
        statusDiv.className = 'status ' + type;
        statusDiv.style.display = 'block';
        
        // Hide status after 3 seconds
        setTimeout(() => {
            statusDiv.style.display = 'none';
        }, 3000);
    }
});