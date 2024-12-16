// src/components/Footer.js
import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        position: "absolute",
        bottom: 0,
        width: "100%",
        textAlign: "center",
        padding: "10px 0",
        backgroundColor: "#333",
        color: "#fff",
      }}
    >
      <a href="/about" style={{ color: "#fff", marginRight: "15px" }}>
        About
      </a>
      <a href="/contact" style={{ color: "#fff" }}>
        Contact
      </a>
    </footer>
  );
};

export default Footer;
