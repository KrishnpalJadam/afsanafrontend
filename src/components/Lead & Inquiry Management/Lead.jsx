
import React, { useEffect, useState } from "react";
import {
  Table,
  Form,
  Button,
  Badge,
  Row,
  Col,
  InputGroup,
  Modal,
} from "react-bootstrap";
import {
  BsUpload,
  BsWhatsapp,
  BsArrowRepeat,
  BsSearch,
} from "react-icons/bs";
import api from "../../interceptors/axiosInterceptor";
import BASE_URL from "../../Config";
import { toast } from "react-toastify";
import "./Lead.css";

const LeadTable = () => {
  const [convertData, setConvertData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [counselors, setCounselors] = useState([]);
  const [selectedCounselor, setSelectedCounselor] = useState(null);
  const [followUpDate, setFollowUpDate] = useState("");
  const [notes, setNotes] = useState("");

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState({});
  const [uploadInquiry, setUploadInquiry] = useState(null);
const [showStudentModal, setShowStudentModal] = useState(false);
const [isEditing, setIsEditing] = useState(false);   // ye pehle se hai
const [editStudentId, setEditStudentId] = useState(null);  // pehle se hai
const [photo, setPhoto] = useState(null);
const [documents, setDocuments] = useState([]);

  const [filters, setFilters] = useState({
    status: "",
    counselor: "",
    followUp: "",
    country: "",
    search: "",
  });

  // Load Converted Leads
  useEffect(() => {
    fetchConvertedLeads();
    fetchCounselors();
  }, []);

  const fetchConvertedLeads = async () => {
    try {
      const response = await api.get(`${BASE_URL}AllConvertedLeadsinquiries`);
      setConvertData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.error("Error fetching converted leads:", error);
    }
  };

  const handleStatusChangeFromTable = async (id, status) => {
    try {
      await api.patch(`${BASE_URL}update-lead-status-new`, {
        inquiry_id: id,
        new_leads: status,
      });
      toast.success("Status updated successfully!");
      fetchConvertedLeads();
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status.");
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

  // === FILTER FUNCTION ===
  useEffect(() => {
    let data = [...convertData];

    // Global Search
    if (filters.search) {
      const search = filters.search.toLowerCase();
      data = data.filter(
        (lead) =>
          lead.full_name.toLowerCase().includes(search) ||
          lead.email.toLowerCase().includes(search) ||
          lead.phone_number.includes(search)
      );
    }

    // Status
    if (filters.status) {
      data = data.filter((lead) => lead.new_leads === filters.status);
    }

    // Counselor
    if (filters.counselor) {
      data = data.filter((lead) => String(lead.counselor_id) === filters.counselor);
    }

    // Follow-Up Date
    // Follow-Up Date Filter
    if (filters.followUp) {
      const today = new Date();
      const dateOnly = (d) => new Date(d).toISOString().slice(0, 10);

      if (filters.followUp === "today") {
        data = data.filter((lead) => dateOnly(lead.follow_up_date) === dateOnly(today));
      } else if (filters.followUp === "thisWeek") {
        const endOfWeek = new Date();
        endOfWeek.setDate(today.getDate() + 7);
        data = data.filter(
          (lead) =>
            new Date(lead.follow_up_date) >= today &&
            new Date(lead.follow_up_date) <= endOfWeek
        );
      } else if (filters.followUp === "overdue") {
        data = data.filter(
          (lead) => new Date(lead.follow_up_date) < today
        );
      }
    }


    // Country
    if (filters.country) {
      data = data.filter((lead) => lead.country === filters.country);
    }

    setFilteredData(data);
  }, [filters, convertData]);


  // Load Counselors
  const fetchCounselors = async () => {
    try {
      const res = await api.get(`${BASE_URL}counselor`);
      setCounselors(res.data);
    } catch (err) {
      console.error("Error fetching counselors:", err);
    }
  };

  // Assign Inquiry API Call
  const handleAssignCounselor = async () => {
    if (!selectedCounselor || !followUpDate) {
      toast.error("Please select counselor & follow-up date.");
      return;
    }

    const payload = {
      inquiry_id: selectedInquiry.id,
      counselor_id: selectedCounselor.id,
      follow_up_date: followUpDate,
      notes: notes,
    };

    try {
      const res = await api.post(`${BASE_URL}assign-inquiry`, payload);
      if (res.status === 200) {
        toast.success("Counselor assigned successfully.");
        setShowAssignModal(false);
        fetchConvertedLeads();
        resetAssignModal();
      }
    } catch (err) {
      console.error("Error assigning counselor:", err);
      toast.error("Failed to assign counselor.");
    }
  };

  const resetAssignModal = () => {
    setSelectedInquiry(null);
    setSelectedCounselor(null);
    setFollowUpDate("");
    setNotes("");
  };

  const handleOpenAssignModal = (inquiry) => {
    setSelectedInquiry(inquiry);
    setShowAssignModal(true);
  };

  const handleCloseAssignModal = () => {
    setShowAssignModal(false);
    resetAssignModal();
  };

  const handleOpenUploadModal = (inquiry) => {
    setUploadInquiry(inquiry);
    setShowUploadModal(true);
    setSelectedFiles({});
  };
  const handleFileChange = (e, docType) => {
    setSelectedFiles({
      ...selectedFiles,
      [docType]: e.target.files[0],
    });
  };
  const handleUploadDocuments = async () => {
    if (!uploadInquiry) return;

    const formData = new FormData();
    formData.append("inquiry_id", uploadInquiry.id);
    Object.keys(selectedFiles).forEach((key) => {
      formData.append(key, selectedFiles[key]);
    });

    try {
      const res = await api.post(`${BASE_URL}upload-inquiry-documents`, formData);
      if (res.status === 200) {
        toast.success("Documents uploaded successfully.");
        setShowUploadModal(false);
      }
    } catch (err) {
      console.error("Error uploading documents:", err);
      toast.error("Failed to upload.");
    }
  };

  const [universities, setUniversities] = useState([]);

  // Fetch universities
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`${BASE_URL}universities`);
        setUniversities(response.data); // Ensure the data is passed correctly
      } catch (error) {
        console.log("Error fetching universities:", error);
      }
    };
    fetchData();
  }, []);
  const user_id = localStorage.getItem("user_id")

