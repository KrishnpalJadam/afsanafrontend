import { useState, useEffect } from "react";
import { Container, Button, Table, Form, Modal, Badge, InputGroup, Dropdown, DropdownButton } from "react-bootstrap";
import { FaSearch, FaPlus, FaEdit, FaTrash, FaEye } from "react-icons/fa";
import BASE_URL from "../../Config"; // Assuming BASE_URL is already set
import api from "../../interceptors/axiosInterceptor";
import Swal from "sweetalert2";


const LeadCouncelor = ({ lead }) => {

  const [leads, setLeads] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState(lead);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentLeadId, setCurrentLeadId] = useState(null);
  const [counselors, setCounselors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [selectedLeadForInvoice, setSelectedLeadForInvoice] = useState(null);


  // invoice state 
  const [paymentAmount, setPaymentAmount] = useState();
  const [tax, setTax] = useState();
  const [total, setTotal] = useState(0);
  const [paymentDate, setPaymentDate] = useState("");
  const [notes, setNotes] = useState("");


  const [newLead, setNewLead] = useState({
    name: "",
    phone: "",
    email: "",
    counselor: "", // Fixed field name from 'counselor' to 'counselor'
    follow_up_date: "",
    notes: "",
    preferred_countries: "",
    source: "",
    status: "",
    user_id: 1, // Include user_id as per the API requirement
  });

  // Search & Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const counsolerId = localStorage.getItem("counselor_id")
  // Fetch Leads
  const fetchLeads = async () => {
    try {
      const response = await api.get(`${BASE_URL}lead/getLeadByCounselorIdnew/${counsolerId}`);
      setLeads(response.data);
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  };




  // Fetch Leads initially
  useEffect(() => {
    fetchLeads();
  }, []);
  const filteredLeads = leads?.filter((lead) =>
    lead.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const fetchCounseller = async () => {
    try {
      const response = await api.get(`counselor`);

      if (response.status === 200) {
        setCounselors(response.data);

      } else {
        console.error("Failed to fetch counselors");
      }
    } catch (error) {
      console.error("Error fetching counselors:", error);
    }
  };

  useEffect(() => {
    fetchCounseller();
  }, []);

  // Open "Add Lead" Modal
  const handleShowModal = () => {
    setIsEditMode(false);
    setCurrentLeadId(null);
    setNewLead({
      name: "",
      phone: "",
      email: "",
      counselor: counsolerId, // Ensure this matches your API field
      follow_up_date: "",
      notes: "",
      preferred_countries: "",
      source: "",
      status: "",
      user_id: lead.id, // Add user_id to the newLead state
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Edit Lead
  const handleEditLead = (lead) => {
    setIsEditMode(true);
    setCurrentLeadId(lead.id);
    setNewLead({
      name: lead.name,
      phone: lead.phone,
      email: lead.email,
      counselor: lead.counselor.id,
      follow_up_date: lead.follow_up_date,
      notes: lead.notes,
      preferred_countries: lead.preferred_countries,
      source: lead.source,
      status: lead.status,
      user_id: 1,
    });
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLead({
      ...newLead,
      [name]: name === "counselor" ? value : value, // Set name as value here for counselor
    });
  };


  const handleSaveLead = async (e) => {
    e.preventDefault();
    if (isEditMode) {
      // Update lead
      try {
        const response = await api.put(`${BASE_URL}lead/${currentLeadId}`, newLead);
        fetchLeads()
      } catch (error) {
        console.error("Error updating lead:", error);
      }
    } else {
      // Add new lead
      try {
        const response = await api.post(`${BASE_URL}lead`, newLead);
        fetchLeads();
      } catch (error) {
        console.error("Error adding lead:", error);
      }
    }
    handleCloseModal();
  };

  // Delete Lead
const handleDeleteLead = async (leadId) => {
  try {
    const response = await api.delete(`${BASE_URL}inquiries/${leadId}`);
    
    if (response.status === 200) {
      console.log("Deletion Success:", response.data);  // Ensure response has the expected data
      setLeads(leads.filter((lead) => lead.id !== leadId));  // Update the local state
      Swal.fire({
        icon: 'success',
        title: 'Lead Deleted',
        text: 'The lead has been deleted successfully!',
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error Deleting Lead',
        text: 'Failed to delete the lead on the server.',
      });
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Deletion Failed',
      text: 'Something went wrong while deleting the lead.',
    });
    console.error("Error deleting lead:", error);
  }
};


  // View Lead Details
  const handleViewLeadDetails = (lead) => {
    setSelectedLead(lead);
    setShowViewModal(true);
  };

  const handleCloseViewModal = () => {
    setShowViewModal(false);
    setSelectedLead(null);
  };
  const indexOfLastLead = currentPage * itemsPerPage;
  const indexOfFirstLead = indexOfLastLead - itemsPerPage;
  const currentLeads = filteredLeads.slice(indexOfFirstLead, indexOfLastLead);
  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage);




  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    // Optionally, update the lead status in your database or state here
  };


  const handleShowInvoiceModal = (lead) => {
    setSelectedLeadForInvoice(lead);
    setShowInvoiceModal(true);
  };




  // Calculate total based on payment amount and tax
  useEffect(() => {
    const calculatedTotal = paymentAmount + (paymentAmount * (tax / 100));
    setTotal(calculatedTotal);
  }, [paymentAmount, tax]);

  // Handle Input Changes for Invoice Form
  const handleInvoiceInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "paymentAmount") {
      setPaymentAmount(Number(value));
    } else if (name === "tax") {
      setTax(Number(value));
    } else if (name === "paymentDate") {
      setPaymentDate(value);
    } else if (name === "notes") {
      setNotes(value);
    }
  };


  // Handle Generate Invoice
const handleGenerateInvoice = async () => {
  const invoicedata = {
    student_name: selectedLeadForInvoice?.name,
    description: notes,
    amount: total,
    fee_date: paymentDate,
    inquiry_id: selectedLeadForInvoice?.id,
      user_id: selectedLeadForInvoice.id 
  };

  if (!invoicedata || !invoicedata.inquiry_id) {
    Swal.fire({
      icon: 'warning',
      title: 'Missing Information',
      text: 'Student ID and Inquiry ID are required!',
    });
    return;
  }

  try {
    const response = await api.post(`${BASE_URL}createStudentFeeBYcounselors`, invoicedata);

    Swal.fire({
      icon: 'success',
      title: 'Invoice Generated',
      text: 'The invoice has been created successfully!',
    });

    setShowInvoiceModal(false); // Close modal
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Invoice Failed',
      text: 'Something went wrong while generating the invoice.',
    });

    console.error("Error generating invoice:", error);
  }
};





  const handleChangePaymentStatus = async (leadId, newStatus) => {
    try {
      // Update the payment status locally before making the API request
      const updatedLeads = leads.map((lead) =>
        lead.id === leadId ? { ...lead, payment_status: newStatus } : lead
      );
      setLeads(updatedLeads);

      // Prepare the data to be sent to the API
      const payload = {
        id: leadId,
        payment_status: newStatus,  // Payment status to be updated
      };

      // Send the PATCH request to update the payment status
      const response = await api.patch(`${BASE_URL}fee/update-status`, payload);
      console.log("Payment status updated successfully:", response);
    } catch (error) {
      console.error("Error updating payment status:", error);
    }
  };




  const handleChangeLeadStatus = async (leadId, newStatus) => {
    try {
      // Update the lead status locally before making the API request (optional)
      const updatedLeads = leads.map((lead) =>
        lead.id === leadId ? { ...lead, lead_status: newStatus } : lead
      );
      setLeads(updatedLeads);

      // Prepare the data to be sent to the API
      const payload = {
        id: leadId,
        lead_status: newStatus,  // Lead status to be updated
      };

      // Send the PATCH request to update the lead status
      const response = await api.patch(`${BASE_URL}fee/update-lesd-status`, payload);
      console.log("Lead status updated successfully:", response);
    } catch (error) {
      console.error("Error updating lead status:", error);
    }
  };




  return (
    <Container fluid className="py-3">
      {/* Filter Section */}
      <div className="mt-2">
        <h2>Leads Management</h2>
      </div>
      <div className="d-flex justify-content-between mb-3 pt-3">
        {/* <div>
          <Button variant="secondary" onClick={handleShowModal}>
            <FaPlus className="me-1" /> New Lead
          </Button>
        </div> */}

        <div className="d-flex gap-2">

          <div>
            <InputGroup>
              <InputGroup.Text>
                <FaSearch />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Search leads..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </div>
        </div>
      </div>

      {/* Leads Table */}
      <Table striped bordered hover className="text-center">
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact</th>
            <th>Asign Counselor</th>
            <th>Invoice</th>
            <th>Payment Status</th>
            <th>Status</th>
            {/* <th>Notes</th> */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentLeads?.length > 0 ? (
            currentLeads?.map((lead) => (
              <tr key={lead.id}>
                <td>{lead?.name}</td>
                <td>{lead?.phone}</td>

                <td>{lead?.counselor_name || "Unassigned"}</td>
                <td>
                  {/* Conditional Rendering for Create Invoice Button */}
                  {lead.is_view === "1" ? (
                    <Button variant="secondary" size="sm" disabled>
                      Already Created
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleShowInvoiceModal(lead)}
                    >
                      Create Invoice
                    </Button>
                  )}
                </td>





                <td>
                  {/* Styled dropdown for payment status */}
                  <Form.Control
                    as="select"
                    value={lead.payment_status}
                    onChange={(e) => handleChangePaymentStatus(lead.id, e.target.value)}
                    className="payment-status-dropdown"
                  >
                    <option value="select">Select</option>
                    <option value="paid">Paid</option>
                    <option value="unpaid">Unpaid</option>
                  </Form.Control>


                </td>







                <td>
                  {/* Styled dropdown for lead status */}
                  <Form.Control
                    as="select"
                    value={lead.lead_status}
                    onChange={(e) => handleChangeLeadStatus(lead.id, e.target.value)}
                    className="lead-status-dropdown"
                  >
                    <option value="select">Select</option>
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Converted">Converted</option>
                    <option value="Dropped">Dropped</option>
                  </Form.Control>
                </td>

               
                <td>

                  <Button variant="outline-primary" size="sm" onClick={() => handleViewLeadDetails(lead)}>
                    <FaEye />
                  </Button>
                  <Button variant="outline-danger" size="sm" onClick={() => handleDeleteLead(lead.id)}>
                    <FaTrash />
                  </Button>
                  <Button variant="outline-success" size="sm" onClick={() => handleEditLead(lead)}>
                    <FaEdit />
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No leads found.</td>
            </tr>
          )}
        </tbody>


        
      </Table>
      {totalPages > 1 && (
        <nav className="mt-3">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
            </li>

            {[...Array(totalPages)].map((_, index) => (
              <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => setCurrentPage(index + 1)}>{index + 1}</button>
              </li>
            ))}

            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
            </li>
          </ul>
        </nav>
      )}

      {/* View Lead Details Modal */}
      <Modal show={showViewModal} onHide={handleCloseViewModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Lead Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedLead && (
            <div>
              <p><strong>Name:</strong> {selectedLead?.name}</p>
              <p><strong>Email:</strong> {selectedLead?.email}</p>
              <p><strong>Phone:</strong> {selectedLead?.phone}</p>
              <p><strong>counselor:</strong> {selectedLead?.counselor_name}</p>
              <p><strong>Follow-up Date:</strong> {selectedLead?.follow_up_date}</p>
              <p><strong>Source:</strong> {selectedLead?.source}</p>
              <p><strong>Status:</strong> {selectedLead?.status}</p>
              <p><strong>Preferred Countries:</strong> {selectedLead?.preferred_countries}</p>
              <p><strong>Notes:</strong> {selectedLead?.notes}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseViewModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add/Edit Lead Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{isEditMode ? "Edit Lead" : "Add New Lead"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSaveLead}>
            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter name"
                    name="name"
                    value={newLead.name}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </div>

              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter phone"
                    name="phone"
                    value={newLead.phone}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </div>

              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={newLead.email}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </div>

              {/* <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Counselor</Form.Label>
                  <Form.Select name="counselor" value={newLead.counselor} onChange={handleInputChange}>
                    <option value="">Select Counselor</option>
                    {counselors.length > 0 ? (
                      counselors.map((counselor) => (
                        <option key={counselor.id} value={counselor.id}>
                          {counselor.full_name}
                        </option>
                      ))
                    ) : (
                      <option disabled>No counselors available</option>
                    )}
                  </Form.Select>
                </Form.Group>

              </div> */}

              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Follow-up Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="follow_up_date"
                    value={newLead.follow_up_date}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </div>

              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Source</Form.Label>
                  <Form.Select
                    name="source"
                    value={newLead.source}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Source</option>
                    <option value="Website">Website</option>
                    <option value="Office Visit">Office Visit</option>
                    <option value="Phone Call">Phone Call</option>
                    <option value="Email Inquiry">Email Inquiry</option>
                    <option value="Social Media">Social Media</option>
                  </Form.Select>
                </Form.Group>
              </div>

              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    name="status"
                    value={newLead.status}
                    onChange={handleInputChange}
                  >
                    <option value="">Select status</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Pending">Pending</option>
                  </Form.Select>
                </Form.Group>
              </div>

              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Preferred Countries</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter preferred countries"
                    name="preferred_countries"
                    value={newLead.preferred_countries}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </div>

              <div className="col-12">
                <Form.Group className="mb-3">
                  <Form.Label>Notes</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter notes"
                    name="notes"
                    value={newLead.notes}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </div>
            </div>
            <div className="d-flex justify-content-end">
              <Button variant="danger" onClick={handleCloseModal}>Cancel</Button>
              <Button variant="secondary" type="submit">
                {isEditMode ? "Update Lead" : "Add Lead"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>


      {/* invoice model */}
      <Modal show={showInvoiceModal} onHide={() => setShowInvoiceModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Generate Invoice for {selectedLeadForInvoice?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Payment Amount</Form.Label>
              <Form.Control
                type="number"
                name="paymentAmount"
                value={paymentAmount}
                onChange={handleInvoiceInputChange}
                placeholder="Enter payment amount"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tax (%)</Form.Label>
              <Form.Control
                type="number"
                name="tax"
                value={tax}
                onChange={handleInvoiceInputChange}
                placeholder="Enter tax percentage"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Payment Date</Form.Label>
              <Form.Control
                type="date"
                name="paymentDate"
                value={paymentDate}
                onChange={handleInvoiceInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Additional Notes</Form.Label>
              <Form.Control
                as="textarea"
                name="notes"
                value={notes}
                onChange={handleInvoiceInputChange}
                placeholder="Enter notes"
              />
            </Form.Group>

            <div>
              <h5>Invoice Summary</h5>
              <p>Payment Amount: ${paymentAmount}</p>
              <p>Tax ({tax}%): ${(paymentAmount * (tax / 100)).toFixed(2)}</p>
              <p>Total: ${total.toFixed(2)}</p>
            </div>

            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowInvoiceModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleGenerateInvoice}>
                Generate
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>

    </Container>
  );
};

export default LeadCouncelor;
