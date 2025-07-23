import { useState, useEffect, useRef } from "react";
import { Container, Button, Table, Form, Modal, Row, Col, Badge, InputGroup, Dropdown, DropdownButton } from "react-bootstrap";
import { FaSearch, FaPlus, FaEdit, FaTrash, FaEye } from "react-icons/fa";
import BASE_URL from "../../Config";
import api from "../../interceptors/axiosInterceptor";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import InvoiceTemplate from "./InvoiceTemplate";
import { BsUpload, BsWhatsapp, BsArrowRepeat, BsSearch } from "react-icons/bs";
import AddLead from "./AddLead";

const LeadCounselor = ({ lead }) => {
  const invoiceRef = useRef(null);
  const [leads, setLeads] = useState([]);
  const [convertData, setConvertData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState(lead);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentLeadId, setCurrentLeadId] = useState(null);
  const [counselors, setCounselors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [universities, setUniversities] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editStudentId, setEditStudentId] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [photo, setPhoto] = useState(null);
  const itemsPerPage = 10;
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [selectedLeadForInvoice, setSelectedLeadForInvoice] = useState(null);
  const user_id = localStorage.getItem("user_id");
  const [errorMessage, setErrorMessage] = useState("");
  const [showMoreFields, setShowMoreFields] = useState(false);

  // invoice state 
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const [paymentDate, setPaymentDate] = useState("");
  const [notes, setNotes] = useState("");

  const [newLead, setNewLead] = useState({
    name: "",
    phone: "",
    email: "",
    counselor: "",
    follow_up_date: "",
    notes: "",
    preferred_countries: "",
    source: "",
    status: "",
    user_id: 1,
    address: "",
    education: "",
    intake: "",
    course: "",
    budget: "",
    passport: "",
    ielts: "",
    dob: "",
    gender: "",
    father_name: "",
    mother_name: "",
    emergency_contact: "",
    work_experience: "",
    english_test_type: "",
    english_test_score: "",
    previous_visa_refusals: "",
    marital_status: "",
    reference: ""
  });

  const [searchTerm, setSearchTerm] = useState("");
  const counsolerId = localStorage.getItem("counselor_id");

  const fetchLeads = async () => {
    try {
      const response = await api.get(`${BASE_URL}lead/getLeadByCounselorIdnew/${counsolerId}`);
      setLeads(response.data);
      console.log("Api response", response);

      if (response.data && response.data.length > 0) {
        const leadId = response.data[0].id;
      }
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const filteredLeads = leads?.filter((lead) =>
    lead.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const fetchCounseller = async () => {
    try {
      const response = await api.get(`counselor`);

      if (response.status === 200) {
        setCounselors(response.data);
      } else {
        console.error("Failed to fetch counselors");
      }
    } catch (error) {
      console.error("Error fetching counselors:", error);
    }
  };

  useEffect(() => {
    fetchCounseller();
  }, []);

  const handleShowModal = () => {
    setIsEditMode(false);
    setCurrentLeadId(null);
    setNewLead({
      name: "",
      phone: "",
      email: "",
      counselor: counsolerId,
      follow_up_date: "",
      notes: "",
      preferred_countries: "",
      source: "",
      status: "",
      user_id: lead.id,
      address: "",
      education: "",
      intake: "",
      course: "",
      budget: "",
      passport: "",
      ielts: "",
      dob: "",
      gender: "",
      father_name: "",
      mother_name: "",
      emergency_contact: "",
      work_experience: "",
      english_test_type: "",
      english_test_score: "",
      previous_visa_refusals: "",
      marital_status: "",
      reference: ""
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setShowMoreFields(false);
  };

  const handleEditLead = (lead) => {
    setIsEditMode(true);
    setCurrentLeadId(lead.id);
    setNewLead({
      name: lead.name,
      phone: lead.phone,
      email: lead.email,
      counselor: lead.counselor?.id || counsolerId,
      follow_up_date: lead.follow_up_date,
      notes: lead.notes,
      preferred_countries: lead.preferred_countries,
      source: lead.source,
      status: lead.status,
      user_id: 1,
      address: lead.address || "",
      education: lead.education || "",
      intake: lead.intake || "",
      course: lead.course || "",
      budget: lead.budget || "",
      passport: lead.passport || "",
      ielts: lead.ielts || "",
      dob: lead.dob || "",
      gender: lead.gender || "",
      father_name: lead.father_name || "",
      mother_name: lead.mother_name || "",
      emergency_contact: lead.emergency_contact || "",
      work_experience: lead.work_experience || "",
      english_test_type: lead.english_test_type || "",
      english_test_score: lead.english_test_score || "",
      previous_visa_refusals: lead.previous_visa_refusals || "",
      marital_status: lead.marital_status || "",
      reference: lead.reference || ""
    });
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLead({
      ...newLead,
      [name]: name === "counselor" ? parseInt(value) : value,
    });
  };

  const handleSaveLead = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        const response = await api.put(`${BASE_URL}lead/${currentLeadId}`, newLead);
        toast.success("Lead updated successfully!");
      } else {
        const response = await api.post(`${BASE_URL}lead`, newLead);
        toast.success("Lead added successfully!");
      }
      fetchLeads();
      handleCloseModal();
    } catch (error) {
      console.error("Error saving lead:", error);
      toast.error("Failed to save lead. Please try again.");
    }
  };

  const handleDeleteLead = async (leadId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        const response = await api.delete(`${BASE_URL}inquiries/${leadId}`);
        fetchLeads();
        Swal.fire(
          'Deleted!',
          'The lead has been deleted.',
          'success'
        );
      } catch (error) {
        Swal.fire(
          'Error!',
          'Failed to delete the lead.',
          'error'
        );
        console.error("Error deleting lead:", error);
      }
    }
  };

  const handleViewLeadDetails = (lead) => {
    setSelectedLead(lead);
    setShowViewModal(true);

    const invoiceData = JSON.parse(localStorage.getItem(`invoice-${lead.id}`));

    if (invoiceData) {
      setSelectedLead((prevLead) => ({
        ...prevLead,
        invoice: invoiceData
      }));
    }

    if (invoiceRef.current) {
      invoiceRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleCloseViewModal = () => {
    setShowViewModal(false);
    setSelectedLead(null);
  };

  const indexOfLastLead = currentPage * itemsPerPage;
  const indexOfFirstLead = indexOfLastLead - itemsPerPage;
  const currentLeads = filteredLeads.slice(indexOfFirstLead, indexOfLastLead);
  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage);

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
  };

  useEffect(() => {
    const calculatedTotal = paymentAmount + (paymentAmount * (tax / 100));
    setTotal(calculatedTotal);
  }, [paymentAmount, tax]);

  const handleInvoiceInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "paymentAmount") {
      setPaymentAmount(Number(value));
    } else if (name === "tax") {
      setTax(Number(value));
    } else if (name === "paymentDate") {
      setPaymentDate(value);
    } else if (name === "notes") {
      setNotes(value);
    }
  };

  const handleGenerateInvoice = async () => {
    const invoicedata = {
      student_name: selectedLeadForInvoice?.name,
      description: notes,
      amount: total,
      fee_date: paymentDate,
      inquiry_id: selectedLeadForInvoice?.id,
      user_id: selectedLeadForInvoice.id
    };

    if (!invoicedata || !invoicedata.inquiry_id) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Information',
        text: 'Student ID and Inquiry ID are required!',
      });
      return;
    }

    try {
      const response = await api.post(`${BASE_URL}createStudentFeeBYcounselors`, invoicedata);
      localStorage.setItem(`invoice-${selectedLeadForInvoice.id}`, JSON.stringify(invoicedata));
      Swal.fire({
        icon: 'success',
        title: 'Invoice Generated',
        text: 'The invoice has been created successfully!',
      });

      setShowInvoiceModal(false);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Invoice Failed',
        text: 'Something went wrong while generating the invoice.',
      });

      console.error("Error generating invoice:", error);
    }
  };

  const [getInvoice, setInvoicedata] = useState([]);

  const fetchInvoice = async (lead) => {
    try {
      const response = await api.get(`${BASE_URL}getInquiryByIdinvoice/${lead.id}`);
      setSelectedLeadForInvoice(response.data);
    } catch (error) {
      console.error("Error fetching invoice:", error);
    }
  };

  useEffect(() => {
    if (selectedLeadForInvoice) {
      console.log("Selected Lead Updated:", selectedLeadForInvoice);
    }
  }, [selectedLeadForInvoice]);

  useEffect(() => {
    fetchInvoice();
  }, []);

  const handleChangePaymentStatus = async (leadId, newStatus) => {
    try {
      const updatedLeads = leads.map((lead) =>
        lead.id === leadId ? { ...lead, payment_status: newStatus } : lead
      );
      setLeads(updatedLeads);

      const payload = {
        id: leadId,
        payment_status: newStatus,
      };

      const response = await api.patch(`${BASE_URL}fee/update-status`, payload);
      console.log("Payment status updated successfully:", response);
    } catch (error) {
      console.error("Error updating payment status:", error);
    }
  };

  const handleChangeLeadStatus = async (leadId, newStatus) => {
    try {
      const updatedLeads = leads.map((lead) =>
        lead.id === leadId ? { ...lead, lead_status: newStatus } : lead
      );
      setLeads(updatedLeads);

      const payload = {
        id: leadId,
        lead_status: newStatus,
      };

      const response = await api.patch(`${BASE_URL}fee/update-lesd-status`, payload);
      console.log("Lead status updated successfully:", response);
    } catch (error) {
      console.error("Error updating lead status:", error);
    }
  };

  const handleShowInvoiceModal = (lead) => {
    setSelectedLeadForInvoice(lead);
    setShowInvoiceModal(true);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'New':
        return 'bg-success text-white';
      case 'In Review':
        return 'bg-warning text-dark';
      case 'Converted to Lead':
        return 'bg-primary text-white';
      case 'Not Eligible':
        return 'bg-danger text-white';
      case 'Not Interested':
        return 'bg-secondary text-white';
      case 'Duplicate':
        return 'bg-warning text-white';
      default:
        return 'bg-success text-white';
    }
  };

  const handleStatusChangeFromTable = async (id, status) => {
    try {
      await api.patch(`${BASE_URL}update-lead-status-new`, {
        inquiry_id: id,
        new_leads: status,
      });

      toast.success("Status updated successfully!");
      fetchLeads();
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status.");
    }
  };

  const fetchConvertedLeads = async () => {
    try {
      const response = await api.get(`${BASE_URL}AllConvertedLeadsinquiries`);
      setConvertData(response.data);
      setFilteredData(response.data);
      setCurrentLeads(response.data);
    } catch (error) {
      console.error("Error fetching converted leads:", error);
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "New Lead":
        return "bg-success";
      case "Contacted":
        return "bg-warning text-dark";
      case "Follow-Up Needed":
        return "bg-primary";
      case "Visited Office":
        return "bg-orange text-white";
      case "Not Interested":
        return "bg-secondary";
      case "Next Intake Interested":
        return "bg-light-purple text-white";
      case "Registered":
        return "bg-purple text-white";
      case "Dropped":
        return "bg-danger";
      default:
        return "bg-dark";
    }
  };

  const handleConvertToStudent = (lead) => {
    setFormData({
      user_id: user_id,
      full_name: lead.full_name || "",
      father_name: "",
      admission_no: "",
      id_no: "",
      mobile_number: lead.phone_number || "",
      university_id: "",
      date_of_birth: "",
      gender: "",
      category: "",
      address: "",
      role: "student",
      password: "",
      email: lead.email || "",
    });
    setPhoto(null);
    setDocuments([]);
    setIsEditing(false);
    setErrorMessage("");
    setShowStudentModal(true);
  };

  const [formData, setFormData] = useState({
    user_id: user_id,
    full_name: "",
    father_name: "",
    identifying_name: "",
    mother_name: "",
    mobile_number: "",
    university_id: "",
    date_of_birth: "",
    gender: "",
    category: "",
    address: "",
    role: "student",
    password: "",
    email: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const formPayload = new FormData();
    for (const key in formData) {
      formPayload.append(key, formData[key]);
    }

    if (photo) formPayload.append("photo", photo);
    documents.forEach((doc) => formPayload.append("documents", doc));

    const url = isEditing
      ? `${BASE_URL}auth/updateStudent/${editStudentId}`
      : `${BASE_URL}auth/createStudent`;

    const method = isEditing ? "put" : "post";

    try {
      const res = await api({
        method,
        url,
        data: formPayload,
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data && res.data.message === "User already registered") {
        setErrorMessage("This user is already registered as a student.");
        return;
      }

      Swal.fire({
        icon: 'success',
        title: isEditing ? 'Student updated' : 'Student created',
        showConfirmButton: false,
        timer: 1500
      });

      resetForm();
      window.location.reload();
    } catch (err) {
      console.error("Error:", err);
      if (err.response && err.response.data && err.response.data.message) {
        setErrorMessage(err.response.data.message);
      } else {
        setErrorMessage("Submission failed. Please try again.");
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`${BASE_URL}universities`);
        setUniversities(response.data);
      } catch (error) {
        console.log("Error fetching universities:", error);
      }
    };
    fetchData();
  }, []);

  const resetForm = () => {
    setFormData({
      user_id: user_id,
      full_name: "",
      father_name: "",
      identifying_name: "",
      mother_name: "",
      mobile_number: "",
      university_id: "",
      date_of_birth: "",
      gender: "",
      category: "",
      address: "",
      role: "student",
      password: "",
      email: "",
    });
    setPhoto(null);
    setDocuments([]);
    setIsEditing(false);
    setEditStudentId(null);
    setShowStudentModal(false);
    setErrorMessage("");
  };

  useEffect(() => {
    if (formData.full_name && formData.date_of_birth) {
      const formattedDob = formData.date_of_birth.replace(/-/g, '');
      const generatedName = `${formData.full_name.trim().replace(/\s+/g, '_')}_${formattedDob}`;
      setFormData((prev) => ({
        ...prev,
        identifying_name: generatedName,
      }));
    }
  }, [formData.full_name, formData.date_of_birth]);

  return (
    <Container fluid className="py-3">
      {/* Filter Section */}
      <div className="mt-2">
        <h2>Leads Management</h2>
      </div>
      <div className="d-flex justify-content-between mb-3 pt-3">
        <div className="d-flex gap-2">
          <div>
            <InputGroup>
              <InputGroup.Text>
                <FaSearch />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Search leads..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </div>
        </div>
      </div>
      <Row className="mt-2 mb-3">
        <Col md="auto" className="ms-auto">
          <Button
            size="sm"
            variant="secondary"
            onClick={handleShowModal}
          >
            Add Lead
          </Button>
        </Col>
      </Row>

      {/* Leads Table */}
      <Table striped bordered hover className="text-center">
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact</th>
            <th>Assign Counselor</th>
            <th>Payment Status</th>
            <th>Status</th>
            <th>Lead Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentLeads?.length > 0 ? (
            currentLeads?.map((lead) => (
              <tr key={lead.id}>
                <td>{lead?.name}</td>
                <td>{lead?.phone}</td>
                <td>{lead?.counselor_name || "Unassigned"}</td>
                <td>
                  <Form.Control
                    as="select"
                    value={lead.payment_status || "select"}
                    onChange={(e) => handleChangePaymentStatus(lead.id, e.target.value)}
                    className="payment-status-dropdown"
                  >
                    <option value="select">Select</option>
                    <option value="paid">Paid</option>
                    <option value="unpaid">Unpaid</option>
                  </Form.Control>
                </td>
                <td>
                  <Form.Control
                    as="select"
                    style={{ fontWeight: "bold", fontSize: "14px", width: "auto", height: "30px", textAlign: "center", marginTop: "4px" }}
                    value={lead.lead_status || "New"}
                    onChange={(e) => handleChangeLeadStatus(lead.id, e.target.value)}
                    className={`${getStatusClass(lead.lead_status)} p-1`}
                  >
                    <option value="New">New</option>
                    <option value="In Review">In Review</option>
                    <option value="Converted to Lead">Converted to Lead</option>
                    <option value="Not Eligible">Not Eligible</option>
                    <option value="Not Interested">Not Interested</option>
                    <option value="Duplicate">Duplicate</option>
                  </Form.Control>
                </td>
                <td>
                  <span className={`badge ${getStatusBadgeColor(lead.new_leads == 0 ? "New Lead" : lead.new_leads)}`}>
                    {lead.new_leads == 0 ? "New Lead" : lead.new_leads || "N/A"}
                  </span>
                </td>
                <td className="d-flex">
                  <Form.Select
                    size="sm"
                    className="me-2"
                    style={{ width: "100px" }}
                    value={lead.lead_status || ""}
                    onChange={(e) => handleStatusChangeFromTable(lead.id, e.target.value)}
                  >
                    <option>Action</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Follow-Up Needed">Follow-Up Needed</option>
                    <option value="Visited Office">Visited Office</option>
                    <option value="Not Interested">Not Interested</option>
                    <option value="Next Intake Interested">Next Intake Interested</option>
                    <option value="Registered">Registered</option>
                    <option value="Dropped">Dropped</option>
                  </Form.Select>
                  {lead.new_leads === "Registered" && (
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="ms-2 me-2"
                      onClick={() => handleConvertToStudent(lead)}
                    >
                      <BsArrowRepeat className="me-1" /> Convert to Student
                    </Button>
                  )}
                  <Button
                    variant="outline-success"
                    size="sm"
                    className="me-2"
                    onClick={() => window.open(`https://wa.me/${lead.phone}`, '_blank')}
                  >
                    <BsWhatsapp className="me-1" /> WhatsApp
                  </Button>
                  <Button variant="outline-primary" size="sm" className="me-2" onClick={() => handleViewLeadDetails(lead)}>
                    <FaEye />
                  </Button>
                  <Button variant="outline-danger" size="sm" className="me-2" onClick={() => handleDeleteLead(lead.id)}>
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No leads found.</td>
            </tr>
          )}
        </tbody>
      </Table>
      {totalPages > 1 && (
        <nav className="mt-3">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
            </li>
            {[...Array(totalPages)].map((_, index) => (
              <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => setCurrentPage(index + 1)}>{index + 1}</button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
            </li>
          </ul>
        </nav>
      )}
      {selectedLeadForInvoice && (
        <InvoiceTemplate invoice={selectedLeadForInvoice} ref={invoiceRef} />
      )}

      {/* View Lead Details Modal */}
      <Modal show={showViewModal} onHide={handleCloseViewModal} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Lead Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedLead && (
            <div className="row">
              <div className="col-md-6">
                <p><strong>Name:</strong> {selectedLead?.name}</p>
                <p><strong>Email:</strong> {selectedLead?.email}</p>
                <p><strong>Phone:</strong> {selectedLead?.phone}</p>
                <p><strong>Counselor:</strong> {selectedLead?.counselor_name}</p>
                <p><strong>Follow-up Date:</strong> {selectedLead?.follow_up_date}</p>
                <p><strong>Source:</strong> {selectedLead?.source}</p>
                <p><strong>Date of Birth:</strong> {selectedLead?.dob}</p>
                <p><strong>Gender:</strong> {selectedLead?.gender}</p>
                <p><strong>Father's Name:</strong> {selectedLead?.father_name}</p>
                <p><strong>Mother's Name:</strong> {selectedLead?.mother_name}</p>
                <p><strong>Emergency Contact:</strong> {selectedLead?.emergency_contact}</p>
              </div>
              <div className="col-md-6">
                <p><strong>Lead Status:</strong> {selectedLead?.lead_status}</p>
                <p><strong>Payment Status:</strong> {selectedLead?.payment_status}</p>
                <p><strong>Preferred Countries:</strong> {selectedLead?.preferred_countries}</p>
                <p><strong>Education:</strong> {selectedLead?.education}</p>
                <p><strong>Intake:</strong> {selectedLead?.intake}</p>
                <p><strong>Course:</strong> {selectedLead?.course}</p>
                <p><strong>Address:</strong> {selectedLead?.address}</p>
                <p><strong>Work Experience:</strong> {selectedLead?.work_experience}</p>
                <p><strong>English Test Type:</strong> {selectedLead?.english_test_type}</p>
                <p><strong>English Test Score:</strong> {selectedLead?.english_test_score}</p>
                <p><strong>Visa Refusals:</strong> {selectedLead?.previous_visa_refusals}</p>
                <p><strong>Marital Status:</strong> {selectedLead?.marital_status}</p>
                <p><strong>Reference:</strong> {selectedLead?.reference}</p>
                <p><strong>Notes:</strong> {selectedLead?.notes}</p>
              </div>
              {selectedLead.invoice && (
                <div className="col-12 mt-3">
                  <h5>Invoice Details</h5>
                  <div className="row">
                    <div className="col-md-4">
                      <p><strong>Payment Amount:</strong> ${selectedLead.invoice.amount}</p>
                    </div>
                    <div className="col-md-4">
                      <p><strong>Total:</strong> ${(selectedLead.invoice.amount + (selectedLead.invoice.amount * (selectedLead.invoice.tax / 100))).toFixed(2)}</p>
                    </div>
                    <div className="col-md-4">
                      <p><strong>Fee Date:</strong> {selectedLead.invoice.fee_date}</p>
                    </div>
                    <div className="col-12">
                      <p><strong>Description:</strong> {selectedLead.invoice.description}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseViewModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add/Edit Lead Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{isEditMode ? "Edit Lead" : "Add New Lead"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSaveLead}>
            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter name"
                    name="name"
                    value={newLead.name}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter phone"
                    name="phone"
                    value={newLead.phone}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={newLead.email}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    type="date"
                    name="dob"
                    value={newLead.dob}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Gender</Form.Label>
                  <Form.Select
                    name="gender"
                    value={newLead.gender}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </Form.Select>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Follow-up Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="follow_up_date"
                    value={newLead.follow_up_date}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Father's Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter father's name"
                    name="father_name"
                    value={newLead.father_name}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Mother's Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter mother's name"
                    name="mother_name"
                    value={newLead.mother_name}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Emergency Contact</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter emergency contact"
                    name="emergency_contact"
                    value={newLead.emergency_contact}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Source</Form.Label>
                  <Form.Select
                    name="source"
                    value={newLead.source}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Source</option>
                    <option value="Website">Website</option>
                    <option value="Office Visit">Office Visit</option>
                    <option value="Phone Call">Phone Call</option>
                    <option value="Email Inquiry">Email Inquiry</option>
                    <option value="Social Media">Social Media</option>
                    <option value="Referral">Referral</option>
                    <option value="Advertisement">Advertisement</option>
                  </Form.Select>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    name="status"
                    value={newLead.status}
                    onChange={handleInputChange}
                  >
                    <option value="">Select status</option>
                    <option value="New">New</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Pending">Pending</option>
                    <option value="Converted">Converted</option>
                  </Form.Select>
                </Form.Group>
              </div>
              
              {showMoreFields && (
                <>
                  <div className="col-md-6">
                    <Form.Group className="mb-3">
                      <Form.Label>Education</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter education"
                        name="education"
                        value={newLead.education}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="mb-3">
                      <Form.Label>Intake</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter intake"
                        name="intake"
                        value={newLead.intake}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="mb-3">
                      <Form.Label>Course</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter course"
                        name="course"
                        value={newLead.course}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="mb-3">
                      <Form.Label>Budget</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter budget"
                        name="budget"
                        value={newLead.budget}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="mb-3">
                      <Form.Label>Passport</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter passport status"
                        name="passport"
                        value={newLead.passport}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="mb-3">
                      <Form.Label>IELTS/English Test</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter test score"
                        name="ielts"
                        value={newLead.ielts}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="mb-3">
                      <Form.Label>English Test Type</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter test type"
                        name="english_test_type"
                        value={newLead.english_test_type}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="mb-3">
                      <Form.Label>English Test Score</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter test score"
                        name="english_test_score"
                        value={newLead.english_test_score}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="mb-3">
                      <Form.Label>Work Experience</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter work experience"
                        name="work_experience"
                        value={newLead.work_experience}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="mb-3">
                      <Form.Label>Previous Visa Refusals</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter visa refusal details"
                        name="previous_visa_refusals"
                        value={newLead.previous_visa_refusals}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="mb-3">
                      <Form.Label>Marital Status</Form.Label>
                      <Form.Select
                        name="marital_status"
                        value={newLead.marital_status}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Marital Status</option>
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                        <option value="Divorced">Divorced</option>
                        <option value="Widowed">Widowed</option>
                      </Form.Select>
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="mb-3">
                      <Form.Label>Reference</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter reference"
                        name="reference"
                        value={newLead.reference}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-12">
                    <Form.Group className="mb-3">
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        placeholder="Enter address"
                        name="address"
                        value={newLead.address}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </div>
                </>
              )}
              
              <div className="col-md-12">
                <Form.Group className="mb-3">
                  <Form.Label>Preferred Countries</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter preferred countries (comma separated)"
                    name="preferred_countries"
                    value={newLead.preferred_countries}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </div>
              <div className="col-12">
                <Form.Group className="mb-3">
                  <Form.Label>Notes</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter notes"
                    name="notes"
                    value={newLead.notes}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <Button 
                variant="link" 
                onClick={() => setShowMoreFields(!showMoreFields)}
              >
                {showMoreFields ? 'Show Less Fields' : 'Show More Fields'}
              </Button>
              <div>
                <Button variant="danger" onClick={handleCloseModal} className="me-2">Cancel</Button>
                <Button variant="primary" type="submit">
                  {isEditMode ? "Update Lead" : "Add Lead"}
                </Button>
              </div>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Invoice Modal */}
      <Modal show={showInvoiceModal} onHide={() => setShowInvoiceModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Generate Invoice for {selectedLeadForInvoice?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Payment Amount</Form.Label>
              <Form.Control
                type="number"
                name="paymentAmount"
                value={paymentAmount}
                onChange={handleInvoiceInputChange}
                placeholder="Enter payment amount"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tax (%)</Form.Label>
              <Form.Control
                type="number"
                name="tax"
                value={tax}
                onChange={handleInvoiceInputChange}
                placeholder="Enter tax percentage"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Payment Date</Form.Label>
              <Form.Control
                type="date"
                name="paymentDate"
                value={paymentDate}
                onChange={handleInvoiceInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Additional Notes</Form.Label>
              <Form.Control
                as="textarea"
                name="notes"
                value={notes}
                onChange={handleInvoiceInputChange}
                placeholder="Enter notes"
              />
            </Form.Group>
            <div>
              <h5>Invoice Summary</h5>
              <p>Payment Amount: ${paymentAmount}</p>
              <p>Tax: {tax}%</p>
              <p>Total: ${total.toFixed(2)}</p>
            </div>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowInvoiceModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleGenerateInvoice}>
                Generate
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Student Form Modal */}
      <div
        className={`modal fade ${showStudentModal ? 'show d-block' : ''}`}
        id="studentFormModal"
        tabIndex={-1}
        aria-labelledby="studentFormModalLabel"
        aria-hidden={!showStudentModal}
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content student-form-container">
            <div className="modal-header">
              <h5 className="modal-title student-form-title" id="studentFormModalLabel">
                Student Information
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={resetForm}
              />
            </div>
            <div className="modal-body">
              {errorMessage && (
                <div className="alert alert-danger" role="alert">
                  {errorMessage}
                </div>
              )}
              <form className="student-form" onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="row">
                  <div className="col-md-4 student-form-group">
                    <label htmlFor="studentName" className="student-form-label">
                      Student Name
                    </label>
                    <input
                      type="text"
                      className="form-control student-form-input"
                      id="studentName"
                      placeholder="Enter student name"
                      value={formData.full_name}
                      onChange={(e) =>
                        setFormData({ ...formData, full_name: e.target.value, full_name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="col-md-4 student-form-group">
                    <label htmlFor="fatherName" className="student-form-label">
                      Father Name
                    </label>
                    <input
                      type="text"
                      className="form-control student-form-input"
                      id="fatherName"
                      placeholder="Enter father name"
                      value={formData.father_name}
                      onChange={(e) => setFormData({ ...formData, father_name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-md-4 student-form-group">
                    <label htmlFor="idNo" className="student-form-label">
                      Mother Name
                    </label>
                    <input
                      type="text"
                      className="form-control student-form-input"
                      id="idNo"
                      placeholder="Enter Mother Name"
                      value={formData.mother_name}
                      onChange={(e) => setFormData({ ...formData, mother_name: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 student-form-group">
                    <label htmlFor="studentName" className="student-form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control student-form-input"
                      id="email"
                      placeholder="Enter student's email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-md-6 student-form-group">
                    <label htmlFor="fatherName" className="student-form-label">
                      Enter Password
                    </label>
                    <input
                      type="password"
                      className="form-control student-form-input"
                      id="password"
                      placeholder="Enter Password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 student-form-group">
                    <label htmlFor="dob" className="student-form-label">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      className="form-control student-form-input"
                      id="dob"
                      value={formData.date_of_birth}
                      onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-md-6 student-form-group">
                    <label htmlFor="mobileNumber" className="student-form-label">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      className="form-control student-form-input"
                      id="mobileNumber"
                      placeholder="Enter mobile number"
                      value={formData.mobile_number}
                      onChange={(e) => setFormData({ ...formData, mobile_number: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 student-form-group">
                    <label htmlFor="university" className="student-form-label">
                      University Name
                    </label>
                    <select
                      className="form-select student-form-select"
                      id="university"
                      value={formData.university_id}
                      onChange={(e) => setFormData({ ...formData, university_id: e.target.value })}
                      required
                    >
                      <option value="" disabled>
                        Select university
                      </option>
                      {universities?.map((uni) => (
                        <option key={uni.id} value={uni.id}>
                          {uni.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6 student-form-group">
                    <label htmlFor="admissionNo" className="student-form-label">
                      Identifying Name
                    </label>
                    <input
                      type="text"
                      className="form-control student-form-input"
                      id="admissionNo"
                      placeholder="Enter admission number"
                      value={formData.identifying_name}
                      onChange={(e) => setFormData({ ...formData, identifying_name: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 student-form-group">
                    <label className="student-form-label">Gender</label>
                    <div>
                      {["Male", "Female", "Other"].map((g) => (
                        <div key={g} className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            value={g}
                            checked={formData.gender === g}
                            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                            required
                          />
                          <label className="form-check-label">{g}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="col-md-6 student-form-group">
                    <label htmlFor="category" className="student-form-label">
                      Category
                    </label>
                    <select
                      className="form-select student-form-select"
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      required
                    >
                      <option selected="" disabled="" value="">
                        Select category
                      </option>
                      <option value="General">General</option>
                      <option value="SC">SC</option>
                      <option value="ST">ST</option>
                      <option value="OBC">OBC</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 student-form-group">
                    <label htmlFor="address" className="student-form-label">
                      Address
                    </label>
                    <textarea
                      className="form-control student-form-input"
                      id="address"
                      rows={3}
                      placeholder="Enter complete address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="student-form-actions d-flex justify-content-end">
                  <div>
                    <button
                      type="button"
                      className="btn student-form-btn student-form-btn-secondary"
                      data-bs-dismiss="modal"
                      onClick={resetForm}
                    >
                      Cancel
                    </button>
                    {isEditing == true ? (
                      <button
                        type="submit"
                        className="btn student-form-btn btn-primary"
                      >
                        Update
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="btn student-form-btn btn-primary"
                      >
                        Submit
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* <Modal
              show={showModal}
              onHide={() => setShowModal(false)}
              backdrop="static"
              size="lg"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>Add Lead</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <AddLead />
              </Modal.Body>
            </Modal> */}
    </Container>
  );
};

export default LeadCounselor;