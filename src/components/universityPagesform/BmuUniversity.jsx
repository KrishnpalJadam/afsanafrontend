import React, { useState } from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  TextField,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import api from "../../interceptors/axiosInterceptor";

const steps = ["Application", "Interview", "Visa Process"];

const UniversityStepper = () => {
  const [activeStep, setActiveStep] = useState(0);
  const user_id = localStorage.getItem("user_id");
  const [formData, setFormData] = useState({
    registrationFeePayment: "",
    registration: "",
    applicationSubmission: "",
    applicationFeePayment: "",
    applicationFeeConfirmation: null,
    interviewDate: "",
    interviewOutcome: "",
    conditionalOfferLetter: null,
    invoiceWithOfferLetter: null,
    tuitionFeeTransferProof: null,
    finalOfferLetter: null,
    offerLetterServiceCharge: "",
    universityOfferLetterReceived: "",
    appendixFormCompleted: null,
    passportCopy: null,
    financialSupportDeclaration: null,
    validOfferLetter: null,
    relationshipProofWithSponsor: null,
    englishProof: null,
    incomeProof: null,
    airplaneTicket: null,
    policeClearance: null,
    europassCV: null,
    birthCertificate: null,
    bankStatement: null,
    accommodationProof: null,
    motivationLetter: null,
    previousCertificates: null,
    travelInsurance: null,
    europeanPhoto: null,
    healthInsurance: null,
    visaInterviewDate: "",
    visaDecision: "",
    visaServiceChargePaid: "",
    flightBookingConfirmed: "",
    onlineEnrollmentCompleted: "",
    accommodationConfirmationReceived: "",
    arrivalInCountry: "",
  });
 
//  const [testForm , setTestForm] = useState(
//   {
//     registrationFeePayment : "",
//     student_id:user_id
//   }
//  )
  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };
  const formDataToSubmit = new FormData();
  formDataToSubmit.append("student_id", user_id);
  formDataToSubmit.append("registration_fee_payment",formData.registrationFeePayment);
  formDataToSubmit.append("registration_date", formData.registration);



  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async() => {
    console.log("Form Data Submitted:", formDataToSubmit);
    try {
      const response = await api.post("/application", formDataToSubmit);
      console.log("Form submitted successfully:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <Typography variant="h6" gutterBottom>
              Application Stage
            </Typography>

            {/* 1. Registration Fee Payment */}
            <FormControl fullWidth margin="normal">
              <InputLabel>Registration Fee Payment</InputLabel>
              <Select
                name="registrationFeePayment"
                value={formData.registrationFeePayment}
                onChange={handleChange}
              >
                <MenuItem value="Paid">Paid</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
              </Select>
            </FormControl>

            {/* 2. Registration Date */}
            <TextField
              label="Registration Date"
              name="registration"
              type="date"
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              value={formData.registration}
              onChange={handleChange}
            />

            {/* 3. Application Submission Date */}
            <TextField
              label="Application Submission Date"
              name="applicationSubmission"
              type="date"
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              value={formData.applicationSubmission}
              onChange={handleChange}
            />

            {/* 4. Application Fee Payment */}
            <FormControl fullWidth margin="normal">
              <InputLabel>Application Fee Payment</InputLabel>
              <Select
                name="applicationFeePayment"
                value={formData.applicationFeePayment}
                onChange={handleChange}
              >
                <MenuItem value="Paid">Paid</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
              </Select>
            </FormControl>

            {/* 5. Fee Confirmation Note or Upload (text for now) */}
            <Box
              mt={2}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{
                border: "1px solid #ddd",
                borderRadius: "6px",
                padding: "10px",
                background: "#f9f9f9",
                flexWrap: "wrap",
              }}
            >
              <Typography variant="subtitle1" gutterBottom>
                Application Fee Confirmation (Upload PDF / Screenshot)
              </Typography>
              <div>
                <input
                  type="file"
                  name="applicationFeeConfirmation"
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                  style={{ maxWidth: 250 }}
                />
                {formData.applicationFeeConfirmation && (
                  <Typography variant="body2" mt={1}>
                    Selected file: {formData.applicationFeeConfirmation.name}
                  </Typography>
                )}
              </div>
            </Box>
          </>
        );

      case 1:
        return (
          <>
            <Typography variant="h6" gutterBottom>
              Interview & Offer Process
            </Typography>

            {/* 1. Interview Date */}
            <TextField
              label="University Interview Date"
              name="interviewDate"
              type="date"
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              value={formData.interviewDate}
              onChange={handleChange}
            />

            {/* 2. Interview Outcome */}
            <FormControl fullWidth margin="normal">
              <InputLabel>University Interview Outcome</InputLabel>
              <Select
                name="interviewOutcome"
                value={formData.interviewOutcome}
                onChange={handleChange}
              >
                <MenuItem value="Accepted">Accepted</MenuItem>
                <MenuItem value="Foundation">Foundation</MenuItem>
                <MenuItem value="Rejected">Rejected</MenuItem>
              </Select>
            </FormControl>

            {/* 3. Conditional Offer Letter Confirmation */}
            <Box
              mt={2}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{
                border: "1px solid #ddd",
                borderRadius: "6px",
                padding: "10px",
                background: "#f9f9f9",
                flexWrap: "wrap",
              }}
            >
              <Typography gutterBottom>
                Upload Conditional Offer Letter
              </Typography>
              <input
                type="file"
                name="conditionalOfferLetter"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.png"
                style={{ maxWidth: 250 }}
              />
              {formData.conditionalOfferLetter && (
                <Typography variant="body2" mt={1}>
                  File: {formData.conditionalOfferLetter.name}
                </Typography>
              )}
            </Box>

            {/* 4. Invoice with Conditional Offer Letter */}
            <Box
              mt={2}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{
                border: "1px solid #ddd",
                borderRadius: "6px",
                padding: "10px",
                background: "#f9f9f9",
                flexWrap: "wrap",
              }}
            >
              <Typography gutterBottom>
                Upload Invoice with Conditional Offer Letter
              </Typography>
              <input
                type="file"
                name="invoiceWithOfferLetter"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.png"
                style={{ maxWidth: 250 }}
              />
              {formData.invoiceWithOfferLetter && (
                <Typography variant="body2" mt={1}>
                  File: {formData.invoiceWithOfferLetter.name}
                </Typography>
              )}
            </Box>

            {/* 5. Tuition Fee Transfer Completed */}
            <Box
              mt={2}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{
                border: "1px solid #ddd",
                borderRadius: "6px",
                padding: "10px",
                background: "#f9f9f9",
                flexWrap: "wrap",
              }}
            >
              <Typography variant="subtitle1">
                Tuition Fee Transfer Proof
              </Typography>
              <input
                type="file"
                name="tuitionFeeTransferProof"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                style={{ maxWidth: 250 }}
              />
              {formData.tuitionFeeTransferProof && (
                <Typography variant="body2" color="text.secondary">
                  {formData.tuitionFeeTransferProof.name}
                </Typography>
              )}
            </Box>

            {/* 6. Final University Offer Letter */}
            <Box
              mt={2}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{
                border: "1px solid #ddd",
                borderRadius: "6px",
                padding: "10px",
                background: "#f9f9f9",
                flexWrap: "wrap",
              }}
            >
              <Typography gutterBottom>
                Upload Final University Offer Letter
              </Typography>
              <input
                type="file"
                name="finalOfferLetter"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.png"
                style={{ maxWidth: 250 }}
              />
              {formData.finalOfferLetter && (
                <Typography variant="body2" mt={1}>
                  File: {formData.finalOfferLetter.name}
                </Typography>
              )}
            </Box>
          </>
        );

      case 2:
        return (
          <>
            <Typography variant="h6" gutterBottom>
              Embassy Documents Submission
            </Typography>

            {/* Offer Letter Service Charge Paid */}
            <FormControl fullWidth margin="normal">
              <InputLabel>Offer Letter Service Charge Paid</InputLabel>
              <Select
                name="offerLetterServiceCharge"
                value={formData.offerLetterServiceCharge}
                onChange={handleChange}
              >
                <MenuItem value="Paid">Paid</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
              </Select>
            </FormControl>

            {/* University Offer Letter Received */}
            <TextField
              label="University Offer Letter Received"
              name="universityOfferLetterReceived"
              type="date"
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              value={formData.universityOfferLetterReceived}
              onChange={handleChange}
            />

            {/* Appendix Form Completed */}
            <Box
              mt={2}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{
                border: "1px solid #ddd",
                borderRadius: 2,
                p: 2,
                flexWrap: "wrap",
              }}
            >
              <Typography>Appendix Form Completed</Typography>
              <input
                type="file"
                name="appendixFormCompleted"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                style={{ maxWidth: 250 }}
              />
              {formData.appendixFormCompleted && (
                <Typography variant="body2" color="text.secondary">
                  {formData.appendixFormCompleted.name}
                </Typography>
              )}
            </Box>

            {/* Passport Copy Prepared */}
            <Box
              mt={2}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{
                border: "1px solid #ddd",
                borderRadius: 2,
                p: 2,
                flexWrap: "wrap",
              }}
            >
              <Typography>Passport Copy Prepared</Typography>
              <input
                type="file"
                name="passportCopyPrepared"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                style={{ maxWidth: 250 }}
              />
              {formData.passportCopyPrepared && (
                <Typography variant="body2" color="text.secondary">
                  {formData.passportCopyPrepared.name}
                </Typography>
              )}
            </Box>

            {/* Email Sent for Documents Submission */}
            <TextField
              label="Email Sent for Documents Submission"
              name="emailSentForSubmission"
              type="date"
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              value={formData.emailSentForSubmission}
              onChange={handleChange}
            />

            {/* Appointment Date Confirmation */}
            <TextField
              label="Appointment Date Confirmation"
              name="appointmentDateConfirmation"
              type="date"
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              value={formData.appointmentDateConfirmation}
              onChange={handleChange}
            />

            {/* Repeat similar layout for each file field */}

            {/* Declaration of Financial Support (Affidavit) */}
            <Box
              mt={2}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{
                border: "1px solid #ddd",
                borderRadius: 2,
                p: 2,
                flexWrap: "wrap",
              }}
            >
              <Typography>
                Declaration of Financial Support (Affidavit)
              </Typography>
              <input
                type="file"
                name="financialSupportDeclaration"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                style={{ maxWidth: 250 }}
              />
              {formData.financialSupportDeclaration && (
                <Typography variant="body2" color="text.secondary">
                  {formData.financialSupportDeclaration.name}
                </Typography>
              )}
            </Box>

            {/* Valid Final Offer Letter Issued by the University */}
            <Box
              mt={2}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{
                border: "1px solid #ddd",
                borderRadius: 2,
                p: 2,
                flexWrap: "wrap",
              }}
            >
              <Typography>
                Valid Final Offer Letter Issued by the University
              </Typography>
              <input
                type="file"
                name="validOfferLetter"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                style={{ maxWidth: 250 }}
              />
              {formData.validOfferLetter && (
                <Typography variant="body2" color="text.secondary">
                  {formData.validOfferLetter.name}
                </Typography>
              )}
            </Box>

            {/* Proof of Relationship with Sponsor */}
            <Box
              mt={2}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{
                border: "1px solid #ddd",
                borderRadius: 2,
                p: 2,
                flexWrap: "wrap",
              }}
            >
              <Typography>Proof of Relationship with Sponsor</Typography>
              <input
                type="file"
                name="relationshipProofWithSponsor"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                style={{ maxWidth: 250 }}
              />
              {formData.relationshipProofWithSponsor && (
                <Typography variant="body2" color="text.secondary">
                  {formData.relationshipProofWithSponsor.name}
                </Typography>
              )}
            </Box>

            {/* Proof of English Language Ability */}
            <Box
              mt={2}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{
                border: "1px solid #ddd",
                borderRadius: 2,
                p: 2,
                flexWrap: "wrap",
              }}
            >
              <Typography>
                Proof of English Language Ability (If Any)
              </Typography>
              <input
                type="file"
                name="englishProof"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                style={{ maxWidth: 250 }}
              />
              {formData.englishProof && (
                <Typography variant="body2" color="text.secondary">
                  {formData.englishProof.name}
                </Typography>
              )}
            </Box>

            {/* Add other fields in the same way for the remaining documents */}

            {/* Visa Interview Date Scheduled */}
            <TextField
              label="Visa Interview Date"
              name="visaInterviewDate"
              type="date"
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              value={formData.visaInterviewDate}
              onChange={handleChange}
            />

            {/* Residence Permit Form */}
            <Box
              mt={2}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{
                border: "1px solid #ddd",
                borderRadius: 2,
                p: 2,
                flexWrap: "wrap",
              }}
            >
              <Typography>Residence Permit Form + Appendix 14</Typography>
              <input
                type="file"
                name="residencePermitForm"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                style={{ maxWidth: 250 }}
              />
              {formData.residencePermitForm && (
                <Typography variant="body2" color="text.secondary">
                  {formData.residencePermitForm.name}
                </Typography>
              )}
            </Box>

            {/* Proof of Income (TIN, TAX, TRADE Certificate) */}
            <Box
              mt={2}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{
                border: "1px solid #ddd",
                borderRadius: 2,
                p: 2,
                flexWrap: "wrap",
              }}
            >
              <Typography>
                Proof of Income (TIN, TAX, TRADE Certificate)
              </Typography>
              <input
                type="file"
                name="incomeProof"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                style={{ maxWidth: 250 }}
              />
              {formData.incomeProof && (
                <Typography variant="body2" color="text.secondary">
                  {formData.incomeProof.name}
                </Typography>
              )}
            </Box>

            {/* One-Way Airplane Ticket Booking */}
            <Box
              mt={2}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{
                border: "1px solid #ddd",
                borderRadius: 2,
                p: 2,
                flexWrap: "wrap",
              }}
            >
              <Typography>One-Way Airplane Ticket Booking</Typography>
              <input
                type="file"
                name="airplaneTicket"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                style={{ maxWidth: 250 }}
              />
              {formData.airplaneTicket && (
                <Typography variant="body2" color="text.secondary">
                  {formData.airplaneTicket.name}
                </Typography>
              )}
            </Box>

            {/* Police Clearance Certificate */}
            <Box
              mt={2}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{
                border: "1px solid #ddd",
                borderRadius: 2,
                p: 2,
                flexWrap: "wrap",
              }}
            >
              <Typography>Police Clearance Certificate</Typography>
              <input
                type="file"
                name="policeClearance"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                style={{ maxWidth: 250 }}
              />
              {formData.policeClearance && (
                <Typography variant="body2" color="text.secondary">
                  {formData.policeClearance.name}
                </Typography>
              )}
            </Box>

            {/* Europass CV */}
            <Box
              mt={2}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{
                border: "1px solid #ddd",
                borderRadius: 2,
                p: 2,
                flexWrap: "wrap",
              }}
            >
              <Typography>Europass CV</Typography>
              <input
                type="file"
                name="europassCV"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                style={{ maxWidth: 250 }}
              />
              {formData.europassCV && (
                <Typography variant="body2" color="text.secondary">
                  {formData.europassCV.name}
                </Typography>
              )}
            </Box>

            {/* Birth Certificate (English) */}
            <Box
              mt={2}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{
                border: "1px solid #ddd",
                borderRadius: 2,
                p: 2,
                flexWrap: "wrap",
              }}
            >
              <Typography>Birth Certificate (English)</Typography>
              <input
                type="file"
                name="birthCertificate"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                style={{ maxWidth: 250 }}
              />
              {formData.birthCertificate && (
                <Typography variant="body2" color="text.secondary">
                  {formData.birthCertificate.name}
                </Typography>
              )}
            </Box>

            {/* Bank Account Statement (Your Sponsors, Last 6 Months) */}
            <Box
              mt={2}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{
                border: "1px solid #ddd",
                borderRadius: 2,
                p: 2,
                flexWrap: "wrap",
              }}
            >
              <Typography>
                Bank Account Statement (Your Sponsors, Last 6 Months)
              </Typography>
              <input
                type="file"
                name="bankStatement"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                style={{ maxWidth: 250 }}
              />
              {formData.bankStatement && (
                <Typography variant="body2" color="text.secondary">
                  {formData.bankStatement.name}
                </Typography>
              )}
            </Box>

            {/* Accommodation Proof */}
            <Box
              mt={2}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{
                border: "1px solid #ddd",
                borderRadius: 2,
                p: 2,
                flexWrap: "wrap",
              }}
            >
              <Typography>Accommodation Proof</Typography>
              <input
                type="file"
                name="accommodationProof"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                style={{ maxWidth: 250 }}
              />
              {formData.accommodationProof && (
                <Typography variant="body2" color="text.secondary">
                  {formData.accommodationProof.name}
                </Typography>
              )}
            </Box>

            {/* Motivation Letter (Signed) */}
            <Box
              mt={2}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{
                border: "1px solid #ddd",
                borderRadius: 2,
                p: 2,
                flexWrap: "wrap",
              }}
            >
              <Typography>Motivation Letter (Signed)</Typography>
              <input
                type="file"
                name="motivationLetter"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                style={{ maxWidth: 250 }}
              />
              {formData.motivationLetter && (
                <Typography variant="body2" color="text.secondary">
                  {formData.motivationLetter.name}
                </Typography>
              )}
            </Box>

            {/* Certificates of Previous Studies (SSC & HSC) */}
            <Box
              mt={2}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{
                border: "1px solid #ddd",
                borderRadius: 2,
                p: 2,
                flexWrap: "wrap",
              }}
            >
              <Typography>
                Certificates of Previous Studies (SSC & HSC)
              </Typography>
              <input
                type="file"
                name="previousCertificates"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                style={{ maxWidth: 250 }}
              />
              {formData.previousCertificates && (
                <Typography variant="body2" color="text.secondary">
                  {formData.previousCertificates.name}
                </Typography>
              )}
            </Box>

            {/* Travel Insurance */}
            <Box
              mt={2}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{
                border: "1px solid #ddd",
                borderRadius: 2,
                p: 2,
                flexWrap: "wrap",
              }}
            >
              <Typography>Travel Insurance</Typography>
              <input
                type="file"
                name="travelInsurance"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                style={{ maxWidth: 250 }}
              />
              {formData.travelInsurance && (
                <Typography variant="body2" color="text.secondary">
                  {formData.travelInsurance.name}
                </Typography>
              )}
            </Box>

            {/* European Photo (3.5 x 4.5 cm) */}
            <Box
              mt={2}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{
                border: "1px solid #ddd",
                borderRadius: 2,
                p: 2,
                flexWrap: "wrap",
              }}
            >
              <Typography>European Photo (3.5 x 4.5 cm)</Typography>
              <input
                type="file"
                name="europeanPhoto"
                onChange={handleFileChange}
                accept=".jpg,.jpeg,.png"
                style={{ maxWidth: 250 }}
              />
              {formData.europeanPhoto && (
                <Typography variant="body2" color="text.secondary">
                  {formData.europeanPhoto.name}
                </Typography>
              )}
            </Box>

            {/* Health Insurance */}
            <Box
              mt={2}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{
                border: "1px solid #ddd",
                borderRadius: 2,
                p: 2,
                flexWrap: "wrap",
              }}
            >
              <Typography>Health Insurance (Signed)</Typography>
              <input
                type="file"
                name="healthInsurance"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                style={{ maxWidth: 250 }}
              />
              {formData.healthInsurance && (
                <Typography variant="body2" color="text.secondary">
                  {formData.healthInsurance.name}
                </Typography>
              )}
            </Box>

            {/* Visa Interview Date Scheduled */}
            <TextField
              label="Visa Interview Date"
              name="visaInterviewDate"
              type="date"
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              value={formData.visaInterviewDate}
              onChange={handleChange}
            />

            {/* Visa Decision */}
            <FormControl fullWidth margin="normal">
              <InputLabel>Visa Decision</InputLabel>
              <Select
                name="visaDecision"
                value={formData.visaDecision}
                onChange={handleChange}
              >
                <MenuItem value="Approved">Approved</MenuItem>
                <MenuItem value="Rejected">Rejected</MenuItem>
                <MenuItem value="Appeal">Appeal</MenuItem>
              </Select>
            </FormControl>

            {/* Post-Visa Approval */}
            <Typography variant="h6" gutterBottom mt={2}>
              Post-Visa Approval
            </Typography>

            {/* Visa Service Charge Paid */}
            <FormControl fullWidth margin="normal">
              <InputLabel>Visa Service Charge Paid</InputLabel>
              <Select
                name="visaServiceChargePaid"
                value={formData.visaServiceChargePaid}
                onChange={handleChange}
              >
                <MenuItem value="Paid">Paid</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
              </Select>
            </FormControl>

            {/* Flight Booking Confirmed */}
            <FormControl fullWidth margin="normal">
              <InputLabel>Flight Booking Confirmed</InputLabel>
              <Select
                name="flightBookingConfirmed"
                value={formData.flightBookingConfirmed}
                onChange={handleChange}
              >
                <MenuItem value="Confirmed">Confirmed</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
              </Select>
            </FormControl>

            {/* Online Enrollment Completed */}
            <FormControl fullWidth margin="normal">
              <InputLabel>Online Enrollment Completed</InputLabel>
              <Select
                name="onlineEnrollmentCompleted"
                value={formData.onlineEnrollmentCompleted}
                onChange={handleChange}
              >
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
              </Select>
            </FormControl>

            {/* Accommodation Confirmation Received */}
            <FormControl fullWidth margin="normal">
              <InputLabel>Accommodation Confirmation Received</InputLabel>
              <Select
                name="accommodationConfirmationReceived"
                value={formData.accommodationConfirmationReceived}
                onChange={handleChange}
              >
                <MenuItem value="Received">Received</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
              </Select>
            </FormControl>

            {/* Arrival in (Country) */}
            <TextField
              label="Arrival in (Country)"
              name="arrivalInCountry"
              fullWidth
              margin="normal"
              value={formData.arrivalInCountry}
              onChange={handleChange}
            />
          </>
        );
      default:
        return "Unknown step";
    }
  };

  return (
    <Paper elevation={4} sx={{ p: 4, maxWidth: 1100, margin: "auto", mt: 5 }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ mt: 4 }}>
        {activeStep === steps.length ? (
          <>
            <Typography variant="h6" align="center">
              🎉 All steps completed successfully!
            </Typography>
            {/* <pre>{JSON.stringify(formData, null, 2)}</pre> */}
          </>
        ) : (
          <>
            {renderStepContent(activeStep)}

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}
            >
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                variant="outlined"
              >
                Back
              </Button>
              <Button variant="contained" onClick={handleNext} disabled={activeStep === steps.length - 1}>
                 Next
              </Button>
              <Button variant="contained" onClick={handleSubmit}>
  Submit Application
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Paper>
  );
};

export default UniversityStepper;
