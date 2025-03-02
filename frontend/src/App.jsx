import React, { useState } from "react";
import Canvas from "./Components/Canvas";
import Navbar from "./Components/Navbar";
import AIAnalysis from "./Components/AIAnalysis";
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
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPromptModal, setShowPromptModal] = useState(false);
  // Store the image data temporarily
  const [currentImageData, setCurrentImageData] = useState(null);

  // The default prompt
  const defaultPrompt =
    "Analyze this whiteboard image. Identify drawn elements, text, and diagrams. Provide a detailed explanation of what you see and any insights about the content. If you find any equations, solve and return the answer. If you find an diagram which represents a real-world mathematical problem, solve it and return the answer with steps. Whatever you infer, give detailed anaylsis and an answer if possible.";

  // Function to handle AI analysis button click
  const handleAIAnalysisClick = (imageData) => {
    setCurrentImageData(imageData);
    setShowPromptModal(true);
  };

  // Function to handle prompt submission
  const handlePromptSubmit = (prompt) => {
    // Close the prompt modal
    setShowPromptModal(false);

    // Start the AI analysis process with the selected prompt
    processWithAI(currentImageData, prompt);
  };

  // Function to process image with Gemini AI
  const processWithAI = async (imageData, prompt) => {
    setIsLoading(true);
    setError(null);

    // Open results modal to show loading state
    setIsModalOpen(true);

    try {
      const response = await fetch("http://localhost:5000/api/process-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageData,
          prompt,
        }),
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
          processWithAI={handleAIAnalysisClick}
        />
        <div className="canvas-wrapper" style={{ position: "relative" }}>
          <Canvas setCanvas={setCanvas} />
          <AIAnalysis
            analysis={aiAnalysis}
            isLoading={isLoading}
            error={error}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            showPromptModal={showPromptModal}
            onPromptModalClose={() => setShowPromptModal(false)}
            onPromptSubmit={handlePromptSubmit}
            defaultPrompt={defaultPrompt}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
