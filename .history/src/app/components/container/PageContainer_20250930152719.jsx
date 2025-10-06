"use client";

import React from "react";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";


export default function PageContainer({ children }) {
  return (
    <>
      <CssBaseline />
      <Container>
        {children}
      </Container> 
    </>
  );
}
