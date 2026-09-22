import api from "../utilities/api";

export const fetchBanner = async () => {
  const res = await api.get('/api/books/banners')
  return res.data.bookBanner
}

export const fetchTag = async () => {
  const res = await api.get('/api/books/tags')
  return res.data.bookTag
}