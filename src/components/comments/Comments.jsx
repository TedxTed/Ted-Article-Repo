import React from "react";
import styles from "./comments.module.css";
import Link from "next/link";
import Image from "next/image";

const Comments = () => {
  const status = "authenticated";
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Comments</h1>
      {status === "authenticated" ? (
        <div className={styles.write}>
          <textarea
            placeholder="write a comment"
            className={styles.input}
          ></textarea>
          <button className={styles.button}>Send</button>
        </div>
      ) : (
        <Link href="/login">Login to write a comment </Link>
      )}
      <div className={styles.comments}>
        <div className={styles.comment}>
          <div className={styles.user}>
            <Image
              src="/p1.jpeg"
              alt=""
              width={50}
              height={50}
              className={styles.image}
            />
            <div className={styles.userInfo}>
              <span className={styles.username}>John Doe</span>
              <span className={styles.date}>10.23.2024</span>
            </div>
          </div>
          <p className={styles.desc}>
            Maecenas iaculis dui nunc, quis tempus lectus dignissim et.
            Curabitur sed vulputate erat. Integer congue luctus imperdiet.
            Maecenas aliquam mi pellentesque aliquam lobortis. Nullam
            consectetur auctor ullamcorper. Proin cursus eu purus ut fringilla.
          </p>
        </div>

        <div className={styles.comment}>
          <div className={styles.user}>
            <Image
              src="/p1.jpeg"
              alt=""
              width={50}
              height={50}
              className={styles.image}
            />
            <div className={styles.userInfo}>
              <span className={styles.username}>John Doe</span>
              <span className={styles.date}>10.23.2024</span>
            </div>
          </div>
          <p className={styles.desc}>
            Maecenas iaculis dui nunc, quis tempus lectus dignissim et.
            Curabitur sed vulputate erat. Integer congue luctus imperdiet.
            Maecenas aliquam mi pellentesque aliquam lobortis. Nullam
            consectetur auctor ullamcorper. Proin cursus eu purus ut fringilla.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Comments;
