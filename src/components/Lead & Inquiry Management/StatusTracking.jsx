import React, { useContext } from "react";
import { Table, Form, Container, Card, Button } from "react-bootstrap";
import { LeadContext } from "../../context/LeadContext";

const StatusTracking = () => {
  // Access leads & status update function from Context API
  const { leads, updateLeadStatus } = useContext(LeadContext);

  const statusOptions = ["New", "In Progress", "Converted", "Dropped"];

  return (
    <Container className="mt-4">
      <div className="d-flex  justify-content-between align-items-center mb-3">
        <h2 className="mb-3 mb-md-0">Lead Status</h2>
        <Button variant="outline-secondary">Export</Button>
      </div>
      <Card className="p-4 shadow-sm mb-4">
        <div className="table-responsive">
          <Table bordered hover className="text-center text-nowrap">
            <thead>
              <tr>
                <th>Lead Name</th>
                <th>Course Interested</th>
                <th>Assigned Counselor</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {leads.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center">
                    No assigned leads.
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id}>
                    <td>{lead.name}</td>
                    <td>{lead.course}</td>
                    <td>{lead.counselor}</td>
                    <td>
                      <Form.Select
                        value={lead.status}
                        onChange={(e) =>
                          updateLeadStatus(lead.id, e.target.value)
                        }
                      >
                        {statusOptions.map((status, index) => (
                          <option key={index} value={status}>
                            {status}
                          </option>
                        ))}
                      </Form.Select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </div>
      </Card>
    </Container>
  );
};

export default StatusTracking;
