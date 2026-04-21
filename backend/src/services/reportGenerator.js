// backend/src/services/reportGenerator.js
class ReportGenerator {
  generate(businessInfo, scores, recommendations, revenueData) {
    const now = new Date();

    return {
      reportId: Date.now().toString(),
      generatedAt: now.toISOString(),
      generatedDate: now.toLocaleDateString(),

      businessSummary: {
        name: businessInfo.businessName,
        industry: businessInfo.industry,
        type: businessInfo.businessType,
        location: businessInfo.targetLocation,
        goals: {
          revenueTarget: businessInfo.monthlyRevenueTarget,
          requiredLeads: businessInfo.requiredLeadsPerMonth,
          avgDealSize: businessInfo.averageDealSize
        },
        painPoints: businessInfo.painPoints
      },

      auditOverview: {
        totalScore: scores.total,
        category: scores.category,
        breakdown: scores.breakdown,
        interpretation: this.getScoreInterpretation(scores.category)
      },

      gapAnalysis: this.generateGapAnalysis(businessInfo, scores),

      recommendations: {
        high: recommendations.filter(r => r.priority === 'High'),
        medium: recommendations.filter(r => r.priority === 'Medium'),
        low: recommendations.filter(r => r.priority === 'Low')
      },

      growthPlan: this.generateGrowthPlan(recommendations),

      revenueOpportunity: revenueData,

      nextSteps: this.generateNextSteps(recommendations)
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
    return recommendations
      .filter(r => r.priority === 'High')
      .slice(0, 5)
      .map(r => r.service);
  }
}

module.exports = ReportGenerator;