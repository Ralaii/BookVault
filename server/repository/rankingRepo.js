import prisma from "../config/prisma.js";

export const getBookRankings = async () => {
  const rankings = await prisma.book_ranking.findMany({
    select: {
      id: true,
      name: true,
      books: {
        select: {
          name: true,
          cover_image: true,
        }
      }
    }
  })
  return rankings;
}

export const getBanner = async () => (prisma.settings.findUnique({
  where: { key: "banner" },
  select: { value: true },
}), "Banner not found");