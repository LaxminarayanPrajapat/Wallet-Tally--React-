# SMTP Email Configuration Guide for Wallet Tally

## 📧 Gmail Setup (Recommended)

### Step 1: Enable 2-Step Verification
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Click on "2-Step Verification"
3. Follow the prompts to enable it (if not already enabled)

### Step 2: Generate App Password
1. Go to [App Passwords](https://myaccount.google.com/apppasswords)
2. You may need to sign in again
3. Select app: **Mail**
4. Select device: **Other (Custom name)**
5. Enter name: **Wallet Tally**
6. Click **Generate**
7. Copy the 16-character password (it will look like: `abcd efgh ijkl mnop`)
8. Remove all spaces: `abcdefghijklmnop`

### Step 3: Update .env File
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your-email@gmail.com
SMTP_PASS=abcdefghijklmnop
SMTP_FROM="Wallet Tally <your-email@gmail.com>"
```

---

## 📧 Outlook/Hotmail Setup

### Configuration:
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USER=your-email@outlook.com
SMTP_PASS=your-outlook-password
SMTP_FROM="Wallet Tally <your-email@outlook.com>"
```

**Note:** Outlook may require you to enable "Allow less secure apps" in account settings.

---

## 📧 Yahoo Mail Setup

### Configuration:
```env
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=465
SMTP_USER=your-email@yahoo.com
SMTP_PASS=your-app-password
SMTP_FROM="Wallet Tally <your-email@yahoo.com>"
```

**Note:** Yahoo also requires App Passwords. Generate one at [Yahoo Account Security](https://login.yahoo.com/account/security).

---

## 📧 Custom Domain / Other Providers

### Common Providers:

**SendGrid:**
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
```

**Mailgun:**
```env
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_USER=postmaster@your-domain.mailgun.org
SMTP_PASS=your-mailgun-password
```

**AWS SES:**
```env
SMTP_HOST=email-smtp.us-east-1.amazonaws.com
SMTP_PORT=587
SMTP_USER=your-ses-smtp-username
SMTP_PASS=your-ses-smtp-password
```

---

## 🔧 Port Information

| Port | Protocol | Security | Use Case |
|------|----------|----------|----------|
| 465  | SMTPS    | SSL/TLS  | Recommended for Gmail, Yahoo |
| 587  | SMTP     | STARTTLS | Recommended for Outlook, most providers |
| 25   | SMTP     | None     | Not recommended (often blocked) |

---

## ✅ Testing Your Configuration

### Method 1: Use the Export Feature
1. Log into your Wallet Tally account
2. Go to Dashboard
3. Click "Export" button
4. Select a date range
5. Click "Send PDF Report"
6. Check your email inbox

### Method 2: Check Server Logs
Look for error messages in the terminal where your Next.js app is running:
```bash
npm run dev
```

---

## 🐛 Troubleshooting

### Error: "Invalid login"
- ✅ Make sure you're using an **App Password**, not your regular password (for Gmail/Yahoo)
- ✅ Check that SMTP_USER is your complete email address
- ✅ Verify the App Password has no spaces

### Error: "Connection timeout"
- ✅ Check SMTP_HOST is correct
- ✅ Verify SMTP_PORT matches your provider
- ✅ Check your firewall/antivirus isn't blocking the connection
- ✅ Try switching between port 465 and 587

### Error: "Authentication failed"
- ✅ Regenerate your App Password
- ✅ Make sure 2-Step Verification is enabled (Gmail)
- ✅ Check for typos in SMTP_USER and SMTP_PASS

### Error: "ENOTFOUND" or "EBADNAME"
- ✅ SMTP_HOST should be the server hostname (e.g., `smtp.gmail.com`)
- ✅ NOT your email address
- ✅ Check for typos in the hostname

### Emails not arriving
- ✅ Check spam/junk folder
- ✅ Verify the recipient email is correct
- ✅ Check your email provider's sending limits
- ✅ Look for bounce-back messages in your sent folder

---

## 🔒 Security Best Practices

1. **Never commit .env file to Git**
   - Add `.env` to your `.gitignore` file
   - Use `.env.example` for documentation

2. **Use App Passwords**
   - Never use your main account password
   - App Passwords can be revoked without changing your main password

3. **Rotate credentials regularly**
   - Change App Passwords every 3-6 months
   - Revoke unused App Passwords

4. **Use environment-specific configs**
   - Development: Use a test email account
   - Production: Use a dedicated business email or service

---

## 📝 Current Configuration Status

Your current `.env` file is configured for:
- **Provider:** Gmail
- **Host:** smtp.gmail.com
- **Port:** 465 (SSL/TLS)
- **Email:** laxminarayanp519@gmail.com

**⚠️ Action Required:**
The current SMTP_PASS appears to have spaces. Please:
1. Remove all spaces from the App Password
2. Or regenerate a new App Password
3. Update the SMTP_PASS in .env file

---

## 🆘 Need More Help?

If you continue to experience issues:
1. Check the [Nodemailer documentation](https://nodemailer.com/)
2. Review your email provider's SMTP documentation
3. Check server logs for detailed error messages
4. Verify your email provider allows SMTP access

---

## 📚 Additional Resources

- [Gmail App Passwords](https://support.google.com/accounts/answer/185833)
- [Outlook SMTP Settings](https://support.microsoft.com/en-us/office/pop-imap-and-smtp-settings-8361e398-8af4-4e97-b147-6c6c4ac95353)
- [Yahoo App Passwords](https://help.yahoo.com/kb/generate-manage-third-party-passwords-sln15241.html)
- [Nodemailer Documentation](https://nodemailer.com/about/)
