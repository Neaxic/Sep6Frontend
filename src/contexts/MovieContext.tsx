import * as React from "react";
import { useState } from "react";
import { IGenre } from "../misc/types";

interface MovieContextInterface {
  genres: IGenre[];
}

export const MovieContext = React.createContext<MovieContextInterface>({
  genres: [],
});

export const MovieProvider = (props: any) => {
  const [genres, setGenres] = useState<IGenre[]>([]);

  React.useEffect(() => {
    const fetchGenres = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
      );
      const data = await response.json();
      setGenres(data.genres);
    };

    fetchGenres();
  }, []);

  return (
    <MovieContext.Provider
      value={{
        genres,
      }}
    >
      {props.children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = () => React.useContext(MovieContext);
