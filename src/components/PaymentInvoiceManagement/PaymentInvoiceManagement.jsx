import React, { useState } from "react";
import AdminUniversity from "./AdminUniversity";
import bmu from "../../assets/bmulogo.webp";
import gyor from "../../assets/gyor.webp";
import devre from "../../assets/debre.webp";
import hungay from "../../assets/hungary.webp";
import wek from "../../assets/wekerle.webp";
import { Modal, Button, Form } from "react-bootstrap";

const PaymentInvoiceMangament = () => {
  const initialUniversities = [
    {
      name: "bmuUniversity",
      NAME: "Budapest Metropolitan University",
      logo: bmu,
      location: "Nagytétényi út 162-164, Budapest, Hungary, 1222",
      programs: [
        "Tourism and Catering",
        "Animation",
        "Graphic Design",
        "Photography",
      ],
      highlights: [
        "Internationally recognized degrees",
        "Affordable tuition & living costs",
        "English-taught programs",
        "Strong focus on practical training",
        "Diverse programs in business, media, tourism & arts",
        "Strong career support & internship programs",
      ],
      contact: {
        phone: "+36 1 273 3090 (International Office)",
        email: "info@metropolitan.hu",
      },
    },
    {
      name: "GyorUniversity",
      NAME: "Széchenyi István University",
      logo: gyor,
      location: "Egyetem tér 1, 9026 Győr, Hungary",
      programs: [
        "Vehicle Engineering",
        "Civil Engineering",
        "Supply Chain Management",
        "Computer Science Engineering",
      ],
      highlights: [
        "Strong reputation in IT fields",
        "Close collaboration with Audi Hungary",
        "Excellent practical training & internship opportunities",
        "Affordable tuition and living costs compared to Western Europe",
        "Strong focus on innovation projects",
      ],
      contact: {
        phone: "+36 96 503 418 (International Office)",
        email: "international@sze.hu",
      },
    },
    {
      name: "DebrecenUniversity",
      NAME: "University of Debrecen",
      logo: devre,
      location: "Egyetem tér 1, 4032 Debrecen, Hungary",
      programs: [
        "Medicine",
        "Pharmacy",
        "Dentistry",
        "Computer Science Engineering",
      ],
      highlights: [
        "Top Ranked University in Hungary with strong global reputation",
        "Over 6,000 international students from 120+ countries",
        "Wide range of Bachelor, Master, and PhD programs taught in English",
        "Affordable fees compared to Western Europe",
      ],
      contact: {
        phone: "+36 52 258 058 (International Office)",
        email: "admissions@stanford.edu",
      },
    },
    {
      name: "HunguryUniversity",
      NAME: "Eötvös Loránd University",
      logo: hungay,
      location: "Egyetem tér 1-3, 1053 Budapest, Hungary",
      programs: ["Computer Science", "Psychology", "Biology", "Mathematics"],
      highlights: [
        "One of the Oldest and Most Prestigious Universities in Hungary",
        "Offers a wide range of English-taught programs",
        "Affordable tuition fees compared to Western Europe",
        "Located in Budapest, a dynamic city with rich culture and student life",
      ],
      contact: {
        phone: "+36 1 411 6500",
        email: "international@elte.hu",
      },
    },
    {
      name: "WekerleUniversity",
      NAME: "Wekerle Sándor Business School",
      logo: wek,
      location: "Jázmin u. 10, 1084 Budapest, Hungary",
      programs: [
        "Commerce and Marketing",
        "International Relations",
        "Master of Business Administration",
        "International Business Economics",
      ],
      highlights: [
        "Located in Budapest, offering great accessibility, culture, and student life",
        "Offers affordable tuition fees compared to Western Europe",
        "Strong focus on entrepreneurship, business innovation, and real-world case studies",
        "Dedicated international and student life",
      ],
      contact: {
        phone: "+36 1 323 1000",
        email: "international@wsuf.hu",
      },
    },
  ];

  const [universities, setUniversities] = useState(initialUniversities);
  const [showModal, setShowModal] = useState(false);
  const [newUniversity, setNewUniversity] = useState({
    name: "",
    NAME: "",
    logo: "",
    location: "",
    programs: [],
    highlights: [],
    contact: {
      phone: "",
      email: "",
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("contact.")) {
      const contactField = name.split(".")[1];
      setNewUniversity({
        ...newUniversity,
        contact: {
          ...newUniversity.contact,
          [contactField]: value,
        },
      });
    } else {
      setNewUniversity({
        ...newUniversity,
        [name]: value,
      });
    }
  };

  const handleAddProgram = () => {
    setNewUniversity({
      ...newUniversity,
      programs: [...newUniversity.programs, ""],
    });
  };

  const handleProgramChange = (index, value) => {
    const updatedPrograms = [...newUniversity.programs];
    updatedPrograms[index] = value;
    setNewUniversity({
      ...newUniversity,
      programs: updatedPrograms,
    });
  };

  const handleAddHighlight = () => {
    setNewUniversity({
      ...newUniversity,
      highlights: [...newUniversity.highlights, ""],
    });
  };

  const handleHighlightChange = (index, value) => {
    const updatedHighlights = [...newUniversity.highlights];
    updatedHighlights[index] = value;
    setNewUniversity({
      ...newUniversity,
      highlights: updatedHighlights,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUniversities([...universities, newUniversity]);
    setShowModal(false);
    setNewUniversity({
      name: "",
      NAME: "",
      logo: "",
      location: "",
      programs: [],
      highlights: [],
      contact: {
        phone: "",
        email: "",
      },
    });
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-5">Top Universities</h1>
      <div className="row">
        {universities.map((university, index) => (
          <AdminUniversity key={index} university={university} />
        ))}
      </div>
      <div className="text-center mt-4">
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Add University
        </Button>
      </div>

      {/* Modal for Adding University */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New University</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="NAME"
                value={newUniversity.NAME}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formLogo">
              <Form.Label>Logo URL</Form.Label>
              <Form.Control
                type="text"
                name="logo"
                value={newUniversity.logo}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={newUniversity.location}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPrograms">
              <Form.Label>Programs</Form.Label>
              {newUniversity.programs.map((program, index) => (
                <Form.Control
                  key={index}
                  type="text"
                  value={program}
                  onChange={(e) => handleProgramChange(index, e.target.value)}
                  className="mb-2"
                  required
                />
              ))}
              <Button variant="secondary" onClick={handleAddProgram}>
                Add Program
              </Button>
            </Form.Group>
            <Form.Group controlId="formHighlights">
              <Form.Label>Highlights</Form.Label>
              {newUniversity.highlights.map((highlight, index) => (
                <Form.Control
                  key={index}
                  type="text"
                  value={highlight}
                  onChange={(e) => handleHighlightChange(index, e.target.value)}
                  className="mb-2"
                  required
                />
              ))}
              <Button variant="secondary" onClick={handleAddHighlight}>
                Add Highlight
              </Button>
            </Form.Group>
            <Form.Group controlId="formContactPhone">
              <Form.Label>Contact Phone</Form.Label>
              <Form.Control
                type="text"
                name="contact.phone"
                value={newUniversity.contact.phone}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formContactEmail">
              <Form.Label>Contact Email</Form.Label>
              <Form.Control
                type="email"
                name="contact.email"
                value={newUniversity.contact.email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Add University
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PaymentInvoiceMangament;
