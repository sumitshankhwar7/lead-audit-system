const storage = require('../utils/storage');

exports.getReport = async (req, res) => {
  try {
    const { id } = req.params;
    const report = await storage.getReportById(id);
    
    if (!report) {
      return res.status(404).json({ success: false, error: 'Report not found' });
    }

    res.json({ success: true, report });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.downloadReport = async (req, res) => {
  try {
    const { id } = req.params;
    const path = require('path');
    const fs = require('fs');
    
    const fileName = `report_${id}.pdf`;
    const filePath = path.join(__dirname, '../../uploads/reports', fileName);

    if (fs.existsSync(filePath)) {
      res.download(filePath, fileName);
    } else {
      res.status(404).json({ success: false, error: 'PDF not found' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};
