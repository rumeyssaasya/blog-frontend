"use client"
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

export default function AuthPage() {
  const { theme } = useTheme();

  const containerStyle = {
    display: "flex",
    height: "100vh",
    width: "100%",
    background: theme === "dark" 
      ? "linear-gradient(135deg, #5d0ec0, #7008e7)" 
      : "linear-gradient(135deg, #8e51ff, #f9f9f9)",
    transition: "background 0.3s ease",
    padding: "40px",
    boxSizing: "border-box"
  };

  const boxStyle = {
    flex: 1,
    backgroundColor: theme === "dark" ? "#18191a" : "#fff",
    color: theme === "dark" ? "#e0e0e0" : "#18191a",
    borderRadius: "16px",
    margin: "0 20px",
    padding: "40px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    transition: "all 0.3s ease"
  };

  const inputStyle = {
    marginBottom: "15px",
    padding: "12px 16px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
    outline: "none"
  };

  const buttonStyle = {
    backgroundColor: "#7008e7",
    color: "#fff",
    border: "none",
    padding: "12px 16px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "background 0.3s ease"
  };

  return (
    <div style={containerStyle}>
      {/* Register */}
      <motion.div
        style={boxStyle}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 style={{ fontSize: "24px", marginBottom: "20px", color: "#8e51ff" }}>
          Register
        </h2>
        <input type="text" placeholder="Name" style={inputStyle} />
        <input type="email" placeholder="Email" style={inputStyle} />
        <input type="password" placeholder="Password" style={inputStyle} />
        <button style={buttonStyle}>Sign Up</button>
      </motion.div>

      {/* Login */}
      <motion.div
        style={boxStyle}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 style={{ fontSize: "24px", marginBottom: "20px", color: "#5d0ec0" }}>
          Login
        </h2>
        <input type="email" placeholder="Email" style={inputStyle} />
        <input type="password" placeholder="Password" style={inputStyle} />
        <button style={{ ...buttonStyle, backgroundColor: "#5d0ec0" }}>
          Sign In
        </button>
      </motion.div>
    </div>
  );
}
