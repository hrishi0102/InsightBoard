import React, { useState, useEffect } from "react";
import Canvas from "./Components/Canvas";
import Navbar from "./Components/Navbar";
import AiAnalysis from "./Components/AIAnalysis";
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
  // Track device orientation and size
  const [isMobile, setIsMobile] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);

  // Get the API URL from environment variables
  const API_URL = import.meta.env.VITE_BACKEND_URL;

  // Detect device and orientation
  useEffect(() => {
    const checkDeviceAndOrientation = () => {
      const mobile = window.innerWidth <= 768;
      const landscape = window.innerWidth > window.innerHeight;

      setIsMobile(mobile);
      setIsLandscape(landscape);
    };

    // Initial check
    checkDeviceAndOrientation();

    // Add event listeners for resize and orientation change
    window.addEventListener("resize", checkDeviceAndOrientation);
    window.addEventListener("orientationchange", checkDeviceAndOrientation);

    return () => {
      window.removeEventListener("resize", checkDeviceAndOrientation);
      window.removeEventListener(
        "orientationchange",
        checkDeviceAndOrientation
      );
    };
  }, []);

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
      const response = await fetch(`${API_URL}/api/process-image`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageData,
          prompt,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Check if the error is due to rate limiting
        if (response.status === 429) {
          const retryAfter = data.retryAfter || 900; // Default to 15 minutes if not provided
          const minutes = Math.ceil(retryAfter / 60);
          throw new Error(
            `Rate limit exceeded. Please try again in ${minutes} ${
              minutes === 1 ? "minute" : "minutes"
            }.`
          );
        } else {
          throw new Error(data.error || "Failed to process image");
        }
      }

      setAiAnalysis(data.analysis);
    } catch (err) {
      console.error("Error processing image with AI:", err);
      setError(err.message || "An error occurred while processing the image");
    } finally {
      setIsLoading(false);
    }
  };

  // Prevent browser bounce effects on touch devices
  useEffect(() => {
    const preventPullToRefresh = (e) => {
      e.preventDefault();
    };

    document.body.addEventListener("touchmove", preventPullToRefresh, {
      passive: false,
    });

    return () => {
      document.body.removeEventListener("touchmove", preventPullToRefresh);
    };
  }, []);

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
          isMobile={isMobile}
          isLandscape={isLandscape}
        />
        <div
          className="canvas-wrapper"
          style={{
            position: "relative",
            height: isMobile && isLandscape ? "100vh" : undefined,
            width: "100vw", // Ensure full width
            padding: 0, // Remove any padding that might affect width
            margin: 0, // Remove any margin that might affect width
            overflowX: "hidden", // Prevent horizontal scrolling outside canvas
          }}
        >
          <Canvas setCanvas={setCanvas} />
          <AiAnalysis
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
