"use client";
import React from "react";
import { Button, Card, Form, Input, message } from "antd";
import { AuthI } from "@/types/user-type";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const SignInForm: React.FC<{
  onFinish: (values: AuthI) => Promise<void>;
}> = ({ onFinish }) => {
  return (
    <Form
      name="basic"
      onFinish={onFinish}
      autoComplete="off"
      layout="vertical"
      onSubmitCapture={(e) => e.preventDefault()}
      initialValues={{ remember: true }}
    >
      <Form.Item<AuthI>
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
          name="username"
        />
      </Form.Item>

      <Form.Item<AuthI>
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
          name="password"
        />
      </Form.Item>

      <Form.Item className="flex justify-end">
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

const SignIn: React.FC = () => {
  const { push } = useRouter();
  const onFinish = async (values: AuthI) => {
    try {
      const res = await signIn("credentials", {
        username: values.username,
        password: values.password,
        redirect: false,
        // callbackUrl: "/post",
      });
      if (res?.ok === false) {
        message.error(res.error);
      } else {
        push("/post");
      }
      console.log(res, "res");
    } catch (error: any) {
      console.log(error, "error");
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <Card
          title="Sign In"
          bordered={false}
          style={{ width: 400, boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
        >
          <SignInForm onFinish={onFinish} />
        </Card>
      </div>
    </>
  );
};

export default SignIn;
