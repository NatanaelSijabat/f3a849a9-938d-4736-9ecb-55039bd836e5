"use client";
import React, { useEffect, useState } from "react";

import { CardPostI } from "@/types/post-type";
import { UserI } from "@/types/user-type";
import axios from "axios";
import UserSchema from "@/models/User";
import { CiHeart } from "react-icons/ci";
import { Avatar, Card } from "antd";

const CardPost: React.FC<CardPostI> = ({ data }) => {
  const [isFollowed, setIsFollowed] = React.useState(false);

  const [users, setUser] = useState<UserI[]>([]);

  const fetchApi = async () => {
    try {
      const res = await axios.get("https://dummyjson.com/users?limit=100");
      if (res.status === 200) {
        console.log(res.data.users, "user");
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

  return (
    <>
      {data?.map((item, index) => (
        <Card className="m-10" style={{ margin: 20 }} key={index}>
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
    </>
  );
};

export default CardPost;
