import { z } from "zod";

const addToWatchlistSchema = z.object({
    movieId: z.string().uuid(),
    status: z.enum(["PLANNED", "WATCHED", "COMPLETED", "DROPPED"], {
        error: () => "Status must be either PLANNED, WATCHED, COMPLETED, or DROPPED",
    }).optional(),
    rating: z.coerce.number().int("Rating must be an integer").min(1).max(10).optional(),
    notes: z.string().optional(),
});

const deleteFromWatchlistSchema = z.object({
    movieId: z.string().uuid(),
});

export { addToWatchlistSchema, deleteFromWatchlistSchema };