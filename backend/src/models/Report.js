const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  reportId: { type: String, required: true, unique: true },
  generatedAt: { type: Date, default: Date.now },
  generatedDate: { type: String },
  businessSummary: {
    name: { type: String },
    industry: { type: String },
    type: { type: String },
    location: { type: String },
    goals: {
      revenueTarget: { type: String },
      requiredLeads: { type: String },
      avgDealSize: { type: String }
    },
    painPoints: [{ type: String }]
  },
  auditDetails: {
    seo: {
      hasKeywords: { type: String },
      hasVisibility: { type: String },
      hasGmb: { type: String }
    },
    social: {
      platforms: [{ type: String }],
      frequency: { type: String },
      engagement: { type: String }
    },
    marketing: {
      linkedin: { type: String },
      whatsapp: { type: String },
      email: { type: String },
      businessEmail: { type: String }
    }
  },
  auditOverview: {
    totalScore: { type: Number },
    category: { type: String },
    breakdown: { type: mongoose.Schema.Types.Mixed },
    interpretation: { type: String }
  },
  gapAnalysis: [{
    area: { type: String },
    severity: { type: String },
    impact: { type: String }
  }],
  recommendations: {
    high: [mongoose.Schema.Types.Mixed],
    medium: [mongoose.Schema.Types.Mixed],
    low: [mongoose.Schema.Types.Mixed]
  },
  growthPlan: {
    shortTerm: [mongoose.Schema.Types.Mixed],
    midTerm: [mongoose.Schema.Types.Mixed],
    longTerm: [mongoose.Schema.Types.Mixed]
  },
  revenueOpportunity: {
    currentLeads: { type: Number },
    targetLeads: { type: Number },
    leadGap: { type: Number },
    revenueGap: { type: String },
    channelSplit: { type: mongoose.Schema.Types.Mixed },
    roi: { type: String }
  },
  nextSteps: [{ type: String }]
}, { timestamps: true, minimize: false });

module.exports = mongoose.model('Report', reportSchema);
