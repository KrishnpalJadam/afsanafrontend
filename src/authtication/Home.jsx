import React, { useState, useEffect } from "react";
import {
  Navbar,
  Nav,
  Button,
  Container,
  Row,
  Col,
  Card,
  Modal,
  Form,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import InquiryForm from "./InquiryForm";
import "./Home.css";
import bmu from "../assets/bmulogo.webp";
import hungury from "../assets/hungary.webp";
import gyor from "../assets/gyor.webp";
import devre from "../assets/debre.webp";
import wek from "../assets/wekerle.webp";
import PaymentFormModal from "./PaymentFormModal";

const App = () => {
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // 2) Handlers to open/close the modal
  const handleOpenInquiry = () => setShowInquiryModal(true);
  const handleCloseInquiry = () => setShowInquiryModal(false);

  const handleOpenPaymentModal = () => setShowPaymentModal(true);
  const handleClosePaymentModal = () => setShowPaymentModal(false);

  const universities = [
    {
      img: bmu,
      name: "Budapest Metropolitan University",
      location: "Nagy-téteni út 162-164, Budapest, Hungary, 1222",
      popularPrograms: [
        "Tourism and Catering",
        "Animation",
        "Graphic Design",
        "Photography",
      ],
      keyHighlights: [
        "Internationally recognized degrees",
        "Affordable tuition & living costs",
      ],
      contact: "+36 1 273 3090 (International Office)",
      email: "info@metropolitan.hu",
    },
    {
      img: gyor,
      name: "Széchenyi István University",
      location: "Egyetem tér 1, 9026 Győr, Hungary",
      popularPrograms: [
        "Vehicle Engineering",
        "Civil Engineering",
        "Supply Chain Management",
        "Computer Science Engineering",
      ],
      keyHighlights: [
        "Strong reputation in IT fields",
        "Close collaboration with Audi Hungary",
      ],
      contact: "+36 96 503 418 (International Office)",
      email: "international@sze.hu",
    },
    {
      img: devre,
      name: "University of Debrecen",
      location: "Egyetem tér 1, 4032 Debrecen, Hungary",
      popularPrograms: [
        "Medicine",
        "Pharmacy",
        "Dentistry",
        "Computer Science Engineering",
      ],
      keyHighlights: [
        "Top Ranked University in Hungary with strong global reputation",
        "Over 6,000 international students from 120+ countries",
      ],
      contact: "+36 52 258 058 (International Office)",
      email: "admissions@stanford.edu",
    },
    {
      img: hungury,
      name: "Eötvös Loránd University",
      location: "Egyetem tér 1-3, 1053 Budapest, Hungary",
      popularPrograms: [
        "Computer Science",
        "Psychology",
        "Biology",
        "Mathematics",
      ],
      keyHighlights: [
        "One of the Oldest and Most Prestigious Universities in Hungary",
        "Offers a wide range of English-taught programs",
      ],
      contact: "+36 1 411 6500",
      email: "international@elte.hu",
    },
    {
      img: wek,
      name: "Wekerle Sándor Business School",
      location: "Jázmin u. 10, 1084 Budapest, Hungary",
      popularPrograms: ["Commerce and Marketing", "International Relations"],
      keyHighlights: [
        "Located in Budapest, offering great accessibility, culture, and student life",
        "Offers affordable tuition fees compared to Western Europe",
      ],
      contact: "+36 1 323 1000",
      email: "international@wsuf.hu",
    },
    {
      img: hungury,
      name: "Central European University (CEU)",
      location: "Nádor utca 9, 1051 Budapest, Hungary",
      popularPrograms: [
        "Political Science",
        "International Relations",
        "Public Policy",
        "Law",
      ],
      keyHighlights: [
        "One of the leading graduate universities in Europe",
        "Offers programs in English for international students",
      ],
      contact: "+36 1 327 3000 (International Office)",
      email: "admissions@ceu.edu",
    },
  ];

  const topCourses = [
    {
      title: "Tourism Management",
      category: "Tourism and Catering",
      price: "$100",
      rating: "4.5",
      duration: "6 Months",
      instructor: "John Doe",
      university: "University of Vienna, Austria",
      description:
        "Learn how to manage and operate in the global tourism industry.",
      img:
        "https://cache.careers360.mobi/media/article_images/2020/5/11/hotel-management-vs-travel-and-tourism-management.jpg", // Unsplash link
    },
    {
      title: "Animation Basics",
      category: "Animation",
      price: "$120",
      rating: "4.8",
      duration: "8 Months",
      instructor: "Jane Smith",
      university: "Budapest University of Technology and Economics, Hungary", // Added University Name
      description:
        "An introduction to the world of animation using industry-standard tools.",
      img:
        "https://embed-ssl.wistia.com/deliveries/57ca530bc3e8c8bb5f1f9d4f36be415a.jpg?image_crop_resized=640x358", // Unsplash link
    },
    {
      title: "Graphic Design Essentials",
      category: "Graphic Design",
      price: "$90",
      rating: "4.7",
      duration: "5 Months",
      instructor: "Michael Lee",
      university: "University of Debrecen, Hungary",
      description:
        "Master the fundamentals of graphic design for various media formats.",
      img:
        "https://www.attitudetallyacademy.com/Blog/wp-content/uploads/2019/05/why-garphic-designing-course-is-more-imporatant-for-every-business.jpg", // Unsplash link
    },
    {
      title: "Photography Fundamentals",
      category: "Photography",
      price: "$110",
      rating: "4.6",
      duration: "3 Months",
      instructor: "Samantha Adams",
      university: "Eötvös Loránd University, Hungary",
      description:
        "Learn the basics of photography, including camera settings, composition, and editing.",
      img:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcsJp8Nrcqmorag10MAdxBfPq-pmWvtVQenQ&s", // Unsplash link
    },
    {
      title: "Computer Science for Beginners",
      category: "Computer Science",
      price: "$130",
      rating: "4.7",
      duration: "6 Months",
      instructor: "David Brown",
      university: "Corvinus University of Budapest, Hungary",
      description:
        "Get an introduction to programming and computer science concepts.",
      img:
        "https://www.zdnet.com/a/img/resize/89b98c0918a56594a2d7a84d46dd5268678161b2/2021/07/19/e28889a7-7c41-4dd8-9899-2ee60d1850e2/computer-science-course-overview-shutterstock-1377112199.jpg?auto=webp&fit=crop&height=1200&width=1200", // Unsplash link
    },
    {
      title: "Web Development with HTML, CSS, and JavaScript",
      category: "Computer Science",
      price: "$150",
      rating: "4.9",
      duration: "6 Months",
      instructor: "Emily Davis",
      university: "Pázmány Péter Catholic University, Hungary",
      description:
        "Learn how to build responsive websites using HTML, CSS, and JavaScript.",
      img:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYhuaZv2zcldGUHcFtm25YNu_WH5FkznSdFw&s", // Unsplash link
    },
  ];

  return (
    <div className="bg-dark text-white">
      <PaymentFormModal
        show={showPaymentModal}
        handleClose={handleClosePaymentModal}
      />
      {/* Navbar */}
      <Navbar expand="lg" className="navbarHome py-3 fixed-top backdrop-blur">
        <Container>
          <Navbar.Brand href="#" className="d-flex align-items-center">
            <img
              src="/img/logo.png"
              alt="CourseHub"
              height="40"
              className="me-2"
            />
            <div className="brand-text">
              <span className="text-gradient">Course</span>
              <span className="fw-bold" style={{ color: "white" }}>
                Hub
              </span>
            </div>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <Nav.Link href="#courses" className="nav-link-hover mx-2">
                Courses
              </Nav.Link>
              <Nav.Link href="#about" className="nav-link-hover mx-2">
                About
              </Nav.Link>
              <Nav.Link href="#contact" className="nav-link-hover mx-2">
                Contact
              </Nav.Link>
              <Nav.Link href="#" className="nav-link-hover mx-2">
                <Button
                  variant="primary"
                  className="enroll-now-btn w-100"
                  onClick={handleOpenPaymentModal}
                >
                  <i className="fas fa-credit-card me-2"></i> Enroll Now
                </Button>
              </Nav.Link>
            </Nav>

            <div className="d-flex align-items-center gap-3">
              <Link to={"/login"} className="btn btn-gradient px-4 py-2">
                Log in
              </Link>
              <Button
                variant="outline-light"
                className="inquiry-btn"
                onClick={handleOpenInquiry}
              >
                <i className="fas fa-question-circle me-2"></i>
                Inquiry
              </Button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <section className="hero-section text-center position-relative">
        <div className="hero-video-bg"></div>
        <div className="hero-overlay d-flex flex-column align-items-center justify-content-center">
          <div className="hero-content" data-aos="fade-up">
            <h1 className="hero-title mb-4">
              <span className="gradient-text">Transform</span> Your Future with
              <span className="gradient-text"> CourseHub</span>
            </h1>
            <p className="hero-subtitle mb-5">
              Unlock your potential with world-class courses and expert
              instructors
            </p>
            <div className="hero-buttons d-flex gap-3 justify-content-center">
              <Button variant="gradient" size="lg" className="pulse-button">
                <i className="fas fa-play-circle me-2"></i>
                Start Learning
              </Button>
              <Button variant="outline-light" size="lg" className="hover-fill">
                <i className="fas fa-book me-2"></i>
                Browse Courses
              </Button>
            </div>
            <div className="hero-stats d-flex gap-5 justify-content-center mt-5">
              <div className="stat-item">
                <h3 className="gradient-text">10K+</h3>
                <p>Active Students</p>
              </div>
              <div className="stat-item">
                <h3 className="gradient-text">500+</h3>
                <p>Expert Teachers</p>
              </div>
              <div className="stat-item">
                <h3 className="gradient-text">1000+</h3>
                <p>Online Courses</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}

      <Container className="py-5" id="courses">
        <h2 className="text-center fw-bold mb-5">
          Top International Universities
        </h2>
        <Row className="g-4">
          {universities.map((university, index) => (
            <Col key={index} md={4} className="mb-4">
              <Card className="h-100">
                <Card.Header className="text-center">
                  <img
                    src={university.img} // Use the university's logo image if available
                    alt={`${university.name} Logo`}
                    className="w-25 mb-3"
                  />
                  <h5>{university.name}</h5>
                </Card.Header>
                <Card.Body>
                  <Card.Text>
                    <strong>Location: </strong>
                    {university.location}
                  </Card.Text>
                  <Card.Text>
                    <strong>Popular Programs:</strong>
                    <ul>
                      {university.popularPrograms.map((program, idx) => (
                        <li key={idx}>{program}</li>
                      ))}
                    </ul>
                  </Card.Text>
                  <Card.Text>
                    <strong>Key Highlights:</strong>
                    <ul>
                      {university.keyHighlights.map((highlight, idx) => (
                        <li key={idx}>{highlight}</li>
                      ))}
                    </ul>
                  </Card.Text>
                  <Card.Text>
                    <strong>Contact:</strong> {university.contact}
                  </Card.Text>
                  <Card.Text>
                    <strong>Email:</strong> {university.email}
                  </Card.Text>
                  <Button variant="primary" className="w-100">
                    <Link
                      to={"/login"}
                      className="text-decoration-none"
                      style={{ color: "white" }}
                    >
                      Apply Now
                    </Link>
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      {/* Top-rated Courses */}
      <Container className="py-5" id="about">
        <h2 className="text-center fw-bold mb-5">
          <span className="gradient-text">Top-rated</span> Courses
        </h2>
        <Row className="g-4">
          {topCourses.map((course, index) => (
            <Col key={index} md={4} className="mb-4">
              <Card className="top-course-card h-100">
                <div className="card-image-wrapper">
                  <Card.Img src={course.img} className="course-image" />
                  <div className="price-tag">{course.price}</div>
                  <div className="rating-badge">
                    <i className="fas fa-star"></i> {course.rating}
                  </div>
                </div>
                <Card.Body>
                  <div className="category-badge">
                    <i
                      className={`fas fa-${
                        course.category === "Physics"
                          ? "atom"
                          : course.category === "Computer Science"
                          ? "laptop-code"
                          : course.category === "Literature"
                          ? "book"
                          : course.category === "History"
                          ? "landmark"
                          : "language"
                      }`}
                    ></i>
                    {course.category}
                  </div>
                  <h3 style={{ color: "white" }}>{course.university}</h3>
                  <h5 className="course-title">{course.title}</h5>
                  <div className="course-features">
                    <span>
                      <i className="fas fa-user-graduate me-2"></i>156 Students
                    </span>
                    <span>
                      <i className="fas fa-video me-2"></i>18 Lessons
                    </span>
                  </div>
                  <p className="course-description" style={{ color: "white" }}>
                    {course.description}
                  </p>
                  <div className="course-progress">
                    <div
                      className="progress-bar"
                      style={{ width: "75%" }}
                    ></div>
                    <span>75% Success Rate</span>
                  </div>
                  <Button className="enroll-now-btn w-100">
                    <i className="fas fa-graduation-cap me-2"></i>{" "}
                    <Link
                      to={"/login"}
                      className="text-decoration-none"
                      style={{ color: "white" }}
                    >
                      Apply Now
                    </Link>
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Exclusive Offer */}
      <section className="offer-section text-center position-relative">
        <div className="offer-overlay">
          <Container>
            <div className="offer-content">
              <div className="offer-icon mb-4">
                <i className="fas fa-gift"></i>
              </div>
              <h3 className="offer-title mb-4">
                <span className="gradient-text">Special Offer</span> for New
                Students
              </h3>
              <p className="offer-description mb-4">
                Join our community today and get 20% off on all courses!
                Subscribe to our newsletter for exclusive updates and
                promotions.
              </p>
              <Form className="newsletter-form">
                <Row className="justify-content-center">
                  <Col md={6}>
                    <div className="input-group">
                      <Form.Control
                        type="email"
                        placeholder="Enter your email address"
                        className="newsletter-input"
                      />
                      <Button className="subscribe-btn">
                        <i className="fas fa-paper-plane me-2"></i>
                        Subscribe Now
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>
              <div className="offer-features mt-4">
                <span>
                  <i className="fas fa-check-circle me-2"></i>Weekly Updates
                </span>
                <span>
                  <i className="fas fa-check-circle me-2"></i>Special Discounts
                </span>
                <span>
                  <i className="fas fa-check-circle me-2"></i>New Course Alerts
                </span>
              </div>
            </div>
          </Container>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-dark text-white py-4" id="contact">
        <Container>
          <Row>
            <Col md={6}>
              <h5>Contact Us</h5>
              <p>Email: info@studentrecruit.com</p>
              <p>Phone: +123 456 7890</p>
            </Col>
            <Col md={6} className="text-md-end">
              <p>Privacy Policy | Terms of Use</p>
            </Col>
          </Row>
        </Container>
      </footer>

      <Modal
        show={showInquiryModal}
        onHide={handleCloseInquiry}
        size="xl"
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Inquiry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InquiryForm />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseInquiry}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default App;
