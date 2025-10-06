"use client";

import React, { useEffect } from "react";
import Container from "@mui/material/Container";
import { useEffect } from "react";



export default function PageContainer({ children }) {
    const [mounted, setMounted] = useState(false);
  return (
    <>
      <Container>
        {children}
      </Container> 
    </>
  );
}
