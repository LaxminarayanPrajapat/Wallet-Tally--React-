'use server';

import { sendMail } from '@/lib/email';
import PDFDocument from 'pdfkit';
import { format } from 'date-fns';

/**
 * Sanitizes a string so PDFKit's built-in fonts (Latin-1) can render it
 * without producing superscript glyphs for multi-byte Unicode characters.
 * Replaces common currency symbols with ASCII-safe equivalents.
 */
function safe(text: string): string {
  return text
    .replace(/₹/g, 'Rs.')
    .replace(/€/g, 'EUR')
    .replace(/£/g, 'GBP')
    .replace(/¥/g, 'JPY')
    .replace(/₩/g, 'KRW')
    .replace(/₦/g, 'NGN')
    .replace(/[^\x00-\xFF]/g, '?'); // fallback for any other non-Latin-1 char
}

/**
 * Draws a simplified wallet icon using PDFKit vector primitives.
 * Matches the Wallet Tally brand icon shape.
 */
function drawWalletIcon(doc: PDFKit.PDFDocument, x: number, y: number, size: number) {
  const scale = size / 32;

  // Main wallet body
  doc
    .roundedRect(x, y + 3 * scale, 28 * scale, 20 * scale, 3 * scale)
    .fillAndStroke('#1e3a8a', '#1e3a8a');

  // Top slot line
  doc
    .moveTo(x, y + 7 * scale)
    .lineTo(x + 28 * scale, y + 7 * scale)
    .strokeColor('white')
    .lineWidth(0.5 * scale)
    .stroke();

  // Flap / pocket on right side
  doc
    .roundedRect(x + 14 * scale, y + 8 * scale, 14 * scale, 8 * scale, 2 * scale)
    .fillAndStroke('#1e3a8a', '#1e3a8a');

  // Clasp circle (white outer)
  doc
    .circle(x + 24 * scale, y + 12 * scale, 2.5 * scale)
    .fillAndStroke('white', 'white');

  // Clasp circle (inner dot)
  doc
    .circle(x + 24 * scale, y + 12 * scale, 1 * scale)
    .fillAndStroke('#1e3a8a', '#1e3a8a');
}

