
import React, { useEffect, useState } from "react";
import { Table, Button, Form, Badge, Modal, Pagination, Row, Col,} from "react-bootstrap";
import BASE_URL from "../../Config";
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import TodaysInqiury from "./TodaysInqiury";
import Followup from "./Followup";
import api from "../../interceptors/axiosInterceptor";
import { hasPermission } from "../../authtication/permissionUtils";
const Inquiry = () => {
  // Sample inquiry data
  const [inquiries, setInquiries] = useState({});

  // State for modals
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [showFollowUpModal, setShowFollowUpModal] = useState(false);
  const [showInquiryDetailsModal, setInquiryDetailsModal] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [searchQuery, setSearchQuery]  = useState("");

  // State for new inquiry form data
  const [newInquiry, setNewInquiry] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    address: "",
    course: "Maths",
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
  const [councolerid,setCouncolerId]= useState("")
  
  useEffect(()=>{
    const is_id=localStorage.getItem("user_id")
    if(is_id){
      setCouncolerId(is_id)
    }
  },[])
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

   // Fetch inquiries when the component mounts
// 🟢 Function outside
const fetchInquiries = async () => {
  try {
    const response = await api.get(`inquiries`);
    const allInquiries = response.data;
    const userRole = localStorage.getItem("login");

    const filteredInquiries = userRole === "admin"
      ? allInquiries
      : allInquiries.filter(inquiry => inquiry.counselor_id == councolerid);

    setInquiries((prev) => ({
      ...prev,
      todayInquiries: filteredInquiries,
    }));

  } catch (error) {
    console.error("Error fetching inquiries:", error);
  }
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
      course_name: newInquiry.course,
      country: newInquiry.country,
      city: newInquiry.city,
      date_of_inquiry: newInquiry.dateOfInquiry,
      address: newInquiry.address,
      present_address: newInquiry.presentAddress,
      education_background: newInquiry.education,
      english_proficiency: newInquiry.englishProficiency,
      company_name: newInquiry.jobExperience.company,
      job_title: newInquiry.jobExperience.jobTitle,
      job_duration: newInquiry.jobExperience.duration,
      preferred_countries: newInquiry.preferredCountries,
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

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentInquiries = (inquiries.todayInquiries || []).slice(indexOfFirstItem, indexOfLastItem);
  
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Today's Inquiries</h2>
        <div>
          <Button variant="secondary" className="me-2" onClick={handleShowInquiryModal} style={{ border: "none" }} >
            Add Inquiry </Button>
        </div>
      </div>

      {/* Header Section */}
      <div className="d-flex justify-content-between mb-3">
        <Form.Control type="text"
          placeholder="Search inquiries" className="w-50"/>
      </div>

      {/* Today's Inquiries */}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>City</th>
            <th>Course</th>
            <th>Source</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentInquiries?.map((inq,index) => (
            <tr key={inq.id}>
              <td>{index+1}</td>
              <td>{inq.full_name}</td>
              <td>{inq.email}</td>
              <td>{inq.phone_number}</td>
              <td>{inq.city}</td>
              <td>{inq.course_name}</td>
              <td>{inq.source}</td>
              <td>
                <Button variant="info" size="sm"
                  onClick={() => handleViewDetail(inq.id)}>View </Button>
                <Button variant="danger"
                  size="sm"
                  onClick={() => handleDeleteInquiry(inq.id)}
                  className="ms-2">
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Followup/>

  
      {/* <Pagination>
        {Array.from({
          length: Math.ceil(inquiries.todayFollowUps.length / itemsPerPage),
        }).map((_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination> */}

  

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
                    <option value="studentVisa">Student Visa</option>
                    <option value="touristVisa">Visit Visa</option>
                    <option value="workVisa">Work Visa</option>
                    <option value="germanCourse">German Course</option>
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
                    <option value="Whatsapp">WhatsApp</option>
                    <option value="Facebook">Facebook</option>
                    <option value="Website">Website</option>
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
    required
  >
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
                    required/>
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
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email"
                    placeholder="Enter email"
                    name="email"
                    value={newInquiry.email}
                    onChange={handleInquiryInputChange}
                    required/>
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="name">
                  <Form.Label>Courses Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Course"
                    name="course"
                    value={newInquiry.course}
                    onChange={handleInquiryInputChange}
                    required/>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Group controlId="country">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter country"
                    name="country"
                    value={newInquiry.country}
                    onChange={handleInquiryInputChange}
                    required />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="city">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter city"
                    name="city"
                    value={newInquiry.city}
                    onChange={handleInquiryInputChange}
                    required/>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="dateOfInquiry">
                  <Form.Label>Date of Inquiry</Form.Label>
                  <Form.Control
                    type="date"
                    name="dateOfInquiry"
                    value={newInquiry.dateOfInquiry}
                    onChange={handleInquiryInputChange}
                    required/>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="address">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter address"
                    name="address"
                    value={newInquiry.address}
                    onChange={handleInquiryInputChange}
                    required/>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="presentAddress">
                  <Form.Label>Present Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter present address"
                    name="presentAddress"
                    value={newInquiry.presentAddress}
                    onChange={handleInquiryInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Educational Background */}
            <h5 className="mt-4 mb-3">Educational Background</h5>
            <Row className="mb-3">
              <Col md={12}>
                {["SSC", "HSC", "Bachelor", "Masters"].map((edu) => (
                  <Form.Check
                    inline
                    type="checkbox"
                    label={edu}
                    id={`edu-${edu.toLowerCase()}`}
                    key={edu}
                    checked={newInquiry.education.includes(edu)}
                    onChange={(e) =>
                      handleCheckboxChange("education", edu, e.target.checked)
                    }
                  />))}
              </Col>
            </Row>

            {/* English Proficiency */}
            <h5 className="mt-4 mb-3">English Proficiency</h5>
            <Row className="mb-3">
              <Col md={12}>
                {["Reading", "Writing", "Speaking", "Listening"].map(
                  (skill) => (
                    <Form.Check
                      inline
                      type="checkbox"
                      label={skill}
                      id={`skill-${skill.toLowerCase()}`}
                      key={skill}
                      checked={newInquiry.englishProficiency.includes(skill)}
                      onChange={(e) =>
                        handleCheckboxChange(
                          "englishProficiency",
                          skill,
                          e.target.checked)}/>
                  )
                )}
              </Col>
            </Row>

            {/* Job Experience */}
            <h5 className="mt-4 mb-3">Job Experience</h5>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Group controlId="company">
                  <Form.Label>Company</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Company Name"
                    value={newInquiry.jobExperience.company}
                    onChange={(e) =>
                      handleJobExpChange("company", e.target.value)
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
                    value={newInquiry.jobExperience.jobTitle}
                    onChange={(e) =>
                      handleJobExpChange("jobTitle", e.target.value)}/>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="duration">
                  <Form.Label>Duration</Form.Label>
                  <Form.Control  type="text"
                    placeholder="e.g., 2 years"
                    value={newInquiry.jobExperience.duration}
                    onChange={(e) =>
                      handleJobExpChange("duration", e.target.value)
                    }
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Preferred Countries */}
            <h5 className="mt-4 mb-3">Preferred Countries</h5>
            <Row className="mb-3">
              <Col md={12}>
                {["Germany", "Canada", "UK", "USA"].map((country) => (
                  <Form.Check
                    inline
                    type="checkbox"
                    label={country}
                    id={`country-${country.toLowerCase()}`}
                    key={country}
                    checked={newInquiry.preferredCountries.includes(country)}
                    onChange={(e) =>
                      handleCheckboxChange(
                        "preferredCountries",
                        country,
                        e.target.checked)
                    }
                  />
                ))}
              </Col>
            </Row>

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
              {selectedInquiry.education_background.join(", ")}
            </p>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={12}>
            <p>
              <strong>English Proficiency:</strong>{" "}
              {selectedInquiry.english_proficiency.join(", ")}
            </p>
          </Col>
        </Row>

        {selectedInquiry.job_title && (
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
              {selectedInquiry.preferred_countries.join(", ")}
            </p>
          </Col>
        </Row>
      </div>
    )}
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowInquiryModal(false)}>
      Close
    </Button>
  </Modal.Footer>
</Modal>



    </div>
  );
};

export default Inquiry;
