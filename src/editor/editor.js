import React, { useRef, useCallback, useState, useEffect } from "react";

// import tools for editor config
import { getEditorJsTools } from "./tool";

// create editor instance
import { createReactEditorJS } from "react-editor-js";
import { useMounted } from "@/hook/useMounted";

export default function Editor({ data, setData, editMode }) {
  const editorCore = useRef(null);
  const [tools, setTools] = useState(null);

  let ReactEditorJS;
  if (typeof window !== "undefined") {
    ReactEditorJS = createReactEditorJS({ readOnly: true });
  }

  useEffect(() => {
    getEditorJsTools().then((tools) => {
      console.log(tools);
      setTools(tools);
    });
  }, []);

  const onReady = () => {
    if (typeof window !== "undefined" && !editMode) {
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

  const mounted = useMounted();
  if (!mounted || !ReactEditorJS) return null;

  return (
    <div className="editor-container">
      {tools && (
        <ReactEditorJS
          onReady={onReady}
          onInitialize={handleInitialize}
          tools={tools}
          onChange={handleSave}
          defaultValue={data}
          placeholder={"Let`s write an awesome story!"}
        />
      )}
    </div>
  );
}
