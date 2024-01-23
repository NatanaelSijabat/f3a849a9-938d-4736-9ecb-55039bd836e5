"use client";
import React, { useEffect, useState } from "react";

import { CardPostI } from "@/types/post-type";
import { UserI } from "@/types/user-type";
import axios from "axios";
import UserSchema from "@/models/User";
import { Avatar, Card, Pagination, PaginationProps, Skeleton } from "antd";
import { CommentOutlined, HeartOutlined } from "@ant-design/icons";

const CardPost: React.FC<CardPostI> = ({
  data,
  isLoading,
  total,
  setSkip,
  setLimit,
  limit,
}) => {
  const [users, setUser] = useState<UserI[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const fetchApi = async () => {
    try {
      const res = await axios.get("https://dummyjson.com/users?limit=100");
      if (res.status === 200) {
        const user = UserSchema.parse(res.data.users);
        setUser(user);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

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

  return (
    <>
      {isLoading ? (
        <Skeleton loading={isLoading} avatar active />
      ) : (
        <>
          {data?.map((item, index) => (
            <Card
              className="m-10"
              style={{ margin: 20 }}
              key={index}
              actions={[
                <div>
                  <HeartOutlined /> <span>{item.reactions}</span>
                </div>,
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
                description={item.body}
              />
            </Card>
          ))}
          <div style={{ display: "flex", justifyContent: "end" }}>
            <Pagination
              total={total}
              showSizeChanger
              onChange={onPageChange}
              current={currentPage}
              onShowSizeChange={onShowSizeChange}
            />
          </div>
        </>
      )}
    </>
  );
};

export default CardPost;
