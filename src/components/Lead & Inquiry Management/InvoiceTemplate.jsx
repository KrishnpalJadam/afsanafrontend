import { useEffect, useRef } from "react";
import html2pdf from 'html2pdf.js';

const InvoiceTemplate = ({ invoice }) => {
    const invoiceRef = useRef();

    useEffect(() => {
        console.log("Invoice Data:", invoice);
    }, [invoice]);

    if (!invoice) return null;

    const feeDate = new Date(invoice.fee_date).toLocaleDateString();

    const handlePrint = () => {
        const printContent = invoiceRef.current.innerHTML;
        const originalContent = document.body.innerHTML;

        document.body.innerHTML = printContent;
        window.print();
        document.body.innerHTML = originalContent;
        window.location.reload();
    };

    const handleDownload = () => {
        const element = invoiceRef.current;
        const opt = {
            margin:       1,
            filename:     `Invoice_${invoice.id}.pdf`,
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2 },
            jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        // Using html2pdf to create the PDF with proper scaling and formatting
        html2pdf().from(element).set(opt).save();
    };

    return (
        <div className="invoice-container-wrapper my">
            <div className="text-end my-3">
                <button className="btn btn-primary" onClick={handlePrint}>🖨️ Print Invoice</button>
                <button className="btn btn-success ms-2" onClick={handleDownload}>📥 Download PDF</button>
            </div>

            <div ref={invoiceRef} className="invoice-card shadow p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <img src="http://localhost:5173/img/logo.png" alt="Logo" className="invoice-logo" />
                    <div className="text-end">
                        <h2 className="fw-bold">Invoice</h2>
                        <p><strong>Invoice #:</strong> {invoice.id}</p>
                        <p><strong>Date:</strong> {feeDate}</p>
                    </div>
                </div>

                <div className="row mb-4">
                    <div className="col">
                        <h5 className="fw-semibold">From:</h5>
                        <p className="mb-1">Study First Info</p>
                        <p className="mb-1">contact@studyfirstinfo.com</p>
                        <p className="mb-0">India</p>
                    </div>
                    <div className="col text-end">
                        <h5 className="fw-semibold">To:</h5>
                        <p className="mb-1"><strong>{invoice.student_name}</strong></p>
                        <p className="mb-1">Email: {invoice.email || "N/A"}</p>
                    </div>
                </div>

                <table className="table table-bordered text-center">
                    <thead className="table-light">
                        <tr>
                            <th>Name</th>
                            <th>Course Name</th>
                            <th>Phone Number</th>
                            <th>Payment Status</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{invoice.student_name}</td>
                            <td>{invoice.course_name}</td>
                            <td>{invoice.phone_number}</td>
                            <td>{invoice.payment_status}</td>
                            <td>${parseFloat(invoice.amount).toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>

                <div className="text-end mt-4">
                    <p><strong>Subtotal:</strong> ${parseFloat(invoice.amount).toFixed(2)}</p>
                    <p><strong>Tax (0%):</strong> $0.00</p>
                    <h5><strong>Total:</strong> ${parseFloat(invoice.amount).toFixed(2)}</h5>
                </div>

                <div className="mt-5">
                    <p className="small text-muted">
                        Notes: Payment received successfully. Please retain this invoice for your records.
                    </p>
                    <p className="fw-bold text-end">Thank you!</p>
                </div>
            </div>
        </div>
    );
};

export default InvoiceTemplate;
