import React from "react";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "../context/ThemeContext";

const Navbar = ({
  canvas,
  activeColor,
  setActiveColor,
  activeTool,
  setActiveTool,
  processWithAI,
  isMobile,
  isLandscape,
}) => {
  // Get theme context
  const { darkMode } = useTheme();
  // Tool functions (moved from Toolbar.jsx)

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
    canvas.defaultCursor = "cell";

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

  // Function to add a rectangle
  const addRectangle = () => {
    if (!canvas) return;

    // Disable drawing mode and eraser mode
    canvas.isDrawingMode = false;
    if (activeTool === "eraser") {
      disableEraserMode();
    }
    setActiveTool("rectangle");

    // Create a new rectangle object with transparent fill
    const rect = new fabric.Rect({
      left: canvas.width / 2 - 50,
      top: canvas.height / 2 - 40,
      width: 100,
      height: 80,
      fill: "transparent",
      stroke: activeColor,
      strokeWidth: 2,
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

    // Create a new circle object with transparent fill
    const circle = new fabric.Circle({
      left: canvas.width / 2 - 50,
      top: canvas.height / 2 - 50,
      radius: 50,
      fill: "transparent",
      stroke: activeColor,
      strokeWidth: 2,
    });

    // Add the circle to the canvas
    canvas.add(circle);
    // Make the circle the active object
    canvas.setActiveObject(circle);
  };

  // Function to add an arrow
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
      left: canvas.width / 2 - 110,
      top: canvas.height / 2 - 10,
      fill: activeColor,
      stroke: "#000",
      strokeWidth: 1,
      scaleX: 0.5,
      scaleY: 0.5,
    });

    // Add the arrow to the canvas
    canvas.add(arrow);
    // Make the arrow the active object
    canvas.setActiveObject(arrow);
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
      left: canvas.width / 2 - 50,
      top: canvas.height / 2 - 10,
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

    // Disable eraser mode if active
    if (activeTool === "eraser") {
      disableEraserMode();
      setActiveTool(null);
    }

    canvas.clear();
    canvas.backgroundColor = darkMode ? "#1e1e1e" : "#ffffff";
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

  // Colors for the color picker
  const colors = [
    "#ffffff", // White
    "#000000", // Black
    "#ff0000", // Red
    "#00ff00", // Green
    "#0000ff", // Blue
    "#ffff00", // Yellow
    "#ff00ff", // Magenta
    "#00ffff", // Cyan
  ];

  // Function to handle color change
  const handleColorChange = (color) => {
    setActiveColor(color);

    // If we have a canvas and it's in drawing mode, update the brush color
    if (canvas && canvas.isDrawingMode) {
      canvas.freeDrawingBrush.color = color;
    }

    // If there's an active object, update its color
    if (canvas && canvas.getActiveObject()) {
      const activeObject = canvas.getActiveObject();

      // If it's a path (from free drawing), change the stroke
      if (activeObject.type === "path") {
        activeObject.set({ stroke: color });
      } else {
        // For other objects like rectangles and circles, change the stroke
        // For text and arrows, change the fill
        if (activeObject.type === "i-text") {
          activeObject.set({ fill: color });
        } else if (
          activeObject.type === "path" &&
          activeObject.path &&
          activeObject.path.length > 4
        ) {
          // This is likely our arrow
          activeObject.set({ fill: color });
        } else {
          activeObject.set({ stroke: color });
        }
      }

      canvas.renderAll();
    }
  };

  // Determine if we should show a more compact UI for mobile
  const compactUI = isMobile || (isLandscape && window.innerHeight < 500);

  return (
    <div className={`navbar ${compactUI ? "compact" : ""}`}>
      <div className="navbar-content">
        <div className="tool-section">
          <div className="tool-group">
            <button
              onClick={toggleDrawingMode}
              className={`tool-button ${activeTool === "draw" ? "active" : ""}`}
              title="Pencil"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width={compactUI ? "18" : "20"}
                height={compactUI ? "18" : "20"}
              >
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
              </svg>
            </button>
            <button
              onClick={toggleEraserMode}
              className={`tool-button ${
                activeTool === "eraser" ? "active" : ""
              }`}
              title="Eraser"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width={compactUI ? "18" : "20"}
                height={compactUI ? "18" : "20"}
              >
                <path d="M15.14 3c-.51 0-1.02.2-1.41.59L2.59 14.73c-.78.77-.78 2.04 0 2.83L5.03 20h7.66l8.72-8.73c.79-.78.79-2.04 0-2.83l-4.85-4.85c-.39-.39-.9-.59-1.42-.59zm-3.74 14.87L4.41 10.87 10.84 4.44l7 7-6.44 6.43z" />
              </svg>
            </button>
          </div>

          <div className="tool-group">
            <button
              onClick={addRectangle}
              className={`tool-button ${
                activeTool === "rectangle" ? "active" : ""
              }`}
              title="Rectangle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width={compactUI ? "18" : "20"}
                height={compactUI ? "18" : "20"}
              >
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z" />
              </svg>
            </button>
            <button
              onClick={addCircle}
              className={`tool-button ${
                activeTool === "circle" ? "active" : ""
              }`}
              title="Circle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width={compactUI ? "18" : "20"}
                height={compactUI ? "18" : "20"}
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
              </svg>
            </button>
            <button
              onClick={addArrow}
              className={`tool-button ${
                activeTool === "arrow" ? "active" : ""
              }`}
              title="Arrow"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width={compactUI ? "18" : "20"}
                height={compactUI ? "18" : "20"}
              >
                <path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4z" />
              </svg>
            </button>
            <button
              onClick={addText}
              className={`tool-button ${activeTool === "text" ? "active" : ""}`}
              title="Text"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width={compactUI ? "18" : "20"}
                height={compactUI ? "18" : "20"}
              >
                <path d="M5 4v3h5.5v12h3V7H19V4z" />
              </svg>
            </button>
          </div>

          <div className="tool-group">
            <button
              onClick={clearCanvas}
              className="tool-button"
              title="Clear Canvas"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width={compactUI ? "18" : "20"}
                height={compactUI ? "18" : "20"}
              >
                <path d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14zM6 7v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zm8 7v4h-4v-4H8l4-4 4 4h-2z" />
              </svg>
            </button>
            <button
              onClick={saveCanvasAsImage}
              className="tool-button"
              title="Save as Image"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width={compactUI ? "18" : "20"}
                height={compactUI ? "18" : "20"}
              >
                <path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2v9.67z" />
              </svg>
            </button>
            <ThemeToggle compactUI={compactUI} />
            <button
              onClick={handleProcessWithAI}
              className="tool-button ai-button"
              title="AI Analysis"
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "6px" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={compactUI ? "18" : "20"}
                  height={compactUI ? "18" : "20"}
                  viewBox="0 0 48 48"
                >
                  <radialGradient
                    id="oDvWy9qKGfkbPZViUk7TCa_eoxMN35Z6JKg_gr1"
                    cx="-670.437"
                    cy="617.13"
                    r=".041"
                    gradientTransform="matrix(128.602 652.9562 653.274 -128.6646 -316906.281 517189.719)"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0" stopColor="#1ba1e3"></stop>
                    <stop offset="0" stopColor="#1ba1e3"></stop>
                    <stop offset=".3" stopColor="#5489d6"></stop>
                    <stop offset=".545" stopColor="#9b72cb"></stop>
                    <stop offset=".825" stopColor="#d96570"></stop>
                    <stop offset="1" stopColor="#f49c46"></stop>
                  </radialGradient>
                  <path
                    fill="url(#oDvWy9qKGfkbPZViUk7TCa_eoxMN35Z6JKg_gr1)"
                    d="M22.882,31.557l-1.757,4.024c-0.675,1.547-2.816,1.547-3.491,0l-1.757-4.024	c-1.564-3.581-4.378-6.432-7.888-7.99l-4.836-2.147c-1.538-0.682-1.538-2.919,0-3.602l4.685-2.08	c3.601-1.598,6.465-4.554,8.002-8.258l1.78-4.288c0.66-1.591,2.859-1.591,3.52,0l1.78,4.288c1.537,3.703,4.402,6.659,8.002,8.258	l4.685,2.08c1.538,0.682,1.538,2.919,0,3.602l-4.836,2.147C27.26,25.126,24.446,27.976,22.882,31.557z"
                  ></path>
                  <radialGradient
                    id="oDvWy9qKGfkbPZViUk7TCb_eoxMN35Z6JKg_gr2"
                    cx="-670.437"
                    cy="617.13"
                    r=".041"
                    gradientTransform="matrix(128.602 652.9562 653.274 -128.6646 -316906.281 517189.719)"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0" stopColor="#1ba1e3"></stop>
                    <stop offset="0" stopColor="#1ba1e3"></stop>
                    <stop offset=".3" stopColor="#5489d6"></stop>
                    <stop offset=".545" stopColor="#9b72cb"></stop>
                    <stop offset=".825" stopColor="#d96570"></stop>
                    <stop offset="1" stopColor="#f49c46"></stop>
                  </radialGradient>
                  <path
                    fill="url(#oDvWy9qKGfkbPZViUk7TCb_eoxMN35Z6JKg_gr2)"
                    d="M39.21,44.246l-0.494,1.132	c-0.362,0.829-1.51,0.829-1.871,0l-0.494-1.132c-0.881-2.019-2.467-3.627-4.447-4.506l-1.522-0.676	c-0.823-0.366-0.823-1.562,0-1.928l1.437-0.639c2.03-0.902,3.645-2.569,4.511-4.657l0.507-1.224c0.354-0.853,1.533-0.853,1.886,0	l0.507,1.224c0.866,2.088,2.481,3.755,4.511,4.657l1.437,0.639c0.823,0.366,0.823,1.562,0,1.928l-1.522,0.676	C41.677,40.619,40.091,42.227,39.21,44.246z"
                  ></path>
                </svg>
                {!compactUI && (
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: "500",
                      color: "#5a67d8",
                    }}
                  >
                    AI
                  </span>
                )}
              </div>
            </button>
          </div>
        </div>

        <div className="color-section">
          {colors.map((color) => (
            <div
              key={color}
              className={`color-circle ${
                activeColor === color ? "active" : ""
              }`}
              style={{
                backgroundColor: color,
                width: compactUI ? "20px" : "24px",
                height: compactUI ? "20px" : "24px",
              }}
              onClick={() => handleColorChange(color)}
              title={color}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
