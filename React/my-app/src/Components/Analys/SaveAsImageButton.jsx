// SaveAsImageButton.jsx
import React from "react";
import html2canvas from "html2canvas";

export default function SaveAsImageButton({ targetRef, fileName = "graph.png" }) {
  const handleDownload = async () => {
    if (!targetRef?.current) return;

    try {
      const canvas = await html2canvas(targetRef.current);
      const link = document.createElement("a");
      link.download = fileName;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.error("שגיאה בשמירת התמונה:", err);
    }
  };

  return (
    <button
      onClick={handleDownload}
      className="p-button"
      style={{
        width: "100%",
        maxWidth: "580px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.5rem",
        padding: "0.65rem 1rem",
        fontSize: "1rem",
        fontWeight: "bold",
        color: "#ffffff",
        backgroundColor: "#00d084", // accent green
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        boxShadow: "0 0 8px #29cc8b",
        transition: "all 0.3s ease-in-out",
        marginTop: "1rem"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.03)";
        e.currentTarget.style.backgroundColor = "#29cc8b";
        e.currentTarget.style.boxShadow = "0 0 12px #29cc8b";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.backgroundColor = "#00d084";
        e.currentTarget.style.boxShadow = "0 0 8px #29cc8b";
      }}
    >
      <i className="pi pi-download" style={{ fontSize: "1.2rem" }} />
      שמור גרף כתמונה
    </button>
  );
}
