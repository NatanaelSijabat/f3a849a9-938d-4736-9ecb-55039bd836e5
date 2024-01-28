import { AddCommentI, CommentI } from "@/types/commeny-type";
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

const AddCommentSchema: ZodType<AddCommentI> = z.object({
    body: z.string(),
    postId: z.number(),
    userId: z.number(),
})

export { CommentSchema, AddCommentSchema }