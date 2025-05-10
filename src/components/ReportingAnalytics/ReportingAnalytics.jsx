// import React, { useState } from "react";
// import {
//   Container,
//   Row,
//   Col,
//   Card,
//   Table,
//   Badge,
//   Button,
//   Modal,
//   Form,
//   Tabs,
//   Tab,
//   Alert,
// } from "react-bootstrap";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import {
//   FaFileInvoice,
//   FaMoneyBillWave,
//   FaBell,
//   FaEnvelope,
//   FaFilter,
//   FaEdit,
//   FaTrash,
//   FaDownload,
// } from "react-icons/fa";

// const Payments = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [activeTab, setActiveTab] = useState("payments");
//   const [modalMode, setModalMode] = useState("add");
//   const [selectedPayment, setSelectedPayment] = useState(null);

//   // Sample data
//   const [payments, setPayments] = useState([
//     {
//       id: "INV-2025-001",
//       date: "2025-02-15",
//       studentName: "Alice Johnson",
//       course: "Computer Science",
//       type: "Application Fee",
//       amount: 500,
//       amountPaid: 500,
//       paymentMethod: "Razorpay",
//       status: "Paid",
//       dueDate: "2025-02-20",
//     },
//     {
//       id: "INV-2025-002",
//       date: "2025-02-15",
//       studentName: "Bob Wilson",
//       course: "Business Administration",
//       type: "Tuition Fee",
//       amount: 5000,
//       amountPaid: 2500,
//       paymentMethod: "PayPal",
//       status: "Partial",
//       dueDate: "2025-03-01",
//     },
//   ]);

//   const validationSchema = Yup.object({
//     studentName: Yup.string().required("Required"),
//     course: Yup.string().required("Required"),
//     type: Yup.string().required("Required"),
//     amount: Yup.number().required("Required").min(0, "Must be greater than 0"),
//     amountPaid: Yup.number()
//       .required("Required")
//       .min(0, "Must be greater than 0"),
//     paymentMethod: Yup.string().required("Required"),
//     dueDate: Yup.date().required("Required"),
//   });

//   const formik = useFormik({
//     initialValues: {
//       studentName: "",
//       course: "",
//       type: "",
//       amount: "",
//       amountPaid: "",
//       paymentMethod: "",
//       dueDate: "",
//       status: "Pending",
//     },
//     validationSchema,
//     onSubmit: (values) => {
//       if (modalMode === "add") {
//         const newPayment = {
//           id: `INV-2025-${String(payments.length + 1).padStart(3, "0")}`,
//           date: new Date().toISOString().split("T")[0],
//           ...values,
//           status:
//             values.amount === values.amountPaid
//               ? "Paid"
//               : values.amountPaid > 0
//               ? "Partial"
//               : "Pending",
//         };
//         setPayments([...payments, newPayment]);
//       } else {
//         const updatedPayments = payments.map((payment) =>
//           payment.id === selectedPayment.id
//             ? {
//                 ...payment,
//                 ...values,
//                 status:
//                   values.amount === values.amountPaid
//                     ? "Paid"
//                     : values.amountPaid > 0
//                     ? "Partial"
//                     : "Pending",
//               }
//             : payment
//         );
//         setPayments(updatedPayments);
//       }
//       setShowModal(false);
//       formik.resetForm();
//     },
//   });

//   const handleEdit = (payment) => {
//     setSelectedPayment(payment);
//     setModalMode("edit");
//     formik.setValues(payment);
//     setShowModal(true);
//   };

//   const handleDelete = (paymentId) => {
//     if (
//       window.confirm("Are you sure you want to delete this payment record?")
//     ) {
//       setPayments(payments.filter((payment) => payment.id !== paymentId));
//     }
//   };

//   const handleAddNew = () => {
//     setModalMode("add");
//     setSelectedPayment(null);
//     formik.resetForm();
//     setShowModal(true);
//   };

//   const getStatusBadge = (status) => {
//     const variants = {
//       Paid: "success",
//       Partial: "warning",
//       Pending: "danger",
//     };
//     return <Badge bg={variants[status]}>{status}</Badge>;
//   };

