import { Select } from "antd";
import useCategoryClass from "../../hook/useCategoryClass";

export default function CategorySelectionClient({ setData }) {
  const { data: categories, error } = useCategoryClass();

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
