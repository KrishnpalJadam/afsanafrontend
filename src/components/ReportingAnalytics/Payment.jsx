import React, { useState, useEffect } from "react";
import {
  Container,
  Tab,
  Tabs,
  Table,
  Card,
  Button,
  Modal,
  Alert,
  Badge,
} from "react-bootstrap";
import api from "../../interceptors/axiosInterceptor";
import BASE_URL from "../../Config";
import jsPDF from "jspdf";
import { FaVolumeHigh } from "react-icons/fa6";
// import logo from "https://apply.studyfirstinfo.com/img/logo.png";
const Payment = () => {
  const [key, setKey] = useState("due");
  const [showModal, setShowModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [payments, setPayments] = useState([]);
  const [dedline, setdedline] = useState([]);

  const [studentFees, setStudentFees] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Static data for Upcoming Deadlines tab
const [paidTransactions, setpaidTransactions] = useState([]);

  const user = JSON.parse(localStorage.getItem("login_detail"));
  const studentId = localStorage.getItem("student_id")
  const userId = localStorage.getItem("user_id")
 
  const fetchPayments = async () => {
    try {
      const response = await api.get(`${BASE_URL}paymentsbyid/${studentId}`);

      if (response?.data) {
        const filterPay = response?.data?.filter((res) => res.payment_status !== "paid")
        setPayments(response?.data);
        setpaidTransactions(filterPay)
      }
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
  };


const statusUpdate = async (payment) => {
  try {
    await api.patch(`${BASE_URL}payment_status/${payment.id}`, {
      payment_status: "paid",
    });

    // Move to paid list
    setPayments((prev) => [
      ...prev,
      {
        ...payment,
        updated_at: new Date().toISOString(), // update paid date
      },
    ]);

    // Remove from due (unpaid) list
    setPaidTransactions((prev) =>
      prev.filter((item) => item.id !== payment.id)
    );

    alert("✅ Payment status updated successfully!");
  } catch (error) {
    console.error(error);
    alert("❌ Failed to update payment status.");
  }
};



  useEffect(() => {
    if (user?.email) fetchPayments(user.email);
  }, [user?.email]);

  // Helper function for countdown (example)
  const getCountdown = (deadline) => {
    const now = new Date();
    const end = new Date(deadline);
    const diff = end - now;

    if (diff <= 0) return "Deadline passed";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);

    return `${days}d ${hours}h ${minutes}m left`;
  };

  // Generate and download the receipt PDF
  const handleDownload = (item) => {
    const doc = new jsPDF();

    // Set up the logo
    // doc.addImage("https://apply.studyfirstinfo.com/img/logo.png", 10, 10, 50, 30);

    // Set up the title and invoice details
    doc.setFontSize(16);
    doc.text("Invoice", 100, 20);

    doc.setFontSize(12);
    doc.text(`Invoice Number: ${item.id}`, 10, 50);
    doc.text(`Student Name: ${item.name}`, 10, 60);
    doc.text(`Email: ${item.email}`, 10, 70);
    doc.text(`Amount: $${item.total}`, 10, 80);
    doc.text(`Payment Method: ${item.payment_method}`, 10, 90);
    doc.text(`Payment Date: ${new Date(item.payment_date).toLocaleDateString()}`, 10, 100);
    doc.text(`Notes: ${item.additional_notes}`, 10, 110);

    // Add a footer or additional information
    doc.text("Thank you for your payment!", 10, 130);

    // Save the PDF
    doc.save(`Invoice_${item.id}.pdf`);
  };

 
 useEffect(() => {
  const fetchStudentFees = async () => {
    try {
      const response = await api.get(`getStudentFeesByUser/${studentId}`);
      console.log("Student Fees Data:", response); // Log the response data to console
      setStudentFees(response.data); // Update the state with the fetched data
    } catch (err) {
      setError(err.message);
      console.error("Error fetching student fees:", err); // Log the error to console
    } finally {
      setLoading(false);
    }
  };

  fetchStudentFees();
}, []); // Empty array ensures it runs only once when the component mounts

  if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;

  return (
    <Container className="mt-4">


      <Card>
        <Card.Body>
          <h4 className="mb-4">Create new payment</h4>
          <Tabs
            id="payment-tabs"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
          >
            {/* Due Payments Tab */}
            <Tab eventKey="due" title="Payments">
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Email</th>
                    <th>Description</th>

                    <th>Amount</th>
                    <th>Due Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paidTransactions?.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item?.email}</td>
                      <td>{item?.additional_notes}</td>

                      <td>${item?.total}</td>
                      <td>{item?.payment_date}</td>
                      <td>
                        {/* <button className="btn btn-primary me-3">View Details</button> */}
                        <button
                          className="btn btn-success"
                          onClick={() => statusUpdate(item)}
                        >
                          Pay now
                        </button>

                      </td>


                    </tr>
                  ))}
                </tbody>
              </Table>
            </Tab>

            {/* Paid Transactions Tab */}
            <Tab eventKey="paid" title="Paid Transactions">
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Paid On</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((item, index) => (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.additional_notes}</td>
                      <td>${item.total}</td>
                <td>{new Date(item.updated_at).toDateString()}</td>

                      <td>
                        <Button variant="info" size="sm" onClick={() => handleDownload(item)}>
                          Download Receipt
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Tab>

       

          </Tabs>
        </Card.Body>
      </Card>





      {/* Pay Now Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPayment && (
            <>
              <p>
                <strong>Description:</strong> {selectedPayment.description}
              </p>
              <p>
                <strong>Amount:</strong> {selectedPayment.amount}
              </p>
              <p>
                <strong>Due Date:</strong> {selectedPayment.dueDate}
              </p>
              <hr />
              <p>Proceed to payment gateway?</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button
            variant="success"
            onClick={() => {
              setShowModal(false);
              alert("Payment successful!");
            }}
          >
            Pay Now
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Payment;
