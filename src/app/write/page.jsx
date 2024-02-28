"use client";

import Image from "next/image";
import styles from "./writePage.module.css";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.bubble.css";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "@/utils/firebase";
import ReactQuill from "react-quill";
import CreateContentEditorBlock from "@/components/editorBlock/CreateContentEditorBlock";
import { Select, Input, Button, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const WritePage = () => {
  const { status } = useSession();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [media, setMedia] = useState("");
  const [value, setValue] = useState("");
  const [title, setTitle] = useState(null);
  const [catSlug, setCatSlug] = useState("");
  const [editorContent, setEditorContent] = useState(null);

  const uploadProps = {
    name: "file",
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    beforeUpload: (file) => {
      // Handle file upload using Firebase Storage
      const storage = getStorage(app);
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          message.error(`${file.name} file upload failed.`);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setMedia(downloadURL);
            message.success(`${file.name} file uploaded successfully`);
          });
        }
      );
      // Prevent the default upload behavior
      return false;
    },
  };

  useEffect(() => {
    console.log(app);
    const storage = getStorage(app);
    const upload = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, name);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setMedia(downloadURL);
          });
        }
      );
    };

    file && upload();
  }, [file]);

  if (status === "loading") {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (status === "unauthenticated") {
    router.push("/");
  }

  const slugify = (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const handleSubmit = async () => {
    const res = await fetch("http://localhost:3000/api/posts", {
      method: "POST",
      body: JSON.stringify({
        title,
        desc: value,
        img: media,
        slug: slugify(title),
        catSlug: catSlug || "style",
        content: editorContent,
      }),
    });

    if (res.status === 200) {
      const data = await res.json();
      router.push(`/posts/${data.slug}`);
    }
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Title"
        className={styles.input}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Select
        defaultValue="style"
        onChange={(e) => setCatSlug(e.target.value)}
        style={{ width: 300 }} // Adjust the width as needed
      >
        <Option value="style">style</Option>
        <Option value="fashion">fashion</Option>
        <Option value="food">food</Option>
        <Option value="culture">culture</Option>
        <Option value="travel">travel</Option>
        <Option value="coding">coding</Option>
      </Select>
      <div className={styles.upload}>
        <p>封面上傳 : </p>
        <Upload {...uploadProps}>
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
      </div>

      <div className={styles.editor}>
        <div className={styles.textArea}>
          <CreateContentEditorBlock
            data={editorContent}
            setData={setEditorContent}
          />
        </div>
      </div>
      <button
        disabled={!title} // The button is disabled if the title is empty or undefined
        className={`${styles.publish} ${styles.button}`}
        onClick={handleSubmit}
      >
        Publish
      </button>
    </div>
  );
};

export default WritePage;
