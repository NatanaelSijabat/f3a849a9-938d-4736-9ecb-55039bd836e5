import { ZodType, z } from 'zod'
import { PostI } from '@/types/post-type'


const PostSchema: ZodType<PostI[]> = z.array(
    z.object({
      id: z.number(),
      title: z.string(),
      body: z.string(),
      userId: z.number(),
      tags: z.array(z.string()),
      reactions: z.number(),
    })
  );

export default PostSchema