import React, { useEffect, useState } from 'react';
import './VisaProcessList.css';
import axios from 'axios';
import BASE_URL from '../../Config';
import { FaFileDownload } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const headings = [
    "full_name", "email", "phone", "date_of_birth", "passport_no", "applied_program", "intake", "assigned_counselor",
    "registration_date", "source", "passport_doc", "photo_doc", "ssc_doc", "hsc_doc", "bachelor_doc", "ielts_doc", "cv_doc",
    "sop_doc", "medical_doc", "other_doc", "doc_status", "university_name", "program_name", "submission_date",
    "submission_method", "application_proof", "application_id", "application_status", "fee_amount", "fee_method", "fee_date",
    "fee_proof", "fee_status", "interview_date", "interview_platform", "interview_status", "interviewer_name",
    "interview_recording", "interview_result", "interview_feedback", "interview_summary", "interview_result_date",
    "conditional_offer_upload", "conditional_offer_date", "conditional_conditions", "conditional_offer_status",
    "tuition_fee_amount", "tuition_fee_date", "tuition_fee_proof", "tuition_fee_status", "tuition_comments",
    "main_offer_upload", "main_offer_date", "main_offer_status", "motivation_letter", "europass_cv", "bank_statement",
    "birth_certificate", "tax_proof", "business_docs", "ca_certificate", "health_insurance", "residence_form",
    "flight_booking", "police_clearance", "family_certificate", "application_form", "appointment_location",
    "appointment_datetime", "appointment_letter", "appointment_status", "embassy_result_date", "embassy_feedback",
    "embassy_result", "embassy_notes", "embassy_summary", "visa_status", "decision_date", "visa_sticker_upload",
    "rejection_reason", "appeal_status"
];

