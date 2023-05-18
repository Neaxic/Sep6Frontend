import axios from "axios";

const URL =
  "https://api.themoviedb.org/3/search/movie?query=Harry%20potter&include_adult=false&language=en-US&page=1";

const options = {
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOTMzMjZiMzg4MWQ3NThlMTkzOTI2YjRkOTE4NDcwMSIsInN1YiI6IjY0NjY4ZjI0MzNhMzc2MDBlNjc5NmQ3OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RgypCyWe-AyWmk8YCVahkl8J3Iw5HmxT8zZD7C1Czjc",
  },
};

export const fetchMovies = async () => {
  try {
    const response = await axios.get(URL, options);
    return response.data.results[0];
  } catch (error) {
    console.error(error);
    return null;
  }
};
