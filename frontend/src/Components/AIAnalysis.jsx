import React from "react";
import Modal from "./Modal";
import PromptInputModal from "./PromptInputModal";

const AiAnalysis = ({
  analysis,
  isLoading,
  error,
  isOpen,
  onClose,
  showPromptModal,
  onPromptModalClose,
  onPromptSubmit,
  defaultPrompt,
}) => {
  // Determine if error is a rate limit error
  const isRateLimitError = error && error.toLowerCase().includes("rate limit");

  return (
    <>
      {/* Prompt Input Modal */}
      <PromptInputModal
        isOpen={showPromptModal}
        onClose={onPromptModalClose}
        onSubmit={onPromptSubmit}
        isLoading={isLoading}
        defaultPrompt={defaultPrompt}
      />

      {/* Simple floating indicator when loading */}
      {isLoading && !isOpen && !showPromptModal && (
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
              color: isRateLimitError ? "#856404" : "#dc3545",
              backgroundColor: isRateLimitError ? "#fff3cd" : "#f8d7da",
              padding: "15px",
              borderRadius: "4px",
              marginBottom: "15px",
              border: `1px solid ${isRateLimitError ? "#ffeeba" : "#f5c6cb"}`,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              {isRateLimitError ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  style={{ marginRight: "10px", fill: "#856404" }}
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  style={{ marginRight: "10px", fill: "#dc3545" }}
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                </svg>
              )}
              <strong>
                {isRateLimitError ? "Usage Limit Reached" : "Error"}
              </strong>
            </div>
            <p>{error}</p>
            {isRateLimitError && (
              <p style={{ marginTop: "10px", fontSize: "14px" }}>
                To prevent abuse, we limit the number of AI analyses per user.
                Please try again later.
              </p>
            )}
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

export default AiAnalysis;
