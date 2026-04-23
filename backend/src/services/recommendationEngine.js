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
        service: 'SEO & Keyword Research',
        description: 'Target high-intent keywords to generate qualified leads',
        priority: 'High',
        impact: 'Medium-term'
      });
    }

    if (data.googleBusinessListing === 'no') {
      recommendations.push({
        service: 'Google Business Profile Optimization',
        description: 'CRITICAL: Your business is missing from local search. Setup and optimize your Google Business Profile to capture local customers.',
        priority: 'High',
        impact: 'Immediate'
      });
    }

    // Social Media Recommendations
    const hasSocial = data.activePlatforms?.length > 0;
    if (!hasSocial) {
      recommendations.push({
        service: 'Social Media Presence Setup',
        description: 'Launch professional profiles on Instagram, Facebook, and LinkedIn to build trust and brand awareness.',
        priority: 'Medium',
        impact: 'Long-term'
      });
    } else if (data.engagementLevel === 'low' || data.engagementLevel === 'medium') {
      recommendations.push({
        service: 'Social Media Engagement Strategy',
        description: 'Implement a content calendar with interactive posts (polls, reels, Q&A) to boost audience engagement.',
        priority: 'Medium',
        impact: 'Medium-term'
      });
    }

    if (data.postingFrequency === 'monthly' || data.postingFrequency === 'weekly') {
      recommendations.push({
        service: 'Consistent Content Creation',
        description: 'Increase posting frequency to daily to stay top-of-mind for your audience.',
        priority: 'Medium',
        impact: 'Long-term'
      });
    }

    // Paid Ads Recommendations
    if (data.runningAds === 'no') {
      const hasPainPoint = data.painPoints?.includes('Not enough leads') ||
        data.painPoints?.includes('Low quality leads');
      if (hasPainPoint) {
        recommendations.push({
          service: 'Direct Lead Generation Ads',
          description: 'Deploy Google Search Ads or Meta Lead Forms to capture immediate intent-based leads.',
          priority: 'High',
          impact: 'Immediate'
        });
      }
    }

    // CRM Recommendations
    if (data.usingCrm === 'no') {
      recommendations.push({
        service: 'CRM Implementation',
        description: 'Setup a CRM (like HubSpot or Zoho) to capture every lead and prevent revenue leakage.',
        priority: 'High',
        impact: 'Immediate'
      });
    } else if (data.leadTrackingMethod === 'manual') {
      recommendations.push({
        service: 'Lead Tracking Automation',
        description: 'Automate lead entry from website and social media directly into your CRM.',
        priority: 'Medium',
        impact: 'Medium-term'
      });
    }

    // LinkedIn (B2B) Recommendations
    if (data.businessType === 'B2B' && data.usingLinkedIn === 'no') {
      recommendations.push({
        service: 'LinkedIn B2B Marketing',
        description: 'Establish professional authority and generate high-quality B2B leads through LinkedIn outreach and content.',
        priority: 'High',
        impact: 'Medium-term'
      });
    }

    // WhatsApp Marketing Recommendations
    if (data.usingWhatsApp === 'no') {
      recommendations.push({
        service: 'WhatsApp Marketing & Automation',
        description: 'Reach customers directly on their favorite messaging app for 98% open rates and instant engagement.',
        priority: 'Medium',
        impact: 'Immediate'
      });
    }

    // Email Marketing Recommendations
    if (data.usingEmailMarketing === 'no') {
      recommendations.push({
        service: 'Email Marketing & Newsletters',
        description: 'Build a loyal customer base and drive repeat sales through targeted email campaigns and automated flows.',
        priority: 'Medium',
        impact: 'Long-term'
      });
    }

    // Business Email Recommendations
    if (data.usingBusinessEmail === 'no') {
      recommendations.push({
        service: 'Professional Business Email',
        description: 'Enhance your brand trust by using a custom domain email (name@yourbusiness.com) instead of generic Gmail/Yahoo.',
        priority: 'High',
        impact: 'Immediate'
      });
    }

    // Pain Point Based Recommendations (Detailed Solutions)
    if (data.painPoints?.includes('Not enough leads')) {
      recommendations.push({
        service: 'Inbound Lead Magnet Strategy',
        description: 'Create high-value assets (ebooks, webinars, calculators) to attract more prospects.',
        priority: 'High',
        impact: 'Immediate'
      });
    }

    if (data.painPoints?.includes('Low quality leads')) {
      recommendations.push({
        service: 'Lead Qualification System',
        description: 'Implement pre-qualification forms and intent-based targeting to filter out non-serious inquiries.',
        priority: 'High',
        impact: 'Immediate'
      });
    }

    if (data.painPoints?.includes('High cost per lead')) {
      recommendations.push({
        service: 'Ad Campaign Optimization',
        description: 'Refine audience targeting and A/B test ad creatives to lower your CPL by 20-30%.',
        priority: 'High',
        impact: 'Immediate'
      });
    }

    if (data.painPoints?.includes('Poor website conversion')) {
      recommendations.push({
        service: 'Conversion Rate Optimization (CRO)',
        description: 'Redesign landing pages with clear CTAs and trust signals to turn more visitors into customers.',
        priority: 'High',
        impact: 'Medium-term'
      });
    }

    if (data.painPoints?.includes('No time for marketing')) {
      recommendations.push({
        service: 'Marketing Automation Setup',
        description: 'Automate your email sequences and social media scheduling to save 10+ hours per week.',
        priority: 'Medium',
        impact: 'Medium-term'
      });
    }

    if (data.painPoints?.includes('Difficult to track ROI')) {
      recommendations.push({
        service: 'Advanced Analytics Dashboard',
        description: 'Setup G4 and conversion tracking to see exactly which marketing efforts drive sales.',
        priority: 'Medium',
        impact: 'Medium-term'
      });
    }

    if (data.painPoints?.includes('Competitors winning online')) {
      recommendations.push({
        service: 'Competitor Dominance Strategy',
        description: 'Identify competitor gaps and outrank them using superior content and SEO authority.',
        priority: 'High',
        impact: 'Long-term'
      });
    }

    return recommendations;
  }
}

module.exports = RecommendationEngine;