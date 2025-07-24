import React from 'react';

const StudentProfile = () => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', margin: '20px' }}>
      <h2 style={{ marginTop: '40px', color: '#444' }}>Student Basic Information</h2>
      <form action="/submit" method="POST">

        {/* Student Basic Information */}
        <div style={{ display: 'flex', gap: '20px', marginBottom: '10px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>ID</label>
            <input type="text" name="id" style={{ width: '100%', padding: '6px' }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>User ID</label>
            <input type="text" name="user_id" style={{ width: '100%', padding: '6px' }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Processor ID</label>
            <input type="text" name="processor_id" style={{ width: '100%', padding: '6px' }} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '20px', marginBottom: '10px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Full Name</label>
            <input type="text" name="full_name" style={{ width: '100%', padding: '6px' }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Father Name</label>
            <input type="text" name="father_name" style={{ width: '100%', padding: '6px' }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Mother Name</label>
            <input type="text" name="mother_name" style={{ width: '100%', padding: '6px' }} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '20px', marginBottom: '10px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Mobile</label>
            <input type="text" name="mobile" style={{ width: '100%', padding: '6px' }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>University ID</label>
            <input type="text" name="university_id" style={{ width: '100%', padding: '6px' }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Date of Birth</label>
            <input type="date" name="dob" style={{ width: '100%', padding: '6px' }} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '20px', marginBottom: '10px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Gender</label>
            <select name="gender" style={{ width: '100%', padding: '6px' }}>
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Category</label>
            <input type="text" name="category" style={{ width: '100%', padding: '6px' }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>City</label>
            <input type="text" name="city" style={{ width: '100%', padding: '6px' }} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '20px', marginBottom: '10px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Address</label>
            <input type="text" name="address" style={{ width: '100%', padding: '6px' }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Identifying Name</label>
            <input type="text" name="identifying_name" style={{ width: '100%', padding: '6px' }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Role</label>
            <input type="text" name="role" style={{ width: '100%', padding: '6px' }} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '20px', marginBottom: '10px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Created At</label>
            <input type="datetime-local" name="created_at" style={{ width: '100%', padding: '6px' }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Updated At</label>
            <input type="datetime-local" name="updated_at" style={{ width: '100%', padding: '6px' }} />
          </div>
        </div>

        {/* Applicant Information */}
        <h2 style={{ marginTop: '40px', color: '#444' }}>Applicant Information</h2>

        <div style={{ display: 'flex', gap: '20px', marginBottom: '10px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Applicant ID</label>
            <input type="text" name="applicant_id" style={{ width: '100%', padding: '6px' }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Applicant DOB</label>
            <input type="date" name="applicant_dob" style={{ width: '100%', padding: '6px' }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Applicant Name</label>
            <input type="text" name="applicant_name" style={{ width: '100%', padding: '6px' }} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '20px', marginBottom: '10px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Applicant Contact Name</label>
            <input type="text" name="applicant_contact_name" style={{ width: '100%', padding: '6px' }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Applicant Phone</label>
            <input type="text" name="applicant_phone" style={{ width: '100%', padding: '6px' }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Applicant Email</label>
            <input type="email" name="applicant_email" style={{ width: '100%', padding: '6px' }} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '20px', marginBottom: '10px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Applicant TIN No</label>
            <input type="text" name="applicant_tin_no" style={{ width: '100%', padding: '6px' }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Present Address</label>
            <input type="text" name="applicant_present_address" style={{ width: '100%', padding: '6px' }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Marital Status</label>
            <input type="text" name="applicant_marital_status" style={{ width: '100%', padding: '6px' }} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '20px', marginBottom: '10px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Loan Amount</label>
            <input type="number" step="0.01" name="loan_amount" style={{ width: '100%', padding: '6px' }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Loan Applied</label>
            <input type="number" name="loan_applied" style={{ width: '100%', padding: '6px' }} />
          </div>
        </div>

        {/* Parent/Guardian Info */}
        <h2 style={{ marginTop: '40px', color: '#444' }}>Parent/Guardian Info</h2>

        <div style={{ display: 'flex', gap: '20px', marginBottom: '10px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Parent Name</label>
            <input type="text" name="parent_name" style={{ width: '100%', padding: '6px' }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Academics</label>
            <textarea name="academics" style={{ width: '100%', padding: '6px' }}></textarea>
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Tests</label>
            <textarea name="tests" style={{ width: '100%', padding: '6px' }}></textarea>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '20px', marginBottom: '10px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Work Experience</label>
            <textarea name="work_experience" style={{ width: '100%', padding: '6px' }}></textarea>
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Criminal Record</label>
            <input type="text" name="criminal_record" style={{ width: '100%', padding: '6px' }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Travel History</label>
            <input type="text" name="travel_history" style={{ width: '100%', padding: '6px' }} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '20px', marginBottom: '10px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Passport Number</label>
            <input type="text" name="passport_no" style={{ width: '100%', padding: '6px' }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Passport Expiry</label>
            <input type="date" name="passport_expiry" style={{ width: '100%', padding: '6px' }} />
          </div>
        </div>

        {/* Finance & Sponsor */}
        <h2 style={{ marginTop: '40px', color: '#444' }}>Finance & Sponsor</h2>

        <div style={{ display: 'flex', gap: '20px', marginBottom: '10px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Sponsor Name</label>
            <input type="text" name="sponsor_name" style={{ width: '100%', padding: '6px' }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Sponsor Relationship</label>
            <input type="text" name="sponsor_relationship" style={{ width: '100%', padding: '6px' }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Sponsor Income</label>
            <input type="number" name="sponsor_income" style={{ width: '100%', padding: '6px' }} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '20px', marginBottom: '10px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Sponsor Assets</label>
            <input type="number" name="sponsor_assets" style={{ width: '100%', padding: '6px' }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Bank Balance</label>
            <input type="text" name="bank_balance" style={{ width: '100%', padding: '6px' }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Sponsor TIN</label>
            <input type="text" name="sponsor_tin" style={{ width: '100%', padding: '6px' }} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '20px', marginBottom: '10px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Sponsor Email</label>
            <input type="email" name="sponsor_email" style={{ width: '100%', padding: '6px' }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Relation</label>
            <input type="text" name="relation" style={{ width: '100%', padding: '6px' }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Occupation</label>
            <input type="text" name="occupation" style={{ width: '100%', padding: '6px' }} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '20px', marginBottom: '10px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Designation</label>
            <input type="text" name="designation" style={{ width: '100%', padding: '6px' }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Experience</label>
            <input type="text" name="experience" style={{ width: '100%', padding: '6px' }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Company Status</label>
            <input type="text" name="company_status" style={{ width: '100%', padding: '6px' }} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '20px', marginBottom: '10px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Business Registration No.</label>
            <input type="text" name="business_reg_no" style={{ width: '100%', padding: '6px' }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>No. of Employees</label>
            <input type="number" name="no_of_employees" style={{ width: '100%', padding: '6px' }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Office Address</label>
            <input type="text" name="office_address" style={{ width: '100%', padding: '6px' }} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '20px', marginBottom: '10px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Office Phone</label>
            <input type="text" name="office_phone" style={{ width: '100%', padding: '6px' }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Business Type</label>
            <input type="text" name="business_type" style={{ width: '100%', padding: '6px' }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Annual Income</label>
            <input type="number" name="annual_income" style={{ width: '100%', padding: '6px' }} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '20px', marginBottom: '10px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Net Worth</label>
            <input type="number" name="net_worth" style={{ width: '100%', padding: '6px' }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>LIC No</label>
            <input type="text" name="lic_no" style={{ width: '100%', padding: '6px' }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Payment Mode</label>
            <input type="text" name="payment_mode" style={{ width: '100%', padding: '6px' }} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '20px', marginBottom: '10px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Bank Details</label>
            <input type="text" name="bank_details" style={{ width: '100%', padding: '6px' }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Note</label>
            <textarea name="note" style={{ width: '100%', padding: '6px' }}></textarea>
          </div>
        </div>

        <br />
        <button type="submit" style={{ padding: '8px 16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default StudentProfile;