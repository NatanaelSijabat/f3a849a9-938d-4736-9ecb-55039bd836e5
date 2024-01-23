import { CommentI } from "@/types/commeny-type";
import { ZodType, z } from "zod";

const CommentSchema: ZodType<CommentI[]> = z.array(z.object({
    id: z.number(),
    body: z.string(),
    postId: z.number(),
    user: z.object({
        id: z.number(),
        username: z.string()
    })
}))

export default CommentSchema