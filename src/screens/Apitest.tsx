import * as React from "react";
import { fetchMovies } from "../api/Jokes"; // Du skal ændre stien til den korrekte sti til din Movies api-klasse

export interface ApitestProps {
  // Props goes here
}

export const Apitest = ({ ...props }: ApitestProps) => {
  const [apiData, setApiData] = React.useState<any>(null);

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetchMovies();
      setApiData(res);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <button onClick={fetchData}>getJoke</button>
      {apiData && (
        <div>
          <h2>{apiData.original_title}</h2>
          <p>{apiData.popularity}</p>
        </div>
      )}
    </div>
  );
};
