import { db } from "../config/db.js"
import { tags } from "../src/lib/schema.js"

export const getTags = async () => {
  const tag = await db
    .select({
      id: tags.id,
      name: tags.name
    })
    .from(tags)

    return tag;
}