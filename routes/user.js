import {register,login, getAll, getUserDetail, myProfile, logout} from "../controllers/user.js"
import express from "express";
import { isLoggedIn } from "../middlewares/auth.js";
const router = express.Router();


router.post("/register", register);
router.post("/login", login);
router.get("/all",getAll)
router.get("/logout",logout)
router.get("/userId/:id",isLoggedIn,getUserDetail)
router.get("/me",isLoggedIn,myProfile)


export default router;
