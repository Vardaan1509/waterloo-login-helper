// 🧪 SIMPLE TEST VERSION - Use this to debug basic functionality

console.log('🧪 TEST: Content script started loading...');

// Test 1: Basic script injection
setTimeout(() => {
    console.log('🧪 TEST: Script injection working!');
    console.log('🧪 TEST: Current URL:', window.location.href);
    console.log('🧪 TEST: Page title:', document.title);
}, 1000);

// Test 2: Find form fields
setTimeout(() => {
    console.log('🧪 TEST: Looking for form fields...');
    
    // Test common selectors
    const tests = [
        'input[name="UserName"]',
        'input[name="Password"]', 
        'input[type="email"]',
        'input[type="password"]',
        'input[type="text"]',
        'form'
    ];
    
    tests.forEach(selector => {
        const element = document.querySelector(selector);
        console.log(`🧪 TEST: ${selector}:`, element);
    });
    
    // List all inputs
    const allInputs = document.querySelectorAll('input');
    console.log('🧪 TEST: All inputs found:', allInputs.length);
    allInputs.forEach((input, index) => {
        console.log(`🧪 TEST: Input ${index}:`, {
            name: input.name,
            type: input.type,
            id: input.id,
            placeholder: input.placeholder
        });
    });
}, 2000);

// Test 3: Storage access
setTimeout(() => {
    console.log('🧪 TEST: Testing storage access...');
    
    if (typeof chrome !== 'undefined' && chrome.storage) {
        console.log('🧪 TEST: Chrome storage API available');
        
        chrome.storage.sync.get(['uwEmail', 'uwPassword'], function(result) {
            console.log('🧪 TEST: Stored credentials:', result);
        });
    } else {
        console.log('🧪 TEST: Chrome storage API NOT available');
    }
}, 3000);

console.log('🧪 TEST: Content script setup complete');

