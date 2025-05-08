import React, { useState } from "react";
import { saveAs } from "file-saver";
import Papa from "papaparse";

import {
  Container,
  Table,
  Card,
  Button,
  Modal,
  Form,
  Badge,
  InputGroup,
  Pagination,
} from "react-bootstrap";

const AdminSupportInbox = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul@example.com",
      subject: "Visa Query",
      message: "What are the documents required for visa?",
      date: "2025-04-07",
      status: "unread",
    },
    {
      id: 2,
      name: "Neha Verma",
      email: "neha@example.com",
      subject: "Offer Letter Delay",
      message: "Submitted documents, no response yet.",
      date: "2025-04-06",
      status: "read",
    },
    {
      id: 3,
      name: "Aman Gupta",
      email: "aman@example.com",
      subject: "Application Fee Doubt",
      message: "Can I pay after deadline?",
      date: "2025-04-05",
      status: "unread",
    },
    {
      id: 4,
      name: "Tina Mehra",
      email: "tina@example.com",
      subject: "Admission Status",
      message: "Still waiting for status update.",
      date: "2025-04-04",
      status: "read",
    },
    {
      id: 5,
      name: "Ravi Mehra",
      email: "ravi@example.com",
      subject: "IELTS Required?",
      message: "Is IELTS compulsory for UK program?",
      date: "2025-04-03",
      status: "read",
    },
  ]);

  const [search, setSearch] = useState("");
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [selectedMsg, setSelectedMsg] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [replyHistory, setReplyHistory] = useState([]);
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  const itemsPerPage = 3;

  const handleView = (msg) => {
    setSelectedMsg(msg);
    setShowMessageModal(true);
    setMessages(
      messages.map((m) => (m.id === msg.id ? { ...m, status: "read" } : m))
    );
  };

  const handleReply = (msg) => {
    setSelectedMsg(msg);
    setReplyText("");
    setShowReplyModal(true);
  };

  const handleSendReply = () => {
    const newReply = {
      email: selectedMsg.email,
      name: selectedMsg.name,
      subject: selectedMsg.subject,
      reply: replyText,
      date: new Date().toLocaleString(),
    };
    setReplyHistory([...replyHistory, newReply]);
    alert(`Reply sent to ${selectedMsg.email}`);
    setShowReplyModal(false);
  };
  const handleExportCSV = () => {
    const csv = Papa.unparse(messages);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "support_messages.csv");
  };

  const filteredMessages = messages.filter(
    (msg) =>
      msg.name.toLowerCase().includes(search.toLowerCase()) ||
      msg.email.toLowerCase().includes(search.toLowerCase()) ||
      msg.subject.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredMessages.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentMessages = filteredMessages.slice(indexOfFirst, indexOfLast);

  const handlePageChange = (number) => {
    setCurrentPage(number);
  };

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="mb-4">Support Inbox</h3>

        <div>
          <Button
            className="me-2"
            variant="outline-primary"
            onClick={handleExportCSV}
          >
            Export CSV
          </Button>
          <Button
            variant="outline-dark"
            onClick={() => setShowHistoryModal(true)}
          >
            View Reply History
          </Button>
        </div>
      </div>

      <Card className="mb-3">
        <Card.Body>
          <InputGroup>
            <Form.Control
              placeholder="Search by name, email or subject"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1); // reset page
              }}
            />
          </InputGroup>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Student</th>
                <th>Email</th>
                <th>Subject</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentMessages.length > 0 ? (
                currentMessages.map((msg, index) => (
                  <tr key={msg.id}>
                    <td>{indexOfFirst + index + 1}</td>
                    <td>{msg.name}</td>
                    <td>{msg.email}</td>
                    <td>{msg.subject}</td>
                    <td>{msg.date}</td>
                    <td>
                      <Badge
                        bg={msg.status === "read" ? "secondary" : "primary"}
                      >
                        {msg.status}
                      </Badge>
                    </td>
                    <td>
                      <Button
                        size="sm"
                        className="me-2"
                        variant="info"
                        onClick={() => handleView(msg)}
                      >
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="success"
                        onClick={() => handleReply(msg)}
                      >
                        Reply
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    No messages found.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination className="justify-content-end">
              {[...Array(totalPages)].map((_, i) => (
                <Pagination.Item
                  key={i + 1}
                  active={i + 1 === currentPage}
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          )}
        </Card.Body>
      </Card>

      {/* View Modal */}
      <Modal
        show={showMessageModal}
        onHide={() => setShowMessageModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>View Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedMsg && (
            <>
              <p>
                <strong>Name:</strong> {selectedMsg.name}
              </p>
              <p>
                <strong>Email:</strong> {selectedMsg.email}
              </p>
              <p>
                <strong>Subject:</strong> {selectedMsg.subject}
              </p>
              <hr />
              <p>{selectedMsg.message}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowMessageModal(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Reply Modal */}
      <Modal
        show={showReplyModal}
        onHide={() => setShowReplyModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Reply to Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>To</Form.Label>
              <Form.Control
                type="email"
                value={selectedMsg?.email || ""}
                readOnly
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Your Reply</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type your reply..."
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowReplyModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleSendReply}>
            Send Reply
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showHistoryModal}
        onHide={() => setShowHistoryModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Reply History Log</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {replyHistory.length > 0 ? (
            <Table bordered hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Student</th>
                  <th>Email</th>
                  <th>Subject</th>
                  <th>Reply</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {replyHistory.map((r, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{r.name}</td>
                    <td>{r.email}</td>
                    <td>{r.subject}</td>
                    <td>{r.reply}</td>
                    <td>{r.date}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>No replies yet.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowHistoryModal(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminSupportInbox;
