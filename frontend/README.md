# InsightBoard : Interactive Whiteboard with AI Analysis

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19.0.0-blue.svg)
![Fabric.js](https://img.shields.io/badge/Fabric.js-5.0.0-brightgreen.svg)
![Gemini AI](https://img.shields.io/badge/Gemini-1.5_Pro-purple.svg)

A modern, interactive whiteboard application with real-time AI analysis capabilities. Draw diagrams, equations, flowcharts then get instant AI feedback and analysis.

## ✨ Features

- **Interactive Whiteboard Tools:**

  - Freehand drawing with customizable colors
  - Shapes (rectangles, circles, arrows)
  - Text insertion
  - Eraser functionality
  - Clear canvas option

- **AI-Powered Analysis:**

  - Analyze drawings, diagrams, and sketches
  - Identify and interpret mathematical equations
  - Solve problems drawn on the whiteboard
  - Get detailed explanations of whiteboard content

- **User-Friendly Interface:**
  - Modern, intuitive toolbar design
  - Color picker for personalization
  - Canvas saving functionality
  - Responsive design for various screen sizes

## 🖥️ Screenshots

_[Add screenshots of your application here]_

## 🚀 Technology Stack

### Frontend

- **React 19** - Latest React with improved performance
- **Fabric.js** - HTML5 canvas library for the whiteboard functionality
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Vite** - Next-generation frontend tooling

### Backend

- **Node.js** - JavaScript runtime for server-side code
- **Express** - Web application framework
- **Google Generative AI** - Integration with Google's Gemini 1.5 Pro model

## 📋 Prerequisites

- Node.js (v16 or higher)
- NPM (v8 or higher)
- Google AI API key (for the Gemini AI functionality)

## 🛠️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/interactive-whiteboard.git
cd interactive-whiteboard
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### 3. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory with your Gemini API key:

```
GEMINI_API_KEY=your_gemini_api_key_here
PORT=5000
```

Start the backend server:

```bash
node index.js
```

## 🎮 How to Use

1. **Launch the application**

   - Frontend will be available at `http://localhost:5173`
   - Backend will run on `http://localhost:5000`

2. **Draw on the whiteboard**

   - Select drawing tools from the toolbar
   - Choose colors from the color picker
   - Draw shapes, text, or freehand

3. **AI Analysis**
   - Click the "AI Analysis" button in the toolbar
   - Wait for the AI to process your whiteboard
   - View detailed analysis in the popup modal

## 🤖 AI Capabilities

The Gemini 1.5 Pro model can:

- Identify and interpret drawn elements and diagrams
- Recognize and solve mathematical equations
- Provide detailed explanations of whiteboard content
- Analyze flow charts and diagrams for meaning and structure

## 🚧 Future Enhancements

- User authentication and cloud saving
- Collaborative real-time whiteboarding
- Enhanced shape recognition
- PDF and document export options
- Mobile-responsive design improvements

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
