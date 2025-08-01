import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import { Form } from "react-bootstrap";
import api from "../../../interceptors/axiosInterceptor";
import BASE_URL from "../../../Config";

const AddProcessor = () => {
    const [processors, setProcessors] = useState([]);
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
        
    });

    const fetchProcessors = async () => {
        try {
            const res = await api.get(`${BASE_URL}getAllProcessors`);
            setProcessors(res.data);
        } catch (err) {
            console.error("Failed to fetch processors", err);
            Swal.fire("Error", "Failed to fetch processor members", "error");
        }
    };

    useEffect(() => {
        fetchProcessors();
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

   const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        role: "processors",
        user_id: 1  // ✅ Forcefully passing user_id
    };

    console.log("Submitting payload to API:", payload); // ✅ Debug log

    try {
        if (editingId) {
            await api.put(`${BASE_URL}updateProcessor/${editingId}`, payload);
            Swal.fire("Success", "Processor updated successfully", "success");
        } else {
            await api.post(`${BASE_URL}createprocessor`, payload);
            Swal.fire("Success", "Processor added successfully", "success");
        }
        fetchProcessors();
        setShowModal(false);
        resetForm();
    } catch (err) {
        Swal.fire("Error", err?.response?.data?.message || "Operation failed", "error");
        console.error("API Error:", err);
    }
};


    const handleEdit = async (id) => {
        try {
            const res = await api.get(`${BASE_URL}getProcessorById/${id}`);
            const processor = res.data;
            setFormData({
                full_name: processor.full_name,
                email: processor.email,
                phone: processor.phone,
                password: "",
                
            });
            setEditingId(processor.id);
            setShowModal(true);
        } catch (err) {
            Swal.fire("Error", "Failed to fetch processor details", "error");
        }
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Confirm Delete",
            text: "Are you sure you want to delete this processor?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Delete"
        });
        if (result.isConfirmed) {
            try {
                await api.delete(`${BASE_URL}deleteProcessor/${id}`);
                Swal.fire("Deleted", "Processor removed successfully", "success");
                fetchProcessors();
            } catch (err) {
                Swal.fire("Error", "Delete operation failed", "error");
            }
        }
    };

    const resetForm = () => {
        setFormData({
            full_name: "",
            email: "",
            phone: "",
            password: "",
          
        });
        setEditingId(null);
    };

    // Filter and pagination logic
    const filteredProcessors = processors.filter(processor =>
        processor.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        processor.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredProcessors.length / itemsPerPage);
    const currentItems = filteredProcessors.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between mb-3">
                <div>
                    <h3>Processor Management</h3>
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
                            + Add Processor
                        </button>
                    </div>
                </div>
            </div>

            <div className="card shadow-sm">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead className="table-light">
                                <tr className="text-center">
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                   
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((processor, index) => (
                                    <tr key={processor.id}>
                                        <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                        <td>{processor.full_name}</td>
                                        <td>{processor.email}</td>
                                        <td>{processor.phone}</td>
                                       
                                        <td className="" style={{alignItems:"center"}}>
                                            <button
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() => handleDelete(processor.id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {currentItems.length === 0 && (
                                    <tr>
                                        <td colSpan="7" className="text-center py-4 text-muted">
                                            No processors found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    {totalPages > 1 && (
                        <nav className="mt-4">
                            <ul className="pagination justify-content-center">
                                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                    <button
                                        className="page-link"
                                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    >
                                        Previous
                                    </button>
                                </li>
                                {[...Array(totalPages)].map((_, i) => (
                                    <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                        <button
                                            className="page-link"
                                            onClick={() => setCurrentPage(i + 1)}
                                        >
                                            {i + 1}
                                        </button>
                                    </li>
                                ))}
                                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                    <button
                                        className="page-link"
                                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    >
                                        Next
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    )}
                </div>
            </div>
            
            {/* Add/Edit Processor Modal */}
            {showModal && (
                <div className="modal show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    {editingId ? 'Edit Processor' : 'Add New Processor'}
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowModal(false)}
                                ></button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="modal-body">
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <label className="form-label">Full Name</label>
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
                                        <div className="col-md-6">
                                            <label className="form-label">Email</label>
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
                                        <div className="col-md-6">
                                            <label className="form-label">Phone</label>
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
                                            <div className="col-md-6">
                                                <label className="form-label">Password</label>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    name="password"
                                                    placeholder="Password"
                                                    value={formData.password}
                                                    onChange={handleInputChange}
                                                    required={!editingId}
                                                />
                                            </div>
                                        )}
                                      
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        {editingId ? 'Save Changes' : 'Add Processor'}
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

export default AddProcessor;