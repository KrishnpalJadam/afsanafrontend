// import React from "react";
// import {
//   FaDownload,
//   FaUser,
//   FaGraduationCap,
//   FaChartLine,
//   FaFileAlt,
//   FaCalendarAlt,
//   FaTasks,
//   FaComments,
// } from "react-icons/fa";
// import { ProgressBar, Card, Row, Col, Button, Badge } from "react-bootstrap";

// const StudentProfile = () => {
//   // Sample data for application steps
//   const student = {
//     applicationSteps: [
//       { step: "Application Form", status: "Completed" },
//       { step: "Document Submission", status: "Completed" },
//       { step: "Interview", status: "Pending" },
//       { step: "Visa Process", status: "Pending" },
//     ],
//   };

//   return (
//     <div className="container mt-5">
//       {/* Profile Header */}
//       <Row className="mb-4 align-items-center">
//         <Col md={6} className="text-center mb-3 mb-md-0">
//           <img
//             style={{ height: "150px", width: "150px", objectFit: "cover" }}
//             src="data:image/jpeg;base64,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"
//             alt="Profile"
//             className="img-fluid rounded-circle shadow-sm"
//           />
//         </Col>
//         <Col md={6}>
//           <h2 className="font-weight-bold text-primary">Sanjana patel</h2>
//           <p className="text-muted">Last login: Today at 9:45 AM</p>
//           <ProgressBar
//             className="step-progress-bar"
//             now={75}
//             label={`Profile Completeness: 75%`}
//             variant="info"
//           />
//         </Col>
//       </Row>

//       {/* Personal Information, Education & Progress */}
//       <Row className="mb-4">
//         {/* Personal Information */}
//         <Col md={4} className="mb-3">
//           <Card style={{ minHeight: "400px" }}>
//             <Card.Header className="d-flex align-items-center">
//               <FaUser className="mr-2" /> Personal Information
//             </Card.Header>
//             <Card.Body>
//               <p>
//                 <strong>Full Name:</strong> John Smith
//               </p>
//               <p>
//                 <strong>Date of Birth:</strong> 15 March 1998
//               </p>
//               <p>
//                 <strong>Email:</strong> john.smith@email.com
//               </p>
//               <p>
//                 <strong>Phone:</strong> +1 234 567 8900
//               </p>
//               <p>
//                 <strong>Nationality:</strong> United States
//               </p>
//             </Card.Body>
//           </Card>
//         </Col>

//         {/* Educational Background */}
//         <Col md={4} className="mb-3">
//           <Card style={{ minHeight: "400px" }}>
//             <Card.Header className="d-flex align-items-center">
//               <FaGraduationCap className="mr-2" /> Educational Background
//             </Card.Header>
//             <Card.Body>
//               <p>
//                 <strong>High School:</strong> Lincoln High School
//               </p>
//               <p>
//                 <strong>Graduation Year:</strong> 2016
//               </p>
//               <p>
//                 <strong>GPA:</strong> 3.8/4.0
//               </p>
//               <p>
//                 <strong>Bachelor's Degree:</strong> University of California
//               </p>
//               <p>
//                 <strong>Major:</strong> Computer Science
//               </p>
//               <p>
//                 <strong>Graduation Year:</strong> 2020
//               </p>
//               <p>
//                 <strong>GPA:</strong> 3.5/4.0
//               </p>
//             </Card.Body>
//           </Card>
//         </Col>

//         {/* Academic Progress */}
//         <Col md={4} className="mb-3">
//           <Card style={{ minHeight: "400px" }}>
//             <Card.Header className="d-flex align-items-center">
//               <FaChartLine className="mr-2" /> Academic Progress
//             </Card.Header>
//             <Card.Body>
//               <p>
//                 <strong>Current Semester:</strong> Spring 2024
//               </p>
//               <ProgressBar
//                 className="step-progress-bar mb-3"
//                 now={83}
//                 label={`Credits: 15/18`}
//               />
//               <p>
//                 <strong>Overall Progress:</strong> 90/120 Credits
//               </p>
//               <ProgressBar
//                 className="step-progress-bar mb-3"
//                 now={75}
//                 label={`Total Progress`}
//               />
//               <p>
//                 <strong>Expected Graduation:</strong> May 2025
//               </p>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>

