const { ratelimit, isRateLimitConfigured } = require("../config/upstash.js");

const rateLimiter = async (req, res, next) => {
  // If Upstash is not configured, fail-open and continue
  if (!isRateLimitConfigured || !ratelimit) {
    return next();
  }

  try {
    const xff = req.headers["x-forwarded-for"]; 
    const clientIp = Array.isArray(xff)
      ? xff[0]
      : (xff?.split(",")[0]?.trim() || req.ip || "unknown");

    const { success } = await ratelimit.limit(`rate-limit:${clientIp}`);
    if (!success) {
      return res.status(429).json({
        message: "Too many requests, please try again later",
      });
    }
    next();
  } catch (err) {
    console.log("Rate limit error", err);
    // Fail-open to avoid bringing down the API if Upstash errors
    next();
  }
};

module.exports = rateLimiter;