// backend/src/services/reportGenerator.js
class ReportGenerator {
  generate(businessInfo, scores, recommendations, revenueData) {
    const now = new Date();
    const safeRecommendations = Array.isArray(recommendations) ? recommendations : [];

    return {
      reportId: Date.now().toString(),
      generatedAt: now.toISOString(),
      generatedDate: now.toLocaleDateString(),

      businessSummary: {
        name: businessInfo.businessName || 'Not specified',
        industry: businessInfo.industry || 'Not specified',
        type: businessInfo.businessType || 'Not specified',
        location: businessInfo.targetLocation || 'Not specified',
        goals: {
          revenueTarget: businessInfo.monthlyRevenueTarget || 'Not specified',
          requiredLeads: businessInfo.requiredLeadsPerMonth || 0,
          avgDealSize: businessInfo.averageDealSize || 0
        },
        painPoints: Array.isArray(businessInfo.painPoints) ? businessInfo.painPoints : []
      },

      auditOverview: {
        totalScore: scores.total || 0,
        category: scores.category || 'Unknown',
        breakdown: scores.breakdown || {},
        interpretation: this.getScoreInterpretation(scores.category)
      },

      gapAnalysis: this.generateGapAnalysis(businessInfo, scores),

      recommendations: {
        high: safeRecommendations.filter(r => r && r.priority === 'High'),
        medium: safeRecommendations.filter(r => r && r.priority === 'Medium'),
        low: safeRecommendations.filter(r => r && r.priority === 'Low')
      },

      growthPlan: this.generateGrowthPlan(safeRecommendations),

      revenueOpportunity: this.sanitizeRevenueData(revenueData),

      nextSteps: this.generateNextSteps(safeRecommendations)
    };
  }

  getScoreInterpretation(category) {
    const interpretations = {
      'Poor': 'Your business has critical gaps in digital presence. Immediate action required.',
      'Average': 'Moderate digital presence with significant room for improvement.',
      'Good': 'Good foundation with optimization opportunities available.',
      'Strong': 'Excellent digital strategy. Focus on scaling and automation.'
    };
    return interpretations[category];
  }

  generateGapAnalysis(data, scores) {
    const gaps = [];

    if (scores.breakdown.website === 0) {
      gaps.push({ area: 'Website', severity: 'Critical', impact: 'No online presence' });
    }

    if (scores.breakdown.seo < 10) {
      gaps.push({ area: 'SEO', severity: 'High', impact: 'Low visibility in search' });
    }

    if (scores.breakdown.social < 10) {
      gaps.push({ area: 'Social Media', severity: 'Medium', impact: 'Missed engagement opportunities' });
    }

    if (scores.breakdown.ads === 0) {
      gaps.push({ area: 'Paid Advertising', severity: 'High', impact: 'No paid lead generation' });
    }

    if (scores.breakdown.crm === 0) {
      gaps.push({ area: 'CRM', severity: 'Critical', impact: 'Lead leakage risk' });
    }

    return gaps;
  }

  generateGrowthPlan(recommendations) {
    return {
      shortTerm: recommendations.filter(r => r.impact === 'Immediate').slice(0, 3),
      midTerm: recommendations.filter(r => r.impact === 'Medium-term').slice(0, 3),
      longTerm: recommendations.filter(r => r.impact === 'Long-term').slice(0, 3)
    };
  }

  generateNextSteps(recommendations) {
    if (!Array.isArray(recommendations) || recommendations.length === 0) {
      return [];
    }
    return recommendations
      .filter(r => r && r.priority === 'High')
      .slice(0, 5)
      .map(r => r.service || 'Action required')
      .filter(step => step); // Remove empty strings
  }

  sanitizeRevenueData(revenueData) {
    return {
      currentLeads: revenueData?.currentLeads || 0,
      targetLeads: revenueData?.targetLeads || 0,
      leadGap: revenueData?.leadGap || 0,
      revenueGap: revenueData?.revenueGap || '₹0',
      channelSplit: revenueData?.channelSplit || { seo: 0, paidAds: 0, social: 0 },
      roi: revenueData?.roi || 'N/A'
    };
  }
}

module.exports = ReportGenerator;