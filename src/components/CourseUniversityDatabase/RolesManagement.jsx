import React, { useEffect, useState } from "react";
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
    { name: "Counselor", type: "Customer" },
   
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
        

        {/* Right Side - Role List */}
        <Col md={12} sm={12}>
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
                    <button>
                      Select Role
                    <TagFill
                        className="text-dark ms-3 fs-5"
                        style={{ cursor: "pointer" }}
                      />
                    </button>
                    
                    </Link>
                   
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
