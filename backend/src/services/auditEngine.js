// backend/src/services/auditEngine.js
class AuditEngine {
  calculateScore(data) {
    let scores = {
      website: 0,
      seo: 0,
      social: 0,
      ads: 0,
      crm: 0
    };

    // Website Score (0-20)
    if (data.hasWebsite === 'yes' && data.websiteUrl) {
      scores.website = 20;
    } else {
      scores.website = 0;
    }

    // SEO Score (0-20)
    let seoCount = 0;
    if (data.rankingKeywords === 'yes') seoCount++;
    if (data.googleVisibility === 'yes') seoCount++;
    if (data.googleBusinessListing === 'yes') seoCount++;
    scores.seo = (seoCount / 3) * 20;

    // Social Media Score (0-20)
    let socialScore = 0;
    const platformCount = data.activePlatforms?.length || 0;
    socialScore += Math.min(platformCount * 4, 12); // Max 12 for platforms

    if (data.postingFrequency === 'daily') socialScore += 5;
    else if (data.postingFrequency === 'weekly') socialScore += 3;
    else if (data.postingFrequency === 'monthly') socialScore += 1;

    if (data.engagementLevel === 'high') socialScore += 3;
    else if (data.engagementLevel === 'medium') socialScore += 2;
    else if (data.engagementLevel === 'low') socialScore += 1;

    scores.social = Math.min(socialScore, 20);

    // Paid Ads Score (0-20)
    if (data.runningAds === 'yes' && data.monthlyBudget > 0) {
      scores.ads = 20;
    } else {
      scores.ads = 0;
    }

    // CRM Score (0-20)
    if (data.usingCrm === 'yes' && data.leadTrackingMethod === 'automated') {
      scores.crm = 20;
    } else if (data.usingCrm === 'yes' && data.leadTrackingMethod === 'manual') {
      scores.crm = 10;
    } else {
      scores.crm = 0;
    }

    const totalScore = Math.round(Object.values(scores).reduce((a, b) => a + b, 0) * 10) / 10;

    let category = '';
    if (totalScore <= 30) category = 'Poor';
    else if (totalScore <= 60) category = 'Average';
    else if (totalScore <= 80) category = 'Good';
    else category = 'Strong';

    // Round breakdown scores
    const roundedBreakdown = {};
    Object.entries(scores).forEach(([key, val]) => {
      roundedBreakdown[key] = Math.round(val * 10) / 10;
    });

    return {
      total: totalScore,
      category: category,
      breakdown: roundedBreakdown
    };
  }
}

module.exports = AuditEngine;