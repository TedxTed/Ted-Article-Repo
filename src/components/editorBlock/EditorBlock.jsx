"use client";
import styles from "./editorBlock.module.css";
import { useState, useEffect } from "react";
import Editor from "@/editor/editor";
import EditorTextParser from "../editorTextParser/EditorTextParser";

export default function PostEditorBlock({
  editMode,
  postId,
  slug,
  editorContent,
}) {
  const [data, setData] = useState(editorContent);

  useEffect(() => {
    setData(editorContent);
  }, [editorContent]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://localhost:3000/api/posts/${slug}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: postId,
          data,
        }),
      });
      if (!res.ok) {
        throw new Error("Failed");
      }
    };

    fetchData();
  }, [data, postId, slug]);

  return (
    <div className={styles.container}>
      <div className={styles.app_content}>
        {editMode ? (
          <Editor holder="description" data={data} setData={setData} />
        ) : (
          <EditorTextParser data={data} />
        )}
      </div>
    </div>
  );
}
