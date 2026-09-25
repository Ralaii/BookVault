import api from "../utilities/api";

export const fetchBanner = async () => {
  const res = await api.get('/api/books/banners')
  return res.data.bookBanner
}

export const fetchTag = async () => {
  const res = await api.get('/api/books/tags')
  return res.data.bookTag
}

export const fetchBook = async ({page, tags}) => {
  const res = await api.get('/api/books/', { params: {page, tags}});
  return res.data.book
}

export const fetchNewBook = async () => {
  const res = await api.get('/api/books/new')
  return res.data.newBooks;
}

export const fetchBookPage = async (id) => {
  const res = await api.get(`/api/books/${id}`)
  return res
}