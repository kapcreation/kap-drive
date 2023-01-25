import React from 'react'
import { AppBar, Box, Toolbar, Button, Container, IconButton, useTheme, Stack, Divider } from '@mui/material';
import logo from '../assets/logo.png'
import { useAuth } from '../contexts/authContext';
import { useColorMode } from '../contexts/colorModeContext';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { Link as RouterLink } from 'react-router-dom';

const Navbar = () => {
  const { logout } = useAuth()
  const { toggleColorMode } = useColorMode()
  const theme = useTheme();

  return (
    <Box>
      <AppBar position="static">
        <Container maxWidth='lg'>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <IconButton component={RouterLink} to='/my-drive' color='inherit'>
              <Box component='img' alt='' src={logo} sx={{ width: '32px' }} />
            </IconButton>
            <Stack direction="row" alignItems='center' spacing={2}>
              <Button variant='text' sx={{ ml: 1, gap: '5px' }} onClick={toggleColorMode} color="inherit">
                {theme.palette.mode} mode
                {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
              </Button>
              <Divider orientation="vertical" variant='middle' flexItem />
              <Button variant='text' color='inherit' onClick={logout}>Log out</Button>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  )
}

export default Navbar