"use client";

import React from "react";
import styles from "./singlePage.module.css";
import Image from "next/image";
import Comments from "@/components/comments/Comments";
import PostEditorBlock from "@/components/editorBlock/PostEditorBlock";
import { Button, Spin } from "antd"; // Import Spin from antd
import { LoadingOutlined } from "@ant-design/icons"; // Import LoadingOutlined for custom spinner
import usePostData from "@/hook/usePostData";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import IntroCard from "@/components/introCard/IntroCard";

const SinglePage = ({ params }) => {
  const { slug } = params;
  const { data: postDataFromServer, isLoading } = usePostData({ slug }); // Assuming usePostData has an isLoading state
  const session = useSession();
  const router = useRouter();

  const handleEdit = () => {
    if (postDataFromServer) {
      router.push(`/write/${postDataFromServer.slug}`);
    }
  };

  const spinner = (
    <Spin
      indicator={
        <LoadingOutlined
          style={{
            fontSize: 24,
          }}
          spin
        />
      }
    />
  );

  return (
    <div className={styles.container}>
      {isLoading ? (
        <div className={styles.spinner}>{spinner}</div>
      ) : (
        <>
          <div className={styles.infoContainer}>
            <div className={styles.textContainer}>
              <h1 className={styles.title}>{postDataFromServer?.title}</h1>
              <div className={styles.user}>
                {postDataFromServer?.user?.image && (
                  <div className={styles.userImageContainer}>
                    <Image
                      src={postDataFromServer.user.image}
                      alt=""
                      fill
                      className={styles.avatar}
                    />
                  </div>
                )}
                <div className={styles.userTextContainer}>
                  <span className={styles.username}>
                    {postDataFromServer?.user.name}
                  </span>
                  <span className={styles.date}>01.01.2024</span>
                </div>
              </div>
              {session.data?.user.email === postDataFromServer?.user.email && (
                <div className={styles.updateButton}>
                  <Button type="primary" onClick={handleEdit}>
                    Edit Post
                  </Button>
                </div>
              )}
            </div>
            {postDataFromServer?.img && (
              <div className={styles.imageContainer}>
                <Image
                  src={postDataFromServer.img}
                  alt=""
                  fill
                  className={styles.image}
                />
              </div>
            )}
          </div>
          <div className={styles.content}>
            <div className={styles.post}>
              {postDataFromServer?.content && (
                <PostEditorBlock
                  editMode={false}
                  className={styles.description}
                  data={postDataFromServer.content}
                />
              )}

              <div className={styles.comment}>
                <Comments postSlug={slug} />
              </div>
            </div>
            <div className={styles.intro}>
              <IntroCard />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SinglePage;
