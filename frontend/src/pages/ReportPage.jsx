import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ScoreCard from '../components/Report/ScoreCard';
import RecommendationsList from '../components/Report/RecommendationsList';
import RevenueOpportunity from '../components/Report/RevenueOpportunity';
import GapAnalysis from '../components/Report/GapAnalysis';
import GrowthPlan from '../components/Report/GrowthPlan';
import PDFDownloadButton from '../components/PDF/PDFDownloadButton';

import api from '../services/api';

function ReportPage() {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await api.get(`/report/${id}`);
        setReport(res.data.report);
      } catch (err) {
        console.error('Error fetching report:', err);
        setError('Report not found or server error');
      }
    };

    const savedReport = localStorage.getItem('lastReport');
    if (savedReport) {
      const parsed = JSON.parse(savedReport);
      if (parsed.reportId === id) {
        setReport(parsed);
      } else {
        fetchReport();
      }
    } else {
      fetchReport();
    }
  }, [id]);

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 gap-4">
        <h1 className="text-2xl font-bold text-red-600">Error</h1>
        <p className="text-slate-600">{error}</p>
        <button onClick={() => window.location.href = '/'} className="btn-primary">Go Home</button>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-slate-900">Digital Audit Report</h1>
            <p className="text-sm text-slate-500">{report.businessSummary.name} • {report.generatedDate}</p>
          </div>
          <PDFDownloadButton reportId={id} />
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Top Section: Score & Interpretation */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <ScoreCard score={report.auditOverview.totalScore} category={report.auditOverview.category} breakdown={report.auditOverview.breakdown} />
          </div>
          <div className="lg:col-span-2 glass-card p-8 rounded-3xl flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Executive Summary</h2>
            <p className="text-lg text-slate-600 leading-relaxed italic">
              "{report.auditOverview.interpretation}"
            </p>
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(report.auditOverview.breakdown).map(([key, val]) => (
                <div key={key} className="p-4 bg-slate-50 rounded-2xl">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">{key}</p>
                  <p className="text-xl font-bold text-slate-800">{Number(val).toFixed(1)}/20</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Revenue Opportunity Section */}
        <section>
          <RevenueOpportunity data={report.revenueOpportunity} />
        </section>

        {/* Gap Analysis & Growth Plan */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <GapAnalysis gaps={report.gapAnalysis} />
          <GrowthPlan plan={report.growthPlan} />
        </div>

        {/* Recommendations */}
        <section>
          <RecommendationsList recommendations={report.recommendations} />
        </section>
      </main>
    </div>
  );
}

export default ReportPage;
