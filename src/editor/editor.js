import React, { useRef, useCallback } from "react";
import axios from "axios";

// import tools for editor config
import { EDITOR_JS_TOOLS } from "./tool";

// create editor instance
import { createReactEditorJS } from "react-editor-js";

export default function Editor({ data, setData, editMode }) {
  const editorCore = useRef(null);
  const ReactEditorJS = createReactEditorJS({ readOnly: true });

  const onReady = () => {
    if (!editMode) {
      let editable_elements = document.querySelectorAll(
        "[contenteditable=true]"
      );
      editable_elements.forEach((el) => el.removeAttribute("contenteditable"));

      let icon_settings = document.querySelectorAll(".ce-toolbar");
      icon_settings.forEach((el) => el.remove());
    }
  };

  const handleInitialize = useCallback((instance) => {
    // await instance._editorJS.isReady;
    instance._editorJS.isReady
      .then(() => {
        // set reference to editor
        editorCore.current = instance;
      })
      .catch((err) => console.log("An error occured", err));
  }, []);

  const handleSave = useCallback(async () => {
    // retrieve data inserted
    const savedData = await editorCore.current.save();
    if (setData) {
      setData(savedData);
    }
  }, [setData]);

  return (
    <div className="editor-container">
      <ReactEditorJS
        onReady={onReady}
        onInitialize={handleInitialize}
        tools={EDITOR_JS_TOOLS}
        onChange={handleSave}
        defaultValue={data}
        placeholder={"Let`s write an awesome story!"}
      />
    </div>
  );
}
