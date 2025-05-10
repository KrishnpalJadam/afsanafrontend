import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const steps = ["Application", "Interview", "Visa Process"];

const UniversityStepper = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [status, setStatus] = useState(false)
  const [applicationId, setApplicationId] = useState(null)
  const [interviewBtn,setInterviewBtn] = useState(0)
  const student_id = parseInt(localStorage.getItem("student_id"));
  const university_id = useParams("university.id");
  const [universities,setUniversities] = ([])
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    registrationFeePayment: "",
    registration: "",
    applicationSubmission: "",
    applicationFeePayment: "",
    applicationFeeConfirmation: "",
    interviewDate: "",
    interviewOutcome: "",
    conditionalOfferLetter: "",
    invoiceWithOfferLetter: "",
    tuitionFeeTransferProof: "",
    finalOfferLetter: "",
    offerLetterServiceCharge: "",
    universityOfferLetterReceived: "",
    appendixFormCompleted: "",
    passportCopy: "",
    financialSupportDeclaration: "",
    validOfferLetter: "",
    relationshipProofWithSponsor: "",
    englishProof: "",
    incomeProof: "",
    airplaneTicket: "",
    policeClearance: "",
    europassCV: "",
    birthCertificate: "",
    bankStatement: "",
    accommodationProof: "",
    motivationLetter: "",
    previousCertificates: "",
    travelInsurance: "",
    europeanPhoto: "",
    healthInsurance: "",
    visaInterviewDate: "",
    visaDecision: "",
    visaServiceChargePaid: "",
    flightBookingConfirmed: "0",
    onlineEnrollmentCompleted: "0",
    accommodationConfirmationReceived: "0",
    arrivalInCountry: "",
    residencePermitForm: "",
    emailSentForSubmission: "",
    conditional_offer_letter:"",
    // Application_stage:"0",
    // interview:"0",
    // Visa_process:"0",
    appointmentDateConfirmation:""

  });
