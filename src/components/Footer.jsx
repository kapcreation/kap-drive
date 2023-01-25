import React from 'react'
import { Box, Typography, Link, Container, Divider } from '@mui/material'
import { DEV_NAME, MAIN_WEBSITE_URL } from '../types'

const Footer = () => {
  return (
    <Box component="footer" sx={{ mt: 'auto' }}>
      <Divider variant='middle' />
      <Container maxWidth="lg" sx={{ p: 3 }}>
        <Typography variant="body1">
          This website is created by KAP.
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Copyright ©
          <Link color="inherit" href={MAIN_WEBSITE_URL}>
            {DEV_NAME}
          </Link>{' '}
          {new Date().getFullYear()}
          .
        </Typography>
      </Container>
    </Box>
  )
}

export default Footer