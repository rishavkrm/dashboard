import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
const NavBar = (props) => {  
  

  return (
    <Box sx={{ flexGrow: 1 }} >
      <AppBar position="static" variant="dense" >
        <Toolbar style={{ backgroundColor: '#1769aa', height:60, minHeight:20 }}>  
          <Typography variant="h6" component="div" sx={{ flexGrow: 34 }} style={{ color: '#fff' }}>
            EEPlus
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
    
  )
};

export default NavBar