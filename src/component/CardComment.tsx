"use client";
import React, { useState } from "react";
import {
  Avatar,
  Card,
  Pagination,
  PaginationProps,
  Skeleton,
  Space,
  Typography,
} from "antd";
import { useUserService } from "@/service/users-service";
import { CardCommentI } from "@/types/commeny-type";

const CardComment: React.FC<CardCommentI> = ({
  data,
  isLoading,
  total,
  setSkip,
  setLimit,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  // const { Text } = Typography;
  const { users } = useUserService();
  // const { datas } = usePostService();

  const onShowSizeChange: PaginationProps["onShowSizeChange"] = (
    current,
    pageSize
  ) => {
    console.log(current, pageSize);
  };

  const onPageChange: PaginationProps["onChange"] = (page, pageSize) => {
    setCurrentPage(page);
    setSkip && setSkip((page - 1) * 10);
    setLimit && setLimit(pageSize);
  };

  return (
    <>
      {isLoading ? (
        <Skeleton loading={isLoading} avatar active />
      ) : (
        data?.map((item, index) => (
          <Card className="m-10" style={{ margin: 20 }} key={index}>
            <Card.Meta
              avatar={
                <Avatar
                  src={users.find((items) => items.id === item.user?.id)?.image}
                />
              }
              title={item.body}
              description={
                <Space direction="vertical">{/* <Text>{}</Text> */}</Space>
              }
            />
          </Card>
        ))
      )}
      {!isLoading && (
        <div style={{ display: "flex", justifyContent: "end" }}>
          <Pagination
            total={total}
            showSizeChanger
            onChange={onPageChange}
            current={currentPage}
            onShowSizeChange={onShowSizeChange}
          />
        </div>
      )}
    </>
  );
};

export default CardComment;
