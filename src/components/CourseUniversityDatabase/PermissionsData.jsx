import React, { useState, useEffect } from "react";
import { Table, Form, Container } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";

// Feature modules (static across all roles)
const permissionsDataStudent = [
  { module: "Dashboard", features: ["Dashboard"] },
  { module: "Student Managenement", features: ["Student Details", "Student Programs", "Communication"] },
  { module: "Appication Managment", features: ["Appication Managment"] },
  { module: "Tasks Management", features: ["Tasks Management"] },
  { module: "Payments & Invoices", features: ["Payments & Invoices"] },
  { module: "Course & University", features: ["Course & University"] },
];
const permissionsDataCounselor = [
  { module: "Dashboard", features: ["Dashboard"] },
  { module: "Leads & Inquiries", features: ["Inquiry", "Lead", "Status", "Task"] },
  { module: "Student Managenement", features: ["Student Details", "Communication"] },
  { module: "Course & University", features: ["Course & University"] },
];

// Default permissions for each role
const roleDefaults = {
  "Counsellor": {
    "Student Managenement": ["view", "edit"],
    "Tasks Management": ["view", "add", "edit"],
  },
  "Student": {
    "Dashboard": ["view"],
    "Student Managenement": ["view"],
  },
};

const PermissionsTable = () => {
  const { role } = useParams();  // Get role from route
  const [permissions, setPermissions] = useState([]);

  // Load role-based permissions on mount
  useEffect(() => {
    let permissionsData;
    if (role === "Student") {
      permissionsData = permissionsDataStudent;  // Student data
    } else if (role === "Counsellor") {
      permissionsData = permissionsDataCounselor;  // Counselor data
    }

    const updated = permissionsData.map((mod) => {
      return {
        module: mod.module,
        features: mod.features.map((feat) => {
          const perms = { name: feat, view: false, add: false, edit: false, delete: false };

          // Check if role has full access to this module
          if (roleDefaults[role] === "all") {
            return { ...perms, view: true, add: true, edit: true, delete: true };
          }

          const access = roleDefaults[role]?.[mod.module] || [];
          access.forEach((type) => {
            perms[type] = true;
          });

          return perms;
        }),
      };
    });

    setPermissions(updated);
  }, [role]);

  const handleCheckboxChange = (moduleIndex, featureIndex, permissionType) => {
    const updatedPermissions = [...permissions];
    updatedPermissions[moduleIndex].features[featureIndex][permissionType] =
      !updatedPermissions[moduleIndex].features[featureIndex][permissionType];
    setPermissions(updatedPermissions);
  };

  const handleSave = () => {
    console.log(JSON.stringify(permissions, null, 2));
    alert("Permissions saved to console (mock). You can now integrate API.");
  };

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h2>Assign Permission for {role}</h2>
        <Link to="/RolesManagement" className="btn btn-secondary mb-3">
          Back to Roles
        </Link>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Module</th>
            <th>Feature</th>
            <th>View</th>
            <th>Add</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {permissions.map((module, moduleIndex) => (
            <React.Fragment key={moduleIndex}>
              <tr>
                <td rowSpan={module.features.length + 1}>
                  <strong>{module.module}</strong>
                </td>
              </tr>
              {module.features.map((feature, featureIndex) => (
                <tr key={featureIndex}>
                  <td>{feature.name}</td>
                  {["view", "add", "edit", "delete"].map((permType) => (
                    <td key={permType}>
                      <Form.Check
                        type="checkbox"
                        checked={feature[permType]}
                        onChange={() =>
                          handleCheckboxChange(moduleIndex, featureIndex, permType)
                        }
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </Table>

      <div className="d-flex justify-content-end">
        <button
          className="btn btn-dark"
          style={{ border: "none" }}
          onClick={handleSave}
        >
          Save Permissions
        </button>
      </div>
    </Container>
  );
};

export default PermissionsTable;
