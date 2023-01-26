import React, { useState } from 'react'
import { Avatar, Button, TextField, Link, Grid, Box, Typography, Container, Paper, Alert } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { DEV_NAME, MAIN_WEBSITE_URL } from '../types';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';

const Signup = () => {
  const { signup } = useAuth()
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const data = new FormData(event.currentTarget);

      const email = data.get('email')
      const password = data.get('password')
      const passwordConfirm = data.get('password-confirm')
    
      if (password !== passwordConfirm) throw new Error("Passwords do not match. Please try again.")

      await signup(email, password)
      navigate('/')
    } catch (error) {
      console.error(error)
      setError(error.message)
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        sx={{
          p: 2,
          marginTop: 8,
          mb: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password-confirm"
                label="Password Confirmation"
                type="password"
                id="password-confirm"
              />
            </Grid>         
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to='/login' variant="body2">
                Already have an account? Log In
              </Link>
            </Grid>
          </Grid>

          {error && <Alert severity="error" sx={{ mt: 1 }}>{error}</Alert>}
        </Box>
      </Paper>
      {/* Copyright */}
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href={MAIN_WEBSITE_URL}>
          {DEV_NAME}
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </Container>
  )
}

export default Signup