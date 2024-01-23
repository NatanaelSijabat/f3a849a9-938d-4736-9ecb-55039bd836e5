"use client";
import React, { useState } from "react";
import { CardPostI } from "@/types/post-type";
import {
  Avatar,
  Card,
  Pagination,
  PaginationProps,
  Skeleton,
  Space,
  Typography,
} from "antd";
import { CommentOutlined, HeartOutlined } from "@ant-design/icons";
import Search, { SearchProps } from "antd/es/input/Search";
import { useUserService } from "@/service/users-service";

const CardPost: React.FC<CardPostI> = ({
  data,
  isLoading,
  total,
  setSkip,
  setLimit,
  setSearch,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { Text } = Typography;
  const { users } = useUserService();

  const onShowSizeChange: PaginationProps["onShowSizeChange"] = (
    current,
    pageSize
  ) => {
    console.log(current, pageSize);
  };

  const onPageChange: PaginationProps["onChange"] = (page, pageSize) => {
    console.log(page, pageSize);
    setCurrentPage(page);
    setSkip && setSkip((page - 1) * 10);
    setLimit && setLimit(pageSize);
  };

  const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
    setSearch(value);
  };

  const IconText = ({ icon, text }: { icon: React.FC; text: number }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  return (
    <>
      {isLoading ? (
        <Skeleton loading={isLoading} active />
      ) : (
        <Search
          placeholder="input search text"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={onSearch}
        />
      )}
      {isLoading ? (
        <Skeleton loading={isLoading} avatar active />
      ) : (
        data?.map((item, index) => (
          <Card
            className="m-10"
            style={{ margin: 20 }}
            key={index}
            actions={[
              // <div>
              //   <HeartOutlined /> <span>{item.reactions}</span>
              // </div>,
              <IconText
                icon={HeartOutlined}
                text={item.reactions}
                key="list-vertical-like-o"
              />,
              <CommentOutlined />,
            ]}
          >
            <Card.Meta
              avatar={
                <Avatar
                  src={users.find((items) => items.id === item.userId)?.image}
                />
              }
              title={item.title}
              description={
                <Space direction="vertical">
                  <Text>{item.body}</Text>
                  <Text>{item.tags.map((tag) => `#${tag}`).join(" ")}</Text>
                </Space>
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

export default CardPost;
