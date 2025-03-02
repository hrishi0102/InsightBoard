import React, { useState, useEffect } from "react";
import Modal from "./Modal";

const PromptInputModal = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
  defaultPrompt,
}) => {
  const [customPrompt, setCustomPrompt] = useState("");
  const [useDefaultPrompt, setUseDefaultPrompt] = useState(true);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setCustomPrompt("");
      setUseDefaultPrompt(true);
    }
  }, [isOpen]);

  const handleSubmit = () => {
    onSubmit(useDefaultPrompt ? defaultPrompt : customPrompt);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="AI Analysis Options">
      <div className="prompt-modal-content">
        <p className="text-gray-700 mb-4">
          How would you like the AI to analyze your whiteboard?
        </p>

        <div className="option-container mb-4">
          <label className="flex items-start mb-2">
            <input
              type="radio"
              checked={useDefaultPrompt}
              onChange={() => setUseDefaultPrompt(true)}
              className="mt-1 mr-2"
            />
            <div>
              <span className="font-medium">Use default analysis</span>
              <p className="text-sm text-gray-600 mt-1">
                Identifies drawn elements, text, diagrams, solves equations, and
                provides detailed explanations.
              </p>
            </div>
          </label>

          <label className="flex items-start">
            <input
              type="radio"
              checked={!useDefaultPrompt}
              onChange={() => setUseDefaultPrompt(false)}
              className="mt-1 mr-2"
            />
            <div>
              <span className="font-medium">Ask a specific question</span>
              <p className="text-sm text-gray-600 mt-1">
                Customize how the AI analyzes your whiteboard content.
              </p>
            </div>
          </label>
        </div>

        {!useDefaultPrompt && (
          <div className="mb-4">
            <textarea
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="Enter your specific question or instructions..."
              className="w-full p-2 border border-gray-300 rounded min-h-24 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              disabled={useDefaultPrompt || isLoading}
            />
          </div>
        )}

        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100 transition-colors"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-purple-600 rounded text-white hover:bg-purple-700 transition-colors flex items-center gap-2"
            disabled={isLoading || (!useDefaultPrompt && !customPrompt.trim())}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </>
            ) : (
              <>Analyze</>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default PromptInputModal;
