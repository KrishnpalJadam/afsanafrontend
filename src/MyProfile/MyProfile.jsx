import React, { useState, useEffect } from "react";
import { Card, ListGroup, Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import api from "../interceptors/axiosInterceptor";


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
    university_id: ""
  });

  const fetchUserData = async () => {
    if (!loginDetail) return;

    try {
      const res = await api.get(`auth/getUser/${loginDetail.id}`);
      if (res.data.user) {
        const user = res.data.user;
        setUserData(user);
        setFormData({
          full_name: user.full_name || "",
          email: user.email || "",
          phone: user.phone || "",
          address: user.address || "",
          gender: user.gender || "",
          date_of_birth: user.date_of_birth ? user.date_of_birth.split("T")[0] : "",
          father_name: user.father_name || "",
          admission_no: user.admission_no || "",
          id_no: user.id_no || "",
          category: user.category || "",
          university_id: user.university_id || ""
        });
      }
    } catch (error) {
      console.error("Failed to fetch user data: ", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    const filteredFormData = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== "" && value !== null && value !== undefined) {
        filteredFormData[key] = value;
      }
    });

    filteredFormData["user_id"] = loginDetail.id;

    try {
      const res = await api.put(`auth/updateUser/${loginDetail.id}`, filteredFormData);
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

  const renderItem = (label, value) => {
    if (!value) return null;
    return (
      <ListGroup.Item className="d-flex justify-content-between align-items-center py-3 px-4 border-0 border-bottom">
        <span className="fw-semibold text-secondary">{label}</span>
        <span className="fw-medium text-dark">{value}</span>
      </ListGroup.Item>
    );
  };

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
                value={formData.full_name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </Form.Group>

            {loginDetail.role !== "admin" && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Gender</Form.Label>
                  <Form.Select
                    name="gender"
                    value={formData.gender}
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
                    value={formData.date_of_birth}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Father's Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="father_name"
                    value={formData.father_name}
                    onChange={handleChange}
                  />
                </Form.Group>

               

                <Form.Group className="mb-3">
                  <Form.Label>ID No.</Form.Label>
                  <Form.Control
                    type="text"
                    name="id_no"
                    value={formData.id_no}
                    onChange={handleChange}
                  />
                </Form.Group>
              </>
            )}

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
