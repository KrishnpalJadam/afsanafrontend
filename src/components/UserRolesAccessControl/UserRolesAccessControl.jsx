import React from "react";

function UserRolesAccessControl() {
  return (
    <div  >
      <>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Users &amp; Roles Management</title>
        {/* Bootstrap CSS */}
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
        {/* Custom CSS */}
        <style dangerouslySetInnerHTML={{ __html: "\n   \n  " }} />
        <div className="container mt-5"  >
          {/* Page Header */}
          <h2 className="mb-4">Users &amp; Roles Management</h2>
          {/* Action Buttons */}
          <div className="d-flex justify-content-end mb-4">
            <button className="btn btn-primary mx-1">Add User</button>
            <button className="btn btn-success ms-1">Invite User</button>
          </div>
          {/* Users and Roles Section */}
          <div className="row">
            {/* Users List */}
            <div className=" mb-4 p-3 bg-light rounded-5 gap-3 ">
              <div className="user-list">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4>Users</h4>
                  <input
                    type="text"
                    className="form-control w-50"
                    placeholder="Search Users..."
                  />
                </div>
                <table className="table table-borderless bg-light">
                  <tbody className="bg-light">
                    <tr className="d-flex justify-content-between align-items-center">
                      <td>krammstein@gmail.com</td>
                      <td>
                        <span className="badge bg-primary">Invited</span>
                      </td>
                    </tr>
                    <tr className="d-flex justify-content-between align-items-center">
                      <td>veranika12@gmail.com</td>
                      <td>
                        <span className="badge bg-primary">Invited</span>
                      </td>
                    </tr>
                    <tr className="d-flex justify-content-between align-items-center">
                      <td>piper.brown@example.net</td>
                      <td>
                        <span className="badge bg-primary">Invited</span>
                      </td>
                    </tr>
                    <tr className="d-flex justify-content-between align-items-center">
                      <td>piper.brown@example.net</td>
                      <td>
                        <span className="badge bg-primary">Invited</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            {/* Roles List */}
            <div className="col-md-6 mb-4 p-3 bg-light rounded-5 gap-3">
              <div className="role-list">
                <div className="d-flex justify-content-between align-items-center mb-3 ">
                  <h4>Roles</h4>
                  <input
                    type="text"
                    className="form-control w-50"
                    placeholder="Search Roles..."
                  />
                </div>
                <table className="table table-borderless bg-light">
                  <thead>
                    <tr>
                      <th>Role Name</th>
                      <th>Permissions</th>
                      <th>Users</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>App Admin</td>
                      <td>
                        <button className="btn btn-info btn-sm">View</button>
                      </td>
                      <td>
                        <img
                          src="https://via.placeholder.com/30"
                          alt="User"
                          className="rounded-circle"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Manager</td>
                      <td>
                        <button className="btn btn-info btn-sm">View</button>
                      </td>
                      <td>
                        <img
                          src="https://via.placeholder.com/30"
                          alt="User"
                          className="rounded-circle"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Agent</td>
                      <td>
                        <button className="btn btn-info btn-sm">View</button>
                      </td>
                      <td>
                        <img
                          src="https://via.placeholder.com/30"
                          alt="User"
                          className="rounded-circle"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {/* Bootstrap JS */}
      </>
    </div>
  );
}

export default UserRolesAccessControl;
