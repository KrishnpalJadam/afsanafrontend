import React, { useState } from "react";
import StudentUniversity from "./StudentUniversity";
import bmu from "../../assets/bmulogo.webp";
import gyor from "../../assets/gyor.webp";
import devre from "../../assets/debre.webp";
import hungay from "../../assets/hungary.webp";
import wek from "../../assets/wekerle.webp";
import { Modal, Button, Form } from "react-bootstrap";

const UniversityCards = () => {
  const initialUniversities = [
    {
      name: "bmuUniversity",
      NAME: "Budapest Metropolitan University",
      logo: bmu,
      location: "Nagytétényi út 162-164, Budapest, Hungary, 1222",
      programs: [
        "Tourism and Catering",
        "Animation",
        "Graphic Design",
        "Photography",
      ],
      highlights: [
        "Internationally recognized degrees",
        "Affordable tuition & living costs",
        "English-taught programs",
        "Strong focus on practical training",
        "Diverse programs in business, media, tourism & arts",
        "Strong career support & internship programs",
      ],
      contact: {
        phone: "+36 1 273 3090 (International Office)",
        email: "info@metropolitan.hu",
      },
    },
    {
      name: "GyorUniversity",
      NAME: "Széchenyi István University",
      logo: gyor,
      location: "Egyetem tér 1, 9026 Győr, Hungary",
      programs: [
        "Vehicle Engineering",
        "Civil Engineering",
        "Supply Chain Management",
        "Computer Science Engineering",
      ],
      highlights: [
        "Strong reputation in IT fields",
        "Close collaboration with Audi Hungary",
        "Excellent practical training & internship opportunities",
        "Affordable tuition and living costs compared to Western Europe",
        "Strong focus on innovation projects",
      ],
      contact: {
        phone: "+36 96 503 418 (International Office)",
        email: "international@sze.hu",
      },
    },
    {
      name: "DebrecenUniversity",
      NAME: "University of Debrecen",
      logo: devre,
      location: "Egyetem tér 1, 4032 Debrecen, Hungary",
      programs: [
        "Medicine",
        "Pharmacy",
        "Dentistry",
        "Computer Science Engineering",
      ],
      highlights: [
        "Top Ranked University in Hungary with strong global reputation",
        "Over 6,000 international students from 120+ countries",
        "Wide range of Bachelor, Master, and PhD programs taught in English",
        "Affordable fees compared to Western Europe",
      ],
      contact: {
        phone: "+36 52 258 058 (International Office)",
        email: "admissions@stanford.edu",
      },
    },
    {
      name: "HunguryUniversity",
      NAME: "Eötvös Loránd University",
      logo: hungay,
      location: "Egyetem tér 1-3, 1053 Budapest, Hungary",
      programs: ["Computer Science", "Psychology", "Biology", "Mathematics"],
      highlights: [
        "One of the Oldest and Most Prestigious Universities in Hungary",
        "Offers a wide range of English-taught programs",
        "Affordable tuition fees compared to Western Europe",
        "Located in Budapest, a dynamic city with rich culture and student life",
      ],
      contact: {
        phone: "+36 1 411 6500",
        email: "international@elte.hu",
      },
    },
    {
      name: "WekerleUniversity",
      NAME: "Wekerle Sándor Business School",
      logo: wek,
      location: "Jázmin u. 10, 1084 Budapest, Hungary",
      programs: [
        "Commerce and Marketing",
        "International Relations",
        "Master of Business Administration",
        "International Business Economics",
      ],
      highlights: [
        "Located in Budapest, offering great accessibility, culture, and student life",
        "Offers affordable tuition fees compared to Western Europe",
        "Strong focus on entrepreneurship, business innovation, and real-world case studies",
        "Dedicated international and student life",
      ],
      contact: {
        phone: "+36 1 323 1000",
        email: "international@wsuf.hu",
      },
    },
  ];

  const [universities, setUniversities] = useState(initialUniversities);

  return (
    <div className="container py-5">
      <h1 className="text-center mb-5">Top Universities</h1>
      <div className="row">
        {universities.map((university, index) => (
          <StudentUniversity key={index} university={university} />
        ))}
      </div>
      {/* Modal for Adding University */}
    </div>
  );
};

export default UniversityCards;
