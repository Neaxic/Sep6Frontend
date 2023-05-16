import { Route, Routes } from "react-router-dom";
import { HomePage } from "../screens/HomePage";
import { Page } from "./Page";

export const Router = () => {
  return (
    <Page>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="lol" element={<p>yo</p>} />
      </Routes>
    </Page>
  );
};
