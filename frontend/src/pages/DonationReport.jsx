import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function DonationReport() {
  const navigate = useNavigate();
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pdfError, setPdfError] = useState('');

  useEffect(() => {
    const fetchDonations = async () => {
      const token = localStorage.getItem('adminToken');

      if (!token) {
        navigate('/admin/login');
        return;
      }

      try {
        setLoading(true);
        setError('');

        const API_BASE = import.meta.env.VITE_API_URL;
        const response = await fetch(`${API_BASE}/api/donations`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem('adminToken');
            localStorage.removeItem('admin');
            navigate('/admin/login');
            return;
          }
          throw new Error(data.message || 'Failed to fetch donations');
        }

        setDonations(data.donations || []);
      } catch (err) {
        console.error('Fetch donations error:', err);
        setError(err.message || 'Unable to connect to server');
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, [navigate]);

  const totalDonationAmount = donations.reduce(
    (sum, d) => sum + (Number(d.amount) || 0),
    0
  );

  // Generate and download PDF report from existing state
  const handleDownloadPDF = () => {
    try {
      setPdfError('');

      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      // Header
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.setTextColor(122, 16, 24); // Maroon
      doc.text('DURGA MATA MITRA MANDAL 2026', 105, 18, { align: 'center' });

      doc.setFontSize(13);
      doc.setTextColor(50, 50, 50);
      doc.text('Donation Report', 105, 25, { align: 'center' });

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      doc.setTextColor(100, 100, 100);
      doc.text(
        'Record of All Donations Received',
        105,
        31,
        { align: 'center' }
      );

      // Gold line divider
      doc.setDrawColor(212, 175, 55); // Gold
      doc.setLineWidth(0.6);
      doc.line(14, 35, 196, 35);

      // Summary Stats
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(122, 16, 24);
      doc.text(
        `Total Collections: Rs. ${totalDonationAmount.toLocaleString('en-IN')}`,
        14,
        42
      );

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(70, 70, 70);
      const recordText = `Total Records: ${donations.length} ${
        donations.length === 1 ? 'Entry' : 'Entries'
      }`;
      doc.text(recordText, 105, 42, { align: 'center' });

      const generatedDate = new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
      doc.text(`Generated: ${generatedDate}`, 196, 42, { align: 'right' });

      // Table rows mapped from existing React state
      const tableBody = donations.map((item, index) => {
        const formattedDate = item.date
          ? new Date(item.date).toLocaleDateString('en-IN', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })
          : 'N/A';

        const devoteeName =
          `${item.firstName || ''} ${item.lastName || ''}`.trim() || 'Anonymous';

        return [
          index + 1,
          formattedDate,
          `#${item.receiptNo || '—'}`,
          devoteeName,
          `Rs. ${Number(item.amount || 0).toLocaleString('en-IN')}`,
          item.paymentMethod || 'Cash',
        ];
      });

      autoTable(doc, {
        startY: 46,
        head: [['#', 'Date', 'Receipt No.', 'Devotee Name', 'Amount', 'Payment Mode']],
        body:
          tableBody.length > 0
            ? tableBody
            : [['—', '—', '—', 'No donation records found yet', '—', '—']],
        theme: 'grid',
        headStyles: {
          fillColor: [122, 16, 24],
          textColor: [255, 255, 255],
          fontStyle: 'bold',
          halign: 'center',
        },
        bodyStyles: {
          fontSize: 9,
          textColor: [40, 40, 40],
        },
        alternateRowStyles: {
          fillColor: [255, 250, 240], // Light cream
        },
        columnStyles: {
          0: { cellWidth: 12, halign: 'center' },
          1: { cellWidth: 26, halign: 'center' },
          2: { cellWidth: 26, halign: 'center' },
          3: { cellWidth: 'auto', halign: 'left' },
          4: { cellWidth: 36, halign: 'right', fontStyle: 'bold' },
          5: { cellWidth: 28, halign: 'center' },
        },
        didDrawPage: function (data) {
          const pageCount = doc.internal.getNumberOfPages();
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(8);
          doc.setTextColor(140, 140, 140);
          doc.text(
            'Durga Mata Mitra Mandal 2026 • Official Accounts Ledger',
            14,
            290
          );
          doc.text(
            `Page ${data.pageNumber} of ${pageCount}`,
            196,
            290,
            { align: 'right' }
          );
        },
      });

      doc.save('Durga_Mata_Mitra_Mandal_2026_Donation_Report.pdf');
    } catch (err) {
      console.error('PDF generation error:', err);
      setPdfError('Failed to generate PDF. Please try again.');
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-cream">
      <Navbar />

      <main className="flex-grow-1 py-4 py-md-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-xl-10">
              {/* Back to Dashboard Link */}
              <div className="mb-3">
                <Link
                  to="/admin/dashboard"
                  className="text-decoration-none text-maroon d-inline-flex align-items-center gap-2 fw-semibold small"
                >
                  <span className="fs-6">←</span>
                  <span>Back to Admin Dashboard</span>
                </Link>
              </div>

              {/* Main Card */}
              <div className="card shadow-lg border border-gold rounded-4 overflow-hidden bg-white">
                {/* Header */}
                <div
                  className="bg-maroon-dark text-center py-4 px-3 border-bottom border-gold position-relative"
                  style={{
                    background:
                      'radial-gradient(circle at 50% 25%, #560a0f 0%, #3d0508 100%)',
                  }}
                >
                  <div
                    className="rounded-circle d-inline-flex align-items-center justify-content-center border border-gold mb-2 shadow-sm"
                    style={{
                      width: '56px',
                      height: '56px',
                      background: 'rgba(212, 175, 55, 0.2)',
                      fontSize: '1.6rem',
                    }}
                  >
                    📋
                  </div>

                  <div className="d-flex align-items-center justify-content-center gap-1 mb-1">
                    <span style={{ color: 'var(--dm-gold)', fontSize: '0.85rem' }}>✦</span>
                    <span
                      className="font-cinzel text-gold-bright small fw-bold text-uppercase"
                      style={{ letterSpacing: '1px' }}
                    >
                      Durga Mata Mitra Mandal 2026
                    </span>
                    <span style={{ color: 'var(--dm-gold)', fontSize: '0.85rem' }}>✦</span>
                  </div>

                  <h1 className="font-cinzel text-white fs-3 fw-bold mb-1">
                    Donation Report
                  </h1>

                  <p className="font-cinzel text-gold small mb-0 fw-semibold">
                    Chronological Audit Ledger of All Mandal Donations
                  </p>
                </div>

                <div className="card-body p-4 p-md-5">
                  {/* Financial Summary Strip */}
                  <div className="row g-3 mb-4">
                    <div className="col-12 col-sm-6">
                      <div className="p-3 rounded-3 bg-cream-warm border border-gold">
                        <div className="small text-muted fw-semibold">Total Collections</div>
                        <div className="fs-4 fw-bold text-maroon mt-1">
                          ₹{totalDonationAmount.toLocaleString('en-IN')}
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-sm-6">
                      <div className="p-3 rounded-3 bg-cream-warm border border-gold">
                        <div className="small text-muted fw-semibold">Total Records</div>
                        <div className="fs-4 fw-bold text-maroon mt-1">
                          {donations.length} {donations.length === 1 ? 'Entry' : 'Entries'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {error && (
                    <div className="alert alert-warning border-gold rounded-3 small mb-4 d-flex align-items-center gap-2">
                      <span>⚠️</span>
                      <div>{error} (Showing local view)</div>
                    </div>
                  )}

                  {pdfError && (
                    <div className="alert alert-danger border-danger rounded-3 small mb-4 d-flex align-items-center gap-2">
                      <span>⚠️</span>
                      <div>{pdfError}</div>
                    </div>
                  )}

                  {/* Donations Table */}
                  <div className="table-responsive border border-gold rounded-3 mb-4 shadow-sm">
                    <table className="table table-hover align-middle mb-0 small">
                      <thead className="bg-cream-warm border-bottom border-gold">
                        <tr>
                          <th className="font-cinzel text-maroon py-3 ps-3">#</th>
                          <th className="font-cinzel text-maroon py-3">Date</th>
                          <th className="font-cinzel text-maroon py-3">Receipt No.</th>
                          <th className="font-cinzel text-maroon py-3">Devotee Name</th>
                          <th className="font-cinzel text-maroon py-3">Amount</th>
                          <th className="font-cinzel text-maroon py-3 pe-3 text-end">Payment Mode</th>
                        </tr>
                      </thead>
                      <tbody>
                        {loading ? (
                          <tr>
                            <td colSpan="6" className="text-center py-4 text-muted">
                              <div className="spinner-border spinner-border-sm text-gold me-2" role="status"></div>
                              Loading donation records...
                            </td>
                          </tr>
                        ) : donations.length === 0 ? (
                          <tr>
                            <td colSpan="6" className="text-center py-4 text-muted">
                              No donation records found yet.
                            </td>
                          </tr>
                        ) : (
                          donations.map((item, index) => {
                            const formattedDate = item.date
                              ? new Date(item.date).toLocaleDateString('en-IN', {
                                  day: '2-digit',
                                  month: 'short',
                                  year: 'numeric',
                                })
                              : 'N/A';

                            const devoteeName = `${item.firstName || ''} ${item.lastName || ''}`.trim() || 'Anonymous';

                            return (
                              <tr key={item._id || index}>
                                <td className="ps-3 text-muted">{index + 1}</td>
                                <td className="text-muted text-nowrap">{formattedDate}</td>
                                <td className="fw-semibold text-dark text-nowrap">
                                  #{item.receiptNo || '—'}
                                </td>
                                <td className="fw-bold text-maroon">{devoteeName}</td>
                                <td className="fw-bold text-dark">
                                  ₹{Number(item.amount || 0).toLocaleString('en-IN')}
                                </td>
                                <td className="pe-3 text-end">
                                  <span
                                    className={`badge rounded-pill border px-3 py-1 ${
                                      item.paymentMethod === 'Cash'
                                        ? 'bg-light text-success border-success-subtle'
                                        : 'bg-light text-primary border-primary-subtle'
                                    }`}
                                  >
                                    {item.paymentMethod || 'Cash'}
                                  </span>
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Actions */}
                  <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-3">
                    <Link
                      to="/admin/dashboard"
                      className="btn btn-outline-secondary w-100 w-sm-auto px-4 py-2"
                    >
                      ← Back to Dashboard
                    </Link>

                    <div className="d-flex flex-column flex-sm-row gap-2 w-100 w-sm-auto">
                      <button
                        type="button"
                        onClick={handleDownloadPDF}
                        disabled={loading}
                        className="btn btn-outline-secondary w-100 w-sm-auto px-4 py-2 fw-semibold d-inline-flex align-items-center justify-content-center gap-2"
                        title="Download PDF Report"
                      >
                        <span>📄</span>
                        <span>Download PDF</span>
                      </button>

                      <Link
                        to="/admin/donations/add"
                        className="btn btn-gold w-100 w-sm-auto px-4 py-2 fw-bold"
                      >
                        + Add New Donation
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default DonationReport;
