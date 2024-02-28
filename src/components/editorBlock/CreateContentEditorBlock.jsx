"use client";
import styles from "./editorBlock.module.css";
import Editor from "@/editor/editor";
import EditorTextParser from "../editorTextParser/EditorTextParser";

export default function CreateContentEditorBlock({ data, setData }) {
  return (
    <div className={styles.container}>
      <div className={styles.app_content}>
        {true ? (
          <Editor holder="description" data={data} setData={setData} />
        ) : (
          <EditorTextParser data={data} />
        )}
      </div>
    </div>
  );
}
