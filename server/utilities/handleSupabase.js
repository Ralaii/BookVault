export const handleSupabase = ({ data, error, count }) => {
  if (error) throw new Error(error.message);
  return count !== undefined ? { data, count } : data;
}
