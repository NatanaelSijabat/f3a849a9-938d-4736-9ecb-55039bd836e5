import React from "react";
import { Avatar, Button, CollapsePanelProps, Input, List, Space } from "antd";
import { CommentI } from "@/types/commeny-type";
import { useUserService } from "@/service/users-service";

interface ListCommentI {
  data: CommentI[];
  listKey: number;
}

const ListComment: React.FC<ListCommentI> = ({ data, listKey }) => {
  const { users } = useUserService();

  return (
    <div>
      <List
        style={{
          width: "100%",
          margin: "10px 10px 20px 40px",
        }}
        itemLayout="horizontal"
        dataSource={data}
        key={listKey}
        renderItem={(item, index) => (
          <List.Item key={index}>
            <List.Item.Meta
              avatar={
                <Avatar
                  src={users.find((items) => items.id === item.user?.id)?.image}
                />
              }
              title={item.user?.username}
              description={item.body}
            />
          </List.Item>
        )}
      />
      <Space.Compact
        style={{
          width: "100%",
        }}
      >
        <Input placeholder="Add Comment ..." />
        <Button type="primary">Submit</Button>
      </Space.Compact>
    </div>
  );
};

export default ListComment;
