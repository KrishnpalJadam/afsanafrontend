import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const AddCounselor = ({ onAdd }) => {
  const [counselorName, setCounselorName] = useState("");
  const [counselorEmail, setCounselorEmail] = useState("");
  const [counselorPhone, setCounselorPhone] = useState("");
  const [university, setUniversity] = useState("");
  const [status, setStatus] = useState("Active");
  const [counselors, setCounselors] = useState([
    {
      name: "John Doe",
      email: "john@example.com",
      phone: "123-456-7890",
      date: "02/15/2025",
      university: "Harvard University",
      status: "Active",
    },

  ]);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingCounselor, setEditingCounselor] = useState(null);

  const handleAddCounselor = (e) => {
    e.eventPreventdefault();
      const newCounselor = {
        name: counselorName,
        email: counselorEmail,
        phone: counselorPhone,
        date: new Date().toLocaleDateString(),
        university,
        status,
      };
      setCounselors([...counselors, newCounselor]);
      onAdd(newCounselor);
      setCounselorName("");
      setCounselorEmail("");
      setCounselorPhone("");
      setUniversity("");
      setStatus("Active");
      setShowModal(false);
    
  };

  const handleEditCounselor = (index) => {
    const counselorToEdit = counselors[index];
    setCounselorName(counselorToEdit.name);
    setCounselorEmail(counselorToEdit.email);
    setCounselorPhone(counselorToEdit.phone);
    setUniversity(counselorToEdit.university);
    setStatus(counselorToEdit.status);
    setEditingCounselor(index);
    setShowModal(true);
  };

  const handleDeleteCounselor = (index) => {
    const updatedCounselors = counselors.filter((_, i) => i !== index);
    setCounselors(updatedCounselors);
  };

  const handleSaveEdit = () => {
    if (editingCounselor !== null) {
      const updatedCounselors = counselors.map((counselor, index) =>
        index === editingCounselor
          ? {
            ...counselor,
            name: counselorName,
            email: counselorEmail,
            phone: counselorPhone,
            university,
            status,
          }
          : counselor
      );
      setCounselors(updatedCounselors);
      setEditingCounselor(null);
      setCounselorName("");
      setCounselorEmail("");
      setCounselorPhone("");
      setUniversity("");
      setStatus("Active");
      setShowModal(false);
    }
  };

  const filteredCounselors = counselors.filter((counselor) =>
    counselor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container p-3">
      {/* Search input and Add button */}


      <div className="mb-3 d-flex" style={{ justifyContent: "space-between" }}>
        <div>
          <h2 className=" mb-4">Counselor List</h2>
        </div>
        <div className="d-flex">

          <div className="me-4">
            <input
              type="text"
              className="form-control me-3"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <button
              variant="secondary"
              className="btn btn-secondary w-100 w-md-auto p-2"
              onClick={() => setShowModal(true)}
              style={{ border: "none" }}
            >
              + Add Counselor
            </button>
          </div>

        </div>
      </div>





      {/* Modal for adding/editing counselor */}
      {showModal && (
        <div
          className="modal show"
          tabIndex="-1"
          style={{
            display: "block",
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1050,
          }}
          aria-hidden="false"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingCounselor !== null
                    ? "Edit Counselor"
                    : "Add New Counselor"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                {/* Counselor Name and Email */}
                <div className="row mb-3">
                  <div className="col-md-6 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter counselor name..."
                      value={counselorName}
                      onChange={(e) => setCounselorName(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter counselor email..."
                      value={counselorEmail}
                      onChange={(e) => setCounselorEmail(e.target.value)}
                    />
                  </div>
                </div>

                {/* Counselor Phone and University */}
                <div className="row mb-3">
                  <div className="col-md-6 mb-3">
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="Enter counselor phone..."
                      value={counselorPhone}
                      onChange={(e) => setCounselorPhone(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter university name..."
                      value={university}
                      onChange={(e) => setUniversity(e.target.value)}
                    />
                  </div>
                </div>

                {/* Status */}
                <div className="row mb-3">
                  <div className="col-md-6">
                    <select
                      className="form-control"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  style={{ backgroundColor: "gray", color: "black", border: "none" }}
                  type="button"
                  className="btn btn-success"
                  onClick={
                    editingCounselor !== null
                      ? handleSaveEdit
                      : handleAddCounselor
                  }
                >
                  {editingCounselor !== null ? "Save Changes" : "Add Counselor"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Counselors Table */}
      {filteredCounselors.length > 0 && (
        <div className="mt-4">

          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead>
                <tr className="text-nowrap">
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>University</th>
                  <th>Status</th>
                  <th>Date Added</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCounselors.map((c, index) => (
                  <tr className="text-nowrap" key={index}>
                    <td>{c.name}</td>
                    <td>{c.email}</td>
                    <td>{c.phone}</td>
                    <td>{c.university}</td>
                    <td>{c.status}</td>
                    <td>{c.date}</td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => handleEditCounselor(index)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm ms-2"
                        onClick={() => handleDeleteCounselor(index)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCounselor;