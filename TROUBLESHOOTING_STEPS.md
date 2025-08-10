# 🚨 Chrome Extension Not Working - Step-by-Step Fix

## Step 1: Check Extension Loading ⚠️

### A. Go to Chrome Extensions Page
1. Open Chrome
2. Type `chrome://extensions/` in address bar
3. Press Enter

### B. Enable Developer Mode
- Look for "Developer mode" toggle in TOP RIGHT
- Make sure it's **ON** (blue/enabled)

### C. Load/Reload Extension
- If you see "Waterloo Learn Auto-Login Helper":
  - Click the **REFRESH** button (🔄) on the extension card
- If you DON'T see it:
  - Click **"Load unpacked"**
  - Navigate to your `waterloo-login-helper` folder
  - Click "Select Folder"

### D. Check for Errors
Look at your extension card for:
- ❌ Red error text
- ⚠️ Yellow warnings
- 🟦 Blue "Inspect views" links

**If you see errors, COPY THEM and let me know!**

## Step 2: Test Extension Icon 📱

### A. Find Extension Icon
- Look in Chrome toolbar (top right)
- Look for a puzzle piece icon 🧩
- Click it to see all extensions
- Pin the Waterloo extension if needed

### B. Test Popup
1. Click the extension icon
2. Should see blue gradient popup
3. Try entering test email: `test@uwaterloo.ca`
4. Try entering test password: `test123`
5. Click "Save & Enable"

**What happens? Does popup work? Any error messages?**

## Step 3: Test on ADFS Page 🔍

### A. Go to UW Login
1. Open new tab
2. Go to: `https://quest.pecs.uwaterloo.ca/`
3. This should redirect to ADFS login page

### B. Check Browser Console
1. Press **F12** to open Developer Tools
2. Click **"Console"** tab
3. Look for messages starting with `🎓`

**Expected messages:**
```
🎓 Waterloo Login Helper: Content script loaded!
🎓 Login form detected! Preparing auto-fill...
🎓 Found email field using selector: input[name="UserName"]
🎓 Found password field using selector: input[name="Password"]
```

**If you DON'T see these messages, the content script isn't loading!**

## Step 4: Manual Testing 🧪

### A. Test Form Fields (in console)
Copy and paste this into the browser console on the ADFS page:

```javascript
// Test if we can find the form fields
console.log('Username field:', document.querySelector('input[name="UserName"]'));
console.log('Password field:', document.querySelector('input[name="Password"]'));
console.log('Submit button:', document.querySelector('input[id="submitButton"]'));
console.log('All inputs:', document.querySelectorAll('input'));
```

### B. Test Storage
Copy and paste this into the browser console:

```javascript
// Test if credentials are saved
chrome.storage.sync.get(['uwEmail', 'uwPassword'], function(result) {
    console.log('Saved credentials:', result);
});
```

## Step 5: Common Fixes 🔧

### Fix 1: Clear and Reinstall
1. Go to `chrome://extensions/`
2. Find your extension
3. Click **"Remove"**
4. Restart Chrome
5. Go back to `chrome://extensions/`
6. Enable Developer mode
7. Click "Load unpacked"
8. Select your folder again

### Fix 2: Check File Permissions
Make sure all files exist:
- `manifest.json`
- `popup.html`
- `popup.js`
- `content.js`

### Fix 3: Try Incognito Mode
1. Go to `chrome://extensions/`
2. Find your extension
3. Enable "Allow in incognito"
4. Open incognito window
5. Test the extension there

### Fix 4: Check Chrome Version
- Go to `chrome://settings/help`
- Make sure you're using Chrome 88+ (Manifest V3 support)

## Step 6: Report Back 📋

Please tell me:

1. **Extension Loading:**
   - [ ] Extension appears in chrome://extensions/
   - [ ] No red error messages
   - [ ] Extension icon visible in toolbar

2. **Popup Test:**
   - [ ] Popup opens when clicking icon
   - [ ] Can enter credentials
   - [ ] "Save & Enable" works
   - [ ] See success message

3. **ADFS Page Test:**
   - [ ] Redirected to ADFS login page
   - [ ] Console shows content script loading
   - [ ] Console shows form fields found
   - [ ] Credentials auto-fill

4. **Manual Tests:**
   - [ ] Form fields found in console test
   - [ ] Credentials saved in storage test

5. **Error Messages:**
   - Copy any RED error messages from chrome://extensions/
   - Copy any error messages from browser console
   - Screenshot of what you see

---

## Quick Command Reference 💡

**Open Extensions:** `chrome://extensions/`
**Open Developer Tools:** `F12`
**Reload Extension:** Click refresh button on extension card
**Test ADFS:** Go to any UW service that requires login

Let me know the results of these tests and I'll help you fix the specific issue!

