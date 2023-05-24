import axios from "axios";
import { IMovie } from "../misc/types";

const URL = "https://api.themoviedb.org/3";
const URLKAPS = "http://falkmikkelsen.dk:8081";
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
    return selectedData;
  } catch (e) {
    console.log(e);
  }
};

export const fetchHotMovies = async (page: number) => {
  if (!page) return;

  try {
    const response = await axios({
      method: "GET",
      url: `${URL}/movie/popular?language=%2A&page=${page}`,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    const selectedData = response.data.results;
    return selectedData;
  } catch (e) {
    console.log(e);
  }
};

export const fetchGenres = async () => {
  try {
    const response = await axios({
      method: "GET",
      url: `${URL}/genre/movie/list?language=en`,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    const selectedData = response.data.genres;
    return selectedData;
  } catch (e) {
    console.log(e);
  }
};

export const fetchGenreMovies = async (genreId: number) => {
  if (!genreId) return;

  try {
    const response = await axios({
      method: "GET",
      url: `${URL}/discover/movie?with_genres=${genreId}&language=en-US&page=1`,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    const selectedData = response.data.results;
    return selectedData;
  } catch (e) {
    console.log(e);
  }
};
/*Create User*/
export const createUserApi = async (
  username: string,
  email: string,
  password: string,
  firstName: string,
  lastName: string
) => {
  try {
    const response = await axios({
      method: "POST",
      url: `${URLKAPS}/createUser?username=${username}&password=${password}&email=${email}&firstname=${firstName}&lastName=${lastName}`,
      headers: {
        accept: "application/json",
      },
    });
  } catch (e) {
    console.log(e);
  }
};

/*Login with user With Username And password*/
export const LoginUserApi = async (username: string, password: string) => {
  try {
    const response = await axios({
      method: "GET",
      url: `${URLKAPS}/login?username=${username}&password=${password}`,
      headers: {
        accept: "application/json",
      },
    });
  } catch (e) {
    console.log(e);
  }
};
