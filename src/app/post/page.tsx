"use client";

import CardPost from "@/component/CardPost";
import { usePostService } from "@/service/post-service";

export default function Home() {
  const { datas, isLoading, total, setSkip, setLimit, setSearch } =
    usePostService();
  return (
    <CardPost
      data={datas}
      isLoading={isLoading}
      total={total}
      setSkip={setSkip}
      setLimit={setLimit}
      setSearch={setSearch}
    />
  );
}
