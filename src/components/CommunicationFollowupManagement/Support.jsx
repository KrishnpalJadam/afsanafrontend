import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaWhatsapp, FaPhoneAlt, FaEnvelope, FaComments } from "react-icons/fa";
import TawkMessenger from "../../TawkMessenger";

const ContactSupport = () => {
  const openChat = () => {
    if (window.Tawk_API && window.Tawk_API.maximize) {
      window.Tawk_API.maximize(); // opens the chat widget
    } else {
      alert("Chat not loaded yet. Please wait a second.");
    }
  };
  return (
    <>
      <TawkMessenger />
      <Container className="mt-4">
        <h3 className="mb-4 text-center">Contact Support</h3>

        <Row className="g-4">
          {/* Live Chat */}
          <Col md={6} lg={3}>
            <Card className="h-100 text-center">
              <Card.Body>
                <FaComments size={40} className="mb-3 text-primary" />
                <Card.Title>Live Chat</Card.Title>
                <Card.Text>
                  Connect with our support team in real-time.
                </Card.Text>
                <Button
                  variant="primary"
                  //   onClick={() => alert("Opening chat...")}
                  onClick={openChat}
                >
                  Start Chat
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Email */}
          <Col md={6} lg={3}>
            <Card className="h-100 text-center">
              <Card.Body>
                <FaEnvelope size={40} className="mb-3 text-danger" />
                <Card.Title>Email Us</Card.Title>
                <Card.Text>Send us an email and we'll reply shortly.</Card.Text>
                <Button variant="danger" href="mailto:support@yourdomain.com">
                  Send Email
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* WhatsApp */}
          <Col md={6} lg={3}>
            <Card className="h-100 text-center">
              <Card.Body>
                <FaWhatsapp size={40} className="mb-3 text-success" />
                <Card.Title>WhatsApp</Card.Title>
                <Card.Text>Chat with us instantly on WhatsApp.</Card.Text>
                <Button
                  variant="success"
                  href="https://wa.me/919999999999"
                  target="_blank"
                >
                  Chat on WhatsApp
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Phone */}
          <Col md={6} lg={3}>
            <Card className="h-100 text-center">
              <Card.Body>
                <FaPhoneAlt size={40} className="mb-3 text-info" />
                <Card.Title>Call Us</Card.Title>
                <Card.Text>Reach out via phone during working hours.</Card.Text>
                <Button variant="info" href="tel:+919999999999">
                  Call Now
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ContactSupport;
