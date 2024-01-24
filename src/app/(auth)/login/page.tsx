"use client";
import React from "react";
import { Button, Card, Form, Input, Spin, message } from "antd";
import { AuthI, UserI } from "@/types/user-type";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useAuthService } from "@/service/users-service";

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
  const { user, doLogin, isLoading, msg } = useAuthService();

  const onFinish = async (values: AuthI) => {
    try {
      const payload = {
        username: values.username,
        password: values.password,
      };
      // await doLogin(payload);
    } catch (error: any) {
      console.log(error, "error");
    }
  };
  const errorMessage = msg && <div key={msg}>{message.error(msg)}</div>;
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        {isLoading ? (
          <Spin />
        ) : (
          <Card
            title="Sign In"
            bordered={false}
            style={{ width: 400, boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
          >
            {errorMessage}
            <SignInForm onFinish={onFinish} />
          </Card>
        )}
      </div>
    </>
  );
};

export default SignIn;
