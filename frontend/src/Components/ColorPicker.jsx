import React from "react";

const ColorPicker = ({ activeColor, setActiveColor, canvas }) => {
  // Colors for the color picker
  const colors = [
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
        // For other objects, change the fill
        activeObject.set({ fill: color });
      }

      canvas.renderAll();
    }
  };

  return (
    <div
      className="color-picker"
      style={{ padding: "10px", display: "flex", gap: "8px" }}
    >
      {colors.map((color) => (
        <div
          key={color}
          style={{
            width: "30px",
            height: "30px",
            backgroundColor: color,
            cursor: "pointer",
            border: activeColor === color ? "3px solid #333" : "1px solid #ccc",
          }}
          onClick={() => handleColorChange(color)}
        />
      ))}
    </div>
  );
};

export default ColorPicker;
