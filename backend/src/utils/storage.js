const Report = require('../models/Report');

exports.saveReport = async (reportData) => {
  const report = new Report(reportData);
  await report.save();
  return report;
};

exports.getReportById = async (id) => {
  return await Report.findOne({ reportId: id });
};

exports.getAllReports = async () => {
  return await Report.find().sort({ createdAt: -1 });
};
