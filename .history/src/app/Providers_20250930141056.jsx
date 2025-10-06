"use client"
import React from 'react'
import { ThemeProvider } from 'next-themes'

const Providers = ({children}) => {
  return (
    <ThemeProvider>
        <div>
            {children}   
        </div>
    </ThemeProvider>
  )
}

export default Providers