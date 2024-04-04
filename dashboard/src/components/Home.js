import React, { useEffect, useState } from 'react';
import PermanentDrawerLeft from './Drawer';
import BarGraph2 from './BarGraph3';
import LineGraph2 from './LineGraph3';
import PieChart2 from './PieChart3';
import Cards from './Cards';
function Home() {
    // useEffect(() => {
    //     fetch('http://localhost:8000/bar')
    //         .then((response) => {
    //             if (!response.ok) {
    //                 throw new Error('Network response was not ok');
    //             }
    //             return response.json();
    //         })
    //         .then((data) => {
    //             console.log(data); // This will log the data received from the server
    //             // Use the data in your React component state or for rendering
    //         })
    //         .catch((error) => {
    //             console.error('Error fetching data:', error);
    //         });
    // }, []);
    const [stats, setStats] = useState([0, 0, 0]);
    const [selectedChart, setSelectedChart] = React.useState('State-wise Data');
    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div>
                <PermanentDrawerLeft chartType={{ selectedChart, setSelectedChart }}></PermanentDrawerLeft>
            </div>
            {/* <div>
               
            </div> */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} className='rigthContainer'>
                <Cards stats={stats} />
                {selectedChart === 'Quarterly Data' && <h1>Quarterly Data</h1>}
                {selectedChart === 'Quarterly Data' && <PieChart2 statsData={{ stats, setStats }} />}
                {selectedChart === 'Monthly Data' && <h1>Monthly Data</h1>}
                {selectedChart === 'Monthly Data' && <BarGraph2 statsData={{ stats, setStats }} />}
                {selectedChart === 'State-wise Data' && <h1>State-wise Data</h1>}
                {selectedChart === 'State-wise Data' && <LineGraph2 statsData={{ stats, setStats }} />}

            </div>
        </div>
    );
}

export default Home;