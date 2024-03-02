"use client";

import React, { useState } from "react";
import { Card, Popover, Button, message, Typography } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  MailOutlined,
  CopyOutlined,
} from "@ant-design/icons";

const IntroCard = () => {
  const [visible, setVisible] = useState(false);

  const handleVisibleChange = (newVisible) => {
    setVisible(newVisible);
  };

  const email = "wodf410@gmail.com";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email).then(
      () => {
        message.success("我的信箱已複製");
      },
      (err) => {
        message.error("複製失敗");
      }
    );
  };

  const content = (
    <div>
      <p>Email: {email}</p>
      <Button onClick={copyToClipboard} icon={<CopyOutlined />} size="small">
        複製
      </Button>
    </div>
  );
  return (
    <div>
      <Card
        style={{
          width: 300,
        }}
        cover={<img alt="example" src="/ted.jpg" />}
        actions={[
          <Popover
            content={content}
            title="聯絡我"
            trigger="click"
            open={visible}
            placement="bottom"
            onOpenChange={handleVisibleChange}
          >
            <MailOutlined key="setting" />
          </Popover>,
        ]}
      >
        <Typography.Title level={3}>作者： 踢一滴</Typography.Title>
        <br />
        <span>- 後端開發者</span>
        <br />
        <span>- Rails/js 研習生</span>
        <br />
        <span>- go/rust 見習生</span>
      </Card>
    </div>
  );
};

export default IntroCard;
