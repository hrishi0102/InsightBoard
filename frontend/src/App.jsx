import React, { useState } from "react";
import Canvas from "./Components/Canvas";
import Navbar from "./Components/Navbar";
import AIAnalysis from "./Components/AiAnalysis";
import "./App.css";

function App() {
  // State to store the canvas instance to pass to child components
  const [canvas, setCanvas] = useState(null);
  // State to track the active color
  const [activeColor, setActiveColor] = useState("#000000");
  // State to track active tool
  const [activeTool, setActiveTool] = useState(null);
  // State for AI analysis
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to process image with Gemini AI
  const processWithAI = async (imageData) => {
    setIsLoading(true);
    setError(null);

    // Open modal immediately to show loading state
    setIsModalOpen(true);

    try {
      const response = await fetch("http://localhost:5000/api/process-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageData }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to process image");
      }

      const data = await response.json();
      setAiAnalysis(data.analysis);
    } catch (err) {
      console.error("Error processing image with AI:", err);
      setError(err.message || "An error occurred while processing the image");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="whiteboard-container">
        <Navbar
          canvas={canvas}
          activeColor={activeColor}
          setActiveColor={setActiveColor}
          activeTool={activeTool}
          setActiveTool={setActiveTool}
          processWithAI={processWithAI}
        />
        <div className="canvas-wrapper" style={{ position: "relative" }}>
          <Canvas setCanvas={setCanvas} />
          <AIAnalysis
            analysis={aiAnalysis}
            isLoading={isLoading}
            error={error}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