//   const handleSendReminder = (payment) => {
//     // Mock function for sending payment reminder
//     alert(
//       `Payment reminder sent to ${payment.studentName} for invoice ${payment.id}`
//     );
//   };

//   const handleGenerateInvoice = (payment) => {
//     // Mock function for generating invoice
//     alert(`Invoice generated for ${payment.id}`);
//   };

//   return (
//     <Container className="p-3">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h2>Payment Management</h2>
//         <Button variant="secondary" onClick={handleAddNew} style={{ border:"none"}}>
//           <FaFileInvoice className="me-2" /> Create New Payment
//         </Button>
//       </div>

//       <Tabs
//         activeKey={activeTab}
//         onSelect={(k) => setActiveTab(k)}
//         className="mb-4"
//       >
//         <Tab eventKey="payments" title="Payments Overview">
//           <Card>
//             <Card.Body>
//               <div className="d-flex justify-content-between align-items-center mb-3">
//                 <div className="d-flex gap-2">
//                   <Button variant="outline-primary" size="sm">
//                     <FaMoneyBillWave className="me-2" /> All Payments
//                   </Button>
//                   <Button variant="outline-warning" size="sm">
//                     <FaBell className="me-2" /> Pending
//                   </Button>
//                 </div>
//                 <Button variant="outline-secondary" size="sm">
//                   <FaFilter className="me-2" /> Filter
//                 </Button>
//               </div>

//               <div className="table-responsive">
//                 <Table striped responsive hover>
//                   <thead>
//                     <tr>
//                       <th>Invoice ID</th>
//                       <th>Date</th>
//                       <th>Student</th>
//                       <th>Course</th>
//                       <th>Type</th>
//                       <th>Amount</th>
//                       <th>Paid</th>
//                       <th>Method</th>
//                       <th>Status</th>
//                       <th>Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {payments.map((payment) => (
//                       <tr key={payment.id}>
//                         <td>{payment.id}</td>
//                         <td>{payment.date}</td>
//                         <td>{payment.studentName}</td>
//                         <td>{payment.course}</td>
//                         <td>{payment.type}</td>
//                         <td>${payment.amount}</td>
//                         <td>${payment.amountPaid}</td>
//                         <td>{payment.paymentMethod}</td>
//                         <td>{getStatusBadge(payment.status)}</td>
//                         <td>
//                           <div className="d-flex gap-2">
//                             <Button
//                               variant="link"
//                               className="p-0"
//                               onClick={() => handleEdit(payment)}
//                               title="Edit"
//                             >
//                               <FaEdit className="text-primary" />
//                             </Button>
//                             <Button
//                               variant="link"
//                               className="p-0"
//                               onClick={() => handleDelete(payment.id)}
//                               title="Delete"
//                             >
//                               <FaTrash className="text-danger" />
//                             </Button>
//                             <Button
//                               variant="link"
//                               className="p-0"
//                               onClick={() => handleGenerateInvoice(payment)}
//                               title="Generate Invoice"
//                             >
//                               <FaDownload className="text-success" />
//                             </Button>
//                             {payment.status !== "Paid" && (
//                               <Button
//                                 variant="link"
//                                 className="p-0"
//                                 onClick={() => handleSendReminder(payment)}
//                                 title="Send Reminder"
//                               >
//                                 <FaEnvelope className="text-warning" />
//                               </Button>
//                             )}
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </Table>
//               </div>
//             </Card.Body>
//           </Card>
//         </Tab>
//         <Tab eventKey="analytics" title="Payment Analytics">
//           <Card>
//             <Card.Body>
//               <h5>Payment Statistics</h5>
//               <Row className="g-4 mb-4">
//                 <Col md={3} sm={6}>
//                   <Card className="bg-primary text-white">
//                     <Card.Body>
//                       <h6>Total Collected</h6>
//                       <h3>
//                         ${payments.reduce((sum, p) => sum + p.amountPaid, 0)}
//                       </h3>
//                     </Card.Body>
//                   </Card>
//                 </Col>
//                 <Col md={3} sm={6}>
//                   <Card className="bg-warning text-white">
//                     <Card.Body>
//                       <h6>Pending Amount</h6>
//                       <h3>
//                         $
//                         {payments.reduce(
//                           (sum, p) => sum + (p.amount - p.amountPaid),
//                           0
//                         )}
//                       </h3>
//                     </Card.Body>
//                   </Card>
//                 </Col>
//                 <Col md={3} sm={6}>
//                   <Card className="bg-success text-white">
//                     <Card.Body>
//                       <h6>Paid Invoices</h6>
//                       <h3>
//                         {payments.filter((p) => p.status === "Paid").length}
//                       </h3>
//                     </Card.Body>
//                   </Card>
//                 </Col>
//                 <Col md={3} sm={6}>
//                   <Card className="bg-danger text-white">
//                     <Card.Body>
//                       <h6>Pending Invoices</h6>
//                       <h3>
//                         {payments.filter((p) => p.status !== "Paid").length}
//                       </h3>
//                     </Card.Body>
//                   </Card>
//                 </Col>
//               </Row>
//             </Card.Body>
//           </Card>
//         </Tab>
//       </Tabs>

