# 🔧 Waterloo Login Helper - Debugging Guide

## Quick Fix Checklist ✅

### 1. **Load/Reload Extension**
- Go to `chrome://extensions/`
- Enable "Developer mode" (top-right toggle)
- If extension exists: Click the **refresh** button 🔄
- If not loaded: Click **"Load unpacked"** and select `waterloo-login-helper` folder

### 2. **Check for Errors**
- On `chrome://extensions/`, click **"Details"** on your extension
- Look for any **red error messages**
- Click **"Inspect views"** links to check console logs

### 3. **Verify Permissions**
Make sure your extension has these permissions:
- ✅ Storage
- ✅ ActiveTab  
- ✅ Host permission for `*://adfs.uwaterloo.ca/*`

### 4. **Test Step by Step**

#### Step A: Test Popup
1. Click the extension icon in Chrome toolbar
2. You should see the blue gradient popup
3. Enter test credentials and click "Save & Enable"
4. Check if you see "✅ Credentials saved!" message

#### Step B: Test Content Script
1. Go to `https://adfs.uwaterloo.ca/` (or any UW login page)
2. Open browser console (F12 → Console tab)
3. Look for: `🎓 Waterloo Login Helper: Content script loaded!`
4. If login form exists, should see: `🎓 Login form detected!`

#### Step C: Test Auto-Fill
1. Navigate to Waterloo ADFS login page
2. Check console for auto-fill messages
3. Should see credentials auto-populated
4. Should see blue notification: "🎓 Credentials auto-filled!"

## Common Issues & Solutions 🛠️

### Issue 1: Extension Won't Load
**Symptoms:** Can't see extension in toolbar, errors on chrome://extensions/

**Solutions:**
- Verify all files exist: `manifest.json`, `popup.html`, `popup.js`, `content.js`
- Check manifest.json syntax (use JSON validator)
- Reload extension: Extensions page → Refresh button

### Issue 2: Popup Won't Open
**Symptoms:** Clicking extension icon does nothing

**Solutions:**
- Check popup.html syntax
- Verify popup.js has no JavaScript errors
- Check Developer Tools → Console for errors

### Issue 3: Content Script Not Running
**Symptoms:** No console messages on uwaterloo.ca pages

**Solutions:**
- Verify you're on `adfs.uwaterloo.ca` (the actual login page)
- Check if content script is blocked by website's CSP
- Reload the webpage after installing extension

### Issue 4: Auto-Fill Not Working
**Symptoms:** Content script loads but fields don't fill

**Solutions:**
- Check if credentials are saved (test popup)
- Verify login form selectors match the website
- Check browser console for JavaScript errors

### Issue 5: Storage Errors
**Symptoms:** Can't save credentials, popup shows errors

**Solutions:**
- Check if "storage" permission is granted
- Verify chrome.storage.sync is available
- Check browser's sync settings

## Advanced Debugging 🔍

### Check Extension State
```javascript
// Run in browser console on any page
chrome.storage.sync.get(['uwEmail', 'uwPassword'], function(result) {
    console.log('Saved credentials:', result);
});
```

### Test Content Script Manually
```javascript
// Run in console on adfs.uwaterloo.ca
console.log('Email field:', document.querySelector('input[name="UserName"]'));
console.log('Password field:', document.querySelector('input[name="Password"]'));
console.log('Submit button:', document.querySelector('input[id="submitButton"]'));
```

### Verify Permissions
```javascript
// Run in extension popup console
chrome.permissions.getAll(function(permissions) {
    console.log('Granted permissions:', permissions);
});
```

## Browser Console Messages 📝

### ✅ Expected Success Messages:
```
🎓 Waterloo Login Helper: Content script loaded!
🎓 Login form detected! Preparing auto-fill...
🎓 Found email field using selector: input[type="email"]
🎓 Found password field using selector: input[type="password"]
🎓 Credentials filled! You can now click login or press Enter.
```

### ❌ Problem Indicators:
```
🎓 No login form found on this page.
🎓 No saved credentials found. Set them up in the extension popup!
Uncaught TypeError: Cannot read property 'sync' of undefined
Error saving credentials!
```

## Testing Different Scenarios 🧪

### Test 1: Fresh Install
1. Remove extension completely
2. Reload unpacked extension
3. Set up credentials in popup
4. Test on login page

### Test 2: Different Login Pages
- `https://adfs.uwaterloo.ca/adfs/ls/` (main ADFS login)
- `https://learn.uwaterloo.ca/` (redirects to ADFS)
- Any uwaterloo.ca page requiring authentication

### Test 3: Network Issues
- Test offline (extension should still work with saved credentials)
- Test with slow connection

## Getting Help 🆘

If you're still having issues:

1. **Check Extension Details:**
   - Version: Should be 1.0
   - Permissions: storage, activeTab, host permissions
   - Status: Should be "Enabled"

2. **Export Console Logs:**
   - Open DevTools (F12)
   - Go to Console tab
   - Right-click → "Save as..." to export logs

3. **Test in Incognito Mode:**
   - Enable extension in incognito
   - Test if it works in private browsing

4. **Try Different Browser:**
   - Test in Chrome Canary or Edge
   - Compare behavior

## Final Checklist 📋

Before asking for help, make sure:
- [ ] Extension is loaded and enabled
- [ ] No red errors on chrome://extensions/
- [ ] Popup opens and can save credentials
- [ ] You're testing on adfs.uwaterloo.ca
- [ ] Browser console shows content script loading
- [ ] Credentials are actually saved in storage
- [ ] You've tried reloading both extension and webpage

---

**💡 Pro Tip:** Most issues are solved by simply reloading the extension after making changes!

