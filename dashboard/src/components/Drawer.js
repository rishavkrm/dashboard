import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PieChartIcon from '@mui/icons-material/PieChart';
import BarChartIcon from '@mui/icons-material/BarChart';
import TimelineIcon from '@mui/icons-material/Timeline';
import Typography from '@mui/material/Typography';

const drawerWidth = 240;

export default function PermanentDrawerLeft({chartType}) {
  // const [selectedChart, setSelectedChart] = React.useState('PieChart');
  const {selectedChart, setSelectedChart} = chartType;
  // console.log(selectedChart);
  const handleChartClick = (chartType) => {
    setSelectedChart(chartType);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar style={{ backgroundColor: '#1769aa', height:60, minHeight:20 }}>
        <Typography variant="h4" component="div" style={{ color: '#fff' }}>
            EEPLUS,INC
          </Typography>
        </Toolbar>
        <List>
          {['Quarterly Data', 'Monthly Data', 'State-wise Data'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={() => handleChartClick(text)}>
                <ListItemIcon>
                {index % 3 === 0 ? <PieChartIcon /> : index % 3 === 1 ? <BarChartIcon /> : <TimelineIcon />}                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        
      </Box>
    </Box>
  );
}
