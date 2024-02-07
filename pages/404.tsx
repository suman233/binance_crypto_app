import { Container } from '@mui/material'
import Link from 'next/link'
import React from 'react'

const errorpage = () => {
  return (
    <div>
      <Container sx={{ textAlign: 'center', mt: 20 }}>
        <h1>This page can't be reached. </h1>
        <p>404 error occured</p>
        <Link href='/'>Return to Home Page</Link>
      </Container>

    </div>
  )
}

export default errorpage