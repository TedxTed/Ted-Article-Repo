import React from "react";
import styles from "./footer.module.css";
import Link from "next/link";
import { ThunderboltFilled } from "@ant-design/icons";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.logo}>
          <ThunderboltFilled
            style={{ fontSize: "32px", color: "rgb(255, 234, 0)" }}
          />
          <h1 className={styles.logoText}>PIKA RAILS</h1>
        </div>
        <p className={styles.desc}>Uncover the stories behind my code.</p>
      </div>
      <div>© 2024 Copyright: 踢一滴</div>
      <div className={styles.links}>
        <div className={styles.list}>
          <span className={styles.listTitle}>Links</span>
          <Link href="/">Homepage</Link>
          <Link href="/">Blog</Link>
          <Link href="/about">About</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
