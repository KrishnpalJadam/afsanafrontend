import React, { useContext } from "react";
import { Table, Container, Card, Button } from "react-bootstrap";
import { LeadContext } from "../../context/LeadContext";
import {
  FaSearch,
  FaExpand,
  FaList,
  FaCommentAlt,
  FaBell,
  FaUserPlus,
  FaPlus,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

const AdminStatus = () => {
  const { leads } = useContext(LeadContext);

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Admin Panel - All Leads</h2>
        <div className="d-flex flex-wrap gap-2">
          <Button variant="outline-secondary">Export</Button>
          <Button variant="outline-secondary">Import</Button>
        </div>
      </div>
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
        <div className="d-flex align-items-center flex-grow-1 me-3">
          <div className="input-group">
            <span className="input-group-text">
              <FaSearch />
            </span>
            <input
              type="text"
              placeholder="Search in table..."
              className="form-control"
            />
          </div>
        </div>
      </div>

      <Card className="p-4 shadow-sm mb-4">
        <div className="table-responsive">
          <Table className="text-center text-nowrap" striped bordered hover>
            <thead>
              <tr>
                <th>Lead Name</th>
                <th>Course Interested</th>
                <th>Assigned Counselor</th>
                <th>Status</th>
                <th>Inquiry Date</th>
                <th>Follow-Up Date</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id}>
                  <td>{lead.name}</td>
                  <td>{lead.course}</td>
                  <td>{lead.counselor}</td>
                  <td>{lead.status}</td>
                  <td>{lead.inquiryDate}</td>
                  <td>{lead.followUpDate}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Card>
    </Container>
  );
};

export default AdminStatus;
