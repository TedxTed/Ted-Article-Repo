"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { message } from "antd";
import { uuid } from "uuidv4";
import styles from "./writePage.module.css";
import { app } from "@/utils/firebase";
import useCategoryClass from "@/hook/useCategoryClass";
import ArticleForm from "@/components/articleForm/ArticleForm";
import useAuth from "@/hook/useAuth";

const WritePage = () => {
  const { status } = useSession();
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [media, setMedia] = useState("");
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState(uuid().split("-")[0]);
  const [catSlug, setCatSlug] = useState("");
  const [textAreaInput, setTextAreaInput] = useState("");
  const [editorContent, setEditorContent] = useState(null);
  const [mainFeature, setMainFeature] = useState(false);
  const { data: categories, error } = useCategoryClass();

  useEffect(() => {
    if (file) {
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
    }
  }, [file]);

  const uploadProps = {
    name: "file",
    beforeUpload: (file) => {
      setFile(file);
      return false;
    },
    onChange(info) {
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const handleSubmit = async (values) => {
    const postData = {
      title: values.title,
      slug: values.slug,
      catSlug: values.catSlug,
      desc: values.desc,
      mainFeature: values.mainFeature,
      img: media,
      content: editorContent,
    };

    console.log(postData);

    const res = await fetch("http://localhost:3000/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    if (res.status === 200) {
      const data = await res.json();
      router.push(`/posts/${data.slug}`);
    }
  };

  if (status === "loading") {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (status === "unauthenticated") {
    router.push("/");
  }

  return (
    <div className={styles.container}>
      <div className={styles.container}>
        <ArticleForm
          categories={categories}
          initialValues={{
            title: title,
            slug: slug,
            catSlug: catSlug,
            desc: textAreaInput,
            mainFeature: mainFeature,
            media: media,
            content: editorContent,
          }}
          onSubmit={handleSubmit}
          uploadProps={uploadProps}
          setEditorContent={setEditorContent}
        />
      </div>
    </div>
  );
};

export default WritePage;
