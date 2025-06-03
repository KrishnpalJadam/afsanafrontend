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
} from "react-bootstrap";
import api from "../../interceptors/axiosInterceptor";
import BASE_URL from "../../Config";

const Payment = () => {
  const [key, setKey] = useState("due");
  const [showModal, setShowModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [payments, setPayments] = useState([]);
  const [dedline, setdedline] = useState([]);
  const [paidTransactions, setpaidTransactions] = useState([]);

  // Static data for Upcoming Deadlines tab

  const user = JSON.parse(localStorage.getItem("login_detail"));
  const studentId = localStorage.getItem("student_id")
  console.log(studentId)
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
      // Backend patch call
      console.log("payment", payment)
      await api.patch(`${BASE_URL}payment_status/${payment.id}`, {
        payment_status: "paid",
      });


      setPaidTransactions((prev) => [
        ...prev,
        {
          id: payment.id,
          description: payment.additional_notes || "Payment",
          amount: `$${payment.total}`,
          paidOn: new Date().toLocaleDateString(),
        },
      ]);

      alert("Payment status updated to Paid.");
    } catch (error) {
      console.error(error);
      alert("Failed to update payment status.");
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

  // Dummy handler for download button
  const handleDownload = (item) => {
    alert(`Downloading receipt for: ${item.description}`);
  };

  return (
    <Container className="mt-4">
      <h3 className="mb-4">Payments & Transactions</h3>

      <Card>
        <Card.Body>
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

                      <td>{item?.total}</td>
                      <td>{item?.payment_date}</td>
                      <td>
                        <button className="btn btn-primary me-3">View Details</button>
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
                      <td>{item.total}</td>
                      <td>{new Date(item.updated_at).toDateString()}</td>
                      <td>
                        <Button
                          variant="info"
                          size="sm"
                          onClick={() => handleDownload(item)}
                        >
                          Download Receipt
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Tab>

            {/* Upcoming Deadlines Tab */}
            <Tab eventKey="upcoming" title="Upcoming Deadlines">
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Task</th>
                    <th>Deadline</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                 {payments
  .filter(
    (item) =>
      new Date(item.payment_date) > new Date(item.created_at) && // payment_date created_at se badh
      item.payment_status !== "paid" // status paid nahi hona chahiye
  )
  .map((item, index) => (
    <tr key={index}>
      <td>{item.id}</td>
      <td>{item.additional_notes}</td>
      <td>{new Date(item.payment_date).toLocaleString()}</td>
      <td>
        <Alert variant="warning" className="mb-0 py-1 px-2">
          {getCountdown(item.payment_date)}
        </Alert>
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
