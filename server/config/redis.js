import Redis from "ioredis";

const isUpstash = process.env.REDIS_URL.startsWith("rediss://");

const redis = new Redis(process.env.REDIS_URL, {
  ...(isUpstash && {
    tls: {
      rejectUnauthorized: false
    },
    maxRetriesPerRequest: 1,
    enableOfflineQueue: false,
    connectTimeout: 2000,
    retryStrategy: (times) => Math.min(times * 200, 5000)
  })
});

redis.on("error", (err) => {
  console.error("Redis error:", err);
})

export default redis;