import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const LeadInquiryManagement = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
    alert("Inquiry Submitted Successfully!");
    setShowModal(false);
  };

  return (
    <div className="container py-5"  >
      <div className="bg-white p-5 shadow-sm rounded-3">
        {/* Header Section */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1>Inquiry Management</h1>
            <p className="mb-0">Home / Patient Management / Registration</p>
          </div>
          <div>
            <Button variant="outline-dark" onClick={() => setShowModal(true)}>
              + Add
            </Button>
            <Button variant="outline-dark" className="ms-2">
              <i className="bi bi-arrow-left-short" /> Back
            </Button>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Status</th>
                <th scope="col">Assigned_to</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Mark@gmail.com</td>
                <td>885545698</td>
                <td>pending</td>
                <td>Counselors</td>
              </tr>
              <tr>
                <td>2</td>
                <td>nan</td>
                <td>nan@gmail.com</td>
                <td>885548698</td>
                <td>approved</td>
                <td>Counselors</td>
              </tr>
              <tr>
                <td>3</td>
                <td>joy</td>
                <td>joy@gmail.com</td>
                <td>888645698</td>
                <td>pending</td>
                <td>Counselors</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Modal */}
        <Modal show={showModal} size="lg" onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add Inquiry</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="add-new-patient-main">
              <form onSubmit={handleSubmit}>
                {/* Personal Information Section */}
                <div className="form-section my-4">
                  <div className="section-title border-bottom fw-bold">
                    Personal Information
                  </div>
                  <div className="row">
                    <div className="col-12 col-md-6 col-lg-4 my-3">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          id="fullName"
                          placeholder="Full Name*"
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4 my-3">
                      <div className="form-group">
                        <input
                          type="date"
                          className="form-control"
                          id="dob"
                          placeholder="DOB"
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4 my-3">
                      <div className="form-group">
                        <select className="form-control" id="gender">
                          <option>Male</option>
                          <option>Female</option>
                          <option>Other</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4 my-3">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          id="contact"
                          placeholder="Contact"
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4 my-3">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          id="emergencyContact"
                          placeholder="Emergency Contact"
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4 my-3">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          id="aadharNo"
                          placeholder="Aadhar No."
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4 my-3">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          id="uniqueHealthID"
                          placeholder="Unique Health ID"
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4 my-3">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          id="phoneNumber"
                          placeholder="Phone Number"
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4 my-3">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          id="pastMedicalHistory"
                          placeholder="Past Medical History"
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4 my-3">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          id="pastSurgicalHistory"
                          placeholder="Past Surgical History"
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4 my-3">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          id="socialHistory"
                          placeholder="Social History"
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4 my-3">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          id="medications"
                          placeholder="Medications"
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4 my-3">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          id="labs"
                          placeholder="Labs"
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4 my-3">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          id="imaging"
                          placeholder="Imaging"
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4 my-3">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          id="allergies"
                          placeholder="Allergies"
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4 my-3">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          id="previousDocuments"
                          placeholder="Previous Medical Documents"
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4 my-3">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          id="insuranceProvider"
                          placeholder="Insurance Provider"
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4 my-3">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          id="idNumber"
                          placeholder="ID Number"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Form Buttons */}
                <div className="  my-2 w-25 d-flex">
                  <button
                    type="button"
                    className="btn btn-outline-dark mr-3 px-3 col-sm-12"
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary px-4 ms-2 col-sm-12 " style={{backgroundColor:"gray" , color:"black", border:"none"}}
                  >
                    SAVE
                  </button>
                </div>
              </form>
            </div>
            ;
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default LeadInquiryManagement;
