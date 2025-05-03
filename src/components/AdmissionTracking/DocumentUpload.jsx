import { useState } from "react";
import { Container, Form, Button, ListGroup, Alert } from "react-bootstrap";

const DocumentUpload = () => {
  const [documents, setDocuments] = useState({
    passport: [],
    academicRecords: [],
    visaDocuments: [],
  });

  const handleFileChange = (event, category) => {
    const selectedFiles = Array.from(event.target.files);
    setDocuments((prevDocs) => ({
      ...prevDocs,
      [category]: [...prevDocs[category], ...selectedFiles],
    }));
  };

  const removeFile = (category, index) => {
    setDocuments((prevDocs) => ({
      ...prevDocs,
      [category]: prevDocs[category].filter((_, i) => i !== index),
    }));
  };

  const handleUpload = () => {
    // Simulating file upload process
    alert("Files uploaded successfully!");
  };

  return (
    <Container className="mt-4"  >
      <h2>Document Upload</h2>
      <Alert variant="info">
        Upload Passport, Academic Records, and Visa Documents.
      </Alert>

      {/* Passport Upload */}
      <Form.Group className="mb-3">
        <Form.Label style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
          Upload Passport
        </Form.Label>
        <Form.Control
          type="file"
          multiple
          onChange={(e) => handleFileChange(e, "passport")}
        />
        <ListGroup className="mt-2">
          {documents.passport.map((file, index) => (
            <ListGroup.Item
              key={index}
              className="d-flex justify-content-between align-items-center"
            >
              {file.name}
              <Button
                variant="danger"
                size="sm"
                onClick={() => removeFile("passport", index)}
              >
                Remove
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Form.Group>

      {/* Academic Records Upload */}
      <Form.Group className="mb-3">
        <Form.Label style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
          Upload Academic Records
        </Form.Label>
        <Form.Control
          type="file"
          multiple
          onChange={(e) => handleFileChange(e, "academicRecords")}
        />
        <ListGroup className="mt-2">
          {documents.academicRecords.map((file, index) => (
            <ListGroup.Item
              key={index}
              className="d-flex justify-content-between align-items-center"
            >
              {file.name}
              <Button
                variant="danger"
                size="sm"
                onClick={() => removeFile("academicRecords", index)}
              >
                Remove
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Form.Group>

      {/* Visa Documents Upload */}
      <Form.Group className="mb-3">
        <Form.Label style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
          Upload Visa Documents
        </Form.Label>
        <Form.Control
          type="file"
          multiple
          onChange={(e) => handleFileChange(e, "visaDocuments")}
        />
        <ListGroup className="mt-2">
          {documents.visaDocuments.map((file, index) => (
            <ListGroup.Item
              key={index}
              className="d-flex justify-content-between align-items-center"
            >
              {file.name}
              <Button
                variant="danger"
                size="sm"
                onClick={() => removeFile("visaDocuments", index)}
              >
                Remove
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Form.Group>

      <Button variant="primary" onClick={handleUpload}>
        Upload Files
      </Button>
    </Container>
  );
};

export default DocumentUpload;
