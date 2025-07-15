import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import BASE_URL from "../../Config";

import Swal from "sweetalert2";
import { Form } from "react-bootstrap";
import api from "../../interceptors/axiosInterceptor";

const AddCounselor = () => {
  const [counselors, setCounselors] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    password: "",
    university_id: "",
    status: "active",
  });

  const fetchCounselors = async () => {
    try {
      const res = await api.get(`${BASE_URL}counselor`);
      // console.log("counsoler data : ",res.data)
      setCounselors(res.data);
    } catch (err) {
      console.error("Failed to fetch counselors", err);
    }
  };

  const fetchUniversities = async () => {
    try {
      const res = await api.get(`${BASE_URL}universities`);
      setUniversities(res.data);
    } catch (err) {
      console.error("Failed to fetch universities", err);
    }
  };

  useEffect(() => {
    fetchCounselors();
    fetchUniversities();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "university_id" ? parseInt(value) : value,
    }));
  };

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      user_id: 1,
      university_id: parseInt(formData.university_id),
      role: "counselor",
    };

    try {
      if (editingId) {
        await api.put(`${BASE_URL}counselor/${editingId}`, payload);
        Swal.fire("Updated!", "Counselor updated successfully", "success");
      } else {
        await api.post(`${BASE_URL}counselor`, payload);
        Swal.fire("Added!", "Counselor added successfully", "success");
      }
      fetchCounselors();
      setShowModal(false);
      resetForm();
    } catch (err) {
      Swal.fire("Error", "Operation failed", "error");
    }
  };

  const handleEdit = (counselor) => {
    setFormData({
      full_name: counselor.full_name,
      email: counselor.email,
      phone: counselor.phone,
      password: "", // keep password blank for security
      university_id: "", // you can’t prefill a string with an ID, leave user to select again
      status: counselor.status,
    });
    setEditingId(counselor.id);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will delete the counselor.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.delete(`${BASE_URL}counselor/${id}`);
          Swal.fire("Deleted!", "Counselor deleted.", "success");
          fetchCounselors();
        } catch (err) {
          Swal.fire("Error", "Failed to delete", "error");
        }
      }
    });
  };

  const resetForm = () => {
    setFormData({
      full_name: "",
      email: "",
      phone: "",
      password: "",
      university_id: "",
      status: "active",
    });
    setEditingId(null);
  };

  const filtered = Array.isArray(counselors)
    ? counselors.filter((c) =>
      c.full_name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : [];

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filtered.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between mb-3">
        <div>

          <h3>Counselor Management</h3>
        </div>
        <div className="d-flex gap-2">
          <div>
            <input
              className="form-control"
              placeholder="Search by name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <button
              className="btn btn-primary mt-1"
              onClick={() => {
                resetForm();
                setShowModal(true);
              }}
            >
              + Add Counselor
            </button>
          </div>

        </div>
      </div>

      <div className="table-responsive mt-5">
        <table className="table table-bordered table-striped">
          <thead className="table-light">
            <tr className="text-center">
              <th>#</th>
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
            {currentItems.map((c, index) => (
              <tr key={c.id}>
                <td>{indexOfFirstItem + index + 1}</td>
                <td>{c.full_name}</td>
                <td>{c.email}</td>
                <td>{c.phone}</td>
                <td>{c.university || "N/A"}</td>
                <td>{c.status}</td>
                <td>
                  {c.created_at
                    ? new Date(c.created_at).toLocaleDateString()
                    : "N/A"}
                </td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEdit(c)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(c.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
      <div className="mt-4 d-flex justify-content-center">
        <nav>
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>
                &laquo;
              </button>
            </li>

            {[...Array(totalPages)].map((_, i) => (
              <li
                key={i}
                className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              </li>
            ))}

            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>
                &raquo;
              </button>
            </li>
          </ul>
        </nav>
      </div>


      {showModal && (
        <div
          className="modal show"
          style={{ display: "block", background: "#00000055" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <form onSubmit={handleAddOrUpdate}>
                <div className="modal-header">
                  <h5 className="modal-title">
                    {editingId ? "Edit" : "Add"} Counselor
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="full_name"
                      placeholder="Full Name"
                      value={formData.full_name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="tel"
                      className="form-control"
                      name="phone"
                      placeholder="Phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  {!editingId && (
                    <div className="mb-3">
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  )}

                  <div className="mb-3">
                    <Form.Select
                      name="university_id"
                      value={formData.university_id}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select University</option>
                      {universities.map((uni) => (
                        <option key={uni.id} value={uni.id}>
                          {uni.name}
                        </option>
                      ))}
                    </Form.Select>
                  </div>
                  <div className="mb-3">
                    <Form.Select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </Form.Select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                    type="button"
                  >
                    Cancel
                  </button>
                  <button className="btn btn-success" type="submit">
                    {editingId ? "Save Changes" : "Add Counselor"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCounselor;
