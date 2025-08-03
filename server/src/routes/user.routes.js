import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  userData,
  refreshAccessToken,
} from "../controllers/user.controller.js";
import { jwtVerify } from "../middlewares/auth.middleware.js";


const router = Router();

router
  .route("/register")
  .post( registerUser);
router.route("/login").post(loginUser);
router.route("/refreshAccessToken").post(refreshAccessToken);
router.route("/logout").post(jwtVerify, logoutUser);
router.route("/profile").get(jwtVerify, userData);
router.route("/logout").get(logoutUser);

export { router as userRouter };
