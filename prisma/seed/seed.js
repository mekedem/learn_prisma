import { prisma } from "../../src/config/db.js";

const creatorId = "c3e26f05-811d-41a2-8ace-a7011e1e1685";

const movies = [
    {
        title: "The Dark Knight",
        overview: "A superhero movie about a superhero who fights crime and saves the world.",
        realeaseYear: 2008,
        genres: ["Action", "Crime", "Drama"],
        runtime: 152,
        posterUrl: "https://example.com/dark-knight.jpg",
        createdBy: creatorId,
    },
    {
        title: "The Dark Knight Rises",
        overview: "A superhero movie about a superhero who fights crime and saves the world.",
        realeaseYear: 2012,
        genres: ["Action", "Crime", "Drama"],
        runtime: 164,
        posterUrl: "https://example.com/dark-knight-rises.jpg",
        createdBy: creatorId,
    },
    {
        title: "Harry Potter and the Philosopher's Stone",
        overview: "A superhero movie about a superhero who fights crime and saves the world.",
        realeaseYear: 2008,
        genres: ["Action", "Crime", "Drama"],
        runtime: 152,
        posterUrl: "https://example.com/dark-knight.jpg",
        createdBy: creatorId, 
    },
    {
        title: "Iron Man",
        overview: "A superhero movie about a superhero who fights crime and saves the world.",
        realeaseYear: 2008,
        genres: ["Action", "Crime", "Drama"],
        runtime: 152,
        posterUrl: "https://example.com/dark-knight.jpg",
        createdBy: creatorId,
    },
    {
        title: "Lord of the Rings: The Fellowship of the Ring",
        overview: "A superhero movie about a superhero who fights crime and saves the world.",
        realeaseYear: 2008,
        genres: ["Action", "Crime", "Drama"],
        runtime: 152,
        posterUrl: "https://example.com/dark-knight.jpg",
        createdBy: creatorId,
    },
];

const main = async () => {
    for (const movie of movies) {
        await prisma.movie.create({
            data: movie,
        });
    }

    console.log("Movies created successfully");
};

main().catch((e)=>{
    console.error(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
    console.log("Disconnected from the database");
});