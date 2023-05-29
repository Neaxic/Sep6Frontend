import * as React from "react";
import { fetchTopratedMovies } from "../api/TMDBMovie";
import { MovieData } from "../api/IMovieData";
import MovieCard from "../components/MovieCard";
import { HeaderMenu } from "../components/HeaderMenu";

export interface Top250MoviesProps {}

export const Top250Movies: React.FC<Top250MoviesProps> = (props) => {
  const [movies, setMovies] = React.useState<MovieData[]>([]);
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    const fetchMovies = async () => {
      const fetchedMovies = await fetchTopratedMovies(page);
      setMovies(fetchedMovies);
    };

    fetchMovies();
  }, [page]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div {...props}>
      <HeaderMenu />
      <h1 style={{ textAlign: "center" }}>Currently Hot</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        {movies.map((movie, index) => (
          <div style={{ margin: "10px" }} key={index}>
            <MovieCard
              movie={{
                image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                title: movie.original_title,
                description: `${movie.popularity}`,
                genreID: 1,
              }}
            />
          </div>
        ))}
      </div>
      <button onClick={() => handlePageChange(page - 1)}>Previous</button>
      <button onClick={() => handlePageChange(page + 1)}>Next</button>
    </div>
  );
};
