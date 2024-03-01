import React from "react";
import { Pagination as AntPagination } from "antd";
import styles from "./pagination.module.css";

const Pagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  return (
    <div className={styles.container}>
      <AntPagination
        current={currentPage}
        onChange={onPageChange}
        total={totalItems}
        pageSize={itemsPerPage}
        showSizeChanger={false}
      />
    </div>
  );
};

export default Pagination;
