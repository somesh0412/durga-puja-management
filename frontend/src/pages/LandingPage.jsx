import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import AccessCard from '../components/AccessCard';
import DonorInfoSection from '../components/DonorInfoSection';
import TransparencySection from '../components/TransparencySection';
import AboutSection from '../components/AboutSection';
import Footer from '../components/Footer';

function LandingPage() {
  const [financialSummary, setFinancialSummary] = useState({
    totalDonations: 0,
    totalExpenses: 0,
    remainingBalance: 0,
  });
  const [summaryError, setSummaryError] = useState('');

  useEffect(() => {
    const fetchPublicSummary = async () => {
      try {
        setSummaryError('');
        const API_BASE = import.meta.env.VITE_API_URL;
        const response = await fetch(`${API_BASE}/api/public/summary`);

        if (!response.ok) {
          throw new Error('Failed to fetch public summary');
        }

        const data = await response.json();
        if (data && data.summary) {
          setFinancialSummary({
            totalDonations: Number(data.summary.totalDonations) || 0,
            totalExpenses: Number(data.summary.totalExpenses) || 0,
            remainingBalance: Number(data.summary.remainingBalance) || 0,
          });
        }
      } catch (err) {
        console.error('Fetch public summary error:', err);
        setSummaryError('Financial data temporarily unavailable');
      }
    };

    fetchPublicSummary();
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Navigation Bar */}
      <Navbar />

      {/* Main Landing Page Content */}
      <main className="flex-grow-1">
        {/* Hero Section with Durga Mata Image / Placeholder */}
        <Hero />

        {/* Main Action Cards: Devotee Transparency & Admin */}
        <AccessCard />

        {/* Devotee Information & Privacy Rules */}
        <DonorInfoSection />

        {/* Financial Transparency Metric Cards */}
        <TransparencySection stats={financialSummary} error={summaryError} />

        {/* About Durga Mata Mitra Mandal Section */}
        <AboutSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default LandingPage;
