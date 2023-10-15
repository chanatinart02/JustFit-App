import admin from "firebase-admin";

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.PROJECT_ID,
    privateKey: process.env.PRIVATE_KEY?.replace(/\\n/g, "\n"),
    clientEmail: process.env.CLIENT_EMAIL,
  }),
});

const verifyToken = async (req, res, next) => {
  const authHeader  = req.headers["authorization"];
  
  if (!authHeader) {
    return res.status(403).json({ error: "No token provided" });
  }
  const token = authHeader.split(" ")[1]; // Extract the token from the "Bearer" string
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    throw error;
  }
};

export default verifyToken;
