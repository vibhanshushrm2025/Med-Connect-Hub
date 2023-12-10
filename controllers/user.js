import { mdl } from "../models/user.js";
import bcrypt from "bcrypt";
import { setCookie } from "../utils/features.js";
import errorHandlingClass from "../middlewares/error.js";
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await mdl.findOne({ email: email }); 
    if (user) {
      // using the default express provided error handler
      return next(new errorHandlingClass("user already exits", 201, false));
    }
    // else you have to register the user . bcrypt the password and send it through mongodb . and make the cookie .
    const hashedPassword = await bcrypt.hash(password, 10);
    const uss = await mdl.create({
      name,
      email,
      password: hashedPassword,
    });
    setCookie(uss, 201, "Registered Successfully", true, res); // setcookie , a the function that is repeating , so , are put inside the utils features.js
  } catch (error) {
    next(error);
  }
};
export const login = async (req, res, next) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    const user = await mdl.findOne({ email: email }).select("+password"); // finding does user exists on mongodb . And this select will
    // give you only selected fields and this plus will let you access the
    // the fields along with the one whose select is true
    console.log(user);
    if (!user)
      return next(new errorHandlingClass("user doesn't exist", 201, false));
    console.log(password, "   ", user.password, " hello");
    const tof = await bcrypt.compare(password, user.password); // if user exists ,then compare the passwords ,
    console.log(tof, "bool");
    if (tof) {
      // if user exists , then make arrangements of the cookie , encrypt the token , and set expiry date
      setCookie(user, 201, "LoggedIn successfully", true, res);
    } else {
      return next(
        new errorHandlingClass("Password didn't matched", 201, false)
      );
    }
  } catch (error) {
    next(error);
  }
};
export const getAll = async (req, res, next) => {
  try {
    const user = await mdl.find({});
    res.send(user);
  } catch (error) {
    next(error);
  }
};
export const getUserDetail =  (req, res, next) => {
  const id = req.params.id;
  res.send({ id: id });
};
export const myProfile =  (req, res, next) => {
  res.send({
    success:"true",
    user:req.user
  });
};
export const logout =  (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
    sameSite:process.env.NODE_ENV==="development"?"lax":"none",
    secure :process.env.NODE_ENV==="development"?false:true // Above two properties has to be different on deploying , so .dotenv is used 
  });
  res.send({
    success: true,
    message: "LoggedOut successfully",
  });
};
