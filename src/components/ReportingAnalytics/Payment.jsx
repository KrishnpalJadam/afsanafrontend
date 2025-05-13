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
import { hasPermission } from "../../authtication/permissionUtils";
import api from "../../interceptors/axiosInterceptor";
import BASE_URL from "../../Config";

const Payment = () => {
  const [key, setKey] = useState("due");
  const [showModal, setShowModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [payments, setPayments] = useState([])

  const duePayments = [
    {
      id: 1,
      description: "Tuition Fee - Semester 1",
      amount: "$1,200",
      dueDate: "2025-06-15",
    },
    {
      id: 2,
      description: "Application Processing Fee",
      amount: "$150",
      dueDate: "2025-06-30",
    },
  ];

  const paidTransactions = [
    {
      id: 1,
      description: "Registration Fee",
      amount: "$100",
      paidOn: "2025-04-01",
    },
    {
      id: 2,
      description: "Library Deposit",
      amount: "$50",
      paidOn: "2025-04-05",
    },
  ];

  const upcomingDeadlines = [
    { id: 1, task: "Pay Visa Fee", deadline: "2025-07-01" },
    { id: 2, task: "Pay Hostel Fee", deadline: "2025-08-01" },
  ];

  const handlePayNow = (payment) => {
    setSelectedPayment(payment);
    setShowModal(true);
  };

  const handleDownload = (item) => {
    alert(`Receipt downloaded for: ${item.description}`);
  };

  const getCountdown = (deadline) => {
    const now = new Date();
    const target = new Date(deadline);
    const diff = target - now;
    if (diff <= 0) return "⚠️ Deadline passed";
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return `⏳ ${days} day(s) remaining`;
  };
  const user = JSON.parse(localStorage.getItem("login_detail"))
  const fetchPayments = async (email) => {
    try {
      const response = await api.get(`${BASE_URL}payments/${email}`);
      if (response?.data) {
        setPayments(response.data); // Storing the fetched payments in the state
      }
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
  };


  useEffect(() => {
    fetchPayments(user?.email);
  }, []);
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
            <Tab eventKey="due" title="Due Payments">
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Student</th>
                    <th>Email</th>
                    <th>university</th>
                    <th>Country</th>
                    <th>Payment method</th>
                    {/* <th>Amount</th> */}
                    {/* <th>Due Date</th> */}
                    <th>Payment Proof</th>
                  </tr>
                </thead>
                <tbody>
                  {payments?.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item?.name}</td>
                      <td>{item?.email}</td>
                      <td>{item?.university}</td>
                      <td>{item?.country}</td>
                      <td>{item?.payment_method}</td>

                      {/* <td>{item?.amount}</td>
                      <td>{item?.dueDate}</td> */}
                      <td>
                        {item.photo?.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                          <img
                            style={{ width: "100px", height: "100px" }}
                            src={item.photo}
                            alt=""
                            crossOrigin=""
                          />
                        ) : (
                          <a
                            href={item.photo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-sm btn-primary"
                          >
                            View File
                          </a>
                        )}
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
                    <th>#</th>
                    <th>University	</th>
                    <th>Amount</th>
                    <th>Paid On</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paidTransactions.map((item, index) => (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.description}</td>
                      <td>{item.amount}</td>
                      <td>{item.paidOn}</td>
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
                  {upcomingDeadlines.map((item, index) => (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.task}</td>
                      <td>{item.deadline}</td>
                      <td>
                        <Alert variant="warning" className="mb-0 py-1 px-2">
                          {getCountdown(item.deadline)}
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
