import React from 'react'
import Container from '@mui/material/Container';

const PageContainer = ({children}) => {
  return (
    <Container maxWidth="lg" className='pt-20'>
        {children}
    </Container>
  )
}

export default PageContainer