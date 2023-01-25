import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { AuthProvider } from './contexts/authContext';
import { CssBaseline } from '@mui/material';
import { ColorModeProvider } from './contexts/colorModeContext';
import { FolderProvider } from './contexts/folderContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <FolderProvider>
        <ColorModeProvider>
          <CssBaseline />
          <App />
        </ColorModeProvider>
      </FolderProvider>
    </AuthProvider>
  </React.StrictMode>,
)