import jwt from "jsonwebtoken";
import { mdl } from "../models/user.js";
import errorHandlingClass from "./error.js";
export const isLoggedIn = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new errorHandlingClass("Please Login First",201,false))
  } else {
    console.log(process.env.JWT_SECRET);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    const user = await mdl.findById(decoded._id);
    req.user = user;
    next();
  }
};