const handleConvertToStudent = (lead) => {
  setFormData({
    user_id: user_id,   // jo aapka user_id hai wo yahi rehne do
    full_name: lead.full_name || "",
    father_name: "",  // optional agar lead me nahi hai
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
  setShowStudentModal(true);  // Modal ko show karenge
};

   const [formData, setFormData] = useState({
      user_id: user_id,
      full_name: "",
      father_name: "",
      admission_no: "",
      id_no: "",
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

      alert(isEditing ? "Student updated" : "Student created");
      setFormData({
        user_id: user_id,
        full_name: "",
        father_name: "",
        admission_no: "",
        id_no: "",
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
      setShow(false);
      document.getElementById("studentFormModal").classList.remove("show");
      document.getElementById("studentFormModal").style.display = "none";

      // Reload students
      const { data } = await api.get(`${BASE_URL}auth/getAllStudents`);
      setStudentsData(data);
      window.location.reload(true);

    } catch (err) {
      console.error("Error:", err);
      alert("Submission failed");
    }
  };


  const resetForm = () => {
  setFormData({
    user_id: user_id,
    full_name: "",
    father_name: "",
    admission_no: "",
    id_no: "",
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
};

  return (
    <div className="p-2">
      <h3 className="mt-3">Lead Table</h3>

      {/* === FILTER SECTION === */}
      <div className="mb-3 p-3 bg-light rounded border">
        <Row className="g-2 align-items-end">
          <Col md={2}>
            <Form.Select
              size="sm"
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            >
              <option value="">All Statuses</option>
              <option>New Lead</option>
              <option>Contacted</option>
              <option>Follow-Up Needed</option>
              <option>Visited Office</option>
              <option>Not Interested</option>
              <option>Next Intake Interested</option>
              <option>Registered</option>
              <option>Dropped</option>
            </Form.Select>
          </Col>

          <Col md={2}>
            <Form.Select
              size="sm"
              value={filters.counselor}
              onChange={(e) => setFilters({ ...filters, counselor: e.target.value })}
            >
              <option value="">All Counselors</option>
              {[...new Set(convertData.map((d) => d.counselor_id))]
                .filter((id) => id !== 1)
                .map((id) => (
                  <option key={id} value={id}>
                    {convertData.find((c) => c.counselor_id === id)?.counselor_name || "N/A"}
                  </option>
                ))}
            </Form.Select>
          </Col>

          <Col md={2}>
            <Form.Select
              size="sm"
              value={filters.followUp}
              onChange={(e) => setFilters({ ...filters, followUp: e.target.value })}
            >
              <option value="">Follow-Up</option>
              <option value="today">Today</option>
              <option value="thisWeek">This Week</option>
              <option value="overdue">Overdue</option>

            </Form.Select>
          </Col>

          <Col md={2}>
            <Form.Select
              size="sm"
              value={filters.country}
              onChange={(e) => setFilters({ ...filters, country: e.target.value })}
            >
              <option value="">All Countries</option>
              {[...new Set(convertData.map((d) => d.country))].map(
                (c, i) =>
                  c && (
                    <option key={i} value={c}>
                      {c}
                    </option>
                  )
              )}
            </Form.Select>
          </Col>

          <Col md={3}>
            <InputGroup size="sm">
              <Form.Control
                placeholder="Search by name, email or phone"
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              />
              <InputGroup.Text>
                <BsSearch />
              </InputGroup.Text>
            </InputGroup>
          </Col>

          <Col md={1}>
            <Button
              size="sm"
              variant="secondary"
              onClick={() =>
                setFilters({
                  status: "",
                  counselor: "",
                  followUp: "",
                  country: "",
                  search: "",
                })
              }
            >
              Reset
            </Button>
          </Col>
        </Row>

      </div>

      {/* === TABLE SECTION === */}
      <div className="table-responsive">
        <Table bordered hover>
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>City</th>
              <th>Course</th>
              <th>Source</th>
              <th>Status</th>
              <th>Counselor</th>
              <th>Follow-Up</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((lead, index) => (
              <tr key={lead.id}>
                <td>{index + 1}</td>
                <td>{lead.full_name || "N/A"}</td>
                <td>{lead.email || "N/A"}</td>
                <td>{lead.phone_number || "N/A"}</td>
                <td>{lead.city || "N/A"}</td>
                <td>{lead.course_name || "N/A"}</td>
                <td>{lead.source || "N/A"}</td>
                <td>
                  <span className={`badge ${getStatusBadgeColor(lead.new_leads == 0 ? "New Lead" : lead.new_leads)}`}>
                    {lead.new_leads == 0 ? "New Lead" : lead.new_leads || "N/A"}
                  </span>
                </td>


                <td>
                  {lead.counselor_name ? (
                    lead.counselor_name
                  ) : (
                    <Button
                      variant="info"
                      size="sm"
                      className="me-2"
                      onClick={() => handleOpenAssignModal(lead)}
                    >
                      Assign Counselor
                    </Button>
                  )}
                </td>

                <td>{lead.follow_up_date?.slice(0, 10) || "N/A"}</td>
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
    onClick={() => handleConvertToStudent(lead)}  // <-- New Function
  >
    <BsArrowRepeat className="me-1" /> Convert to Student
  </Button>
)}


                  {/* <Button variant="outline-secondary" size="sm" className="me-2" onClick={() => handleOpenUploadModal(lead)}>
                    <BsUpload className="me-1" /> Upload Docs
                  </Button> */}


                  <Button
                    variant="outline-success"
                    size="sm"
                    onClick={() => window.open(`https://wa.me/${lead.phone_number}`, '_blank')}
                  >
                    <BsWhatsapp className="me-1" /> WhatsApp
                  </Button>



                </td>
              </tr>
            ))}

          </tbody>
        </Table>


        {/* Assign Modal */}
        <Modal show={showAssignModal} onHide={handleCloseAssignModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Assign Counselor</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedInquiry && (
              <>
                <p><strong>Inquiry:</strong> {selectedInquiry.full_name}</p>

                <Form.Group className="mb-3">
                  <Form.Label>Counselor *</Form.Label>
                  <Form.Select
                    value={selectedCounselor?.id || ""}
                    onChange={(e) => {
                      const id = e.target.value;
                      const counselor = counselors.find((c) => c.id.toString() === id);
                      setSelectedCounselor(counselor);
                    }}
                  >
                    <option value="">Select Counselor</option>
                    {counselors.map((c) => (
                      <option key={c.id} value={c.id}>{c.full_name}</option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Follow-Up Date *</Form.Label>
                  <Form.Control
                    type="date"
                    value={followUpDate}
                    onChange={(e) => setFollowUpDate(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Notes</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Write notes..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </Form.Group>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseAssignModal}>Cancel</Button>
            <Button variant="primary" onClick={handleAssignCounselor}>Assign</Button>
          </Modal.Footer>
        </Modal>
      </div>

      <Modal show={showUploadModal} onHide={() => setShowUploadModal(false)} centered>
        <Modal.Header closeButton><Modal.Title>Upload Documents</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Passport</Form.Label>
            <Form.Control type="file" onChange={(e) => handleFileChange(e, "passport")} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Certificates</Form.Label>
            <Form.Control type="file" onChange={(e) => handleFileChange(e, "certificates")} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>IELTS</Form.Label>
            <Form.Control type="file" onChange={(e) => handleFileChange(e, "ielts")} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>SOP</Form.Label>
            <Form.Control type="file" onChange={(e) => handleFileChange(e, "sop")} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUploadModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleUploadDocuments}>Upload</Button>
        </Modal.Footer>
      </Modal>
  <>
        {/* Modal */}
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
                <h5
                  className="modal-title student-form-title"
                  id="studentFormModalLabel"
                >
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
                <form className="student-form" onSubmit={handleSubmit} encType="multipart/form-data">
                  <div className="row">
                    <div className="col-md-6 student-form-group">
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
                      />
                    </div>
                    <div className="col-md-6 student-form-group">
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
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 student-form-group">
                      <label htmlFor="studentName" className="student-form-label">
                        Email
                      </label>
                      <input
                        type="text"
                        className="form-control student-form-input"
                        id="email"
                        placeholder="Enter student's email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <div className="col-md-6 student-form-group">
                      <label htmlFor="fatherName" className="student-form-label">
                        Enter Pasword
                      </label>
                      <input
                        type="text"
                        className="form-control student-form-input"
                        id="password"
                        placeholder="Enter Password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4 student-form-group">
                      <label htmlFor="admissionNo" className="student-form-label">
                        Admission No
                      </label>
                      <input
                        type="text"
                        className="form-control student-form-input"
                        id="admissionNo"
                        placeholder="Enter admission number"
                        value={formData.admission_no}
                        onChange={(e) => setFormData({ ...formData, admission_no: e.target.value })}
                      />
                    </div>
                    <div className="col-md-4 student-form-group">
                      <label htmlFor="idNo" className="student-form-label">
                        ID No.
                      </label>
                      <input
                        type="text"
                        className="form-control student-form-input"
                        id="idNo"
                        placeholder="Enter ID number"
                        value={formData.id_no}
                        onChange={(e) => setFormData({ ...formData, id_no: e.target.value })}
                      />
                    </div>
                    <div className="col-md-4 student-form-group">
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
                      <label htmlFor="dob" className="student-form-label">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        className="form-control student-form-input"
                        id="dob"
                        value={formData.date_of_birth}
                        onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
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
                      >
                        <option selected="" disabled="">
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
                      />
                    </div>
                  </div>
                  {/* <div className="row">
                    <div className="col-md-6 student-form-group">
                      <label htmlFor="photo" className="student-form-label">
                        Upload Photo
                      </label>
                      <input
                        type="file"
                        className="form-control student-form-input"
                        id="photo"
                        onChange={(e) => setPhoto(e.target.files[0])}
                      />
                    </div>
                    <div className="col-md-6 student-form-group">
                      <label htmlFor="documents" className="student-form-label">
                        Upload Documents
                      </label>
                      <input
                        type="file"
                        className="form-control student-form-input"
                        id="documents"
                        multiple
                        onChange={(e) => setDocuments(Array.from(e.target.files))}
                      />
                      <div className="form-text">
                        You can upload multiple documents
                      </div>
                    </div>
                  </div> */}
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
                      {isEditing == true ? <button
                        type="submit"
                        className="btn student-form-btn btn-primary"
                      >
                        update
                      </button> : <button
                        type="submit"
                        className="btn student-form-btn btn-primary"
                      >
                        Submit
                      </button>}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default LeadTable;

