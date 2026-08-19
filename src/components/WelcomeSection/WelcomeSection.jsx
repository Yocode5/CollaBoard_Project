export default function WelcomeSection({ userName = "[Name]" }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "flex-start" }}>
      
      <h2 style={{ color: "#FFFFFF", fontSize: "48px", fontWeight: "600", margin: 0, fontFamily: "'Inter', sans-serif" }}>
        Welcome, {userName}
      </h2>

      <button 
        style={{
          width: "249px",
          height: "56px",
          backgroundColor: "#0A2E3D",
          color: "#FFFFFF",
          border: "3px solid #1E93A6",
          borderRadius: "18px",
          fontSize: "1rem",
          fontWeight: "600",
          fontFamily: "'Inter', sans-serif",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingLeft: "24px",
          gap: "12px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
          transition: "background-color 0.2s ease, border-color 0.2s ease"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#0d3a4c";
          e.currentTarget.style.borderColor = "#22b2c7";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#0A2E3D";
          e.currentTarget.style.borderColor = "#1E93A6";
        }}
      >
        <span>Add new Task</span>
        <span style={{ fontSize: "1.5rem", fontWeight: "300", lineHeight: "1" }}>+</span>
      </button>

    </div>
  );
}