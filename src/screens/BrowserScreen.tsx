import React, { useEffect, useState } from "react";
import { fetchGenreMovies } from "../api/GetMovieByGenreId";
import { MovieData } from "../api/IMovieData";
import MovieCard from "../components/MovieCard";
import { useMovieContext } from "../contexts/MovieContext";

export const BrowserScreen = () => {
  const { genres } = useMovieContext();
  const [movies, setMovies] = useState<MovieData[]>([]);
  const [genre, setGenre] = useState<number | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      if (genre !== null) {
        try {
          const res = await fetchGenreMovies(genre);
          if (Array.isArray(res)) {
            setMovies(res);
            console.log(res);
          } else {
            console.error("Invalid data format received. Expected an array.");
          }
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchMovies();
  }, [genre]);

  const handleButtonClick = async (genreId: number) => {
    setGenre(genreId);
  };

  return (
    <div>
      <h1>Movie List</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        {movies.map((movie, index) => (
          <MovieCard
            key={index}
            movie={{
              image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
              title: movie.original_title,
              description: `${movie.popularity}`,
              genreID: 1,
            }}
          />
        ))}
      </div>
      <button onClick={() => handleButtonClick(1)}>Get Genre Movies</button>
    </div>
  );
};
