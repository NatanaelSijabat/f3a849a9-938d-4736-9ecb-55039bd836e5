"use client";

import CardPost from "@/component/Card";
import PostSchema from "@/models/Post";
import { PostI } from "@/types/post-type";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [datas, setDatas] = useState<PostI[]>([]);

  const fetchApi = async () => {
    try {
      const res = await axios.get("https://dummyjson.com/posts");
      if (res.status === 200) {
        const post = PostSchema.parse(res.data.posts);
        setDatas(post);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);
  return <CardPost data={datas} />;
}