//       {/* Application Steps */}
//       <Row>
//         {student.applicationSteps.map((step, index) => (
//           <Col md={6} key={index} className="mb-3">
//             <Card>
//               <Card.Header>{step.step}</Card.Header>
//               <Card.Body>
//                 <p>
//                   Status:{" "}
//                   <Badge
//                     bg={step.status === "Completed" ? "success" : "warning"}
//                   >
//                     {step.status}
//                   </Badge>
//                 </p>
//                 {step.status === "Pending" && (
//                   <Button variant="primary">Complete</Button>
//                 )}
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}
//       </Row>

//       {/* Additional Details */}
//       <Row>
//         <Col md={12}>
//           <Card className="mt-3 shadow-lg p-3 mb-5 bg-white rounded">
//             <Card.Header>Additional Details</Card.Header>
//             <Card.Body>
//               <h6>Documents:</h6>
//               <ul className="list-unstyled">
//                 <li className="mb-2">
//                   Passport: <Badge bg="success">Completed</Badge>
//                 </li>
//                 <li className="mb-2">
//                   Offer Letter: <Badge bg="danger">Pending</Badge>
//                 </li>
//                 <li className="mb-2">
//                   Visa Form: <Badge bg="warning">Pending</Badge>
//                 </li>
//               </ul>
//               <h6>Actions:</h6>
//               <Button variant="success" className="me-2">
//                 Update Documents
//               </Button>
//               <Button variant="danger">Cancel Application</Button>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>

//       {/* Documents Section */}
//       <Row className="mb-4">
//         <Col md={12}>
//           <Card>
//             <Card.Header className="d-flex align-items-center">
//               <FaFileAlt className="mr-2" /> Documents
//             </Card.Header>
//             <Card.Body>
//               <div className="mb-3">
//                 <strong>Passport:</strong> Uploaded on 01/15/2024
//                 <Button variant="link" className="ms-2">
//                   <FaDownload /> Download
//                 </Button>
//               </div>
//               <div className="mb-3">
//                 <strong>High School Transcript:</strong> Uploaded on 01/10/2024
//                 <Button variant="link" className="ms-2">
//                   <FaDownload /> Download
//                 </Button>
//               </div>
//               <div>
//                 <strong>Language Certificate:</strong> Uploaded on 01/14/2024
//                 <Button variant="link" className="ms-2">
//                   <FaDownload /> Download
//                 </Button>
//               </div>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>

//       {/* Communication History, Upcoming Events, To-Do List */}
//       <Row className="mb-4">
//         {/* Communication History */}
//         <Col md={4} className="mb-3">
//           <Card style={{ minHeight: "300px" }}>
//             <Card.Header className="d-flex align-items-center">
//               <FaComments className="mr-2" /> Communication History
//             </Card.Header>
//             <Card.Body>
//               <p className="mb-2">
//                 <strong>Application Status Update:</strong> Documents verified
//                 successfully (March 10, 2024)
//               </p>
//               <p className="mb-2">
//                 <strong>Interview Scheduling:</strong> Interview scheduled for
//                 March 15, 2024
//               </p>
//               <p>
//                 <strong>Document Request:</strong> Additional documentation
//                 required (March 5, 2024)
//               </p>
//             </Card.Body>
//           </Card>
//         </Col>

//         {/* Upcoming Events */}
//         <Col md={4} className="mb-3">
//           <Card style={{ minHeight: "300px" }}>
//             <Card.Header className="d-flex align-items-center">
//               <FaCalendarAlt className="mr-2" /> Upcoming Events
//             </Card.Header>
//             <Card.Body>
//               <p className="mb-2">
//                 <strong>Career Fair:</strong> March 20, 2024, 10:00 AM - 4:00 PM
//               </p>
//               <p>
//                 <strong>Workshop:</strong> Resume Building, March 25, 2024
//               </p>
//             </Card.Body>
//           </Card>
//         </Col>

