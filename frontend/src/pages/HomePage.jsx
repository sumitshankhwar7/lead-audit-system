import React, { useState } from 'react';
import BusinessInfo from '../components/Form/BusinessInfo';
import WebsiteSection from '../components/Form/WebsiteSection';
import SeoSection from '../components/Form/SeoSection';
import SocialMediaSection from '../components/Form/SocialMediaSection';
import PaidAdsSection from '../components/Form/PaidAdsSection';
import CrmSection from '../components/Form/CrmSection';
import MarketingSection from '../components/Form/MarketingSection';
import BusinessGoals from '../components/Form/BusinessGoals';
import PainPoints from '../components/Form/PainPoints';
import Button from '../components/Common/Button';
import { validateForm } from '../utils/validators';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Common/Modal';
import LeadForm from '../components/Form/LeadForm';
import { submitAudit, submitLead } from '../services/api';

function HomePage() {
  const navigate = useNavigate();
  const [showLeadModal, setShowLeadModal] = useState(() => {
    const lastShown = localStorage.getItem('leadLastShown');
    const now = Date.now();
    const ONE_HOUR = 60 * 60 * 1000;

    if (!lastShown || (now - parseInt(lastShown) > ONE_HOUR)) {
      localStorage.setItem('leadLastShown', now.toString());
      return true;
    }
    return false;
  });
  const [leadLoading, setLeadLoading] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '',
    industry: '',
    businessType: '',
    targetLocation: '',
    hasWebsite: '',
    websiteUrl: '',
    monthlyTraffic: '',
    generatingLeads: '',
    rankingKeywords: '',
    googleVisibility: '',
    googleBusinessListing: '',
    activePlatforms: [],
    postingFrequency: '',
    engagementLevel: '',
    runningAds: '',
    adPlatforms: [],
    monthlyBudget: '',
    usingCrm: '',
    crmName: '',
    leadTrackingMethod: '',
    usingLinkedIn: '',
    usingWhatsApp: '',
    usingEmailMarketing: '',
    usingBusinessEmail: '',
    monthlyRevenueTarget: '',
    requiredLeadsPerMonth: '',
    averageDealSize: '',
    painPoints: []
  });
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Scroll to first error
      const firstError = Object.keys(validationErrors)[0];
      document.getElementsByName(firstError)[0]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    
    setLoading(true);
    try {
      const result = await submitAudit(formData);
      localStorage.setItem('lastReport', JSON.stringify(result.report));
      navigate(`/report/${result.report.reportId}`);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to generate report. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleLeadSubmit = async (leadData) => {
    setLeadLoading(true);
    try {
      await submitLead(leadData);
      localStorage.setItem('leadSubmitted', 'true');
      localStorage.setItem('userLeadInfo', JSON.stringify(leadData));
      // Pre-fill business name in the audit form
      setFormData(prev => ({ ...prev, businessName: leadData.businessName }));
      setShowLeadModal(false);
    } catch (error) {
      console.error('Lead Submission Error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLeadLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-premium py-12 px-4 sm:px-6 lg:px-8">
      <Modal isOpen={showLeadModal} title="Start Your Digital Audit">
        <p className="text-slate-500 mb-6 text-center">
          Enter your details below to unlock your comprehensive digital presence analysis.
        </p>
        <LeadForm onSubmit={handleLeadSubmit} loading={leadLoading} />
      </Modal>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Digital <span className="text-gradient">Audit</span> Report
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Get a comprehensive analysis of your digital presence and a personalized growth plan to scale your revenue.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 animate-slide-up">
          <div className="space-y-6">
            <section className="glass-card p-8 rounded-3xl">
              <BusinessInfo data={formData} setData={setFormData} errors={errors} />
            </section>
            
            <section className="glass-card p-8 rounded-3xl">
              <WebsiteSection data={formData} setData={setFormData} errors={errors} />
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <section className="glass-card p-8 rounded-3xl">
                <SeoSection data={formData} setData={setFormData} />
              </section>
              <section className="glass-card p-8 rounded-3xl">
                <SocialMediaSection data={formData} setData={setFormData} />
              </section>
            </div>

            <section className="glass-card p-8 rounded-3xl">
              <PaidAdsSection data={formData} setData={setFormData} />
            </section>

            <section className="glass-card p-8 rounded-3xl">
              <CrmSection data={formData} setData={setFormData} />
            </section>

            <section className="glass-card p-8 rounded-3xl">
              <MarketingSection data={formData} setData={setFormData} />
            </section>

            <section className="glass-card p-8 rounded-3xl">
              <BusinessGoals data={formData} setData={setFormData} errors={errors} />
            </section>

            <section className="glass-card p-8 rounded-3xl">
              <PainPoints data={formData} setData={setFormData} />
            </section>
          </div>
          
          <div className="flex justify-center pt-8">
            <Button type="submit" loading={loading} className="w-full md:w-auto min-w-[300px] py-4 text-xl shadow-2xl hover:scale-105">
              Generate My Audit Report
            </Button>
          </div>
        </form>
        
        <footer className="mt-20 text-center text-slate-400 text-sm">
          &copy; {new Date().getFullYear()} Lead Audit System. All rights reserved.
        </footer>
      </div>
    </div>
  );
}

export default HomePage;