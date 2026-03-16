import { useEffect } from "react";

function AuthSuccess() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("authToken", token);
      setTimeout(() => {
        window.location.href = "/repos";
      }, 500);
    } else {
      window.location.href = "/login";
    }
  }, []);

  return (
    <div className="page-shell" style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh"
    }}>
      <div style={{
        textAlign: "center",
        color: "var(--text-primary)"
      }}>
        <h2 style={{ fontSize: 24, fontWeight: 600 }}>Authenticating...</h2>
        <p style={{ color: "var(--text-secondary)" }}>Setting up your session. Please wait.</p>
      </div>
    </div>
  );
}

export default AuthSuccess;
