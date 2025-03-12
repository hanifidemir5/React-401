import JWT from "jsonwebtoken";
import Boom from "boom";
import redis from "../clients/redis.js";

export const signAccessToken = (req, res, next) => {
  return new Promise((resolve, reject) => {
    const payload = {
      ...req,
    };
    const options = {
      expiresIn: "10d",
      issuer: "ecommerce.app",
    };

    JWT.sign(payload, process.env.JWT_SECRET, options, (err, token) => {
      if (err) {
        console.log("JWT Signing Error:", err);
        reject(Boom.internal());
      }

      resolve(token);
    });
  });
};

export const verifyAccessToken = (req, res, next) => {
  const authorizationToken = req.headers["authorization"];
  if (!authorizationToken) {
    next(Boom.unauthorized());
  }
  JWT.verify(authorizationToken, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      return next(Boom.unauthorized(err.name === "JsonWebTokenError" ? "Unauthorized" : err.message));
    }
    req.payload = payload;
    next();
  });
};

export const signRefreshToken = (user_id) => {
  return new Promise((resolve, reject) => {
    const payload = {
      user_id,
    };
    const options = {
      expiresIn: "180d",
      issuer: "ecommerce.app",
    };

    JWT.sign(payload, process.env.JWT_REFRESH_SECRET, options, (err, token) => {
      if (err) {
        console.log("JWT Signing Error:", err);
        reject(Boom.internal());
      }

      redis.set(user_id, token, "EX", 180 * 24 * 60 * 60);

      resolve(token);
    });
  });
};

export const verifyRefreshToken = async (refresh_token) => {
  return new Promise(async (resolve, reject) => {
    JWT.verify(refresh_token, process.env.JWT_REFRESH_SECRET, (err, payload) => {
      if (err) {
        console.log("jwt verification error");
        return reject(Boom.internal());
      }
      const user_id = payload.user_id;

      redis.get(user_id, (redisErr, storedToken) => {
        if (redisErr) {
          console.log(redisErr);
          return reject(Boom.internal());
        }

        if (!storedToken || storedToken !== refresh_token) {
          return reject(Boom.unauthorized("Refresh token expired or invalid."));
        }

        resolve(user_id);
      });
    });
  });
};