//       {/* Add/Edit Payment Modal */}
//       <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
//         <Modal.Header closeButton>
//           <Modal.Title>
//             {modalMode === "add" ? "Create New Payment" : "Edit Payment"}
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={formik.handleSubmit}>
//             <Row>
//               <Col md={6} sm={12}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Student Name</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="studentName"
//                     value={formik.values.studentName}
//                     onChange={formik.handleChange}
//                     isInvalid={
//                       formik.touched.studentName && formik.errors.studentName
//                     }
//                   />
//                   <Form.Control.Feedback type="invalid">
//                     {formik.errors.studentName}
//                   </Form.Control.Feedback>
//                 </Form.Group>
//               </Col>
//               <Col md={6} sm={12}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Course</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="course"
//                     value={formik.values.course}
//                     onChange={formik.handleChange}
//                     isInvalid={formik.touched.course && formik.errors.course}
//                   />
//                   <Form.Control.Feedback type="invalid">
//                     {formik.errors.course}
//                   </Form.Control.Feedback>
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Row>
//               <Col md={6} sm={12}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Payment Type</Form.Label>
//                   <Form.Select
//                     name="type"
//                     value={formik.values.type}
//                     onChange={formik.handleChange}
//                     isInvalid={formik.touched.type && formik.errors.type}
//                   >
//                     <option value="">Select Type</option>
//                     <option value="Application Fee">Application Fee</option>
//                     <option value="Tuition Fee">Tuition Fee</option>
//                   </Form.Select>
//                   <Form.Control.Feedback type="invalid">
//                     {formik.errors.type}
//                   </Form.Control.Feedback>
//                 </Form.Group>
//               </Col>
//               <Col md={6} sm={12}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Payment Method</Form.Label>
//                   <Form.Select
//                     name="paymentMethod"
//                     value={formik.values.paymentMethod}
//                     onChange={formik.handleChange}
//                     isInvalid={
//                       formik.touched.paymentMethod &&
//                       formik.errors.paymentMethod
//                     }
//                   >
//                     <option value="">Select Method</option>
//                     <option value="Razorpay">Razorpay</option>
//                     <option value="PayPal">PayPal</option>
//                     <option value="Stripe">Stripe</option>
//                   </Form.Select>
//                   <Form.Control.Feedback type="invalid">
//                     {formik.errors.paymentMethod}
//                   </Form.Control.Feedback>
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Row>
//               <Col md={6} sm={12}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Total Amount</Form.Label>
//                   <Form.Control
//                     type="number"
//                     name="amount"
//                     value={formik.values.amount}
//                     onChange={formik.handleChange}
//                     isInvalid={formik.touched.amount && formik.errors.amount}
//                   />
//                   <Form.Control.Feedback type="invalid">
//                     {formik.errors.amount}
//                   </Form.Control.Feedback>
//                 </Form.Group>
//               </Col>
//               <Col md={6} sm={12}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Amount Paid</Form.Label>
//                   <Form.Control
//                     type="number"
//                     name="amountPaid"
//                     value={formik.values.amountPaid}
//                     onChange={formik.handleChange}
//                     isInvalid={
//                       formik.touched.amountPaid && formik.errors.amountPaid
//                     }
//                   />
//                   <Form.Control.Feedback type="invalid">
//                     {formik.errors.amountPaid}
//                   </Form.Control.Feedback>
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Row>
//               <Col md={6} sm={12}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Due Date</Form.Label>

