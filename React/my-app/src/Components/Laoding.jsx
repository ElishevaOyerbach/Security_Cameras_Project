import React, { useEffect, useState } from "react";

export default function VideoProcessingOverlay() {
  const [showApology, setShowApology] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowApology(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={styles.overlay}>
      <style>{keyframes}</style>
      <div style={styles.graphLoader}>
        {[0, 0.2, 0.4, 0.6, 0.8].map((delay, idx) => (
          <div
            key={idx}
            style={{
              ...styles.bar,
              animationDelay: `${delay}s`,
            }}
          />
        ))}
      </div>
      <p style={styles.loaderText}>מנתח את הסרטון... אנא המתן</p>
      {showApology && (
        <p style={styles.apologyText}>⚠️ אנו עושים בשבילכם את הטוב ביותר, ולכן ניתוח הנתונים אורך זמן , תודה על הסבלנות....</p>
      )}
    </div>
  );
}

const styles = {
overlay: {
  position: "fixed",
  inset: 0,
  background: "rgba(200, 200, 200, 0.01)", // חדש
  backdropFilter: "blur(4px)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
},

  graphLoader: {
    display: "flex",
    alignItems: "flex-end",
    gap: "6px",
    height: "80px",
  },
  bar: {
    width: "10px",
    borderRadius: "5px",
    height: "20px",
    animation: "pulseHeight 1.4s infinite ease-in-out, pulseColor 3s infinite ease-in-out",
  },
    loaderText: {
    marginTop: "1.5rem",
    color: "#ffffff", // לבן
    fontSize: "1.2rem",
    animation: "blink 2s infinite",
  },
  apologyText: {
    marginTop: "1rem",
    color: "#ffffff", // לבן במקום צהוב
    fontSize: "1rem",
    textAlign: "center",
  },
};

const keyframes = `
@keyframes pulseHeight {
  0%, 100% {
    height: 20px;
  }
  50% {
    height: 70px;
  }
}

@keyframes pulseColor {
  0% {
    background: var(--accent-green);
  }
  33% {
    background: var(--line-green);
  }
  66% {
    background: #00d084;
  }
  100% {
    background: var(--accent-green);
  }
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
`;
