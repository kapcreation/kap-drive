import React, { useState } from 'react'
import { Avatar, Button, TextField, Link, Grid, Box, Typography, Container, Paper, Alert } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { MAIN_WEBSITE_URL, DEV_NAME } from '../types'
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';

const Login = () => {
  const { login } = useAuth()
  const [error, setError] = useState(null)

  const navigate = useNavigate() 

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const data = new FormData(event.currentTarget);
    
      await login(data.get('email'), data.get('password'))
      navigate('/')
    } catch (error) {
      console.error(error)
      setError(error.message)
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
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
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          <Grid container>
            <Grid item xs>
              <Link component={RouterLink} to="/" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link component={RouterLink} to="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
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

export default Login