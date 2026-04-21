const pdf = require('html-pdf');
const fs = require('fs');
const path = require('path');

exports.generate = async (reportData) => {
  return new Promise((resolve, reject) => {
    try {
      const fileName = `report_${reportData.reportId}.pdf`;
      const reportsDir = path.join(__dirname, '../../uploads/reports');

      if (!fs.existsSync(reportsDir)) {
        fs.mkdirSync(reportsDir, { recursive: true });
      }

      const filePath = path.join(reportsDir, fileName);

      // Rounding helper
      const round = (num) => Math.round(Number(num) * 10) / 10;

      // PhantomJS compatible CSS: NO CSS VARIABLES, use tables and floats instead of flex/grid.
      const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap');
          
          body {
            font-family: 'Inter', Arial, sans-serif;
            color: #1F2937;
            margin: 0;
            padding: 0;
            background: #FFFFFF;
          }

          .page-break {
            page-break-before: always;
          }

          .header {
            border-bottom: 2px solid #F1F5F9;
            padding-bottom: 15px;
            margin-bottom: 20px;
          }

          .header table {
            width: 100%;
          }

          .header td {
            vertical-align: middle;
          }

          .logo-box {
            width: 36px;
            height: 36px;
            background-color: #4F46E5;
            border-radius: 8px;
            display: inline-block;
            vertical-align: middle;
          }

          .report-title {
            font-size: 24px;
            font-weight: 800;
            color: #4F46E5;
            display: inline-block;
            vertical-align: middle;
            margin-left: 10px;
          }

          .header-meta {
            text-align: right;
            font-size: 11px;
            color: #64748B;
            font-weight: 600;
          }

          /* Score Card Gradient */
          .score-card {
            background-color: #4F46E5; /* Fallback */
            background-image: linear-gradient(135deg, #4F46E5 0%, #3730A3 100%);
            border-radius: 15px;
            padding: 30px;
            color: #FFFFFF;
            margin-bottom: 30px;
          }

          .score-card table {
            width: 100%;
            color: #FFFFFF;
          }

          .score-label {
            font-size: 12px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 5px;
          }

          .score-value {
            font-size: 60px;
            font-weight: 900;
          }

          .score-total {
            font-size: 20px;
          }

          .category-badge {
            background-color: #3730A3;
            padding: 10px 20px;
            border-radius: 50px;
            font-weight: 700;
            font-size: 16px;
            text-align: center;
          }

          /* Business Summary Table */
          .section-title {
            font-size: 18px;
            font-weight: 800;
            text-transform: uppercase;
            color: #4F46E5;
            margin-bottom: 15px;
            border-bottom: 1px solid #E2E8F0;
            padding-bottom: 5px;
          }

          .summary-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
            border: 1px solid #E2E8F0;
          }

          .summary-table td {
            padding: 12px 15px;
            border-bottom: 1px solid #E2E8F0;
            font-size: 13px;
          }

          .summary-table td.label {
            background-color: #F8FAFC;
            font-weight: 700;
            width: 35%;
            color: #64748B;
          }

          /* Breakdown Progress Bars */
          .breakdown-table {
            width: 100%;
            border-collapse: separate;
            border-spacing: 10px;
            margin-bottom: 30px;
          }

          .breakdown-item {
            background-color: #F8FAFC;
            padding: 15px;
            border-radius: 10px;
            border: 1px solid #F1F5F9;
            width: 45%;
            display: inline-block;
            margin-bottom: 10px;
            box-sizing: border-box;
          }

          .breakdown-info {
            margin-bottom: 8px;
          }

          .breakdown-name {
            font-weight: 700;
            font-size: 12px;
          }

          .breakdown-val {
            font-weight: 800;
            font-size: 13px;
            color: #4F46E5;
            float: right;
          }

          .progress-bg {
            height: 8px;
            background-color: #E2E8F0;
            border-radius: 4px;
            width: 100%;
          }

          .progress-fill {
            height: 100%;
            background-color: #4F46E5;
            border-radius: 4px;
          }

          /* Gap Analysis */
          .gap-item {
            padding: 15px;
            background-color: #FFF7ED;
            border-left: 5px solid #F59E0B;
            margin-bottom: 15px;
          }

          .gap-item.critical {
            background-color: #FEF2F2;
            border-left-color: #EF4444;
          }

          .gap-title {
            font-weight: 800;
            font-size: 14px;
            margin-bottom: 5px;
          }

          .gap-desc {
            font-size: 12px;
            color: #64748B;
          }

          /* Recommendations */
          .reco-card {
            padding: 15px;
            border: 1px solid #E2E8F0;
            margin-bottom: 15px;
            page-break-inside: avoid;
          }

          .reco-card.high { border-left: 5px solid #EF4444; background-color: #FEF2F2; }
          .reco-card.medium { border-left: 5px solid #4F46E5; background-color: #EEF2FF; }
          .reco-card.low { border-left: 5px solid #10B981; background-color: #ECFDF5; }

          .reco-title { font-weight: 800; font-size: 14px; margin-bottom: 5px; }
          .reco-desc { font-size: 12px; color: #64748B; }

          /* Revenue Table */
          .revenue-box {
            background-color: #1F2937;
            color: #FFFFFF;
            padding: 25px;
            border-radius: 15px;
            margin-top: 30px;
          }

          .revenue-val {
            font-size: 36px;
            font-weight: 900;
            color: #10B981;
          }

          /* Timeline */
          .timeline-item {
            margin-bottom: 20px;
            padding-left: 20px;
            border-left: 3px solid #E2E8F0;
          }

          .timeline-title {
            font-weight: 800;
            font-size: 13px;
            margin-bottom: 5px;
          }

          .timeline-title.phase1 { color: #4F46E5; }
          .timeline-title.phase2 { color: #10B981; }
          .timeline-title.phase3 { color: #F59E0B; }

          .timeline-desc {
            font-size: 12px;
            color: #64748B;
          }
        </style>
      </head>
      <body>
        <!-- PAGE 1 -->
        <div class="header">
          <table>
            <tr>
              <td>
                <div class="logo-box"></div>
                <div class="report-title">DIGITAL AUDIT REPORT</div>
              </td>
              <td class="header-meta">
                <div>REPORT ID: ${reportData.reportId}</div>
                <div>DATE: ${reportData.generatedDate}</div>
              </td>
            </tr>
          </table>
        </div>

        <div class="score-card">
          <table>
            <tr>
              <td width="70%">
                <div class="score-label">Overall Performance Score</div>
                <div class="score-value">${round(reportData.auditOverview.totalScore)}<span class="score-total">/100</span></div>
              </td>
              <td width="30%" align="right">
                <div class="category-badge">${reportData.auditOverview.category} STATUS</div>
              </td>
            </tr>
          </table>
        </div>

        <div class="section-title">Business Overview</div>
        <table class="summary-table">
          <tr><td class="label">Company Name</td><td>${reportData.businessSummary.name}</td></tr>
          <tr><td class="label">Industry Sector</td><td>${reportData.businessSummary.industry}</td></tr>
          <tr><td class="label">Business Model</td><td>${reportData.businessSummary.type}</td></tr>
          <tr><td class="label">Target Market</td><td>${reportData.businessSummary.location}</td></tr>
        </table>

        <div class="section-title">Key Performance Indicators</div>
        <div style="width: 100%;">
          ${Object.entries(reportData.auditOverview.breakdown).map(([key, val], index) => `
            <div class="breakdown-item" style="${index % 2 === 0 ? 'margin-right: 4%;' : ''}">
              <div class="breakdown-info">
                <span class="breakdown-name">${key.toUpperCase()}</span>
                <span class="breakdown-val">${round(val)}/20</span>
              </div>
              <div class="progress-bg">
                <div class="progress-fill" style="width: ${(val / 20) * 100}%;"></div>
              </div>
            </div>
          `).join('')}
        </div>

        <div class="page-break"></div>

        <!-- PAGE 2 -->
        <div class="section-title">Gap Analysis & Risk Assessment</div>
        <div>
          ${reportData.gapAnalysis.map(gap => `
            <div class="gap-item ${gap.severity.toLowerCase()}">
              <div class="gap-title">${gap.area}</div>
              <div class="gap-desc">${gap.impact}</div>
            </div>
          `).join('')}
        </div>

        <div style="margin-top: 30px;"></div>
        <div class="section-title">Strategic Recommendations</div>
        <div>
          ${[...(reportData.recommendations.high || []), ...(reportData.recommendations.medium || []), ...(reportData.recommendations.low || [])].slice(0, 8).map(reco => `
            <div class="reco-card ${reco.priority.toLowerCase()}">
              <div class="reco-title">${reco.service}</div>
              <div class="reco-desc">${reco.description}</div>
            </div>
          `).join('')}
        </div>

        <div class="page-break"></div>

        <!-- PAGE 3 -->
        <div class="section-title">Growth & Revenue Potential</div>
        <div class="revenue-box">
          <table>
            <tr>
              <td width="60%">
                <div style="font-size: 11px; opacity: 0.9; margin-bottom: 5px; font-weight: 700; letter-spacing: 1px;">ESTIMATED ANNUAL REVENUE GAP</div>
                <div class="revenue-val">₹${reportData.revenueOpportunity.revenueGap}</div>
              </td>
              <td width="40%" align="right">
                <div style="font-size: 12px; margin-bottom: 5px;">Expected ROI: <span style="color: #10B981; font-weight: 800;">${reportData.revenueOpportunity.roi}</span></div>
                <div style="font-size: 12px;">Lead Gap: <span style="font-weight: 800;">${reportData.revenueOpportunity.leadGap} Leads</span></div>
              </td>
            </tr>
          </table>
        </div>

        <div style="margin-top: 30px;"></div>
        <div class="section-title">Growth Roadmap Timeline</div>
        <div>
          <div class="timeline-item">
            <div class="timeline-title phase1">PHASE 1: IMMEDIATE WINS (0-3 Months)</div>
            ${reportData.growthPlan.shortTerm.map(item => `<div class="timeline-desc">• ${item.service}</div>`).join('')}
          </div>
          <div class="timeline-item">
            <div class="timeline-title phase2">PHASE 2: SCALING & EXPANSION (3-6 Months)</div>
            ${reportData.growthPlan.midTerm.map(item => `<div class="timeline-desc">• ${item.service}</div>`).join('')}
          </div>
          <div class="timeline-item">
            <div class="timeline-title phase3">PHASE 3: LONG-TERM OPTIMIZATION (6-12 Months)</div>
            ${reportData.growthPlan.longTerm.map(item => `<div class="timeline-desc">• ${item.service}</div>`).join('')}
          </div>
        </div>

        <div style="margin-top: 30px;"></div>
        <div class="section-title">Immediate Next Steps</div>
        <ul style="font-size: 13px; color: #64748B; padding-left: 20px;">
          ${reportData.nextSteps.map(step => `<li style="margin-bottom: 5px;">${step}</li>`).join('')}
        </ul>
      </body>
      </html>
      `;

      // CRITICAL: Options exactly as requested by user
      const options = {
        format: 'A4',
        orientation: 'portrait',
        border: '10mm',
        printBackground: true,     // CRITICAL: Enables background colors
        quality: '100',            // High quality rendering
        zoomFactor: 1.2,           // Proper scaling
        phantomPath: null,         // Use built-in renderer
        script: null,              // No external scripts needed
        timeout: 30000,            // Allow time for rendering
        footer: {
          height: "10mm",
          contents: {
            default: '<div style="color: #64748B; font-size: 9px; text-align: center; border-top: 1px solid #E2E8F0; padding-top: 5px;">Lead Audit System • Premium Strategic Analysis • Page {{page}} of {{pages}}</div>'
          }
        }
      };

      pdf.create(htmlContent, options).toFile(filePath, (err, res) => {
        if (err) {
          console.error('PDF Generation Error:', err);
          return reject(err);
        }
        resolve(fileName);
      });

    } catch (error) {
      console.error('PDF Generation Error:', error);
      reject(error);
    }
  });
};
