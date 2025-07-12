// import React, { useEffect, useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import BASE_URL from "../../Config";

// import Swal from "sweetalert2";
// import { Form } from "react-bootstrap";
// import api from "../../interceptors/axiosInterceptor";

// const Addstaff = () => {
//     const [counselors, setCounselors] = useState([]);

//     const [searchTerm, setSearchTerm] = useState("");
//     const [showModal, setShowModal] = useState(false);
//     const [editingId, setEditingId] = useState(null);
//     const [currentPage, setCurrentPage] = useState(1);
//     const itemsPerPage = 10;

//     const [formData, setFormData] = useState({
//         full_name: "",
//         email: "",
//         phone: "",
//         password: "",
//         status: "active",
//         permissions: {
//             Inquiry: { view: false, add: false, edit: false, delete: false },
//             Lead: { view: false, add: false, edit: false, delete: false },
//             // Add other modules as needed
//         },
//     });

//     const fetchCounselors = async () => {
//         try {
//             const res = await api.get(`${BASE_URL}getAllStaff`);
//             // console.log("counsoler data : ",res.data)
//             setCounselors(res.data);
//         } catch (err) {
//             console.error("Failed to fetch counselors", err);
//         }
//     };

//     useEffect(() => {
//         fetchCounselors();
//     }, []);

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({
//             ...prev,
//             [name]: name === "university_id" ? parseInt(value) : value,
//         }));
//     };

//     const handleAddOrUpdate = async (e) => {
//         e.preventDefault();

//         const payload = {
//             ...formData,
//             user_id: 1,
//             role: "staff",
//         };

//         try {
//             if (editingId) {
//                 await api.put(`${BASE_URL}updateStaff/${editingId}`, payload);
//                 Swal.fire("Updated!", "Counselor updated successfully", "success");
//             } else {
//                 await api.post(`${BASE_URL}createStaff `, payload);
//                 Swal.fire("Added!", "Staff added successfully", "success");
//             }
//             fetchCounselors();
//             setShowModal(false);
//             resetForm();
//         } catch (err) {
//             Swal.fire("Error", "Operation failed", "error");
//         }
//     };

//     const handleEdit = (counselor) => {
//         setFormData({
//             full_name: counselor.full_name,
//             email: counselor.email,
//             phone: counselor.phone,
//             password: "", // keep password blank for security
//             status: counselor.status,
//         });
//         setEditingId(counselor.id);
//         setShowModal(true);
//     };

//     const handleDelete = (id) => {
//         Swal.fire({
//             title: "Are you sure?",
//             text: "This will delete the Staff.",
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonColor: "#d33",
//             cancelButtonColor: "#aaa",
//             confirmButtonText: "Yes, delete it!",
//         }).then(async (result) => {
//             if (result.isConfirmed) {
//                 try {
//                     await api.delete(`${BASE_URL}deleteStaff/${id}`);
//                     Swal.fire("Deleted!", "Staff deleted.", "success");
//                     fetchCounselors();
//                 } catch (err) {
//                     Swal.fire("Error", "Failed to delete", "error");
//                 }
//             }
//         });
//     };

//     const resetForm = () => {
//         setFormData({
//             full_name: "",
//             email: "",
//             phone: "",
//             password: "",
//             status: "active",
//         });
//         setEditingId(null);
//     };

//     const filtered = Array.isArray(counselors)
//         ? counselors.filter((c) =>
//             c.full_name.toLowerCase().includes(searchTerm.toLowerCase())
//         )
//         : [];

//     const totalPages = Math.ceil(filtered.length / itemsPerPage);
//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     const currentItems = filtered.slice(indexOfFirstItem, indexOfLastItem);

//     return (
//         <div className="container py-4">
//             <div className="d-flex justify-content-between mb-3">
//                 <div>

//                     <h3>Staff Management</h3>
//                 </div>
//                 <div className="d-flex gap-2">
//                     <div>
//                         <input
//                             className="form-control"
//                             placeholder="Search by name"
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                         />
//                     </div>
//                     <div>
//                         <button
//                             className="btn btn-primary mt-1"
//                             onClick={() => {
//                                 resetForm();
//                                 setShowModal(true);
//                             }}
//                         >
//                             + Add Staff
//                         </button>
//                     </div>

//                 </div>
//             </div>

//             <div className="table-responsive mt-5">
//                 <table className="table table-bordered table-striped">
//                     <thead className="table-light">
//                         <tr>
//                             <th>#</th>
//                             <th>Name</th>
//                             <th>Email</th>
//                             <th>Phone</th>
//                             <th>Status</th>
//                             <th>Date Added</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {currentItems.map((c, index) => (
//                             <tr key={c.id}>
//                                 <td>{indexOfFirstItem + index + 1}</td>
//                                 <td>{c.full_name}</td>
//                                 <td>{c.email}</td>
//                                 <td>{c.phone}</td>

//                                 <td>{c.status}</td>
//                                 <td>
//                                     {c.created_at
//                                         ? new Date(c.created_at).toLocaleDateString()
//                                         : "N/A"}
//                                 </td>
//                                 <td>
//                                     <button
//                                         className="btn btn-warning btn-sm me-2"
//                                         onClick={() => handleEdit(c)}
//                                     >
//                                         Edit
//                                     </button>
//                                     <button
//                                         className="btn btn-danger btn-sm"
//                                         onClick={() => handleDelete(c.id)}
//                                     >
//                                         Delete
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>

//                 </table>
//             </div>
//             <div className="mt-4 d-flex justify-content-center">
//                 <nav>
//                     <ul className="pagination">
//                         <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
//                             <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>
//                                 &laquo;
//                             </button>
//                         </li>

//                         {[...Array(totalPages)].map((_, i) => (
//                             <li
//                                 key={i}
//                                 className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
//                             >
//                                 <button
//                                     className="page-link"
//                                     onClick={() => setCurrentPage(i + 1)}
//                                 >
//                                     {i + 1}
//                                 </button>
//                             </li>
//                         ))}

//                         <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
//                             <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>
//                                 &raquo;
//                             </button>
//                         </li>
//                     </ul>
//                 </nav>
//             </div>


//             {showModal && (
//                 <div
//                     className="modal show"
//                     style={{ display: "block", background: "#00000055" }}
//                 >
//                     <div className="modal-dialog modal-dialog-centered">
//                         <div className="modal-content">
//                             <form onSubmit={handleAddOrUpdate}>
//                                 <div className="modal-header">
//                                     <h5 className="modal-title">
//                                         {editingId ? "Edit" : "Add"} Staff
//                                     </h5>
//                                     <button
//                                         type="button"
//                                         className="btn-close"
//                                         onClick={() => setShowModal(false)}
//                                     ></button>
//                                 </div>
//                                 <div className="modal-body">
//                                     <div className="mb-3">
//                                         <input
//                                             type="text"
//                                             className="form-control"
//                                             name="full_name"
//                                             placeholder="Full Name"
//                                             value={formData.full_name}
//                                             onChange={handleInputChange}
//                                             required
//                                         />
//                                     </div>
//                                     <div className="mb-3">
//                                         <input
//                                             type="email"
//                                             className="form-control"
//                                             name="email"
//                                             placeholder="Email"
//                                             value={formData.email}
//                                             onChange={handleInputChange}
//                                             required
//                                         />
//                                     </div>
//                                     <div className="mb-3">
//                                         <input
//                                             type="tel"
//                                             className="form-control"
//                                             name="phone"
//                                             placeholder="Phone"
//                                             value={formData.phone}
//                                             onChange={handleInputChange}
//                                             required
//                                         />
//                                     </div>
//                                     {!editingId && (
//                                         <div className="mb-3">
//                                             <input
//                                                 type="password"
//                                                 className="form-control"
//                                                 name="password"
//                                                 placeholder="Password"
//                                                 value={formData.password}
//                                                 onChange={handleInputChange}
//                                                 required
//                                             />
//                                         </div>
//                                     )}

//                                     {/* <div className="mb-3">
//                     <Form.Select
//                       name="university_id"
//                       value={formData.university_id}
//                       onChange={handleInputChange}
//                       required
//                     >
//                       <option value="">Select University</option>
//                       {universities.map((uni) => (
//                         <option key={uni.id} value={uni.id}>
//                           {uni.name}
//                         </option>
//                       ))}
//                     </Form.Select>
//                   </div> */}
//                                     <div className="mb-3">
//                                         <Form.Select
//                                             name="status"
//                                             value={formData.status}
//                                             onChange={handleInputChange}
//                                         >
//                                             <option value="active">Active</option>
//                                             <option value="inactive">Inactive</option>
//                                         </Form.Select>
//                                     </div>
//                                     <h6 className="mt-4 mb-2">Permissions</h6>
//                                     <div className="table-responsive">
//                                         <table className="table table-bordered table-striped align-middle text-center">
//                                             <thead className="table-light">
//                                                 <tr>
//                                                     <th className="text-start">Module</th>
//                                                     <th>View</th>
//                                                     <th>Add</th>
//                                                     <th>Edit</th>
//                                                     <th>Delete</th>
//                                                 </tr>
//                                             </thead>
//                                             <tbody>
//                                                 {["Inquiry", "Lead", "Payments & Invoice"].map((module) => (
//                                                     <tr key={module}>
//                                                         <td className="text-start">{module}</td>
//                                                         <td>
//                                                             <input type="checkbox" name={`${module}_view`} />
//                                                         </td>
//                                                         <td>
//                                                             <input type="checkbox" name={`${module}_add`} />
//                                                         </td>
//                                                         <td>
//                                                             <input type="checkbox" name={`${module}_edit`} />
//                                                         </td>
//                                                         <td>
//                                                             <input type="checkbox" name={`${module}_delete`} />
//                                                         </td>
//                                                     </tr>
//                                                 ))}
//                                             </tbody>
//                                         </table>
//                                     </div>


//                                 </div>


//                                 <div className="modal-footer">
//                                     <button
//                                         className="btn btn-secondary"
//                                         onClick={() => setShowModal(false)}
//                                         type="button"
//                                     >
//                                         Cancel
//                                     </button>
//                                     <button className="btn btn-success" type="submit">
//                                         {editingId ? "Save Changes" : "Add Staff"}
//                                     </button>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Addstaff;
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import { Form } from "react-bootstrap";
import api from "../../interceptors/axiosInterceptor";
import BASE_URL from "../../Config";
const Addstaff = () => {
    const [staffMembers, setStaffMembers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const defaultPermissions = {
        Inquiry: { view: false, add: false, edit: false, delete: false },
        Lead: { view: false, add: false, edit: false, delete: false },
        "Payments & Invoice": { view: false, add: false, edit: false, delete: false }
    };
    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        phone: "",
        password: "",
        status: "active",
        permissions: JSON.parse(JSON.stringify(defaultPermissions))
    });
    const fetchStaff = async () => {
        try {
            const res = await api.get(`${BASE_URL}getAllStaff`);
            setStaffMembers(res.data);
        } catch (err) {
            console.error("Failed to fetch staff", err);
            Swal.fire("Error", "Failed to fetch staff members", "error");
        }
    };

    useEffect(() => {
        fetchStaff();
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name.startsWith("permission_")) {
            const [_, module, action] = name.split("_");
            setFormData(prev => ({
                ...prev,
                permissions: {
                    ...prev.permissions,
                    [module]: {
                        ...prev.permissions[module],
                        [action]: checked
                    }
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: type === "checkbox" ? checked : value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const permissionsArray = Object.entries(formData.permissions).map(([module, perm]) => ({
            permission_name: module,
            view_permission: perm.view ? 1 : 0,
            add_permission: perm.add ? 1 : 0,
            edit_permission: perm.edit ? 1 : 0,
            delete_permission: perm.delete ? 1 : 0
        }));
        const payload = {
            ...formData,
            user_id: 1,
            role: "staff",
            permissions: permissionsArray
        };
        try {
            if (editingId) {
                await api.put(`${BASE_URL}updateStaff/${editingId}`, payload);
                Swal.fire("Success", "Staff updated successfully", "success");
            } else {
                await api.post(`${BASE_URL}createStaff`, payload);
                Swal.fire("Success", "Staff member added", "success");
            }
            fetchStaff();
            setShowModal(false);
            resetForm();
        } catch (err) {
            Swal.fire("Error", "Operation failed", "error");
            console.error("API Error:", err);
        }
    };
    const handleEdit = (staff) => {
        const permissionsObj = staff.permissions?.reduce((acc, perm) => {
            acc[perm.permission_name] = {
                view: perm.view_permission === 1,
                add: perm.add_permission === 1,
                edit: perm.edit_permission === 1,
                delete: perm.delete_permission === 1
            };
            return acc;
        }, JSON.parse(JSON.stringify(defaultPermissions)));
        setFormData({
            full_name: staff.full_name,
            email: staff.email,
            phone: staff.phone,
            password: "",
            status: staff.status,
            permissions: permissionsObj
        });
        setEditingId(staff.id);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Confirm Delete",
            text: "Are you sure you want to delete this staff member?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Delete"
        });
        if (result.isConfirmed) {
            try {
                await api.delete(`${BASE_URL}deleteStaff/${id}`);
                Swal.fire("Deleted", "Staff member removed", "success");
                fetchStaff();
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
            status: "active",
            permissions: JSON.parse(JSON.stringify(defaultPermissions))
        });
        setEditingId(null);
    };

    // Filter and pagination logic
    const filteredStaff = staffMembers.filter(staff =>
        staff.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.email.toLowerCase().includes(searchTerm.toLowerCase())
    );



    const totalPages = Math.ceil(filteredStaff.length / itemsPerPage);
    const currentItems = filteredStaff.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );


    console.log(currentItems);


    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between mb-3">
                <div>
                    <h3>Staff Management</h3>
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
                            + Add Staff
                        </button>
                    </div>

                </div>
            </div>

            <div className="card shadow-sm">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead className="table-light">
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((staff, index) => (
                                    <tr key={staff.id}>
                                        <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                        <td>{staff.full_name}</td>
                                        <td>{staff.email}</td>
                                        <td>{staff.phone}</td>
                                        <td>
                                            <span className={`badge ${staff.status === 'active' ? 'bg-success' : 'bg-secondary'}`}>
                                                {staff.status}
                                            </span>
                                        </td>
                                       
                                        <td>
                                            <div className="d-flex gap-2">
                                                {/* <button
                                                    className="btn btn-sm btn-outline-primary"
                                                    onClick={() => handleEdit(staff)}
                                                >
                                                    Edit
                                                </button> */}
                                                <button
                                                    className="btn btn-sm btn-outline-danger"
                                                    onClick={() => handleDelete(staff.id)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {currentItems.length === 0 && (
                                    <tr>
                                        <td colSpan="7" className="text-center py-4 text-muted">
                                            No staff members found
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
            {/* Add/Edit Staff Modal */}
            {
                showModal && (
                    <div className="modal show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <div className="modal-dialog modal-lg modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">
                                        {editingId ? 'Edit Staff Member' : 'Add New Staff Member'}
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
                                            <div className="col-md-6">
                                                <label className="form-label">Status</label>
                                                <select
                                                    className="form-select"
                                                    name="status"
                                                    value={formData.status}
                                                    onChange={handleInputChange}
                                                >
                                                    <option value="active">Active</option>
                                                    <option value="inactive">Inactive</option>
                                                </select>
                                            </div>
                                            {!editingId && (
                                                <div className="col-md-12">
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
                                        <div className="mt-4">
                                            <h5>Permissions</h5>
                                            <div className="table-responsive">
                                                <table className="table table-sm table-bordered">
                                                    <thead className="table-light">
                                                        <tr>
                                                            <th>Module</th>
                                                            <th className="text-center">View</th>
                                                            <th className="text-center">Add</th>
                                                            <th className="text-center">Edit</th>
                                                            <th className="text-center">Delete</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {Object.entries(formData.permissions).map(([module, perms]) => (
                                                            <tr key={module}>
                                                                <td>{module}</td>
                                                                <td className="text-center">
                                                                    <input
                                                                        type="checkbox"
                                                                        name={`permission_${module}_view`}
                                                                        checked={perms.view}
                                                                        onChange={handleInputChange}
                                                                    />
                                                                </td>
                                                                <td className="text-center">
                                                                    <input
                                                                        type="checkbox"
                                                                        name={`permission_${module}_add`}
                                                                        checked={perms.add}
                                                                        onChange={handleInputChange}
                                                                    />
                                                                </td>
                                                                <td className="text-center">
                                                                    <input
                                                                        type="checkbox"
                                                                        name={`permission_${module}_edit`}
                                                                        checked={perms.edit}
                                                                        onChange={handleInputChange}
                                                                    />
                                                                </td>
                                                                <td className="text-center">
                                                                    <input
                                                                        type="checkbox"
                                                                        name={`permission_${module}_delete`}
                                                                        checked={perms.delete}
                                                                        onChange={handleInputChange}
                                                                    />
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
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
                                            {editingId ? 'Save Changes' : 'Add Staff'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
};
export default Addstaff;



