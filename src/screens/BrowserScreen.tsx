import React, { useEffect, useState } from "react";
import { fetchGenreMovies } from "../api/GetMovieByGenreId";
import { MovieData } from "../api/IMovieData";
import { fetchGenre } from "../api/GetGerneList";
import { GenreData } from "../api/IGenreData";

export const BrowserScreen = () => {
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
      {movies.map((movie, index) => (
        <div key={index}>
          <h2>{movie.original_title}</h2>
          <p>{movie.popularity}</p>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.original_title}
          />
        </div>
      ))}
      <button onClick={() => handleButtonClick(1)}>Get Genre Movies</button>
    </div>
  );
};
