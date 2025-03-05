import React, { useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

const Modal = ({ isOpen, onClose, title, children }) => {
  // Get theme context
  const { darkMode } = useTheme();
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
        backgroundColor: darkMode ? "rgba(0, 0, 0, 0.7)" : "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 2000, // Higher z-index to ensure it appears above all content
        padding: isMobile ? "10px" : "20px",
        transition: "background-color 0.3s ease",
      }}
    >
      <div
        className="modal-content"
        style={{
          backgroundColor: darkMode ? "#222" : "white",
          color: darkMode ? "#f8f8f8" : "inherit",
          borderRadius: "8px",
          boxShadow: darkMode ? "0 4px 20px rgba(0, 0, 0, 0.4)" : "0 4px 20px rgba(0, 0, 0, 0.2)",
          width: isMobile ? "95%" : "80%",
          maxWidth: "600px",
          maxHeight: isMobile ? "90vh" : "80vh",
          display: "flex",
          flexDirection: "column",
          animation: "modalFadeIn 0.3s",
          transition: "background-color 0.3s ease, color 0.3s ease",
        }}
      >
        <div
          className="modal-header"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: isMobile ? "12px 16px" : "16px 20px",
            borderBottom: darkMode ? "1px solid #444" : "1px solid #eee",
            transition: "border-bottom 0.3s ease",
          }}
        >
          <h2
            style={{
              margin: 0,
              color: darkMode ? "#a076c5" : "#8e44ad",
              fontSize: isMobile ? "1.2rem" : "1.5rem",
              transition: "color 0.3s ease",
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
              color: darkMode ? "#f8f8f8" : "inherit",
              transition: "background-color 0.2s, color 0.3s ease",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = darkMode ? "#444" : "#f0f0f0")
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
            color: darkMode ? "#f8f8f8" : "inherit",
            transition: "color 0.3s ease",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
