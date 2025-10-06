"use client";

import React from "react";
import Container from "@mui/material/Container";



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
