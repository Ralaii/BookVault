import redis from "../config/redis.js"

export const withCache = async (key, ttl, fetchFn) => {
  try {
    const cached = await redis.get(key);
    if (cached) {
      return cached;
    }

    const data = await fetchFn();
    if (data && data.length > 0) {
      await redis.set(key, JSON.stringify(data), {ex: ttl});
    }
    return data;
 
  } catch (error) {
    throw new Error(error.message);
  }
}