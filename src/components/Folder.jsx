import React, { useState } from 'react'
import FolderIcon from '@mui/icons-material/Folder';
import { Typography, Button, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import { deleteItem } from '../firebase';

const Folder = ({ data }) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false)

  return (
    <Box position='relative' onMouseEnter={() => setMenuIsOpen(true)} onMouseLeave={() => setMenuIsOpen(false)}>
      <Button LinkComponent={Link} to={`/folders/${data.id}`} variant='outlined' sx={{ width: '100%', p: 1, textAlign: 'center', gap: '5px', textTransform: 'none' }}>
        <FolderIcon />
        <Typography variant='subtitle2' noWrap>{data.name}</Typography>
      </Button>
      {menuIsOpen && (
        <Box sx={{ position: 'absolute', zIndex: 2, bottom: 0, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2px', transform: 'translateY(100%)', pt: '2px' }}>
          <Button variant='contained' onClick={()=>deleteItem(data)} color='error'>
            <DeleteIcon />
          </Button>
        </Box>
      )}
    </Box>
  )
}

export default Folder