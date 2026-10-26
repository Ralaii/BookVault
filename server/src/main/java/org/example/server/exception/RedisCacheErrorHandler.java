package org.example.server.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.Cache;
import org.springframework.cache.interceptor.CacheErrorHandler;
import org.springframework.dao.QueryTimeoutException;
import org.springframework.data.redis.RedisConnectionFailureException;

@Slf4j
public class RedisCacheErrorHandler implements CacheErrorHandler {
    private void handle(String operation, RuntimeException e, Cache cache, Object key) {
        if (isConnectionProblem(e)) {
            log.warn("Redis unavailable, cache {} skipped [{}::{}]: {}", operation, cache.getName(), key, e.getMessage());
        } else {
            log.error("Cache {} failed [{}::{}]: {}", operation, cache.getName(), key, e.getMessage());
        }
    }

    private boolean isConnectionProblem(Throwable e) {
        for (Throwable t = e; t != null; t =t.getCause()) {
            if (t instanceof RedisConnectionFailureException || t instanceof QueryTimeoutException) {
                return true;
            }
        }
        return false;
    }

    @Override
    public void handleCacheGetError(RuntimeException e, Cache cache, Object key) {
        handle("GET", e, cache, key);
    }

    @Override
    public void handleCachePutError(RuntimeException e, Cache cache, Object key, Object value) {
        handle("PUT", e, cache, key);
    }

    @Override
    public void handleCacheEvictError(RuntimeException e, Cache cache, Object key) {
        handle("EVICT", e, cache, key);
    }

    @Override
    public void handleCacheClearError(RuntimeException e, Cache cache) {
        handle("CLEAR", e, cache, "*");
    }
}