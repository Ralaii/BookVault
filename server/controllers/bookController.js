import { bookPageService, fetchBanner, fetchBook, fetchBookRankings, fetchNewRelease, fetchTags } from "../services/bookService.js"
import { withCache } from "../utils/cache.js";

export const getBookController = async (req, res) => {
  try {
    const data = await fetchBook();
    res.status(200).json({
      success: true,
      book: data
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
    const banner = await fetchBanner();
    res.status(200).json({
      success: true,
      banner
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
    const bookTag = await fetchTags();
    res.status(200).json({
      success: true,
      bookTag
    });
  } catch (error) {
    res.status(500).json({
      success: false,
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

export const bookPageController = async (req, res) => {
  const id = req.params.id
  try {
    const data = await bookPageService(id)
    res.status(200).json({
      success: true,
      data
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}