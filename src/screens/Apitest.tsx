import * as React from "react";
import { fetchMovies } from "../api/Jokes";
import { MovieData } from "../api/IMovieData";

export interface ApitestProps {
  // Props goes here
}

export const Apitest = ({ ...props }: ApitestProps) => {
  const [apiData, setApiData] = React.useState<MovieData | null>(null);

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetchMovies();
      setApiData(res);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={fetchData}>getMovie</button>
      {apiData && (
        <div>
          <h2>{apiData.original_title}</h2>
          <p>{apiData.popularity}</p>
        </div>
      )}
    </div>
  );
};
