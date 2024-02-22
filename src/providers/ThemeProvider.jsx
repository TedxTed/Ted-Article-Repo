"use client";

import { ThemeContext } from "@/context/ThemeContext";
import React, { useContext, useState, useEffect } from "react";

const ThemeProvider = ({ children }) => {
  const { theme } = useContext(ThemeContext);
  const [mouted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (mouted) {
    return <div className={theme}>{children}</div>;
  }
};

export default ThemeProvider;
