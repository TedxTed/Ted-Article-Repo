"use client";
import styles from "./editorBlock.module.css";
import { useState } from "react";
import Editor from "@/editor/editor";
import EditorTextParser from "../editorTextParser/EditorTextParser";
import exampleData from "./data";

export default function EditorBlock({ editMode, slug }) {
  const [data, setData] = useState(exampleData);
  const onReady = () => {
    let editable_elements = document.querySelectorAll("[contenteditable=true]");
    editable_elements.forEach((el) => el.removeAttribute("contenteditable"));

    let icon_settings = document.querySelectorAll(".ce-toolbar__settings-btn");
    icon_settings.forEach((el) => el.remove());
  };
  return (
    <div className={styles.container}>
      <div className={styles.app_content}>
        {editMode ? (
          <Editor
            holder="description"
            data={data}
            setData={setData}
            slug={slug}
          />
        ) : (
          <EditorTextParser data={data} />
        )}
      </div>
    </div>
  );
}
