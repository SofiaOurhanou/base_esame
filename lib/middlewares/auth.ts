import jwt from "jsonwebtoken";
import { UserWithoutPassword } from "../entities/user";

export async function auth(request: Request) {
  const token = request.headers.get("Authorization");
  if (!token) {
    return false
  }
  
  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    return decoded as UserWithoutPassword;
  } catch (error) {
    return false;
  }
}