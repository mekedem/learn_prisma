import express from "express";
import { addtowachlistController } from "../controllers/watchlistController.js";

const router = express.Router();

router.post("/", addtowachlistController);


export default router;