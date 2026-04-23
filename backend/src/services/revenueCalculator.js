// backend/src/services/revenueCalculator.js
class RevenueCalculator {
  calculate(data, recommendations) {
    const currentLeads = this.estimateCurrentLeads(data);
    const targetLeads = parseInt(data.requiredLeadsPerMonth) || 0;
    const avgDealSize = parseInt(data.averageDealSize) || 0;

    const leadGap = Math.max(0, targetLeads - currentLeads);
    const revenueGap = leadGap * avgDealSize;

    // Channel contribution (based on recommendations)
    let channelSplit = {
      seo: 0,
      paidAds: 0,
      social: 0
    };

    const hasSeoReco = recommendations.some(r => r.service.includes('SEO'));
    const hasAdsReco = recommendations.some(r => r.service.includes('Paid'));
    const hasSocialReco = recommendations.some(r => r.service.includes('Social'));

    if (hasSeoReco) channelSplit.seo = Math.floor(leadGap * 0.4);
    if (hasAdsReco) channelSplit.paidAds = Math.floor(leadGap * 0.4);
    if (hasSocialReco) channelSplit.social = Math.floor(leadGap * 0.2);

    // Adjust if some channels not recommended
    const totalAllocated = channelSplit.seo + channelSplit.paidAds + channelSplit.social;
    if (totalAllocated < leadGap && leadGap > 0) {
      const remaining = leadGap - totalAllocated;
      if (hasSeoReco) channelSplit.seo += remaining;
      else if (hasAdsReco) channelSplit.paidAds += remaining;
      else if (hasSocialReco) channelSplit.social += remaining;
    }

    return {
      currentLeads,
      targetLeads,
      leadGap,
      revenueGap: revenueGap.toLocaleString('en-IN', { style: 'currency', currency: 'INR' }),
      channelSplit,
      roi: revenueGap > 0 ? '300-500%' : 'N/A'
    };
  }

  estimateCurrentLeads(data) {
    // Estimate based on available data
    let leads = 0;

    if (data.hasWebsite === 'yes') {
      if (data.monthlyTraffic) {
        const traffic = parseInt(data.monthlyTraffic);
        leads += Math.floor(traffic * 0.02); // 2% conversion
      } else {
        leads += 10; // Default if has website
      }
    }

    if (data.runningAds === 'yes') {
      leads += 20; // Estimated leads from ads
    }

    if (data.generatingLeads === 'yes') {
      leads += 15;
    }

    if (data.usingLinkedIn === 'yes') {
      leads += 10;
    }

    if (data.usingWhatsApp === 'yes') {
      leads += 8;
    }

    if (data.usingEmailMarketing === 'yes') {
      leads += 12;
    }

    return Math.max(leads, 5); // Minimum 5 leads
  }
}

module.exports = RevenueCalculator;