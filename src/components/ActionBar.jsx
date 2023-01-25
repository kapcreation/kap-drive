import React, { useRef } from 'react'
import { Paper, IconButton, Box, TextField, Stack, Divider, LinearProgress } from '@mui/material'
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useFolder } from '../contexts/folderContext';
import Breadcrumbs from './Breadcrumbs';

const ActionBar = () => {
  const { createFolder, createFile, progress } = useFolder()

  async function handleAddFolder(e) {
    e.preventDefault()

    const form = e.currentTarget
    const formData = new FormData(form)
    const name = formData.get('name')
    form.reset()

    await createFolder(name)
  }

  async function handleAddFile(e) {
    const file = e.target.files[0]
    if (!file) return
    
    e.target.value = ''
    await createFile(file)
  }

  return (
    <Paper sx={{ mb: 2, p: 1 }}>
      <Breadcrumbs />
      <Divider variant='middle' sx={{ my: 1 }} />
      <Stack direction='row' alignItems='center'>
        <Stack component='form' onSubmit={handleAddFolder} direction='row' alignItems='center'>
          <TextField
            required
            id="name"
            label="New Folder"
            name="name"
            size='small'
          />
          <IconButton type='submit'>
            <CreateNewFolderIcon />
          </IconButton>
        </Stack>

        <IconButton component='label'>
          <input hidden name='file' type="file" onChangeCapture={handleAddFile} />
          <UploadFileIcon />
        </IconButton>

      </Stack>
      { 
        progress > 0 && progress < 100 && 
        <Box sx={{ width: '100%', pt: 1 }}>
          <LinearProgress variant="determinate" value={progress} />
        </Box>
      }
    </Paper>
  )
}

export default ActionBar