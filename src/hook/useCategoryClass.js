// useCategoryClass.js
import { useEffect, useState } from "react";

const useCategoryClass = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/categories`,
          {
            cache: "no-store",
          }
        );

        if (!res.ok) {
          throw new Error("Failed");
        }

        const data = await res.json();
        setData(data);
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
  }, []);

  return { data, error };
};

export default useCategoryClass;
