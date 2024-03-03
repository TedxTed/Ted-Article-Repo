import dynamic from "next/dynamic";
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

export const getEditorTools = async () => {
  const Embed = dynamic(() => import("@editorjs/embed"));
  const Table = dynamic(() => import("@editorjs/table"));
  const List = dynamic(() => import("@editorjs/list"));
  const Paragraph = dynamic(() => import("@editorjs/paragraph"));
  const Warning = dynamic(() => import("@editorjs/warning"));
  const Code = dynamic(() => import("@editorjs/code"));
  const LinkTool = dynamic(() => import("@editorjs/link"));
  const Image = dynamic(() => import("@editorjs/image"));
  const Raw = dynamic(() => import("@editorjs/raw"));
  const Header = dynamic(() => import("@editorjs/header"));
  const Quote = dynamic(() => import("@editorjs/quote"));
  const Marker = dynamic(() => import("@editorjs/marker"));
  const CheckList = dynamic(() => import("@editorjs/checklist"));
  const Delimiter = dynamic(() => import("@editorjs/delimiter"));
  const InlineCode = dynamic(() => import("@editorjs/inline-code"));
  const SimpleImage = dynamic(() => import("@editorjs/simple-image"));
  const ImageTool = dynamic(() => import("@editorjs/image"));
  const AttachesTool = dynamic(() => import("@editorjs/attaches"));

  return {
    embed: Embed,
    table: Table,
    list: List,
    warning: Warning,
    code: Code,
    linkTool: LinkTool,
    image: {
      class: ImageTool,
      config: {
        uploader: {
          uploadByFile: uploadImageToFirebase,
        },
      },
    },
    raw: Raw,
    header: Header,
    quote: Quote,
    marker: Marker,
    checklist: CheckList,
    delimiter: Delimiter,
    inlineCode: InlineCode,
    simpleImage: SimpleImage,
    attaches: AttachesTool,
    readOnly: true,
  };
};