//                   <Form.Control
//                     type="date"
//                     name="dueDate"
//                     value={formik.values.dueDate}
//                     onChange={formik.handleChange}
//                     isInvalid={formik.touched.dueDate && formik.errors.dueDate}
//                   />
//                   <Form.Control.Feedback type="invalid">
//                     {formik.errors.dueDate}
//                   </Form.Control.Feedback>
//                 </Form.Group>
//               </Col>
//             </Row>

//             <div className="d-flex justify-content-end gap-2">
//               <Button variant="secondary" onClick={() => setShowModal(false)}>
//                 Cancel
//               </Button>
//               <Button variant="primary" type="submit" style={{backgroundColor:"gray", color:"black", border:"none"}}>
//                 {modalMode === "add" ? "Create Payment" : "Update Payment"}
//               </Button>
//             </div>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </Container>
//   );
// };

// export default Payments;






// import React, { useState } from "react";
// import {
//   Container,
//   Table,
//   Button,
//   Card,
//   Form,
//   Row,
//   Col,
//   Badge,
//   Modal,
//   Pagination,
// } from "react-bootstrap";
// import * as XLSX from "xlsx";
// import { saveAs } from "file-saver";

// const AdminPayments = () => {
//   const [filter, setFilter] = useState("all");
//   const [search, setSearch] = useState("");
//   const [sortField, setSortField] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [selectedPaymentId, setSelectedPaymentId] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   const [payments, setPayments] = useState([
//     {
//       id: 1,
//       student: "Rahul Sharma",
//       description: "Tuition Fee",
//       amount: 1200,
//       status: "Due",
//       date: "2025-06-15",
//     },
//     {
//       id: 2,
//       student: "Neha Verma",
//       description: "Library Fee",
//       amount: 100,
//       status: "Paid",
//       date: "2025-04-10",
//     },
//     {
//       id: 3,
//       student: "Aman Singh",
//       description: "Hostel Fee",
//       amount: 500,
//       status: "Due",
//       date: "2025-06-20",
//     },
//     {
//       id: 4,
//       student: "Priya Kapoor",
//       description: "Application Fee",
//       amount: 150,
//       status: "Paid",
//       date: "2025-03-28",
//     },
//     {
//       id: 5,
//       student: "Ravi Mehra",
//       description: "Exam Fee",
//       amount: 200,
//       status: "Due",
//       date: "2025-07-01",
//     },
//     {
//       id: 6,
//       student: "Sonal Joshi",
//       description: "Mess Charges",
//       amount: 350,
//       status: "Paid",
//       date: "2025-04-15",
//     },
//     {
//       id: 7,
//       student: "Tina Rawal",
//       description: "Late Fee",
//       amount: 50,
//       status: "Due",
//       date: "2025-06-18",
//     },
//   ]);

//   const handleMarkAsPaid = () => {
//     setPayments(
//       payments.map((item) =>
//         item.id === selectedPaymentId ? { ...item, status: "Paid" } : item
//       )
//     );
//     setShowModal(false);
//   };

//   const handleExport = () => {
//     const ws = XLSX.utils.json_to_sheet(filteredPayments);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Payments");
//     const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
//     const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
//     saveAs(blob, "student_payments.xlsx");
//   };

//   const filteredPayments = payments
//     .filter((item) => filter === "all" || item.status === filter)
//     .filter((item) =>
//       item.student.toLowerCase().includes(search.toLowerCase())
//     );

