import { useState, useEffect } from "react";

import {
  Table,
  Button,
  Form,
  Badge,
  Modal,
  Row,
  Col,
} from "react-bootstrap";

import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import BASE_URL from "../../Config";
import api from "../../interceptors/axiosInterceptor";

const TodaysInqiury = () => {
  const [inquiries, setInquiries] = useState({
    todayInquiries: [], // Initialize with an empty array
    todayFollowUps: [],
    thisWeekFollowUps: [],
  });

  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [newInquiry, setNewInquiry] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    address: "",
    course: "Maths",
    source: "Whatsapp",
    inquiryType: "",
    branch: "",
    assignee: "",
    country: "",
    dateOfInquiry: "",
    presentAddress: "",
    education: [],
    englishProficiency: [],
    jobExperience: {
      company: "",
      jobTitle: "",
      duration: "",
    },
    preferredCountries: [],
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch inquiries when the component mounts
  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const response = await api.get(`${BASE_URL}inquiries`);
        setInquiries({ todayInquiries: response.data });
      } catch (error) {
        console.error("Error fetching inquiries:", error);
      }
    };
    fetchInquiries();
  }, []);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentInquiries = inquiries.todayInquiries.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Fetch and view a single inquiry by its ID
  const handleViewDetail = async (id) => {
    try {
      const response = await api.get(`${BASE_URL}inquiries/${id}`);
      setSelectedInquiry(response.data);
      setShowInquiryModal(true);
    } catch (error) {
      console.error("Error fetching inquiry details:", error);
    }
  };

  // Handle new inquiry form submission
  const handleAddInquiry = async (e) => {
    e.preventDefault();
    const requestData = {
      user_id: 1,
      inquiry_type: newInquiry.inquiryType,
      source: newInquiry.source,
      branch: newInquiry.branch,
      full_name: newInquiry.name,
      phone_number: newInquiry.phone,
      email: newInquiry.email,
      course_name: newInquiry.course,
      country: newInquiry.country,
      city: newInquiry.city,
      date_of_inquiry: newInquiry.dateOfInquiry,
      address: newInquiry.address,
      present_address: newInquiry.presentAddress,
      education_background: newInquiry.education,
      english_proficiency: newInquiry.englishProficiency,
      company_name: newInquiry.jobExperience.company,
      job_title: newInquiry.jobExperience.jobTitle,
      job_duration: newInquiry.jobExperience.duration,
      preferred_countries: newInquiry.preferredCountries,
    };

    try {
      const response = await api.post(`${BASE_URL}inquiries`, requestData);
      if (response.status === 200) {
        // Show success alert and reset the form
        Swal.fire({
          title: "Success!",
          text: "Inquiry submitted successfully.",
          icon: "success",
          confirmButtonText: "Ok",
        }).then(() => {
          setInquiries({
            ...inquiries,
            todayInquiries: [...inquiries.todayInquiries, response.data],
          });
          setShowInquiryModal(false); // Close the modal after success
        });
      }
    } catch (error) {
      console.error("Error during inquiry submission:", error);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonText: "Close",
      });
    }
  };

  // Handle delete inquiry
  const handleDeleteInquiry = async (id) => {
    try {
      await api.delete(`${BASE_URL}inquiries/${id}`);
      setInquiries({
        ...inquiries,
        todayInquiries: inquiries.todayInquiries.filter(
          (inq) => inq.id !== id
        ),
      });
    } catch (error) {
      console.error("Error deleting inquiry:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Today's Inquiries</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>City</th>
            <th>Course</th>
            <th>Source</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentInquiries.map((inq) => (
            <tr key={inq.id}>
              <td>{inq.name}</td>
              <td>{inq.email}</td>
              <td>{inq.phone}</td>
              <td>{inq.city}</td>
              <td>{inq.course}</td>
              <td>{inq.source}</td>
              <td>
                <Button
                  variant="info"
                  size="sm"
                  onClick={() => handleViewDetail(inq.id)}
                >
                  View
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeleteInquiry(inq.id)}
                  className="ms-2"
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      

      {/* Inquiry Detail Modal */}
      <Modal
        show={showInquiryModal}
        onHide={() => setShowInquiryModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Inquiry Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedInquiry && (
            <div>
              <h5>Personal Information</h5>
              <p>
                <strong>Name:</strong> {selectedInquiry.full_name}
              </p>
              <p>
                <strong>Email:</strong> {selectedInquiry.email}
              </p>
              <p>
                <strong>Phone:</strong> {selectedInquiry.phone_number}
              </p>
              <p>
                <strong>City:</strong> {selectedInquiry.city}
              </p>
              <p>
                <strong>Course:</strong> {selectedInquiry.course_name}
              </p>
              <p>
                <strong>Source:</strong> {selectedInquiry.source}
              </p>
              {/* Add more fields as necessary */}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowInquiryModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TodaysInqiury;
