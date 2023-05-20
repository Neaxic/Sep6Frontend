import axios from "axios";
import { MovieData } from "./IMovieData";

// Remove static genreId from here

const options = {
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOTMzMjZiMzg4MWQ3NThlMTkzOTI2YjRkOTE4NDcwMSIsInN1YiI6IjY0NjY4ZjI0MzNhMzc2MDBlNjc5NmQ3OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RgypCyWe-AyWmk8YCVahkl8J3Iw5HmxT8zZD7C1Czjc",
  },
};

export const fetchGenreMovies = async (
  genreId: number // accept genreId as a parameter
): Promise<MovieData[] | null> => {
  try {
    // use genreId to build the URL
    const URL = `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&language=en-US&page=1`;

    const response = await axios.get(URL, options);
    return response.data.results;
  } catch (error) {
    console.error(error);
    return null;
  }
};
