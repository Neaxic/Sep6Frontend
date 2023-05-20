import axios from "axios";
import { MovieData } from "./IMovieData";

const options = {
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOTMzMjZiMzg4MWQ3NThlMTkzOTI2YjRkOTE4NDcwMSIsInN1YiI6IjY0NjY4ZjI0MzNhMzc2MDBlNjc5NmQ3OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RgypCyWe-AyWmk8YCVahkl8J3Iw5HmxT8zZD7C1Czjc",
  },
};

export const fetchTopratedMovies = async (
  page: number
): Promise<MovieData[]> => {
  try {
    const URL = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`;
    const response = await axios.get(URL, options);
    return response.data.results;
  } catch (error) {
    console.error(error);
    return [];
  }
};
