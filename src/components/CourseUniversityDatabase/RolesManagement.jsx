import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,
  Form,
  Button,
  Container,
  Row,
  Col,
  InputGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { TagFill, TrashFill } from "react-bootstrap-icons";

const RolesManagement = () => {
  const [roles, setRoles] = useState([
    { name: "Super Admin", type: "System" },
    { name: "Admin", type: "System" },
    { name: "Manager", type: "System" },
    { name: "Assistant Manager", type: "System" },
    { name: "Admission Officer", type: "Customer" },
    { name: "Accounts Officer", type: "Customer" },
    { name: "Counsellor", type: "Customer" },
    { name: "Lead Generation Manager", type: "Customer" },
    { name: "Lead Generator", type: "Customer" },
    { name: "Student", type: "Customer" },
  ]);

  const [newRole, setNewRole] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddRole = () => {
    if (newRole.trim() !== "") {
      setRoles([...roles, { name: newRole.trim(), type: "Customer" }]);
      setNewRole("");
    }
  };

  const handleDeleteRole = (index) => {
    setRoles(roles.filter((_, i) => i !== index));
  };

  const filteredRoles = roles.filter((role) =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container className="p-4">
      <Row>
        {/* Left Side - Role Form */}
        <Col md={4} sm={12} className="mb-3">
          <h4>Create Role</h4>
          <Form>
            <Form.Group controlId="roleName">
              <Form.Label>
                Name <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                placeholder="Enter role name"
                className="mb-3"
              />
            </Form.Group>
            <Button
              className="w-100"
              variant="secondary"
              onClick={handleAddRole}
              style={{ border: "none" }}
            >
              Save Role
            </Button>
          </Form>
        </Col>

        {/* Right Side - Role List */}
        <Col md={8} sm={12}>
          <h4>Manage Roles</h4>
          <InputGroup className="mb-4">
            <Form.Control
              placeholder="Search roles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control-lg"
            />
          </InputGroup>

          <Table striped bordered hover responsive variant="light">
            <thead>
              <tr>
                <th>Role</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRoles.map((role, index) => (
                <tr key={index}>
                  <td>{role.name}</td>
                  <td>{role.type}</td>
                  <td>
                    <Link to={`/permissions/${encodeURIComponent(role.name)}`}>
                      <TagFill
                        className="text-dark me-2"
                        style={{ cursor: "pointer" }}
                      />
                    </Link>
                    <TrashFill
                      className="text-danger"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDeleteRole(index)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default RolesManagement;
