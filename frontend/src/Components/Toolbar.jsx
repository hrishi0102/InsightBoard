// Modified Toolbar.jsx
import React from "react";

const Toolbar = ({
  canvas,
  activeColor,
  setActiveColor,
  activeTool,
  setActiveTool,
  processWithAI,
}) => {
  // Function to toggle drawing mode
  const toggleDrawingMode = () => {
    if (!canvas) return;

    // Disable eraser mode if it was active
    if (activeTool === "eraser") {
      disableEraserMode();
    }

    // Toggle the drawing mode
    canvas.isDrawingMode = !canvas.isDrawingMode;
    setActiveTool(canvas.isDrawingMode ? "draw" : null);

    // Adjust brush options if in drawing mode
    if (canvas.isDrawingMode) {
      canvas.freeDrawingBrush.color = activeColor;
      canvas.freeDrawingBrush.width = 3;
    }
  };

  // Function to add a rectangle
  const addRectangle = () => {
    if (!canvas) return;

    // Disable drawing mode and eraser mode
    canvas.isDrawingMode = false;
    if (activeTool === "eraser") {
      disableEraserMode();
    }
    setActiveTool("rectangle");

    // Create a new rectangle object
    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      width: 100,
      height: 80,
      fill: "transparent",
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

    // Disable drawing mode and eraser mode
    canvas.isDrawingMode = false;
    if (activeTool === "eraser") {
      disableEraserMode();
    }
    setActiveTool("circle");

    // Create a new circle object
    const circle = new fabric.Circle({
      left: 100,
      top: 100,
      radius: 50,
      fill: "transparent",
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

    // Disable drawing mode and eraser mode
    canvas.isDrawingMode = false;
    if (activeTool === "eraser") {
      disableEraserMode();
    }
    setActiveTool("text");

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

  const addArrow = () => {
    if (!canvas) return;

    // Disable drawing mode and eraser mode
    canvas.isDrawingMode = false;
    if (activeTool === "eraser") {
      disableEraserMode();
    }
    setActiveTool("arrow");

    // Create an arrow using a path
    const arrowPath =
      "M 0 0 L 200 0 L 200 -10 L 220 10 L 200 30 L 200 20 L 0 20 z";

    const arrow = new fabric.Path(arrowPath, {
      left: 100,
      top: 100,
      fill: activeColor,
      stroke: "#000",
      strokeWidth: 0.5,
      scaleX: 0.5,
      scaleY: 0.5,
    });

    // Add the arrow to the canvas
    canvas.add(arrow);
    // Make the arrow the active object
    canvas.setActiveObject(arrow);
  };

  // Function to enable eraser mode
  const toggleEraserMode = () => {
    if (!canvas) return;

    // Check if eraser is already active
    if (activeTool === "eraser") {
      disableEraserMode();
      setActiveTool(null);
      return;
    }

    // Disable drawing mode
    canvas.isDrawingMode = false;
    setActiveTool("eraser");

    // Set cursor to indicate eraser mode
    canvas.defaultCursor = "not-allowed";

    // Store the original event handler if needed later
    const originalMouseDown = canvas.__onMouseDown;

    // Create a handler for object selection in eraser mode
    canvas.__onMouseDown = function (e) {
      const target = canvas.findTarget(e);
      if (target) {
        canvas.remove(target);
        canvas.renderAll();
      }
    };

    // Store the original handler for later restoration
    canvas.eraserOriginalMouseDown = originalMouseDown;
  };

  // Function to disable eraser mode
  const disableEraserMode = () => {
    if (!canvas) return;

    // Restore default cursor
    canvas.defaultCursor = "default";

    // Restore original mouse down handler if it exists
    if (canvas.eraserOriginalMouseDown) {
      canvas.__onMouseDown = canvas.eraserOriginalMouseDown;
      canvas.eraserOriginalMouseDown = null;
    }
  };

  // Function to clear the canvas
  const clearCanvas = () => {
    if (!canvas) return;

    // Disable eraser mode if active
    if (activeTool === "eraser") {
      disableEraserMode();
      setActiveTool(null);
    }

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

    // Disable eraser mode if active
    if (activeTool === "eraser") {
      disableEraserMode();
      setActiveTool(null);
    }

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
      <button
        onClick={toggleDrawingMode}
        className={activeTool === "draw" ? "active" : ""}
      >
        Draw
      </button>
      <button
        onClick={toggleEraserMode}
        className={activeTool === "eraser" ? "active" : ""}
        style={{
          backgroundColor: activeTool === "eraser" ? "#2b6cb0" : "#4285f4",
        }}
      >
        Eraser
      </button>
      <button
        onClick={addRectangle}
        className={activeTool === "rectangle" ? "active" : ""}
      >
        Rectangle
      </button>
      <button
        onClick={addCircle}
        className={activeTool === "circle" ? "active" : ""}
      >
        Circle
      </button>
      <button
        onClick={addText}
        className={activeTool === "text" ? "active" : ""}
      >
        Text
      </button>
      <button
        onClick={addArrow}
        className={activeTool === "arrow" ? "active" : ""}
      >
        Arrow
      </button>
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
