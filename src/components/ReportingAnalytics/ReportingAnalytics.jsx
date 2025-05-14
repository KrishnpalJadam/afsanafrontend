import React, { useEffect, useState } from "react";
import { Container, Table, Button, Card, Form, Row, Col, Pagination } from "react-bootstrap";
import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";
import BASE_URL from "../../Config";
import api from "../../interceptors/axiosInterceptor";

const AdminPayments = () => {
  const [search, setSearch] = useState("");
  const [branchFilter, setBranchFilter] = useState("");
  const [countryFilter, setCountryFilter] = useState("");
  const [paymentMethodFilter, setPaymentMethodFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [payments, setPayments] = useState([]);

  const fetchPayments = async () => {
    try {
      const response = await api.get(`${BASE_URL}payments`);
      if (response?.data) {
        setPayments(response.data);
      }
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const deletePayment = async (id) => {
    if (window.confirm("Are you sure you want to delete this payment?")) {
      try {
        await api.delete(`${BASE_URL}payments/${id}`);
        fetchPayments(); // Refresh list after deletion
      } catch (error) {
        console.error("Error deleting payment:", error);
        alert("Failed to delete payment.");
      }
    }
  };
const generatePDF = () => {
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4"
  });

  doc.setFontSize(16);
  doc.text("Student Payments", 14, 15);

  const tableColumn = [
    "#", "Student", "Email", "Branch", "Whatsapp", "Group Name",
    "University", "Country", "Payment Method", "Payment Type",
    "Proof", "Assistant", "Date"
  ];

  const data = currentItems.map((item, index) => [
    indexOfFirstItem + index + 1,
    item.name,
    item.email,
    item.branch_name,
    item.whatsapp,
    item.group_name,
    item.university_other || item.universityName,
    item.country_other || item.country,
    item.payment_method_other || item.payment_method,
    item.payment_type_other || item.payment_type,
    item.file?.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? "Image" : "View File",
    item.assistant,
    new Date(item.created_at).toLocaleDateString(),
  ]);

  autoTable(doc, {
    head: [tableColumn],
    body: data,
    startY: 22,
    styles: {
      fontSize: 8, // 👈 chhota font size
      cellPadding: 1.5, // 👈 kam padding
      overflow: 'linebreak',
    },
    headStyles: {
      fillColor: [41, 128, 185],
      textColor: [255, 255, 255],
      fontSize: 9, // 👈 header ka font bhi thoda chhota
      halign: 'center',
    },
    columnStyles: {
      0: { cellWidth: 8 },
      1: { cellWidth: 22 },
      2: { cellWidth: 32 },
      3: { cellWidth: 18 },
      4: { cellWidth: 25 },
      5: { cellWidth: 22 },
      6: { cellWidth: 30 },
      7: { cellWidth: 22 },
      8: { cellWidth: 30 },
      9: { cellWidth: 25 },
      10: { cellWidth: 16 },
      11: { cellWidth: 22 },
      12: { cellWidth: 18 },
    },
    margin: { top: 20 },
  });

  doc.save("customer-list.pdf");
};

  
  const filteredPayments = payments
    .filter(
      (item) =>
        item?.name?.toLowerCase().includes(search.toLowerCase()) ||
        item?.email?.toLowerCase().includes(search.toLowerCase())
    )
    .filter((item) => branchFilter === "" || item.branch_name === branchFilter)
    .filter(
      (item) =>
        countryFilter === "" ||
        item.country === countryFilter ||
        item.country_other === countryFilter
    )
    .filter(
      (item) =>
        paymentMethodFilter === "" ||
        item.payment_method === paymentMethodFilter ||
        item.payment_method_other === paymentMethodFilter
    );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPayments.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);

  return (
    <Container className="mt-4">
      <div className="d-flex p-3 justify-content-between flex-wrap gap-2">
        <h3 className="mb-4">Admin - All Student Payments</h3>
        <Button variant="success" onClick={generatePDF}>Download as PDF</Button>
      </div>

      <Card className="mb-3">
        <Card.Body>
          <Row className="g-3">
            <Col md={3}>
              <Form.Group>
                <Form.Label>Search by Name / Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name or email"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Filter by Branch</Form.Label>
                <Form.Select
                  value={branchFilter}
                  onChange={(e) => setBranchFilter(e.target.value)}
                >
                  <option value="">All Branches</option>
                  <option>Dhaka</option>
                  <option>Sylhet</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Filter by Country</Form.Label>
                <Form.Select
                  value={countryFilter}
                  onChange={(e) => setCountryFilter(e.target.value)}
                >
                  <option value="">Select Country</option>
                  <option>Hungary</option>
                  <option>Cyprus</option>
                  <option>Malaysia</option>
                  <option>Denmark</option>
                  <option>UK</option>
                  <option>Australia</option>
                  <option>Netherlands</option>
                  <option>Canada</option>
                  <option>Malta</option>
                  <option>Lithuania</option>
                  <option>Germany</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Filter by Payment Method</Form.Label>
                <Form.Select
                  value={paymentMethodFilter}
                  onChange={(e) => setPaymentMethodFilter(e.target.value)}
                >
                  <option value="">Select Payment Method</option>
                  <option>Bkash</option>
                  <option>Bank Transfer</option>
                  <option>Cash</option>
                  <option>Bank Deposit</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
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
                <th>Branch</th>
                <th>Whatsapp</th>
                <th>Group Name</th>
                <th>University</th>
                <th>Country</th>
                <th>Payment Method</th>
                <th>Payment Type</th>
                <th>Proof</th>
                <th>Assistant</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={item.id}>
                  <td>{indexOfFirstItem + index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.branch_name}</td>
                  <td>{item.whatsapp}</td>
                  <td>{item.group_name}</td>
                  <td>{item.university_other || item.universityName}</td>
                  <td>{item.country_other || item.country}</td>
                  <td>{item.payment_method_other || item.payment_method}</td>
                  <td>{item.payment_type_other || item.payment_type}</td>
                  <td>
                    {item.file?.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                      <img
                        style={{ width: "100px", height: "100px" }}
                        src={item.file}
                        alt=""
                        crossorigin=""
                      />
                    ) : (
                      <a
                        href={item.file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-primary"
                      >
                        View File
                      </a>
                    )}
                  </td>
                  <td>{item.assistant}</td>
                  <td>{new Date(item.created_at).toLocaleDateString()}</td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => deletePayment(item.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
              {currentItems.length === 0 && (
                <tr>
                  <td colSpan="14" className="text-center">No records found.</td>
                </tr>
              )}
            </tbody>
          </Table>

          {totalPages > 1 && (
            <Pagination className="justify-content-end">
              {[...Array(totalPages)].map((_, page) => (
                <Pagination.Item
                  key={page}
                  active={page + 1 === currentPage}
                  onClick={() => setCurrentPage(page + 1)}
                >
                  {page + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AdminPayments;
