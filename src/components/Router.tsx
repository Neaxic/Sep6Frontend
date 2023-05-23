import { Route, Routes } from "react-router-dom";
import { HomePage } from "../screens/HomePage";
import { Page } from "./Page";
import { MoviesScreen } from "../screens/MoviesScreen";
import { MovieScreen } from "../screens/MovieScreen";
import { LoginScreen } from "../screens/LoginScreen";
import { SignUpScreen } from "../screens/SignUpScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { ErrorScreen } from "../screens/ErrorScreen";
import { Apitest } from "../screens/Apitest";
import { BrowserScreen } from "../screens/BrowserScreen";
import { MovieHot } from "../screens/MovieHot";
import { Top250Movies } from "../screens/Top250Movies";
import { CatagoryScreen } from "../screens/CatagoryScreen";
export const Router = () => {
  return (
    <Page>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="lol" element={<p>yo</p>} />
        <Route path="movies" element={<MoviesScreen />} />
        <Route path="movie/:isbn" element={<MovieScreen />} />
        <Route path="catagory/:type" element={<CatagoryScreen />} />
        <Route path="login" element={<LoginScreen />} />
        <Route path="signUp" element={<SignUpScreen />} />
        <Route path="profile" element={<ProfileScreen />} />
        <Route path="api" element={<Apitest />} />
        <Route path="Browser/*" element={<BrowserScreen />} />
        <Route path="Top" element={<Top250Movies />} />
        <Route path="Hot" element={<MovieHot />} />
        <Route path="*" element={<ErrorScreen />} />
      </Routes>
    </Page>
  );
};
