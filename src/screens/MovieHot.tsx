import * as React from "react";
import { MovieData } from "../api/IMovieData";
import { fetchHotMovies } from "../api/GetHotMovies";

export interface ApitestProps {
  // Props goes here
}

export const MovieHot = ({ ...props }: ApitestProps) => {
  const [apiTopData, setApiTopData] = React.useState<MovieData[]>([]);

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetchHotMovies();
      if (data) {
        setApiTopData(data);
      }
    } catch (error) {
      console.error("Error fetching data from API:", error);
    }
  };

  return (
    <div>
      <h1>Movie List</h1>
      {apiTopData.map((movie, index) => (
        <div key={index}>
          <h2>{movie.original_title}</h2>
          <p>{movie.popularity}</p>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.original_title}
          />
        </div>
      ))}
    </div>
  );
};
