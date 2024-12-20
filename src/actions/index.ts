import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';

export const server = {
  likePage: defineAction({
    input: z.object({
      slug: z.string()
    }),
    handler: async (input, context) => {
      const { BLOG_KV } = context.locals.runtime.env;

      try {
        let likes = await BLOG_KV.get(input.slug);
        likes = parseInt(likes) || 0;

        likes++;
        await BLOG_KV.put(input.slug, likes.toString());

        return { slug: input.slug, likes: likes };
      } catch (error) {
        console.error('Error updating likes:', error);
        throw new Error('Failed to update likes');
      }
    },
  })
}