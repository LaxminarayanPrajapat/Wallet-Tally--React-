/**
 * SMTP Email Test Script
 * 
 * This script tests your SMTP configuration without running the full app.
 * 
 * Usage:
 *   node test-email.js
 * 
 * Make sure your .env file is properly configured before running.
 */

require('dotenv').config();
const nodemailer = require('nodemailer');

// ANSI color codes for terminal output
const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m',
};

console.log(`\n${colors.cyan}========================================`);
console.log('📧 SMTP Configuration Test');
console.log(`========================================${colors.reset}\n`);

// Display current configuration
console.log(`${colors.blue}Current Configuration:${colors.reset}`);
console.log(`  SMTP_HOST: ${process.env.SMTP_HOST || '❌ NOT SET'}`);
console.log(`  SMTP_PORT: ${process.env.SMTP_PORT || '❌ NOT SET'}`);
console.log(`  SMTP_USER: ${process.env.SMTP_USER || '❌ NOT SET'}`);
console.log(`  SMTP_PASS: ${process.env.SMTP_PASS ? '✅ SET (hidden)' : '❌ NOT SET'}`);
console.log(`  SMTP_FROM: ${process.env.SMTP_FROM || '❌ NOT SET'}\n`);

// Validate configuration
const missingVars = [];
if (!process.env.SMTP_HOST) missingVars.push('SMTP_HOST');
if (!process.env.SMTP_PORT) missingVars.push('SMTP_PORT');
if (!process.env.SMTP_USER) missingVars.push('SMTP_USER');
if (!process.env.SMTP_PASS) missingVars.push('SMTP_PASS');
if (!process.env.SMTP_FROM) missingVars.push('SMTP_FROM');

if (missingVars.length > 0) {
    console.log(`${colors.red}❌ Error: Missing required environment variables:${colors.reset}`);
    missingVars.forEach(v => console.log(`   - ${v}`));
    console.log(`\n${colors.yellow}Please configure these in your .env file.${colors.reset}\n`);
    process.exit(1);
}

// Create transporter
console.log(`${colors.blue}Creating SMTP transporter...${colors.reset}`);
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_PORT === '465',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

// Test connection
console.log(`${colors.blue}Testing SMTP connection...${colors.reset}\n`);

transporter.verify(function (error, success) {
    if (error) {
        console.log(`${colors.red}❌ Connection Failed!${colors.reset}\n`);
        console.log(`${colors.red}Error Details:${colors.reset}`);
        console.log(`  Code: ${error.code || 'N/A'}`);
        console.log(`  Message: ${error.message}\n`);

        // Provide helpful suggestions based on error
        if (error.code === 'EAUTH' || error.message.includes('Invalid login')) {
            console.log(`${colors.yellow}💡 Suggestions:${colors.reset}`);
            console.log('  1. For Gmail: Make sure you are using an App Password, not your regular password');
            console.log('  2. Generate App Password at: https://myaccount.google.com/apppasswords');
            console.log('  3. Enable 2-Step Verification first if not already enabled');
            console.log('  4. Remove all spaces from the App Password in .env file\n');
        } else if (error.code === 'ENOTFOUND' || error.code === 'EDNS') {
            console.log(`${colors.yellow}💡 Suggestions:${colors.reset}`);
            console.log('  1. Check SMTP_HOST is correct (e.g., smtp.gmail.com)');
            console.log('  2. SMTP_HOST should be the server hostname, NOT your email address');
            console.log('  3. Verify you have internet connection\n');
        } else if (error.code === 'ETIMEDOUT' || error.code === 'ECONNREFUSED') {
            console.log(`${colors.yellow}💡 Suggestions:${colors.reset}`);
            console.log('  1. Check SMTP_PORT is correct (465 for SSL, 587 for TLS)');
            console.log('  2. Verify firewall/antivirus is not blocking the connection');
            console.log('  3. Try switching between port 465 and 587\n');
        }

        process.exit(1);
    }

    console.log(`${colors.green}✅ Connection Successful!${colors.reset}\n`);
    console.log(`${colors.blue}Sending test email...${colors.reset}\n`);

    // Send test email
    const mailOptions = {
        from: process.env.SMTP_FROM,
        to: process.env.SMTP_USER, // Send to yourself
        subject: '✅ Wallet Tally - SMTP Test Successful',
        text: 'Congratulations! Your SMTP configuration is working correctly.',
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #1e3a8a 0%, #064e3b 100%); padding: 30px; border-radius: 10px; text-align: center;">
          <h1 style="color: white; margin: 0;">✅ SMTP Test Successful!</h1>
        </div>
        <div style="background: #f8fafc; padding: 30px; border-radius: 10px; margin-top: 20px;">
          <h2 style="color: #1e293b;">Congratulations!</h2>
          <p style="color: #475569; line-height: 1.6;">
            Your SMTP email configuration is working correctly. Wallet Tally can now send emails for:
          </p>
          <ul style="color: #475569; line-height: 1.8;">
            <li>Transaction reports (PDF exports)</li>
            <li>Account notifications</li>
            <li>System alerts</li>
          </ul>
          <div style="background: white; padding: 15px; border-radius: 8px; margin-top: 20px; border-left: 4px solid #10b981;">
            <p style="margin: 0; color: #059669; font-weight: bold;">✓ Configuration Verified</p>
            <p style="margin: 5px 0 0 0; color: #64748b; font-size: 14px;">
              Host: ${process.env.SMTP_HOST} | Port: ${process.env.SMTP_PORT}
            </p>
          </div>
        </div>
        <div style="text-align: center; margin-top: 20px; color: #94a3b8; font-size: 12px;">
          <p>This is an automated test email from Wallet Tally</p>
        </div>
      </div>
    `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(`${colors.red}❌ Failed to send test email!${colors.reset}\n`);
            console.log(`${colors.red}Error:${colors.reset} ${error.message}\n`);
            process.exit(1);
        }

        console.log(`${colors.green}✅ Test email sent successfully!${colors.reset}\n`);
        console.log(`${colors.blue}Email Details:${colors.reset}`);
        console.log(`  Message ID: ${info.messageId}`);
        console.log(`  To: ${process.env.SMTP_USER}`);
        console.log(`  From: ${process.env.SMTP_FROM}\n`);
        console.log(`${colors.green}🎉 All tests passed! Your SMTP configuration is ready.${colors.reset}\n`);
        console.log(`${colors.yellow}📬 Check your inbox (and spam folder) for the test email.${colors.reset}\n`);
    });
});
