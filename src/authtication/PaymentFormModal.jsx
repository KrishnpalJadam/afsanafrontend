import React, { useState } from "react";
import {
  Modal,
  Button,
  Form,
  Row,
  Col,
  Alert,
} from "react-bootstrap";

const PaymentFormModal = ({ show, handleClose }) => {
  const [formData, setFormData] = useState({
    branch: "",
    name: "",
    whatsapp: "",
    email: "",
    groupName: "",
    university: "",
    universityOther: "",
    country: "",
    countryOther: "",
    paymentMethod: "",
    paymentMethodOther: "",
    paymentType: "",
    paymentTypeOther: "",
    file: null,
    assistant: "",
    note: "",
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Payment Form Submitted:", formData);
    alert("Payment details submitted successfully!");
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Create New Payment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Label>Branch *</Form.Label>
              <Form.Select name="branch" onChange={handleChange} required>
                <option value="">Select Branch</option>
                <option>Dhaka</option>
                <option>Sylhet</option>
              </Form.Select>
            </Col>
            <Col md={6}>
              <Form.Label>Group Name (optional)</Form.Label>
              <Form.Control
                name="groupName"
                value={formData.groupName}
                onChange={handleChange}
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={4}>
              <Form.Label>Name *</Form.Label>
              <Form.Control
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Col>
            <Col md={4}>
              <Form.Label>WhatsApp Number *</Form.Label>
              <Form.Control
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                required
              />
            </Col>
            <Col md={4}>
              <Form.Label>Email Address *</Form.Label>
              <Form.Control
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Label>University *</Form.Label>
              <Form.Select name="university" onChange={handleChange} required>
                <option value="">Select University</option>
                <option>Budapest Metropolitan University</option>
                <option>Gyor University</option>
                <option>Wekerle Business School</option>
                <option>University of Debrecen</option>
                <option>Pecs University Hungary</option>
                <option>Other</option>
              </Form.Select>
              {formData.university === "Other" && (
                <Form.Control
                  className="mt-2"
                  name="universityOther"
                  placeholder="Other University"
                  onChange={handleChange}
                />
              )}
            </Col>
            <Col md={6}>
              <Form.Label>Country *</Form.Label>
              <Form.Select name="country" onChange={handleChange} required>
                <option value="">Select Country</option>
                <option>Hungary</option>
                <option>Cyprus</option>
                <option>Malaysia</option>
                <option>Denmark</option>
                <option>UK</option>
                <option>Australia</option>
                <option>Netherlands</option>
                <option>Canada</option>
                <option>Malta</option>
                <option>Lithuania</option>
                <option>Germany</option>
                <option>Other</option>
              </Form.Select>
              {formData.country === "Other" && (
                <Form.Control
                  className="mt-2"
                  name="countryOther"
                  placeholder="Other Country"
                  onChange={handleChange}
                />
              )}
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Label>Payment Method *</Form.Label>
              <Form.Select name="paymentMethod" onChange={handleChange} required>
                <option value="">Select Payment Method</option>
                <option>Bkash</option>
                <option>Bank Transfer</option>
                <option>Cash</option>
                <option>Bank Deposit</option>
                <option>Other</option>
              </Form.Select>
              {formData.paymentMethod === "Other" && (
                <Form.Control
                  className="mt-2"
                  name="paymentMethodOther"
                  placeholder="Other Method"
                  onChange={handleChange}
                />
              )}
            </Col>
            <Col md={6}>
              <Form.Label>Payment Type *</Form.Label>
              <Form.Select name="paymentType" onChange={handleChange} required>
                <option value="">Select Payment Type</option>
                <option>File Opening Charge</option>
                <option>Application Fee</option>
                <option>After Offer Letter Charge</option>
                <option>Insurance Fee</option>
                <option>Bank Statement</option>
                <option>After Visa</option>
                <option>Accommodation</option>
                <option>Other</option>
              </Form.Select>
              {formData.paymentType === "Other" && (
                <Form.Control
                  className="mt-2"
                  name="paymentTypeOther"
                  placeholder="Other Type"
                  onChange={handleChange}
                />
              )}
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Upload Payment Proof</Form.Label>
            <Form.Control type="file" name="file" onChange={handleChange} />
          </Form.Group>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Label>Name of Assistant</Form.Label>
              <Form.Control
                name="assistant"
                value={formData.assistant}
                onChange={handleChange}
              />
            </Col>
            <Col md={6}>
              <Form.Label>Note</Form.Label>
              <Form.Control
                name="note"
                value={formData.note}
                onChange={handleChange}
              />
            </Col>
          </Row>

          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={handleClose} className="me-2">
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Submit Payment
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default PaymentFormModal;
