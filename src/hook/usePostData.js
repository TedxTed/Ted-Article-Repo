import { useState, useEffect } from "react";

const usePostData = ({ slug }) => {
  console.log({ aa: slug });
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async (slug) => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:3000/api/posts/${slug}`, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch post data");
        }

        const data = await res.json();
        setData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData(slug);
  }, []);

  return { data, error, loading };
};

export default usePostData;
