"use client";

import React, { useEffect } from "react";
import Container from "@mui/material/Container";
import { useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";

export default function PageContainer({ children }) {

    const [mounted, setMounted] = useState(false);
    useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // server render sırasında hiç renderlama

  return (
    <>
    <CssBaseline />
      <Container>
        {children}
      </Container> 
    </>
  );
}
