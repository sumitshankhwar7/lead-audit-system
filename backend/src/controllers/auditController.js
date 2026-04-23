// backend/src/controllers/auditController.js
const AuditEngine = require('../services/auditEngine');
const RecommendationEngine = require('../services/recommendationEngine');
const RevenueCalculator = require('../services/revenueCalculator');
const ReportGenerator = require('../services/reportGenerator');
const PDFGenerator = require('../services/pdfGenerator');
const storage = require('../utils/storage');

async function processAudit(req, res) {
  try {
    const formData = req.body;

    if (!formData) {
      return res.status(400).json({ success: false, error: 'No form data provided' });
    }

    // Step 1: Calculate Score
    const auditEngine = new AuditEngine();
    const scores = auditEngine.calculateScore(formData);

    if (!scores || !scores.breakdown) {
      return res.status(500).json({ success: false, error: 'Failed to calculate audit scores' });
    }

    // Step 2: Generate Recommendations
    const recoEngine = new RecommendationEngine();
    const recommendations = recoEngine.generateRecommendations(formData, scores);

    if (!Array.isArray(recommendations)) {
      console.warn('Recommendations not an array, converting to empty array');
    }

    // Step 3: Calculate Revenue Gap
    const revenueCalc = new RevenueCalculator();
    const revenueData = revenueCalc.calculate(formData, recommendations);

    if (!revenueData) {
      return res.status(500).json({ success: false, error: 'Failed to calculate revenue gap' });
    }

    // Step 4: Generate Report Structure
    const reportGen = new ReportGenerator();
    const report = reportGen.generate(formData, scores, recommendations, revenueData);

    if (!report || !report.reportId) {
      return res.status(500).json({ success: false, error: 'Failed to generate report structure' });
    }

    // Step 5: Generate PDF
    const pdfPath = await PDFGenerator.generate(report).catch(err => {
      console.error('PDF Generation Error:', err);
      throw new Error(`PDF generation failed: ${err.message}`);
    });

    // Step 6: Save to Storage
    await storage.saveReport(report).catch(err => {
      console.error('Storage Error:', err);
      throw new Error(`Failed to save report: ${err.message}`);
    });

    res.json({
      success: true,
      report: report,
      pdfUrl: `/uploads/reports/${pdfPath}`,
      downloadLink: `/api/report/download/${report.reportId}`
    });

  } catch (error) {
    console.error('Audit Processing Error:', error);
    res.status(500).json({ success: false, error: error.message || 'Failed to generate report' });
  }
}

module.exports = { processAudit };