import React, { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";

const Canvas = ({ setCanvas }) => {
  // Reference to the canvas element
  const canvasRef = useRef(null);
  // State to track window dimensions
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight - 120, // Subtract height for toolbar and header
  });

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight - 120,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Initialize the canvas when the component mounts or dimensions change
  useEffect(() => {
    // Get the parent container's width
    const container = document.querySelector(".canvas-container");
    if (!container) return;

    // Create a new Fabric.js canvas using the DOM reference
    const fabricCanvas = new fabric.Canvas(canvasRef.current, {
      width: dimensions.width - 40, // Add some padding
      height: dimensions.height - 40,
      backgroundColor: "#ffffff",
    });

    // Store the canvas instance in the parent component's state
    setCanvas(fabricCanvas);

    // Clean up function to dispose canvas when component unmounts
    return () => {
      fabricCanvas.dispose();
    };
  }, [dimensions, setCanvas]); // Dependencies include dimensions so canvas resizes when window changes

  return (
    <div
      className="canvas-container"
      style={{
        margin: "0",
        padding: "20px",
        boxSizing: "border-box",
        width: "100%",
        height: `${dimensions.height}px`,
      }}
    >
      <canvas ref={canvasRef} />
    </div>
  );
};

export default Canvas;
