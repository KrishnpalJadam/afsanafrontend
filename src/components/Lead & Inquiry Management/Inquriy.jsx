
import React, { useEffect, useState } from "react";
import { Table, Button, Form, Badge, Modal, Pagination, Row, Col, Dropdown, DropdownButton, DropdownItem } from "react-bootstrap";
import BASE_URL from "../../Config";
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import TodaysInqiury from "./TodaysInqiury";
import Followup from "./Followup";
import { MdDelete } from "react-icons/md";
import api from "../../interceptors/axiosInterceptor";
import { hasPermission } from "../../authtication/permissionUtils";

import { CSVLink } from "react-csv";
import * as XLSX from "xlsx";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import { saveAs } from 'file-saver';

const Inquiry = () => {
  // Sample inquiry data

  const [showAssignModal, setShowAssignModal] = useState(false);
  // State for modals
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [showFollowUpModal, setShowFollowUpModal] = useState(false);
  const [showInquiryDetailsModal, setInquiryDetailsModal] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [countryOptions, setCountryOptions] = useState([]);
  const [followUpDate, setFollowUpDate] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedInquiries, setSelectedInquiries] = useState([]);

  const [selectedCounselor, setSelectedCounselor] = useState(null);
  const [gpa, setGpa] = useState("");
  const [year, setYear] = useState("");

  const [counselors, setCounselors] = useState([]); // Counselor list
  const [inquiries, setInquiries] = useState([]); // Inquiries data
  const role = localStorage.getItem("role");
  const [bulkAction, setBulkAction] = useState("");

  console.log("details", role);
  // console.log("login_detail", login_detail); 
  // State for new inquiry form data
  const [newInquiry, setNewInquiry] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    course: "Maths",
    source: "Whatsapp",
    inquiryType: "",
    gender: "",
    branch: "",
    country: "",
    date_of_birth: "",
    preferredCountries: [],

    course_name: "",
    studyLevel: "",
    studyField: "",
    intake: "",
    budget: "",
    consent: false,

    highestLevel: "",
    education: [],
    testType: '',
    overallScore: '',
    readingScore: '',
    writingScore: '',
    speakingScore: '',
    listeningScore: '',

    companyName: '',
    jobTitle: '',
    jobDuration: '',
    studyGap: '',
    visaRefused: '',
    refusalReason: '',
    address: '',
    presentAddress: '',
    date_of_inquiry: new Date().toISOString().split('T')[0], // YYYY-MM-DD
    additionalNotes: '',
  });
  const [councolerid, setCouncolerId] = useState("")

  useEffect(() => {
    const is_id = localStorage.getItem("user_id")
    if (is_id) {
      setCouncolerId(is_id)
    }
  }, [])
  // State for new follow-up form data
  const [newFollowUp, setNewFollowUp] = useState({
    name: "",
    title: "",
    followUpDate: new Date().toISOString().split("T")[0],
    status: "New",
    urgency: "WhatsApp",
    department: "",
    responsible: "👤",
  });

  // CSV Headers for export (you can modify as needed)
  const csvHeaders = [

    { label: "Name", key: "full_name" },
    { label: "Email", key: "email" },
    { label: "Phone", key: "phone_number" },
    { label: "Source", key: "source" },
    { label: "Branch", key: "branch" },
    { label: "Inquiry Type", key: "inquiry_type" },
    { label: "Date", key: "date_of_inquiry" },
    { label: "Country", key: "country" },
    { label: "Counselor", key: "counselor_name" },
    { label: "Status", key: "lead_status" },
  ];

  // Excel Export
  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Inquiries");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "inquiries.xlsx");
  };

  // PDF Export
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("Inquiries Report", 14, 15);
    const tableColumn = ["ID", "Name", "Email", "Phone", "Source", "Branch", "Inquiry Type", "Date", "Country", "Status"];
    const tableRows = [];

    filteredData.forEach((inq, index) => {
      const rowData = [
        index + 1,
        inq.full_name,
        inq.email,
        inq.phone_number,
        inq.source,
        inq.branch,
        inq.inquiry_type,
        new Date(inq.date_of_inquiry).toISOString().split('T')[0],
        inq.country,
        inq.lead_status,
      ];
      tableRows.push(rowData);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 25,
    });

    doc.save("inquiries.pdf");
  };


  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [getData, setData] = useState([])
  // Fetch all branches
  const fetchBranchData = async () => {
    try {
      const response = await api.get(`${BASE_URL}branch`);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  // Call on component mount
  useEffect(() => {
    fetchBranchData();
  }, []);
  // Modal handlers
  const handleShowInquiryModal = () => setShowInquiryModal(true);
  const handleCloseInquiryModal = () => {
    setShowInquiryModal(false);
    setNewInquiry({
      name: "",
      email: "",
      phone: "",
      city: "",
      address: "",
      course: "",
      source: "Whatsapp",
      inquiryType: "",
      branch: "",
      assignee: "",
      country: "",
      dateOfInquiry: "",
      presentAddress: "",
      education: [],
      englishProficiency: [],
      jobExperience: {
        company: "",
        jobTitle: "",
        duration: "",
      },
      preferredCountries: [],
    });
  };

  const handleShowFollowUpModal = () => setShowFollowUpModal(true);
  const handleCloseFollowUpModal = () => {
    setShowFollowUpModal(false);
    setNewFollowUp({
      name: "",
      title: "",
      followUpDate: new Date().toISOString().split("T")[0],
      status: "New",
      urgency: "",
      department: "",
      responsible: "👤",
    });
  };

  // Handle input changes for new inquiry
  const handleInquiryInputChange = (e) => {
    const { name, value } = e.target;
    setNewInquiry({
      ...newInquiry,
      [name]: value,
    });
  };

  // Handle checkbox changes for arrays
  const handleCheckboxChange = (field, value, isChecked) => {
    setNewInquiry((prev) => {
      const newArray = isChecked
        ? [...prev[field], value]
        : prev[field].filter((item) => item !== value);
      return {
        ...prev,
        [field]: newArray,
      };
    });
  };

  // Handle job experience changes
  const handleJobExpChange = (field, value) => {
    setNewInquiry({
      ...newInquiry,
      jobExperience: {
        ...newInquiry.jobExperience,
        [field]: value,
      },
    });
  };


  useEffect(() => {
    const fetchCounselors = async () => {
      try {
        const res = await api.get(`${BASE_URL}counselor`);  // Fetch counselor data
        setCounselors(res.data);  // Update the counselors state with data
        console.log(selectedCounselor);
      } catch (err) {
        console.error("Failed to fetch counselors", err);
      }
    };
    fetchCounselors();  // Call the function to fetch counselors
  }, []);  // This runs only once when the component mounts


  // Fetch inquiries when the component mounts
  // 🟢 Function outside
  // 🟢 Function to fetch inquiries
  const fetchInquiries = async () => {
    try {
      const response = await api.get(`inquiries`); // Fetch inquiries from API

      const allInquiries = response.data;
      console.log(allInquiries)
      const userRole = localStorage.getItem("role"); // Get the user role (admin or counselor)
      const userId = localStorage.getItem("user_id"); // Get the counselor ID

      // If the user is an admin, fetch all inquiries, otherwise, filter by counselor_id
      const filteredInquiries = userRole === "admin"
        ? allInquiries // Admin sees all inquiries
        : allInquiries.filter(inquiry => inquiry.counselor_id === parseInt(userId)); // Counselor sees their assigned inquiries

      setInquiries(filteredInquiries); // Update the inquiries state with the filtered inquiries
      // Extract unique countries from filtered inquiries
      const uniqueCountries = [...new Set(filteredInquiries
        .map(inq => inq.country)
        .filter(country => country && country.trim() !== ""))];

      setCountryOptions(uniqueCountries); // Store for dropdown options
    } catch (error) {
      console.error("Error fetching inquiries:", error); // Handle error
    }
  };
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    branch: "",
    source: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    filterInquiries();
  }, [inquiries, filters]);

  const filterInquiries = () => {
    let data = [...inquiries];
    // Search Filter (Name or Phone)
    if (filters.search) {
      data = data.filter(
        (inq) =>
          inq?.full_name?.toLowerCase()?.includes(filters.search.toLowerCase()) ||
          inq?.phone_number?.includes(filters.search) ||
          inq?.email?.toLowerCase()?.includes(filters.search.toLowerCase())
      );
    }

    // Country Filter
    if (filters.country) {
      data = data.filter((inq) => inq.country === filters.country);
    }
    // Source Filter
    if (filters.source) {
      data = data?.filter((inq) => inq.source === filters.source);
    }
    // Counselor Filter
    if (filters.counselor) {
      data = data?.filter((inq) => String(inq.counselor_id) === filters.counselor);
    }

    // Date Range Filter
    if (filters.startDate && filters.endDate) {
      data = data.filter((inq) => {
        const inquiryDate = new Date(inq.date_of_inquiry);
        return (
          inquiryDate >= new Date(filters.startDate) &&
          inquiryDate <= new Date(filters.endDate)
        );
      });
    }
    setFilteredData(data);
  };

  // 🔄 useEffect to call on mount / when councolerid changes
  useEffect(() => {
    if (councolerid) {
      fetchInquiries();
    }
  }, [councolerid]);

  const handleAddInquiry = async (e) => {
    e.preventDefault(); // Prevent form submission

    const requestData = {
      counselor_id: councolerid,
      inquiry_type: newInquiry.inquiryType,
      source: newInquiry.source,
      branch: newInquiry.branch,
      full_name: newInquiry.name,
      phone_number: newInquiry.phone,
      email: newInquiry.email,
      country: newInquiry.country,
      city: newInquiry.city,
      date_of_birth: newInquiry.date_of_birth,

      gender: newInquiry.gender,
      education_background: newInquiry.education,
      english_proficiency: newInquiry.englishProficiency,
      course_name: newInquiry.course_name,
      study_level: newInquiry.studyLevel,
      study_field: newInquiry.studyField,
      intake: newInquiry.intake,
      budget: newInquiry.budget,
      consent: newInquiry.consent,
      preferred_countries: newInquiry.preferredCountries,
      highest_level: newInquiry.highestLevel,
      university: newInquiry.university,
      medium: newInquiry.medium,
      test_type: newInquiry.testType,
      overall_score: newInquiry.overallScore,
      reading_score: newInquiry.readingScore,
      writing_score: newInquiry.writingScore,
      speaking_score: newInquiry.speakingScore,
      listening_score: newInquiry.listeningScore,
      company_name: newInquiry.companyName,
      job_title: newInquiry.jobTitle,
      job_duration: newInquiry.jobDuration,
      study_gap: newInquiry.studyGap,
      visa_refused: newInquiry.visaRefused,
      refusal_reason: newInquiry.refusalReason,
      address: newInquiry.address,
      present_address: newInquiry.presentAddress,
      date_of_inquiry: newInquiry.date_of_inquiry, // Use the date of inquiry from the form
      additional_notes: newInquiry.additionalNotes,

    };

    try {
      // Send the request to the API
      const response = await api.post(`${BASE_URL}inquiries`, requestData);

      if (response.status === 201) {
        // Show success message using SweetAlert
        Swal.fire({
          title: 'Success!',
          text: 'Inquiry submitted successfully.',
          icon: 'success',
          confirmButtonText: 'Ok',
        }).then(() => {
          handleCloseInquiryModal(); // Close modal after success
          fetchInquiries(); // 🔄 Fetch updated inquiry list
        });
      } else {
        // Handle non-200 responses
        Swal.fire({
          title: 'Success!',
          text: 'Inquiry added successfully.',
          icon: 'success',
          confirmButtonText: 'Ok',
        }).then(() => {
          handleCloseInquiryModal();
          setCurrentPage(1);
          fetchInquiries();
        });
      }
    } catch (error) {
      console.error("Error during inquiry submission:", error);
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong. Please try again.',
        icon: 'error',
        confirmButtonText: 'Close',
      });
    }
  };

  const handleOpenAssignModal = (inquiry) => {
    setSelectedInquiry(inquiry);
    setShowAssignModal(true); // Show the modal
  };
  const handleCloseAssignModal = () => {
    setShowAssignModal(false);
    setSelectedCounselor(null); // Reset selected counselor when closing modal
  };


  const handleAssignCounselor = async () => {
    if (!selectedCounselor) {
      alert("Please select a counselor.");
      return;
    }

    try {
      // Sending the selected counselor's ID along with the inquiry ID
      const payload = {
        inquiry_id: selectedInquiry.id,           // Inquiry ID
        counselor_id: selectedCounselor.id,       // Counselor ID
        follow_up_date: followUpDate,             // Follow-up date
        notes: notes                              // Notes
      };

      // Call the API to assign the counselor to the inquiry
      const response = await api.post(`${BASE_URL}assign-inquiry`, payload);

      if (response.status === 200) {
        alert("Counselor assigned successfully.");
        setShowAssignModal(false);  // Close the modal
        fetchInquiries();  // Optionally re-fetch inquiries
      }
    } catch (error) {
      console.error("Error assigning counselor:", error);
      alert("Failed to assign counselor.");
    }
  };

  // Handle inquiry detail view
  const handleViewDetail = async (id) => {
    try {
      const response = await api.get(`${BASE_URL}inquiries/${id}`);
      setSelectedInquiry(response.data);
      setInquiryDetailsModal(true);
    } catch (error) {
      console.error("Error fetching inquiry details:", error);
    }
  };

  // Handle delete inquiry
  const handleDeleteInquiry = async (id) => {
    try {
      await api.delete(`${BASE_URL}inquiries/${id}`);
      setInquiries({
        ...inquiries,
        todayInquiries: inquiries.todayInquiries.filter(
          (inq) => inq.id !== id
        ),
      });
    } catch (error) {
      console.error("Error deleting inquiry:", error);
    }
  };
  const handleShowAssignModal = (inquiry) => {
    setSelectedInquiry(inquiry); // Set selected inquiry
    setSelectedCounselor(null);  // Reset selected counselor on modal open
    setShowAssignModal(true);    // Show the modal
  };

  const handleStatusChange = async (status) => {
    try {
      const response = await api.patch(
        `fee/update-lesd-status`,
        {
          id: selectedInquiry?.id,
          lead_status: status
        }
      );
      alert("Status updated successfully!");
      await fetchInquiries()
      setInquiryDetailsModal(false);
      console.log(response.data);
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status.");
    }
  };
  const handleSelectInquiry = (id) => {
    setSelectedInquiries((prev) =>
      prev.includes(id) ? prev.filter((inquiryId) => inquiryId !== id) : [...prev, id]
    );
  };
  const handleBulkStatusChange = async (status) => {
    try {
      await Promise.all(selectedInquiries.map(async (id) => {
        await api.patch(`fee/update-lesd-status`, { id, lead_status: status });
      }));
      alert("Bulk status updated successfully!");
      fetchInquiries();
      setSelectedInquiries([]);
    } catch (err) {
      console.error(err);
      alert("Bulk update failed.");
    }
  };
  const handleBulkApply = () => {
    if (bulkAction) {
      handleBulkStatusChange(bulkAction);
    } else {
      alert("Please select an action.");
    }
  };


  const handleStatusChangeFromTable = async (id, status) => {
    try {
      const response = await api.patch(
        `fee/update-lesd-status`,
        {
          id: id,
          lead_status: status
        }
      );
      toast.success("Status updated successfully!");
      await fetchInquiries(); // data refresh
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status.");
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Today's Inquiries</h2>
        <div className="d-flex gap-3">
          <div className="d-flex gap-3">

            <div className="  gap-2">
              <div className="btn-group ">
                <Button variant="outline-success">
                  <CSVLink data={filteredData} headers={csvHeaders} filename={"inquiries.csv"} style={{ color: "#000", textDecoration: "none" }}>
                    Export CSV
                  </CSVLink>
                </Button>
                <Button variant="outline-info" onClick={handleExportExcel}>Export Excel</Button>
                <Button variant="outline-danger" onClick={handleExportPDF}>Export PDF</Button>
              </div>



              <Button
                variant="secondary"
                className="me-2 ms-3"
                onClick={handleShowInquiryModal}
                style={{ border: "none" }}
              >
                Add Inquiry
              </Button>
            </div>

            {/* Filter Button */}

          </div>
        </div>
      </div>
      {/* Row 1: Search, Country, Source */}
      <Row className="mb-3">
        <Col md={4}>
          <label><small>Search</small></label>
          <Form.Control
            style={{ height: "40px" }}
            placeholder="Search by Name, Phone or Email"
            value={filters.search}
            onChange={(e) =>
              setFilters({ ...filters, search: e.target.value })
            }
          />
        </Col>

        <Col md={4}>
          <label><small>Country</small></label>
          <Form.Select
            style={{ height: "40px" }}
            value={filters.country}
            onChange={(e) =>
              setFilters({ ...filters, country: e.target.value })
            }
          >
            <option value="">All Countries</option>
            {countryOptions.map((country, idx) => (
              <option key={idx} value={country}>{country}</option>
            ))}
          </Form.Select>
        </Col>

        <Col md={4}>
          <label><small>Source</small></label>
          <Form.Select
            style={{ height: "40px" }}
            value={filters.source}
            onChange={(e) =>
              setFilters({ ...filters, source: e.target.value })
            }
          >
            <option value="">All Sources</option>
            <option value="facebook">Facebook</option>
            <option value="youtube">YouTube</option>
            <option value="website">Website</option>
            <option value="referral">Referral</option>
            <option value="event">Event</option>
            <option value="agent">Agent</option>
            <option value="office_visit">Office Visit</option>
            <option value="hotline">Hotline</option>
            <option value="seminar">Seminar</option>
            <option value="expo">Expo</option>
            <option value="other">Other</option>
          </Form.Select>
        </Col>
      </Row>

      {/* Row 2: Dates, Counselor, Reset */}
      <Row className="mb-4">
        <Col md={4}>
          <label><small>Inquiry Start Date</small></label>
          <Form.Control
            type="date"
            style={{ height: "40px" }}
            value={filters.startDate}
            onChange={(e) =>
              setFilters({ ...filters, startDate: e.target.value })
            }
          />
        </Col>

        <Col md={4}>
          <label><small>Inquiry End Date</small></label>
          <Form.Control
            type="date"
            style={{ height: "40px" }}
            value={filters.endDate}
            onChange={(e) =>
              setFilters({ ...filters, endDate: e.target.value })
            }
          />
        </Col>

        <Col md={3}>
          <label><small>Counselor Name</small></label>
          <Form.Select
            style={{ height: "40px" }}
            value={filters.counselor}
            onChange={(e) =>
              setFilters({ ...filters, counselor: e.target.value })
            }
          >
            <option value="">All Counselors</option>
            {counselors?.map((counselor) => (
              <option key={counselor.id} value={counselor.id}>
                {counselor.full_name}
              </option>
            ))}
          </Form.Select>
        </Col>

        <Col md={1} className="d-flex align-items-end">
          <Button
            variant="secondary"
            className="w-100"
            onClick={() =>
              setFilters({
                search: "",
                branch: "",
                source: "",
                startDate: "",
                endDate: "",
                country: "",
                counselor: ""
              })
            }
          >
            Reset
          </Button>
        </Col>
      </Row>


      {/* // Modal for assigning counselor */}
      <Modal show={showAssignModal} onHide={handleCloseAssignModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Assign Counselor to Inquiry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedInquiry && (
            <div>
              <p><strong>Inquiry Name:</strong> {selectedInquiry.full_name}</p>
              <p><strong>Course:</strong> {selectedInquiry.course_name}</p>
              <Form.Group controlId="counselorSelect" className="mb-3">
                <Form.Label>Counselor *</Form.Label>
                <Form.Select
                  className="form-select"
                  onChange={(e) => {
                    const selectedId = e.target.value;
                    const selected = counselors.find((c) => c.id.toString() === selectedId);
                    setSelectedCounselor(selected);
                  }}
                  value={selectedCounselor ? selectedCounselor.id : ""}
                >
                  <option value="">Select Counselor</option>
                  {counselors?.map((counselor) => (
                    <option key={counselor.id} value={counselor.id}>
                      {counselor.full_name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group controlId="followUpDate" className="mb-3">
                <Form.Label>Follow-Up Date *</Form.Label>
                <Form.Control
                  type="date"
                  value={followUpDate}
                  onChange={(e) => setFollowUpDate(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="notes" className="mb-3">
                <Form.Label>Notes</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter any notes here..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </Form.Group>

            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAssignModal}>Cancel</Button>
          <Button variant="primary" onClick={handleAssignCounselor}>Assign</Button>
        </Modal.Footer>
      </Modal>
      <div className="d-flex gap-2 mb-3">
        <Form.Select style={{ width: '200px' }} value={bulkAction} onChange={(e) => setBulkAction(e.target.value)}>
          <option value="">Bulk Actions</option>
          <option value="Converted to Lead">Convert to Lead</option>
          <option value="Not Eligible">Not Eligible</option>
          <option value="Not Interested">Not Interested</option>
        </Form.Select>
        <Button variant="outline-primary" onClick={handleBulkApply}>Apply</Button>
      </div>


      {/* Today's Inquiries */}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Inquiry ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Source</th>
            <th>Branch</th>
            <th>Inquiry Type</th>
            <th>Date of Inquiry</th>
            <th>Country</th>
            <th>Counselor Name </th>
            <th>Status</th>
            <th>Check Eligibility</th>
            <th >Action</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(filteredData) && filteredData.length > 0 ? (
            filteredData?.map((inq, index) => (
              <tr key={inq.id}>
                <td>
                  <Form.Check
                    type="checkbox"
                    checked={selectedInquiries.includes(inq.id)}
                    onChange={() => handleSelectInquiry(inq.id)}
                  />
                </td>

                <td>{index + 1}</td>
                <td>{inq.full_name}</td>
                <td>{inq.email}</td>
                <td>{inq.phone_number}</td>
                <td>{inq.source}</td>
                <td>{inq.branch}</td>
                <td>{inq.inquiry_type}</td>
                <td>{new Date(inq.date_of_inquiry).toISOString().split('T')[0]}</td>
                <td>{inq.country}</td>
                <td>
                  {String(inq.counselor_id) === "1" ? (
                    <Badge bg="warning">Not Assigned</Badge>
                  ) : (
                    inq.counselor_name || <Badge bg="secondary">N/A</Badge>
                  )}
                </td>

                {/* Status Column */}
                <td>
                  {(inq.lead_status === "0" || inq.lead_status === "New") ? (
                    <Badge bg="success">New</Badge>
                  ) : inq.lead_status === "In Review" ? (
                    <Badge bg="warning text-dark">In Review</Badge>
                  ) : inq.lead_status === "Check Eligibility" ? (
                    <Badge bg="info text-dark">Check Eligibility</Badge>
                  ) : inq.lead_status === "Converted to Lead" ? (
                    <Badge bg="primary">Converted to Lead</Badge>
                  ) : inq.lead_status === "Not Eligible" ? (
                    <Badge bg="danger">Not Eligible</Badge>
                  ) : inq.lead_status === "Not Interested" ? (
                    <Badge bg="secondary">Not Interested</Badge>
                  ) : inq.lead_status === "Duplicate" ? (
                    <Badge style={{ backgroundColor: "#fd7e14", color: "#fff" }}>Duplicate</Badge>
                  ) : (
                    <Badge bg="dark">Unknown</Badge>
                  )}
                </td>


                <td>
                  {(inq.lead_status === "0" || inq.lead_status === "New") ? (
                    <span
                      style={{ cursor: 'pointer', color: '#0d6efd', fontWeight: 'bold' }}
                      onClick={() => {
                        setSelectedInquiry(inq);
                        setInquiryDetailsModal(true);
                      }}
                    >
                      Check Eligibility
                    </span>
                  ) : inq.lead_status === "In Review" ? (
                    <Badge bg="warning text-dark" style={{ fontWeight: "bold" }}>
                      In Review
                    </Badge>
                  ) : inq.lead_status === "Check Eligibility" ? (
                    <Badge bg="info text-dark" style={{ fontWeight: "bold" }}>
                      Check Eligibility
                    </Badge>
                  ) : inq.lead_status === "Converted to Lead" ? (
                    <Badge bg="primary" style={{ fontWeight: "bold" }}>
                      Converted to Lead
                    </Badge>
                  ) : inq.lead_status === "Not Eligible" ? (
                    <Badge bg="danger" style={{ fontWeight: "bold" }}>
                      Not Eligible
                    </Badge>
                  ) : inq.lead_status === "Not Interested" ? (
                    <Badge bg="secondary" style={{ fontWeight: "bold" }}>
                      Not Interested
                    </Badge>
                  ) : inq.lead_status === "Duplicate" ? (
                    <Badge style={{ backgroundColor: "#fd7e14", color: "#fff", fontWeight: "bold" }}>
                      Duplicate
                    </Badge>
                  ) : (
                    <Badge bg="dark" style={{ fontWeight: "bold" }}>-</Badge>
                  )}
                </td>


                <td>
                  {(inq.status === "0" && (inq.lead_status !== "0" && inq.lead_status !== "New")) ? (
                    <Button variant="info" size="sm" onClick={() => handleOpenAssignModal(inq)}>
                      Assign Counselor
                    </Button>
                  ) : (
                    <Button variant="info" size="sm" disabled>
                      Assign Counselor
                    </Button>
                  )}

                  <Dropdown className="d-inline ms-2">
                    <Dropdown.Toggle variant="outline-secondary" size="sm">
                      Action
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => handleStatusChangeFromTable(inq.id, "In Review")}>
                        In Review
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handleStatusChangeFromTable(inq.id, "Converted to Lead")}>
                        Convert to Lead
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handleStatusChangeFromTable(inq.id, "Not Interested")}>
                        Not Interested
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handleStatusChangeFromTable(inq.id, "Not Eligible")}>
                        Not Eligible
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>

                  <a
                    href={`https://wa.me/${inq.phone_number}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ms-2"
                  >
                    <button className="btn btn-sm btn-outline-success me-2">
                      <i className="bi bi-whatsapp"></i>
                    </button>
                  </a>

                  <a
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${inq.email}&su=Regarding Your Inquiry&body=${encodeURIComponent(
                      `Dear ${inq.full_name},

Here are your inquiry details:

- Name: ${inq.full_name}
- Phone: ${inq.phone_number}
- Email: ${inq.email}
- Inquiry Type: ${inq.inquiry_type}
- Source: ${inq.source}
- Branch: ${inq.branch}
- Counselor: ${inq.counselor_name || 'Not Assigned'}
- Country: ${inq.country}
- Date of Inquiry: ${new Date(inq.date_of_inquiry).toLocaleDateString()}
- Status: ${inq.lead_status}

Thank you for your interest.

Regards,
Study First Info Team`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-outline-dark ms-2"
                  >
                    <i className="bi bi-envelope"></i>
                  </a>




                  {/* Delete Button */}
                  <Button variant="danger"
                    size="sm"
                    onClick={() => handleDeleteInquiry(inq.id)}
                    className="ms-2">
                    <MdDelete /> {/* MdDelete icon for delete button */}
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No inquiries available.</td>
            </tr>
          )}
        </tbody>
      </Table>


      <Followup />



      {/* Modal for Adding New Inquiry */}
      <Modal show={showInquiryModal}
        onHide={handleCloseInquiryModal}
        centered
        size="lg">
        <Modal.Header closeButton>
          <Modal.Title>New Inquiry Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddInquiry}>
            {/* Inquiry Info */}
            <Row className="mb-3">
              <Col md={4}>
                <Form.Group controlId="inquiryType">
                  <Form.Label>Inquiry Type</Form.Label>
                  <Form.Select
                    name="inquiryType"
                    value={newInquiry.inquiryType}
                    onChange={handleInquiryInputChange}
                    required>
                    <option value="">Select Inquiry Type</option>
                    <option value="student_visa">Student Visa</option>
                    <option value="visit_visa">Visit Visa</option>
                    <option value="work_visa">Work Visa</option>
                    <option value="short_visa">Short Visa</option>
                    <option value="german_course">German Course</option>
                    <option value="english_course">English Course</option>
                    <option value="others">Others</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="source">
                  <Form.Label>Source</Form.Label>
                  <Form.Select
                    name="source"
                    value={newInquiry.source}
                    onChange={handleInquiryInputChange}
                    required>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="facebook">Facebook</option>
                    <option value="youtube">YouTube</option>
                    <option value="website">Website</option>
                    <option value="referral">Referral</option>
                    <option value="event">Event</option>
                    <option value="agent">Agent</option>
                    <option value="office_visit">Office Visit</option>
                    <option value="hotline">Hotline</option>
                    <option value="seminar">Seminar</option>
                    <option value="expo">Expo</option>
                    <option value="other">Other</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="branch">
                  <Form.Label>Branch</Form.Label>
                  <Form.Select
                    name="branch"
                    value={newInquiry.branch}
                    onChange={handleInquiryInputChange}
                    required>
                    <option value="">Select Branch</option>
                    {getData.map((item) => (
                      <option key={item.id} value={item.branch_name}>
                        {item.branch_name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

              </Col>
            </Row>

            {/* Personal Information */}
            <h5 className="mt-4 mb-3">Personal Information</h5>
            <Row className="mb-3">
              <Col md={3}>
                <Form.Group controlId="name">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter full name"
                    name="name"
                    value={newInquiry.name}
                    onChange={handleInquiryInputChange}
                    required />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="phone">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter phone number"
                    name="phone"
                    value={newInquiry.phone}
                    onChange={handleInquiryInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="email">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control type="email"
                    placeholder="Enter email"
                    name="email"
                    value={newInquiry.email}
                    onChange={handleInquiryInputChange}
                    required />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="country">
                  <Form.Label>Interested Country</Form.Label>
                  <Form.Select
                    name="country"
                    value={newInquiry.country}
                    onChange={handleInquiryInputChange}
                    required
                  >
                    <option value="">Select Country</option>
                    <option value="Hungary">Hungary</option>
                    <option value="UK">UK</option>
                    <option value="Cyprus">Cyprus</option>
                    <option value="Canada">Canada</option>
                    <option value="Malaysia">Malaysia</option>
                    <option value="Lithuania">Lithuania</option>
                    <option value="Latvia">Latvia</option>
                    <option value="Germany">Germany</option>
                    <option value="New Zealand">New Zealand</option>
                    <option value="Others">Others</option>
                  </Form.Select>
                </Form.Group>
              </Col>

            </Row>
            <Row className="mb-3">

              <Col md={4}>
                <Form.Group controlId="city">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter city"
                    name="city"
                    value={newInquiry.city}
                    onChange={handleInquiryInputChange}
                    required />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="dateOfInquiry">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    type="date"
                    name="date_of_birth"
                    value={newInquiry.date_of_birth}
                    onChange={handleInquiryInputChange}
                    required />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="inquiryType">
                  <Form.Label>Gender</Form.Label>
                  <Form.Select
                    name="gender"
                    value={newInquiry.gender}
                    onChange={handleInquiryInputChange}
                    required>
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            {/* Educational Background */}
            <h4 className="mt-4">Academic Background</h4>
            <Row className="mb-3">
              <Col md={3}>
                <Form.Group controlId="highestLevel">
                  <Form.Label>Highest Level Completed</Form.Label>
                  <Form.Select
                    value={newInquiry.highestLevel}
                    onChange={(e) => {
                      const selected = e.target.value;
                      setNewInquiry({ ...newInquiry, highestLevel: selected });
                      setGpa(""); // Reset when level changes
                      setYear("");
                    }}
                    required
                  >
                    <option value="">Select</option>
                    <option value="ssc">SSC</option>
                    <option value="hsc">HSC</option>
                    <option value="bachelor">Bachelor</option>
                    <option value="master">Master</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              {newInquiry.highestLevel && (
                <>
                  <Col md={3}>
                    <Form.Group>
                      <Form.Label>
                        {newInquiry.highestLevel.toUpperCase()} GPA / CGPA
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter GPA"
                        value={gpa}
                        onChange={(e) => setGpa(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group>
                      <Form.Label>Year of Passing</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Year"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3} className="d-flex align-items-end">
                    <Button
                      variant="primary"
                      onClick={() => {
                        const eduObj = {
                          level: newInquiry.highestLevel,
                          gpa,
                          year,
                        };
                        setNewInquiry({
                          ...newInquiry,
                          education: [eduObj], // override if only one is allowed
                          highestLevel: newInquiry.highestLevel,
                        });
                      }}
                    >
                      Save
                    </Button>
                  </Col>
                </>
              )}

            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="university">
                  <Form.Label>Board/University Name</Form.Label>
                  <Form.Control type="text" value={newInquiry.university}
                    onChange={(e) =>
                      setNewInquiry({ ...newInquiry, university: e.target.value })
                    } />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="medium">
                  <Form.Label>Medium of Instruction</Form.Label>
                  <Form.Select
                    value={newInquiry.medium}
                    onChange={(e) =>
                      setNewInquiry({ ...newInquiry, medium: e.target.value })
                    }
                    required>
                    <option value="">Select</option>
                    <option value="english">English</option>
                    <option value="bangla">Bangla</option>
                    <option value="other">Other</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>


            {/* English Proficiency */}

            <h5 className="mt-4 mb-3">Course & Program Info</h5>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Group controlId="course_name">
                  <Form.Label>Interested Program/Course Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Course Name"
                    value={newInquiry.course_name}
                    onChange={(e) =>
                      setNewInquiry({ ...newInquiry, course_name: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group controlId="study_level">
                  <Form.Label>Preferred Study Level</Form.Label>
                  <Form.Select
                    value={newInquiry.studyLevel}
                    onChange={(e) =>
                      setNewInquiry({ ...newInquiry, studyLevel: e.target.value })
                    }
                  >
                    <option value="">Select</option>
                    <option value="diploma">Diploma</option>
                    <option value="bachelor">Bachelor</option>
                    <option value="master">Master</option>
                    <option value="phd">PhD</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group controlId="study_field">
                  <Form.Label>Preferred Study Field</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g. Business, Engineering"
                    value={newInquiry.studyField}
                    onChange={(e) =>
                      setNewInquiry({ ...newInquiry, studyField: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={4}>
                <Form.Group controlId="intake">
                  <Form.Label>Preferred Intake</Form.Label>
                  <Form.Select
                    value={newInquiry.intake}
                    onChange={(e) =>
                      setNewInquiry({ ...newInquiry, intake: e.target.value })
                    }
                  >
                    <option value="">Select</option>
                    <option value="february">February</option>
                    <option value="september">September</option>
                    <option value="other">Other</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={8}>
                <Form.Label>Preferred Countries</Form.Label>
                <div>
                  {["Hungary", "UK", "Cyprus", "Canada", "Malaysia", "Lithuania", "Latvia", "Germany", "New Zealand", "Others",].map((country) => (
                    <Form.Check
                      inline
                      key={country}
                      type="checkbox"
                      id={`country-${country.toLowerCase()}`}
                      label={country}
                      value={country}
                      checked={newInquiry.preferredCountries.includes(country)}
                      onChange={(e) =>
                        handleCheckboxChange("preferredCountries", country, e.target.checked)
                      }
                    />
                  ))}
                </div>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={4}>
                <Form.Group controlId="budget">
                  <Form.Label>Initial Budget (1-Year Tuition + Living Cost)</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter estimated budget"
                    value={newInquiry.budget}
                    onChange={(e) =>
                      setNewInquiry({ ...newInquiry, budget: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>

            <h5 className="mt-4 mb-3">English Proficiency</h5>
            <Row className="mb-3">
              <Col md={3}>
                <Form.Group controlId="testType">
                  <Form.Label>Test Type</Form.Label>
                  <Form.Select
                    value={newInquiry.testType}
                    onChange={(e) =>
                      setNewInquiry({ ...newInquiry, testType: e.target.value })
                    }
                  >
                    <option value="">Select</option>
                    <option value="ielts">IELTS</option>
                    <option value="toefl">TOEFL</option>
                    <option value="duolingo">Duolingo</option>
                    <option value="no_test">No Test Yet</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={3}>
                <Form.Group controlId="overallScore">
                  <Form.Label>Overall Band Score</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g. 6.5"
                    value={newInquiry.overallScore}
                    onChange={(e) =>
                      setNewInquiry({ ...newInquiry, overallScore: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>

              <Col md={3}>
                <Form.Group controlId="readingScore">
                  <Form.Label>Reading Score</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g. 6.5"
                    value={newInquiry.readingScore}
                    onChange={(e) =>
                      setNewInquiry({ ...newInquiry, readingScore: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>

              <Col md={3}>
                <Form.Group controlId="writingScore">
                  <Form.Label>Writing Score</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g. 6.0"
                    value={newInquiry.writingScore}
                    onChange={(e) =>
                      setNewInquiry({ ...newInquiry, writingScore: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={3}>
                <Form.Group controlId="speakingScore">
                  <Form.Label>Speaking Score</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g. 7.0"
                    value={newInquiry.speakingScore}
                    onChange={(e) =>
                      setNewInquiry({ ...newInquiry, speakingScore: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>

              <Col md={3}>
                <Form.Group controlId="listeningScore">
                  <Form.Label>Listening Score</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g. 6.5"
                    value={newInquiry.listeningScore}
                    onChange={(e) =>
                      setNewInquiry({ ...newInquiry, listeningScore: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <h5 className="mt-4 mb-3">Work & Visa History</h5>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Group controlId="companyName">
                  <Form.Label>Company Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Company Name"
                    value={newInquiry.companyName}
                    onChange={(e) =>
                      setNewInquiry({ ...newInquiry, companyName: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group controlId="jobTitle">
                  <Form.Label>Job Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Job Title"
                    value={newInquiry.jobTitle}
                    onChange={(e) =>
                      setNewInquiry({ ...newInquiry, jobTitle: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group controlId="jobDuration">
                  <Form.Label>Duration</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g. Jan 2020 - Dec 2022"
                    value={newInquiry.jobDuration}
                    onChange={(e) =>
                      setNewInquiry({ ...newInquiry, jobDuration: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="studyGap">
              <Form.Label>Study Gap (if any)</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Explain any study gaps"
                value={newInquiry.studyGap}
                onChange={(e) =>
                  setNewInquiry({ ...newInquiry, studyGap: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="visaRefused">
              <Form.Label>Any Previous Visa Refusal?</Form.Label>
              <div>
                <Form.Check
                  inline
                  label="Yes"
                  name="visaRefusal"
                  type="radio"
                  id="visaYes"
                  value="yes"
                  checked={newInquiry.visaRefused === "yes"}
                  onChange={(e) =>
                    setNewInquiry({ ...newInquiry, visaRefused: e.target.value })
                  }
                />
                <Form.Check
                  inline
                  label="No"
                  name="visaRefusal"
                  type="radio"
                  id="visaNo"
                  value="no"
                  checked={newInquiry.visaRefused === "no"}
                  onChange={(e) =>
                    setNewInquiry({ ...newInquiry, visaRefused: e.target.value })
                  }
                />
              </div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="refusalReason">
              <Form.Label>Visa Refusal Reason (if yes)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter reason if any"
                value={newInquiry.refusalReason}
                onChange={(e) =>
                  setNewInquiry({ ...newInquiry, refusalReason: e.target.value })
                }
              />
            </Form.Group>

            <h5 className="mt-4 mb-3">Address</h5>
            <Form.Group className="mb-3" controlId="permanentAddress">
              <Form.Label>Permanent Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Permanent Address"
                value={newInquiry.address}
                onChange={(e) =>
                  setNewInquiry({ ...newInquiry, address: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="presentAddress">
              <Form.Label>Present Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Present Address"
                value={newInquiry.presentAddress}
                onChange={(e) =>
                  setNewInquiry({ ...newInquiry, presentAddress: e.target.value })
                }
              />
            </Form.Group>

            <h5 className="mt-4 mb-3">Final Details</h5>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Group controlId="inquiryDate">
                  <Form.Label>Date of Inquiry</Form.Label>
                  <Form.Control
                    type="date"

                    name="date_of_inquiry"
                    value={newInquiry.date_of_inquiry}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="additionalNotes">
              <Form.Label>Additional Notes (Optional)</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Any additional comments..."
                value={newInquiry.additionalNotes}
                onChange={(e) =>
                  setNewInquiry({ ...newInquiry, additionalNotes: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="consentCheckbox" className="mb-3">
              <Form.Check
                type="checkbox"
                required
                label="I confirm all information is correct and give permission to Study First Info to contact me."
                checked={newInquiry.consent}
                onChange={(e) =>
                  setNewInquiry({ ...newInquiry, consent: e.target.checked })
                }
              />
            </Form.Group>

            <div className="d-flex justify-content-end mt-4">
              <Button variant="danger" onClick={handleCloseInquiryModal} className="me-2">
                Cancel
              </Button>
              <Button variant="secondary" type="submit">
                Submit Inquiry
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal
        show={showInquiryDetailsModal}
        onHide={() => setInquiryDetailsModal(false)}
        centered
        size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Inquiry Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedInquiry && (
            <div>
              <h5>Personal Information</h5>
              <Row className="mb-3">
                <Col md={6}>
                  <p>
                    <strong>Name:</strong> {selectedInquiry.full_name}
                  </p>
                </Col>
                <Col md={6}>
                  <p>
                    <strong>Email:</strong> {selectedInquiry.email}
                  </p>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}>
                  <p>
                    <strong>Phone:</strong> {selectedInquiry.phone_number}
                  </p>
                </Col>
                <Col md={6}>
                  <p>
                    <strong>City:</strong> {selectedInquiry.city}
                  </p>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}>
                  <p>
                    <strong>Country:</strong> {selectedInquiry.country}
                  </p>
                </Col>
                <Col md={6}>
                  <p>
                    <strong>Inquiry Date:</strong>{" "}
                    {new Date(selectedInquiry.date_of_inquiry).toLocaleDateString()}
                  </p>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}>
                  <p>
                    <strong>Address:</strong> {selectedInquiry.address}
                  </p>
                </Col>
                <Col md={6}>
                  <p>
                    <strong>Present Address:</strong>{" "}
                    {selectedInquiry.present_address}
                  </p>
                </Col>
              </Row>

              <h5 className="mt-4">Education & Background</h5>
              <Row className="mb-3">
                <Col md={12}>
                  <p>
                    <strong>Education:</strong>{" "}
                    {selectedInquiry?.education_background?.length > 0
                      ? selectedInquiry?.education_background
                        .map((edu) => `${edu?.level?.toUpperCase()} (GPA: ${edu.gpa}, Year: ${edu.year})`)
                        .join(" | ")
                      : "No data"}
                  </p>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={12}>
                  <p>
                    <strong>English Proficiency:</strong><br />
                    {selectedInquiry ? (
                      <>
                        <strong>Test:</strong> {selectedInquiry.test_type}<br />
                        <strong>Overall:</strong> {selectedInquiry.overall_score}<br />
                        <strong>Reading:</strong> {selectedInquiry.reading_score} |{" "}
                        <strong>Writing:</strong> {selectedInquiry.writing_score} |{" "}
                        <strong>Speaking:</strong> {selectedInquiry.speaking_score} |{" "}
                        <strong>Listening:</strong> {selectedInquiry.listening_score}
                      </>
                    ) : (
                      "No data"
                    )}
                  </p>
                </Col>
              </Row>


              {selectedInquiry?.job_title && (
                <>
                  <h5 className="mt-4">Job Experience</h5>
                  <Row className="mb-3">
                    <Col md={4}>
                      <p>
                        <strong>Company:</strong> {selectedInquiry.company_name}
                      </p>
                    </Col>
                    <Col md={4}>
                      <p>
                        <strong>Job Title:</strong> {selectedInquiry.job_title}
                      </p>
                    </Col>
                    <Col md={4}>
                      <p>
                        <strong>Duration:</strong> {selectedInquiry.job_duration}
                      </p>
                    </Col>
                  </Row>
                </>
              )}

              <h5 className="mt-4">Preferences</h5>
              <Row className="mb-3">
                <Col md={6}>
                  <p>
                    <strong>Course:</strong> {selectedInquiry.course_name}
                  </p>
                </Col>
                <Col md={6}>
                  <p>
                    <strong>Source:</strong> {selectedInquiry.source}
                  </p>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={12}>
                  <p>
                    <strong>Preferred Countries:</strong>{" "}
                    {selectedInquiry?.preferred_countries?.join(", ")}
                  </p>
                </Col>
              </Row>
              {/* Add buttons here */}
              <Row className="mb-3">
                <Col className="d-flex gap-3">
                  <Button variant="danger" onClick={() => handleStatusChange("Not Eligible")}>
                    Not Eligible
                  </Button>
                  <Button variant="warning" onClick={() => handleStatusChange("Not Interested")}>
                    Not Interested
                  </Button>
                  <Button variant="success" onClick={() => handleStatusChange("Converted to Lead")}>
                    Convert to Lead
                  </Button>
                </Col>
              </Row>

            </div>

          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setInquiryDetailsModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Inquiry;
