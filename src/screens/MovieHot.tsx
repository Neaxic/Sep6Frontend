import * as React from "react";
import { MovieData } from "../api/IMovieData";
import { fetchHotMovies } from "../api/GetHotMovies";
import MovieCard from "../components/MovieCard"; // Import MovieCard komponenten

export interface ApitestProps {
  // Props går her
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
      console.error("Fejl ved hentning af data fra API:", error);
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Currently Hot</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        {apiTopData.map((movie, index) => (
          <div style={{ margin: "10px" }} key={index}>
            <MovieCard
              movie={{
                image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                title: movie.original_title,
                description: `${movie.popularity}`,
                genreID: 1, // konverterer popularity til en streng, da description forventer en streng.
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
