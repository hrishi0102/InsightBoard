import React from "react";

const Toolbar = ({ canvas, activeColor, setActiveColor, processWithAI }) => {
  // Function to toggle drawing mode
  const toggleDrawingMode = () => {
    if (!canvas) return;

    // Toggle the drawing mode
    canvas.isDrawingMode = !canvas.isDrawingMode;

    // Adjust brush options if in drawing mode
    if (canvas.isDrawingMode) {
      canvas.freeDrawingBrush.color = activeColor;
      canvas.freeDrawingBrush.width = 3;
    }
  };

  // Function to add a rectangle
  const addRectangle = () => {
    if (!canvas) return;

    // Disable drawing mode
    canvas.isDrawingMode = false;

    // Create a new rectangle object
    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      width: 100,
      height: 80,
      fill: "#fff",
      stroke: "#000",
      strokeWidth: 1,
    });

    // Add the rectangle to the canvas
    canvas.add(rect);
    // Make the rectangle the active object
    canvas.setActiveObject(rect);
  };

  // Function to add a circle
  const addCircle = () => {
    if (!canvas) return;

    // Disable drawing mode
    canvas.isDrawingMode = false;

    // Create a new circle object
    const circle = new fabric.Circle({
      left: 100,
      top: 100,
      radius: 50,
      fill: activeColor,
      stroke: "#000",
      strokeWidth: 1,
    });

    // Add the circle to the canvas
    canvas.add(circle);
    // Make the circle the active object
    canvas.setActiveObject(circle);
  };

  // Function to add text
  const addText = () => {
    if (!canvas) return;

    // Disable drawing mode
    canvas.isDrawingMode = false;

    // Create a new text object
    const text = new fabric.IText("Type here", {
      left: 100,
      top: 100,
      fontFamily: "Arial",
      fill: activeColor,
      fontSize: 20,
    });

    // Add the text to the canvas
    canvas.add(text);
    // Make the text the active object and enter editing mode
    canvas.setActiveObject(text);
  };

  // Function to clear the canvas
  const clearCanvas = () => {
    if (!canvas) return;
    canvas.clear();
    canvas.backgroundColor = "#ffffff";
    canvas.renderAll();
  };

  // Function to save the canvas as an image
  const saveCanvasAsImage = () => {
    if (!canvas) return;

    // Generate data URL from canvas
    const dataURL = canvas.toDataURL({
      format: "png",
      quality: 1,
    });

    // Create a temporary link element
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "whiteboard.png";

    // Trigger the download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleProcessWithAI = () => {
    if (!canvas) return;

    // Generate data URL from canvas
    const imageData = canvas.toDataURL({
      format: "png",
      quality: 1,
    });

    // Call the passed-in function to process with AI
    processWithAI(imageData);
  };

  return (
    <div
      className="toolbar"
      style={{
        padding: "10px",
        background: "#f0f0f0",
        display: "flex",
        gap: "10px",
      }}
    >
      <button onClick={toggleDrawingMode}>Draw</button>
      <button onClick={addRectangle}>Rectangle</button>
      <button onClick={addCircle}>Circle</button>
      <button onClick={addText}>Text</button>
      <button onClick={clearCanvas}>Clear</button>
      <button onClick={saveCanvasAsImage}>Save as Image</button>
      <button
        onClick={handleProcessWithAI}
        style={{ backgroundColor: "#8e44ad" }}
      >
        AI Analysis
      </button>
    </div>
  );
};

export default Toolbar;
