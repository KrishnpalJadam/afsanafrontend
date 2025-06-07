
import React, { useEffect, useState } from "react";
import {
  Container,
  Table,
  Button,
  Card,
  Form,
  Row,
  Col,
  Pagination,
  Modal,
} from "react-bootstrap";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import BASE_URL from "../../Config";
import api from "../../interceptors/axiosInterceptor";

const AdminPayments = () => {
  const [search, setSearch] = useState("");
  const [branchFilter, setBranchFilter] = useState("");
  const [countryFilter, setCountryFilter] = useState("");
  const [paymentMethodFilter, setPaymentMethodFilter] = useState("");
  const [paymentTypeFilter, setPaymentTypeFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [payments, setPayments] = useState([]);

  // Invoice modal state
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  // Invoice form fields
  const [paymentAmount, setPaymentAmount] = useState("");
  const [gstPercent, setGstPercent] = useState(0);
  const [taxPercent, setTaxPercent] = useState(0);
  const [paymentdate, setPaymentdate] = useState();
  const [discount, setDiscount] = useState(0);
  const [notes, setNotes] = useState("");


  const [showViewDetailsModal, setShowViewDetailsModal] = useState(false);
  const [viewDetailsData, setViewDetailsData] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [viewDetailsPaymentId, setViewDetailsPaymentId] = useState(null);



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

  // Open invoice modal and initialize invoice form
  const openInvoiceModal = (payment) => {

    setSelectedPayment(payment);
    console.log(payment)
    // Set default values or from payment    
    setPaymentAmount(payment.payment_amount || "");
    setGstPercent(0);
    setTaxPercent(0);
    setDiscount(0);
    setPaymentdate('')
    setNotes("");
    setShowInvoiceModal(true);
  };

  // Close invoice modal
  const closeInvoiceModal = () => {
    setShowInvoiceModal(false);
    setSelectedPayment(null);
  };

  // Calculate totals for invoice
  const calculateTotals = () => {
    const amt = parseFloat(paymentAmount) || 0;
    const gstAmount = (amt * (parseFloat(gstPercent) || 0)) / 100;
    const taxAmount = (amt * (parseFloat(taxPercent) || 0)) / 100;
    const disc = parseFloat(discount) || 0;
    const total = amt + gstAmount + taxAmount - disc;
    return { amt, gstAmount, taxAmount, disc, total };
  };

  // Generate PDF invoice
 const generateInvoicePDF = async () => {
  if (!selectedPayment) return;
  console.log("selectedPayment", selectedPayment)
  try {
    // Prepare payload  
    const { amt, gstAmount, taxAmount, disc, total } = calculateTotals();

    const payload = {
      payment_amount: amt.toString(),
      tax: taxAmount.toString(),
      total: total.toString(),
      additional_notes: notes,  
      payment_date: paymentdate,
      student_id: selectedPayment?.student_id || "", // Ensure this is correctly passed
    };

    // API call to save invoice data
    const response = await api.post(`${BASE_URL}student_invoice`, payload);

    if (response.status === 200 || response.status === 201) {
      // Success - Ab PDF generate karo

      setPayments((prevPayments) =>
        prevPayments.map((p) =>
          p.id === selectedPayment.id ? { ...p, isInvoiceView: 1 } : p
        )
      );

      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.text("Invoice", 14, 22);

      // Student details
      doc.setFontSize(12);
      doc.text(`Student Name: ${selectedPayment.name}`, 14, 40);
      doc.text(`Email: ${selectedPayment.email}`, 14, 48);
      doc.text(`Payment Date: ${selectedPayment.payment_date}`, 14, 56);
      doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 64);

      // Invoice table data
      const invoiceTable = [
        ["Description", "Amount (in USD)"],
        ["Payment Amount", amt.toFixed(2)],
        ["Tax (" + taxPercent + "%)", taxAmount.toFixed(2)],
        ["Total Amount", total.toFixed(2)],
      ];

      autoTable(doc, {
        startY: 72,
        head: [invoiceTable[0]],
        body: invoiceTable.slice(1),
        theme: "grid",
        styles: { halign: "right" },
        headStyles: { fillColor: [41, 128, 185], textColor: 255 },
        columnStyles: {
          0: { halign: "left" },
        },
      });

      // Notes
      if (notes) {
        doc.text("Notes:", 14, doc.lastAutoTable.finalY + 12);
        doc.text(notes, 14, doc.lastAutoTable.finalY + 20);
      }

      doc.save(`Invoice_${selectedPayment.name}_${Date.now()}.pdf`);
      closeInvoiceModal();
    } else {
      alert("Invoice save failed. Please try again.");
    }
  } catch (error) {
    console.error("Error saving invoice:", error);
    alert("Something went wrong while saving the invoice.");
  }
};




  const openViewDetailsModal = async (studentId) => {
    setViewDetailsPaymentId(studentId);
    setShowViewDetailsModal(true);
    setLoadingDetails(true);
    try {
      const res = await api.get(`${BASE_URL}paymentsbyid/${studentId}`);
      setViewDetailsData(res.data);
    } catch (error) {
      console.error("Error fetching payment details:", error);
      alert("Failed to fetch payment details");
    }
    setLoadingDetails(false);
  };


  const closeViewDetailsModal = () => {
    setShowViewDetailsModal(false);
    setViewDetailsData(null);
    setViewDetailsPaymentId(null);
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
    )
    .filter(
      (item) =>
        paymentTypeFilter === "" || item.payment_type == paymentTypeFilter
    );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPayments.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);

  return (
    <Container className="mt-4">
      <div className="d-flex p-3 justify-content-between flex-wrap gap-2">
        <h3 className="mb-4">Admin - All Student Payments</h3>
        <Button variant="success" onClick={() => generatePDF()}>
          Download as PDF
        </Button>
      </div>

      {/* Filters Card (unchanged) */}
      {/* ... your existing filters card here ... */}
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
            <Col md={3}>
              <Form.Group>
                <Form.Label>Filter by Payment Type</Form.Label>
                <Form.Select
                  value={paymentTypeFilter}
                  onChange={(e) => setPaymentTypeFilter(e.target.value)}
                >
                  <option value="">Select Payment Type</option>
                  <option>File Opening Charge</option>
                  <option>Application Fee</option>
                  <option>After Offer Letter Charge</option>
                  <option>Insurance Fee</option>
                  <option>Bank Statement</option>
                  <option>After Visa</option>
                  <option>Accommodation</option>
                  <option>Other</option>
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
                <th>Invoice</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={item.id || index}>
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
                        crossOrigin=""
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
                  <td>
                    {item?.isInvoiceView === 1 ? (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => openViewDetailsModal(item.student_id)}
                      >
                        View invoice
                      </Button>
                    ) : (
                      <Button
                        variant="info"
                        size="sm"
                        onClick={() => openInvoiceModal(item)}
                      >
                        Create Invoice
                      </Button>
                    )}
                  </td>



                </tr>
              ))}
              {currentItems.length === 0 && (
                <tr>
                  <td colSpan="15" className="text-center">
                    No records found.
                  </td>
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

      {/* Invoice Modal */}
      <Modal show={showInvoiceModal} onHide={closeInvoiceModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Generate Invoice for {selectedPayment?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Group controlId="paymentAmount">
                  <Form.Label>Payment Amount</Form.Label>
                  <Form.Control
                    type="number"
                    min="0"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                    placeholder="Enter payment amount"
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="taxPercent">
                  <Form.Label>Tax (%)</Form.Label>
                  <Form.Control
                    type="number"
                    min="0"
                    value={taxPercent}
                    onChange={(e) => setTaxPercent(e.target.value)}
                    placeholder="Enter tax percentage"
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="paymentDate">
                  <Form.Label>Payment Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={paymentdate}
                    onChange={(e) => setPaymentdate(e.target.value)}
                    placeholder="Enter payment date"
                  />
                </Form.Group>
              </Col>
              {/* <Col md={6}>
                <Form.Group controlId="gstPercent">
                  <Form.Label>GST (%)</Form.Label>
                  <Form.Control
                    type="number"
                    min="0"
                    value={gstPercent}
                    onChange={(e) => setGstPercent(e.target.value)}
                    placeholder="Enter GST percentage"
                  />
                </Form.Group>
              </Col> */}
            </Row>
            <Row className="mb-3">

              {/* <Col md={6}>
                <Form.Group controlId="discount">
                  <Form.Label>Discount</Form.Label>
                  <Form.Control
                    type="number"
                    min="0"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    placeholder="Enter discount amount"
                  />
                </Form.Group>
              </Col> */}
            </Row>
            <Form.Group controlId="notes" className="mb-3">
              <Form.Label>Additional Notes</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Enter any notes or terms"
              />
            </Form.Group>
          </Form>
          <hr />
          <h5>Invoice Summary</h5>
          <p>Payment Amount: ${parseFloat(paymentAmount || 0).toFixed(2)}</p>
          {/* <p>GST ({gstPercent}%): ${((parseFloat(paymentAmount || 0) * gstPercent) / 100).toFixed(2)}</p> */}
          <p>Tax ({taxPercent}%): ${((parseFloat(paymentAmount || 0) * taxPercent) / 100).toFixed(2)}</p>
          {/* <p>Discount: -${parseFloat(discount || 0).toFixed(2)}</p> */}
          <hr />
          <h5>
            Total: $
            {(
              (parseFloat(paymentAmount || 0) +
                (parseFloat(paymentAmount || 0) * gstPercent) / 100 +
                (parseFloat(paymentAmount || 0) * taxPercent) / 100 -
                parseFloat(discount || 0)) || 0
            ).toFixed(2)}
          </h5>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeInvoiceModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={generateInvoicePDF}>
            Generate
          </Button>
        </Modal.Footer>
      </Modal>




      <Modal
        show={showViewDetailsModal}
        onHide={closeViewDetailsModal}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Invoice Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loadingDetails ? (
            <div>Loading...</div>
          ) : viewDetailsData && viewDetailsData.length > 0 ? (
            <div>
              <p><strong>Student Name:</strong> {viewDetailsData[0].name || "N/A"}</p>
              <p><strong>Email:</strong> {viewDetailsData[0].email || "N/A"}</p>
              <p><strong>Branch:</strong> {viewDetailsData[0].branch_name || "N/A"}</p>
              <p><strong>Payment Amount:</strong> ${viewDetailsData[0].payment_amount || "0"}</p>
              <p><strong>Tax:</strong> ${viewDetailsData[0].tax || "0"}</p>
              <p><strong>Total:</strong> ${viewDetailsData[0].total || "0"}</p>
              <p><strong>Additional Notes:</strong> {viewDetailsData[0].additional_notes || "N/A"}</p>
              <p><strong>Payment Date:</strong> {viewDetailsData[0].payment_date ? new Date(viewDetailsData[0].payment_date).toLocaleDateString() : "N/A"}</p>
            </div>
          ) : (
            <div>No data found.</div>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={closeViewDetailsModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

    </Container>
  );
};

export default AdminPayments;
