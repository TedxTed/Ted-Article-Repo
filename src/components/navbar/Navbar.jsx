import React from "react";
import styles from "./navbar.module.css";
import Link from "next/link";
import AuthLinks from "../authLinks/AuthLinks";
import ThemeToggle from "../themeToggle/ThemeToggle";
import { ThunderboltFilled } from "@ant-design/icons";

const Navbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.social}>
        <ThunderboltFilled
          style={{ fontSize: "32px", color: "rgb(255, 234, 0)" }}
        />
      </div>

      <Link href="/" className={styles.logo}>
        <div className={`${styles.logo} ${styles.word}`}>PIKA RAILS</div>
      </Link>
      <div className={styles.links}>
        <ThemeToggle />
        <Link href="/" className={styles.link}>
          Homepage
        </Link>
        <Link href="/about" className={styles.link}>
          About
        </Link>
        <AuthLinks />
      </div>
    </div>
  );
};

export default Navbar;
