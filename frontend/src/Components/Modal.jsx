import React, { useEffect } from "react";

const Modal = ({ isOpen, onClose, title, children }) => {
  // Add event listener for Escape key
  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);

    // Prevent scrolling on body when modal is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  // Handle device type
  const isMobile = window.innerWidth <= 768;

  if (!isOpen) return null;

  // Close modal when clicking on backdrop (outside the modal content)
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="modal-backdrop"
      onClick={handleBackdropClick}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 2000, // Higher z-index to ensure it appears above all content
        padding: isMobile ? "10px" : "20px",
      }}
    >
      <div
        className="modal-content"
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
          width: isMobile ? "95%" : "80%",
          maxWidth: "600px",
          maxHeight: isMobile ? "90vh" : "80vh",
          display: "flex",
          flexDirection: "column",
          animation: "modalFadeIn 0.3s",
        }}
      >
        <div
          className="modal-header"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: isMobile ? "12px 16px" : "16px 20px",
            borderBottom: "1px solid #eee",
          }}
        >
          <h2
            style={{
              margin: 0,
              color: "#8e44ad",
              fontSize: isMobile ? "1.2rem" : "1.5rem",
            }}
          >
            {title}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              fontSize: "1.5rem",
              cursor: "pointer",
              padding: "0",
              width: "30px",
              height: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "50%",
              transition: "background-color 0.2s",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#f0f0f0")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            &times;
          </button>
        </div>
        <div
          className="modal-body"
          style={{
            padding: isMobile ? "16px" : "20px",
            overflowY: "auto",
            lineHeight: "1.6",
            WebkitOverflowScrolling: "touch", // Smooth scrolling on iOS
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
