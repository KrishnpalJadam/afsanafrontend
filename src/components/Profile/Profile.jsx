import { Link } from "react-router-dom";

const Profile = () => {
  const dummyData = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1234567890",
      status: "Active",
      assigned_to: "Alice",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+1987654321",
      status: "Inactive",
      assigned_to: "Bob",
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael.brown@example.com",
      phone: "+1122334455",
      status: "Pending",
      assigned_to: "Charlie",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.davis@example.com",
      phone: "+5566778899",
      status: "Active",
      assigned_to: "David",
    },
  ];
  return (
    <div className="container p-5 mt-5"  >
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
            <th>assignedTo</th>
            <th>moreInfo</th>
          </tr>
        </thead>
        <tbody>
          {dummyData.map((data) => (
            <tr key={data.id}>
              <td>{data.id}</td>
              <td className="text-nowrap">{data.name}</td>
              <td>{data.email}</td>
              <td>{data.phone}</td>
              <td>{data.status}</td>
              <td>{data.assigned_to}</td>
              <td className="btn btn-success mt-1">
                <Link
                  to={"/profiledetails"}
                  className="text-decoration-none text-black text-nowrap"
                >
                  View More
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Profile;
