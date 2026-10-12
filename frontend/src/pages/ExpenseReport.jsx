import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function ExpenseReport() {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [uploadingExpenseId, setUploadingExpenseId] = useState(null);
  const [receiptMessage, setReceiptMessage] = useState('');
  const [pdfError, setPdfError] = useState('');

  useEffect(() => {
    const fetchExpenses = async () => {
      const token = localStorage.getItem('adminToken');

      if (!token) {
        navigate('/admin/login');
        return;
      }

      try {
        setLoading(true);
        setError('');

        const API_BASE = import.meta.env.VITE_API_URL;
        const response = await fetch(`${API_BASE}/api/expenses`, {
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
          throw new Error(data.message || 'Unable to load expense records. Please try again.');
        }

        setExpenses(data.expenses || []);
      } catch (err) {
        console.error('Fetch expenses error:', err);
        setError(err.message || 'Unable to load expense records. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, [navigate]);
  
const handleReceiptUpload = async (expenseId, file) => {
  if (!file) return;

  if (!file.type.startsWith('image/')) {
    setReceiptMessage('Please select an image file.');
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    setReceiptMessage('Image size must be 5 MB or less.');
    return;
  }

  const token = localStorage.getItem('adminToken');

  if (!token) {
    navigate('/admin/login');
    return;
  }

  try {
    setUploadingExpenseId(expenseId);
    setReceiptMessage('');

    const formData = new FormData();
    formData.append('billImage', file);

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/expenses/${expenseId}/receipt`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Receipt upload failed.');
    }

    setExpenses((currentExpenses) =>
      currentExpenses.map((expense) =>
        expense._id === expenseId
          ? { ...expense, billImageUrl: data.expense.billImageUrl }
          : expense
      )
    );

    setReceiptMessage('Receipt uploaded successfully.');
  } catch (err) {
    setReceiptMessage(err.message || 'Receipt upload failed.');
  } finally {
    setUploadingExpenseId(null);
  }
};

  const totalExpenses = expenses.reduce(
    (sum, e) => sum + (Number(e.amount) || 0),
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
      doc.text('Expense Report', 105, 25, { align: 'center' });

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      doc.setTextColor(100, 100, 100);
      doc.text('Record of All Expenses', 105, 31, { align: 'center' });

      // Gold line divider
      doc.setDrawColor(212, 175, 55); // Gold
      doc.setLineWidth(0.6);
      doc.line(14, 35, 196, 35);

      // Summary Stats
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(122, 16, 24);
      doc.text(
        `Total Expenses: Rs. ${totalExpenses.toLocaleString('en-IN')}`,
        14,
        42
      );

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(70, 70, 70);
      const recordText = `Total Records: ${expenses.length} ${
        expenses.length === 1 ? 'Entry' : 'Entries'
      }`;
      doc.text(recordText, 105, 42, { align: 'center' });

      const generatedDate = new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
      doc.text(`Generated: ${generatedDate}`, 196, 42, { align: 'right' });

      // Table rows mapped from real MongoDB expense records
      const tableBody = expenses.map((item, index) => {
        const formattedDate = item.date
          ? new Date(item.date).toLocaleDateString('en-IN', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })
          : 'N/A';

        const addedByName = item.addedBy?.name || 'Committee';
        const receiptStatus = item.billImageUrl ? 'Available' : 'Not Available';

        return [
          index + 1,
          formattedDate,
          item.description || '—',
          `Rs. ${Number(item.amount || 0).toLocaleString('en-IN')}`,
          item.paymentMethod || 'Cash',
          addedByName,
          receiptStatus,
        ];
      });

      autoTable(doc, {
        startY: 46,
        head: [['#', 'Date', 'Description', 'Amount', 'Payment Mode', 'Added By', 'Receipt']],
        body:
          tableBody.length > 0
            ? tableBody
            : [['—', '—', 'No expense records found', '—', '—', '—', '—']],
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
          0: { cellWidth: 10, halign: 'center' },
          1: { cellWidth: 24, halign: 'center' },
          2: { cellWidth: 'auto', halign: 'left' },
          3: { cellWidth: 32, halign: 'right', fontStyle: 'bold' },
          4: { cellWidth: 26, halign: 'center' },
          5: { cellWidth: 30, halign: 'left' },
          6: { cellWidth: 24, halign: 'center' },
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

      doc.save('Durga_Mata_Mitra_Mandal_2026_Expense_Report.pdf');
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
                    📊
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
                    Expense Report
                  </h1>

                  <p className="font-cinzel text-gold small mb-0 fw-semibold">
                    Record of All Expenses
                  </p>
                </div>

                <div className="card-body p-4 p-md-5">
                  {/* Financial Summary Strip */}
                  <div className="row g-3 mb-4">
                    <div className="col-12 col-sm-6">
                      <div className="p-3 rounded-3 bg-cream-warm border border-gold">
                        <div className="small text-muted fw-semibold">Total Expenses</div>
                        <div className="fs-4 fw-bold text-maroon mt-1">
                          ₹{totalExpenses.toLocaleString('en-IN')}
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-sm-6">
                      <div className="p-3 rounded-3 bg-cream-warm border border-gold">
                        <div className="small text-muted fw-semibold">Total Records</div>
                        <div className="fs-4 fw-bold text-maroon mt-1">
                          {expenses.length} {expenses.length === 1 ? 'Entry' : 'Entries'}
                        </div>
                      </div>
                    </div>
                  </div>
                    {receiptMessage && (
                      <div
                        className="alert alert-info rounded-3 small mb-4"
                        role="status"
                      >
                        {receiptMessage}
                      </div>
                    )}
                  {error && (
                    <div className="alert alert-warning border-gold rounded-3 small mb-4 d-flex align-items-center gap-2">
                      <span>⚠️</span>
                      <div>{error}</div>
                    </div>
                  )}

                  {pdfError && (
                    <div className="alert alert-danger border-danger rounded-3 small mb-4 d-flex align-items-center gap-2">
                      <span>⚠️</span>
                      <div>{pdfError}</div>
                    </div>
                  )}

                  {/* Expenses Table */}
                  <div className="table-responsive border border-gold rounded-3 mb-4 shadow-sm">
                    <table className="table table-hover align-middle mb-0 small">
                      <thead className="bg-cream-warm border-bottom border-gold">
                        <tr>
                          <th className="font-cinzel text-maroon py-3 ps-3">#</th>
                          <th className="font-cinzel text-maroon py-3">Date</th>
                          <th className="font-cinzel text-maroon py-3">Description</th>
                          <th className="font-cinzel text-maroon py-3">Amount</th>
                          <th className="font-cinzel text-maroon py-3 text-center">Payment Mode</th>
                          <th className="font-cinzel text-maroon py-3">Added By</th>
                          <th className="font-cinzel text-maroon py-3 pe-3 text-end">Receipt / Bill</th>
                        </tr>
                      </thead>
                      <tbody>
                        {loading ? (
                          <tr>
                            <td colSpan="7" className="text-center py-4 text-muted">
                              <div className="spinner-border spinner-border-sm text-gold me-2" role="status"></div>
                              Loading expense records...
                            </td>
                          </tr>
                        ) : expenses.length === 0 ? (
                          <tr>
                            <td colSpan="7" className="text-center py-4 text-muted">
                              No expense records found.
                            </td>
                          </tr>
                        ) : (
                          expenses.map((item, index) => {
                            const formattedDate = item.date
                              ? new Date(item.date).toLocaleDateString('en-IN', {
                                  day: '2-digit',
                                  month: 'short',
                                  year: 'numeric',
                                })
                              : 'N/A';

                            const addedByName = item.addedBy?.name || 'Committee';

                            return (
                              <tr key={item._id || index}>
                                <td className="ps-3 text-muted">{index + 1}</td>
                                <td className="text-muted text-nowrap">{formattedDate}</td>
                                <td className="fw-bold text-dark">{item.description}</td>
                                <td className="fw-bold text-maroon text-nowrap">
                                  ₹{Number(item.amount || 0).toLocaleString('en-IN')}
                                </td>
                                <td className="text-center">
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
                                <td className="text-muted text-nowrap">{addedByName}</td>
                                <td className="pe-3 text-end">
                                  {item.billImageUrl ? (
                                    <button
                                      type="button"
                                      onClick={() =>
                                        window.open(item.billImageUrl, '_blank', 'noopener,noreferrer')
                                      }
                                      className="btn btn-sm py-1 px-2 fw-semibold"
                                      style={{
                                        fontSize: '0.8rem',
                                        color: '#7a1018',
                                        backgroundColor: '#fffaf0',
                                        border: '1px solid #d4af37',
                                      }}
                                      title="View Receipt"
                                    >
                                      View Receipt
                                    </button>
                                  
) : (
  <div className="d-flex flex-column align-items-end gap-2">
    <span
      className="badge bg-light text-muted border py-1 px-2 fw-normal"
      style={{ fontSize: '0.75rem' }}
    >
      Receipt not available
    </span>

    <label
      className="btn btn-sm fw-semibold mb-0"
      style={{
        fontSize: '0.8rem',
        color: '#7a1018',
        backgroundColor: '#fffaf0',
        border: '1px solid #d4af37',
        cursor: uploadingExpenseId === item._id ? 'wait' : 'pointer',
      }}
    >
      {uploadingExpenseId === item._id
        ? 'Uploading...'
        : 'Upload Receipt'}

      <input
        type="file"
        accept="image/jpeg,image/png,image/webp"
        hidden
        disabled={uploadingExpenseId !== null}
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) handleReceiptUpload(item._id, file);
          event.target.value = '';
        }}
      />
    </label>
  </div>
)}
                                  
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
                        to="/admin/expenses/add"
                        className="btn btn-maroon w-100 w-sm-auto px-4 py-2 fw-bold text-center"
                      >
                        Go to Add Expense
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

export default ExpenseReport;
