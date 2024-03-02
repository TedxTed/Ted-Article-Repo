import React from "react";
import styles from "./featured.module.css";
import Image from "next/image";

const getData = async (page, cat) => {
  const res = await fetch(`http://localhost:3000/api/posts/main`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  return res.json();
};

const Featured = async () => {
  const posts = await getData();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <b>Hey, PIKA RAILS here!</b> Uncover the stories behind my code.
      </h1>
      <div className={styles.post}>
        {posts?.map((post) => (
          <>
            {post.img && (
              <div className={styles.imgContainer}>
                <Image src={post.img} alt="" fill className={styles.image} />
              </div>
            )}
            <div className={styles.textContainer}>
              <h1 className={styles.postTitle}>{post.title}</h1>
              <p className={styles.postDesc}>{post.desc}</p>
              <a href={`posts/${post.slug}`}>
                <button className={styles.button}>Read More</button>
              </a>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default Featured;
