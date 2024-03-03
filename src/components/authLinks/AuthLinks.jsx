"use client";

import styles from "./authLinks.module.css";
import Link from "next/link";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import useAuth from "@/hook/useAuth";

const AuthLinks = () => {
  const [open, setOpen] = useState(false);
  const { status } = useSession();
  const { data: auth } = useAuth();

  return (
    <>
      {status === "unauthenticated" ? (
        <Link href="/login" className={styles.link}>
          Login
        </Link>
      ) : (
        <>
          {auth === "owner" && <Link href="/write">Write</Link>}

          <span className={styles.link} onClick={signOut}>
            Logout
          </span>
        </>
      )}
      <div className={styles.burger} onClick={() => setOpen(!open)}>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>
      {open && (
        <div className={styles.responsiveMenu}>
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          {status === "noauthenticated" ? (
            <Link href="/login">Login</Link>
          ) : (
            <>
              <Link href="/write">Write</Link>
              <span className={styles.link}>Logout</span>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default AuthLinks;
