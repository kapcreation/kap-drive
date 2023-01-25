import React, { useState } from 'react'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { Typography, Button, Box, Stack, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import { deleteItem } from '../firebase';

const File = ({ data }) => {
  const isImage = !!data.contentType.match('^image/')
  const [menuIsOpen, setMenuIsOpen] = useState(false)
 
  return (
    <Box position='relative' onMouseEnter={() => setMenuIsOpen(true)} onMouseLeave={() => setMenuIsOpen(false)}>
      {!isImage ? (<Button variant='outlined' sx={{ width: '100%', flexDirection: 'column', p: 1, textTransform: 'none' }}>
        <div style={{ paddingTop: '100%', position: 'relative' }}>
          <InsertDriveFileIcon 
            sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} 
          />
        </div>
        <Typography variant='subtitle2' noWrap sx={{ width: '100%' }}>{data.name}</Typography>
      </Button>) :
      (<Button variant='outlined' sx={{ width: '100%', flexDirection: 'column', p: 0, overflow: 'hidden', textTransform: 'none' }}>
        <div style={{ width: '100%', paddingTop: '100%', backgroundImage: `url(${data.fileURL})`, backgroundSize: 'cover' }} />
        <Typography variant='subtitle2' noWrap align='center' sx={{ width: '100%' }}>{data.name}</Typography>
      </Button>)}

      {menuIsOpen && (
        <Box sx={{ position: 'absolute', zIndex: 2, bottom: 0, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2px', transform: 'translateY(100%)', pt: '2px' }}>
          <Button variant='contained' onClick={()=>deleteItem(data)} color='error'>
            <DeleteIcon />
          </Button>
          <Button variant='contained' LinkComponent={'a'} href={data.fileURL} target='_blank'>
            <DownloadIcon />
          </Button>
        </Box>
      )}
    </Box>
  )
}

export default File