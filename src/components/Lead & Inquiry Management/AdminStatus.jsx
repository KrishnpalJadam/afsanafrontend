import React, { useState, useEffect } from "react";
import {
  Container,
  Button,
  Table,
  Form,
  Modal,
  Badge,
  InputGroup,
} from "react-bootstrap";
import { FaSearch, FaTrash } from "react-icons/fa";

import BASE_URL from "../../Config";
import api from "../../interceptors/axiosInterceptor";

const AdminStatus = () => {
  const [leads, setLeads] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterSource, setFilterSource] = useState("");
  const [filteredLeads, setFilteredLeads] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await api.get(`${BASE_URL}lead`);
        setLeads(response.data);
      } catch (error) {
        console.error("Error fetching leads:", error);
      }
    };
    fetchLeads();
  }, []);

  const handleFilter = () => {
    const filtered = leads.filter((lead) => {
      const statusMatch = filterStatus === "" || lead.status === filterStatus;
      const sourceMatch = filterSource === "" || lead.source === filterSource;
      const searchMatch =
        searchTerm === "" ||
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.phone?.toLowerCase().includes(searchTerm.toLowerCase());
      return statusMatch && sourceMatch && searchMatch;
    });
    setFilteredLeads(filtered);
    setCurrentPage(1); // Reset to first page on filter
  };

  const handleResetFilter = () => {
    setFilterStatus("");
    setFilterSource("");
    setSearchTerm("");
    setFilteredLeads(null);
    setCurrentPage(1);
  };

  const handleDeleteLead = async (leadId) => {
    try {
      await api.delete(`${BASE_URL}lead/${leadId}`);
      setLeads(leads.filter((lead) => lead.id !== leadId));
    } catch (error) {
      console.error("Error deleting lead:", error);
    }
  };

  const displayLeads = filteredLeads !== null ? filteredLeads : leads;

  // Pagination calculations
  const indexOfLastLead = currentPage * itemsPerPage;
  const indexOfFirstLead = indexOfLastLead - itemsPerPage;
  const currentLeads = displayLeads.slice(indexOfFirstLead, indexOfLastLead);
  const totalPages = Math.ceil(displayLeads.length / itemsPerPage);

  return (
    <Container fluid className="py-3">
      <h2>Admin Panel - All Leads</h2>

      <div className="d-flex justify-content-between mb-3 pt-3">
        <div className="d-flex gap-2">
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
          <Button variant="outline-secondary" onClick={handleFilter}>
            Apply Filters
          </Button>
          <Button variant="outline-secondary" onClick={handleResetFilter}>
            Reset Filters
          </Button>
        </div>
      </div>

      <Table striped bordered hover className="text-center">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Contact</th>
            <th>Asign Counselor</th>
            <th>Status</th>
            <th>Inquiry Date</th>
            <th>Follow up date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentLeads.length > 0 ? (
            currentLeads.map((lead, index) => (
              <tr key={lead.id}>
                <td>{indexOfFirstLead + index + 1}</td>
                <td>{lead?.name}</td>
                <td>{lead?.phone}</td>
                <td>{lead?.counselor_name || "Unassigned"}</td>
                <td>
                  <Badge bg={lead.status === "In Progress" ? "primary" : "success"}>
                    {lead?.status}
                  </Badge>
                </td>
                <td>{lead?.created_at}</td>
                <td>{lead?.follow_up_date}</td>
                <td>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDeleteLead(lead.id)}
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No leads found.</td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Pagination */}
      {totalPages > 1 && (
        <nav>
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>
                Previous
              </button>
            </li>
            {[...Array(totalPages)].map((_, index) => (
              <li
                key={index}
                className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
              >
                <button className="page-link" onClick={() => setCurrentPage(index + 1)}>
                  {index + 1}
                </button>
              </li>
            ))}
            <li
              className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
            >
              <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>
                Next
              </button>
            </li>
          </ul>
        </nav>
      )}
    </Container>
  );
};

export default AdminStatus;
