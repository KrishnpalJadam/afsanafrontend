import React, { useEffect, useState } from "react";
import { Form, Row, Col, Modal, Button } from "react-bootstrap";
// Ensure axios is imported correctly
import Swal from 'sweetalert2'; // For SweetAlert messages
import BASE_URL from "../Config";
import api from "../interceptors/axiosInterceptor";
const InquiryForm = () => {
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [getData, setData] = useState([])
  const [gpa, setGpa] = useState("");
  const [year, setYear] = useState("");
  const [newInquiry, setNewInquiry] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    address: "",
    course: "",
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
  const fetchBranchData = async () => {
    try {
      const response = await api.get(`${BASE_URL}branch`);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchBranchData();
  }, []);
  const handleCloseInquiryModal = () => {
    setShowInquiryModal(false);
    setNewInquiry({
      name: "",
      email: "",
      phone: "",
      city: "",
      address: "",
      course: "",
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
  };

  const handleInquiryInputChange = (e) => {
    const { name, value } = e.target;
    setNewInquiry((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (name, value, checked) => {
    setNewInquiry((prev) => {
      const newArray = checked
        ? [...prev[name], value]
        : prev[name].filter((item) => item !== value);
      return { ...prev, [name]: newArray };
    });
  };

  const handleJobExpChange = (field, value) => {
    setNewInquiry((prev) => ({
      ...prev,
      jobExperience: { ...prev.jobExperience, [field]: value },
    }));
  };

  const handleAddInquiry = async (e) => {
    e.preventDefault(); // Prevent form submission

    const requestData = {
      counselor_id: 1,
      inquiry_type: newInquiry.inquiryType,
      source: newInquiry.source,
      branch: newInquiry.branch,
      full_name: newInquiry.name,
      phone_number: newInquiry.phone,
      email: newInquiry.email,
      country: newInquiry.country,
      city: newInquiry.city,
      date_of_birth: newInquiry.date_of_birth,

      gender: newInquiry.gender,
      education_background: newInquiry.education,
      english_proficiency: newInquiry.englishProficiency,
      course_name: newInquiry.course_name,
      study_level: newInquiry.studyLevel,
      study_field: newInquiry.studyField,
      intake: newInquiry.intake,
      budget: newInquiry.budget,
      consent: newInquiry.consent,
      preferred_countries: newInquiry.preferredCountries,
      highest_level: newInquiry.highestLevel,
      university: newInquiry.university,
      medium: newInquiry.medium,
      test_type: newInquiry.testType,
      overall_score: newInquiry.overallScore,
      reading_score: newInquiry.readingScore,
      writing_score: newInquiry.writingScore,
      speaking_score: newInquiry.speakingScore,
      listening_score: newInquiry.listeningScore,
      company_name: newInquiry.companyName,
      job_title: newInquiry.jobTitle,
      job_duration: newInquiry.jobDuration,
      study_gap: newInquiry.studyGap,
      visa_refused: newInquiry.visaRefused,
      refusal_reason: newInquiry.refusalReason,
      address: newInquiry.address,
      present_address: newInquiry.presentAddress,
      date_of_inquiry: newInquiry.date_of_inquiry, // Use the date of inquiry from the form
      additional_notes: newInquiry.additionalNotes,

    };

    try {
      // Send the request to the API
      const response = await api.post(`${BASE_URL}inquiries`, requestData);

      if (response.status === 201) {
        // Show success message using SweetAlert
        Swal.fire({
          title: 'Success!',
          text: 'Inquiry submitted successfully.',
          icon: 'success',
          confirmButtonText: 'Ok',
        }).then(() => {
          handleCloseInquiryModal(); // Close modal after success
          fetchInquiries(); // 🔄 Fetch updated inquiry list
        });
      } else {
        // Handle non-200 responses
        Swal.fire({
          title: 'Success!',
          text: 'Inquiry added successfully.',
          icon: 'success',
          confirmButtonText: 'Ok',
        }).then(() => {
          handleCloseInquiryModal();
          setCurrentPage(1);
          fetchInquiries();
        });
      }
    } catch (error) {
      console.error("Error during inquiry submission:", error);
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong. Please try again.',
        icon: 'error',
        confirmButtonText: 'Close',
      });
    }
  };

  return (
    <div>
      {/* <h4> New Inquiry Form</h4> */}

      {/* Modal for Adding New Inquiry */}
      {/* <Modal
        show={showInquiryModal}
        onHide={handleCloseInquiryModal}
        centered
        size="lg "
      >
        <Modal.Header closeButton>
          <Modal.Title>New Inquiry Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
       
        </Modal.Body>
      </Modal> */}






      <Form onSubmit={handleAddInquiry}>
        {/* Inquiry Info */}
        <Row className="mb-3">
          <Col md={4}>
            <Form.Group controlId="inquiryType">
              <Form.Label>Inquiry Type</Form.Label>
              <Form.Select
                name="inquiryType"
                value={newInquiry.inquiryType}
                onChange={handleInquiryInputChange}
                required>
                <option value="">Select Inquiry Type</option>
                <option value="student_visa">Student Visa</option>
                <option value="visit_visa">Visit Visa</option>
                <option value="work_visa">Work Visa</option>
                <option value="short_visa">Short Visa</option>
                <option value="german_course">German Course</option>
                <option value="english_course">English Course</option>
                <option value="others">Others</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="source">
              <Form.Label>Source</Form.Label>
              <Form.Select
                name="source"
                value={newInquiry.source}
                onChange={handleInquiryInputChange}
                required>
                <option value="whatsapp">WhatsApp</option>
                <option value="facebook">Facebook</option>
                <option value="youtube">YouTube</option>
                <option value="website">Website</option>
                <option value="referral">Referral</option>
                <option value="event">Event</option>
                <option value="agent">Agent</option>
                <option value="office_visit">Office Visit</option>
                <option value="hotline">Hotline</option>
                <option value="seminar">Seminar</option>
                <option value="expo">Expo</option>
                <option value="other">Other</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="branch">
              <Form.Label>Branch</Form.Label>
              <Form.Select
                name="branch"
                value={newInquiry.branch}
                onChange={handleInquiryInputChange}
                required
              >
                <option value="">Select Branch</option>
                {getData.map((item) => (
                  <option key={item.id} value={item.branch_name}>
                    {item.branch_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

          </Col>
        </Row>

        {/* Personal Information */}
        <h5 className="mt-4 mb-3">Personal Information</h5>
        <Row className="mb-3">
          <Col md={3}>
            <Form.Group controlId="name">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter full name"
                name="name"
                value={newInquiry.name}
                onChange={handleInquiryInputChange}
                required />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="phone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter phone number"
                name="phone"
                value={newInquiry.phone}
                onChange={handleInquiryInputChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email"
                placeholder="Enter email"
                name="email"
                value={newInquiry.email}
                onChange={handleInquiryInputChange}
                required />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="country">
              <Form.Label>Interested Country</Form.Label>
              <Form.Select
                name="country"
                value={newInquiry.country}
                onChange={handleInquiryInputChange}
                required
              >
                <option value="">Select Country</option>
                <option value="Hungary">Hungary</option>
                <option value="UK">UK</option>
                <option value="Cyprus">Cyprus</option>
                <option value="Canada">Canada</option>
                <option value="Malaysia">Malaysia</option>
                <option value="Lithuania">Lithuania</option>
                <option value="Latvia">Latvia</option>
                <option value="Germany">Germany</option>
                <option value="New Zealand">New Zealand</option>
                <option value="Others">Others</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">

          <Col md={4}>
            <Form.Group controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter city"
                name="city"
                value={newInquiry.city}
                onChange={handleInquiryInputChange}
                required />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="dateOfInquiry">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                name="date_of_birth"
                value={newInquiry.date_of_birth}
                onChange={handleInquiryInputChange}
                required />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="inquiryType">
              <Form.Label>Gender</Form.Label>
              <Form.Select
                name="gender"
                value={newInquiry.gender}
                onChange={handleInquiryInputChange}
                required>
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        {/* Educational Background */}
        <h4 className="mt-4">Academic Background</h4>
        <Row className="mb-3">
          <Col md={3}>
            <Form.Group controlId="highestLevel">
              <Form.Label>Highest Level Completed</Form.Label>
              <Form.Select
                value={newInquiry.highestLevel}
                onChange={(e) => {
                  const selected = e.target.value;
                  setNewInquiry({ ...newInquiry, highestLevel: selected });
                  setGpa(""); // Reset when level changes
                  setYear("");
                }}
                required
              >
                <option value="">Select</option>
                <option value="ssc">SSC</option>
                <option value="hsc">HSC</option>
                <option value="bachelor">Bachelor</option>
                <option value="master">Master</option>
              </Form.Select>
            </Form.Group>
          </Col>

          {newInquiry.highestLevel && (
            <>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>
                    {newInquiry.highestLevel.toUpperCase()} GPA / CGPA
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter GPA"
                    value={gpa}
                    onChange={(e) => setGpa(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Year of Passing</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={3} className="d-flex align-items-end">
                <Button
                  variant="primary"
                  onClick={() => {
                    const eduObj = {
                      level: newInquiry.highestLevel,
                      gpa,
                      year,
                    };
                    setNewInquiry({
                      ...newInquiry,
                      education: [eduObj], // override if only one is allowed
                      highestLevel: newInquiry.highestLevel,
                    });
                  }}
                >
                  Save
                </Button>
              </Col>
            </>
          )}

        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="university">
              <Form.Label>Board/University Name</Form.Label>
              <Form.Control type="text" value={newInquiry.university}
                onChange={(e) =>
                  setNewInquiry({ ...newInquiry, university: e.target.value })
                } />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="medium">
              <Form.Label>Medium of Instruction</Form.Label>
              <Form.Select
                value={newInquiry.medium}
                onChange={(e) =>
                  setNewInquiry({ ...newInquiry, medium: e.target.value })
                }
                required>
                <option value="">Select</option>
                <option value="english">English</option>
                <option value="bangla">Bangla</option>
                <option value="other">Other</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>


        {/* English Proficiency */}

        <h5 className="mt-4 mb-3">Course & Program Info</h5>
        <Row className="mb-3">
          <Col md={4}>
            <Form.Group controlId="course_name">
              <Form.Label>Interested Program/Course Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Course Name"
                value={newInquiry.course_name}
                onChange={(e) =>
                  setNewInquiry({ ...newInquiry, course_name: e.target.value })
                }
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group controlId="study_level">
              <Form.Label>Preferred Study Level</Form.Label>
              <Form.Select
                value={newInquiry.studyLevel}
                onChange={(e) =>
                  setNewInquiry({ ...newInquiry, studyLevel: e.target.value })
                }
              >
                <option value="">Select</option>
                <option value="diploma">Diploma</option>
                <option value="bachelor">Bachelor</option>
                <option value="master">Master</option>
                <option value="phd">PhD</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group controlId="study_field">
              <Form.Label>Preferred Study Field</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g. Business, Engineering"
                value={newInquiry.studyField}
                onChange={(e) =>
                  setNewInquiry({ ...newInquiry, studyField: e.target.value })
                }
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={4}>
            <Form.Group controlId="intake">
              <Form.Label>Preferred Intake</Form.Label>
              <Form.Select
                value={newInquiry.intake}
                onChange={(e) =>
                  setNewInquiry({ ...newInquiry, intake: e.target.value })
                }
              >
                <option value="">Select</option>
                <option value="february">February</option>
                <option value="september">September</option>
                <option value="other">Other</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={8}>
            <Form.Label>Preferred Countries</Form.Label>
            <div>
              {["Hungary", "UK", "Cyprus", "Canada", "Malaysia", "Lithuania", "Latvia", "Germany", "New Zealand",].map((country) => (
                <Form.Check
                  inline
                  key={country}
                  type="checkbox"
                  id={`country-${country.toLowerCase()}`}
                  label={country}
                  value={country}
                  checked={newInquiry.preferredCountries.includes(country)}
                  onChange={(e) =>
                    handleCheckboxChange("preferredCountries", country, e.target.checked)
                  }
                />
              ))}
            </div>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={4}>
            <Form.Group controlId="budget">
              <Form.Label>Initial Budget (1-Year Tuition + Living Cost)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter estimated budget"
                value={newInquiry.budget}
                onChange={(e) =>
                  setNewInquiry({ ...newInquiry, budget: e.target.value })
                }
              />
            </Form.Group>
          </Col>
        </Row>

        <h5 className="mt-4 mb-3">English Proficiency</h5>
        <Row className="mb-3">
          <Col md={3}>
            <Form.Group controlId="testType">
              <Form.Label>Test Type</Form.Label>
              <Form.Select
                value={newInquiry.testType}
                onChange={(e) =>
                  setNewInquiry({ ...newInquiry, testType: e.target.value })
                }
              >
                <option value="">Select</option>
                <option value="ielts">IELTS</option>
                <option value="toefl">TOEFL</option>
                <option value="duolingo">Duolingo</option>
                <option value="no_test">No Test Yet</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={3}>
            <Form.Group controlId="overallScore">
              <Form.Label>Overall Band Score</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g. 6.5"
                value={newInquiry.overallScore}
                onChange={(e) =>
                  setNewInquiry({ ...newInquiry, overallScore: e.target.value })
                }
              />
            </Form.Group>
          </Col>

          <Col md={3}>
            <Form.Group controlId="readingScore">
              <Form.Label>Reading Score</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g. 6.5"
                value={newInquiry.readingScore}
                onChange={(e) =>
                  setNewInquiry({ ...newInquiry, readingScore: e.target.value })
                }
              />
            </Form.Group>
          </Col>

          <Col md={3}>
            <Form.Group controlId="writingScore">
              <Form.Label>Writing Score</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g. 6.0"
                value={newInquiry.writingScore}
                onChange={(e) =>
                  setNewInquiry({ ...newInquiry, writingScore: e.target.value })
                }
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={3}>
            <Form.Group controlId="speakingScore">
              <Form.Label>Speaking Score</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g. 7.0"
                value={newInquiry.speakingScore}
                onChange={(e) =>
                  setNewInquiry({ ...newInquiry, speakingScore: e.target.value })
                }
              />
            </Form.Group>
          </Col>

          <Col md={3}>
            <Form.Group controlId="listeningScore">
              <Form.Label>Listening Score</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g. 6.5"
                value={newInquiry.listeningScore}
                onChange={(e) =>
                  setNewInquiry({ ...newInquiry, listeningScore: e.target.value })
                }
              />
            </Form.Group>
          </Col>
        </Row>
        <h5 className="mt-4 mb-3">Work & Visa History</h5>
        <Row className="mb-3">
          <Col md={4}>
            <Form.Group controlId="companyName">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Company Name"
                value={newInquiry.companyName}
                onChange={(e) =>
                  setNewInquiry({ ...newInquiry, companyName: e.target.value })
                }
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group controlId="jobTitle">
              <Form.Label>Job Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Job Title"
                value={newInquiry.jobTitle}
                onChange={(e) =>
                  setNewInquiry({ ...newInquiry, jobTitle: e.target.value })
                }
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group controlId="jobDuration">
              <Form.Label>Duration</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g. Jan 2020 - Dec 2022"
                value={newInquiry.jobDuration}
                onChange={(e) =>
                  setNewInquiry({ ...newInquiry, jobDuration: e.target.value })
                }
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3" controlId="studyGap">
          <Form.Label>Study Gap (if any)</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            placeholder="Explain any study gaps"
            value={newInquiry.studyGap}
            onChange={(e) =>
              setNewInquiry({ ...newInquiry, studyGap: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="visaRefused">
          <Form.Label>Any Previous Visa Refusal?</Form.Label>
          <div>
            <Form.Check
              inline
              label="Yes"
              name="visaRefusal"
              type="radio"
              id="visaYes"
              value="yes"
              checked={newInquiry.visaRefused === "yes"}
              onChange={(e) =>
                setNewInquiry({ ...newInquiry, visaRefused: e.target.value })
              }
            />
            <Form.Check
              inline
              label="No"
              name="visaRefusal"
              type="radio"
              id="visaNo"
              value="no"
              checked={newInquiry.visaRefused === "no"}
              onChange={(e) =>
                setNewInquiry({ ...newInquiry, visaRefused: e.target.value })
              }
            />
          </div>
        </Form.Group>

        <Form.Group className="mb-3" controlId="refusalReason">
          <Form.Label>Visa Refusal Reason (if yes)</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter reason if any"
            value={newInquiry.refusalReason}
            onChange={(e) =>
              setNewInquiry({ ...newInquiry, refusalReason: e.target.value })
            }
          />
        </Form.Group>

        <h5 className="mt-4 mb-3">Address</h5>
        <Form.Group className="mb-3" controlId="permanentAddress">
          <Form.Label>Permanent Address</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            placeholder="Permanent Address"
            value={newInquiry.address}
            onChange={(e) =>
              setNewInquiry({ ...newInquiry, address: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="presentAddress">
          <Form.Label>Present Address</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            placeholder="Present Address"
            value={newInquiry.presentAddress}
            onChange={(e) =>
              setNewInquiry({ ...newInquiry, presentAddress: e.target.value })
            }
          />
        </Form.Group>

        <h5 className="mt-4 mb-3">Final Details</h5>
        <Row className="mb-3">
          <Col md={4}>
            <Form.Group controlId="inquiryDate">
              <Form.Label>Date of Inquiry</Form.Label>
              <Form.Control
                type="date"

                name="date_of_inquiry"
                value={newInquiry.date_of_inquiry}
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3" controlId="additionalNotes">
          <Form.Label>Additional Notes (Optional)</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Any additional comments..."
            value={newInquiry.additionalNotes}
            onChange={(e) =>
              setNewInquiry({ ...newInquiry, additionalNotes: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group controlId="consentCheckbox" className="mb-3">
          <Form.Check
            type="checkbox"
            required
            label="I confirm all information is correct and give permission to Study First Info to contact me."
            checked={newInquiry.consent}
            onChange={(e) =>
              setNewInquiry({ ...newInquiry, consent: e.target.checked })
            }
          />
        </Form.Group>

        <div className="d-flex justify-content-end mt-4">
          <Button variant="danger" onClick={handleCloseInquiryModal} className="me-2">
            Cancel
          </Button>
          <Button variant="secondary" type="submit">
            Submit Inquiry
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default InquiryForm;
