import jwt from "jsonwebtoken";

export default (req, res, next) => {
  const token = (req.headers.authorization || "").replace(/^Bearer\s*/, "");

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_KEY);

      req.userId = decoded._id;

      return next();
    } catch (error) {
      return res.status(403).json({
        message: "Invalid token",
      });
    }
  } else {
    return res.status(403).json({
      message: "Invalid token",
    });
  }

  next();
};
