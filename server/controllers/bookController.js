import { fetchBanner, fetchBook, fetchBookRankings, fetchNewRelease, fetchTags } from "../services/bookService.js"
import { withCache } from "../utilities/cache.js";

export const getBookController = async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const tags = req.query.tag;
    const book = await withCache(`books_${page}`, 60 * 60, () => fetchBook({page, tags}))
    res.status(200).json({
      success: true,
      book
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message  
    })
  }
}

export const bookBannerController = async (req, res) => {
  try {
    const bookBanner = await withCache('banners', 60 * 60, fetchBanner)
    res.status(200).json({
      success: true,
      bookBanner
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const bookTagController = async (req, res) => {
  try {
    const bookTag = await withCache('tags', 60 * 60, fetchTags);
    res.status(200).json({
      success: true,
      bookTag
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: error.message
    })
  }
}

export const bookNewReleaseController = async (req, res) => {
  try {
    const data = await withCache('newBooks', 60 * 3, fetchNewRelease);
    res.status(200).json({
      success: true,
      newBooks : data
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}