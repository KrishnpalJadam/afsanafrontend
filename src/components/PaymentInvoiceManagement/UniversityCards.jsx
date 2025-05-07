// import React, { useState } from "react";
// import StudentUniversity from "./StudentUniversity";
// import bmu from "../../assets/bmulogo.webp";
// import gyor from "../../assets/gyor.webp";
// import devre from "../../assets/debre.webp";
// import hungay from "../../assets/hungary.webp";
// import wek from "../../assets/wekerle.webp";
// import { Modal, Button, Form } from "react-bootstrap";

// const UniversityCards = () => {
//   const initialUniversities = [
//     {
//       name: "bmuUniversity",
//       NAME: "Budapest Metropolitan University",
//       logo: bmu,
//       location: "Nagytétényi út 162-164, Budapest, Hungary, 1222",
//       programs: [
//         "Tourism and Catering",
//         "Animation",
//         "Graphic Design",
//         "Photography",
//       ],
//       highlights: [
//         "Internationally recognized degrees",
//         "Affordable tuition & living costs",
//         "English-taught programs",
//         "Strong focus on practical training",
//         "Diverse programs in business, media, tourism & arts",
//         "Strong career support & internship programs",
//       ],
//       contact: {
//         phone: "+36 1 273 3090 (International Office)",
//         email: "info@metropolitan.hu",
//       },
//     },
//     {
//       name: "GyorUniversity",
//       NAME: "Széchenyi István University",
//       logo: gyor,
//       location: "Egyetem tér 1, 9026 Győr, Hungary",
//       programs: [
//         "Vehicle Engineering",
//         "Civil Engineering",
//         "Supply Chain Management",
//         "Computer Science Engineering",
//       ],
//       highlights: [
//         "Strong reputation in IT fields",
//         "Close collaboration with Audi Hungary",
//         "Excellent practical training & internship opportunities",
//         "Affordable tuition and living costs compared to Western Europe",
//         "Strong focus on innovation projects",
//       ],
//       contact: {
//         phone: "+36 96 503 418 (International Office)",
//         email: "international@sze.hu",
//       },
//     },
//     {
//       name: "DebrecenUniversity",
//       NAME: "University of Debrecen",
//       logo: devre,
//       location: "Egyetem tér 1, 4032 Debrecen, Hungary",
//       programs: [
//         "Medicine",
//         "Pharmacy",
//         "Dentistry",
//         "Computer Science Engineering",
//       ],
//       highlights: [
//         "Top Ranked University in Hungary with strong global reputation",
//         "Over 6,000 international students from 120+ countries",
//         "Wide range of Bachelor, Master, and PhD programs taught in English",
//         "Affordable fees compared to Western Europe",
//       ],
//       contact: {
//         phone: "+36 52 258 058 (International Office)",
//         email: "admissions@stanford.edu",
//       },
//     },
//     {
//       name: "HunguryUniversity",
//       NAME: "Eötvös Loránd University",
//       logo: hungay,
//       location: "Egyetem tér 1-3, 1053 Budapest, Hungary",
//       programs: ["Computer Science", "Psychology", "Biology", "Mathematics"],
//       highlights: [
//         "One of the Oldest and Most Prestigious Universities in Hungary",
//         "Offers a wide range of English-taught programs",
//         "Affordable tuition fees compared to Western Europe",
//         "Located in Budapest, a dynamic city with rich culture and student life",
//       ],
//       contact: {
//         phone: "+36 1 411 6500",
//         email: "international@elte.hu",
//       },
//     },
//     {
//       name: "WekerleUniversity",
//       NAME: "Wekerle Sándor Business School",
//       logo: wek,
//       location: "Jázmin u. 10, 1084 Budapest, Hungary",
//       programs: [
//         "Commerce and Marketing",
//         "International Relations",
//         "Master of Business Administration",
//         "International Business Economics",
//       ],
//       highlights: [
//         "Located in Budapest, offering great accessibility, culture, and student life",
//         "Offers affordable tuition fees compared to Western Europe",
//         "Strong focus on entrepreneurship, business innovation, and real-world case studies",
//         "Dedicated international and student life",
//       ],
//       contact: {
//         phone: "+36 1 323 1000",
//         email: "international@wsuf.hu",
//       },
//     },
//   ];

//   const [universities, setUniversities] = useState(initialUniversities);