const VisaProcessingList = () => {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState(""); // State for filter input

    useEffect(() => {
        const fetchData = async () => {
            try {
                const role = localStorage.getItem('role'); // Get role from local storage
                const studentId = localStorage.getItem('student_id'); // Get student ID from local storage

                let response;
                if (role === 'student' && studentId) {
                    // Fetch data by student ID
                    response = await axios.get(`${BASE_URL}getVisaProcessByStudentId/VisaProcess/${studentId}`);
                } else {
                    // Fetch all data if not a student
                    response = await axios.get(`${BASE_URL}VisaProcess`);
                }

                // Check if the response is an object (single student) and wrap it in an array
                if (Array.isArray(response.data)) {
                    setData(response.data);
                } else {
                    setData([response.data]);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const handleDownload = (url) => {
        if (url) {
            const link = document.createElement('a');
            link.href = url.trim(); // Ensure no extra spaces
            link.setAttribute('download', ''); // This will trigger the download
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            alert("No document available for download.");
        }
    };

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Visa Process");
        XLSX.writeFile(workbook, "Visa_Process_List.xlsx");
    };

    const exportToPDF = () => {
        const input = document.getElementById('table-to-pdf');
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            const imgWidth = 190; // Width of the image in PDF
            const pageHeight = pdf.internal.pageSize.height;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;

            let position = 0;

            pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }
            pdf.save('Visa_Process_List.pdf');
        });
    };

    // Function to format date to dd/mm/yyyy
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    // Filtered data based on the filter input
    const filteredData = data.filter(row => {
        return (
            row.full_name.toLowerCase().includes(filter.toLowerCase()) ||
            row.email.toLowerCase().includes(filter.toLowerCase()) ||
            row.phone.toLowerCase().includes(filter.toLowerCase())
        );
    });

    return (
        <div className="inquiry-container container-fluid py-4">
            <div className="inquiry-header d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">
                <h4 className="m-0 inquiry-title">Visa Process List</h4>
                <div className="inquiry-actions d-flex gap-2 flex-wrap">
                    <input
                        type="text"
                        placeholder="Filter by Name, Email, or Phone"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="form-control"
                        style={{ width: '300px' }}
                    />
                    <button className="btn btn-outline-info inquiry-btn" onClick={exportToExcel}>Export Excel</button>
                    <button className="btn btn-outline-danger inquiry-btn" onClick={exportToPDF}>Export PDF</button>
                </div>
            </div>

            {/* Filter Section */}
            <div className="inquiry-filters row g-3">
                <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                    <label className="form-label fw-bold mb-1">Compliance Officer</label>
                    <select className="form-select inquiry-select">
                        <option>Specific Counselor</option>
                        <option>Compliance Officer</option>
                        <option>Visa Manager</option>
                    </select>
                </div>

                <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                    <label className="form-label fw-bold mb-1">University</label>
                    <select className="form-select inquiry-select">
                        <option>Select Option</option>
                    </select>
                </div>

                <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                    <label className="form-label fw-bold mb-1">Program Level</label>
                    <select className="form-select inquiry-select">
                        <option>Bachelor's</option>
                        <option>Master's</option>
                        <option>Foundation</option>
                    </select>
                </div>

                <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                    <label className="form-label fw-bold mb-1">Application Stage</label>
                    <select className="form-select inquiry-select">
                        <option>Document Upload Pending</option>
                        <option>Application Submitted</option>
                        <option>Application Fee Paid</option>
                        <option>Zoom Interview Scheduled</option>
                        <option>Zoom Interview Done</option>
                        <option>Zoom Interview Rejected</option>
                        <option>Zoom Interview Accepted</option>
                        <option>Conditional Offer Letter Received</option>
                        <option>Tuition Fee Paid</option>
                        <option>Main Offer Letter Received</option>
                        <option>Main Offer Letter Not Issued</option>
                        <option>Embassy Document Ready</option>
                        <option>Embassy Appointment Scheduled</option>
                        <option>Embassy Appointment Not Scheduled</option>
                        <option>Embassy Interview Done</option>
                        <option>Visa Status: Approved</option>
                        <option>Visa Status: Rejected</option>
                        <option>Visa Status: Appealed</option>
                    </select>
                </div>

                <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                    <label className="form-label fw-bold mb-1">Visa Status</label>
                    <select className="form-select inquiry-select">
                        <option>Applied</option>
                        <option>In Process</option>
                        <option>Approved</option>
                        <option>Rejected</option>
                        <option>Appealed</option>
                        <option>Resubmitted</option>
                    </select>
                </div>

                <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                    <label className="form-label fw-bold mb-1">Tuition Fee Payment Status</label>
                    <select className="form-select inquiry-select">
                        <option>Not Paid</option>
                        <option>Partially Paid</option>
                        <option>Fully Paid</option>
                    </select>
                </div>

                <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                    <label className="form-label fw-bold mb-1">Compliance Verification Status</label>
                    <select className="form-select inquiry-select">
                        <option>Verified by Compliance</option>
                        <option>Under Review</option>
                        <option>Rejected by Compliance</option>
                    </select>
                </div>

                <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                    <label className="form-label fw-bold mb-1">Intake</label>
                    <select className="form-select inquiry-select">
                        <option>February 2025</option>
                        <option>September 2025</option>
                        <option>February 2026</option>
                        <option>Custom intake filter</option>
                    </select>
                </div>

                <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                    <label className="form-label fw-bold mb-1">Embassy Appointment Date</label>
                    <select className="form-select inquiry-select">
                        <option>Select Option</option>
                    </select>
                </div>

                <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                    <label className="form-label fw-bold mb-1">Country</label>
                    <select className="form-select inquiry-select">
                        <option>Hungary</option>
                        <option>Cyprus</option>
                        <option>Other destinations you support.</option>
                    </select>
                </div>

                <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                    <label className="form-label fw-bold mb-1">Registration Date</label>
                    <select className="form-select inquiry-select">
                        <option>This week</option>
                        <option>This month</option>
                        <option>Custom range</option>
                    </select>
                </div>

                <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                    <label className="form-label fw-bold mb-1">Document Completion</label>
                    <select className="form-select inquiry-select">
                        <option>100% Complete</option>
                        <option>75-99%</option>
                        <option>Below 75%</option>
                    </select>
                </div>

                <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                    <button className="btn btn-primary w-100 inquiry-btn">Apply</button>
                </div>

                <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                    <button className="btn btn-dark w-100 inquiry-btn">Reset</button>
                </div>
            </div>

            {/* Table Section */}
            <div className="table-responsive mt-4" style={{ overflowX: "auto" }}>
                <table id="table-to-pdf" className="table table-bordered inquiry-table text-nowrap text-center align-middle">
                    <thead className="table-light">
                        <tr>
                            <th>#</th>
                            {headings.map((head, idx) => (
                                <th key={idx}>{head.replace(/_/g, ' ')}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((row, i) => (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                {headings.map((head, idx) => (
                                    <td key={idx}>
                                        {head.includes('date') ? formatDate(row[head]) : (
                                            row[head] && (head.includes('_doc') || head.includes('proof')) ? (
                                                <span onClick={() => handleDownload(row[head])} style={{ cursor: 'pointer', color: 'blue' }}>
                                                    <FaFileDownload /> Download
                                                </span>
                                            ) : (
                                                row[head] !== null ? row[head] : 'N/A'
                                            )
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default VisaProcessingList;
