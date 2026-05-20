import { prisma } from "../config/db.js";

const addtowachlistController = async (req, res) => {
    const { movieId, status, rating, notes } = req.body;

    const movie = await prisma.movie.findUnique({
        where: {
            id: movieId,
        },
    });

    if (!movie) {
        return res.status(404).json({ message: "Movie not found" });
    }

    const existingInWatchlist = await prisma.watchlistItem.findUnique({
        where: {
            userId_movieId: {
                userId: req.user.id,
                movieId: movieId,
            },
        },
    });

    if (existingInWatchlist) {
        return res.status(400).json({ message: "Movie already in watchlist" });
    }

    const watchlistItem = await prisma.watchlistItem.create({
        data: {
            userId: req.user.id,
            movieId,
            status: status || "PLANNED",
            rating,
            notes,
        },
    });

    res.status(201).json({
        status: "success",
        data: {
            watchlistItem
        }});
};

const deleteFromWatchlistController = async (req, res) => {
    const { movieId } = req.params;

    const watchlistItem = await prisma.watchlistItem.findUnique({
        where: {
            id: movieId,
        },
    });

    if(!watchlistItem) {
        return res.status(404).json({ message: "Watchlist item not found" });
    }

    if(watchlistItem.userId !== req.user.id) {
        return res.status(403).json({ message: "Unauthorized" });
    }

    await prisma.watchlistItem.delete({
        where: {
            id: movieId,
        }
    });

    res.status(200).json({
        status: "success",
        data: {
            message: "Watchlist item deleted successfully"
        }});
};


export { addtowachlistController, deleteFromWatchlistController };