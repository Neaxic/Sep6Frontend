import { Route, Routes } from "react-router-dom";
import { HomePage } from "../screens/HomePage";
import { Page } from "./Page";
import { MoviesScreen } from "../screens/MoviesScreen";
import { MovieScreen } from "../screens/MovieScreen";
import { LoginScreen } from "../screens/LoginScreen";
import { SignUpScreen } from "../screens/SignUpScreen";

export const Router = () => {
  return (
    <Page>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="lol" element={<p>yo</p>} />
        <Route path="movies" element={<MoviesScreen />} />
        <Route path="movie/:isbn" element={<MovieScreen />} />
        <Route path="login" element={<LoginScreen />} />
        <Route path="signUp" element={<SignUpScreen />} />
      </Routes>
    </Page>
  );
};
