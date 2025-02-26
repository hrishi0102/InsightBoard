import React from "react";

const AIAnalysis = ({ analysis, isLoading, error }) => {
  if (!analysis && !isLoading && !error) {
    return null;
  }

  return (
    <div
      className="ai-analysis"
      style={{
        padding: "15px",
        margin: "10px",
        backgroundColor: "#f8f9fa",
        border: "1px solid #dee2e6",
        borderRadius: "5px",
        maxHeight: "200px",
        overflowY: "auto",
        position: "absolute",
        bottom: "10px",
        right: "10px",
        width: "400px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <h3 style={{ margin: "0", color: "#8e44ad" }}>AI Analysis</h3>
        {isLoading && <div>Processing...</div>}
      </div>

      {error && (
        <div style={{ color: "#dc3545", marginBottom: "10px" }}>
          Error: {error}
        </div>
      )}

      {analysis && (
        <div>
          <p style={{ whiteSpace: "pre-line" }}>{analysis}</p>
        </div>
      )}
    </div>
  );
};

export default AIAnalysis;
