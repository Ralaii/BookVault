import api from "../utilities/api";

export const fetchBanner = async () => (await api.get('/api/books/banners')).bookBanner


export const fetchTag = async () => (await api.get('/api/books/tags')).bookTag

export const fetchBook = async ({page, tags}) => (await api.get('/api/books/', { params: {page, tags}})).book;

export const fetchNewBook = async () => (await api.get('/api/books/new')).newBooks

export const fetchBookPage = async (id) => {
  const res = await api.get(`/api/books/${id}`)
  return res
}