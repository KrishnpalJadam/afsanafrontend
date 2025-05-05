import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import BASE_URL from "../../Config";
import axios from "axios";
import Swal from "sweetalert2";

const AddCounselor = ({ onAdd }) => {


  const [userId, setUserId] = useState("");
  const [counselorName, setCounselorName] = useState("");
  const [counselorEmail, setCounselorEmail] = useState("");
  const [counselorPhone, setCounselorPhone] = useState("");
  const [university, setUniversity] = useState("");
  const [status, setStatus] = useState("Active");
  const [counselors, setCounselors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingCounselor, setEditingCounselor] = useState(null);

  console.log("Counselor data:", editingCounselor);


  const fetchCounseller = async () => {
    try {
      const response = await axios.get(`${BASE_URL}counselor`);
      console.log("Counselor data:", response.data.data);
      if (response.status !== 200) {
        throw new Error("Failed to fetch counselors");
      }
      setCounselors(response.data.data);
    } catch (error) {
      console.error("Error fetching counselors:", error);
    }
  };

  useEffect(() => {
    fetchCounseller();
  }, []);

  const handleAddCounselor = async (e) => {
    e.preventDefault();
      const newCounselor = {
        user_id: userId,
        name: counselorName,
        email: counselorEmail,
        phone: counselorPhone,
        date: new Date().toLocaleDateString(),
        university,
        status,
      };

      try {
        const response = await axios.post(`${BASE_URL}counselor`, newCounselor);
        if (response.status === 201) {
            fetchCounseller();
            Swal.fire({
                title: 'Success!',
                text: 'Follow-up added successfully.',
                icon: 'success',
                confirmButtonText: 'Ok',
            }).then(() => {
                handleCloseFollowUpModal();
            });
        }
    } catch (error) {
        console.error('Error adding Counsellor:', error);
        Swal.fire({
            title: 'Error!',
            text: 'Unable to add Counsellor. Please try again.',
            icon: 'error',
            confirmButtonText: 'Close',
        });
    }

      onAdd(newCounselor);
      setCounselorName("");
      setCounselorEmail("");
      setCounselorPhone("");
      setUniversity("");
      setStatus("Active");
      setShowModal(false);
    
  };

  const handleEditCounselor = async (counselor) => {
    console.log("Editing counselor:", counselor);
    // Only set the form data and show modal
    setUserId(counselor.user_id);
    setCounselorName(counselor.name);
    setCounselorEmail(counselor.email);
    setCounselorPhone(counselor.phone);
    setUniversity(counselor.university);
    setStatus(counselor.status);
    setEditingCounselor(counselor.id); 
    setShowModal(true);
};

const handleSaveEdit = async () => {
    if (editingCounselor !== null) {
        const updateCounselor = {
            user_id: userId,
            name: counselorName,
            email: counselorEmail,
            phone: counselorPhone,
            date: new Date().toLocaleDateString(),
            university: university,
            status: status,
        };

        try {
            const response = await axios.put(`${BASE_URL}counselor/${editingCounselor}`, updateCounselor);
            if (response.status === 200) {
                // Fetch updated list
                fetchCounseller();
                
                Swal.fire({
                    title: 'Success!',
                    text: 'Counsellor updated successfully.',
                    icon: 'success',
                    confirmButtonText: 'Ok',
                }).then(() => {
                    // Reset form and close modal
                    setEditingCounselor(null);
                    setCounselorName("");
                    setCounselorEmail("");
                    setCounselorPhone("");
                    setUserId("");
                    setUniversity("");
                    setStatus("Active");
                    setShowModal(false);
                });
            }
        } catch (error) {
            console.error('Error updating counsellor:', error);
            Swal.fire({
                title: 'Error!',
                text: 'Unable to update counsellor. Please try again.',
                icon: 'error',
                confirmButtonText: 'Close',
            });
        }
    }
};

  const handleDeleteCounselor = (index) => {

    Swal.fire({
      title: "Are you sure?", 

      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Call the delete API here
        axios
          .delete(`${BASE_URL}counselor/${index}`)
          .then((response) => {
            if (response.status === 200) {
              fetchCounseller();
            }
          })
          .catch((error) => {
            console.error("Error deleting counselor:", error);
          });
      }
    });
    // const updatedCounselors = counselors.filter((_, i) => i !== index);
    setCounselors(updatedCounselors);
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
                      placeholder="Enter Id ..."
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter counselor name..."
                      value={counselorName}
                      onChange={(e) => setCounselorName(e.target.value)}
                    />
                  </div>
                  
                </div>

                {/* Counselor Phone and University */}
                <div className="row mb-3">
                <div className="col-md-6 mb-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter counselor email..."
                      value={counselorEmail}
                      onChange={(e) => setCounselorEmail(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="Enter counselor phone..."
                      value={counselorPhone}
                      onChange={(e) => setCounselorPhone(e.target.value)}
                    />
                  </div>
                 
                </div>

                {/* Status */}
                <div className="row mb-3">
                <div className="col-md-6 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter university name..."
                      value={university}
                      onChange={(e) => setUniversity(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6 ">
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
                    <td>{c?.name}</td>
                    <td>{c?.email}</td>
                    <td>{c?.phone}</td>
                    <td>{c?.university}</td>
                    <td>{c?.status}</td>
                    <td>{c?.date}</td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => handleEditCounselor(c)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm ms-2"
                        onClick={() => handleDeleteCounselor(c.id)}
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