module.exports = [
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/child_process [external] (child_process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("child_process", () => require("child_process"));

module.exports = mod;
}),
"[project]/src/lib/email.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "sendMail",
    ()=>sendMail
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nodemailer$2f$lib$2f$nodemailer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/nodemailer/lib/nodemailer.js [app-rsc] (ecmascript)");
;
/**
 * @fileOverview Email service configuration using nodemailer with attachment support.
 */ const transporter = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nodemailer$2f$lib$2f$nodemailer$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_PORT === '465',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});
async function sendMail({ to, subject, text, html, attachments }) {
    const mailOptions = {
        from: process.env.SMTP_FROM,
        to,
        subject,
        text,
        html,
        attachments
    };
    return transporter.sendMail(mailOptions);
}
}),
"[externals]/pdfkit [external] (pdfkit, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("pdfkit", () => require("pdfkit"));

module.exports = mod;
}),
"[project]/src/app/actions/export.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"7c6c3961767af3ee8d10937df5f4552a43f46871f3":"exportTransactionsToPdf"},"",""] */ __turbopack_context__.s([
    "exportTransactionsToPdf",
    ()=>exportTransactionsToPdf
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/email.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$pdfkit__$5b$external$5d$__$28$pdfkit$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/pdfkit [external] (pdfkit, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/date-fns/format.mjs [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
async function exportTransactionsToPdf(email, transactions, startDate, endDate, currencySymbol) {
    try {
        const doc = new __TURBOPACK__imported__module__$5b$externals$5d2f$pdfkit__$5b$external$5d$__$28$pdfkit$2c$__cjs$29$__["default"]({
            margin: 40,
            size: 'A4'
        });
        const chunks = [];
        doc.on('data', (chunk)=>chunks.push(chunk));
        // Header
        doc.fontSize(24).font('Helvetica-Bold').fillColor('#1e293b').text('Wallet Tally', 40, 40);
        doc.fontSize(10).font('Helvetica').fillColor('#64748b').text('Transaction Report', 40, 70);
        // Horizontal line
        doc.strokeColor('#cbd5e1').lineWidth(1).moveTo(40, 90).lineTo(555, 90).stroke();
        // Report Period
        doc.fontSize(9).font('Helvetica').fillColor('#475569').text(`Period: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(new Date(startDate), 'MMM dd, yyyy')} - ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(new Date(endDate), 'MMM dd, yyyy')}`, 40, 105).text(`Generated: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(new Date(), 'MMM dd, yyyy')}`, 40, 120);
        // Calculate totals
        const totalIncome = transactions.filter((t)=>t.type === 'income').reduce((sum, t)=>sum + (t.amount || 0), 0);
        const totalExpense = transactions.filter((t)=>t.type === 'expense').reduce((sum, t)=>sum + (t.amount || 0), 0);
        const netBalance = totalIncome - totalExpense;
        // Summary Section - Three boxes matching web view
        const summaryY = 145;
        // Income Box
        doc.rect(40, summaryY, 165, 50).lineWidth(0).fillAndStroke('#f0fdf4', '#f0fdf4');
        doc.rect(40, summaryY, 4, 50).fillAndStroke('#10b981', '#10b981');
        doc.fontSize(8).font('Helvetica-Bold').fillColor('#64748b').text('INCOME', 55, summaryY + 12);
        doc.fontSize(16).font('Helvetica-Bold').fillColor('#10b981').text(`${currencySymbol}${totalIncome.toFixed(2)}`, 55, summaryY + 28);
        // Expense Box
        doc.rect(215, summaryY, 165, 50).lineWidth(0).fillAndStroke('#fef2f2', '#fef2f2');
        doc.rect(215, summaryY, 4, 50).fillAndStroke('#ef4444', '#ef4444');
        doc.fontSize(8).font('Helvetica-Bold').fillColor('#64748b').text('EXPENSE', 230, summaryY + 12);
        doc.fontSize(16).font('Helvetica-Bold').fillColor('#ef4444').text(`${currencySymbol}${totalExpense.toFixed(2)}`, 230, summaryY + 28);
        // Net Box
        doc.rect(390, summaryY, 165, 50).lineWidth(0).fillAndStroke('#eff6ff', '#eff6ff');
        doc.rect(390, summaryY, 4, 50).fillAndStroke('#3b82f6', '#3b82f6');
        doc.fontSize(8).font('Helvetica-Bold').fillColor('#64748b').text('NET', 405, summaryY + 12);
        doc.fontSize(16).font('Helvetica-Bold').fillColor(netBalance >= 0 ? '#10b981' : '#ef4444').text(`${currencySymbol}${netBalance.toFixed(2)}`, 405, summaryY + 28);
        // Table Header
        const tableTop = 220;
        doc.fontSize(8).font('Helvetica-Bold').fillColor('#64748b').text('DATE', 40, tableTop).text('TYPE', 110, tableTop).text('CATEGORY', 180, tableTop).text('DESCRIPTION', 280, tableTop).text('AMOUNT', 480, tableTop, {
            align: 'right',
            width: 75
        });
        // Table header line
        doc.strokeColor('#cbd5e1').lineWidth(0.5).moveTo(40, tableTop + 15).lineTo(555, tableTop + 15).stroke();
        // Table Rows - Latest transactions first (already sorted by date desc)
        let currentY = tableTop + 25;
        const rowHeight = 22;
        const pageHeight = 750;
        transactions.forEach((t, index)=>{
            // Check for page overflow
            if (currentY > pageHeight) {
                doc.addPage();
                currentY = 50;
                // Repeat header on new page
                doc.fontSize(8).font('Helvetica-Bold').fillColor('#64748b').text('DATE', 40, currentY).text('TYPE', 110, currentY).text('CATEGORY', 180, currentY).text('DESCRIPTION', 280, currentY).text('AMOUNT', 480, currentY, {
                    align: 'right',
                    width: 75
                });
                doc.strokeColor('#cbd5e1').lineWidth(0.5).moveTo(40, currentY + 15).lineTo(555, currentY + 15).stroke();
                currentY += 25;
            }
            // Alternating row background
            if (index % 2 === 0) {
                doc.rect(40, currentY - 5, 515, rowHeight).fill('#fafafa');
            }
            // Row data
            const dateStr = t.date ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(new Date(t.date), 'MMM dd, yyyy') : 'N/A';
            const isIncome = t.type === 'income';
            // Date
            doc.fontSize(8).font('Helvetica').fillColor('#334155').text(dateStr, 40, currentY);
            // Type with icon and badge
            const typeIcon = isIncome ? '↑' : '↓';
            const typeText = isIncome ? 'INCOME' : 'EXPENSE';
            const typeColor = isIncome ? '#059669' : '#dc2626';
            const typeBgColor = isIncome ? '#d1fae5' : '#fee2e2';
            // Type badge background
            const badgeWidth = 55;
            const badgeHeight = 14;
            doc.roundedRect(110, currentY - 2, badgeWidth, badgeHeight, 3).fillAndStroke(typeBgColor, typeBgColor);
            // Type text
            doc.fontSize(7).font('Helvetica-Bold').fillColor(typeColor).text(`${typeIcon} ${typeText}`, 113, currentY + 1);
            // Category badge
            const categoryBadgeWidth = doc.widthOfString(t.category || '-', {
                fontSize: 7
            }) + 8;
            doc.roundedRect(180, currentY - 2, Math.min(categoryBadgeWidth, 85), badgeHeight, 3).fillAndStroke('#dbeafe', '#dbeafe');
            doc.fontSize(7).font('Helvetica-Bold').fillColor('#2563eb').text(t.category || '-', 183, currentY + 1, {
                width: 82,
                ellipsis: true
            });
            // Description
            doc.fontSize(8).font('Helvetica').fillColor('#64748b').text(t.description || '-', 280, currentY, {
                width: 190,
                ellipsis: true
            });
            // Amount
            const amountStr = `${isIncome ? '+' : '-'}${currencySymbol}${Number(t.amount || 0).toFixed(2)}`;
            doc.fontSize(9).font('Helvetica-Bold').fillColor(isIncome ? '#10b981' : '#ef4444').text(amountStr, 480, currentY, {
                align: 'right',
                width: 75
            });
            currentY += rowHeight;
        });
        // Add transaction count at the bottom
        if (currentY < pageHeight - 60) {
            doc.fontSize(8).font('Helvetica').fillColor('#94a3b8').text(`Total Transactions: ${transactions.length}`, 40, currentY + 20);
        }
        // Footer
        const footerY = doc.page.height - 40;
        doc.fontSize(7).font('Helvetica').fillColor('#94a3b8').text(`Wallet Tally - Personal Finance Management`, 40, footerY, {
            align: 'center',
            width: 515
        });
        doc.end();
        const pdfBuffer = await new Promise((resolve)=>{
            doc.on('end', ()=>{
                resolve(Buffer.concat(chunks));
            });
        });
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$email$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sendMail"])({
            to: email,
            subject: `Wallet Tally Transaction Report: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(new Date(startDate), 'MMM dd, yyyy')} - ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(new Date(endDate), 'MMM dd, yyyy')}`,
            text: `Please find attached your Wallet Tally transaction report for the period ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(new Date(startDate), 'MMM dd, yyyy')} to ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(new Date(endDate), 'MMM dd, yyyy')}.`,
            html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #1e293b; font-size: 24px; margin: 0 0 8px 0;">Wallet Tally</h1>
            <p style="color: #64748b; font-size: 14px; margin: 0;">Transaction Report Ready</p>
          </div>
          
          <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 30px; margin-bottom: 20px;">
            <p style="color: #334155; font-size: 15px; line-height: 1.6; margin: 0 0 20px 0;">
              Your transaction report has been generated and is attached to this email.
            </p>
            
            <div style="background: #f8fafc; border-left: 3px solid #3b82f6; padding: 15px; margin: 20px 0;">
              <p style="color: #64748b; font-size: 12px; font-weight: 600; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 0.5px;">Report Period</p>
              <p style="color: #1e293b; font-size: 14px; margin: 0;">${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(new Date(startDate), 'MMMM dd, yyyy')} - ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(new Date(endDate), 'MMMM dd, yyyy')}</p>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-top: 20px;">
              <div style="background: #f0fdf4; border-left: 3px solid #10b981; padding: 12px; border-radius: 4px;">
                <p style="color: #64748b; font-size: 11px; font-weight: 600; margin: 0 0 4px 0; text-transform: uppercase;">Income</p>
                <p style="color: #10b981; font-size: 16px; font-weight: bold; margin: 0;">${currencySymbol}${totalIncome.toFixed(2)}</p>
              </div>
              <div style="background: #fef2f2; border-left: 3px solid #ef4444; padding: 12px; border-radius: 4px;">
                <p style="color: #64748b; font-size: 11px; font-weight: 600; margin: 0 0 4px 0; text-transform: uppercase;">Expense</p>
                <p style="color: #ef4444; font-size: 16px; font-weight: bold; margin: 0;">${currencySymbol}${totalExpense.toFixed(2)}</p>
              </div>
              <div style="background: #eff6ff; border-left: 3px solid #3b82f6; padding: 12px; border-radius: 4px;">
                <p style="color: #64748b; font-size: 11px; font-weight: 600; margin: 0 0 4px 0; text-transform: uppercase;">Net</p>
                <p style="color: ${netBalance >= 0 ? '#10b981' : '#ef4444'}; font-size: 16px; font-weight: bold; margin: 0;">${currencySymbol}${netBalance.toFixed(2)}</p>
              </div>
            </div>
            
            <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #e2e8f0;">
              <p style="color: #64748b; font-size: 13px; margin: 0;">
                <strong>Total Transactions:</strong> ${transactions.length}
              </p>
            </div>
          </div>
          
          <div style="text-align: center; padding-top: 20px; border-top: 1px solid #e2e8f0;">
            <p style="color: #94a3b8; font-size: 12px; margin: 0;">
              This is an automated email from Wallet Tally<br>
              Please do not reply to this message
            </p>
          </div>
        </div>
      `,
            attachments: [
                {
                    filename: `WalletTally_Report_${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(new Date(startDate), 'yyyy-MM-dd')}_${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(new Date(endDate), 'yyyy-MM-dd')}.pdf`,
                    content: pdfBuffer
                }
            ]
        });
        return {
            success: true
        };
    } catch (error) {
        console.error('PDF Export Error:', error);
        return {
            success: false,
            error: error.message
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    exportTransactionsToPdf
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(exportTransactionsToPdf, "7c6c3961767af3ee8d10937df5f4552a43f46871f3", null);
}),
"[project]/.next-internal/server/app/(app)/dashboard/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/app/actions/export.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$export$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/actions/export.ts [app-rsc] (ecmascript)");
;
}),
"[project]/.next-internal/server/app/(app)/dashboard/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/app/actions/export.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "7c6c3961767af3ee8d10937df5f4552a43f46871f3",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$export$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["exportTransactionsToPdf"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f28$app$292f$dashboard$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$app$2f$actions$2f$export$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/(app)/dashboard/page/actions.js { ACTIONS_MODULE0 => "[project]/src/app/actions/export.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$export$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/actions/export.ts [app-rsc] (ecmascript)");
}),
"[project]/src/app/favicon.ico.mjs { IMAGE => \"[project]/src/app/favicon.ico (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/favicon.ico.mjs { IMAGE => \"[project]/src/app/favicon.ico (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript)"));
}),
"[project]/src/app/icon.svg.mjs { IMAGE => \"[project]/src/app/icon.svg (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/icon.svg.mjs { IMAGE => \"[project]/src/app/icon.svg (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript)"));
}),
"[project]/src/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/src/app/(app)/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/(app)/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/src/app/(app)/dashboard/page.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/app/(app)/dashboard/page.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/app/(app)/dashboard/page.tsx <module evaluation>", "default");
}),
"[project]/src/app/(app)/dashboard/page.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/app/(app)/dashboard/page.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/app/(app)/dashboard/page.tsx", "default");
}),
"[project]/src/app/(app)/dashboard/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$dashboard$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/app/(app)/dashboard/page.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$dashboard$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/src/app/(app)/dashboard/page.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$app$292f$dashboard$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/src/app/(app)/dashboard/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/(app)/dashboard/page.tsx [app-rsc] (ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__953c96ed._.js.map