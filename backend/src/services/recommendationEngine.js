// backend/src/services/recommendationEngine.js
class RecommendationEngine {
  generateRecommendations(data, scores) {
    const recommendations = [];

    // Website Recommendations
    if (data.hasWebsite === 'no') {
      recommendations.push({
        service: 'Website Development',
        description: 'Create a professional website to establish online presence',
        priority: 'High',
        impact: 'Immediate'
      });
    } else if (data.monthlyTraffic < 1000 && data.monthlyTraffic !== '') {
      recommendations.push({
        service: 'SEO Services',
        description: 'Increase website traffic through organic search',
        priority: 'High',
        impact: 'Medium-term'
      });
    }

    // SEO Recommendations
    if (data.rankingKeywords === 'no') {
      recommendations.push({
        service: 'Keyword Research & SEO',
        description: 'Target high-intent keywords to generate qualified leads',
        priority: 'High',
        impact: 'Medium-term'
      });
    }

    if (data.googleBusinessListing === 'no') {
      recommendations.push({
        service: 'Google Business Profile Optimization',
        description: 'List your business on Google Maps and local search',
        priority: 'Medium',
        impact: 'Quick Win'
      });
    }

    // Social Media Recommendations
    const hasSocial = data.activePlatforms?.length > 0;
    if (!hasSocial) {
      recommendations.push({
        service: 'Social Media Marketing',
        description: 'Build brand presence on social platforms',
        priority: 'Medium',
        impact: 'Long-term'
      });
    } else if (data.engagementLevel === 'low') {
      recommendations.push({
        service: 'Social Media Management',
        description: 'Improve engagement with better content strategy',
        priority: 'Medium',
        impact: 'Medium-term'
      });
    }

    // Paid Ads Recommendations
    if (data.runningAds === 'no') {
      const hasPainPoint = data.painPoints?.includes('No leads') ||
        data.painPoints?.includes('Low quality leads');
      if (hasPainPoint) {
        recommendations.push({
          service: 'Paid Advertising (Google/Facebook Ads)',
          description: 'Generate immediate leads through targeted ads',
          priority: 'High',
          impact: 'Immediate'
        });
      }
    }

    // CRM Recommendations
    if (data.usingCrm === 'no') {
      recommendations.push({
        service: 'CRM Setup',
        description: 'Track leads and prevent revenue leakage',
        priority: 'High',
        impact: 'Immediate'
      });
    } else if (data.leadTrackingMethod === 'manual') {
      recommendations.push({
        service: 'CRM Automation',
        description: 'Automate lead tracking for better efficiency',
        priority: 'Medium',
        impact: 'Medium-term'
      });
    }

    // Pain Point Based Recommendations
    if (data.painPoints?.includes('High cost per lead')) {
      recommendations.push({
        service: 'Lead Generation Optimization',
        description: 'Reduce cost per lead through better targeting',
        priority: 'High',
        impact: 'Immediate'
      });
    }

    if (data.painPoints?.includes('Low conversion')) {
      recommendations.push({
        service: 'Conversion Rate Optimization (CRO)',
        description: 'Improve website and sales funnel conversion',
        priority: 'High',
        impact: 'Medium-term'
      });
    }

    return recommendations;
  }
}

module.exports = RecommendationEngine;