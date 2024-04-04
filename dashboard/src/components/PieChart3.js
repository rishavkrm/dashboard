import React, { useRef, useState, useEffect } from 'react';
// import data from './../data/pie.json';
import { PieChart } from '@mui/x-charts/PieChart';
import MessageDialog from './MessageDialog';
import { toPng } from 'html-to-image';
import { Button, Switch } from '@mui/material';


function Piechart({ statsData }) {
    const { stats, setStats } = statsData;
    const [open2, setOpen2] = useState(true);
    const [apiError, setApiError] = useState(false);
    const [apiErrorMessage, setApiErrorMessage] = useState(false);
    console.log(stats);
    const [property, setProperty] = React.useState('Consumption (kWh)');
    const [data, setData] = useState([{}]);

    useEffect(() => {
        fetch('http://localhost:8000/pie')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                console.log(data.data.data)
                setData(data.data.data); // This will log the data received from the server
                // Use the data in your React component state or for rendering
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setApiError(true);
                setApiErrorMessage(error);
            });
    }, []);
    const [open, setOpen] = useState(false);
    const [popupData, setPopUpData] = React.useState("");
    let chartData = [];
    data.forEach((d)=>{
        let temp = d["Avg"];
        if(!temp){
            return;
        }
        d["Avg Household Consumption (kWh)"] = temp[" Household Consumption (kWh)"];
        d["Avg Commercial Consumption (kWh)"] = temp[" Commercial Consumption (kWh)"];
        d["Avg Industrial Consumption (kWh)"] = temp[" Industrial Consumption (kWh)"];
        d["Avg Residential Consumption (kWh)"] = temp[" Residential Consumption (kWh)"];
    })
    for (let i = 0; i < data.length; i++) {
        let temp = {};
        temp.id = i;
        temp.value = data[i][property];
        temp.label = data[i]["Quarter"];
        chartData.push(temp);
    }
    let properties = Object.keys(data[0]);
    properties = properties.filter(item => item !== 'Avg');
    properties.shift();
    for(let i = 0; i<data.length; i++){
        Object.keys(data[i]).forEach(key => {
            if (key !== 'Quarter') {
                // console.log(data[i][key]);
                if (typeof data[i][key] === 'string') {
                    data[i][key] = data[i][key].replace(/\D/g, '');
                  }
                // console.log(data[i][key]);
              
            }
          });
    }
    
    const handleChange = (e) => {
        setProperty(e.target.value);
      };
      React.useEffect(() => {
        const values = data.map(obj => obj[property]);
        const sum = values.reduce((acc, val) => Number(acc) + Number(val), 0);
        const average = sum / values.length;
        const maximum = Math.max(...values);
        const minimum = Math.min(...values);
        setStats([minimum, average, maximum]);
    }, [property,data]);

    const handleDataPointClick = (event, dataPoint) => {
        // console.log(dataPoint);
        // let tempKeys = Object.keys(data[dataPoint.dataIndex]);
        let tempKeys = properties;

        let tempString = "";
        tempKeys.map((key) => {
            tempString += (key + " : " + data[dataPoint.dataIndex][key]);
            tempString += '\n';
            return null;
        })
        setPopUpData(tempString);
        setOpen(true);
    };
    // canvas
    // canvas
    const [canvasVisible, setCanvasVisible] = useState(false);
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [penColor, setPenColor] = useState('black');
    const [shapeType, setShapeType] = useState('free');
    const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
    const [endPoint, setEndPoint] = useState({ x: 0, y: 0 });

    
    
    const handleReset = () => {
        const context = canvasRef.current.getContext('2d');
        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    };
    const handleChangeColor = (color) => {
        setPenColor(color);
    };
    const handleDownload = async () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        // Set canvas size to match the plot size
        canvas.width = 400;
        canvas.height = 400;

        // Convert the plot SVG to an image and draw it onto the canvas
        const svgClass = document.querySelector('.pieChart').childNodes[0].childNodes[0].classList[0];
        const plotCanvas = await toPng(document.querySelector('.' + svgClass));
        const plotImage = new Image();
        plotImage.src = plotCanvas;
        plotImage.onload = () => {
            context.drawImage(plotImage, 0, 0);

            // Draw the user's drawing onto the canvas
            context.drawImage(canvasRef.current, 0, 0);

            // Download the combined image
            const url = canvas.toDataURL();
            const a = document.createElement('a');
            a.href = url;
            a.download = 'annotation.png';
            a.click();
        };
    };
    // onMouseDown={startDrawingShape}
    //                     onMouseMove={drawShape}
    //                     onMouseUp={endDrawingShape}
    //                     onMouseOut={endDrawingShape}
    const toggleCanvas = () => {
        setCanvasVisible((prev) => !prev);
    };
    // New functions to handle drawing shapes
    const startDrawingShape = ({ nativeEvent }) => {
        if(!canvasVisible){return};
        // console.log(canvasVisible);
        if (shapeType === 'free') {
            const { offsetX, offsetY } = nativeEvent;
            const context = canvasRef.current.getContext('2d');
            context.beginPath();
            context.moveTo(offsetX, offsetY);
            setIsDrawing(true);
        }
        else {
            const { offsetX, offsetY } = nativeEvent;
            setStartPoint({ x: offsetX, y: offsetY });
        }
    };

    const drawShape = ({ nativeEvent }) => {
        if(!canvasVisible){return};
        if (shapeType === 'free') {
            if (!isDrawing) return;
            const { offsetX, offsetY } = nativeEvent;
            const context = canvasRef.current.getContext('2d');
            context.lineTo(offsetX, offsetY);
            context.stroke();
            context.strokeStyle = penColor;
        }
        else {
            if (!startPoint) return;
            const context = canvasRef.current.getContext('2d');
            const { offsetX, offsetY } = nativeEvent;
            setEndPoint({ x: offsetX, y: offsetY });
            context.strokeStyle = penColor;
        }
    };

    const endDrawingShape = () => {
        if(!canvasVisible){return};
        if (shapeType === 'free') {
            setIsDrawing(false);
        }
        else {


            if (!startPoint) return;
            const context = canvasRef.current.getContext('2d');
            context.beginPath();

            if (shapeType === 'line') {
                context.moveTo(startPoint.x, startPoint.y);
                context.lineTo(endPoint.x, endPoint.y);
            } else if (shapeType === 'circle') {
                const radius = Math.sqrt(Math.pow(endPoint.x - startPoint.x, 2) + Math.pow(endPoint.y - startPoint.y, 2));
                context.arc(startPoint.x, startPoint.y, radius, 0, 2 * Math.PI);
            } else if (shapeType === 'rectangle') {
                const width = endPoint.x - startPoint.x;
                const height = endPoint.y - startPoint.y;
                context.rect(startPoint.x, startPoint.y, width, height);
            }

            context.stroke();
            setStartPoint(null);
        }
    };
    return (
        <div>
        {apiError && <MessageDialog props={["Server error", String(apiErrorMessage), open2, setOpen2]} />}
            {<MessageDialog props={["Additional information", popupData, open, setOpen]} />}
            <div  className="pieChart" style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                <PieChart
                    series={[
                        {
                            data: chartData,
                            highlightScope: { faded: 'global', highlighted: 'item' },
                            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                        },
                    ]}
                    width={350}
                    height={350}

                    onItemClick={handleDataPointClick}
                />
                {canvasVisible && (
                    <canvas
                        ref={canvasRef}
                        width={350}
                        height={350}
                        style={{ position: 'absolute', top: 0, left: 0, border: '1px solid black' }}
                        onMouseDown={startDrawingShape}
                        onMouseMove={drawShape}
                        onMouseUp={endDrawingShape}
                        onMouseOut={endDrawingShape}
                    />
                )}
                <Switch checked={canvasVisible} onChange={toggleCanvas} />

                <div style={{ display: 'flex', flexDirection: 'column', marginTop: 0 }}>
                    <select value={property} onChange={handleChange} style={{ marginBottom: 5 }}>
                        {properties.map((prop) => (
                            <option key={prop} value={prop}>{prop}</option>
                        ))}
                    </select>
                    {/* <p>Selected Property: {property}</p> */}
                    {canvasVisible && <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                            <Button variant="contained" onClick={handleReset}>
                                Reset
                            </Button>
                            <Button variant="contained" onClick={handleDownload}>
                                Download
                            </Button>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', position: 'absolute', top: 10, left: 500 }}>
                            <button variant="contained" style={{ backgroundColor: 'black', color: 'white' }} onClick={() => handleChangeColor('black')}>
                                Black
                            </button>
                            <button variant="contained" style={{ backgroundColor: 'red', color: 'white' }} onClick={() => handleChangeColor('red')}>
                                Red
                            </button>
                            <button variant="contained" style={{ backgroundColor: 'blue', color: 'white' }} onClick={() => handleChangeColor('blue')}>
                                Blue
                            </button>
                            <button variant="contained" style={{ backgroundColor: 'green', color: 'white' }} onClick={() => handleChangeColor('green')}>
                                Green
                            </button>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', position: 'absolute', top: 10, right: 450 }}>
                            <button
                                variant="contained"
                                onClick={() => setShapeType('free')}
                                style={{ backgroundColor: shapeType === 'free' ? 'lightblue' : 'inherit' }}
                            >
                                Freehand
                            </button>
                            <button
                                variant="contained"
                                onClick={() => setShapeType('line')}
                                style={{ backgroundColor: shapeType === 'line' ? 'lightblue' : 'inherit' }}
                            >
                                Line
                            </button>
                            <button
                                variant="contained"
                                onClick={() => setShapeType('circle')}
                                style={{ backgroundColor: shapeType === 'circle' ? 'lightblue' : 'inherit' }}
                            >
                                Circle
                            </button>
                            <button
                                variant="contained"
                                onClick={() => setShapeType('rectangle')}
                                style={{ backgroundColor: shapeType === 'rectangle' ? 'lightblue' : 'inherit' }}
                            >
                                Rectangle
                            </button>
                        </div>


                    </div>}

                </div>
            </div>

        </div>
    );
}

export default Piechart;
