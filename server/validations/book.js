import { z } from 'zod';

export const bookListQuerySchema = z.object({
  page: z.coerce.number().int("Page must be an a whole number").min(0, "Page must be 0 or higher").default(0),
  tags: z
    .union([z.string().min(1)])
    .optional(),
});