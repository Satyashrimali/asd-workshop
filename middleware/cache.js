const TTL_MS = 60 * 1000;

const cache = new Map();

function cacheKey(req) {
  return `${req.method}:${req.originalUrl}`;
}

function isExpired(entry) {
  return Date.now() - entry.createdAt >= TTL_MS;
}

function invalidateProductCaches() {
  for (const key of cache.keys()) {
    if (key.startsWith("GET:/products")) {
      cache.delete(key);
    }
  }
}

function cacheMiddleware(req, res, next) {
  if (req.method !== "GET") {
    return next();
  }

  const key = cacheKey(req);
  const entry = cache.get(key);

  if (entry && !isExpired(entry)) {
    res.setHeader("X-Cache", "HIT");
    return res.status(entry.statusCode).json(entry.data);
  }

  if (entry && isExpired(entry)) {
    cache.delete(key);
  }

  res.setHeader("X-Cache", "MISS");

  const originalJson = res.json.bind(res);
  res.json = (data) => {
    if (res.statusCode >= 200 && res.statusCode < 300) {
      cache.set(key, {
        data,
        createdAt: Date.now(),
        statusCode: res.statusCode,
      });
    }
    return originalJson(data);
  };

  next();
}

function invalidateCacheMiddleware(req, res, next) {
  const originalJson = res.json.bind(res);
  const originalSend = res.send.bind(res);
  const originalEnd = res.end.bind(res);

  const invalidateOnSuccess = () => {
    if (res.statusCode >= 200 && res.statusCode < 300) {
      invalidateProductCaches();
    }
  };

  res.json = (data) => {
    invalidateOnSuccess();
    return originalJson(data);
  };

  res.send = (body) => {
    invalidateOnSuccess();
    return originalSend(body);
  };

  res.end = (...args) => {
    invalidateOnSuccess();
    return originalEnd(...args);
  };

  next();
}

module.exports = {
  cacheMiddleware,
  invalidateCacheMiddleware,
  invalidateProductCaches,
};
