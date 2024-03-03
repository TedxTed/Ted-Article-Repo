"use client";
import styles from "./editorBlock.module.css";
import { useState, useEffect } from "react";
import Editor from "@/editor/editor";
import { useMounted } from "@/hook/useMounted";

export default function PostEditorBlock({ editMode, data, setData }) {
  const [initData, setInitData] = useState(data);

  const mounted = useMounted();
  if (!mounted) return null;

  return (
    <div className={styles.container}>
      <div className={styles.app_content}>
        <Editor
          holder="description"
          editMode={editMode}
          data={initData}
          setData={setData}
        />
      </div>
    </div>
  );
}
