import React, { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import { useTheme } from "../context/ThemeContext";

const Canvas = ({ setCanvas }) => {
  // Get theme context
  const { darkMode } = useTheme();
  // Reference to the canvas element
  const canvasRef = useRef(null);
  // Reference to store the fabric canvas instance
  const fabricCanvasRef = useRef(null);

  // Zoom level state
  const [zoomLevel, setZoomLevel] = useState(1);

  // Function to get available canvas space
  const getCanvasDimensions = () => {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  };

  // State to track window dimensions
  const [dimensions, setDimensions] = useState(getCanvasDimensions());

  // Handle window resize and orientation change
  useEffect(() => {
    const handleResize = () => {
      setDimensions(getCanvasDimensions());
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    // Initial call to set dimensions correctly
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  // Initialize the canvas when the component mounts or dimensions change
  useEffect(() => {
    // Make sure we have a canvas reference
    if (!canvasRef.current) return;

    // Use the full dimensions for the canvas
    const canvasWidth = dimensions.width;
    const canvasHeight = dimensions.height;

    // Clean up existing canvas if it exists
    if (fabricCanvasRef.current) {
      fabricCanvasRef.current.dispose();
      fabricCanvasRef.current = null;
    }

    // Create a new fabric canvas with proper error handling
    try {
      fabricCanvasRef.current = new fabric.Canvas(canvasRef.current, {
        width: canvasWidth,
        height: canvasHeight,
        backgroundColor: darkMode ? "#1e1e1e" : "#ffffff",
        preserveObjectStacking: true,
        selection: true, // Enable object selection
      });

      // Set canvas to parent component only after successful initialization
      if (fabricCanvasRef.current) {
        setCanvas(fabricCanvasRef.current);
        
        // Apply zoom level
        applyZoomLevel();
      }
    } catch (error) {
      console.error("Error initializing canvas:", error);
    }

    // Clean up function
    return () => {
      if (fabricCanvasRef.current) {
        try {
          fabricCanvasRef.current.dispose();
        } catch (error) {
          console.error("Error disposing canvas:", error);
        }
        fabricCanvasRef.current = null;
      }
    };
  }, [dimensions, setCanvas, darkMode]); // Dependencies include dimensions and dark mode

  // Update canvas background when dark mode changes
  useEffect(() => {
    if (fabricCanvasRef.current) {
      fabricCanvasRef.current.setBackgroundColor(
        darkMode ? "#1e1e1e" : "#ffffff",
        () => fabricCanvasRef.current.renderAll()
      );
    }
  }, [darkMode]);

  // Apply zoom when zoom level changes
  useEffect(() => {
    applyZoomLevel();
  }, [zoomLevel]);

  // Function to apply zoom level to canvas
  const applyZoomLevel = () => {
    if (!fabricCanvasRef.current) return;

    try {
      fabricCanvasRef.current.setZoom(zoomLevel);
      fabricCanvasRef.current.renderAll();
    } catch (error) {
      console.error("Error applying zoom:", error);
    }
  };

  // Zoom in function
  const zoomIn = () => {
    if (zoomLevel < 3) {
      setZoomLevel((prevZoom) => Math.min(prevZoom + 0.1, 3));
    }
  };

  // Zoom out function
  const zoomOut = () => {
    if (zoomLevel > 0.5) {
      setZoomLevel((prevZoom) => Math.max(prevZoom - 0.1, 0.5));
    }
  };

  // Reset zoom to 100%
  const resetZoom = () => {
    setZoomLevel(1);
  };

  // Handle touch events for pinch zoom
  useEffect(() => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    let lastDistance = 0;

    const touchStartHandler = (e) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        lastDistance = Math.hypot(
          touch2.clientX - touch1.clientX,
          touch2.clientY - touch1.clientY
        );
      }
    };

    const touchMoveHandler = (e) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const currentDistance = Math.hypot(
          touch2.clientX - touch1.clientX,
          touch2.clientY - touch1.clientY
        );

        if (lastDistance && currentDistance) {
          // Calculate delta - if positive, zoom in; if negative, zoom out
          const delta = currentDistance - lastDistance;
          if (Math.abs(delta) > 10) {
            // Threshold to prevent unintended zooms
            if (delta > 0 && zoomLevel < 3) {
              setZoomLevel((prevZoom) => Math.min(prevZoom + 0.05, 3));
            } else if (delta < 0 && zoomLevel > 0.5) {
              setZoomLevel((prevZoom) => Math.max(prevZoom - 0.05, 0.5));
            }
            lastDistance = currentDistance;
          }
        }
      }
    };

    const touchEndHandler = () => {
      lastDistance = 0;
    };

    const canvasElement = canvas.wrapperEl;
    if (canvasElement) {
      canvasElement.addEventListener("touchstart", touchStartHandler, {
        passive: false,
      });
      canvasElement.addEventListener("touchmove", touchMoveHandler, {
        passive: false,
      });
      canvasElement.addEventListener("touchend", touchEndHandler);

      return () => {
        canvasElement.removeEventListener("touchstart", touchStartHandler);
        canvasElement.removeEventListener("touchmove", touchMoveHandler);
        canvasElement.removeEventListener("touchend", touchEndHandler);
      };
    }
  }, [zoomLevel]);

  return (
    <>
      <div
        className="canvas-container"
        style={{
          margin: "0",
          padding: "0",
          boxSizing: "border-box",
          width: "100%",
          height: "100%",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <canvas ref={canvasRef} />
      </div>

      {/* Zoom controls */}
      <div className="zoom-controls">
        <button onClick={zoomOut} className="zoom-button" title="Zoom Out">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path
              d="M15 3l2.3 2.3-2.89 2.87 1.42 1.42L18.7 6.7 21 9V3h-6z M3 9l2.3-2.3 2.87 2.89 1.42-1.42L6.7 5.3 9 3H3v6z M9 21l-2.3-2.3 2.89-2.87-1.42-1.42L5.3 17.3 3 15v6h6z M21 15l-2.3 2.3-2.87-2.89-1.42 1.42 2.89 2.87L15 21h6v-6z"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <line
              x1="9"
              y1="12"
              x2="15"
              y2="12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <button onClick={resetZoom} className="zoom-button" title="Reset Zoom">
          {Math.round(zoomLevel * 100)}%
        </button>
        <button onClick={zoomIn} className="zoom-button" title="Zoom In">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path
              d="M15 3l2.3 2.3-2.89 2.87 1.42 1.42L18.7 6.7 21 9V3h-6z M3 9l2.3-2.3 2.87 2.89 1.42-1.42L6.7 5.3 9 3H3v6z M9 21l-2.3-2.3 2.89-2.87-1.42-1.42L5.3 17.3 3 15v6h6z M21 15l-2.3 2.3-2.87-2.89-1.42 1.42 2.89 2.87L15 21h6v-6z"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <line
              x1="9"
              y1="12"
              x2="15"
              y2="12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line
              x1="12"
              y1="9"
              x2="12"
              y2="15"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </>
  );
};

export default Canvas;