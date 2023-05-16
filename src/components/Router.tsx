import { Route, Routes } from "react-router-dom";
import { HomePage } from "../screens/HomePage";
import { Page } from "./Page";
import { MoviesScreen } from "../screens/MoviesScreen";
import { MovieScreen } from "../screens/MovieScreen";

export const Router = () => {
  return (
    <Page>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="lol" element={<p>yo</p>} />
        <Route path="movies" element={<MoviesScreen />} />
        <Route path="movie/:title" element={<MovieScreen />} />
      </Routes>
    </Page>
  );
};
