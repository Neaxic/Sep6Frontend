import axios from "axios";
import { IMovie } from "../misc/types";

const URL = "https://api.themoviedb.org/3";
const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOTMzMjZiMzg4MWQ3NThlMTkzOTI2YjRkOTE4NDcwMSIsInN1YiI6IjY0NjY4ZjI0MzNhMzc2MDBlNjc5NmQ3OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RgypCyWe-AyWmk8YCVahkl8J3Iw5HmxT8zZD7C1Czjc";

export const fetchMovie = async (id: string) => {
  if (!id) return;

  try {
    const response = await axios({
      method: "GET",
      url: `${URL}/movie/${id}`,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    const selectedData = response.data;
    console.log(selectedData);
    return selectedData;
  } catch (e) {
    console.log(e);
  }
};

export const fetchTopratedMovies = async (page: number) => {
  if (!page) return;

  try {
    const response = await axios({
      method: "GET",
      url: `${URL}/movie/top_rated?language=en-US&page=${page}`,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    const selectedData = response.data.results;
    console.log(selectedData);
    return selectedData;
  } catch (e) {
    console.log(e);
  }
};
