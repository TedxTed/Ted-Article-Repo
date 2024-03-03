"use client";

import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import styles from "./cardListByCategory.module.css";
import useCategoryClass from "@/hook/useCategoryClass";
import Card from "../card/Card";
import Pagination from "../pagination/Pagination";

const getData = async (page, cat) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/posts?page=${page}&cat=${
      cat || ""
    }`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  return res.json();
};

const CardListByCategory = () => {
  const { data: categories, error } = useCategoryClass();
  const [currentCat, setCurrentCat] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (categories && categories.length > 0) {
      setCurrentCat(categories[0].title);
    }
  }, [categories]);

  useEffect(() => {
    if (currentCat) {
      const fetchPosts = async () => {
        try {
          const { posts, count } = await getData(currentPage, currentCat);
          setPosts(posts);
          setCount(count);
        } catch (error) {
          console.error(error);
        }
      };

      fetchPosts();
    }
  }, [currentPage, currentCat]);

  const POST_PER_PAGE = 2;

  const onChange = (key) => {
    setCurrentPage(1);
    setCurrentCat(key);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const items = categories?.map((tab) => ({
    key: tab.title,
    label: tab.title,
    children: (
      <div className={styles.container}>
        <div className={styles.posts}>
          {posts?.map((item) => (
            <Card item={item} key={item.id} />
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalItems={count}
          itemsPerPage={POST_PER_PAGE}
          onPageChange={handlePageChange}
        />
      </div>
    ),
  }));

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Posts Here</h1>
      <Tabs
        tabPosition="left"
        defaultActiveKey={
          categories && categories.length > 0 ? categories[0].title : "1"
        }
        items={items}
        onChange={onChange}
      />
    </div>
  );
};

export default CardListByCategory;
