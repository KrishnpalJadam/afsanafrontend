

import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Form,
  Row,
  Col,
  Alert,
} from "react-bootstrap";
import BASE_URL from "../Config";
import api from "../interceptors/axiosInterceptor";
import Swal from "sweetalert2";

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

  const [universities, setUniversities] = useState([]);
  const [branchData, setBranchdata] = useState([])
  const [studentdata, setStudentsData] = useState([]);
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`${BASE_URL}universities`);
        setUniversities(response.data); // Set fetched universities to state
      } catch (error) {
        console.log("Error fetching universities:", error);
      }
    };

    fetchData();
  }, []);




  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await api.get(`${BASE_URL}auth/getAllStudents`);
        setStudentsData(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchStudents();
  }, [])


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSubmit = new FormData();

    // Always append common fields
    formDataToSubmit.append("branch", formData.branch);
    formDataToSubmit.append("name", formData.name);
    formDataToSubmit.append("whatsapp", formData.whatsapp);
    formDataToSubmit.append("email", formData.email);
    formDataToSubmit.append("groupName", formData.groupName);
    formDataToSubmit.append("assistant", formData.assistant);
    formDataToSubmit.append("note", formData.note);

    // Only append the selected field values (if not "Other")
    if (formData.university !== "Other") {
      formDataToSubmit.append("university", formData.university);
    } else {
      if (formData.universityOther) {
        formDataToSubmit.append("universityOther", formData.universityOther);
      }
    }

    if (formData.country !== "Other") {
      formDataToSubmit.append("country", formData.country);
    } else {
      if (formData.countryOther) {
        formDataToSubmit.append("countryOther", formData.countryOther);
      }
    }

    if (formData.paymentMethod !== "Other") {
      formDataToSubmit.append("paymentMethod", formData.paymentMethod);
    } else {
      if (formData.paymentMethodOther) {
        formDataToSubmit.append("paymentMethodOther", formData.paymentMethodOther);
      }
    }

    if (formData.paymentType !== "Other") {
      formDataToSubmit.append("paymentType", formData.paymentType);
    } else {
      if (formData.paymentTypeOther) {
        formDataToSubmit.append("paymentTypeOther", formData.paymentTypeOther);
      }
    }

    // Append file if it exists
    if (formData.file) {
      formDataToSubmit.append("file", formData.file);
    }

    // Submit the form data
    try {
      const response = await api.post(`${BASE_URL}payments`, formDataToSubmit, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Swal.fire({
        title: 'Success!',
        text: 'Payment details submitted successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
      });

      handleClose();
    } catch (error) {
      console.error("Payment Form Submission Error:", error);
      Swal.fire({
        title: 'Error!',
        text: 'There was an issue submitting the payment details.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };



  useEffect(() => {
    const branch = async () => {
      try {
        const responce = await api.get(`${BASE_URL}branch`)
        setBranchdata(responce.data)
      } catch (error) {
        console.log(error)
      }
    }
    branch()
  }, [])

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Create New Payment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={12}>
              <Form.Label>Branch *</Form.Label>
              <Form.Select name="branch" onChange={handleChange} value={formData.branch} required>

                <option>Select Branch</option>
                {branchData.map((item) => (
                  <option key={item.id} value={item.id}>{item.branch_name}</option>
                ))}
              </Form.Select>
            </Col>

          </Row>

          <Row className="mb-3">
            <Col md={4}>
              <Form.Label>Name *</Form.Label>

              <Form.Select
                name="name"               // key abhi bhi 'name' hai
                value={formData.name}     // value student ki id hogi
                onChange={handleChange}
                required
              >
                <option value="">Select Student</option>
                {studentdata.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.full_name}
                  </option>
                ))}
              </Form.Select>
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
            <Col md={6} className="mt-2">
              <Form.Label>Group Name (optional)</Form.Label>
              <Form.Control
                name="groupName"
                value={formData.groupName}
                onChange={handleChange}
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Label>University *</Form.Label>
              <Form.Select
                name="university"
                value={formData.university}
                onChange={handleChange}
                required
              >
                <option value="">Select University</option>
                {universities.map((university) => (
                  <option key={university.id} value={university.id}>
                    {university.name}
                  </option>
                ))}
                <option value="Other">Other</option>
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
