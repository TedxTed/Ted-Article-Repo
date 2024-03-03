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
import styles from "./updatePage.module.css";
import { storage } from "@/utils/firebase";
import useCategoryClass from "@/hook/useCategoryClass";
import usePostData from "@/hook/usePostData";
import dynamic from "next/dynamic";
import ArticleForm from "@/components/articleForm/ArticleForm";

const UpdatePost = ({ params }) => {
  const { slug } = params;
  const { data: postDataFromServer } = usePostData({ slug });

  const { status } = useSession();
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [media, setMedia] = useState("");
  const [editorContent, setEditorContent] = useState(null);
  const { data: categories, error } = useCategoryClass();

  useEffect(() => {
    setEditorContent(postDataFromServer?.content);
    setMedia(postDataFromServer?.img);
  }, [JSON.stringify(postDataFromServer)]);

  useEffect(() => {
    if (file) {
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
      id: postDataFromServer?.id,
      title: values.title,
      slug: values.slug,
      catSlug: values.catSlug,
      desc: values.desc,
      mainFeature: values.mainFeature,
      img: media,
      content: editorContent,
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/posts/update`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      }
    );

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
        {postDataFromServer && (
          <ArticleForm
            categories={categories}
            initialValues={{
              id: postDataFromServer?.id,
              title: postDataFromServer?.title || "",
              slug: postDataFromServer?.slug || uuid().split("-")[0],
              catSlug: postDataFromServer?.catSlug || "",
              desc: postDataFromServer?.desc || "",
              mainFeature: postDataFromServer?.mainFeature || false,
              media: postDataFromServer?.img || "",
              content: postDataFromServer?.content || "",
            }}
            onSubmit={handleSubmit}
            uploadProps={uploadProps}
            setEditorContent={setEditorContent}
          />
        )}
      </div>
    </div>
  );
};

export default UpdatePost;
