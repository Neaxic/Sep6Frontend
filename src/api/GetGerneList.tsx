import axios from "axios";
import { GenreData } from "./IGenreData"; // adjust the path according to your file structure

const URL = "https://api.themoviedb.org/3/genre/movie/list?language=en";
const options = {
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOTMzMjZiMzg4MWQ3NThlMTkzOTI2YjRkOTE4NDcwMSIsInN1YiI6IjY0NjY4ZjI0MzNhMzc2MDBlNjc5NmQ3OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RgypCyWe-AyWmk8YCVahkl8J3Iw5HmxT8zZD7C1Czjc",
  },
};

export const fetchGenre = async (): Promise<GenreData[] | null> => {
  try {
    const response = await axios.get(URL, options);

    // If response.data.genres is not present or not an array, return null
    if (!Array.isArray(response.data.genres)) {
      console.error(
        "Unexpected data structure. Expected an array, received:",
        response.data
      );
      return null;
    }

    // Return the whole array of genres
    return response.data.genres;
  } catch (error) {
    console.error(error);
    return null;
  }
};
