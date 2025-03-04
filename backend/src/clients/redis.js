// src/clients/redis.js
import Redis from "ioredis";

const redis = new Redis({
  host: "localhost", // adjust according to your configuration
  port: 6379, // adjust if using a different port
});

export default redis;
