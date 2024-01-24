"use client";

import CardComment from "@/component/CardComment";
import { useCommentService } from "@/service/comment-service";

const page = () => {
  const { comments, total, isLoading, setLimit, setSkip } = useCommentService();
  return (
    <CardComment
      data={comments}
      isLoading={isLoading}
      setLimit={setLimit}
      setSkip={setSkip}
      total={total}
    />
  );
};

export default page;
