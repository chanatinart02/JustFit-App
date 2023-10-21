import admin from "../config/firebase-config.js";

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(403).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1]; // Extract the token from the "Bearer" string
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);

    if (decodedToken) {
      req.user = decodedToken;
      return next();
    }
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(403).json({ error: "Invalid token" });
  }
};

export default verifyToken;
