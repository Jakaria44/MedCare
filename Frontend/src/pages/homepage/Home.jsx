import React from "react";
import Ambulance from "./Ambulance.jsx";
import BloodDonor from "./BloodDonor";
import ChatBot from "./ChatBot";
import DoctorConsult from "./DoctorConsult";
import DoctorReg from "./DoctorReg.jsx";
import FundRaise from "./FundRaise.jsx";
import Hero from "./Hero";

const Home = () => {
  return (
    <>
      <Hero />
      <ChatBot />
      <DoctorConsult />
      <Ambulance />
      <DoctorReg />
      <BloodDonor />
      <FundRaise />
    </>
  );
};

export default Home;
