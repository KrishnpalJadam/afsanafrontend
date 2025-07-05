import React, { useEffect, useState } from "react";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";


import api from "../../interceptors/axiosInterceptor";
import BASE_URL from "../../Config";

const Visaprocesing = () => {
    const [activeStep, setActiveStep] = useState("application");

    const steps = [
        { key: "application", label: "Application", icon: "bi-person" },
        { key: "interview", label: "Documents", icon: "bi-file-earmark" },
        { key: "visa", label: "Embassy Docs", icon: "bi-building" },
        { key: "fee", label: "Fee Payment", icon: "bi-credit-card" },
        { key: "zoom", label: "Interview", icon: "bi-camera-video" },
        { key: "conditionalOffer", label: "Offer Letter", icon: "bi-file-text" },
        { key: "tuitionFee", label: "Tuition Fee", icon: "bi-cash-stack" },
        { key: "mainofferletter", label: "Final Offer", icon: "bi-file-check" },
        { key: "embassydocument", label: "Embassy Docs", icon: "bi-folder" },
        { key: "embassyappoint", label: "Appointment", icon: "bi-calendar" },
        { key: "embassyinterview", label: "Interview", icon: "bi-mic" },
        { key: "visaStatus", label: "Visa Status", icon: "bi-passport" },

    ];
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        mobile_number: '',
        date_of_birth: '',
        id_no: '',
        applied_program: '',
        intake: '',
        assigned_counselor: '',
        registration_date: '',
        source: '',
    });



    useEffect(() => {
        const id = localStorage.getItem('student_id');
        api.get(`${BASE_URL}auth/getStudentById/${id}`)
            .then(response => {
                const data = response.data;
                setFormData({
                    full_name: data.full_name || '',
                    email: data.email || '',
                    mobile_number: data.mobile_number || '',
                    date_of_birth: data.date_of_birth ? data.date_of_birth.split('T')[0] : '',
                    id_no: data.id_no || '',
                    applied_program: '', // default if not in response
                    intake: '',
                    assigned_counselor: '',
                    registration_date: '',
                    source: '',
                });
            })
            .catch(err => console.error(err));
    }, []);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const renderStepper = () => (

        <Card className="mb-4 border-0 shadow-sm">
            <h2 className=" text-center mt-3" >Visa Processing CRM Workflow</h2>

            <Card.Body className="p-3">

                <div className="d-flex justify-content-between align-items-center overflow-auto py-2">

                    {steps.map((step, index) => {
                        const isActive = activeStep === step.key;
                        const isCompleted =
                            steps.findIndex((s) => s.key === activeStep) > index;

                        return (
                            <div
                                className="text-center position-relative flex-shrink-0"
                                style={{ minWidth: "80px" }}
                                key={step.key}
                            >
                                {/* Connector line */}
                                {index !== 0 && (
                                    <div
                                        className="position-absolute top-50 start-0 translate-middle-y w-100"
                                        style={{
                                            height: "2px",

                                            zIndex: 0,
                                        }}
                                    />
                                )}

                                {/* Step circle */}
                                <div
                                    className={`rounded-circle d-flex align-items-center justify-content-center mx-auto ${isActive
                                        ? "bg-primary"
                                        : isCompleted
                                            ? "bg-success"
                                            : "bg-light"
                                        }`}
                                    style={{
                                        width: "36px",
                                        height: "36px",
                                        color: isActive || isCompleted ? "white" : "#858796",
                                        zIndex: 1,
                                        cursor: "pointer",
                                        border: isActive ? "2px solid #4e73df" : "none",
                                        boxShadow: isActive
                                            ? "0 0 0 4px rgba(78, 115, 223, 0.25)"
                                            : "none",
                                        transition: "all 0.3s ease",
                                    }}
                                    onClick={() => setActiveStep(step.key)}
                                    role="button"
                                >
                                    {isCompleted ? (
                                        <i className="bi bi-check-lg fs-6"></i>
                                    ) : (
                                        <i className={`bi ${step.icon} fs-6`}></i>
                                    )}
                                </div>

                                {/* Step label */}
                                <div
                                    className={`mt-2 small text-wrap ${isActive ? "text-primary fw-bold" : "text-muted"
                                        }`}
                                    style={{ fontSize: "0.75rem" }}
                                >
                                    {step.label}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Card.Body>
        </Card>
    );

    const renderApplicationSection = () => (
        <Card className="border-0 shadow-sm">
            <Card.Header className="bg-primary text-white py-3">
                <h5 className="mb-0">Student Application Details</h5>
            </Card.Header>
            <Card.Body>
                <Form>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold">Full Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name='full_name'
                                    onChange={handleChange}
                                    value={formData.full_name}
                                    placeholder="Enter full name"
                                    className="border-0 border-bottom rounded-0"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold">Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name='email'
                                    onChange={handleChange}
                                    value={formData.email}
                                    placeholder="Enter email address"
                                    className="border-0 border-bottom rounded-0"
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold">Phone</Form.Label>
                                <Form.Control
                                    type="text"
                                    name='mobile_number'
                                    onChange={handleChange}
                                    value={formData.mobile_number}
                                    placeholder="Enter phone number"
                                    className="border-0 border-bottom rounded-0"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold">Date of Birth</Form.Label>
                                <Form.Control
                                    type="date"
                                    name='date_of_birth'
                                    onChange={handleChange}
                                    value={formData.date_of_birth}
                                    className="border-0 border-bottom rounded-0"
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold">Passport No / NID</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter passport number or NID"
                                    className="border-0 border-bottom rounded-0"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold">Applied Program</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter program name"
                                    className="border-0 border-bottom rounded-0"
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold">Intake</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter intake session"
                                    className="border-0 border-bottom rounded-0"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold">Assigned Counselor</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter counselor name"
                                    className="border-0 border-bottom rounded-0"
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold">Registration Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    className="border-0 border-bottom rounded-0"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold">Source</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter source of registration"
                                    className="border-0 border-bottom rounded-0"
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <div className="d-flex justify-content-end mt-4">
                        <Button
                            variant="primary"
                            className="px-4 py-2 rounded-pill shadow-sm"
                        >
                            <i className="bi bi-save me-2"></i>Save Details
                        </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );

    const renderInterviewSection = () => (
        <Card className="border-0 shadow-sm">
            <Card.Header className="bg-primary text-white py-3">
                <h5 className="mb-0">Document Upload</h5>
            </Card.Header>
            <Card.Body>
                <Form>
                    <Row>
                        {[
                            "Passport",
                            "Photo",
                            "SSC Certificate",
                            "HSC Transcript",
                            "Bachelor's Certificate",
                            "IELTS/English Certificate",
                            "CV",
                            "SOP",
                            "Medical Certificate",
                            "Other Documents",
                        ].map((label, index) => (
                            <Col md={6} key={index}>
                                <Form.Group className="mb-4">
                                    <Form.Label className="fw-bold d-flex align-items-center">
                                        <i className="bi bi-file-earmark-arrow-up me-2 text-primary"></i>
                                        {label}
                                    </Form.Label>
                                    <div className="d-flex align-items-center">
                                        <Form.Control
                                            type="file"
                                            className="border-0 border-bottom rounded-0"
                                        />
                                        <Button
                                            variant="outline-primary"
                                            size="sm"
                                            className="ms-2 rounded-circle"
                                        >
                                            <i className="bi bi-eye"></i>
                                        </Button>
                                    </div>
                                </Form.Group>
                            </Col>
                        ))}
                    </Row>

                    <div className="d-flex justify-content-end mt-4">
                        <Button
                            variant="primary"
                            className="px-4 py-2 rounded-pill shadow-sm"
                        >
                            <i className="bi bi-upload me-2"></i>Upload Documents
                        </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );

    const renderVisaProcessSection = () => (
        <Card className="border-0 shadow-sm">
            <Card.Header className="bg-primary text-white py-3">
                <h5 className="mb-0">Embassy Documents Submission</h5>
            </Card.Header>
            <Card.Body>
                <Form>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold">University Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter university name"
                                    className="border-0 border-bottom rounded-0"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold">Program</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter program name"
                                    className="border-0 border-bottom rounded-0"
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold">Submission Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    className="border-0 border-bottom rounded-0"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold">Method</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Online/Offline"
                                    className="border-0 border-bottom rounded-0"
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold">Proof of Submission</Form.Label>
                                <Form.Control
                                    type="file"
                                    className="border-0 border-bottom rounded-0"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold">Application ID</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter application ID"
                                    className="border-0 border-bottom rounded-0"
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold">Status</Form.Label>
                                <Form.Select className="border-0 border-bottom rounded-0">
                                    <option>Select status</option>
                                    <option>Pending</option>
                                    <option>Submitted</option>
                                    <option>Approved</option>
                                    <option>Rejected</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>

                    <div className="d-flex justify-content-end mt-4">
                        <Button
                            variant="primary"
                            className="px-4 py-2 rounded-pill shadow-sm"
                        >
                            <i className="bi bi-send me-2"></i>Submit to Embassy
                        </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );

    const renderApplicationSections = () => (
        <Card className="border-0 shadow-sm">
            <Card.Header className="bg-primary text-white py-3">
                <h5 className="mb-0">Application Fee Payment</h5>
            </Card.Header>
            <Card.Body>
                <Form>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold">Amount</Form.Label>
                                <div className="input-group">
                                    <span className="input-group-text bg-light border-0">$</span>
                                    <Form.Control
                                        type="number"
                                        placeholder="Enter amount paid"
                                        className="border-0 border-bottom rounded-0"
                                    />
                                </div>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold">Payment Method</Form.Label>
                                <Form.Select className="border-0 border-bottom rounded-0">
                                    <option>Select method</option>
                                    <option>Cash</option>
                                    <option>Online</option>
                                    <option>Bank Transfer</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold">Payment Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    className="border-0 border-bottom rounded-0"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold">Proof of Payment</Form.Label>
                                <Form.Control
                                    type="file"
                                    className="border-0 border-bottom rounded-0"
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold">Status</Form.Label>
                                <Form.Select className="border-0 border-bottom rounded-0">
                                    <option>Select status</option>
                                    <option>Paid</option>
                                    <option>Pending</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>

                    <div className="d-flex justify-content-end mt-4">
                        <Button
                            variant="primary"
                            className="px-4 py-2 rounded-pill shadow-sm"
                        >
                            <i className="bi bi-credit-card me-2"></i>Process Payment
                        </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );

    const renderZoomInterviewForm = () => (
        <Card className="border-0 shadow-sm">
            <Card.Header className="bg-primary text-white py-3">
                <h5 className="mb-0">University Interview Details</h5>
            </Card.Header>
            <Card.Body>
                <Form>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold">Date / Time</Form.Label>
                                <Form.Control
                                    type="datetime-local"
                                    className="border-0 border-bottom rounded-0"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold">Platform</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="e.g., Zoom, Google Meet"
                                    className="border-0 border-bottom rounded-0"
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold">Status</Form.Label>
                                <Form.Select className="border-0 border-bottom rounded-0">
                                    <option>Select status</option>
                                    <option>Scheduled</option>
                                    <option>Completed</option>
                                    <option>Pending</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold">Interviewer</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter interviewer's name"
                                    className="border-0 border-bottom rounded-0"
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={12}>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold">Recording</Form.Label>
                                <Form.Control
                                    type="file"
                                    className="border-0 border-bottom rounded-0"
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <div className="d-flex justify-content-end mt-4">
                        <Button
                            variant="primary"
                            className="px-4 py-2 rounded-pill shadow-sm"
                        >
                            <i className="bi bi-calendar-check me-2"></i>Schedule Interview
                        </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );

    const renderConditionalOfferLetterForm = () => (
        <Card className="border-0 shadow-sm">
            <Card.Header className="bg-primary text-white py-3">
                <h5 className="mb-0">Conditional Offer Letter</h5>
            </Card.Header>
            <Card.Body>
                <Form>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold">Offer Letter Upload</Form.Label>
                                <Form.Control
                                    type="file"
                                    className="border-0 border-bottom rounded-0"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold">Issue Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    className="border-0 border-bottom rounded-0"
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={12}>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold">Conditions</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Enter any conditions"
                                    className="border-0 border-bottom rounded-0"
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold">Status</Form.Label>
                                <Form.Select className="border-0 border-bottom rounded-0">
                                    <option>Select status</option>
                                    <option>Pending</option>
                                    <option>Approved</option>
                                    <option>Declined</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>

                    <div className="d-flex justify-content-end mt-4">
                        <Button
                            variant="primary"
                            className="px-4 py-2 rounded-pill shadow-sm"
                        >
                            <i className="bi bi-file-earmark-text me-2"></i>Save Offer Details
                        </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );

    const renderTuitionFeePaymentForm = () => (
        <Card className="border-0 shadow-sm">
            <Card.Header className="bg-primary text-white py-3">
                <h5 className="mb-0">Tuition Fee Payment</h5>
            </Card.Header>
            <Card.Body>
                <Form>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold">Amount</Form.Label>
                                <div className="input-group">
                                    <span className="input-group-text bg-light border-0">$</span>
                                    <Form.Control
                                        type="number"
                                        placeholder="Enter tuition fee amount"
                                        className="border-0 border-bottom rounded-0"
                                    />
                                </div>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold">Payment Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    className="border-0 border-bottom rounded-0"
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold">Proof of Payment</Form.Label>
                                <Form.Control
                                    type="file"
                                    className="border-0 border-bottom rounded-0"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold">Status</Form.Label>
                                <Form.Select className="border-0 border-bottom rounded-0">
                                    <option>Select status</option>
                                    <option>Paid</option>
                                    <option>Pending</option>
                                    <option>Partial</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={12}>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold">Comments</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={2}
                                    placeholder="Enter any remarks or notes"
                                    className="border-0 border-bottom rounded-0"
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <div className="d-flex justify-content-end mt-4">
                        <Button
                            variant="primary"
                            className="px-4 py-2 rounded-pill shadow-sm"
                        >
                            <i className="bi bi-cash-stack me-2"></i>Record Payment
                        </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );

    const renderMainOfferLetterForm = () => (
        <Card className="border-0 shadow-sm">
            <Card.Header className="bg-primary text-white py-3">
                <h5 className="mb-0">Main Offer Letter</h5>
            </Card.Header>
            <Card.Body>
                <Form>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold">Offer Letter Upload</Form.Label>
                                <Form.Control
                                    type="file"
                                    className="border-0 border-bottom rounded-0"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold">Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    className="border-0 border-bottom rounded-0"
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold">Status</Form.Label>
                                <Form.Select className="border-0 border-bottom rounded-0">
                                    <option>Select status</option>
                                    <option>Issued</option>
                                    <option>Pending</option>
                                    <option>Rejected</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>

                    <div className="d-flex justify-content-end mt-4">
                        <Button
                            variant="primary"
                            className="px-4 py-2 rounded-pill shadow-sm"
                        >
                            <i className="bi bi-file-earmark-check me-2"></i>Save Offer Letter
                        </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );

    const renderEmbassyDocumentPreparationForm = () => {
        const documentLabels = [
            "Final Offer",
            "Motivation Letter",
            "Europass CV",
            "Bank Statement",
            "Birth Certificate",
            "Tax Proof",
            "Business Documents",
            "CA Certificate",
            "Health/Travel Insurance",
            "Residence Form",
            "Flight Booking",
            "Police Clearance",
            "Family Certificate",
            "Application Form",
        ];

        return (
            <Card className="border-0 shadow-sm">
                <Card.Header className="bg-primary text-white py-3">
                    <h5 className="mb-0">Embassy Document Preparation</h5>
                </Card.Header>
                <Card.Body>
                    <Form>
                        <Row>
                            {documentLabels.map((label, idx) => (
                                <Col md={6} key={idx}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-bold d-flex align-items-center">
                                            <i className="bi bi-file-earmark me-2 text-primary"></i>
                                            {label}
                                        </Form.Label>
                                        <Form.Control
                                            type="file"
                                            className="border-0 border-bottom rounded-0"
                                        />
                                    </Form.Group>
                                </Col>
                            ))}
                        </Row>

                        <div className="d-flex justify-content-end mt-4">
                            <Button
                                variant="primary"
                                className="px-4 py-2 rounded-pill shadow-sm"
                            >
                                <i className="bi bi-folder-check me-2"></i>Complete
                                Documentation
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        );
    };

    const renderEmbassyAppointmentForm = () => (
        <Card className="border-0 shadow-sm">
            <Card.Header className="bg-primary text-white py-3">
                <h5 className="mb-0">Embassy Appointment</h5>
            </Card.Header>
            <Card.Body>
                <Form>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold">Location</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter embassy location"
                                    className="border-0 border-bottom rounded-0"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold">Date / Time</Form.Label>
                                <Form.Control
                                    type="datetime-local"
                                    className="border-0 border-bottom rounded-0"
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold">Appointment Letter</Form.Label>
                                <Form.Control
                                    type="file"
                                    className="border-0 border-bottom rounded-0"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold">Status</Form.Label>
                                <Form.Select className="border-0 border-bottom rounded-0">
                                    <option>Select status</option>
                                    <option>Scheduled</option>
                                    <option>Completed</option>
                                    <option>Cancelled</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>

                    <div className="d-flex justify-content-end mt-4">
                        <Button
                            variant="primary"
                            className="px-4 py-2 rounded-pill shadow-sm"
                        >
                            <i className="bi bi-calendar-plus me-2"></i>Schedule Appointment
                        </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );

    const renderEmbassyInterviewResultForm = () => (
        <Card className="border-0 shadow-sm">
            <Card.Header className="bg-primary text-white py-3">
                <h5 className="mb-0">Embassy Interview Result</h5>
            </Card.Header>
            <Card.Body>
                <Form>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold">Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    className="border-0 border-bottom rounded-0"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold">Result</Form.Label>
                                <Form.Select className="border-0 border-bottom rounded-0">
                                    <option>Select result</option>
                                    <option>Accepted</option>
                                    <option>Rejected</option>
                                    <option>Pending</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={12}>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold">Feedback</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Enter feedback from the embassy"
                                    className="border-0 border-bottom rounded-0"
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={12}>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold">Summary</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Summary of the interview"
                                    className="border-0 border-bottom rounded-0"
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <div className="d-flex justify-content-end mt-4">
                        <Button
                            variant="primary"
                            className="px-4 py-2 rounded-pill shadow-sm"
                        >
                            <i className="bi bi-clipboard-check me-2"></i>Record Results
                        </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );

    const renderVisaStatusForm = () => (
        <Card className="border-0 shadow-sm">
            <Card.Header className="bg-primary text-white py-3">
                <h5 className="mb-0">Visa Status</h5>
            </Card.Header>
            <Card.Body>
                <Form>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold">Status</Form.Label>
                                <Form.Select className="border-0 border-bottom rounded-0">
                                    <option>Select status</option>
                                    <option>Approved</option>
                                    <option>Rejected</option>
                                    <option>Pending</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold">Decision Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    className="border-0 border-bottom rounded-0"
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold">Visa Sticker Upload</Form.Label>
                                <Form.Control
                                    type="file"
                                    className="border-0 border-bottom rounded-0"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold">Appeal Status</Form.Label>
                                <Form.Select className="border-0 border-bottom rounded-0">
                                    <option>Select appeal status</option>
                                    <option>Appealed</option>
                                    <option>Not Appealed</option>
                                    <option>Under Review</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={12}>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold">Rejection Reason</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={2}
                                    placeholder="Enter reason if rejected"
                                    className="border-0 border-bottom rounded-0"
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <div className="d-flex justify-content-end mt-4">
                        <Button
                            variant="primary"
                            className="px-4 py-2 rounded-pill shadow-sm"
                        >
                            <i className="bi bi-passport me-2"></i>Update Visa Status
                        </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );



    return (
        <div className="py-4 p-5" style={{ backgroundColor: "#f8f9fc" }}>
            {renderStepper()}

            {activeStep === "application" && renderApplicationSection()}
            {activeStep === "interview" && renderInterviewSection()}
            {activeStep === "visa" && renderVisaProcessSection()}
            {activeStep === "fee" && renderApplicationSections()}
            {activeStep === "zoom" && renderZoomInterviewForm()}
            {activeStep === "conditionalOffer" && renderConditionalOfferLetterForm()}
            {activeStep === "tuitionFee" && renderTuitionFeePaymentForm()}
            {activeStep === "mainofferletter" && renderMainOfferLetterForm()}
            {activeStep === "embassydocument" &&
                renderEmbassyDocumentPreparationForm()}
            {activeStep === "embassyappoint" && renderEmbassyAppointmentForm()}
            {activeStep === "embassyinterview" && renderEmbassyInterviewResultForm()}
            {activeStep === "visaStatus" && renderVisaStatusForm()}

        </div>
    );
};

export default Visaprocesing;
