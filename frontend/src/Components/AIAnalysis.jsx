import React from "react";
import Modal from "./Modal";

const AIAnalysis = ({ analysis, isLoading, error, isOpen, onClose }) => {
  return (
    <>
      {/* Simple floating indicator when loading */}
      {isLoading && !isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            padding: "10px 20px",
            backgroundColor: "#8e44ad",
            color: "white",
            borderRadius: "4px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
            zIndex: 100,
          }}
        >
          Analyzing your whiteboard...
        </div>
      )}

      {/* Modal for displaying results */}
      <Modal isOpen={isOpen} onClose={onClose} title="AI Analysis Results">
        {isLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "40px",
            }}
          >
            <div
              className="loading-spinner"
              style={{
                border: "4px solid #f3f3f3",
                borderTop: "4px solid #8e44ad",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                animation: "spin 1s linear infinite",
                marginRight: "15px",
              }}
            ></div>
            <p style={{ fontSize: "18px", color: "#666" }}>
              Analyzing your whiteboard...
            </p>
          </div>
        ) : error ? (
          <div
            style={{
              color: "#dc3545",
              backgroundColor: "#f8d7da",
              padding: "15px",
              borderRadius: "4px",
              marginBottom: "15px",
            }}
          >
            <strong>Error:</strong> {error}
          </div>
        ) : analysis ? (
          <div className="analysis-content">
            <div
              style={{
                backgroundColor: "#f8f9fa",
                border: "1px solid #dee2e6",
                borderRadius: "4px",
                padding: "15px",
                marginBottom: "15px",
              }}
            >
              <h3
                style={{
                  color: "#333",
                  marginTop: 0,
                  marginBottom: "10px",
                  borderBottom: "1px solid #eee",
                  paddingBottom: "10px",
                }}
              >
                Whiteboard Analysis
              </h3>
              <div
                style={{
                  whiteSpace: "pre-line",
                  fontSize: "16px",
                  lineHeight: "1.6",
                }}
              >
                {analysis}
              </div>
            </div>
          </div>
        ) : (
          <p>
            No analysis available. Draw something on the whiteboard and click
            "AI Analysis".
          </p>
        )}
      </Modal>
    </>
  );
};

export default AIAnalysis;
