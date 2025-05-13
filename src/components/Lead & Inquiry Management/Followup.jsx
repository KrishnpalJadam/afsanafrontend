import React, { useState, useEffect } from 'react';
import { Button, Table, Form, Modal, Badge } from 'react-bootstrap';
// import axios from 'axios';
import Swal from 'sweetalert2';
import BASE_URL from '../../Config'; // Assuming BASE_URL is already set
import api from '../../interceptors/axiosInterceptor';

const Followup = () => {
    const [followUps, setFollowUps] = useState([]); // For storing follow-up data
    const [showFollowUpModal, setShowFollowUpModal] = useState(false); // For modal visibility
    const [newFollowUp, setNewFollowUp] = useState({
        name: '',
        title: '',
        followUpDate: new Date().toISOString().split('T')[0],
        status: 'New',
        urgency: '',
        department: '',
        user_id: 1, // Assuming user ID is static for now
    });

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Fetch all follow-ups on component load
    const fetchFollowUps = async () => {
        try {
            const response = await api.get(`${BASE_URL}followUp`);
            setFollowUps(response.data);
        } catch (error) {
            console.error('Error fetching follow-ups:', error);
            Swal.fire({
                title: 'Error!',
                text: 'Unable to fetch follow-up data.',
                icon: 'error',
                confirmButtonText: 'Close',
            });
        }
    };

    useEffect(() => {
        fetchFollowUps(); // Fetch data initially
    }, []);

    // Handle form input change
    const handleFollowUpInputChange = (e) => {
        const { name, value } = e.target;
        setNewFollowUp({
            ...newFollowUp,
            [name]: value,
        });
    };

    // Add new follow-up
    const handleAddFollowUp = async (e) => {
        e.preventDefault();

        const requestData = {
            name: newFollowUp.name,
            title: newFollowUp.title,
            follow_up_date: newFollowUp.followUpDate,
            status: newFollowUp.status,
            urgency_level: newFollowUp.urgency,
            department: newFollowUp.department,
            user_id: newFollowUp.user_id,
        };

        try {
            const response = await api.post(`${BASE_URL}followUp`, requestData);
            if (response.status === 201) {
                // On success, fetch the updated follow-up list
                fetchFollowUps();
                Swal.fire({
                    title: 'Success!',
                    text: 'Follow-up added successfully.',
                    icon: 'success',
                    confirmButtonText: 'Ok',
                }).then(() => {
                    handleCloseFollowUpModal(); // Close modal
                });
            }
        } catch (error) {
            console.error('Error adding follow-up:', error);
            Swal.fire({
                title: 'Error!',
                text: 'Unable to add follow-up. Please try again.',
                icon: 'error',
                confirmButtonText: 'Close',
            });
        }
    };

    // Delete follow-up
    const handleDeleteFollowUp = async (id) => {
        try {
            const response = await api.delete(`${BASE_URL}followUp/${id}`);
            if (response.status === 200) {
                setFollowUps(followUps.filter(followUp => followUp.id !== id)); // Update state
                Swal.fire({
                    title: 'Deleted!',
                    text: 'Follow-up has been deleted.',
                    icon: 'success',
                    confirmButtonText: 'Ok',
                });
            }
        } catch (error) {
            console.error('Error deleting follow-up:', error);
            Swal.fire({
                title: 'Error!',
                text: 'Unable to delete follow-up.',
                icon: 'error',
                confirmButtonText: 'Close',
            });
        }
    };

    // Get follow-up details by ID
    const handleViewFollowUpDetail = async (id) => {
        try {
            const response = await api.get(`${BASE_URL}followUp/${id}`);
            const followUpDetail = response.data;
            // You can open a modal with the detailed info here if needed
        } catch (error) {
            console.error('Error fetching follow-up details:', error);
            Swal.fire({
                title: 'Error!',
                text: 'Unable to fetch follow-up details.',
                icon: 'error',
                confirmButtonText: 'Close',
            });
        }
    };

    // Close the follow-up modal
    const handleCloseFollowUpModal = () => {
        setShowFollowUpModal(false);
        setNewFollowUp({
            name: '',
            title: '',
            followUpDate: new Date().toISOString().split('T')[0],
            status: 'New',
            urgency: '',
            department: '',
            user_id: 1,
        });
    };
 
  // Badge colors based on status
  const getBadge = (status) => {
    switch (status) {
      case "In Progress":
        return "success";
      case "New":
        return "primary";
      case "WhatsApp":
        return "warning";
      case "Email":
        return "info";
      case "Call":
        return "danger";
      default:
        return "secondary";
    }
  };
    // Handle the pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentFollowUps = followUps.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <div style={{justifyContent: "space-between", display: "flex"}}>
                 {/* Today's Follow-ups */}
            <h4 className="mt-3">Today's Follow-ups</h4>
            <div>
            <Button variant="secondary" className='mt-2' onClick={() => setShowFollowUpModal(true)} >
                Add Follow-up
            </Button>
            </div>
        
            </div>
        

           
            <Table className="text-center text-nowrap" striped bordered hover responsive>
                <thead>
                    <tr>
                       <th>Title</th>
                        <th>Name</th>
                        <th>Follow-up Date</th>
                        <th>Status</th>
                        <th>Urgency</th>
                        <th>Department</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentFollowUps.map((followUp) => (
                        <tr key={followUp.id}>
                           
                            <td>{followUp.title}</td>
                            <td>{followUp.name}</td>
                            <td>{new Date(followUp.follow_up_date).toLocaleDateString()}</td>
                            <td>
                                <Badge bg={getBadge(followUp.status)}>{followUp.status}</Badge>
                            </td>
                            <td>
                                <Badge bg={getBadge(followUp.urgency_level)}>{followUp.urgency_level}</Badge>
                            </td>
                            <td>{followUp.department}</td>
                            <td>
                                {/* <Button variant="info" size="sm" onClick={() => handleViewFollowUpDetail(followUp.id)}>
                                    View
                                </Button> */}
                                <Button variant="danger" size="sm" onClick={() => handleDeleteFollowUp(followUp.id)} className="ms-2"
                                              
                                    
                                    >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

           

            {/* Modal for Adding New Follow-up */}
            <Modal show={showFollowUpModal} onHide={handleCloseFollowUpModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Follow-up</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleAddFollowUp}>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter name"
                                name="name"
                                value={newFollowUp.name}
                                onChange={handleFollowUpInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter follow-up title"
                                name="title"
                                value={newFollowUp.title}
                                onChange={handleFollowUpInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Follow-up Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="followUpDate"
                                value={newFollowUp.followUpDate}
                                onChange={handleFollowUpInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Status</Form.Label>
                            <Form.Select
                                name="status"
                                value={newFollowUp.status}
                                onChange={handleFollowUpInputChange}
                            >
                                <option value="New">New</option>
                                <option value="In Progress">In Progress</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Urgency Level</Form.Label>
                            <Form.Select
                                name="urgency"
                                value={newFollowUp.urgency}
                                onChange={handleFollowUpInputChange}
                            >
                                <option value="WhatsApp">WhatsApp</option>
                                <option value="Email">Email</option>
                                <option value="Call">Call</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Department</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter department"
                                name="department"
                                value={newFollowUp.department}
                                onChange={handleFollowUpInputChange}
                                required
                            />
                        </Form.Group>
                        <div className="d-flex justify-content-end">
                            <Button variant="danger" onClick={handleCloseFollowUpModal} className="me-2">
                                Cancel
                            </Button>
                            <Button variant="secondary" type="submit">
                                Add Follow-up
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Followup;
