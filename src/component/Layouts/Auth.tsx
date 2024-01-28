"use client";
import React, { PropsWithChildren } from "react";
import type { MenuProps } from "antd";
import {
  Avatar,
  Button,
  Dropdown,
  Layout,
  Menu,
  Space,
  Typography,
  theme,
} from "antd";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const { Header, Content, Sider } = Layout;

const items: MenuProps["items"] = [
  {
    key: 1,
    label: <Link href="/">Home</Link>,
  },
  {
    key: 2,
    label: <Link href="/post">Post</Link>,
  },
  {
    key: 3,
    label: <Link href="/comment">Comment</Link>,
  },
];

const NewLayout = ({ children }: PropsWithChildren) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const session = useSession();
  const router = useRouter();

  const customsItems: MenuProps["items"] = [
    {
      key: "0",
      label: <Typography>{session?.data?.user?.name}</Typography>,
    },
    {
      type: "divider",
    },
    {
      label: (
        <Button type="link" onClick={async () => await signOut()}>
          Logout
        </Button>
      ),
      key: "1",
    },
  ];

  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={items}
        />
      </Sider>
      <Layout style={{ marginLeft: 200 }}>
        <Header
          style={{
            backgroundColor: "white",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          {session.status === "authenticated" ? (
            <Dropdown menu={{ items: customsItems }}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <Avatar src={session?.data?.user?.image} />
                </Space>
              </a>
            </Dropdown>
          ) : (
            <Button onClick={() => router.push("/login")}>Login</Button>
          )}
        </Header>
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <div
            style={{
              padding: 24,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default NewLayout;
