import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


export default function Cards({stats}) {
    let [min, avg, max] = stats;
    if(isNaN(min)){
        min = 0;
    }
    if(isNaN(avg)){
        avg = 0;
    }
    if(isNaN(max)){
        max = 0;
    }
    // console.log(stats);
    return (
        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-around', margin:'20px'}}>
            <Card sx={{ minWidth: 275, marginRight:5 }}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        Minimum
                    </Typography>
                    <Typography variant="h4" component="div">
                        {min}
                    </Typography>
                    
                </CardContent>
            </Card >
            <Card sx={{ minWidth: 275, marginRight:5 }}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        Average
                    </Typography>
                    <Typography variant="h4" component="div">
                        {avg}
                    </Typography>
                    
                </CardContent>
            </Card >
            <Card sx={{ minWidth: 275, marginRight:5 }}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        Maximum
                    </Typography>
                    <Typography variant="h4" component="div">
                        {max}
                    </Typography>
                    
                </CardContent>
            </Card >
        </div>
    
      
    
  );
}