//   return (
//     <div className="container py-5">
//       <h1 className="text-center mb-5">Top Universities</h1>
//       <div className="row">
//         {universities.map((university, index) => (
//           <StudentUniversity key={index} university={university} />
//         ))}
//       </div>
//       {/* Modal for Adding University */}
//     </div>
//   );
// };

// export default UniversityCards;




import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

import Swal from "sweetalert2";
import BASE_URL from "../../Config";
import api from "../../interceptors/axiosInterceptor";

const UniversityCards = () => {
  const [universities, setUniversities] = useState([]);
  const role = localStorage.getItem("login"); // To check if the user is an admin

  // Spring animation for the cards
  const animation = useSpring({
    opacity: 1,
    transform: "translateY(0)",
    from: { opacity: 0, transform: "translateY(20px)" },
    config: { tension: 200, friction: 20 },
  });

  // Fetch universities on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`${BASE_URL}universities`);
        setUniversities(response.data); // Set fetched universities to state
      } catch (error) {
        console.log("Error fetching universities:", error);
      }
    };

    fetchData();
  }, []);

  // Handle delete action for university
  const handleDeleteUniversity = async (id) => {
    try {
      const response = await api.delete(`${BASE_URL}universities/${id}`);
      console.log('Delete response:', response);
      Swal.fire({
        title: "Deleted Successfully!",
        text: "The university has been deleted.",
        icon: "success",
        confirmButtonText: "Close",
      });
      // Filter out the deleted university from the list
      setUniversities((prevUniversities) =>
        prevUniversities.filter((university) => university.id !== id)
      );
    } catch (error) {
      console.error("Error deleting university:", error);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonText: "Close",
      });
    }
  };


  return (
    <div className="container">
      <div className="p-4">
        <h2 className="text-center ">Top International Universities</h2>
      </div>
      <div className="row mt-4">
        {universities.length > 0 ? (
          universities.map((university, index) => {
            const programs = Array.isArray(university.programs) ? university.programs : [];
            const highlights = Array.isArray(university.highlights) ? university.highlights : [];

            return (
              <animated.div key={index} className="col-md-4 mb-4" style={animation}>
                <div className="card shadow-sm">
                  <div className="card-body">
                    <div className="d-flex align-items-center mb-4">
                      <img
                        src={university.logo_url}
                        alt={`${university.name} Logo`}
                        className="rounded-circle"
                        crossorigin="anonymous"
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                          padding: "5px",
                        }}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/default-logo.png";
                        }}
                      />
                      <h5 className="ml-3">{university.name}</h5>
                    </div>

                    <div className="mb-3">
                      <div className="d-flex align-items-center text-muted mb-2">
                        📬 <span>{university.location}</span>
                      </div>
                    </div>

                    <div className="mb-3">
                      <h6 className="font-weight-bold">Popular Programs:</h6>
                      <ul className="text-muted">
                        {programs.length > 0 ? (
                          programs.map((program, index) => (
                            <li key={index}>• {program}</li>
                          ))
                        ) : (
                          <li>No programs available</li>
                        )}
                      </ul>
                    </div>

                    <div className="mb-3">
                      <h6 className="font-weight-bold">Key Highlights:</h6>
                      <ul className="text-muted">
                        {highlights.length > 0 ? (
                          highlights.map((highlight, index) => (
                            <li key={index}>• {highlight}</li>
                          ))
                        ) : (
                          <li>No highlights available</li>
                        )}
                      </ul>
                    </div>

                    <div className="mb-4">
                      <h6 className="font-weight-bold">Contact:</h6>
                      <div className="text-muted">
                        <p>📞 {university.contact_phone || 'N/A'}</p>
                        <p>📧 {university.contact_email || 'N/A'}</p>
                      </div>
                    </div>

                    {/* <Link to={`/university/${university.id}`} className="btn btn-primary w-100">
                      Apply Now
                    </Link> */}
                    <Link to="#" className="btn btn-primary w-100">
                      Apply Now
                    </Link>
                    {role === "admin" && (
                      <div>
                        <Button
                          variant="danger"
                          onClick={() => handleDeleteUniversity(university.id)}
                          className="mt-2 w-100"
                        >
                          Delete
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </animated.div>
            );
          })
        ) : (
          <p>No universities available</p>
        )}
      </div>
    </div>
  );
};

export default UniversityCards;
