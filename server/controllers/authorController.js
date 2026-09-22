import { updateBookChapter } from "../services/authorService"

export const addChapterController = async (req, res) => {
  try {
    const { title, content, chap_number } = req.body;

    if (!title) return res.status(400).json({ message: "Title is required"});
    if (!content) return res.status(400).json({ message: "Content is required" });
    if (!chap_number) return res.status(401).json({ message: "Chapter number is required" });

    const updateBook = await updateBookChapter(req.params.id, req.body)

    res.status(201).json({
      success: true,
      message: "Updated Book Successfully!",
      updateBook
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}
/*
export const reviseChapterController = async (req, res) => {
  try {

  }
}
*/