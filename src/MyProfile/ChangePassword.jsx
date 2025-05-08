import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Button, Alert, Card } from "react-bootstrap";
import api from "../interceptors/axiosInterceptor";

const ChangePassword = () => {
  const loginDetail = JSON.parse(localStorage.getItem("login_detail"));
  const userId = loginDetail?.id;

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChangePassword = async (e) => {
    e.preventDefault();

    // Validation
    if (!oldPassword || !newPassword || !confirmPassword) {
      setError("Please fill all fields.");
      setMessage("");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New Password and Confirm Password do not match.");
      setMessage("");
      return;
    }

    try {
      const response = await api.post(`auth/changePassword/${userId}`,
        {
          password: oldPassword,
          newPassword: newPassword,
        }
      );

      if (response.data.success) {
        setMessage("Password changed successfully.");
        setError("");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setError(response.data.message || "Something went wrong.");
        setMessage("");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error changing password.");
      setMessage("");
    }
  };

  return (
    <Container className="mt-5">
      <Card className="shadow-lg rounded-4 p-4">
        <h4 className="text-center mb-4">Change Password</h4>

        {message && <Alert variant="success">{message}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleChangePassword}>
          <Form.Group controlId="oldPassword" className="mb-3">
            <Form.Label>Old Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="newPassword" className="mb-3">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="confirmPassword" className="mb-4">
            <Form.Label>Confirm New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          <div className="text-center">
            <Button variant="primary" type="submit">
              Change Password
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default ChangePassword;
