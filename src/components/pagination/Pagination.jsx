import React from "react";
import styles from "./pagination.module.css";

const Pagination = () => {
  return (
    <div className={styles.container}>
      <button className={styles.button} disabled={false}>
        Previous
      </button>
      <button disabled={false} className={styles.button}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
