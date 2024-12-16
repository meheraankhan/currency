// src/components/Header.js
import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

const Header = () => {
  return (
    <AppBar position="static" style={{ backgroundColor: "#333" }}>
      <Toolbar style={{ justifyContent: "space-between" }}>
          <Button color="inherit" href="/">
            VacatoinRecommender
          </Button>
        <div>
          <Button color="inherit" href="/home">
            Home
          </Button>
          <Button color="inherit" href="/account">
            Account
          </Button>
          <Button color="inherit" href="/login">
            Log In
          </Button>
          <Button color="inherit" href="/register">
            Register
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
