import * as React from "react";
import { useState } from "react";
import { IGenre } from "../misc/types";
import { fetchGenres } from "../api/TMDBMovie";
interface MovieContextInterface {
  genres: IGenre[];
}

export const MovieContext = React.createContext<MovieContextInterface>({
  genres: [],
});

export const MovieProvider = (props: any) => {
  const [genres, setGenres] = useState<IGenre[]>([]);

  React.useEffect(() => {
    const fetchGenresList = async () => {
      const fetchedGenres = await fetchGenres();
      setGenres(fetchedGenres);
    };

    fetchGenresList();
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
