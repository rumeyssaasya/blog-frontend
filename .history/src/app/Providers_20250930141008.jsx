import React from 'react'
import { ThemeProvider } from 'next-themes'

const Providers = ({children}) => {
  return (
    <div>{children}</div>
  )
}

export default Providers