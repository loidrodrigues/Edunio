"use client";

import { useState, useEffect } from "react";
import { verifyToken } from "../../lib/jwt";

export interface User {
  id: string;
  email: string;
  name: string;
  isMentor?: boolean;
}

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const decoded = verifyToken(token);
        if (decoded) {
          setIsAuthenticated(true);
          setUser({
            id:
              (decoded as any).id ||
              (decoded as any).userId ||
              (decoded as any).sub ||
              "",
            email: (decoded as any).email || "",
            name: (decoded as any).name || "",
            isMentor: (decoded as any).isMentor || false,
          });
        } else {
          localStorage.removeItem("token");
          setIsAuthenticated(false);
          setUser(null);
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error("Auth check error:", error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();

    // escuta alterações no localStorage
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "token") {
        checkAuth();
      }
    };
    window.addEventListener("storage", handleStorageChange);

    // escuta eventos disparados pelo login/logout
    const handleAuthEvent = () => checkAuth();
    window.addEventListener("authStateChanged", handleAuthEvent);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("authStateChanged", handleAuthEvent);
    };
  }, []);

  const login = (token: string) => {
    localStorage.setItem("token", token);
    window.dispatchEvent(new Event("authStateChanged"));
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("authStateChanged"));
  };

  return {
    isAuthenticated,
    user,
    loading,
    login,
    logout,
  };
}
