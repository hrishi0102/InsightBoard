const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" })); // Increased limit for image data

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Route to process image with Gemini
app.post("/api/process-image", async (req, res) => {
  try {
    const { imageData } = req.body;

    if (!imageData) {
      return res.status(400).json({ error: "No image data provided" });
    }

    // Remove the Data URL prefix to get just the base64 data
    const base64Image = imageData.split(",")[1];

    // Configure Gemini model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    // Process the image
    const result = await model.generateContent([
      {
        inlineData: {
          data: base64Image,
          mimeType: "image/png",
        },
      },
      {
        text: "Analyze this whiteboard image. Identify drawn elements, text, and diagrams. Provide a detailed explanation of what you see and any insights about the content. If you find any equations, solve and return the answer. If you find an diagram which represents a real-world mathematical problem, solve it and return the answer with steps. Whatever you infer, give detailed anaylsis and an answer if possible.",
      },
    ]);

    const response = await result.response;
    const text = response.text();

    res.json({ analysis: text });
  } catch (error) {
    console.error("Error processing image with Gemini:", error);
    res
      .status(500)
      .json({ error: "Failed to process image", details: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
