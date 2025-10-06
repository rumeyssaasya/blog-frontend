'use client'
import { useState } from "react";
import { useTheme } from "next-themes";
import LoginForm from "../components/Login";
import RegisterForm from "../components/Register";

export default function AuthPage() {
  const { theme } = useTheme();
  const [isLogin, setIsLogin] = useState(true);

  const containerStyle = {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  };

  const cardStyle = {
    width: "400px",
    backgroundColor: theme === "dark" ? "#18191a" : "#fff",
    color: theme === "dark" ? "#e0e0e0" : "#18191a",
    borderRadius: "16px",
    padding: "40px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        {isLogin ? (
          <LoginForm switchToRegister={() => setIsLogin(false)} />
        ) : (
          <RegisterForm switchToLogin={() => setIsLogin(true)} />
        )}
      </div>
    </div>
  );
}
