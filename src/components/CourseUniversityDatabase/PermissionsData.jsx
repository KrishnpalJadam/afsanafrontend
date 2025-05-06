import React, { useState, useEffect } from "react";
import { Table, Form, Container } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";

// Feature modules (static across all roles)
const permissionsData = [
  { module: "Dashboard", features: ["Dashboard"] },
  { module: "Leads & inquiries", features: ["Contact", "Inquiry", "Lead", "Deal"] },
  { module: "Student Managenement", features: ["Student Details", "Student Admission", "Communication"] },
  { module: "Appication", features: ["Application Tracker", "Document Upload", "University Details", "Admission Decision"] },
  { module: "Communication", features: ["Follow Up", "Reminder"] },
  { module: "Tasks Management", features: ["Counselor", "Tasks", "Reminder"] },
  { module: "Roles Permission", features: ["Roles Permission"] },
  { module: "Reports & Analytics", features: ["Reports & Analytics"] },
  { module: "Payments & Invoices", features: ["Payments & Invoices"] },
  { module: "User Management", features: ["User Management"] },
  { module: "Settings", features: ["Settings"] },
];

// Default permissions for each role
const roleDefaults = {
  "Super Admin": "all",
 
  "Counsellor": {
    "Student Managenement": ["view", "edit"],
    "Tasks Management": ["view", "add", "edit"],
  },
  
};

const PermissionsTable = () => {
  const { role } = useParams();
  const [permissions, setPermissions] = useState([]);

  // Load role-based permissions on mount
  useEffect(() => {
    const defaults = roleDefaults[role];

    const updated = permissionsData.map((mod) => {
      return {
        module: mod.module,
        features: mod.features.map((feat) => {
          const perms = { name: feat, view: false, add: false, edit: false, delete: false };

          if (defaults === "all") {
            return { ...perms, view: true, add: true, edit: true, delete: true };
          }

          const access = defaults?.[mod.module] || [];
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
    console.log("Saved Permissions for", role);
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
        <button  className="btn btn-dark" style={{ border: "none" }} onClick={handleSave}>
          Save Permissions
        </button>
      </div>
    </Container>
  );
};

export default PermissionsTable;
