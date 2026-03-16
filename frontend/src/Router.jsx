import { useState, useEffect } from "react";
import App from "./App";
import AnalyzePage from "./AnalyzePage";
import StandupPage from "./pages/StandupPage";
import LoginPage from "./pages/LoginPage";
import AuthSuccess from "./pages/AuthSuccess";
import RepoSelectorPage from "./pages/RepoSelectorPage";

function Router() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication on mount
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const isAuthPath = currentPath.startsWith("/login") || currentPath.startsWith("/auth/success");
    const isPublicPath = currentPath.startsWith("/analyze"); // Allow /analyze for guests
    
    if (!token && !isAuthPath && !isPublicPath && currentPath !== "/") {
      // If not logged in and trying to access protected page (except /analyze), redirect to login
      window.history.pushState({}, "", "/login");
      setCurrentPath("/login");
    }
    
    if (token && currentPath === "/" && !isAuthPath) {
      // If logged in on home page, redirect to repos
      window.history.pushState({}, "", "/repos");
      setCurrentPath("/repos");
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    const handleLinkClick = (e) => {
      const target = e.target.closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      // Only handle internal links
      if (href && (href.startsWith("/") || href === "#")) {
        if (href.startsWith("/")) {
          e.preventDefault();
          
          // Clear session analysis on logout/login navigation
          if (href === "/login") {
            sessionStorage.removeItem("analysisData");
            sessionStorage.removeItem("analysisRepoUrl");
          }
          
          window.history.pushState({}, "", href);
          setCurrentPath(href);
        }
      }
    };

    window.addEventListener("popstate", handlePopState);
    document.addEventListener("click", handleLinkClick);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      document.removeEventListener("click", handleLinkClick);
    };
  }, []);

  if (isLoading) {
    return <div style={{ padding: "48px", textAlign: "center", color: "var(--text-secondary)" }}>Loading...</div>;
  }

  let Component = App;

  if (currentPath.startsWith("/login")) {
    Component = LoginPage;
  } else if (currentPath.startsWith("/auth/success")) {
    Component = AuthSuccess;
  } else if (currentPath.startsWith("/repos")) {
    Component = RepoSelectorPage;
  } else if (currentPath.startsWith("/analyze")) {
    Component = AnalyzePage;
  } else if (currentPath.startsWith("/standup")) {
    Component = StandupPage;
  }

  return <Component />;
}

export default Router;