export async function exportTransactionsToPdf(
  email: string,
  transactions: any[],
  startDate: string,
  endDate: string,
  currencySymbol: string
) {
  try {
    // Use safe ASCII currency symbol throughout the PDF
    const sym = safe(currencySymbol);

    const doc = new PDFDocument({ margin: 40, size: 'A4', autoFirstPage: true });
    const chunks: Buffer[] = [];
    doc.on('data', (chunk) => chunks.push(chunk));

    // ── Header ──────────────────────────────────────────────────────────────
    // Wallet icon (drawn at 32px)
    drawWalletIcon(doc, 40, 36, 32);

    // "Wallet Tally" title next to icon
    doc
      .fontSize(24)
      .font('Helvetica-Bold')
      .fillColor('#1e293b')
      .text('Wallet Tally', 80, 40);

    doc
      .fontSize(10)
      .font('Helvetica')
      .fillColor('#64748b')
      .text('Transaction Report', 80, 68);

    // Divider
    doc
      .strokeColor('#cbd5e1')
      .lineWidth(1)
      .moveTo(40, 88)
      .lineTo(555, 88)
      .stroke();

    // Period info
    doc
      .fontSize(9)
      .font('Helvetica')
      .fillColor('#475569')
      .text(`Period: ${format(new Date(startDate), 'MMM dd, yyyy')} - ${format(new Date(endDate), 'MMM dd, yyyy')}`, 40, 103)
      .text(`Generated: ${format(new Date(), 'MMM dd, yyyy')}`, 40, 118);

    // ── Summary boxes ────────────────────────────────────────────────────────
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + (t.amount || 0), 0);
    const totalExpense = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + (t.amount || 0), 0);
    const netBalance = totalIncome - totalExpense;

    const summaryY = 140;

    // Income
    doc.rect(40, summaryY, 165, 50).fillAndStroke('#f0fdf4', '#f0fdf4');
    doc.rect(40, summaryY, 4, 50).fillAndStroke('#10b981', '#10b981');
    doc.fontSize(8).font('Helvetica-Bold').fillColor('#64748b').text('INCOME', 55, summaryY + 10);
    doc.fontSize(16).font('Helvetica-Bold').fillColor('#10b981').text(`${sym}${totalIncome.toFixed(2)}`, 55, summaryY + 26);

    // Expense
    doc.rect(215, summaryY, 165, 50).fillAndStroke('#fef2f2', '#fef2f2');
    doc.rect(215, summaryY, 4, 50).fillAndStroke('#ef4444', '#ef4444');
    doc.fontSize(8).font('Helvetica-Bold').fillColor('#64748b').text('EXPENSE', 230, summaryY + 10);
    doc.fontSize(16).font('Helvetica-Bold').fillColor('#ef4444').text(`${sym}${totalExpense.toFixed(2)}`, 230, summaryY + 26);

    // Net
    doc.rect(390, summaryY, 165, 50).fillAndStroke('#eff6ff', '#eff6ff');
    doc.rect(390, summaryY, 4, 50).fillAndStroke('#3b82f6', '#3b82f6');
    doc.fontSize(8).font('Helvetica-Bold').fillColor('#64748b').text('NET', 405, summaryY + 10);
    doc.fontSize(16).font('Helvetica-Bold').fillColor(netBalance >= 0 ? '#10b981' : '#ef4444').text(`${sym}${netBalance.toFixed(2)}`, 405, summaryY + 26);

    // ── Table ────────────────────────────────────────────────────────────────
    const tableTop = 215;
    doc
      .fontSize(8).font('Helvetica-Bold').fillColor('#64748b')
      .text('DATE', 40, tableTop)
      .text('TYPE', 110, tableTop)
      .text('CATEGORY', 180, tableTop)
      .text('DESCRIPTION', 280, tableTop)
      .text('AMOUNT', 480, tableTop, { align: 'right', width: 75 });

    doc
      .strokeColor('#cbd5e1').lineWidth(0.5)
      .moveTo(40, tableTop + 14).lineTo(555, tableTop + 14).stroke();

    const rowHeight = 22;
    const badgeHeight = 14;
    // Leave room for footer (30px) + total line (20px)
    const usableBottom = doc.page.height - doc.page.margins.bottom - 50;
    let currentY = tableTop + 24;

    transactions.forEach((t, index) => {
      // Page overflow check
      if (currentY + rowHeight > usableBottom) {
        doc.addPage();
        currentY = 50;

        doc
          .fontSize(8).font('Helvetica-Bold').fillColor('#64748b')
          .text('DATE', 40, currentY)
          .text('TYPE', 110, currentY)
          .text('CATEGORY', 180, currentY)
          .text('DESCRIPTION', 280, currentY)
          .text('AMOUNT', 480, currentY, { align: 'right', width: 75 });

        doc
          .strokeColor('#cbd5e1').lineWidth(0.5)
          .moveTo(40, currentY + 14).lineTo(555, currentY + 14).stroke();

        currentY += 24;
      }

      // Alternating row bg
      if (index % 2 === 0) {
        doc.rect(40, currentY - 4, 515, rowHeight).fill('#fafafa');
      }

      const dateStr = t.date ? format(new Date(t.date), 'MMM dd, yyyy') : 'N/A';
      const isIncome = t.type === 'income';

      // Date
      doc.fontSize(8).font('Helvetica').fillColor('#334155').text(dateStr, 40, currentY);

      // Type badge
      const typeIcon = isIncome ? '+' : '-';
      const typeText = isIncome ? 'INCOME' : 'EXPENSE';
      const typeColor = isIncome ? '#059669' : '#dc2626';
      const typeBg = isIncome ? '#d1fae5' : '#fee2e2';
      doc.roundedRect(110, currentY - 2, 58, badgeHeight, 3).fillAndStroke(typeBg, typeBg);
      doc.fontSize(7).font('Helvetica-Bold').fillColor(typeColor).text(`${typeIcon} ${typeText}`, 113, currentY + 1);

      // Category badge
      const catText = safe(t.category || '-');
      const catWidth = Math.min(doc.widthOfString(catText, { fontSize: 7 }) + 10, 85);
      doc.roundedRect(180, currentY - 2, catWidth, badgeHeight, 3).fillAndStroke('#dbeafe', '#dbeafe');
      doc.fontSize(7).font('Helvetica-Bold').fillColor('#2563eb').text(catText, 183, currentY + 1, { width: 82, ellipsis: true });

      // Description
      doc.fontSize(8).font('Helvetica').fillColor('#64748b')
        .text(safe(t.description || '-'), 280, currentY, { width: 190, ellipsis: true });

      // Amount — use plain +/- prefix, no currency superscript
      const amountStr = `${isIncome ? '+' : '-'} ${sym}${Number(t.amount || 0).toFixed(2)}`;
      doc.fontSize(9).font('Helvetica-Bold').fillColor(isIncome ? '#10b981' : '#ef4444')
        .text(amountStr, 480, currentY, { align: 'right', width: 75 });

      currentY += rowHeight;
    });

    // Total count line
    currentY += 10;
    doc
      .fontSize(8).font('Helvetica').fillColor('#94a3b8')
      .text(`Total Transactions: ${transactions.length}`, 40, currentY);

    // ── Footer (positioned relative to current content, not page bottom) ────
    doc
      .fontSize(7).font('Helvetica').fillColor('#94a3b8')
      .text('Wallet Tally - Personal Finance Management', 40, currentY + 20, { align: 'center', width: 515 });

    doc.end();

    const pdfBuffer = await new Promise<Buffer>((resolve) => {
      doc.on('end', () => resolve(Buffer.concat(chunks)));
    });

    await sendMail({
      to: email,
      subject: `Wallet Tally Transaction Report: ${format(new Date(startDate), 'MMM dd, yyyy')} - ${format(new Date(endDate), 'MMM dd, yyyy')}`,
      text: `Please find attached your Wallet Tally transaction report.`,
      html: `
        <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;padding:40px 20px;">
          <div style="text-align:center;margin-bottom:30px;">
            <h1 style="color:#1e293b;font-size:24px;margin:0 0 8px 0;">Wallet Tally</h1>
            <p style="color:#64748b;font-size:14px;margin:0;">Transaction Report Ready</p>
          </div>
          <div style="background:#fff;border:1px solid #e2e8f0;border-radius:8px;padding:30px;margin-bottom:20px;">
            <div style="background:#f8fafc;border-left:3px solid #3b82f6;padding:15px;margin-bottom:20px;">
              <p style="color:#64748b;font-size:12px;font-weight:600;margin:0 0 8px 0;text-transform:uppercase;">Report Period</p>
              <p style="color:#1e293b;font-size:14px;margin:0;">${format(new Date(startDate), 'MMMM dd, yyyy')} - ${format(new Date(endDate), 'MMMM dd, yyyy')}</p>
            </div>
            <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:15px;">
              <div style="background:#f0fdf4;border-left:3px solid #10b981;padding:12px;border-radius:4px;">
                <p style="color:#64748b;font-size:11px;font-weight:600;margin:0 0 4px 0;text-transform:uppercase;">Income</p>
                <p style="color:#10b981;font-size:16px;font-weight:bold;margin:0;">${sym}${totalIncome.toFixed(2)}</p>
              </div>
              <div style="background:#fef2f2;border-left:3px solid #ef4444;padding:12px;border-radius:4px;">
                <p style="color:#64748b;font-size:11px;font-weight:600;margin:0 0 4px 0;text-transform:uppercase;">Expense</p>
                <p style="color:#ef4444;font-size:16px;font-weight:bold;margin:0;">${sym}${totalExpense.toFixed(2)}</p>
              </div>
              <div style="background:#eff6ff;border-left:3px solid #3b82f6;padding:12px;border-radius:4px;">
                <p style="color:#64748b;font-size:11px;font-weight:600;margin:0 0 4px 0;text-transform:uppercase;">Net</p>
                <p style="color:${netBalance >= 0 ? '#10b981' : '#ef4444'};font-size:16px;font-weight:bold;margin:0;">${sym}${netBalance.toFixed(2)}</p>
              </div>
            </div>
            <div style="margin-top:20px;padding-top:15px;border-top:1px solid #e2e8f0;">
              <p style="color:#64748b;font-size:13px;margin:0;"><strong>Total Transactions:</strong> ${transactions.length}</p>
            </div>
          </div>
          <div style="text-align:center;padding-top:20px;border-top:1px solid #e2e8f0;">
            <p style="color:#94a3b8;font-size:12px;margin:0;">This is an automated email from Wallet Tally<br>Please do not reply to this message</p>
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
