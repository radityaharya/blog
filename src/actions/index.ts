import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { type CollectionEntry, getCollection } from 'astro:content';

type LikeResult = {
  slug: string;
  likes: number;
};

export const server = {
  likePage: defineAction({
    input: z.object({
      slug: z.string()
    }),
    handler: async (input, context) => {
      const { DB } = context.locals.runtime.env;

      const post: CollectionEntry<'blog'> | undefined = (await getCollection('blog')).find((post => post.id === input.slug));

      if (!post) throw new Error('Post not found');

      try {
        const result = await DB.prepare(`
          INSERT INTO likes (slug, count) 
          VALUES (?, 1)
          ON CONFLICT (slug) 
          DO UPDATE SET count = count + 1
          RETURNING slug, count as likes
        `).bind(input.slug).first<LikeResult>();

        console.log('Updated likes:', result);

        return { slug: input.slug, likes: result?.likes || 0 };
      } catch (error) {
        console.error('Error updating likes:', error);
        throw new Error('Failed to update likes');
      }
    },
  })
}