"use client";

import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("ace-theme");
    if (saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      setDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("ace-theme", next ? "dark" : "light");
  }

  return (
    <button
      onClick={toggle}
      className="flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-300"
      style={{ background: "rgba(91,92,255,0.08)", border: "1px solid rgba(91,92,255,0.1)" }}
      title={dark ? "Light Mode" : "Dark Mode"}
    >
      {dark ? <Sun className="h-4 w-4" style={{ color: "var(--primary)" }} /> : <Moon className="h-4 w-4" style={{ color: "var(--primary)" }} />}
    </button>
  );
}