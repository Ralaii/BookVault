import redis from "../config/redis.js";

export const withCache = async (key, ttl, fetchFn) => {
  try {
    const cached = await redis.get(key);
    if (cached) return JSON.parse(cached);
  } catch (error) {
    console.error(`Error retrieving cache for key ${key}:`, error);
  }

  const data = await fetchFn();

  if (data) {
    try {
      await redis.set(key, JSON.stringify(data), "EX", ttl);
    } catch (error) {
      console.error(`Error setting cache for key ${key}:`, error);
    }
  }

  return data;
};