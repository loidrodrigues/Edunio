import jwt from "jsonwebtoken";

const SECRET_KEY = (process.env.JWT_SECRET ||
  "your_secret_key_here") as jwt.Secret;

export function generateToken(payload: object, expiresIn = "1h") {
  return jwt.sign(payload, SECRET_KEY, { expiresIn } as jwt.SignOptions);
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return null;
  }
}

export function isLoggedIn() {
  if (typeof window === "undefined") return false; // Server-side
  const token = localStorage.getItem("token");
  if (!token) return false;
  const decoded = verifyToken(token);
  return decoded !== null;
}

export function getUserFromToken() {
  if (typeof window === "undefined") return null;
  const token = localStorage.getItem("token");
  if (!token) return null;
  return verifyToken(token) as any; // Assuming payload has user info
}
