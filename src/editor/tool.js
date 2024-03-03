import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "@/utils/firebase";

const uploadImageToFirebase = (file) => {
  return new Promise((resolve, reject) => {
    const name = new Date().getTime() + file.name;
    const storageRef = ref(storage, name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve({
            success: 1,
            file: {
              url: downloadURL,
            },
          });
        });
      }
    );
  });
};

export const getEditorJsTools = () => {
  if (typeof window === "undefined") {
    return Promise.resolve({});
  }

  return Promise.all([
    import("@editorjs/embed"),
    import("@editorjs/table"),
    import("@editorjs/list"),
    import("@editorjs/paragraph"),
    import("@editorjs/warning"),
    import("@editorjs/code"),
    import("@editorjs/link"),
    import("@editorjs/image"),
    import("@editorjs/raw"),
    import("@editorjs/header"),
    import("@editorjs/quote"),
    import("@editorjs/marker"),
    import("@editorjs/checklist"),
    import("@editorjs/delimiter"),
    import("@editorjs/inline-code"),
    import("@editorjs/simple-image"),
    import("@editorjs/attaches"),
  ]).then(
    ([
      Embed,
      Table,
      List,
      Paragraph,
      Warning,
      Code,
      LinkTool,
      ImageTool,
      Raw,
      Header,
      Quote,
      Marker,
      CheckList,
      Delimiter,
      InlineCode,
      SimpleImage,
      AttachesTool,
    ]) => {
      return {
        embed: Embed.default,
        table: Table.default,
        list: List.default,
        paragraph: Paragraph.default,
        warning: Warning.default,
        code: Code.default,
        linkTool: LinkTool.default,
        image: {
          class: ImageTool.default,
          config: {
            uploader: {
              uploadByFile: uploadImageToFirebase,
            },
          },
        },
        raw: Raw.default,
        header: Header.default,
        quote: Quote.default,
        marker: Marker.default,
        checklist: CheckList.default,
        delimiter: Delimiter.default,
        inlineCode: InlineCode.default,
        simpleImage: SimpleImage.default,
        attaches: AttachesTool.default,
        // Add other tools and their configurations...
      };
    }
  );
};
