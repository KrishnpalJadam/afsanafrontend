import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import Swal from "sweetalert2";
import swal from "sweetalert";
import { useNavigate, Link } from "react-router-dom";
import { Button, Modal, Form } from "react-bootstrap";

import BASE_URL from "../../Config";
import api from "../../interceptors/axiosInterceptor";
import axios from "axios";

const AdminUniversity = ({ university, onDelete, onEdit }) => {
  const role = localStorage.getItem("login");
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [newUniversity, setNewUniversity] = useState({
    name: "",
    logo_url: null,
    location: "",
    programs: [],
    highlights: [],
    contact_phone: "",
    contact_email: "",
  });

  const animation = useSpring({
    opacity: 1,
    transform: "translateY(0)",
    from: { opacity: 0, transform: "translateY(20px)" },
    config: { tension: 200, friction: 20 },
  });

  // const programs = Array.isArray(university.programs) ? university.programs : [];
  // const highlights = Array.isArray(university.highlights) ? university.highlights : [];

  const safeParseArray = (value) => {
    if (Array.isArray(value)) return value;
    if (typeof value === "string") {
      try {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed) ? parsed : [value]; // fallback if it's not an array
      } catch (e) {
        return [value]; // fallback if string isn't JSON
      }
    }
    return [];
  };

  // ✅ Use this:
  const programs = safeParseArray(university.programs);
  const highlights = safeParseArray(university.highlights);



  const handleDeleteUniversity = async (id) => {
    try {
      await api.delete(`${BASE_URL}universities/${id}`);
      Swal.fire({
        title: "Deleted!",
        text: "University deleted successfully.",
        icon: "success",
      });

      onDelete(); // 🔁 Trigger parent refresh

    } catch (error) {
      console.error("Error deleting university:", error);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonText: "Close",
      });
    }
  };

  // const handleEditUniversity = async () => {
  //   const result = await Swal.fire({
  //     title: "Edit University",
  //     html: `
  //       <input id="name" class="swal2-input" placeholder="Name" value="${university.name}">
  //       <input id="location" class="swal2-input" placeholder="Location" value="${university.location}">
  //       <input id="contact_phone" class="swal2-input" placeholder="Phone" value="${university.contact_phone}">
  //       <input id="contact_email" class="swal2-input" placeholder="Email" value="${university.contact_email}">
  //     `,
  //     focusConfirm: false,
  //     preConfirm: () => {
  //       return {
  //         name: document.getElementById("name").value,
  //         location: document.getElementById("location").value,
  //         contact_phone: document.getElementById("contact_phone").value,
  //         contact_email: document.getElementById("contact_email").value,
  //       };
  //     },
  //   });

  //   if (result.isConfirmed) {
  //     try {
  //       await api.put(`${BASE_URL}universities/${university.id}`, result.value);

  //       Swal.fire({
  //         title: "Updated!",
  //         text: "University updated successfully.",
  //         icon: "success",
  //       });

  //       onEdit(); // 🔁 Trigger parent refresh

  //     } catch (error) {
  //       console.error("Edit error:", error);
  //       Swal.fire("Error", "Failed to update university.", "error");
  //     }
  //   }
  // };


  // const handleEditUniversity = () => {
  //   setNewUniversity({ ...university }); // preload selected university
  //   setShowModal(true);
  // };
  const handleEditUniversity = () => {
    setNewUniversity({
      ...university,
      programs: safeParseArray(university.programs),
      highlights: safeParseArray(university.highlights),
    });

    setShowModal(true);
  };



  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "logo_url") {
      setNewUniversity((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setNewUniversity((prev) => ({ ...prev, [name]: value }));
    }
  };

  // const handleProgramChange = (index, value) => {
  //   const updated = [...newUniversity.programs];
  //   updated[index] = value;
  //   setNewUniversity((prev) => ({ ...prev, programs: updated }));
  // };


  // const handleHighlightChange = (index, value) => {
  //   const updated = [...newUniversity.highlights];
  //   updated[index] = value;
  //   setNewUniversity((prev) => ({ ...prev, highlights: updated }));
  // };

  // const handleProgramChange = (index, value) => {
  //   const updatedPrograms = [...newUniversity.programs];
  //   updatedPrograms[index] = value; // Update the specific index
  //   setNewUniversity((prev) => ({ ...prev, programs: updatedPrograms })); // Update state
  // };

  // const handleHighlightChange = (index, value) => {
  //   const updatedHighlights = [...newUniversity.highlights];
  //   updatedHighlights[index] = value; // Update the specific index
  //   setNewUniversity((prev) => ({ ...prev, highlights: updatedHighlights })); // Update state
  // };

  // const handleAddProgram = () => {
  //   setNewUniversity((prev) => ({
  //     ...prev,
  //     programs: [...prev.programs, ""],
  //   }));
  // };

  // const handleAddHighlight = () => {
  //   setNewUniversity((prev) => ({
  //     ...prev,
  //     highlights: [...prev.highlights, ""],
  //   }));
  // };


  // Update the specific program
  const handleProgramChange = (index, value) => {
    const updatedPrograms = [...newUniversity.programs];
    updatedPrograms[index] = value; // Update the specific index
    setNewUniversity((prev) => ({ ...prev, programs: updatedPrograms })); // Update state
  };

  const handleHighlightChange = (index, value) => {
    const updatedHighlights = [...newUniversity.highlights];
    updatedHighlights[index] = value; // Update the specific index
    setNewUniversity((prev) => ({ ...prev, highlights: updatedHighlights })); // Update state
  };

  const handleAddProgram = () => {
    setNewUniversity((prev) => ({
      ...prev,
      programs: [...prev.programs, ""], // Adds a new empty string for input
    }));
  };

  const handleAddHighlight = () => {
    setNewUniversity((prev) => ({
      ...prev,
      highlights: [...prev.highlights, ""], // Adds a new empty string for input
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // const formData = new FormData();
      // for (let key in newUniversity) {
      //   if (Array.isArray(newUniversity[key])) {
      //     newUniversity[key].forEach((item, idx) =>
      //       formData.append(`${key}[${idx}]`, item)
      //     );
      //   } else {
      //     formData.append(key, newUniversity[key]);
      //   }
      // }
      const formData = new FormData();
      for (let key in newUniversity) {
        if (Array.isArray(newUniversity[key])) {
          // ✅ Send as actual array
          formData.append(key, JSON.stringify(newUniversity[key]));
        } else {
          formData.append(key, newUniversity[key]);
        }
      }


      await axios.put(
        // `https://ssknf82q-3009.inc1.devtunnels.ms/api/universities/${university.id}`,
        `${BASE_URL}universities/${university.id}`,
        formData
      );

      swal("Success!", "University updated successfully!", "success");
      setShowModal(false);
      window.location.reload();
    } catch (error) {
      console.error(error);
      swal("Error!", "Something went wrong!", "error");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <animated.div className="col-md-4 mb-4" style={animation}>
      <div className="card shadow-sm" style={{ height: "450px" }}>
        <div
          className="card-body"
          style={{
            maxHeight: "100%",
            overflowY: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            scrollBehavior: "smooth",
            WebkitOverflowScrolling: "touch",
          }}
        >
          <style>
            {`.card-body::-webkit-scrollbar { display: none; }`}
          </style>

          <div className="d-flex align-items-center mb-4">
            <img
              src={`${university.logo_url}`}
              alt={`${university.name} Logo`}
              className="rounded-circle"
              crossOrigin="anonymous"
              style={{
                width: "50px",
                height: "50px",
                objectFit: "cover",
                padding: "5px",
              }}
            />
            <h5 className="ml-3">{university.name}</h5>
          </div>

          <div className="mb-3">
            <div className="d-flex align-items-center text-muted mb-2">
              📬 <span>{university.location}</span>
            </div>
          </div>

          <div className="mb-3">
            <h6 className="font-weight-bold">Popular Programs:</h6>
            <ul className="text-muted">
              {programs.length > 0 ? programs.map((program, i) => <li key={i}>• {program}</li>) : <li>No programs</li>}
            </ul>
          </div>

          <div className="mb-3">
            <h6 className="font-weight-bold">Key Highlights:</h6>
            <ul className="text-muted">
              {highlights.length > 0 ? highlights.map((highlight, i) => <li key={i}>• {highlight}</li>) : <li>No highlights</li>}
            </ul>
          </div>

          <div className="mb-4">
            <h6 className="font-weight-bold">Contact:</h6>
            <div className="text-muted">
              <p>📞 {university.contact_phone || "N/A"}</p>
              <p>📧 {university.contact_email || "N/A"}</p>
            </div>
          </div>

          {role !== "admin" && (
            <div>
              <Link to={"/university"} className="btn btn-primary w-100">Apply Now</Link>
            </div>
          )}

          {role === "admin" && (
            <div className="d-flex gap-2 justify-content-center">
              <Button variant="danger" className="mt-2" onClick={() => handleDeleteUniversity(university.id)}>Delete</Button>
              <Button variant="primary" className="mt-2" onClick={handleEditUniversity}>
                Edit
              </Button>
            </div>
          )}
          <Modal show={showModal} onHide={() => !isLoading && setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Edit University</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formName" className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={newUniversity.name}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                  />
                </Form.Group>

                <Form.Group controlId="formLogoUrl" className="mb-3">
                  <Form.Label>Logo Upload</Form.Label>
                  <Form.Control
                    type="file"
                    name="logo_url"
                    accept="image/*"
                    onChange={handleInputChange}
                    disabled={isLoading}
                  />
                </Form.Group>

                <Form.Group controlId="formLocation" className="mb-3">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    name="location"
                    value={newUniversity.location}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                  />
                </Form.Group>
                {/* 
                <Form.Group controlId="formPrograms" className="mb-3">
                  <Form.Label>Programs</Form.Label>
                  <Button
                    variant="secondary"
                    onClick={handleAddProgram}
                    className="ms-4 btn-sm"
                    disabled={isLoading}
                  >
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
                      disabled={isLoading}
                    />
                  ))}
                </Form.Group>

                <Form.Group controlId="formHighlights" className="mb-3">
                  <Form.Label>Highlights</Form.Label>
                  <Button
                    variant="secondary"
                    onClick={handleAddHighlight}
                    className="ms-4 btn-sm"
                    disabled={isLoading}
                  >
                    Add Highlight
                  </Button>
                  {newUniversity.highlights.map((highlight, index) => (
                    <Form.Control
                      key={index}
                      type="text"
                      value={highlight}
                      onChange={(e) =>
                        handleHighlightChange(index, e.target.value)
                      }
                      className="mb-2 mt-2"
                      required
                      disabled={isLoading}
                    />
                  ))}
                </Form.Group> */}

                <Form.Group controlId="formPrograms" className="mb-3">
                  <Form.Label>Programs</Form.Label>
                  <Button
                    variant="secondary"
                    onClick={handleAddProgram}
                    className="ms-4 btn-sm"
                    disabled={isLoading}
                  >
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
                      disabled={isLoading}
                    />
                  ))}
                </Form.Group>

                <Form.Group controlId="formHighlights" className="mb-3">
                  <Form.Label>Highlights</Form.Label>
                  <Button
                    variant="secondary"
                    onClick={handleAddHighlight}
                    className="ms-4 btn-sm"
                    disabled={isLoading}
                  >
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
                      disabled={isLoading}
                    />
                  ))}
                </Form.Group>
                <Form.Group controlId="formContactPhone" className="mb-3">
                  <Form.Label>Contact Phone</Form.Label>
                  <Form.Control
                    type="text"
                    name="contact_phone"
                    value={newUniversity.contact_phone}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                  />
                </Form.Group>

                <Form.Group controlId="formContactEmail" className="mb-3">
                  <Form.Label>Contact Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="contact_email"
                    value={newUniversity.contact_email}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="mt-3"
                  disabled={isLoading}
                >
                  {isLoading ? "Updating..." : "Update University"}
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </animated.div>
  );
};

export default AdminUniversity;
