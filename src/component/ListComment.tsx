import React from "react";
import {
  Avatar,
  Button,
  CollapsePanelProps,
  Form,
  Input,
  List,
  Space,
  message,
} from "antd";
import { AddCommentI, CommentI } from "@/types/commeny-type";
import { useUserService } from "@/service/users-service";
import { useSession } from "next-auth/react";
import axios from "axios";
import { AddCommentSchema } from "@/models/Comment";

interface ListCommentI {
  data: CommentI[];
  listKey: number;
  isLoading: boolean;
}

const AddCommentForm: React.FC<{
  onFinish: (values: AddCommentI) => Promise<void>;
  // userId: number;
  // postId: number;
  form: any;
}> = ({ onFinish, form }) => {
  return (
    <div>
      <Form
        name="basic"
        onFinish={onFinish}
        autoComplete="off"
        onSubmitCapture={(e) => e.preventDefault()}
        style={{ width: "100%", display: "flex" }}
        form={form}
      >
        <Form.Item<AddCommentI>
          name="body"
          rules={[
            {
              required: true,
              message: "Please add comment",
            },
          ]}
          style={{ flex: 1, marginRight: "8px" }}
        >
          <Input placeholder="Add Comment ..." />
        </Form.Item>
        {/* <Form.Item<AddCommentI> name="postId">
          <Input defaultValue={userId} value={userId} />
        </Form.Item>
        <Form.Item<AddCommentI> name="userId">
          <Input defaultValue={postId} value={postId} />
        </Form.Item> */}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const ListComment: React.FC<ListCommentI> = ({ data, listKey, isLoading }) => {
  const { users } = useUserService();

  const session: any = useSession();
  const [form] = Form.useForm();

  const handleAddComment = async (e: any) => {
    await form.validateFields().then(() => {
      if (session?.status !== "authenticated") {
        message.warning("please login to add comment");
      } else {
        const payload = {
          body: e?.body,
          postId: listKey,
          userId: session?.data?.user?.id,
        };
        const payloadSchema = AddCommentSchema.parse(payload);
        axios
          .post(`https://dummyjson.com/comments/add`, payloadSchema, {
            headers: { "Content-Type": "application/json" },
          })
          .then((res) => {
            if (res.status === 200) {
              message.success("Sukses add Comment");
            }
          })
          .finally(() => form.resetFields());
      }
    });
  };

  return (
    <div>
      <List
        loading={isLoading}
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
      <AddCommentForm
        onFinish={handleAddComment}
        // userId={session?.data?.user?.id}
        // postId={listKey}
        form={form}
      />
    </div>
  );
};

export default ListComment;
