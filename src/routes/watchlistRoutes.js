import express from "express";
import { addtowachlistController, deleteFromWatchlistController } from "../controllers/watchlistController.js";
import authMiddleware from "../middleware/authmiddleware.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { addToWatchlistSchema, deleteFromWatchlistSchema } from "../validators/watchlistValidators.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", validateRequest(addToWatchlistSchema), addtowachlistController);
router.delete("/:movieId", validateRequest(deleteFromWatchlistSchema), deleteFromWatchlistController);


export default router;