
import React, { useEffect, useState } from "react";

import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Image,
  Modal,
  Tab,
  Tabs,
} from "react-bootstrap";
import api from "../../interceptors/axiosInterceptor";
import BASE_URL from "../../Config";
import { hasPermission } from "../../authtication/permissionUtils";
import { Link, useNavigate } from "react-router-dom";
import { FaAnglesRight } from "react-icons/fa6";
import StudentProfile from "./StudentProfile";

const Profile = () => {
  const [student, setStudent] = useState(null);
  const navigate = useNavigate()
  useEffect(() => {
    const id = localStorage.getItem('student_id')
    api.get(`${BASE_URL}auth/getStudentById/${id}`)
      .then(response => {
        setStudent(response.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);


   const studentData = {
    basicInfo: {
      id: 'STU2023001',
      user_id: 'USER789',
      processor_id: 'PROC456',
      full_name: 'Rahul Sharma',
      father_name: 'Sanjay Sharma',
      mother_name: 'Priya Sharma',
      mobile: '9876543210',
      university_id: 'UNIV2023789',
      dob: '2000-05-15',
      gender: 'Male',
      category: 'General',
      city: 'Mumbai',
      address: '202, Sunshine Apartments, Andheri East',
      identifying_name: 'RahulS',
      role: 'Student',
      created_at: '2023-01-10T10:30',
      updated_at: '2023-06-15T14:45'
    },
    applicantInfo: {
      applicant_id: 'APP789456',
      applicant_dob: '2000-05-15',
      applicant_name: 'Rahul Sharma',
      applicant_contact_name: 'Sanjay Sharma',
      applicant_phone: '9876543210',
      applicant_email: 'rahul.sharma@example.com',
      applicant_tin_no: 'TIN789456123',
      applicant_present_address: '202, Sunshine Apartments, Andheri East',
      applicant_marital_status: 'Single',
      loan_amount: 50000.00,
      loan_applied: 1
    },
    parentInfo: {
      parent_name: 'Sanjay Sharma',
      academics: 'B.Tech in Computer Science with 8.5 CGPA',
      tests: 'IELTS: 7.5, GRE: 310',
      work_experience: '6 months internship at Tech Solutions Pvt Ltd',
      criminal_record: 'None',
      travel_history: 'Visited Singapore in 2019',
      passport_no: 'P78945612',
      passport_expiry: '2027-08-30'
    },
    financeInfo: {
      sponsor_name: 'Sanjay Sharma',
      sponsor_relationship: 'Father',
      sponsor_income: 1200000,
      sponsor_assets: 3500000,
      bank_balance: '₹2,50,000',
      sponsor_tin: 'TIN123456789',
      sponsor_email: 'sanjay.sharma@example.com',
      relation: 'Father',
      occupation: 'Business',
      designation: 'Proprietor',
      experience: '15 years',
      company_status: 'Private',
      business_reg_no: 'REG789456123',
      no_of_employees: 12,
      office_address: '303, Business Plaza, Andheri West',
      office_phone: '022-28765432',
      business_type: 'IT Services',
      annual_income: 1500000,
      net_worth: 5000000,
      lic_no: 'LIC789456',
      payment_mode: 'Bank Transfer',
      bank_details: 'HDFC Bank, A/C: 1234567890, IFSC: HDFC0000123',
      note: 'All documents verified and approved'
    }
  };

    const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Function to handle opening the profile modal
  const handleOpenProfileModal = (student) => {
    setSelectedStudent(student);
    setShowProfileModal(true);
  };

  // Function to close the modal
  const handleCloseProfileModal = () => {
    setShowProfileModal(false);
    setSelectedStudent(null);
  };


  return (
    <Container className="mt-4">
      <Card className="shadow mb-4">
        <Card.Body>
          <Row>
           
            <Col md={12} className="text-center mt-3">
              <h3>{student?.full_name}</h3>
              <p>Email: {student?.email}</p>
              <p>Phone: {student?.mobile_number}</p>
              {/* <Button variant="outline-primary" size="sm" disabled={!hasPermission("Student Details", "add")} onClick={() => { navigate("/profile") }}>
                Edit Profile
              </Button> */}
           <Button 
                  variant="outline-primary" 
                  size="sm"
                  onClick={() => handleOpenProfileModal(student)}
                >
                  Student Profile
                </Button>
            </Col>
             <Modal show={showProfileModal} onHide={handleCloseProfileModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
           
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <StudentProfile/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseProfileModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
          </Row>
        </Card.Body>
      </Card>
      <Tabs defaultActiveKey="personal" className="mb-4">
        {/* Personal Info */}
        <Tab eventKey="personal" title="Personal Info">
          <Card className="mb-4">
            <Card.Body>
              <Row>
                <Col md={6}>
                  <strong>Id no:</strong> {student?.id_no}
                </Col>
                <Col md={6}>
                  <strong>Admision No.:</strong> {student?.admission_no}
                </Col>
                <Col md={6} className="mt-2">
                  <strong>Date of Birth:</strong> {student?.date_of_birth}
                </Col>
                <Col md={6} className="mt-2">
                  <strong>Gender:</strong> {student?.gender}
                </Col>
              </Row>
              <Row className="mt-2">
                <Col md={6}>
                  <strong>Father Name:</strong> {student?.father_name}
                </Col>
                <Col md={6}>
                  <strong>Address:</strong> {student?.address}
                </Col>
              </Row>
              <Row className="mt-2">
                <Col md={6}>
                  <strong>Category:</strong> {student?.category}
                </Col>
                <Col md={6}>
                  <strong>DOB:</strong> {student?.date_of_birth}
                </Col>
              </Row>
              <Row className="mt-2">
                <Col md={6}>
                  <strong>Alternate Email:</strong> {student?.email}
                </Col>
                <Col md={6}>
                  <strong>Emergency Contact:</strong> {student?.mobile_number}
                </Col>
              </Row>
            </Card.Body>
          </Card>
  <Card className="mb-4">
        <Card.Header as="h2" className="bg-light">Student Basic Information</Card.Header>
        <Card.Body>
          <Row className="mb-3">
            <Col md={4}>
              <p><strong>ID:</strong> {studentData.basicInfo.id}</p>
            </Col>
            <Col md={4}>
              <p><strong>User ID:</strong> {studentData.basicInfo.user_id}</p>
            </Col>
            <Col md={4}>
              <p><strong>Processor ID:</strong> {studentData.basicInfo.processor_id}</p>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={4}>
              <p><strong>Full Name:</strong> {studentData.basicInfo.full_name}</p>
            </Col>
            <Col md={4}>
              <p><strong>Father Name:</strong> {studentData.basicInfo.father_name}</p>
            </Col>
            <Col md={4}>
              <p><strong>Mother Name:</strong> {studentData.basicInfo.mother_name}</p>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={4}>
              <p><strong>Mobile:</strong> {studentData.basicInfo.mobile}</p>
            </Col>
            <Col md={4}>
              <p><strong>University ID:</strong> {studentData.basicInfo.university_id}</p>
            </Col>
            <Col md={4}>
              <p><strong>Date of Birth:</strong> {studentData.basicInfo.dob}</p>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={4}>
              <p><strong>Gender:</strong> {studentData.basicInfo.gender}</p>
            </Col>
            <Col md={4}>
              <p><strong>Category:</strong> {studentData.basicInfo.category}</p>
            </Col>
            <Col md={4}>
              <p><strong>City:</strong> {studentData.basicInfo.city}</p>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={4}>
              <p><strong>Address:</strong> {studentData.basicInfo.address}</p>
            </Col>
            <Col md={4}>
              <p><strong>Identifying Name:</strong> {studentData.basicInfo.identifying_name}</p>
            </Col>
            <Col md={4}>
              <p><strong>Role:</strong> {studentData.basicInfo.role}</p>
            </Col>
          </Row>

          <Row>
            <Col md={4}>
              <p><strong>Created At:</strong> {studentData.basicInfo.created_at}</p>
            </Col>
            <Col md={4}>
              <p><strong>Updated At:</strong> {studentData.basicInfo.updated_at}</p>
            </Col>
          </Row>
        </Card.Body>
      </Card>

       <Card className="mb-4">
              <Card.Header as="h2" className="bg-light">Applicant Information</Card.Header>
              <Card.Body>
                <Row className="mb-3">
                  <Col md={4}>
                    <p><strong>Applicant ID:</strong> {studentData.applicantInfo.applicant_id}</p>
                  </Col>
                  <Col md={4}>
                    <p><strong>Applicant DOB:</strong> {studentData.applicantInfo.applicant_dob}</p>
                  </Col>
                  <Col md={4}>
                    <p><strong>Applicant Name:</strong> {studentData.applicantInfo.applicant_name}</p>
                  </Col>
                </Row>
      
                <Row className="mb-3">
                  <Col md={4}>
                    <p><strong>Applicant Contact Name:</strong> {studentData.applicantInfo.applicant_contact_name}</p>
                  </Col>
                  <Col md={4}>
                    <p><strong>Applicant Phone:</strong> {studentData.applicantInfo.applicant_phone}</p>
                  </Col>
                  <Col md={4}>
                    <p><strong>Applicant Email:</strong> {studentData.applicantInfo.applicant_email}</p>
                  </Col>
                </Row>
      
                <Row className="mb-3">
                  <Col md={4}>
                    <p><strong>Applicant TIN No:</strong> {studentData.applicantInfo.applicant_tin_no}</p>
                  </Col>
                  <Col md={4}>
                    <p><strong>Present Address:</strong> {studentData.applicantInfo.applicant_present_address}</p>
                  </Col>
                  <Col md={4}>
                    <p><strong>Marital Status:</strong> {studentData.applicantInfo.applicant_marital_status}</p>
                  </Col>
                </Row>
      
                <Row>
                  <Col md={4}>
                    <p><strong>Loan Amount:</strong> ₹{studentData.applicantInfo.loan_amount.toLocaleString()}</p>
                  </Col>
                  <Col md={4}>
                    <p><strong>Loan Applied:</strong> {studentData.applicantInfo.loan_applied}</p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>


  <Card className="mb-4">
        <Card.Header as="h2" className="bg-light">Parent/Guardian Info</Card.Header>
        <Card.Body>
          <Row className="mb-3">
            <Col md={4}>
              <p><strong>Parent Name:</strong> {studentData.parentInfo.parent_name}</p>
            </Col>
            <Col md={4}>
              <p><strong>Academics:</strong> {studentData.parentInfo.academics}</p>
            </Col>
            <Col md={4}>
              <p><strong>Tests:</strong> {studentData.parentInfo.tests}</p>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={4}>
              <p><strong>Work Experience:</strong> {studentData.parentInfo.work_experience}</p>
            </Col>
            <Col md={4}>
              <p><strong>Criminal Record:</strong> {studentData.parentInfo.criminal_record}</p>
            </Col>
            <Col md={4}>
              <p><strong>Travel History:</strong> {studentData.parentInfo.travel_history}</p>
            </Col>
          </Row>

          <Row>
            <Col md={4}>
              <p><strong>Passport Number:</strong> {studentData.parentInfo.passport_no}</p>
            </Col>
            <Col md={4}>
              <p><strong>Passport Expiry:</strong> {studentData.parentInfo.passport_expiry}</p>
            </Col>
          </Row>
        </Card.Body>
      </Card>

       <Card className="mb-4">
              <Card.Header as="h2" className="bg-light">Finance & Sponsor</Card.Header>
              <Card.Body>
                <Row className="mb-3">
                  <Col md={4}>
                    <p><strong>Sponsor Name:</strong> {studentData.financeInfo.sponsor_name}</p>
                  </Col>
                  <Col md={4}>
                    <p><strong>Sponsor Relationship:</strong> {studentData.financeInfo.sponsor_relationship}</p>
                  </Col>
                  <Col md={4}>
                    <p><strong>Sponsor Income:</strong> ₹{studentData.financeInfo.sponsor_income.toLocaleString()}</p>
                  </Col>
                </Row>
      
                <Row className="mb-3">
                  <Col md={4}>
                    <p><strong>Sponsor Assets:</strong> ₹{studentData.financeInfo.sponsor_assets.toLocaleString()}</p>
                  </Col>
                  <Col md={4}>
                    <p><strong>Bank Balance:</strong> {studentData.financeInfo.bank_balance}</p>
                  </Col>
                  <Col md={4}>
                    <p><strong>Sponsor TIN:</strong> {studentData.financeInfo.sponsor_tin}</p>
                  </Col>
                </Row>
      
                <Row className="mb-3">
                  <Col md={4}>
                    <p><strong>Sponsor Email:</strong> {studentData.financeInfo.sponsor_email}</p>
                  </Col>
                  <Col md={4}>
                    <p><strong>Relation:</strong> {studentData.financeInfo.relation}</p>
                  </Col>
                  <Col md={4}>
                    <p><strong>Occupation:</strong> {studentData.financeInfo.occupation}</p>
                  </Col>
                </Row>
      
                <Row className="mb-3">
                  <Col md={4}>
                    <p><strong>Designation:</strong> {studentData.financeInfo.designation}</p>
                  </Col>
                  <Col md={4}>
                    <p><strong>Experience:</strong> {studentData.financeInfo.experience}</p>
                  </Col>
                  <Col md={4}>
                    <p><strong>Company Status:</strong> {studentData.financeInfo.company_status}</p>
                  </Col>
                </Row>
      
                <Row className="mb-3">
                  <Col md={4}>
                    <p><strong>Business Registration No.:</strong> {studentData.financeInfo.business_reg_no}</p>
                  </Col>
                  <Col md={4}>
                    <p><strong>No. of Employees:</strong> {studentData.financeInfo.no_of_employees}</p>
                  </Col>
                  <Col md={4}>
                    <p><strong>Office Address:</strong> {studentData.financeInfo.office_address}</p>
                  </Col>
                </Row>
      
                <Row className="mb-3">
                  <Col md={4}>
                    <p><strong>Office Phone:</strong> {studentData.financeInfo.office_phone}</p>
                  </Col>
                  <Col md={4}>
                    <p><strong>Business Type:</strong> {studentData.financeInfo.business_type}</p>
                  </Col>
                  <Col md={4}>
                    <p><strong>Annual Income:</strong> ₹{studentData.financeInfo.annual_income.toLocaleString()}</p>
                  </Col>
                </Row>
      
                <Row className="mb-3">
                  <Col md={4}>
                    <p><strong>Net Worth:</strong> ₹{studentData.financeInfo.net_worth.toLocaleString()}</p>
                  </Col>
                  <Col md={4}>
                    <p><strong>LIC No:</strong> {studentData.financeInfo.lic_no}</p>
                  </Col>
                  <Col md={4}>
                    <p><strong>Payment Mode:</strong> {studentData.financeInfo.payment_mode}</p>
                  </Col>
                </Row>
      
                <Row>
                  <Col md={6}>
                    <p><strong>Bank Details:</strong> {studentData.financeInfo.bank_details}</p>
                  </Col>
                  <Col md={6}>
                    <p><strong>Note:</strong> {studentData.financeInfo.note}</p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

        </Tab>

     
      </Tabs>
      <div  className="text-center">

      <Link className="btn btn-primary" to="/myapplication">More Details <FaAnglesRight className="ms-2" /></Link>
      </div>
    </Container>
  );
};

export default Profile;



