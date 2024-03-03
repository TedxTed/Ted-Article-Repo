"use client";
import styles from "./editorBlock.module.css";
import { useState, useEffect } from "react";
import Editor from "@/editor/editor";
import EditorTextParser from "../editorTextParser/EditorTextParser";

export default function PostEditorBlock({ editMode, data, setData }) {
  const [initData, setInitData] = useState(data);
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
