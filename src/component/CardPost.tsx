"use client";
import React, { useEffect, useState } from "react";
import { CardPostI } from "@/types/post-type";
import {
  Avatar,
  Card,
  Collapse,
  Pagination,
  PaginationProps,
  Skeleton,
  Space,
  Typography,
} from "antd";
import { CommentOutlined, HeartOutlined } from "@ant-design/icons";
import Search, { SearchProps } from "antd/es/input/Search";
import { useUserService } from "@/service/users-service";
import ListComment from "./ListComment";
import {
  useAllCommentService,
  useCommentByPostIdService,
} from "@/service/comment-service";

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
  const {
    comments,
    getCommentByPostId,
    isLoading: loadingComment,
  } = useCommentByPostIdService();
  const { comments: commentAll } = useAllCommentService();
  const [visibleCommentId, setVisibleCommentId] = useState<number | null>(null);

  const { Panel } = Collapse;

  console.log(loadingComment, "load");

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

  const [commentCounts, setCommentCounts] = useState<{
    [postId: number]: number;
  }>({});

  const fetchComments = () => {
    const counts: { [postId: number]: number } = {};
    const postIdArray: number[] = [];

    commentAll.forEach((comment) => {
      const postId = comment.postId;
      counts[postId] = (counts[postId] || 0) + 1;

      postIdArray.push(postId);
    });

    //todo perbaiki length
    for (let i = 1; i <= 150; i++) {
      if (!postIdArray.includes(i)) {
        counts[i] = counts[i] || 0;
      }
    }

    setCommentCounts(counts);
  };

  useEffect(() => {
    fetchComments();
  }, [commentAll]);

  const IconText = ({
    icon,
    count,
    onClick,
    postId,
  }: {
    icon: React.FC;
    count: React.ReactNode;
    onClick: (value: number) => void;
    postId: number;
  }) => (
    <Space onClick={() => onClick(postId)}>
      {React.createElement(icon)}
      {count}
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
        <Collapse
          accordion
          style={{
            margin: "10px",
          }}
        >
          {data?.map((item, index) => (
            <Panel
              showArrow={false}
              key={index}
              header={
                <Card
                  style={{ margin: 20 }}
                  actions={[
                    <IconText
                      icon={HeartOutlined}
                      count={item.reactions}
                      onClick={() => console.log("like")}
                      postId={item.id}
                    />,
                    <IconText
                      icon={CommentOutlined}
                      onClick={() => {
                        setVisibleCommentId(
                          visibleCommentId === item.id ? null : item.id
                        );
                        getCommentByPostId(item.id);
                      }}
                      postId={item.id}
                      count={commentCounts[item.id]}
                    />,
                  ]}
                >
                  <Card.Meta
                    avatar={
                      <Avatar
                        src={
                          users.find((items) => items.id === item.userId)?.image
                        }
                      />
                    }
                    title={item.title}
                    description={
                      <Space direction="vertical">
                        <Text>{item.body}</Text>
                        <Text>
                          {item.tags.map((tag) => `#${tag}`).join(" ")}
                        </Text>
                      </Space>
                    }
                  />
                </Card>
              }
            >
              {visibleCommentId === item.id && (
                <ListComment
                  listKey={item.id}
                  data={comments}
                  isLoading={loadingComment}
                />
              )}
            </Panel>
          ))}
        </Collapse>
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
