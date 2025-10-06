"use client"
import React from 'react'
import Container from '@mui/material/Container';

const PageContainer = ({children}) => {
  return (
    <Container>
        {children}
    </Container>
  )
}

export default PageContainer