// src/pages/LandingPage.js
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { blue, green, purple, red, teal } from "@mui/material/colors";

const LandingPage = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        backgroundImage: "url('/assets/money.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#fff",
      }}
    >
      <Header />
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <h1 style={{ color: "#FDFD96", fontWeight: "bold" }}>Discover Your Next Vacation Destination</h1>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
