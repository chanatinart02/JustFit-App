import { getAuth, getIdToken } from "firebase/auth";

const auth = getAuth();

// When token is about to expire
const refreshIdToken = async () => {
  try {
    const idToken = await getIdToken(auth.currentUser);
    // Use the refreshed idToken
  } catch (error) {
    console.error("Error refreshing ID token:", error);
  }
};

setInterval(refreshIdToken, 1000 * 60 * 60); // every 1hrs
