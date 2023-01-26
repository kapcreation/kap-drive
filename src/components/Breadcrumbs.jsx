import React from 'react'
import { Breadcrumbs as MuiBreadcrumbs, Link, Typography } from '@mui/material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link as RouterLink } from 'react-router-dom';
import { useFolder } from '../contexts/FolderContext';

const Breadcrumbs = () => {
  const { currentFolder } = useFolder()

  if (!currentFolder) return

  const path = currentFolder.type === 'root' ? 
    []
    :
    [...currentFolder.path, { name: currentFolder.name, id: currentFolder.id } ]

  return (
    <MuiBreadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />}>
      <Link component={RouterLink} to={`/my-drive`} underline="hover" color="inherit">
        My Drive
      </Link>
      {
        path.map((item, i) => (
          <Link component={RouterLink} to={`/folders/${item.id}`} underline="hover" color="inherit" key={i}>
            {item.name}
          </Link>
        ))
      }
    </MuiBreadcrumbs>
  )
}

export default Breadcrumbs