//   const sortedPayments = [...filteredPayments].sort((a, b) => {
//     if (sortField === "date") return new Date(a.date) - new Date(b.date);
//     if (sortField === "amount") return a.amount - b.amount;
//     return 0;
//   });

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = sortedPayments.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(sortedPayments.length / itemsPerPage);

//   return (
//     <Container className="mt-4">
//       <h3 className="mb-4">Admin - All Student Payments</h3>

//       <Card className="mb-3">
//         <Card.Body>
//           <Row className="align-items-end g-3">
//             <Col md={3}>
//               <Form.Group>
//                 <Form.Label>Status Filter</Form.Label>
//                 <Form.Select
//                   value={filter}
//                   onChange={(e) => setFilter(e.target.value)}
//                 >
//                   <option value="all">All</option>
//                   <option value="Due">Due</option>
//                   <option value="Paid">Paid</option>
//                 </Form.Select>
//               </Form.Group>
//             </Col>
//             <Col md={3}>
//               <Form.Group>
//                 <Form.Label>Search by Student</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter name"
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                 />
//               </Form.Group>
//             </Col>
//             <Col md={3}>
//               <Form.Group>
//                 <Form.Label>Sort by</Form.Label>
//                 <Form.Select
//                   value={sortField}
//                   onChange={(e) => setSortField(e.target.value)}
//                 >
//                   <option value="">None</option>
//                   <option value="date">Date</option>
//                   <option value="amount">Amount</option>
//                 </Form.Select>
//               </Form.Group>
//             </Col>
//             <Col md={3}>
//               <Button
//                 className="mt-2 w-100"
//                 variant="outline-primary"
//                 onClick={handleExport}
//               >
//                 Export to Excel
//               </Button>
//             </Col>
//           </Row>
//         </Card.Body>
//       </Card>

//       <Card>
//         <Card.Body>
//           <Table striped bordered hover responsive>
//             <thead>
//               <tr>
//                 <th>#</th>
//                 <th>Student</th>
//                 <th>Description</th>
//                 <th>Amount ($)</th>
//                 <th>Status</th>
//                 <th>Date</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentItems.map((item, index) => (
//                 <tr key={item.id}>
//                   <td>{indexOfFirstItem + index + 1}</td>
//                   <td>{item.student}</td>
//                   <td>{item.description}</td>
//                   <td>{item.amount}</td>
//                   <td>
//                     <Badge bg={item.status === "Paid" ? "success" : "warning"}>
//                       {item.status}
//                     </Badge>
//                   </td>
//                   <td>{item.date}</td>
//                   <td>
//                     {item.status === "Due" ? (
//                       <Button
//                         size="sm"
//                         variant="success"
//                         onClick={() => {
//                           setSelectedPaymentId(item.id);
//                           setShowModal(true);
//                         }}
//                       >
//                         Mark as Paid
//                       </Button>
//                     ) : (
//                       <Button
//                         size="sm"
//                         variant="info"
//                         onClick={() => alert("Viewing receipt")}
//                       >
//                         View Receipt
//                       </Button>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//               {currentItems.length === 0 && (
//                 <tr>
//                   <td colSpan="7" className="text-center">
//                     No records found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </Table>

//           {/* Pagination */}
//           {totalPages > 1 && (
//             <Pagination className="justify-content-end">
//               {[...Array(totalPages)].map((_, page) => (
//                 <Pagination.Item
//                   key={page}
//                   active={page + 1 === currentPage}
//                   onClick={() => setCurrentPage(page + 1)}
//                 >
//                   {page + 1}
//                 </Pagination.Item>
//               ))}
//             </Pagination>
//           )}
//         </Card.Body>
//       </Card>

//       {/* Confirmation Modal */}
//       <Modal show={showModal} onHide={() => setShowModal(false)} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Mark as Paid</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           Are you sure you want to mark this payment as paid?
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowModal(false)}>
//             Cancel
//           </Button>
//           <Button variant="success" onClick={handleMarkAsPaid}>
//             Confirm
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </Container>
//   );
// };

