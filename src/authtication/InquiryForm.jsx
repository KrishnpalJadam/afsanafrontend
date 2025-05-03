import React from "react";
import { Form, Row, Col } from "react-bootstrap";

const InquiryForm = () => {
  return (
    <div>
      <h4 className="mb-4">New Inquiry Form</h4>

      {/* Inquiry Info */}
      <Row className="mb-3">
        <Col md={3}>
          <Form.Group controlId="inquiryType">
            <Form.Label>Inquiry Type</Form.Label>
            <Form.Select>
              <option value="">Select Inquiry Type</option>
              <option value="studentVisa">Student Visa</option>
              <option value="touristVisa">Visit Visa</option>
              <option value="touristVisa">Work Visa</option>
              <option value="touristVisa">German Course</option>
              <option value="touristVisa">English Course</option>
              <option value="touristVisa">IELTS</option>
              
              {/* Add more as needed */}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="source">
            <Form.Label>Source</Form.Label>
            <Form.Select>
              <option value="">Select Source</option>
              <option value="officeVisit">Office Visit</option>
              <option value="WhatsApp">WhatsApp</option>
              <option value="Facebook">Facebook</option>
              <option value="Hotline">Hotline</option>
              <option value="Reference">Reference</option>
              <option value="Website">Website</option>
              <option value="Webinar">Webinar</option>
              <option value="Expo">Expo</option>
              <option value="YouTube">YouTube</option>
              <option value="Contact Form">Contact Form</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="branch">
            <Form.Label>Branch</Form.Label>
            <Form.Select>
              <option value="">Select Branch</option>
              <option value="dhaka">Dhaka</option>
              <option value="sylhet">Sylhet</option>
              {/* Add more branches if needed */}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="assignee">
            <Form.Label>Assignee (Counselor)</Form.Label>
            <Form.Select>
              <option value="">Select Counselor</option>
              <option value="counselor1">Counselor 01</option>
              <option value="counselor2">Counselor 02</option>
              <option value="counselor3">Counselor 03</option>
              <option value="counselor4">Counselor 04</option>
              <option value="counselor5">Counselor 05</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      {/* Personal Information */}
      <h5 className="mt-4 mb-3">Personal Information</h5>
      <Row className="mb-3">
        <Col md={3}>
          <Form.Group controlId="fullName">
            <Form.Label>Full Name </Form.Label>
            <Form.Control type="text" placeholder="Enter full name" />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="phoneNumber">
            <Form.Label>Phone Number </Form.Label>
            <Form.Control type="text" placeholder="Enter phone number" />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="email">
            <Form.Label>Email </Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group countryId="Country">
            <Form.Label> Country </Form.Label>
            <Form.Control type="text" placeholder="Enter city" />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={3}>
          <Form.Group controlId="city">
            <Form.Label> City </Form.Label>
            <Form.Control type="text" placeholder="Enter city" />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="dateOfInquiry">
            <Form.Label>Date of Inquiry</Form.Label>
            <Form.Control type="date" />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group addressId="postalAddress">
            <Form.Label>Address </Form.Label>
            <Form.Control type="text" placeholder="Enter address" />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group presentaddressId="postalAddress">
            <Form.Label> Present Address </Form.Label>
            <Form.Control type="text" placeholder="Enter address" />
          </Form.Group>
        </Col>
      </Row>

      {/* Educational Background */}
      <h5 className="mt-4 mb-3">Educational Background</h5>
      <Row className="mb-3">
        <Col md={12}>
          <Form.Check
            inline
            type="checkbox"
            label="SSC"
            id="ssc"
          />
          <Form.Check
            inline
            type="checkbox"
            label="HSC"
            id="hsc"
          />
          <Form.Check
            inline
            type="checkbox"
            label="Degree"
            id="diploma"
          />
          <Form.Check
            inline
            type="checkbox"
            label="Bachelor"
            id="bachelor"
          />
          <Form.Check
            inline
            type="checkbox"
            label="Diploma"
            id="diploma"
          />
          <Form.Check
            inline
            type="checkbox"
            label="Masters"
            id="masters"
          />
          <Form.Check
            inline
            type="checkbox"
            label="O Level"
            id="olevel"
          />
          <Form.Check
            inline
            type="checkbox"
            label=" A Level"
            id="alevel"
          />
          <Form.Check
            inline
            type="checkbox"
            label="Foreign Degree"
            id="foreigndegree"
          />
          {/* Add more options if needed */}
        </Col>
      </Row>

      {/* English Language Proficiency */}
      <h5 className="mt-4 mb-3">English Language Proficiency</h5>
      <Row className="mb-3">
      <Col md={12} className="mt-4">
          <Form.Check inline type="checkbox" label="Reading" id="reading" />
          <Form.Check inline type="checkbox" label="Writing" id="writing" />
          <Form.Check inline type="checkbox" label="Speaking" id="speaking" />
          <Form.Check inline type="checkbox" label="Listening" id="listening" />
        </Col>
      </Row>
      <Row className="mb-3">
        {/* <Col md={4}>
          <Form.Group controlId="testScore">
            <Form.Label>Test Score (e.g., IELTS)</Form.Label>
            <Form.Control type="text" placeholder="e.g., IELTS 7.0" />
          </Form.Group>
        </Col> */}
        <Col md={4}>
          <Form.Check
            className="mt-4"
            type="checkbox"
            label="MOI (Medium of Instruction)"
            id="moi"
          />
        </Col>
        <Col md={4}>
          <Form.Check
            className="mt-4"
            type="checkbox"
            label="No Proficiency Certificate"
            id="noproficiencycertificate"
          />
        </Col>
      </Row>

      {/* Job Experience */}
      <h5 className="mt-4 mb-3">Job Experience</h5>
      <Row className="mb-3">
        <Col md={3}>
          <Form.Group controlId="company">
            <Form.Label>Company</Form.Label>
            <Form.Control type="text" placeholder="Company Name" />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="jobTitle">
            <Form.Label>Job Title</Form.Label>
            <Form.Control type="text" placeholder="Job Title" />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="duration">
            <Form.Label>Duration</Form.Label>
            <Form.Control type="text" placeholder="e.g., 2 years" />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Row>
            <Col>
              <Form.Group controlId="joiningDate">
                <Form.Label>Joining Date</Form.Label>
                <Form.Control type="date" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="endDate">
                <Form.Label>End Date</Form.Label>
                <Form.Control type="date" />
              </Form.Group>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Preferred Countries */}
      <h5 className="mt-4 mb-3">Preferred Countries</h5>
      <Row className="mb-3">
        <Col md={12}>
          <Form.Check inline type="checkbox" label="Hungary" id="hungary" />
          <Form.Check inline type="checkbox" label="Germany" id="germany" />
          <Form.Check inline type="checkbox" label="Austria" id="austria" />
          <Form.Check inline type="checkbox" label="UK" id="uk" />
          <Form.Check inline type="checkbox" label="Denmark" id="denmark" />
          <Form.Check inline type="checkbox" label=" Cyprus" id="cyprus" />
          <Form.Check inline type="checkbox" label="US" id="us" />
          <Form.Check inline type="checkbox" label="Canada" id="canada" />
          <Form.Check inline type="checkbox" label="Australia" id="australia" />
          <Form.Check inline type="checkbox" label="Lithuania" id="lithuania" />
          <Form.Check inline type="checkbox" label=" Estonia" id="estonia" />
          <Form.Check inline type="checkbox" label="Latvia" id="latvia" />
          <Form.Check inline type="checkbox" label="Switzerland" id="switzerland" />
        </Col>
      </Row>

      {/* Action Buttons */}
      <Row className="mt-4">
        <Col>
          <button className="btn btn-secondary me-2">Clear Form</button>
          <button className="btn btn-primary me-2">Save &amp; Submit</button>
          <button className="btn btn-success">Submit</button>
        </Col>
      </Row>
    </div>
  );
};

export default InquiryForm;
