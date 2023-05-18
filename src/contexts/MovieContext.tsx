import * as React from "react";
import { useState } from "react";

interface MovieContextInterface {
  isDarkMode: boolean;
  handleClick: () => void;
}

export const MovieContext = React.createContext<MovieContextInterface>({
  isDarkMode: false,
  handleClick: () => {},
});

export const MovieProvider = (props: any) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleClick = () => {
    setIsDarkMode((previousValue) => !previousValue);
  };

  return (
    <MovieContext.Provider
      value={{
        isDarkMode,
        handleClick,
      }}
    >
      {props.children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = () => React.useContext(MovieContext);
