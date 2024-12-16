// src/pages/ContactPage.js
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ContactPage = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        backgroundImage: "url('/assets/contact.jpg')",
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
        <h1>Contact Us</h1>
        <p>
          We'd love to hear from you! If you have questions, suggestions, or
          just want to say hello, feel free to reach out using the methods
          below.
        </p>
        <div style={{ marginTop: "20px" }}>
          <p>Email: <a href="mailto:meheraan@fakeEmail.com" style={{ color: "#FFD700" }}>meheraan@fakeEmail.com</a></p>
          <p>Phone: (123)-456-7890</p>
          <p>
            Follow us on:{" "}
            <a href="/" style={{ color: "#FFD700", textDecoration: "none" }}>
              Instagram
            </a>{" "}
            |{" "}
            <a href="/" style={{ color: "#FFD700", textDecoration: "none" }}>
              Twitter
            </a>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;
