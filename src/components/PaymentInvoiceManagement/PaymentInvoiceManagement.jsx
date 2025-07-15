import React, { useEffect, useState } from "react";
import AdminUniversity from "./AdminUniversity";
import { Modal, Button, Form } from "react-bootstrap";
import BASE_URL from "../../Config";
import Swal from "sweetalert2";
import api from "../../interceptors/axiosInterceptor";

const UniversityManagement = () => {
  const [universities, setUniversities] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newUniversity, setNewUniversity] = useState({
    user_id: 1,
    name: "",
    logo_url: null,
    location: "",
    programs: [],
    highlights: [],
    contact_phone: "",
    contact_email: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  // Fetch universities
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await api.get(`${BASE_URL}universities`);
      setUniversities(response.data);
    } catch (error) {
      console.error("Error fetching universities:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to fetch universities.",
        icon: "error",
        confirmButtonText: "Close",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "logo_url" && files) {
      setNewUniversity({
        ...newUniversity,
        logo_url: files[0],
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

  const handleDeleteUniversity = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await api.delete(`${BASE_URL}universities/${id}`);
        // Update state immediately without waiting for refresh
        setUniversities(universities.filter(univ => univ.id !== id));
        Swal.fire("Deleted!", "University has been deleted.", "success");
      }
    } catch (error) {
      console.error("Delete Error:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to delete university.",
        icon: "error",
        confirmButtonText: "Close",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("user_id", newUniversity.user_id || "");
    formData.append("name", newUniversity.name || "");

    if (newUniversity.logo_url) {
      formData.append("logo_url", newUniversity.logo_url);
    }

    formData.append("location", newUniversity.location || "");
    formData.append("contact_phone", newUniversity.contact_phone || "");
    formData.append("contact_email", newUniversity.contact_email || "");
    formData.append("programs", JSON.stringify(newUniversity.programs || []));
    formData.append("highlights", JSON.stringify(newUniversity.highlights || []));

    try {
      const response = await api.post(`${BASE_URL}universities`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200 || response.status === 201) {
        // Fetch updated data immediately after successful submission
        await fetchData();
        
        Swal.fire({
          title: "Success!",
          text: "University added successfully.",
          icon: "success",
          confirmButtonText: "Ok",
        });

        setShowModal(false);
        setNewUniversity({
          user_id: 1,
          name: "",
          logo_url: null,
          location: "",
          programs: [],
          highlights: [],
          contact_phone: "",
          contact_email: "",
        });
      } else {
        throw new Error("Unexpected response status from API.");
      }
    } catch (error) {
      console.error("Submission Error:", error?.response?.data || error.message || error);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonText: "Close",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const role = localStorage.getItem("login");

  return (
    <div className="container py-5">
      <div className="mb-5" style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <h2 className="text-center">Top Universities</h2>
        </div>
        {role === "admin" && (
          <div>
            <Button variant="primary" onClick={() => setShowModal(true)} disabled={isLoading}>
              + Add University
            </Button>
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="row">
          {universities.length > 0 ? (
            universities.map((university) => (
              <AdminUniversity 
                key={university.id} 
                university={university} 
                onDelete={handleDeleteUniversity}
              />
            ))
          ) : (
            <p>No universities available</p>
          )}
        </div>
      )}

      {/* Modal for Adding University */}
      <Modal show={showModal} onHide={() => !isLoading && setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New University</Modal.Title>
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
                required
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
              {isLoading ? 'Adding...' : 'Add University'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UniversityManagement;