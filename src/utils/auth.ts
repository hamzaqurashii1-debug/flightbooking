import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET_KEY || "987654321";
const TOKEN_EXPIRATION = "7d";
export const generateAuthToken = (user: any) => {
  // Payload can include user info like id or role
  const payload = {
    id: user.id,  // Include essential user data
    role: user.role
  };

  return jwt.sign(payload, SECRET_KEY, { expiresIn: TOKEN_EXPIRATION });
};
