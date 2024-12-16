// src/pages/AboutPage.js
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const AboutPage = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        backgroundImage: "url('/assets/about.jpg')",
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
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "20px",
          backgroundColor: "rgba(0, 0, 0, 0.6)", // Overlay for better text readability
        }}
      >
        <h1>About Us</h1>
        <p>
          Our mission is to help you discover amazing vacation destinations
          based on your native currency. With real-time exchange rates and
          insights into global travel trends, we suggest the best places for
          you to explore, ensuring you get the most out of your money.
        </p>
        <p>
          Whether you're looking for luxury experiences or budget-friendly
          getaways, we've got recommendations tailored to your needs.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;
