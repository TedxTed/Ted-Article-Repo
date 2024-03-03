import React from "react";
import { Form, Input, Select, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { uuid } from "uuidv4";
import PostEditorBlock from "@/components/editorBlock/PostEditorBlock";

const { TextArea } = Input;

const ArticleForm = ({
  categories,
  initialValues,
  onSubmit,
  uploadProps,
  setEditorContent,
}) => {
  console.log("initialValues.editorContent", initialValues.content);
  return (
    <Form initialValues={initialValues} onFinish={onSubmit}>
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: "Please input the title!" }]}
      >
        <Input placeholder="Title" />
      </Form.Item>

      <Form.Item label="Slug" name="slug">
        <Input defaultValue={uuid().split("-")[0]} placeholder="Basic usage" />
      </Form.Item>

      <Form.Item label="Category" name="catSlug">
        {categories && (
          <Select style={{ width: 300 }}>
            {categories.map((item) => (
              <Select.Option key={item.title} value={item.title}>
                {item.title}
              </Select.Option>
            ))}
          </Select>
        )}
      </Form.Item>

      <Form.Item label="Description" name="desc">
        <TextArea rows={4} />
      </Form.Item>

      <Form.Item label="Main Feature" name="mainFeature">
        <Select style={{ width: 300 }}>
          <Select.Option value={true}>True</Select.Option>
          <Select.Option value={false}>False</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label="Cover Upload" name="media">
        <Upload {...uploadProps}>
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
      </Form.Item>

      <Form.Item label="Content Editor" name="editorContent">
        <PostEditorBlock
          editMode={true}
          postId={initialValues.id || uuid()}
          data={initialValues.content}
          setData={setEditorContent}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ArticleForm;
