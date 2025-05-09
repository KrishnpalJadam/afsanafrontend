import React, { useEffect, useState } from 'react'
import api from '../../interceptors/axiosInterceptor'
import BASE_URL from '../../Config'
import Swal from 'sweetalert2'
import { Button, Card, Table } from 'react-bootstrap'

const Addbranch = () => {
  const [form, setForm] = useState({
    branch_name: "",
    branch_email: "",
    branch_phone: "",
    branch_address: "",
  })

  const [getData, setData] = useState([])
  const [editId, setEditId] = useState(null)

  // Handle form input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Fetch all branches
  const fetchBranchData = async () => {
    try {
      const response = await api.get(`${BASE_URL}branch`);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  // Call on component mount
  useEffect(() => {
    fetchBranchData();
  }, []);

  // Add / Update branch
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      branch_name: form.branch_name,
      branch_address: form.branch_address,
      branch_phone: form.branch_phone,
      branch_email: form.branch_email
    };

    try {
      if (editId) {
        // Update existing branch
        await api.put(`${BASE_URL}branch/${editId}`, formData);
        Swal.fire("Success!", "Branch updated successfully!", "success");
      } else {
        // Add new branch
        await api.post(`${BASE_URL}branch`, formData);
        Swal.fire("Success!", "Branch added successfully!", "success");
      }

      fetchBranchData();

      // Close modal
      const modal = document.getElementById('myModal');
      const modalInstance = bootstrap.Modal.getInstance(modal);
      modalInstance.hide();

      // Reset form and edit state
      setForm({
        branch_name: '',
        branch_address: '',
        branch_email: '',
        branch_phone: ''
      });
      setEditId(null);

    } catch (error) {
      console.log(error);
      Swal.fire("Error!", "Failed to submit branch data", "error");
    }
  };

  // Populate form for editing
  const handleEdit = (item) => {
    setForm({
      branch_name: item.branch_name,
      branch_address: item.branch_address,
      branch_email: item.branch_email,
      branch_phone: item.branch_phone
    });
    setEditId(item.id);

    // Open modal manually
    const modal = new bootstrap.Modal(document.getElementById('myModal'));
    modal.show();
  };

  // Delete branch
  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this branch?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.delete(`${BASE_URL}branch/${id}`);
          setData(prev => prev.filter(item => item.id !== id));
          Swal.fire('Deleted!', 'The branch has been deleted.', 'success');
        } catch (err) {
          console.error("Delete failed", err);
          Swal.fire('Error!', 'Failed to delete branch.', 'error');
        }
      }
    });
  };

  return (
    <div className='p-4'>
      <div className='d-flex justify-content-between'>
        <h2>Branch List</h2>
        <button type="button" className='btn btn-secondary' data-bs-toggle="modal" data-bs-target="#myModal">
          + Add Branch
        </button>
      </div>

      <Card className='mt-4'>
        <Card.Body>
          <Table bordered hover responsive className="text-center text-nowrap">
            <thead>
              <tr>
                <th>Sr.</th>
                <th>Branch Name</th>
                <th>Branch Email</th>
                <th>Branch Address</th>
                <th>Branch Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {getData?.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.branch_name}</td>
                  <td>{item.branch_email}</td>
                  <td>{item.branch_address}</td>
                  <td>{item.branch_phone}</td>
                  <td>
                    <Button
                      variant="primary"
                      size="sm"
                      className="me-2"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Modal */}
      <div className="modal" id="myModal">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">

            <div className="modal-header">
              <h4 className="modal-title">{editId ? "Edit Branch" : "Add Branch"}</h4>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div className="modal-body">
              <form id="branchForm" method='post' onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Branch Name</label>
                  <input type="text" className="form-control" name="branch_name" value={form.branch_name} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                  <label className="form-label">Branch Address</label>
                  <input type="text" className="form-control" name="branch_address" value={form.branch_address} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                  <label className="form-label">Branch Phone</label>
                  <input type="tel" className="form-control" name="branch_phone" value={form.branch_phone} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                  <label className="form-label">Branch Email</label>
                  <input type="email" className="form-control" name="branch_email" value={form.branch_email} onChange={handleChange} required />
                </div>

                <div className='text-end'>
                  <button type='submit' className='btn btn-success'>
                    {editId ? "Update Branch" : "Add Branch"}
                  </button>
                </div>
              </form>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
            </div>

          </div>
        </div>
      </div>

    </div>
  )
}

export default Addbranch
