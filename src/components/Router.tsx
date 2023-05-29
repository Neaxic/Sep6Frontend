import { Route, Routes } from "react-router-dom";
import { HomePage } from "../screens/HomePage";
import { Page } from "./Page";
import { MoviesScreen } from "../screens/MoviesScreen";
import { MovieScreen } from "../screens/MovieScreen";
import { LoginScreen } from "../screens/LoginScreen";
import { SignUpScreen } from "../screens/SignUpScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { ErrorScreen } from "../screens/ErrorScreen";
import { BrowserScreen } from "../screens/BrowserScreen";
import { CatagoryScreen } from "../screens/CatagoryScreen";
export const Router = () => {
  return (
    <Page>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="movies" element={<MoviesScreen />} />
        <Route path="movie/:isbn" element={<MovieScreen />} />
        <Route path="catagory/:type" element={<CatagoryScreen />} />
        <Route path="login" element={<LoginScreen />} />
        <Route path="signUp" element={<SignUpScreen />} />
        <Route path="profile" element={<ProfileScreen />} />
        <Route path="profile/:id" element={<ProfileScreen />} />
        <Route path="Browser/*" element={<BrowserScreen />} />
        <Route path="*" element={<ErrorScreen />} />
      </Routes>
    </Page>
  );
};
