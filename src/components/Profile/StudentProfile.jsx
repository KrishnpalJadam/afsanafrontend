import React from 'react';

const StudentProfile = () => {
  return (
    <div className="container py-4">
      <div className="card shadow mb-4">
        <div className="card-header bg-primary text-white">
          <h2 className="h4 mb-0">Student Basic Information</h2>
        </div>
        <div className="card-body">
          <form>
            {/* Student Basic Information */}
           <div className="row g-3 mb-4">
              <div className="col-md-4">
                <label className="form-label fw-bold">Full Name</label>
                <input type="text" name="full_name" className="form-control form-control-sm" />
              </div>
              <div className="col-md-4">
                <label className="form-label fw-bold">Father Name</label>
                <input type="text" name="father_name" className="form-control form-control-sm" />
              </div>
              <div className="col-md-4">
                <label className="form-label fw-bold">Mother Name</label>
                <input type="text" name="mother_name" className="form-control form-control-sm" />
              </div>
            </div>
            <div className="row g-3 mb-4">
              <div className="col-md-4">
                <label className="form-label fw-bold">Mobile</label>
                <input type="text" name="mobile" className="form-control form-control-sm" />
              </div>
              <div className="col-md-4">
                <label className="form-label fw-bold">Email</label>
                <input type="email" name="email" className="form-control form-control-sm" />
              </div>
              <div className="col-md-4">
                <label className="form-label fw-bold">Date of Birth</label>
                <input type="date" name="dob" className="form-control form-control-sm" />
              </div>
            </div>
            <div className="row g-3 mb-4">
              <div className="col-md-4">
                <label className="form-label fw-bold">Gender</label>
                <select name="gender" className="form-select ">
                  <option value="">Select</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label fw-bold">Category</label>
                <input type="text" name="category" className="form-control form-control-sm" />
              </div>
              <div className="col-md-4">
                <label className="form-label fw-bold">Tin No</label>
                <input type="text" name="city" className="form-control form-control-sm" />
              </div>
            </div>
            <div className="row g-3 mb-4">
              <div className="col-md-4">
                <label className="form-label fw-bold">Peramnent Address</label>
                <textarea name="address" className="form-control form-control-sm" rows="1"></textarea>
              </div>
              <div className="col-md-4">
                <label className="form-label fw-bold">Identifying Name</label>
                <input type="text" name="identifying_name" className="form-control form-control-sm" />
              </div>
              <div className="col-md-4">
                <label className="form-label fw-bold">Present Address</label>
                <input type="text" name="role" className="form-control " />
              </div>
            </div>
            <div className="row g-3 mb-4">
              <div className="col-md-4">
                <label className="form-label fw-bold">Merital Status</label>
                <select name="gender" className="form-select ">
                  <option value="">Select</option>
                  <option>Merried</option>
                  <option>Unmerried</option>
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label fw-bold">Spouse’s Occupation</label>
                <input type="text" name="updated_at" className="form-control form-control-sm" />
              </div>
              <div className="col-md-4">
                <label className="form-label fw-bold">Spouse’s Monthly Income</label>
                <input type="text" name="updated_at" className="form-control form-control-sm" />
              </div>
            </div>
            <div className="row g-3 mb-4">
              <div className="col-md-6">
                <label className="form-label fw-bold">Number of Children</label>
                <input type="text" name="id" className="form-control form-control-sm" />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-bold">Who Will Be Your Sponsor</label>
                <input type="text" name="user_id" className="form-control form-control-sm" />
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Applicant Information */}
      <div className="card shadow mb-4">
        <div className="card-header bg-primary text-white">
          <h2 className="h4 mb-0">Applicant Information</h2>
        </div>
        <div className="card-body">
          <form>
            <div className="row g-3 mb-4">
              <div className="col-md-4">
                <label className="form-label fw-bold">Institute Name & Address</label>
                <input type="text" name="applicant_id" className="form-control form-control-sm" />
              </div>
              <div className="col-md-4">
                <label className="form-label fw-bold">Degree</label>
                <input type="date" name="applicant_dob" className="form-control form-control-sm" />
              </div>
              <div className="col-md-4">
                <label className="form-label fw-bold">Group/Department</label>
                <input type="text" name="applicant_name" className="form-control form-control-sm" />
              </div>
            </div>
            <div className="row g-3 mb-4">
              <div className="col-md-4">
                <label className="form-label fw-bold">Result</label>
                <input type="text" name="applicant_contact_name" className="form-control form-control-sm" />
              </div>
              <div className="col-md-4">
                <label className="form-label fw-bold">Duration (Start – End)</label>
                <input type="text" name="applicant_phone" className="form-control form-control-sm" />
              </div>
              <div className="col-md-4">
                <label className="form-label fw-bold">Fail/Retake/Withdraw</label>
                <select name="fail" className="form-select ">
                  <option value="">Select</option>
                  <option value="Pass">Pass</option>
                  <option value="Fail">Fail</option>
                  <option value="Retake">Retake</option>
                  <option value="Withdraw">Withdraw</option>
                </select>
              </div>
            </div>
          </form>
           <div className=' text-center'><button>Add More</button></div>
        </div>
      </div>

      {/* Parent/Guardian Information */}
      <div className="card shadow mb-4">
        <div className="card-header bg-primary text-white">
          <h2 className="h4 mb-0">ENGLISH PROFICIENCY TEST (EPT) SCORE
          </h2>
        </div>
        <div className="card-body">
          <form>
            <div className="row g-3 mb-4">
              <div className="col-md-4">
                <label className="form-label fw-bold">EPT Name</label>
                <input type="text" name="father_name" className="form-control form-control-sm" />
              </div>
              <div className="col-md-4">
                <label className="form-label fw-bold">Expiry Date
                </label>
                <input type="date" name="father_occupation" className="form-control form-control-sm" />
              </div>
              <div className="col-md-4">
                <label className="form-label fw-bold">Overall Score</label>
                <input type="text" name="father_phone" className="form-control form-control-sm" />
              </div>
            </div>
            <div className="row g-3 mb-4">
              <div className="col-md-4">
                <label className="form-label fw-bold">Listening</label>
                <input type="text" name="mother_name" className="form-control form-control-sm" />
              </div>
              <div className="col-md-4">
                <label className="form-label fw-bold">Reading
                </label>
                <input type="text" name="mother_occupation" className="form-control form-control-sm" />
              </div>
              <div className="col-md-4">
                <label className="form-label fw-bold">Speaking
                </label>
                <input type="text" name="mother_phone" className="form-control form-control-sm" />
              </div>
            </div>

            <div className="row g-3 mb-4">
              <div className="col-md-12">
                <label className="form-label fw-bold">Writing
                </label>
                <input type="text" name="guardian_name" className="form-control form-control-sm" />
              </div>

            </div>
          </form>
           <div className=' text-center'><button>Add More</button></div>
        </div>
      </div>

      {/* Finance & Sponsor Information */}
      <div className="card shadow mb-4">
        <div className="card-header bg-primary text-white">
          <h2 className="h4 mb-0">APPLICANT’S JOB/PROFESSIONAL DETAILS
          </h2>
        </div>
        <div className="card-body">
          <form>
            <div className="row g-3 mb-4">
              <div className="col-md-4">
                <label className="form-label fw-bold">Company &
                  Designation
                </label>
                <input type="text" name="sponsor_name" className="form-control form-control-sm" />
              </div>
              <div className="col-md-4">
                <label className="form-label fw-bold">Monthly
                  Income</label>
                <input type="number" name="sponsor_relationship" className="form-control form-control-sm" />
              </div>
              <div className="col-md-4">
                <label className="form-label fw-bold">Payment
                  Method
                </label>
                <input type="number" name="sponsor_phone" className="form-control form-control-sm" />
              </div>
            </div>
            <div className="row g-3 mb-4">
              <div className="col-md-6">
                <label className="form-label fw-bold">Bank Name &
                  Account Type</label>
                <input type="number" name="annual_income" className="form-control form-control-sm" />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-bold">Employment
                  Duration
                </label>
                <input type="text" name="source_of_funds" className="form-control form-control-sm" />
              </div>
            </div>
          </form>
           <div className=' text-center'><button>Add More</button></div>
        </div>
      </div>

      <div className="card shadow mb-4">
        <div className="card-header bg-primary text-white">
          <h2 className="h4 mb-0">TRAVEL & PASSPORT DETAILS
          </h2>
        </div>
        <div className="card-body">
          <form>
            <div className="row g-3 mb-4">
              <div className="col-md-4">
                <label className="form-label fw-bold">Previously Refused Countries
                </label>
                <input type="text" name="sponsor_name" className="form-control form-control-sm" />
              </div>
              <div className="col-md-4">
                <label className="form-label fw-bold">Travel History (Country Name, Year)
                </label>
                <input type="texrt" name="sponsor_relationship" className="form-control form-control-sm" />
              </div>
              <div className="col-md-4">
                <label className="form-label fw-bold">Current Passport No. & Expiry Date
                </label>
                <input type="number" name="sponsor_phone" className="form-control form-control-sm" />
              </div>
            </div>
            <div className="row g-3 mb-4">
              <div className="col-md-6">
                <label className="form-label fw-bold">Passport 2 No. & Expiry Date</label>
                <input type="number" name="annual_income" className="form-control form-control-sm" />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-bold">Passport 3 No. & Expiry Date
                </label>
                <input type="number" name="source_of_funds" className="form-control form-control-sm" />
              </div>
            </div>
          </form>
        </div>
      </div>


      <div className="card shadow mb-4">
        <div className="card-header bg-primary text-white">
          <h2 className="h4 mb-0">BUSINESS DETAILS (IF ANY)
          </h2>
        </div>
        <div className="card-body">
          <form>
            <div className="row g-3 mb-4">
              <div className="col-md-4 ">
                <label className="form-label fw-bold">Business
                  Name &
                  License Nos
                </label>
                <input type="text" name="sponsor_name" className="form-control form-control-sm" />
              </div>
              <div className="col-md-4 ">
                <label className="form-label fw-bold">Monthly
                  Income &
                  Current
                  Balance
                </label>
                <input type="number" name="sponsor_relationship" className="form-control form-control-sm" />
              </div>
              <div className="col-md-4 ">
                <label className="form-label fw-bold">Personal Savings
                  (Bank, Type,
                  Branch, Amount)
                </label>
                <input type="number" name="sponsor_phone" className="form-control form-control-sm" />
              </div>
            </div>
            <div className="row g-3 mb-4">
              <div className="col-md-6">
                <label className="form-label fw-bold">Business Income
                  Bank Name &
                  Type
                </label>
                <input type="text" name="annual_income" className="form-control form-control-sm" />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-bold">Tax Returns (3
                  years) & TIN
                  Certificate
                </label>
                <input type="number" name="source_of_funds" className="form-control form-control-sm" />
              </div>
            </div>
          </form>
        </div>
      </div>


      <div className="card shadow mb-4">
        <div className="card-header bg-primary text-white">
          <h2 className="h4 mb-0">SPONSOR’S INFORMATION
         </h2>
        </div>
        <div className="card-body">
          <form>
            <div className="row g-3 mb-4">
              <div className="col-md-4 ">
                <label className="form-label fw-bold">Name
                </label>
                <input type="text" name="sponsor_name" className="form-control form-control-sm" />
              </div>
              <div className="col-md-4 ">
                <label className="form-label fw-bold">Email
                </label>
                <input type="email" name="sponsor_relationship" className="form-control form-control-sm" />
              </div>
              <div className="col-md-4 ">
                <label className="form-label fw-bold">Relationship
                </label>
                <input type="text" name="sponsor_phone" className="form-control form-control-sm" />
              </div>
            </div>
            <div className="row g-3 mb-4">
              <div className="col-md-4">
                <label className="form-label fw-bold">Occupation
                </label>
                <input type="text" name="annual_income" className="form-control form-control-sm" />
              </div>
              <div className="col-md-4">
                <label className="form-label fw-bold">Job Position, Company
                </label>
                <input type="text" name="source_of_funds" className="form-control form-control-sm" />
              </div>
              <div className="col-md-4">
                <label className="form-label fw-bold">Employment Duration
                </label>
                <input type="text" name="source_of_funds" className="form-control form-control-sm" />
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <label className="form-label fw-bold">Status (Employed/Unemployed/Business)
                </label>
                <input type="text" name="source_of_funds" className="form-control form-control-sm" />
              </div>
              <div className="col-md-4">
                <label className="form-label fw-bold">Business TIN/BIN (if any)
                </label>
                <input type="number" name="source_of_funds" className="form-control form-control-sm" />
              </div>
              <div className="col-md-4">
                <label className="form-label fw-bold">Tax Documents Available (Yes/No)
                </label>
                <input type="text" name="source_of_funds" className="form-control form-control-sm" />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <label className="form-label fw-bold">Present Address
                </label>
                <input type="text" name="source_of_funds" className="form-control form-control-sm" />
              </div>
               <div className="col-md-6">
                <label className="form-label fw-bold">Phone
                </label>
                <input type="number" name="source_of_funds" className="form-control form-control-sm" />
              </div>
            </div>
          </form>       
        </div>
          </div>

        <div className="card shadow mb-4">
        <div className="card-header bg-primary text-white">
          <h2 className="h4 mb-0">SPONSOR’S BUSINESS DETAILS
         </h2>
        </div>
        <div className="card-body">
          <form>
            <div className="row g-3 mb-4">
              <div className="col-md-4 ">
                <label className="form-label fw-bold">BusinessName
                </label>
                <input type="text" name="sponsor_name" className="form-control form-control-sm" />
              </div>
              <div className="col-md-4 ">
                <label className="form-label fw-bold">Type
                </label>
                <input type="email" name="sponsor_relationship" className="form-control form-control-sm" />
              </div>
              <div className="col-md-4 ">
                <label className="form-label fw-bold">Income (Monthly& Yearly)
                </label>
                <input type="number" name="sponsor_phone" className="form-control form-control-sm" />
              </div>
            </div>
            <div className="row g-3 mb-4">
              <div className="col-md-4">
                <label className="form-label fw-bold">LicenseNo.
                </label>
                <input type="number" name="annual_income" className="form-control form-control-sm" />
              </div>
              <div className="col-md-4">
                <label className="form-label fw-bold">Income Received via(Cash/Bank)
                </label>
                <input type="number" name="source_of_funds" className="form-control form-control-sm" />
              </div>
              <div className="col-md-4">
                <label className="form-label fw-bold">Bank Details(if bank)
                </label>
                <input type="text" name="source_of_funds" className="form-control form-control-sm" />
              </div>
            </div>         
          </form>          
        </div>        
      </div>

        <div className="card shadow mb-4">
        <div className="card-header bg-primary text-white">
          <h2 className="h4 mb-0">INFORMATION FOR COVER LETTER
         </h2>
        </div>
        <div className="card-body">
          <form>
            <div className="row g-3 mb-4">
              <div className="col-md-6 ">
                <label className="form-label fw-bold">Visa Refusal Explanation
                </label>
                <input type="text" name="sponsor_name" className="form-control form-control-sm" />
              </div>
              <div className="col-md-6 ">
                <label className="form-label fw-bold">Any Name/Age Mismatches (Self or Parents)
                </label>
                <input type="text" name="sponsor_relationship" className="form-control form-control-sm" />
              </div>            
            </div>
            <div className="row g-3 mb-4">
               <div className="col-md-6">
                <label className="form-label fw-bold">Study Gap Explanation
                </label>
                <input type="text" name="sponsor_phone" className="form-control form-control-sm" />
              </div>
              <div className="col-md-6">   
                <label className="form-label fw-bold">Deportation Details (if any)
                </label>
                <input type="text" name="annual_income" className="form-control form-control-sm" />
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* Submit Button */}
      <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">

        <button type="submit" className="btn btn-primary">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default StudentProfile;