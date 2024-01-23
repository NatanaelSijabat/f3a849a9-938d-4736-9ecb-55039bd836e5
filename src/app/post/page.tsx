"use client";

import CardPost from "@/component/Card";
import { usePostService } from "@/service/post-service";

export default function Home() {
  const { datas, isLoading, total, setSkip, setLimit, limit } =
    usePostService();
  return (
    <CardPost
      data={datas}
      isLoading={isLoading}
      total={total}
      setSkip={setSkip}
      setLimit={setLimit}
      limit={limit}
    />
  );
}