//         {/* To-Do List */}
//         <Col md={4} className="mb-3">
//           <Card style={{ minHeight: "300px" }}>
//             <Card.Header className="d-flex align-items-center">
//               <FaTasks className="mr-2" /> To-Do List
//             </Card.Header>
//             <Card.Body>
//               <p className="mb-2">
//                 <strong>Submit Assignment:</strong> Due March 18, 2024
//               </p>
//               <p className="mb-2">
//                 <strong>Book Study Room:</strong> For Group Project
//               </p>
//               <p>
//                 <strong>Priority:</strong> Medium
//               </p>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default StudentProfile;

import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Image,
  Tab,
  Tabs,
} from "react-bootstrap";

const Profile = () => {
  return (
    <Container className="mt-4">
      <Card className="shadow mb-4">
        <Card.Body>
          <Row>
            <Col md={2} className="text-center">
              <Image
                style={{ height: "150px", width: "150px", objectFit: "cover" }}
                src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQA2gMBEQACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAABAAIDBAUGBwj/xAA5EAABAwIEAwYDBgUFAAAAAAABAAIDBBEFEiExBkFRBxMiYXGBMrHBFBVCUpGhIyQz4fAWNHKC0f/EABoBAAIDAQEAAAAAAAAAAAAAAAABAgMEBQb/xAAwEQEAAgIBAwMDAQcFAQAAAAAAAQIDEQQSITEFE0EiUWFxIzJCUqGx4RUzgZHRFP/aAAwDAQACEQMRAD8A9CDVtcY8BIxQBCAKRigQKDOCAcgySMkEBTBpQQIIEyNQAQATICgGIRkCmDUEBTIwoIEEVkA0tQUmZUy00QFW0igEgCEAUGISEHIMQgHIMkgSABTBpQQIICmRqACCBMAUA1BGlMgQRpQRpQATIEFoiEDRtkEvqDQKASAKAKRiECDggyQDggySBFAAphXrKuGjhMtRI1jGi5JNrI3BfOmXT8VYJUSCNmIQhxOgcbKMXrPyc0vEbmGtna5oc1wLXC4IO6nCBucILYZggFmTLYXQJkEDYJkCCNKAbZBBZABMiQCsgaXFBcKASAPNAFIxQIOCDJAOCDJIEUBn43ikGEUD6qouQNGtG7ncgErWisbk61m86h5NiRx/i6rf3TnyQNOsbDZjfosOTP8Ad1cPE6fCGbgnG6endJMYpowP6Y+MenVVe7DT7EoOFOLqzh6vFLVSSS4e52V0Tjfuz1b09Fsx5defDm5+PFo7eXrUVfHMxkkTw+N7QWuGxHVbY7xuHIm+p1KZs4KNCLpGyXS0ls/Mg9iCgCgwQAKCCyCCyAFkAAgDZAWlFaKAIQBCAKRigQIQZIAhBikAOvNOBLybjTFJ+IuIKfDMPd/Ba8sa7lvYut/m3msefJt0eLh7fq9G4aosPoaKOgo5onmMDN4wXOPMlY4jql05nS1iccUUJc9zGi25dZK9UqTt4TxnQsp6+Z8Vi0yZgQdCCrcM7jTPnr321+B8aeyhNJK8/wAM3Zc7A8vr7rp8W3VE1eb9UrGO0ZI8S7WlrxJazv0WqaufTLtqQTXG6hMNFbbW2PuorYlKDdJI5BkgEggKAFkECAFkAUBZUVpIAhAEIAoMUhBwQYoBaoMUBRxqrbRYZPUOeGhjCbnrbRK09MbOKzaYiHlHAzIarjS8pzdzTFzWnnsPquZlmel3cFYi2npMeHVP3iyaepEsDLubG6BrS3pYhVdpapjSvXQSYpUVbxHTvmhOWAzszNb7JR5Lp12hwPGtE6FkJq/s5qXgsd3DMrSBsbKWO3cZ8eq7lxuEVBpqptttWlb+Pfpu4fqOGMuGY+ztsNrjdvRdXy8nMe3Z1NDU5mi5UJhqx321oJLhQmGmsrbCorYlKEkhQZIICgEgAgEgiQFhRWigEgCgCgxSBwQYoBXQZE6IDzXtUxKeOnhhbKQ18nwjoNifNU557aaOFG7zMuf7LamA8Unvm3mngLYn30aRqR7/AEWK8Tp18U6nb1vNKKl7JxZziO7e6UMBHQfVU1iZ8te9x+P0ZsEow/FjEBUSSVJLTZ4lF99cu3ulMaPtMbh5z2p1BhrYHXGbvA0AHz1UsMblVyLfTDiYx3dSQDoZDYrTWe8S5+aPotDqcPkNm6rsUl4/PV1OFT6AKdoU4rd9OjpZPCFVMN1JaEblFfCwCkmcCkYoAIBIBIAIBIJY1UVgBBnIAhAHVAEJGKASAcEGR2QHlvaVRisZK8m0gmsy55ZR/dZ8867tXD31aedYZU1OGyumpjkqIHZ439HDl7rPbu6VI0+gcFxmDE8HpamvjbC6WJr9fhuRyKo+WmtpjvDB4j4kwzBy40sjTK7fuuijrcrLXmf3p28ix7EZOIKo1MxyRsfZrPytva/qVfSOiGa9upQEgE56XupR2VX7xp0eEv750bWkAuIAv5rqY7/Tt5bkYf2nR+Xd4jS0+GVcNHTtN2sBkkLrl7j+yhxcts0WtMp+p8XFxLY8dI763M/do0T7tWiWWktSIqtpqstKScSlCSQoMkAkAkAEAkBNdRTEFAOCDIIAoAgoAoMQkDgg0NTO2CMucL30DRu7yQUvG+JsSdiFTI+Q3LHEZQfhP/qw5Z3Z1eLTVNuXlaO8kcdHPdofMKtqes9m2Jw1/DrKJ39Sl8Ja4cuSqt2stjvXanxNgcc1ZJUd3aNkZO2l1GUoh5S7JKx7Guy3ecp62KuUyhbTlznb5hoP89E9ozXbv+D+DsTxHD2V57unpAQWPkuTIBzaOnmtNeRFKaczJwL5c3V4h3XElAyaOKSmbmlj3PNw5hQ4mb27zE+JW+rcOeRhi1Y+qv8Ab5Z9C/wjSxXVl5jHPZsQu0CrlqrK0wpLYSgpJHX0QCQYoAIBIBIJMkmNkGSQEIByDEIByDEFI9jy6eqAoYi17aHEKxmX+WhcWl218twoXyRWFuHjzln8PC5qfEawymCkmkiMjnulcMrXf9jYfustKWyz9MbdX6cXbahilHV0cLJ5pKZ7HSFpEMofkdv4rbX1/RWZeNkxa641tGuStvEu/wCyjA8RlfNiDGhkLgGBpNrnmVkvSbT2aYvFY7u842pDR8MTPZl702YHHXUoti1BVy7l8+yUpaXuYXENOoOwRsa+TWVXijf3YcRZzmu2JB+R2T8FD6LwfEYsTwqKoidGIpoA5ndi4uBsPIKKyI7RIujEkOZzSPUKOjZFdRhmadmhB1tzWvDyrU+m3eHL5np1M2707WR08ugsun2mNw893rPTPmFyN6WlkSsNeorNnhyDOBQY3SAoAIBICe6SY3SMkwKQEIMQgHICriddHhuHz1szJHxwNzObEAXW8rkKeOk5LxSPMn+rKwzFcY4gw5tdglDQwwPc5rXVtUc5sbE5WNIGvmVozYMWC/Rlmd/iP8ra49xuFXEME4+r4zE7GcMp4CLGOne5o/XJdW483p2Pv7czP5WzGae3VEMZ3Zbi1S/PW4zSPfzeTJKf1IC119Zw0jVMU/0hV/8ANa3e11hnZIHQTQ1GPNcyQDRlGbtINwdX/TqsHP8AUI5dOno1/wA/4X4cUYbbiXTcK4ceG6k4N9qkqoBCJGSysDSDcgjTlouR09LZ1dULPHFXGeHKuaRpe1oywt6v5H2UMnhPH5fOD5p8xY8HM6T4QPVVLdyMRY+7eZu06bOuoycPeOA6KZvDULIqgRPhbluWZjby10U4x9UFOTp7NmowKoa19sRe5w1BfH/dP2Pyj7/4VailmfF3b7BzN7H4lTaswureJ8MaeF0JLwLNHxBaeLyemei/hy/UeB7ke7j/AHo8/k+CcHmur57vPROvK3HLdR0siUzX6JJxKVrkkok8FCR3ukCugEgJUktjdBwIKDFAGyQFAEFBmVFM2tppaV7Q5szDGR6iydbdNot9jiNzpzXZj3tHSYrg9Qf4tFWmw6NcB9Wk+62eo6vNMsfMNGKNfTPw7hq5y1IEJCkHMcW1cmH4hhk4IEVQ51PLpr+YfVRv4WY/K1jNKcWwN0EIBc2zmNOzrcvcXCqtG4XUnUvEeKsDqsNr2yNa59M4kxPttzyu6EbLPPZpj6vDGZA0yTR2OpzN6g81GZPT2zs/rHT00Mbzdz4znudiNL+6vx+GfL5d8WB4Ou9laqc9iNaJ5yKMNdFA4te+3xu5tb6deqzZbxM6hpxU13lVqYRK0ua0bbKmYXxLnqmN1PLdo8J5dFs43Jmk9N/Dkeo+nRkicuOO/wDdLBOOq6jzsTqe67HMClMLYssMkuopxKVr0k9nhyD2ddBldIJkkiTkECkDroPY5kDZwKRnICxQzRwzh0rbjkeijeJmNQuw3rW3dz7mx0XaFNJA4GDFKPPodO8jdYj1sQVorb3OLqfNZ/pLReNX3Hy6VhWY4TA6JGV0G5ntBY37gbUOH+2qGS6C53yn5qF/ErMUbvFVjAsUY+kjLYnnQb2Co92PhvjiWjzKXEqajxKLPWUkBcPgHd5nO9+Srtq3lbSntTqO7zniLgmdjaiuocpPeOczLy8R0Pso+3MR2VXyR1TCmauuwGloXROMNTmzmx0LQACCOi2cbHuO7keoZ5paOmXS13aI6pwAwUgdS17/AAyyHXI3qy25P7fopXw33qpY+fi6d38peGMcpaqijpGyd1UR2s12l7fNZMnHtjnu28fm4uRH09p+zo2FzXuBbladR69PkqZbI3Hln4lC1wvaxUJTc+bwSkEm3Jdbh5eunTPmHlvVuN7OX3K+J/utQzrZpzYsuxTeajMLYssskS0siU7XeaSZ4KRjdATpJldAG6AISByDG6DOBQZE6KF56Y2njrN7RWPlm8QQiFuGYi3R1JVszkfkf4HX8hmv7KjhZfqtSf4o/wAx/wCOxyMURjjXw3WFXywwmaUkjroNl8U0/wBr4dxGDfNA4geYF1G0dk8c6vEuc4PqGS4VDIbnwCwWB35js3jLnJIzaeyC0WcGhqMovldcj1V9O8Odyo6bvMuPC77wp2kaCIkfr/ZbMPhwOfvrhzrBdaHMlYiaQ4OBII1BBT6dx3Q65idw67BeJJo2iDEXGSPYS28TfXqFizcPcbo6/D9Z6Zimfx92/wDeEFSy7Xh3oVzbVtE6mHo8eSl67rO1Ctja6IvH4VbxZmMsaZfUqVtxrdSnGbbLtvF13pbiebpStiVyJ6S2JWWPUdLIlMxyScSkug1m6imKDIIBIAoBwSM66D2V7uDee59Fk5dtU1DoenU6snVPwGKxsmwyohn0jkic0nppv/nRYa36LRaHXtXqjUjhVSaqgpqg7yRtJ9barrb248+ezRaUScHpGa+Nr2ua/wCFzSD6FRmYjycRM+HAcO01Zh5bQVzHxPYTla5w1bcgEWJWG2urs9FSerHDp3WyuAFhuUkUFBLetkjNzG9trWVmOWPlx4lzXaBhsZwx9Q/wy0z25D+ZriAR+4PsteGfq04fNxx7fV9nAxC62Q4VpXoWKyIZ7yuxRX5JqdzPZeihI2J9lXkx0vGphs42fNx53jtpdY6Xuu6zEsvexVNONjpO4a83qPIzU6LT2/Q9rCAr2OITxg3SThbjCSyFpiSyEzUk4Puka3dRWDdAK6AV0A66AIQexCRkNH38rLm8y09enc9Np+zmfvKPEqeXEKKWBknd52loda9lkr5b58JKIGnj7p4LQDpppZdWuelvw5EcfJjjU92gw3tZT6o+46Z+ybX2VOTNEeF2PDvyr1JzNyNe9hP4mWv8lkvM28y201XxDkeKR92tjmgqZ5ajdxfZxAHoPZV61LViyblq087pqNsrxYluythZaNSph/cVTJrtAa7xZuQKlWdSz569VJUe00D7gieX2c6ZtgPxaFbcP7zz/O/2nm9PrZbYcC7TpxsrIY7y2KSIW2SlLHVeZD5KLRpM2HRG0uk8RpHpKyNBxCwxqSekzVHacJWoTg9I1lJIroBIAjZBnJGcCgDdBq1ZUmmILrBjtievRc7l456uqHZ9Oy16OifKKLFg0/hssXd1OycYzHbxWUolHQsxll/CxxHUNJUosXSn++YyLXsehBCey6QNcHC7g+3kEbHTLnOLsSaGwxRvEQBzuklFg3p6ny3SX0hZwsSw4NSxyEulyNBzaOvzJHJThfPc2sIex7bcrJozGnG8aVlTUxUUcwdaLM0k7E8re11t41t9vl5v1fFNZi0eJYFNuFvh57I1qXkrIYbt2kGgSlfj8NKJo6KC+E4YknocqBpI1iEohIGqKSRoQZ40SSG6DThyRjmQY3QBBQBzIPY3QNnXSPZrwHNIc0EHkQn+o3Md4Z1TQ051EYb/AMNFXOHHbzCyvLzY/FmZU0+TSNzxfQa3UZ4mLQ/1Tk9UR2/6XqbhwvH81VVD9dmS2H6WHzWStqV/heivx727xdd/05hxADoJ3AdST9Vd71P5WeeFk/m/qc7AsNsLxzADkH2+qhOXH/KnHFz611qFXgGGfb6et+zOE0IcGCRwdqbeLnqLfuVXkyRbxGmvjYb45mbW2suaGvb5clU2IDGANRqU0Jc3xbT95hs9h8BEg9Bv+yuwW1dzPUsfXx7fju4ylOoXUq8fka9KdlbDDdv0RuAlK7HO4asKg0QstGiisg6yEjgEpB4CDPCDFIzbphI0lIJAgxQZBIHIM4IEHISB2yClBKnCEqjWh1XECLjOPmi/7kjj1ic9In7tuaNoJtpYclyZe1pKm5z75c7reqW1+oSBgaL3JNtygkYY25cRc9SkUygqPCdOqDhAR4iOSAz8YY000ot8TSD6KdPMM+aImkxP2eaU2wXYq8Hla1NyVtWHI3aA+FqUpY/DZgUGqq21RXQfZBnAJSZwQYpGBTEmoJ//2Q=="
                roundedCircle
                fluid
              />
            </Col>
            <Col md={10} className="text-center mt-3">
              <h3>Sanjana Sharma</h3>
              <p>Email: sanjana@email.com</p>
              <p>Phone: +91 98765 43210</p>
              <Button variant="outline-primary" size="sm">
                Edit Profile
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <Tabs defaultActiveKey="personal" className="mb-4">
        {/* Personal Info */}
        <Tab eventKey="personal" title="Personal Info">
          <Card className="mb-4">
            <Card.Body>
              <Row>
                <Col md={6}>
                  <strong>Date of Birth:</strong> 12 March 2000
                </Col>
                <Col md={6}>
                  <strong>Gender:</strong> Female
                </Col>
              </Row>
              <Row className="mt-2">
                <Col md={6}>
                  <strong>Nationality:</strong> Indian
                </Col>
                <Col md={6}>
                  <strong>Address:</strong> Mumbai, Maharashtra
                </Col>
              </Row>
              <Row className="mt-2">
                <Col md={6}>
                  <strong>Passport Number:</strong> N1234567
                </Col>
                <Col md={6}>
                  <strong>Marital Status:</strong> Single
                </Col>
              </Row>
              <Row className="mt-2">
                <Col md={6}>
                  <strong>Alternate Email:</strong> sanjana.alt@email.com
                </Col>
                <Col md={6}>
                  <strong>Emergency Contact:</strong> +91 98765 11122
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Tab>

        {/* Academic Info */}
        <Tab eventKey="academic" title="Education">
          <Card className="mb-4">
            <Card.Body>
              <Row>
                <Col md={6}>
                  <strong>Qualification:</strong> B.Tech in Computer Science
                </Col>
                <Col md={6}>
                  <strong>University:</strong> XYZ Technical University
                </Col>
              </Row>
              <Row className="mt-2">
                <Col md={6}>
                  <strong>Year of Passing:</strong> 2022
                </Col>
                <Col md={6}>
                  <strong>Grade:</strong> 8.5 CGPA
                </Col>
              </Row>
              <Row className="mt-2">
                <Col md={6}>
                  <strong>10th Board:</strong> CBSE
                </Col>
                <Col md={6}>
                  <strong>10th Marks:</strong> 92%
                </Col>
              </Row>
              <Row className="mt-2">
                <Col md={6}>
                  <strong>12th Board:</strong> CBSE
                </Col>
                <Col md={6}>
                  <strong>12th Marks:</strong> 89%
                </Col>
              </Row>
              <Row className="mt-2">
                <Col md={6}>
                  <strong>Backlogs:</strong> None
                </Col>
                <Col md={6}>
                  <strong>Medium of Instruction:</strong> English
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Tab>

        {/* Documents */}

        <Tab eventKey="documents" title="Documents">
          <Row>
            {[
              { title: "Passport", file: "Passport.pdf", status: "✅" },
              {
                title: "Academic Transcript",
                file: "Academic Transcript.pdf",
                status: "✅",
              },
              { title: "IELTS Score", file: "IELTS Score.pdf", status: "✅" },
              { title: "SOP", file: "Statement of Purpose.pdf", status: "✅" },
              {
                title: "LOR",
                file: "Letter of Recommendation.pdf",
                status: "✅",
              },
            ].map((doc, idx) => (
              <Col md={4} key={idx} className="mb-3">
                <Card className="h-100 shadow-sm border-info">
                  <Card.Body>
                    <Card.Title>{doc.title}</Card.Title>
                    <Card.Text>{doc.file}</Card.Text>
                    <Button variant="outline-primary" size="sm">
                      View {doc.status}
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <div className="text-end mt-2">
            <Button variant="outline-success" size="sm">
              Upload More
            </Button>
          </div>
        </Tab>

        {/* Preferences */}
        <Tab eventKey="preferences" title="Study Preferences">
          <Card className="mb-4">
            <Card.Body>
              <Row>
                <Col md={6}>
                  <strong>Preferred Country:</strong> Canada
                </Col>
                <Col md={6}>
                  <strong>Intake:</strong> Fall 2025
                </Col>
              </Row>
              <Row className="mt-2">
                <Col md={6}>
                  <strong>Program Interest:</strong> Computer Science
                </Col>
                <Col md={6}>
                  <strong>Visa Guidance Required:</strong> Yes
                </Col>
              </Row>
              <Row className="mt-2">
                <Col md={6}>
                  <strong>Preferred Universities:</strong> University of
                  Toronto, UBC
                </Col>
                <Col md={6}>
                  <strong>Budget (INR):</strong> ₹25-30 Lakhs
                </Col>
              </Row>
              <Row className="mt-2">
                <Col md={6}>
                  <strong>Interested in Scholarships:</strong> Yes
                </Col>
                <Col md={6}>
                  <strong>Interested in Part-Time Jobs:</strong> Yes
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default Profile;
