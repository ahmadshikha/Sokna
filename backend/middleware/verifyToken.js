
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  console.log("Test token");

  const authHeader = req.headers.authorization; 
  const token = authHeader && authHeader.split(' ')[1];

  console.log("Token:", token);

  if (!token) return res.status(401).json({ message: "Not Authenticated token!!" });

  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
   
    if (err){ return res.status(403).json({ message: "Token is not Valid!" });}
    req.userId = payload.id;
                            
    next();
  });
};