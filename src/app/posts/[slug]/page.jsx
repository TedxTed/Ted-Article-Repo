"use client";
import Menu from "@/components/Menu/Menu";
import styles from "./singlePage.module.css";
import Image from "next/image";
import Comments from "@/components/comments/Comments";
import PostEditorBlock from "@/components/editorBlock/editorBlock";
import { Button, Flex } from "antd";
import usePostData from "@/hook/usePostData";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import IntroCard from "@/components/introCard/IntroCard";

const SinglePage = ({ params }) => {
  const { slug } = params;
  console.log(slug);
  const { data: postDataFromServer } = usePostData({ slug });
  const session = useSession();
  console.log(session.data?.user);
  console.log(postDataFromServer?.content);
  const router = useRouter();

  const handleEdit = () => {
    console.log("Edit Post Clicked");
    if (postDataFromServer) {
      router.push(`/write/${postDataFromServer.slug}`);
    }
  };

  return (
    <div className={styles.container}>
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
          {/* <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: postDataFromServer?.desc }}
          /> */}
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
    </div>
  );
};

export default SinglePage;
