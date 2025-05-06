import React, { useEffect, useState } from "react";
import AdminUniversity from "./AdminUniversity";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import BASE_URL from "../../Config";
import Swal from "sweetalert2";

const PaymentInvoiceMangament = () => {
  const [universities, setUniversities] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newUniversity, setNewUniversity] = useState({
    user_id: 1,
    name: "",
    logo_url: null,  // Change this to null to hold the file directly
    location: "",
    programs: [],
    highlights: [],
    contact_phone: "",
    contact_email: "",
  });

  // Form input handler
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "logo_url" && files) {
      // For file uploads, handle the file directly
      const file = files[0];
      setNewUniversity({
        ...newUniversity,
        logo_url: file, // Directly storing the file object
      });
    } else {
      setNewUniversity({
        ...newUniversity,
        [name]: value,
      });
    }
  };

  const handleAddProgram = () => {
    setNewUniversity({
      ...newUniversity,
      programs: [...newUniversity.programs, ""],
    });
  };

  const handleProgramChange = (index, value) => {
    const updatedPrograms = [...newUniversity.programs];
    updatedPrograms[index] = value;
    setNewUniversity({
      ...newUniversity,
      programs: updatedPrograms,
    });
  };

  const handleAddHighlight = () => {
    setNewUniversity({
      ...newUniversity,
      highlights: [...newUniversity.highlights, ""],
    });
  };

  const handleHighlightChange = (index, value) => {
    const updatedHighlights = [...newUniversity.highlights];
    updatedHighlights[index] = value;
    setNewUniversity({
      ...newUniversity,
      highlights: updatedHighlights,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("user_id", newUniversity.user_id);
    formData.append("name", newUniversity.name);

    // Append logo as file (no conversion to base64)
    if (newUniversity.logo_url) {
      formData.append("logo_url", newUniversity.logo_url);  // Direct file
    }

    formData.append("location", newUniversity.location);
    formData.append("contact_phone", newUniversity.contact_phone);
    formData.append("contact_email", newUniversity.contact_email);

    // Append dynamic fields for programs
    newUniversity.programs.forEach((program, i) => {
      formData.append(`programs[${i}]`, program);
    });

    // Append dynamic fields for highlights
    newUniversity.highlights.forEach((highlight, i) => {
      formData.append(`highlights[${i}]`, highlight);
    });

    try {
      const response = await axios.post(`${BASE_URL}universities`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Update the state with the new university
      setUniversities([...universities, response.data]);

      // Close the modal and reset form
      setShowModal(false);
      setNewUniversity({
        name: "",
        logo_url: null,
        location: "",
        programs: [],
        highlights: [],
        contact_phone: "",
        contact_email: "",
      });

      // Show success alert
      Swal.fire({
        title: "Success!",
        text: "University added successfully.",
        icon: "success",
        confirmButtonText: "Ok",
      });

    } catch (error) {
      console.log("Error adding university:", error);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonText: "Close",
      });
    }
  };

  // Fetch universities
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}universities`);
        console.log(response.data); // To check if data is correct
        setUniversities(response.data); // Ensure the data is passed correctly
      } catch (error) {
        console.log("Error fetching universities:", error);
      }
    };
    fetchData();
  }, []);

  const role = localStorage.getItem("login");

  return (
    <div className="container py-5">
      <div className="mb-5" style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <h2 className="text-center ">Top Universities</h2>
        </div>
        {role === "admin" && (
          <div>
            <Button variant="primary" onClick={() => setShowModal(true)}>
              + Add University
            </Button>
          </div>
        )}

      </div>

      <div className="row">
        {universities.length > 0 ? (
          universities.map((university, index) => (
            <AdminUniversity key={index} university={university} />
          ))
        ) : (
          <p>No universities available</p>
        )}
      </div>

      {/* Modal for Adding University */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New University</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newUniversity.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formLogoUrl">
              <Form.Label>Logo Upload</Form.Label>
              <Form.Control
                type="file"
                name="logo_url"
                accept="image/*" // Restrict to image files
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={newUniversity.location}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPrograms" className="mb-3 mt-3">
              <Form.Label>Programs</Form.Label>
              <Button variant="secondary" onClick={handleAddProgram} className="ms-4 btn-sm">
                Add Program
              </Button>
              {newUniversity.programs.map((program, index) => (
                <Form.Control
                  key={index}
                  type="text"
                  value={program}
                  onChange={(e) => handleProgramChange(index, e.target.value)}
                  className="mb-2 mt-2"
                  required
                />
              ))}
            </Form.Group>
            <Form.Group controlId="formHighlights">
              <Form.Label>Highlights</Form.Label>
              <Button variant="secondary" onClick={handleAddHighlight} className="ms-4 btn-sm">
                Add Highlight
              </Button>
              {newUniversity.highlights.map((highlight, index) => (
                <Form.Control
                  key={index}
                  type="text"
                  value={highlight}
                  onChange={(e) => handleHighlightChange(index, e.target.value)}
                  className="mb-2 mt-2"
                  required
                />
              ))}
            </Form.Group>
            <Form.Group controlId="formContactPhone">
              <Form.Label>Contact Phone</Form.Label>
              <Form.Control
                type="text"
                name="contact_phone"
                value={newUniversity.contact_phone}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formContactEmail">
              <Form.Label>Contact Email</Form.Label>
              <Form.Control
                type="email"
                name="contact_email"
                value={newUniversity.contact_email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Add University
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PaymentInvoiceMangament;
