import prisma from "../config/prisma"

export const getChapterById = async (id) => {
  try {
    const bookChapter = await prisma.chapters.findFirstOrThrow({
      id: id.chapters,
      title: true,
      content: true,
      chap_number: true,
      include: {
        book_id: { books: { title: true } }
      }
    })
  } catch (error) {
    throw new Error(error.message);
  }
} 