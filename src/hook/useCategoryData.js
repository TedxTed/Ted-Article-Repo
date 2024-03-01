// useCategoryClass.js
import { useEffect, useState } from "react";

const useCategoryData = ({ categoryClass }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async (page, cat) => {
      const res = await fetch(
        `http://localhost:3000/api/posts?page=${page}&cat=${cat || ""}`,
        {
          cache: "no-store",
        }
      );

      if (!res.ok) {
        throw new Error("Failed");
      }

      return res.json();
    };

    fetchData({ categoryClass });
  }, []);

  return { data, error };
};

export default useCategoryClass;
