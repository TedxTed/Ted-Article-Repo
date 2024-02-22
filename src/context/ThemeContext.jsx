"use client";

import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

const getFormLocalStorage = () => {
  if (typeof window !== "undefined") {
    const value = localStorage.getItem("theme");

    return value || "light";
  }
};

export const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return getFormLocalStorage();
  });

  const toogle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toogle }}>
      {children}
    </ThemeContext.Provider>
  );
};
