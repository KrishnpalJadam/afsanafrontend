import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Card,
  Button,
  ListGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";

const SearchPrograms = () => {
  const [filters, setFilters] = useState({
    destination: "",
    university: "",
    programLevel: "",
    fieldOfStudy: "",
    intake: "",
  });

  // Updated universities object with destinations and their universities
  const universities = {
    Canada: ["University of Toronto", "UBC"],
    Hungary: ["Széchenyi István University"],
    UK: ["University of Oxford", "University of Cambridge"],
    // Add more as needed
  };

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const [results, setResults] = useState([]);

  const handleSearch = () => {
    // Dummy Data to show after search
    const dummyResults = [
      {
        university: "University of Toronto",
        program: "Bachelor of Science in Computer Science",
        intake: "Fall Semester 2025/2026",
      },
      {
        university: "University of Oxford",
        program: "Master of Engineering in Civil Engineering",
        intake: "Spring Semester 2025/2026",
      },
      {
        university: "UBC",
        program: "Master of Business Administration",
        intake: "Fall Semester 2026/2027",
      },
    ];

    setResults(dummyResults); // Show dummy results after clicking "Search"
  };

  // const handleSearch = () => {
  // Dummy Data based on selected filters

  // Simulate search filter matching and update results
  //   const filteredResults = searchResults.filter((result) => {
  //     return (
  //       (filters.destination === "" ||
  //         result.university.includes(filters.destination)) &&
  //       (filters.programLevel === "" ||
  //         result.program.includes(filters.programLevel)) &&
  //       (filters.intake === "" || result.intake.includes(filters.intake))
  //     );
  //   });

  //   setResults(filteredResults);
  // };

  return (
    <Container className="mt-4">
      <h3 className="mb-4">Search Programs & Schools</h3>
      <Card className="mb-4">
        <Card.Body>
          <Form>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="destination">
                  <Form.Label>Destination</Form.Label>
                  <Form.Select
                    name="destination"
                    value={filters.destination}
                    onChange={handleChange}
                  >
                    <option value="">Select Country</option>
                    <option>Hungary</option>
                    <option>Cyprus</option>
                    <option>Canada</option>
                    <option>Malaysia</option>
                    <option>UK</option>
                    <option>Netherlands</option>
                    <option>Germany</option>
                    <option>Malta</option>
                    <option>Switzerland</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="university">
                  <Form.Label>University</Form.Label>
                  <Form.Select
                    name="university"
                    value={filters.university}
                    onChange={handleChange}
                    disabled={!filters.destination} // Disable if no destination is selected
                  >
                    <option value="">Select University</option>
                    {(universities[filters.destination] || []).map(
                      (uni, idx) => (
                        <option key={idx}>{uni}</option>
                      )
                    )}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="programLevel">
                  <Form.Label>Program Level</Form.Label>
                  <Form.Select
                    name="programLevel"
                    value={filters.programLevel}
                    onChange={handleChange}
                  >
                    <option value="">Select Level</option>
                    <option>Foundation</option>
                    <option>Bachelor's</option>
                    <option>Master's</option>
                    <option>Double Degree</option>
                    <option>Doctoral</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="fieldOfStudy">
                  <Form.Label>Field of Study</Form.Label>
                  <Form.Select
                    name="fieldOfStudy"
                    value={filters.fieldOfStudy}
                    onChange={handleChange}
                  >
                    <option value="">Select Field</option>
                    <option>
                      Faculty of Architecture, Civil Engineering and Transport
                      Sciences
                    </option>
                    <option>
                      Kautz Gyula Faculty of Business and Economics
                    </option>
                    <option>
                      Apáczai Csere János Faculty of Humanities, Education and
                      Social Sciences
                    </option>
                    <option>
                      Audi Hungaria Faculty of Automotive Engineering
                    </option>
                    <option>
                      Faculty of Mechanical Engineering, Informatics and
                      Electrical Engineering
                    </option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="intake">
                  <Form.Label>Intake</Form.Label>
                  <Form.Select
                    name="intake"
                    value={filters.intake}
                    onChange={handleChange}
                  >
                    <option value="">Select Intake</option>
                    <option>Spring Semester 2025/2026</option>
                    <option>Fall Semester 2026/2027</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Button variant="primary" onClick={handleSearch}>
              Search
            </Button>
          </Form>
        </Card.Body>
      </Card>

      {/* Search Results */}
      <Card className="mt-4">
        <Card.Body>
          <h5 className="mb-3">Search Results</h5>
          <Row>
            {results.length > 0 ? (
              results.map((result, index) => (
                <Col md={4} key={index} className="mb-4">
                  <Card>
                    <Card.Body>
                      <Card.Title>{result.university}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        {result.program}
                      </Card.Subtitle>
                      <Card.Text>
                        <strong>Intake:</strong> {result.intake}
                      </Card.Text>
                      <Button variant="primary">
                        <Link
                          to={"/university"}
                          className="text-white text-decoration-none"
                        >
                          Apply Now
                        </Link>
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <Col>
                <p>Click "Search" to view available programs.</p>
              </Col>
            )}
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SearchPrograms;
