import React, { useEffect, useState } from "react";
import { Table, Button, Spinner } from "react-bootstrap";
import BASE_URL from "../Config";
import api from "../interceptors/axiosInterceptor";
import Swal from "sweetalert2";

const InquryTabledemo = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch data on component mount
  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const response = await api.get(`${BASE_URL}inquiries`);
      setInquiries(response.data);
    } catch (error) {
      console.error("Error fetching inquiries:", error);
      Swal.fire("Error", "Failed to fetch inquiries", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await api.delete(`${BASE_URL}inquiries/${id}`);
        Swal.fire("Deleted!", "The inquiry has been deleted.", "success");
        fetchInquiries();
      } catch (error) {
        console.error("Error deleting inquiry:", error);
        Swal.fire("Error", "Failed to delete inquiry", "error");
      }
    }
  };

  return (
    <div className="container mt-4">
      <h3>Inquiry List</h3>

      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" />
        </div>
      ) : (
        <Table bordered hover responsive className="mt-3">
          <thead>
            <tr>
              <th>Inquiry ID</th>
              <th>Full Name</th>
              <th>Inquiry Type</th>
              <th>Source</th>
              <th>Branch</th>
              <th>Phone</th>
              <th>Country</th>
              <th>Date of Inquiry</th>
              <th>Status</th>
              <th>Assigned To</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.length > 0 ? (
              inquiries.map((inquiry, index) => (
                <tr key={index}>
                  <td>{inquiry.inquiry_id || index + 1}</td>
                  <td>{inquiry.full_name}</td>
                  <td>{inquiry.inquiry_type}</td>
                  <td>{inquiry.source}</td>
                  <td>{inquiry.branch}</td>
                  <td>{inquiry.phone_number}</td>
                  <td>{inquiry.country}</td>
                  <td>{inquiry.date_of_inquiry}</td>
                  <td>{inquiry.status || "New"}</td>
                  <td>{inquiry.assigned_to || "-"}</td>
                  <td>
                    <Button variant="info" size="sm" className="me-1">
                      View
                    </Button>
                    <Button variant="warning" size="sm" className="me-1">
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(inquiry.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11" className="text-center">
                  No Inquiries Found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default InquryTabledemo;
