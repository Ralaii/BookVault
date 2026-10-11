export const findOrThrow = (data, message = "Not found") => {
  if (!data) throw new AppError(message, 404);
  return data;
}