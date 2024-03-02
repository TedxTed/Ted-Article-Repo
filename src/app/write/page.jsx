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
import {
  Select,
  Input,
  Button,
  message,
  Cascader,
  Checkbox,
  ColorPicker,
  DatePicker,
  Form,
  InputNumber,
  Radio,
  Slider,
  Switch,
  TreeSelect,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { uuid } from "uuidv4";
import useCategoryClass from "@/hook/useCategoryClass";

const WritePage = () => {
  const { status } = useSession();
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [media, setMedia] = useState("");
  const [value, setValue] = useState("");
  const [title, setTitle] = useState(null);
  const [catSlug, setCatSlug] = useState("");
  const [slug, setSlug] = useState(uuid().split("-")[0]);
  const [editorContent, setEditorContent] = useState(null);
  const [mainFeature, setMainFeature] = useState(false);
  const [textAreaInput, setTextAreaInput] = useState("");
  const { data: categories, error } = useCategoryClass();
  const { TextArea } = Input;

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

  const handleSubmit = async () => {
    console.log({
      title,
      desc: value,
      img: media,
      slug,
      catSlug: catSlug || "style",
      content: editorContent,
    });
    const res = await fetch("http://localhost:3000/api/posts", {
      method: "POST",
      body: JSON.stringify({
        title,
        desc: value,
        img: media,
        slug,
        catSlug: catSlug || "style",
        content: editorContent,
        mainFeature: mainFeature,
        desc: textAreaInput,
      }),
    });

    if (res.status === 200) {
      const data = await res.json();
      router.push(`/posts/${data.slug}`);
    }
  };

  return (
    <div className={styles.container}>
      <Form onFinish={handleSubmit}>
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please input the title!" }]}
        >
          <Input
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Item>

        <Form.Item label="Slug" name="slug">
          <Input
            placeholder="Basic usage"
            defaultValue={uuid().split("-")[0]}
            onChange={(e) => setSlug(e.target.value)}
          />
        </Form.Item>

        <Form.Item label="Category" name="category">
          {categories && (
            <Select
              defaultValue="style"
              style={{ width: 300 }}
              onChange={(value) => setCatSlug(value)}
            >
              {categories?.map((item) => (
                <Select.Option key={item.title} value={item.title}>
                  {item.title}
                </Select.Option>
              ))}
            </Select>
          )}
        </Form.Item>

        <Form.Item label="Description" name="description">
          <TextArea
            rows={4}
            onChange={(e) => setTextAreaInput(e.target.value)}
          />
        </Form.Item>

        <Form.Item label="Main Feature" name="mainFeature">
          <Select
            defaultValue={false}
            style={{ width: 300 }}
            onChange={(value) => setMainFeature(value)}
          >
            <Select.Option key={"true"} value={true}>
              True
            </Select.Option>
            <Select.Option key={"false"} value={false}>
              false
            </Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Cover Upload" name="coverUpload">
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item label="Content Editor" name="contentEditor">
          <CreateContentEditorBlock
            data={editorContent}
            setData={setEditorContent}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={!title}>
            Publish
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default WritePage;
