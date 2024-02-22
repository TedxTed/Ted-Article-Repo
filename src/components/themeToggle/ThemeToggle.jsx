"use client";

import { ThemeContext } from "@/context/ThemeContext";
import styles from "./themeToggle.module.css";
import Image from "next/image";
import { useContext } from "react";

const ThemeToggle = () => {
  const { theme, toogle } = useContext(ThemeContext);

  console.log(theme);
  return (
    <div
      className={styles.container}
      onClick={toogle}
      style={
        theme === "dark"
          ? { backgroundColor: "white" }
          : { backgroundColor: "#0f172a" }
      }
    >
      <Image src="/moon.png" alt="" width={14} height={14} />
      <div className={styles.ball}></div>
      <Image src="/sun.png" alt="" width={14} height={14} />
    </div>
  );
};

export default ThemeToggle;
