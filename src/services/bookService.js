import api from "../utilities/api";

export const fetchBanner = async () => (await api.get("/api/books/banners"));

export const fetchTag = async () => (await api.get('/api/books/tags')).bookTag

export const fetchPopularBook = async () => (await api.get('/api/books/popular'));

export const fetchNewBook = async () => (await api.get('/api/books/new'))

export const fetchBookPage = async (id) => (await api.get(`/api/books/:id`)).bookPage
