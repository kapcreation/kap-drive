import React, { createContext, useContext, useMemo, useState } from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';

export const ColorModeContext = createContext()

export const useColorMode = () => useContext(ColorModeContext)

export const ColorModeProvider = ({ children }) => {
  const [mode, setMode] = useState(localStorage.getItem('colormode') || 'light');
  const [theme, setTheme] = useState(createTheme({ palette: { mode }}))
  
  function toggleColorMode() {
    setMode((prevMode) =>
      prevMode === 'light' ? 'dark' : 'light',
    )
  }

  useMemo(() => {
    setTheme(createTheme({ palette: { mode }}))
    // setTheme(createTheme(getDesignTokens(mode)))
    localStorage.setItem('colormode', mode)
  }, [mode]);

  return (
    <ColorModeContext.Provider value={{ toggleColorMode }}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}