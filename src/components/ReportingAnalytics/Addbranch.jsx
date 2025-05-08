import React, { useState } from 'react'
import api from '../../interceptors/axiosInterceptor'
import BASE_URL from '../../Config'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { Button } from 'react-bootstrap'

const Addbranch = () => {
    const [form, setForm] = useState({
        branch_name: "",
        branch_email: "",
        branch_phone: "",
        branch_address: "",
    })
    const navigate = useNavigate();
    const handelChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = {
            branch_name: form.branch_name,
            branch_address: form.branch_address,
            branch_phone: form.branch_phone,
            branch_email: form.branch_email
        }
        try {
            const data = await api.post(`${BASE_URL}branch`, formData)
            console.log("ddddd", data)

            setForm(data)
            Swal.fire("Success!", "Branch added successfully!", "success");
            // Optionally close modal manually
            const modal = document.getElementById('myModal');
            const modalInstance = bootstrap.Modal.getInstance(modal);
            modalInstance.hide();
            setForm({
                branch_name: '',
                branch_address: '',
                branch_email: '',
                branch_phone: ''
            })
        } catch (error) {
            console.log(error)
            Swal.fire("Error!", "Failed to add branch", "error");
        }
    }

    return (
        <div className='p-4'>
            <div className='d-flex' style={{ justifyContent: "space-between" }}>
                <div>
                    <h2>Add New Branch</h2>
                </div>
                <div>
                    <button type="button" className='btn btn-secondary ' data-bs-toggle="modal" data-bs-target="#myModal">+ Add branch</button>

                </div>
            </div>



            <Card>
        <Card.Body>
          <Table bordered hover responsive className="text-center text-nowrap">
            <thead>
              <tr>
                <th>#</th>
                <th>Student</th>
                <th>Task</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
             
                <tr key={task?.id}>
                  <td>{index + 1}</td>
                  <td>{task?.student_name}</td>
                  <td>{task?.title}</td>
                  
                  <td>
                   
                    <Button
                      variant="primary"
                      size="sm"
                      className="me-1"
                      
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
           
             
            </tbody>
          </Table>
        </Card.Body>
      </Card>


            <div class="modal" id="myModal">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">


                        <div class="modal-header">
                            <h4 class="modal-title">Add Branch</h4>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>


                        <div class="modal-body">
                            <form id="branchForm" method='post' onSubmit={handleSubmit}>
                                <div class="mb-3">
                                    <label for="branchName" class="form-label">Branch Name</label>
                                    <input type="text" class="form-control" name="branch_name" value={form.branch_name} onChange={handelChange} required />
                                </div>

                                <div class="mb-3">
                                    <label for="branchAddress" class="form-label">Branch Address</label>
                                    <input type="text" class="form-control" name="branch_address" value={form.branch_address} onChange={handelChange} required />
                                </div>

                                <div class="mb-3">
                                    <label for="branchPhone" class="form-label">Branch Phone</label>
                                    <input type="tel" class="form-control" name="branch_phone" value={form.branch_phone} onChange={handelChange} required />
                                </div>

                                <div class="mb-3">
                                    <label for="branchEmail" class="form-label">Branch Email</label>
                                    <input type="email" class="form-control" name="branch_email" value={form.branch_email} onChange={handelChange} required />
                                </div>
                                <div className='text-end'>
                                    <button type='submit' >Submit</button>
                                </div>
                            </form>
                        </div>



                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Addbranch
