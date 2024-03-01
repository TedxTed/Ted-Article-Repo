import { Select } from "antd";
import useCategoryData from "./useCategoryData";

export default function CategorySelectionClient({ setData }) {
  const { data: categories, error } = useCategoryData();

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!categories) {
    return <div>Loading...</div>;
  }

  return (
    <Select defaultValue="style" style={{ width: 300 }}>
      {categories.map((item) => (
        <Select.Option key={item.title} value={item.title}>
          {item.title}
        </Select.Option>
      ))}
    </Select>
  );
}
