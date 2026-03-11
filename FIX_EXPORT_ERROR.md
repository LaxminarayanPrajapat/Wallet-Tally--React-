# 🔧 Fix Export PDF Error - Step by Step Guide

## ❌ Current Error
```
Invalid login: 535-5.7.8 Username and Password not accepted
```

This means Gmail is rejecting your SMTP credentials.

---

## ✅ Solution: Generate New App Password

### Step 1: Check 2-Step Verification

1. Open: https://myaccount.google.com/security
2. Look for "2-Step Verification"
3. If it says "Off", click it and enable it
4. Follow the setup wizard (you'll need your phone)

### Step 2: Generate App Password

1. Open: https://myaccount.google.com/apppasswords
2. Sign in if prompted
3. You should see "App passwords" page
4. Click on "Select app" dropdown → Choose **Mail**
5. Click on "Select device" dropdown → Choose **Other (Custom name)**
6. Type: `Wallet Tally`
7. Click **Generate**

### Step 3: Copy the Password

You'll see a yellow box with a 16-character password like:
```
abcd efgh ijkl mnop
```

**IMPORTANT:** Copy this password and remove ALL spaces:
```
abcdefghijklmnop
```

### Step 4: Update .env File

1. Open the `.env` file in your project
2. Find the line: `SMTP_PASS=REPLACE_WITH_YOUR_16_CHAR_APP_PASSWORD`
3. Replace it with your actual password (no spaces):
   ```env
   SMTP_PASS=abcdefghijklmnop
   ```
4. Save the file

### Step 5: Restart the Server

**IMPORTANT:** You MUST restart the server for changes to take effect!

1. Stop the current server (Ctrl+C in terminal)
2. Start it again: `npm run dev`
3. Wait for "Ready" message

### Step 6: Test Again

1. Go to Dashboard
2. Click "Export" button
3. Select date range
4. Click "Send PDF Report"
5. Check your email inbox (and spam folder)

---

## 🧪 Alternative: Test SMTP First

Before testing in the app, verify your SMTP settings:

```bash
node test-email.js
```

This will:
- ✅ Check all environment variables
- ✅ Test SMTP connection
- ✅ Send a test email
- ✅ Show detailed error messages if it fails

---

## 🐛 Still Not Working?

### Common Issues:

#### Issue 1: "2-Step Verification not enabled"
**Solution:** You MUST enable 2-Step Verification first. App Passwords won't work without it.

#### Issue 2: "Can't find App Passwords option"
**Solution:** 
- Make sure you're signed into the correct Google account
- Ensure 2-Step Verification is enabled
- Try this direct link: https://myaccount.google.com/apppasswords

#### Issue 3: "Password has spaces"
**Solution:** Remove ALL spaces from the password. It should be exactly 16 characters.

#### Issue 4: "Server not restarting"
**Solution:** 
- Make sure you saved the .env file
- Completely stop the server (Ctrl+C)
- Start fresh: `npm run dev`

#### Issue 5: "Still getting authentication error"
**Solution:**
- Delete the old App Password in Google Account
- Generate a brand new one
- Make sure you're copying the entire password
- Verify no extra characters or spaces

---

## 📋 Checklist

Before testing, verify:

- [ ] 2-Step Verification is enabled
- [ ] Generated new App Password
- [ ] Copied password correctly (16 characters, no spaces)
- [ ] Updated SMTP_PASS in .env file
- [ ] Saved the .env file
- [ ] Restarted the server (npm run dev)
- [ ] Waited for "Ready" message

---

## 🎯 Quick Test Commands

### Test SMTP Configuration:
```bash
node test-email.js
```

### Restart Server:
```bash
# Stop current server (Ctrl+C), then:
npm run dev
```

### Check .env is loaded:
Look for this line when server starts:
```
- Environments: .env
```

---

## 💡 Pro Tips

1. **Use a dedicated email** for production apps
2. **Keep App Passwords secure** - treat them like regular passwords
3. **Revoke old App Passwords** you're not using
4. **Test with test-email.js** before using the app feature
5. **Check spam folder** if emails don't arrive

---

## 📞 Need More Help?

If you're still stuck:

1. Run `node test-email.js` and share the error message
2. Verify your Gmail account settings
3. Try generating a new App Password
4. Check if Gmail has any security alerts

---

## ✅ Success Indicators

You'll know it's working when:

1. `node test-email.js` shows: ✅ Connection Successful!
2. Test email arrives in your inbox
3. Export feature shows: "Report Sent!"
4. No errors in server logs

---

**Remember:** After updating .env, you MUST restart the server!
