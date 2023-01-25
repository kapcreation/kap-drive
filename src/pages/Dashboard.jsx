import React, { useEffect, useState } from 'react'
import { Grid, Paper, Divider } from '@mui/material'
import Folder from '../components/Folder'
import File from '../components/File'
import { useFolder } from '../contexts/folderContext'
import ActionBar from '../components/ActionBar'
import { useParams } from 'react-router-dom'
import { useAuth } from '../contexts/authContext'

const Dashboard = () => {
  const { currentUser } = useAuth()

  let { folderId } = useParams()

  const { openFolder, folders, files } = useFolder()

  useEffect(() => {
    openFolder(folderId)
  }, [folderId])
  

  return (
    <>
      <ActionBar folderId={folderId} />
      <Grid container spacing={1}>
        {folders?.map(item => (
          <Grid item xs={4} sm={3} md={2} key={item.id}>
            <Folder data={item} />
          </Grid>
        ))}
      </Grid>
      {folders?.length > 0 && files?.length > 0 && <Divider variant='middle' sx={{ my: 2 }} />}
      <Grid container spacing={1}>
        {files?.map(item => (
          <Grid item xs={4} sm={3} md={2} key={item.id}>
            <File data={item} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default Dashboard