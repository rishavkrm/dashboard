// import React, { useRef, useState } from 'react';
// import { toPng } from 'html-to-image';
// import { Button, Switch } from '@mui/material';
// function Piechart({ statsData }) {
//     // canvas
//     const [canvasVisible, setCanvasVisible] = useState(false);
//     const canvasRef = useRef(null);
//     const [isDrawing, setIsDrawing] = useState(false);
//     const [penColor, setPenColor] = useState('black');

//     const startDrawing = ({ nativeEvent }) => {
//         const { offsetX, offsetY } = nativeEvent;
//         const context = canvasRef.current.getContext('2d');
//         context.beginPath();
//         context.moveTo(offsetX, offsetY);
//         setIsDrawing(true);
//     };

//     const draw = ({ nativeEvent }) => {
//         if (!isDrawing) return;
//         const { offsetX, offsetY } = nativeEvent;
//         const context = canvasRef.current.getContext('2d');
//         context.lineTo(offsetX, offsetY);
//         context.stroke();
//         context.strokeStyle = penColor;
//     };

//     const endDrawing = () => {
//         setIsDrawing(false);
//     };
//     const handleReset = () => {
//         const context = canvasRef.current.getContext('2d');
//         context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
//     };
//     const handleChangeColor = (color) => {
//         setPenColor(color);
//     };
//     const handleDownload = async () => {
//         const canvas = document.createElement('canvas');
//         const context = canvas.getContext('2d');

//         // Set canvas size to match the plot size
//         canvas.width = 1000;
//         canvas.height = 400;

//         // Convert the plot SVG to an image and draw it onto the canvas
//         const svgClass = document.querySelector('.pieChart').childNodes[0].childNodes[0].classList[0];
//         const plotCanvas = await toPng(document.querySelector('.' + svgClass));
//         const plotImage = new Image();
//         plotImage.src = plotCanvas;
//         plotImage.onload = () => {
//             context.drawImage(plotImage, 0, 0);

//             // Draw the user's drawing onto the canvas
//             context.drawImage(canvasRef.current, 0, 0);

//             // Download the combined image
//             const url = canvas.toDataURL();
//             const a = document.createElement('a');
//             a.href = url;
//             a.download = 'drawing_with_plot.png';
//             a.click();
//         };
//     };
//     const toggleCanvas = () => {
//         setCanvasVisible((prev) => !prev);
//     };
//     return (
//         <div>
//             {canvasVisible && <canvas
//                 ref={canvasRef}
//                 width={1000}
//                 height={400}
//                 //   style={{  }}
//                 style={{ position: 'absolute', top: 0, left: 0, }}

//                 onMouseDown={startDrawing}
//                 onMouseMove={draw}
//                 onMouseUp={endDrawing}
//                 onMouseOut={endDrawing}
//             />}
//             <div style={{ display: 'flex', flexDirection: 'column', marginTop: 0 }}>
//                 {/* <p>Selected Property: {property}</p> */}
//                 {<div style={{ display: 'flex', flexDirection: 'column' }}>
//                     <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
//                         <Button variant="contained" onClick={handleReset}>
//                             Reset
//                         </Button>
//                         <Button variant="contained" onClick={handleDownload}>
//                             Download
//                         </Button>
//                     </div>
//                     <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', position: 'absolute', top: 10, right: 0 }}>
//                         <button variant="contained" style={{ backgroundColor: 'red', color: 'white' }} onClick={() => handleChangeColor('red')}>
//                             Red
//                         </button>
//                         <button variant="contained" style={{ backgroundColor: 'blue', color: 'white' }} onClick={() => handleChangeColor('blue')}>
//                             Blue
//                         </button>
//                         <button variant="contained" style={{ backgroundColor: 'green', color: 'white' }} onClick={() => handleChangeColor('green')}>
//                             Green
//                         </button>

//                     </div>



//                 </div>}
//                 <Switch checked={canvasVisible} onChange={toggleCanvas} />

//             </div>
//         </div>
//     );
// }

// export default Piechart;