// export default AdminPayments;























import React, { useEffect, useState } from "react";
import {
  Container,
  Table,
  Button,
  Card,
  Form,
  Row,
  Col,
  Badge,
  Modal,
  Pagination,
} from "react-bootstrap";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import BASE_URL from "../../Config";
import api from "../../interceptors/axiosInterceptor";
import { Link } from "react-router-dom";

const AdminPayments = () => {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedPaymentId, setSelectedPaymentId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [payments, setPayments] = useState([]);

  const handleMarkAsPaid = () => {
    setPayments(
      payments.map((item) =>
        item.id === selectedPaymentId ? { ...item, status: "Paid" } : item
      )
    );
    setShowModal(false);
  };

  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(filteredPayments);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Payments");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "student_payments.xlsx");
  };

  const filteredPayments = payments
    .filter((item) => filter === "all" || item.status === filter)
    .filter((item) =>
      item?.name?.toLowerCase().includes(search.toLowerCase())  // Fixed name to item.name
    );

  const sortedPayments = [...filteredPayments].sort((a, b) => {
    if (sortField === "date") return new Date(a.created_at) - new Date(b.created_at);
    if (sortField === "amount") return a.amount - b.amount;
    return 0;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedPayments.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedPayments.length / itemsPerPage);

  const fetchPayments = async () => {
    try {
      const response = await api.get(`${BASE_URL}payments`);
      if (response?.data) {
        setPayments(response.data); // Storing the fetched payments in the state
        console.log("Payments:", response.data);
      }
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <Container className="mt-4">
      <div className="d-flex p-3" style={{ justifyContent: "space-between" }}>
        <div>
          <h3 className="mb-4">Admin - All Student Payments</h3>
        </div>
        {/* <div>
          <Link to="/addbranch" className="btn btn-secondary">+ Add Branch</Link>
        </div> */}
      </div>


      <Card className="mb-3">
        <Card.Body>
          <Row className="align-items-end g-3">
            <Col md={3}>
              <Form.Group>
                <Form.Label>Status Filter</Form.Label>
                <Form.Select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="Due">Due</option>
                  <option value="Paid">Paid</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Search by Student</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Sort by</Form.Label>
                <Form.Select
                  value={sortField}
                  onChange={(e) => setSortField(e.target.value)}
                >
                  <option value="">None</option>
                  <option value="date">Date</option>
                  <option value="amount">Amount</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Button
                className="mt-2 w-100"
                variant="outline-primary"
                onClick={handleExport}
              >
                Export to Excel
              </Button>
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
                <th>Whatsapp</th>
                <th>Group_name</th>
                <th>University</th>
                <th>country</th>
                <th>Payment method</th>
                <th>Payment type</th>
                <th>Payment proof</th>
                <th>Assistant</th>
                <th>Date</th>

              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={item.id}>
                  <td>{indexOfFirstItem + index + 1}</td>
                  <td>{item?.name}</td> {/* Fixed name */}
                  <td>{item?.email}</td>
                  <td>{item?.whatsapp}</td>
                  <td>{item?.group_name}</td>
                  <td>{item?.university_other ? item.university_other : item.universityName}</td>
                  <td>{item?.country_other ? item.country_other : item.country}</td>
                  <td>{item?.payment_method_other ? item.payment_method_other : item.payment_method}</td>
                  <td>{item?.payment_type_other ? item.payment_type_other : item.payment_type}</td>
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
                  <td>{item?.assistant}</td>
              

                  {/* <td>
                    <Badge bg={item.status === "Paid" ? "success" : "warning"}>
                      {item.status}
                    </Badge>
                  </td> */}
                  <td>{new Date(item.created_at).toLocaleDateString()}</td>

                </tr>
              ))}
              {currentItems.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center">
                    No records found.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>

          {/* Pagination */}
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

      {/* Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Mark as Paid</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to mark this payment as paid?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleMarkAsPaid}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminPayments;
