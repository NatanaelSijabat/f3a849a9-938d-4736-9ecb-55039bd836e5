"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button,
} from "@nextui-org/react";
import { CardPostI } from "@/types/post-type";
import { UserI } from "@/types/user-type";
import axios from "axios";
import UserSchema from "@/models/User";
import { CiHeart } from "react-icons/ci";

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
        <Card className="max-w-[340px]" key={index}>
          <CardHeader className="justify-between">
            <div className="flex gap-5">
              <Avatar
                isBordered
                radius="full"
                size="md"
                src={users.find((items) => items.id === item.userId)?.image}
              />
              <div className="flex flex-col gap-1 items-start justify-center">
                <h4 className="text-small font-semibold leading-none text-default-600">
                  {users.find((items) => items.id === item.userId)?.firstName}{" "}
                  {users.find((items) => items.id === item.userId)?.lastName}
                </h4>
                <h5 className="text-small tracking-tight text-default-400">
                  @{users.find((items) => items.id === item.userId)?.lastName}
                </h5>
              </div>
            </div>
            <Button
              className={
                isFollowed
                  ? "bg-transparent text-foreground border-default-200"
                  : ""
              }
              color="primary"
              radius="full"
              size="sm"
              variant={isFollowed ? "bordered" : "solid"}
              onPress={() => setIsFollowed(!isFollowed)}
            >
              {isFollowed ? "Unfollow" : "Follow"}
            </Button>
          </CardHeader>
          <CardBody className="px-3 py-0 text-small text-default-400">
            <p>{item.title}</p>
            <p>{item.body}</p>
            {item.tags && <p>{item.tags.map((tag) => `#${tag}`).join(" ")}</p>}
          </CardBody>
          <CardFooter className="gap-3">
            <div className="flex gap-1">
              <p className="font-semibold text-default-400 text-small">
                <CiHeart size={20} />
              </p>
              <p className="font-semibold text-default-400 text-small">
                {item.reactions}
              </p>
            </div>
          </CardFooter>
        </Card>
      ))}
    </>
  );
};

export default CardPost;
