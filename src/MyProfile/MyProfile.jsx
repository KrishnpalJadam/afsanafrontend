import React, { useState, useEffect } from "react";
import { Card, ListGroup, Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import api from "../interceptors/axiosInterceptor"; // your axios setup with interceptors

const MyProfile = () => {
  const loginDetail = JSON.parse(localStorage.getItem("login_detail"));

  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    address: "",
    gender: "",
    date_of_birth: "",
    father_name: "",
    admission_no: "",
    id_no: "",
    category: "",
    role: "",
    university_name: ""
  });

  // ✅ Fetch profile data
  const fetchUserData = async () => {
    if (!loginDetail) return;

    try {
      const res = await api.get(`auth/getUser/${loginDetail.id}`);

      if (res.data.user) {
        setUserData(res.data.user);
        setFormData({
          full_name: res.data.user.full_name || "",
          email: res.data.user.email || "",
          phone: res.data.user.phone || "",
          address: res.data.user.address || "",
          gender: res.data.user.gender || "",
          date_of_birth: res.data.user.date_of_birth ? res.data.user.date_of_birth.split("T")[0] : "",
          father_name: res.data.user.father_name || "",
          admission_no: res.data.user.admission_no || "",
          id_no: res.data.user.id_no || "",
          category: res.data.user.category || "",
          role: res.data.user.role || "",
          university_name: res.data.user.university_name || ""
        });
      }
    } catch (error) {
      console.error("Failed to fetch user data: ", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  // ✅ Form input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Profile update handler
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    try {
      const res = await api.put(`auth/updateUser/${loginDetail.id}`, data);

      if (res.status === 200) {
        alert("Profile updated successfully!");
        setShowModal(false);
        fetchUserData();
      } else {
        alert("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile: ", error);
      alert("An error occurred while updating the profile.");
    }
  };

  // ✅ Helper for displaying profile fields
  const renderItem = (label, value) => {
    if (!value) return null;
    return (
      <ListGroup.Item className="d-flex justify-content-between align-items-center py-3 px-4 border-0 border-bottom">
        <span className="fw-semibold text-secondary">{label}</span>
        <span className="fw-medium text-dark">{value}</span>
      </ListGroup.Item>
    );
  };

  // ✅ Show message if no user logged in
  if (!loginDetail) {
    return (
      <Container className="mt-5 text-center">
        <h4 className="text-muted">No user is logged in.</h4>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow-sm rounded-4 border-0 overflow-hidden">
            <Card.Header as="h4" className="text-center bg-primary text-white py-3 fw-bold">
              My Profile
            </Card.Header>

            <ListGroup variant="flush">
              {renderItem("Full Name", userData?.full_name)}
              {renderItem("Email", userData?.email)}
              {renderItem("Phone", userData?.phone)}
              {renderItem("Gender", userData?.gender)}
              {renderItem("Date of Birth", userData?.date_of_birth && new Date(userData.date_of_birth).toLocaleDateString())}
              {renderItem("Address", userData?.address)} 
              {renderItem("Father's Name", userData?.father_name)}
              {renderItem("Admission No.", userData?.admission_no)}
              {renderItem("ID No.", userData?.id_no)}
            </ListGroup>

            <Card.Footer className="text-center bg-light">
              <Button variant="primary" onClick={() => setShowModal(true)}>
                Update Profile
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>

      {/* ✅ Update Profile Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Profile</Modal.Title>
        </Modal.Header>
       <Modal.Body>
  <Form onSubmit={handleUpdateProfile}>
    <Form.Group className="mb-3">
      <Form.Label>Full Name</Form.Label>
      <Form.Control
        type="text"
        name="full_name"
        value={formData.full_name || ""}
        onChange={handleChange}
      />
    </Form.Group>

    <Form.Group className="mb-3">
      <Form.Label>Email</Form.Label>
      <Form.Control
        type="email"
        name="email"
        value={formData.email || ""}
        onChange={handleChange}
      />
    </Form.Group>

    <Form.Group className="mb-3">
      <Form.Label>Phone</Form.Label>
      <Form.Control
        type="text"
        name="phone"
        value={formData.phone || ""}
        onChange={handleChange}
      />
    </Form.Group>

    <Form.Group className="mb-3">
      <Form.Label>Address</Form.Label>
      <Form.Control
        type="text"
        name="address"
        value={formData.address || ""}
        onChange={handleChange}
      />
    </Form.Group>

    <Form.Group className="mb-3">
      <Form.Label>Gender</Form.Label>
      <Form.Select
        name="gender"
        value={formData.gender || ""}
        onChange={handleChange}
      >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </Form.Select>
    </Form.Group>

    <Form.Group className="mb-3">
      <Form.Label>Date of Birth</Form.Label>
      <Form.Control
        type="date"
        name="date_of_birth"
        value={formData.date_of_birth || ""}
        onChange={handleChange}
      />
    </Form.Group>

    <Form.Group className="mb-3">
      <Form.Label>Father's Name</Form.Label>
      <Form.Control
        type="text"
        name="father_name"
        value={formData.father_name || ""}
        onChange={handleChange}
      />
    </Form.Group>

    <Form.Group className="mb-3">
      <Form.Label>Admission No.</Form.Label>
      <Form.Control
        type="text"
        name="admission_no"
        value={formData.admission_no || ""}
        onChange={handleChange}
      />
    </Form.Group>

    <Form.Group className="mb-3">
      <Form.Label>ID No.</Form.Label>
      <Form.Control
        type="text"
        name="id_no"
        value={formData.id_no || ""}
        onChange={handleChange}
      />
    </Form.Group>

    <Button variant="primary" type="submit">
      Save Changes
    </Button>
  </Form>
</Modal.Body>

      </Modal>
    </Container>
  );
};

export default MyProfile;
