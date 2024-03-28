import Controller from "../controller/controller.js";
import express from "express";
import isValidUser from "../middlewares/validate.js";

const router = express.Router();

router.get("/login", Controller.login_get);
router.post("/login", Controller.login_post);

router.get("/home", Controller.home_get);

// adding middleware to dashboard route 
// to restrict the user from accessing the dashboard page.
// only the logged in user having session will be visiting the dashboard.
router.get("/dashboard", isValidUser, Controller.dashboard_get);

router.post("/logout", Controller.logout_post);

router.get("/signup", Controller.signup_get);
router.post("/signup", Controller.signup_post);

export default router;