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

    // Step 1: Calculate Score
    const auditEngine = new AuditEngine();
    const scores = auditEngine.calculateScore(formData);

    // Step 2: Generate Recommendations
    const recoEngine = new RecommendationEngine();
    const recommendations = recoEngine.generateRecommendations(formData, scores);

    // Step 3: Calculate Revenue Gap
    const revenueCalc = new RevenueCalculator();
    const revenueData = revenueCalc.calculate(formData, recommendations);

    // Step 4: Generate Report Structure
    const reportGen = new ReportGenerator();
    const report = reportGen.generate(formData, scores, recommendations, revenueData);

    // Step 5: Generate PDF
    const pdfPath = await PDFGenerator.generate(report);

    // Step 6: Save to Storage
    await storage.saveReport(report);

    res.json({
      success: true,
      report: report,
      pdfUrl: `/uploads/reports/${pdfPath}`,
      downloadLink: `/api/report/download/${report.reportId}`
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}

module.exports = { processAudit };