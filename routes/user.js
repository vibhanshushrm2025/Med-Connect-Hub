import {register,login, getAll, getUserDetail, myProfile, logout,applyDoctorController, getAllNotificationController, deleteAllNotificationController, getAllDocotrsController} from "../controllers/user.js"
import express from "express";
import { isLoggedIn } from "../middlewares/auth.js";
const router = express.Router();


router.post("/register", register);
router.post("/login", login);
router.get("/all",getAll)
router.get("/logout",logout)
router.get("/userId/:id",isLoggedIn,getUserDetail)
router.get("/me",isLoggedIn,myProfile)
router.post("/apply-doctor", isLoggedIn, applyDoctorController);
router.post("/get-all-notification",isLoggedIn,getAllNotificationController);
router.post("/delete-all-notification",isLoggedIn,deleteAllNotificationController);
router.get("/getAllDoctors", isLoggedIn, getAllDocotrsController);


export default router;
