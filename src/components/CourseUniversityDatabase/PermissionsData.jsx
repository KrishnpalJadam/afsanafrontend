import React, { useState, useEffect } from "react";
import { Table, Form, Container } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import api from "../../interceptors/axiosInterceptor";

// Permissions data for Student and Counselor
const permissionsDataStudent = [
  { module: "Dashboard", features: [{ name: "Dashboard" }] },
  { module: "Student Management", features: [{ name: "Student Details" }, { name: "Student Programs" }, { name: "Communication" }] },
  { module: "Application Management", features: [{ name: "Application Management" }] },
  { module: "Task Management", features: [{ name: "Task Management" }] },
  { module: "Payments & Invoices", features: [{ name: "Payments & Invoices" }] },
  { module: "Course & University", features: [{ name: "Course & University" }] },
];

const permissionsDataCounselor = [
  { module: "Dashboard", features: [{ name: "Dashboard" }] },
  { module: "Leads & Inquiries", features: [{ name: "Inquiry" }, { name: "Lead" }, { name: "Status" }, { name: "Task" }] },
  { module: "Student Management", features: [{ name: "Student Details" }, { name: "Communication" }] },
  { module: "Course & University", features: [{ name: "Course & University" }] },
];

const permissionsDataStaff = [
  { module: "Dashboard", features: [{ name: "Dashboard" }] },
  { module: "Leads & Inquiries", features: [{ name: "Inquiry" }, { name: "Lead" }, { name: "Status" }, { name: "Task" }] },
  { module: "Course & University", features: [{ name: "Course & University" }] },
];

const PermissionsTable = () => {
  const { role } = useParams(); // Get role from route
  const [permissions, setPermissions] = useState([]);
  const [roles, setRoles] = useState([]);

  // Load role-based permissions on mount
  useEffect(() => {
    let permissionsData;
    if (role === "Student") {
      permissionsData = permissionsDataStudent;
    } else if (role === "Counselor") {
      permissionsData = permissionsDataCounselor;
    } else if (role === "staff") {
      permissionsData = permissionsDataStaff;
    }

    // Fetch role-specific permissions from the backend
    const fetchPermissions = async () => {
      try {
        const response = await api.get(`permission?role_name=${role}`);
        const backendPermissions = response.data;

        // Map backend data to permissions structure
        const updatedPermissions = permissionsData.map((mod) => {
          return {
            module: mod.module,
            features: mod.features.map((feat) => {
              // Initialize permissions for the feature
              const perms = {
                name: feat.name,
                view: false,
                add: false,
                edit: false,
                delete: false,
                id: null,
              };

              // Find matching permission from backend data
              const matchedPermission = backendPermissions.find(
                (permission) => permission.permission_name === feat.name
              );

              if (matchedPermission) {
                perms.view = matchedPermission.view_permission === 1;
                perms.add = matchedPermission.add_permission === 1;
                perms.edit = matchedPermission.edit_permission === 1;
                perms.delete = matchedPermission.delete_permission === 1;
                perms.id = matchedPermission.id; // Store the permission ID
              }

              return perms;
            }),
          };
        });

        setPermissions(updatedPermissions);
      } catch (error) {
        console.error("Error fetching permissions:", error);
      }
    };

    fetchPermissions();
  }, [role]);

  const handleCheckboxChange = async (moduleIndex, featureIndex, permissionType) => {
    const updatedPermissions = [...permissions];
    const feature = updatedPermissions[moduleIndex].features[featureIndex];
    const newValue = !feature[permissionType];
    feature[permissionType] = newValue;

    setPermissions(updatedPermissions);

    // Prepare the updated permissions data
    const permissionData = {
      view_permission: feature.view,
      add_permission: feature.add,
      edit_permission: feature.edit,
      delete_permission: feature.delete,
    };

    // Send the updated permission to the backend
    try {
      await api.put(`/permission/${feature.id}`, permissionData);
      console.log(`Permission for ${feature.name} updated successfully.`);
    } catch (error) {
      console.error("Error updating permission:", error);
      // If the update fails, revert the change
      feature[permissionType] = !newValue;
      setPermissions(updatedPermissions);
    }
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
    </Container>
  );
};

export default PermissionsTable;
