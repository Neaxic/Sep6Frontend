import { Flex, Pagination, Title } from "@mantine/core";
import * as React from "react";
import {
  fetchGenreMovies,
  fetchHotMovies,
  fetchTopratedMovies,
} from "../api/TMDBMovie";
import MovieCard from "../components/MovieCard";
import { useParams } from "react-router-dom";
import { MovieData } from "../api/IMovieData";
import { useMovieContext } from "../contexts/MovieContext";

export interface CatagoryScreenProps {}

export const CatagoryScreen = ({ ...props }: CatagoryScreenProps) => {
  let { type } = useParams();
  const parsedType = type !== undefined ? +type : undefined;

  const { genres } = useMovieContext();

  const [movies, setMovies] = React.useState<MovieData[]>([]);
  const [page, setPage] = React.useState(1);

  const fetchMovies = React.useCallback(async () => {
    let fetchedMovies: MovieData[] = [];

    switch (type) {
      case "top":
        fetchedMovies = await fetchTopratedMovies(page);
        break;
      case "hot":
        fetchedMovies = await fetchHotMovies(page);
        break;
      default:
        if (type && +type > 0) {
          fetchedMovies = await fetchGenreMovies(+type);
        } else {
          fetchedMovies = await fetchTopratedMovies(page);
        }
        break;
    }

    setMovies(fetchedMovies);
  }, [page, type]);

  React.useEffect(() => {
    fetchMovies();
  }, [fetchMovies, page]);

  React.useEffect(() => {}, [type]);

  return (
    <div {...props}>
      {type ? (
        <h1 style={{ textAlign: "left", marginTop: "128px" }}>
          Currently browsing{" "}
          {parsedType !== undefined && parsedType > 0
            ? genres.find((e) => e.id === parsedType)?.name ?? "unknown"
            : type ?? "unknown"}{" "}
          movies
        </h1>
      ) : (
        <h1>Currently browsing </h1>
      )}

      {movies ? (
        <>
          <Flex wrap={"wrap"} justify={"center"}>
            {movies.map((movie, index) => (
              <div style={{ margin: "10px" }} key={index}>
                <MovieCard
                  movie={{
                    id: movie.id,
                    image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                    title: movie.original_title,
                    description: `${movie.popularity}`,
                    genreID: 1, // Assuming genreID is required for your MovieCard component.
                  }}
                />
              </div>
            ))}
          </Flex>
          <Flex justify={"center"}>
            <Pagination total={10} value={page} onChange={setPage}></Pagination>
          </Flex>
        </>
      ) : (
        <>
          <Title>Loading...</Title>
        </>
      )}
    </div>
  );
};
