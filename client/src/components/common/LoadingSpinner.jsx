import React from "react";

const LoadingSpinner = ({ size = "medium" }) => {
  const spinnerSize = size === "small" ? "24px" : "48px";

  const spinnerStyle = {
    width: spinnerSize,
    height: spinnerSize,
    border: "4px solid rgba(0, 0, 0, 0.1)",
    borderTopColor: "#3498db",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
      <div style={spinnerStyle} />
    </div>
  );
};

export default LoadingSpinner;