useEffect(() => {
    const getApplication = async () => {
      try {
        const res = await api.get(`/application/${student_id}/${university_id.id}`);
        if (res.data.status) {
          setStatus(true);
          const applicationData = res.data.data[0];
  
          // Populate formData with fetched application data
          setFormData({
            ...formData,
            registrationFeePayment: applicationData.registration_fee_payment,
            registration: applicationData.registration_date,
            applicationSubmission: applicationData.application_submission_date,
            applicationFeePayment: applicationData.application_fee_payment,
            applicationFeeConfirmation: applicationData.fee_confirmation_document,
            interviewDate: applicationData.university_interview_date,
            interviewOutcome: applicationData.university_interview_outcome,
            conditionalOfferLetter: applicationData.conditional_offer_letter,
            invoiceWithOfferLetter: applicationData.invoice_with_conditional_offer,
            tuitionFeeTransferProof: applicationData.tuition_fee_transfer_proof,
            finalOfferLetter: applicationData.final_offer_letter,
            offerLetterServiceCharge: applicationData.offer_letter_service_charge_paid,
            universityOfferLetterReceived: applicationData.university_offer_letter_received,
            appendixFormCompleted: applicationData.appendix_form_completed,
            passportCopy: applicationData.passport_copy_prepared,
            emailSentForSubmission: applicationData.email_sent_for_documentation,
            financialSupportDeclaration: applicationData.financial_support_declaration,
            validOfferLetter: applicationData.final_offer_letter,
            relationshipProofWithSponsor: applicationData.proof_of_relationship,
            englishProof: applicationData.english_language_proof,
            incomeProof: applicationData.proof_of_income,
            airplaneTicket: applicationData.airplane_ticket_booking,
            policeClearance: applicationData.police_clearance_certificate,
            europassCV: applicationData.europass_cv,
            birthCertificate: applicationData.birth_certificate,
            bankStatement: applicationData.bank_statement,
            accommodationProof: applicationData.accommodation_proof,
            motivationLetter: applicationData.motivation_letter,
            previousCertificates: applicationData.previous_studies_certificates,
            travelInsurance: applicationData.travel_insurance,
            europeanPhoto: applicationData.european_photo,
            healthInsurance: applicationData.health_insurance,
            visaInterviewDate: applicationData.visa_interview_date,
            visaDecision: applicationData.visa_decision,
            visaServiceChargePaid: applicationData.visa_service_charge_paid,
            flightBookingConfirmed: applicationData.flight_booking_confirmed,
            onlineEnrollmentCompleted: applicationData.online_enrollment_completed,
            accommodationConfirmationReceived: applicationData.accommodation_confirmation,
            arrivalInCountry: applicationData.arrival_country,
            residencePermitForm: applicationData.residence_permit_form,
            appointmentDateConfirmation:applicationData.appointment_date,
            // Application_stage: applicationData.application_stage,
          });
          setApplicationId(applicationData.id); // Set the application ID
          setInterviewBtn(applicationData.Interview)
        }
      } catch (error) {
        console.log(error);
      }
    };
    
    getApplication();
  }, []);

  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };
  const formDataToSubmit = new FormData();
  formDataToSubmit.append("student_id", student_id);
  formDataToSubmit.append("registration_fee_payment", formData.registrationFeePayment);
  formDataToSubmit.append("registration_date", formData.registration);
  formDataToSubmit.append("application_submission_date", formData.applicationSubmission);
  formDataToSubmit.append("application_fee_payment", formData.applicationFeePayment);
  formDataToSubmit.append("fee_confirmation_document", formData.applicationFeeConfirmation);
  formDataToSubmit.append("university_interview_date", formData.interviewDate);
  formDataToSubmit.append("university_interview_outcome", formData.interviewOutcome);
  formDataToSubmit.append("conditional_offer_letter", formData.conditionalOfferLetter);
  formDataToSubmit.append("invoice_with_conditional_offer", formData.invoiceWithOfferLetter);
  formDataToSubmit.append("tuition_fee_transfer_proof", formData.tuitionFeeTransferProof);
  formDataToSubmit.append("final_university_offer_letter", formData.finalOfferLetter);
  formDataToSubmit.append("offer_letter_service_charge_paid", formData.offerLetterServiceCharge);
  formDataToSubmit.append("university_offer_letter_received", formData.universityOfferLetterReceived);
  formDataToSubmit.append("appendix_form_completed", formData.appendixFormCompleted);
  formDataToSubmit.append("passport_copy_prepared", formData.passportCopy);
  formDataToSubmit.append("email_sent_for_documentation", formData.emailSentForSubmission); //----------
  formDataToSubmit.append("financial_support_declaration", formData.financialSupportDeclaration);
  formDataToSubmit.append("final_offer_letter", formData.validOfferLetter);
  formDataToSubmit.append("proof_of_relationship", formData.relationshipProofWithSponsor);
  formDataToSubmit.append("english_language_proof", formData.englishProof);
  formDataToSubmit.append("residence_permit_form", formData.residencePermitForm);
  formDataToSubmit.append("proof_of_income", formData.incomeProof);
  formDataToSubmit.append("airplane_ticket_booking", formData.airplaneTicket);
  formDataToSubmit.append("police_clearance_certificate", formData.policeClearance);
  formDataToSubmit.append("europass_cv", formData.europassCV);
  formDataToSubmit.append("birth_certificate", formData.birthCertificate);
  formDataToSubmit.append("accommodation_proof", formData.accommodationProof);
  formDataToSubmit.append("motivation_letter", formData.motivationLetter);
  formDataToSubmit.append("previous_studies_certificates", formData.previousCertificates);
  formDataToSubmit.append("travel_insurance", formData.travelInsurance);
  formDataToSubmit.append("health_insurance", formData.healthInsurance);
  formDataToSubmit.append("european_photo", formData.europeanPhoto);
  formDataToSubmit.append("visa_decision", formData.visaDecision);
  formDataToSubmit.append("visa_service_charge_paid", formData.visaServiceChargePaid);
  formDataToSubmit.append("flight_booking_confirmed", formData.flightBookingConfirmed);
  formDataToSubmit.append("online_enrollment_completed", formData.onlineEnrollmentCompleted);
  formDataToSubmit.append("accommodation_confirmation", formData.accommodationConfirmationReceived);
  formDataToSubmit.append("arrival_country", formData.arrivalInCountry);
  formDataToSubmit.append("bank_statement", formData.bankStatement);
  formDataToSubmit.append("appointment_date", formData.appointmentDateConfirmation);
  formDataToSubmit.append("visa_interview_date", formData.visaInterviewDate);
  formDataToSubmit.append("university_id", university_id.id);
 

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async () => {
    // setFormData({ ...formData, Application_stage: "1" });
     
    formDataToSubmit.append("Application_stage", "1");
    formDataToSubmit.append("interview", "0");
    formDataToSubmit.append("Visa_process", "0");
    console.log("Form Data Submitted:", formDataToSubmit);
    try {
      const response = await api.post("/application", formDataToSubmit);
        Swal.fire({
              title: 'Success!',
              text: 'Data submitted successfully!',
              icon: 'success',
              confirmButtonText: 'OK',
            });
            navigate("/UniversityCards")
            // window.location.reload(true);
      console.log("Form submitted successfully:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  const handleUpdate = async (id) => {
    console.log("Form Data Submitted:", formDataToSubmit);
    if(interviewBtn === 0){
      formDataToSubmit.append("Application_stage", "1");
    formDataToSubmit.append("interview", "1");
    formDataToSubmit.append("Visa_process", "0");
    }else{
      // setFormData({ ...formData, "interview": 1 });
      // setFormData({ ...formData, "Visa_process": 1 });
      formDataToSubmit.append("Application_stage", "1");
      formDataToSubmit.append("interview", "1");
      formDataToSubmit.append("Visa_process", "1");
      
    }
    
    try {
      const response = await api.put(`/application/${id}`, formDataToSubmit);
      Swal.fire({
        title: 'Success!',
        text: 'Data submitted successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
      });
       navigate("/UniversityCards")
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
    {formData?.applicationFeeConfirmation ? (
  <Typography variant="body2" mt={1}>
    Selected file: {typeof formData.applicationFeeConfirmation === 'string'
      ? formData.applicationFeeConfirmation  // If it's just the file name (from backend)
      : formData.applicationFeeConfirmation.name  // If it's the File object (from form upload)
    }
  </Typography>
) : (
  ''
)}
    <input
        type="file"
        name="applicationFeeConfirmation"
        onChange={handleFileChange}
        accept=".pdf,.jpg,.jpeg,.png"
        style={{ maxWidth: 250 }}
      />
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
              value={formData.interviewDate || ""}
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
               {formData?.conditionalOfferLetter ? (
  <Typography variant="body2" mt={1}>
    Selected file: {typeof formData.conditionalOfferLetter === 'string'
      ? formData.conditionalOfferLetter  // If it's just the file name (from backend)
      : formData.conditionalOfferLetter.name  // If it's the File object (from form upload)
    }
  </Typography>
) : (
  ''
)}
              <input
                type="file"
                name="conditionalOfferLetter"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.png"
                style={{ maxWidth: 250 }}
              />
              
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
              {formData?.invoiceWithOfferLetter ? (
  <Typography variant="body2" mt={1}>
    Selected file: {typeof formData.invoiceWithOfferLetter === 'string'
      ? formData.invoiceWithOfferLetter  // If it's just the file name (from backend)
      : formData.invoiceWithOfferLetter.name  // If it's the File object (from form upload)
    }
  </Typography>
) : (
  ''
)}
              <input
                type="file"
                name="invoiceWithOfferLetter"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.png"
                style={{ maxWidth: 250 }}
              />
               
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
              {formData?.tuitionFeeTransferProof ? (
  <Typography variant="body2" mt={1}>
    Selected file: {typeof formData.tuitionFeeTransferProof === 'string'
      ? formData.tuitionFeeTransferProof  // If it's just the file name (from backend)
      : formData.tuitionFeeTransferProof.name  // If it's the File object (from form upload)
    }
  </Typography>
) : (
  ''
)}
              <input
                type="file"
                name="tuitionFeeTransferProof"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                style={{ maxWidth: 250 }}
              />
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
               {formData?.finalOfferLetter ? (
  <Typography variant="body2" mt={1}>
    Selected file: {typeof formData.finalOfferLetter === 'string'
      ? formData.finalOfferLetter  // If it's just the file name (from backend)
      : formData.finalOfferLetter.name  // If it's the File object (from form upload)
    }
  </Typography>
) : (
  ''
)}
              
              <input
                type="file"
                name="finalOfferLetter"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.png"
                style={{ maxWidth: 250 }}
              />
               
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
              value={formData.universityOfferLetterReceived || ""}
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
              {formData?.appendixFormCompleted ? (
  <Typography variant="body2" mt={1}>
    Selected file: {typeof formData.appendixFormCompleted === 'string'
      ? formData.appendixFormCompleted  // If it's just the file name (from backend)
      : formData.appendixFormCompleted.name  // If it's the File object (from form upload)
    }
  </Typography>
) : (
  ''
)}
              <input
                type="file"
                name="appendixFormCompleted"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                style={{ maxWidth: 250 }}
              />
               
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
              {formData?.passportCopy ? (
  <Typography variant="body2" mt={1}>
    Selected file: {typeof formData.passportCopy === 'string'
      ? formData.passportCopy  // If it's just the file name (from backend)
      : formData.passportCopy.name  // If it's the File object (from form upload)
    }
  </Typography>
) : (
  ''
)}
              <input
                type="file"
                name="passportCopy"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                style={{ maxWidth: 250 }}
              />
              
            </Box>

            {/* Email Sent for Documents Submission */}
            <TextField
              label="Email Sent for Documents Submission"
              name="emailSentForSubmission"
              type="date"
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              value={formData.emailSentForSubmission || ""}
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
              {formData?.financialSupportDeclaration ? (
  <Typography variant="body2" mt={1}>
    Selected file: {typeof formData.financialSupportDeclaration === 'string'
      ? formData.financialSupportDeclaration  // If it's just the file name (from backend)
      : formData.financialSupportDeclaration.name  // If it's the File object (from form upload)
    }
  </Typography>
) : (
  ''
)}
              <input
                type="file"
                name="financialSupportDeclaration"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                style={{ maxWidth: 250 }}
              />
              
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
              
              {formData?.validOfferLetter ? (
  <Typography variant="body2" mt={1}>
    Selected file: {typeof formData.validOfferLetter === 'string'
      ? formData.validOfferLetter  // If it's just the file name (from backend)
      : formData.validOfferLetter.name  // If it's the File object (from form upload)
    }
  </Typography>
) : (
  ''
)}
              <input
                type="file"
                name="validOfferLetter"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                style={{ maxWidth: 250 }}
              />
               
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
               {formData?.relationshipProofWithSponsor ? (
  <Typography variant="body2" mt={1}>
    Selected file: {typeof formData.relationshipProofWithSponsor === 'string'
      ? formData.relationshipProofWithSponsor  // If it's just the file name (from backend)
      : formData.relationshipProofWithSponsor.name  // If it's the File object (from form upload)
    }
  </Typography>
) : (
  ''
)}
              <input
                type="file"
                name="relationshipProofWithSponsor"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                style={{ maxWidth: 250 }}
              />
              
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
               
               {formData?.englishProof ? (
  <Typography variant="body2" mt={1}>
    Selected file: {typeof formData.englishProof === 'string'
      ? formData.englishProof  // If it's just the file name (from backend)
      : formData.englishProof.name  // If it's the File object (from form upload)
    }
  </Typography>
) : (
  ''
)}
              <input
                type="file"
                name="englishProof"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                style={{ maxWidth: 250 }}
              />
               
            </Box>

            {/* Add other fields in the same way for the remaining documents */}

            {/* Visa Interview Date Scheduled */}
            {/* <TextField
              label="Visa Interview Date"
              name="visaInterviewDate"
              type="date"
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              value={formData.visaInterviewDate}
              onChange={handleChange}
            /> */}

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
               {formData?.residencePermitForm ? (
  <Typography variant="body2" mt={1}>
    Selected file: {typeof formData.residencePermitForm === 'string'
      ? formData.residencePermitForm  // If it's just the file name (from backend)
      : formData.residencePermitForm.name  // If it's the File object (from form upload)
    }
  </Typography>
) : (
  ''
)}
              <input
                type="file"
                name="residencePermitForm"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                style={{ maxWidth: 250 }}
              />
               
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
               {formData?.incomeProof ? (
  <Typography variant="body2" mt={1}>
    Selected file: {typeof formData.incomeProof=== 'string'
      ? formData.incomeProof  // If it's just the file name (from backend)
      : formData.incomeProof.name  // If it's the File object (from form upload)
    }
  </Typography>
) : (
  ''
)}
              <input
                type="file"
                name="incomeProof"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                style={{ maxWidth: 250 }}
              />
               
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
              {formData?.airplaneTicket ? (
  <Typography variant="body2" mt={1}>
    Selected file: {typeof formData.airplaneTicket=== 'string'
      ? formData.airplaneTicket  // If it's just the file name (from backend)
      : formData.airplaneTicket.name  // If it's the File object (from form upload)
    }
  </Typography>
) : (
  ''
)}
              <input
                type="file"
                name="airplaneTicket"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                style={{ maxWidth: 250 }}
              />
               
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
              {formData?.policeClearance ? (
  <Typography variant="body2" mt={1}>
    Selected file: {typeof formData.policeClearance=== 'string'
      ? formData.policeClearance  // If it's just the file name (from backend)
      : formData.policeClearance.name  // If it's the File object (from form upload)
    }
  </Typography>
) : (
  ''
)}
              <input
                type="file"
                name="policeClearance"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                style={{ maxWidth: 250 }}
              />
               
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
              {formData?.europassCV ? (
  <Typography variant="body2" mt={1}>
    Selected file: {typeof formData.europassCV=== 'string'
      ? formData.europassCV  // If it's just the file name (from backend)
      : formData.europassCV.name  // If it's the File object (from form upload)
    }
  </Typography>
) : (
  ''
)}
              <input
                type="file"
                name="europassCV"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                style={{ maxWidth: 250 }}
              />
              
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
              {formData?.birthCertificate ? (
  <Typography variant="body2" mt={1}>
    Selected file: {typeof formData.birthCertificate=== 'string'
      ? formData.birthCertificate  // If it's just the file name (from backend)
      : formData.birthCertificate.name  // If it's the File object (from form upload)
    }
  </Typography>
) : (
  ''
)}
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
               {formData?.bankStatement ? (
  <Typography variant="body2" mt={1}>
    Selected file: {typeof formData.bankStatement=== 'string'
      ? formData.bankStatement  // If it's just the file name (from backend)
      : formData.bankStatement.name  // If it's the File object (from form upload)
    }
  </Typography>
) : (
  ''
)}
              <input
                type="file"
                name="bankStatement"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                style={{ maxWidth: 250 }}
              />
               
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
              {formData?.accommodationProof ? (
  <Typography variant="body2" mt={1}>
    Selected file: {typeof formData.accommodationProof=== 'string'
      ? formData.accommodationProof  // If it's just the file name (from backend)
      : formData.accommodationProof.name  // If it's the File object (from form upload)
    }
  </Typography>
) : (
  ''
)}
              <input
                type="file"
                name="accommodationProof"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                style={{ maxWidth: 250 }}
              />
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
              {formData?.motivationLetter ? (
  <Typography variant="body2" mt={1}>
    Selected file: {typeof formData.motivationLetter=== 'string'
      ? formData.motivationLetter  // If it's just the file name (from backend)
      : formData.motivationLetter.name  // If it's the File object (from form upload)
    }
  </Typography>
) : (
  ''
)}
              <input
                type="file"
                name="motivationLetter"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                style={{ maxWidth: 250 }}
              />
               
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
               {formData?.previousCertificates ? (
  <Typography variant="body2" mt={1}>
    Selected file: {typeof formData.previousCertificates=== 'string'
      ? formData.previousCertificates  // If it's just the file name (from backend)
      : formData.previousCertificates.name  // If it's the File object (from form upload)
    }
  </Typography>
) : (
  ''
)}
              <input
                type="file"
                name="previousCertificates"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                style={{ maxWidth: 250 }}
              />
               
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
              {formData?.travelInsurance ? (
  <Typography variant="body2" mt={1}>
    Selected file: {typeof formData.travelInsurance=== 'string'
      ? formData.travelInsurance  // If it's just the file name (from backend)
      : formData.travelInsurance.name  // If it's the File object (from form upload)
    }
  </Typography>
) : (
  ''
)}
  
              <input
                type="file"
                name="travelInsurance"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                style={{ maxWidth: 250 }}
              />
              
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
              {formData?.europeanPhoto ? (
  <Typography variant="body2" mt={1}>
    Selected file: {typeof formData.europeanPhoto=== 'string'
      ? formData.europeanPhoto  // If it's just the file name (from backend)
      : formData.europeanPhoto.name  // If it's the File object (from form upload)
    }
  </Typography>
) : (
  ''
)}
              <input
                type="file"
                name="europeanPhoto"
                onChange={handleFileChange}
                accept=".jpg,.jpeg,.png"
                style={{ maxWidth: 250 }}
              />
               
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
                {formData?.healthInsurance ? (
  <Typography variant="body2" mt={1}>
    Selected file: {typeof formData.healthInsurance=== 'string'
      ? formData.healthInsurance  // If it's just the file name (from backend)
      : formData.healthInsurance.name  // If it's the File object (from form upload)
    }
  </Typography>
) : (
  ''
)}
              <input
                type="file"
                name="healthInsurance"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                style={{ maxWidth: 250 }}
              />
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
                <MenuItem value="1">Confirmed</MenuItem>
                <MenuItem value="0">Pending</MenuItem>
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
                <MenuItem value="1">Completed</MenuItem>
                <MenuItem value="0">Pending</MenuItem>
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
                <MenuItem value="1">Received</MenuItem>
                <MenuItem value="0">Pending</MenuItem>
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
              <Button variant="contained" onClick={handleNext} disabled={!status|| (activeStep === steps.length-1)}>
                Next
              </Button>
              {status === false ? (
  <Button variant="contained" onClick={handleSubmit}>
    Submit Application
  </Button>
) : (
  interviewBtn === 1 ? (
    <Button variant="contained" onClick={() => handleUpdate(applicationId)}>
      Submit Visa Details
    </Button>
  ) : (
    <Button variant="contained" onClick={() => handleUpdate(applicationId)}>
      Submit Interview Details
    </Button>
  )
)}

            </Box>
          </>
        
      </Box>
    </Paper>
  );
};

export default UniversityStepper;
