'use server';

import { sendMail } from '@/lib/email';
import PDFDocument from 'pdfkit';
import { format } from 'date-fns';

/**
 * @fileOverview Server action to generate a clean transaction report PDF matching the web view exactly.
 */

export async function exportTransactionsToPdf(
  email: string,
  transactions: any[],
  startDate: string,
  endDate: string,
  currencySymbol: string
) {
  try {
    const doc = new PDFDocument({
      margin: 40,
      size: 'A4'
    });
    const chunks: Buffer[] = [];

    doc.on('data', (chunk) => chunks.push(chunk));

    // Header
    doc
      .fontSize(24)
      .font('Helvetica-Bold')
      .fillColor('#1e293b')
      .text('Wallet Tally', 40, 40);

    doc
      .fontSize(10)
      .font('Helvetica')
      .fillColor('#64748b')
      .text('Transaction Report', 40, 70);

    // Horizontal line
    doc
      .strokeColor('#cbd5e1')
      .lineWidth(1)
      .moveTo(40, 90)
      .lineTo(555, 90)
      .stroke();

    // Report Period
    doc
      .fontSize(9)
      .font('Helvetica')
      .fillColor('#475569')
      .text(`Period: ${format(new Date(startDate), 'MMM dd, yyyy')} - ${format(new Date(endDate), 'MMM dd, yyyy')}`, 40, 105)
      .text(`Generated: ${format(new Date(), 'MMM dd, yyyy')}`, 40, 120);

    // Calculate totals
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + (t.amount || 0), 0);

    const totalExpense = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + (t.amount || 0), 0);

    const netBalance = totalIncome - totalExpense;

    // Summary Section - Three boxes matching web view
    const summaryY = 145;

    // Income Box
    doc
      .rect(40, summaryY, 165, 50)
      .lineWidth(0)
      .fillAndStroke('#f0fdf4', '#f0fdf4');
    doc
      .rect(40, summaryY, 4, 50)
      .fillAndStroke('#10b981', '#10b981');

    doc
      .fontSize(8)
      .font('Helvetica-Bold')
      .fillColor('#64748b')
      .text('INCOME', 55, summaryY + 12);

    doc
      .fontSize(16)
      .font('Helvetica-Bold')
      .fillColor('#10b981')
      .text(`${currencySymbol}${totalIncome.toFixed(2)}`, 55, summaryY + 28);

    // Expense Box
    doc
      .rect(215, summaryY, 165, 50)
      .lineWidth(0)
      .fillAndStroke('#fef2f2', '#fef2f2');
    doc
      .rect(215, summaryY, 4, 50)
      .fillAndStroke('#ef4444', '#ef4444');

    doc
      .fontSize(8)
      .font('Helvetica-Bold')
      .fillColor('#64748b')
      .text('EXPENSE', 230, summaryY + 12);

    doc
      .fontSize(16)
      .font('Helvetica-Bold')
      .fillColor('#ef4444')
      .text(`${currencySymbol}${totalExpense.toFixed(2)}`, 230, summaryY + 28);

    // Net Box
    doc
      .rect(390, summaryY, 165, 50)
      .lineWidth(0)
      .fillAndStroke('#eff6ff', '#eff6ff');
    doc
      .rect(390, summaryY, 4, 50)
      .fillAndStroke('#3b82f6', '#3b82f6');

    doc
      .fontSize(8)
      .font('Helvetica-Bold')
      .fillColor('#64748b')
      .text('NET', 405, summaryY + 12);

    doc
      .fontSize(16)
      .font('Helvetica-Bold')
      .fillColor(netBalance >= 0 ? '#10b981' : '#ef4444')
      .text(`${currencySymbol}${netBalance.toFixed(2)}`, 405, summaryY + 28);

    // Table Header
    const tableTop = 220;
    doc
      .fontSize(8)
      .font('Helvetica-Bold')
      .fillColor('#64748b')
      .text('DATE', 40, tableTop)
      .text('TYPE', 110, tableTop)
      .text('CATEGORY', 180, tableTop)
      .text('DESCRIPTION', 280, tableTop)
      .text('AMOUNT', 480, tableTop, { align: 'right', width: 75 });

    // Table header line
    doc
      .strokeColor('#cbd5e1')
      .lineWidth(0.5)
      .moveTo(40, tableTop + 15)
      .lineTo(555, tableTop + 15)
      .stroke();

    // Table Rows - Latest transactions first (already sorted by date desc)
    let currentY = tableTop + 25;
    const rowHeight = 22;
    const pageHeight = 750;

    transactions.forEach((t, index) => {
      // Check for page overflow
      if (currentY > pageHeight) {
        doc.addPage();
        currentY = 50;

        // Repeat header on new page
        doc
          .fontSize(8)
          .font('Helvetica-Bold')
          .fillColor('#64748b')
          .text('DATE', 40, currentY)
          .text('TYPE', 110, currentY)
          .text('CATEGORY', 180, currentY)
          .text('DESCRIPTION', 280, currentY)
          .text('AMOUNT', 480, currentY, { align: 'right', width: 75 });

        doc
          .strokeColor('#cbd5e1')
          .lineWidth(0.5)
          .moveTo(40, currentY + 15)
          .lineTo(555, currentY + 15)
          .stroke();

        currentY += 25;
      }

      // Alternating row background
      if (index % 2 === 0) {
        doc
          .rect(40, currentY - 5, 515, rowHeight)
          .fill('#fafafa');
      }

      // Row data
      const dateStr = t.date ? format(new Date(t.date), 'MMM dd, yyyy') : 'N/A';
      const isIncome = t.type === 'income';

      // Date
      doc
        .fontSize(8)
        .font('Helvetica')
        .fillColor('#334155')
        .text(dateStr, 40, currentY);

      // Type with icon and badge
      const typeIcon = isIncome ? '↑' : '↓';
      const typeText = isIncome ? 'INCOME' : 'EXPENSE';
      const typeColor = isIncome ? '#059669' : '#dc2626';
      const typeBgColor = isIncome ? '#d1fae5' : '#fee2e2';

      // Type badge background
      const badgeWidth = 55;
      const badgeHeight = 14;
      doc
        .roundedRect(110, currentY - 2, badgeWidth, badgeHeight, 3)
        .fillAndStroke(typeBgColor, typeBgColor);

      // Type text
      doc
        .fontSize(7)
        .font('Helvetica-Bold')
        .fillColor(typeColor)
        .text(`${typeIcon} ${typeText}`, 113, currentY + 1);

      // Category badge
      const categoryBadgeWidth = doc.widthOfString(t.category || '-', { fontSize: 7 }) + 8;
      doc
        .roundedRect(180, currentY - 2, Math.min(categoryBadgeWidth, 85), badgeHeight, 3)
        .fillAndStroke('#dbeafe', '#dbeafe');

      doc
        .fontSize(7)
        .font('Helvetica-Bold')
        .fillColor('#2563eb')
        .text(t.category || '-', 183, currentY + 1, { width: 82, ellipsis: true });

      // Description
      doc
        .fontSize(8)
        .font('Helvetica')
        .fillColor('#64748b')
        .text(t.description || '-', 280, currentY, { width: 190, ellipsis: true });

      // Amount
      const amountStr = `${isIncome ? '+' : '-'}${currencySymbol}${Number(t.amount || 0).toFixed(2)}`;
      doc
        .fontSize(9)
        .font('Helvetica-Bold')
        .fillColor(isIncome ? '#10b981' : '#ef4444')
        .text(amountStr, 480, currentY, { align: 'right', width: 75 });

      currentY += rowHeight;
    });

    // Add transaction count at the bottom
    if (currentY < pageHeight - 60) {
      doc
        .fontSize(8)
        .font('Helvetica')
        .fillColor('#94a3b8')
        .text(`Total Transactions: ${transactions.length}`, 40, currentY + 20);
    }

    // Footer
    const footerY = doc.page.height - 40;
    doc
      .fontSize(7)
      .font('Helvetica')
      .fillColor('#94a3b8')
      .text(
        `Wallet Tally - Personal Finance Management`,
        40,
        footerY,
        { align: 'center', width: 515 }
      );

    doc.end();

    const pdfBuffer = await new Promise<Buffer>((resolve) => {
      doc.on('end', () => {
        resolve(Buffer.concat(chunks));
      });
    });

    await sendMail({
      to: email,
      subject: `Wallet Tally Transaction Report: ${format(new Date(startDate), 'MMM dd, yyyy')} - ${format(new Date(endDate), 'MMM dd, yyyy')}`,
      text: `Please find attached your Wallet Tally transaction report for the period ${format(new Date(startDate), 'MMM dd, yyyy')} to ${format(new Date(endDate), 'MMM dd, yyyy')}.`,
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
              <p style="color: #1e293b; font-size: 14px; margin: 0;">${format(new Date(startDate), 'MMMM dd, yyyy')} - ${format(new Date(endDate), 'MMMM dd, yyyy')}</p>
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
          filename: `WalletTally_Report_${format(new Date(startDate), 'yyyy-MM-dd')}_${format(new Date(endDate), 'yyyy-MM-dd')}.pdf`,
          content: pdfBuffer,
        },
      ],
    });

    return { success: true };
  } catch (error: any) {
    console.error('PDF Export Error:', error);
    return { success: false, error: error.message };
  }
}
