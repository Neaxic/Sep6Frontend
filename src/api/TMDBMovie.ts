import axios from "axios";

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

export const fetchMovieCredits = async (movieId: number) => {
  if (!movieId) return;

  try {
    const response = await axios({
      method: "GET",
      url: `${URL}/movie/${movieId}/credits`,
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

export const deleteBookmark = async (userId: number, movieId: number) => {
  if (!userId && !movieId) return;

  try {
    const response = await axios({
      method: "POST",
      url: `${URLKAPS}/deleteBookmarkByUserOnMovie?user_id=${userId}&movie_id=${movieId}`,
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
export const fetchNowPlaying = async (page: number) => {
  if (!page) return;

  try {
    const response = await axios({
      method: "GET",
      url: `${URL}/movie/now_playing?language=en-US&page=${page}`,
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
export const fetchUpcomming = async (page: number) => {
  if (!page) return;

  try {
    const response = await axios({
      method: "GET",
      url: `${URL}/movie/upcoming?language=en-US&page=${page}`,
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
      withCredentials: false,
      headers: {
        accept: "application/json",
      },
    });

    if (response.data) return response.data;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const LoginUserApi = async (username: string, password: string) => {
  try {
    const response = await axios({
      method: "GET",
      url: `${URLKAPS}/login?username=${username}&password=${password}`,
      headers: {
        accept: "application/json",
      },
    });

    const result = response.data;
    return result;
  } catch (e) {
    console.log(e);
  }
};

/*GetReviewForMovie*/
export const ReviewByUserId = async (UserID: number) => {
  try {
    const response = await axios({
      method: "GET",
      url: `${URLKAPS}/getReviewByUserId?user_id=${UserID}`,
      headers: {
        accept: "application/json",
      },
    });

    const result = response.data;
    return result;
  } catch (e) {
    console.log(e);
  }
};

/*GetAllBookMarks By UserID*/
export const GetAllBookMarksByUserID = async (userID: number) => {
  try {
    const response = await axios({
      method: "GET",
      url: `${URLKAPS}/getBookmarksByUserId?user_id=${userID}`,
      headers: {
        accept: "application/json",
      },
    });

    const result = response.data;
    return result;
  } catch (e) {
    console.log(e);
  }
};

/*CreateBookMarks*/
export const CreateBookMarks = async (
  MovieID: number,
  UserID: number,
  title: string,
  image: string
) => {
  try {
    const response = await axios({
      method: "POST",
      url: `${URLKAPS}/createBookmarkAndSaveBook?movie_id=${MovieID}&user_id=${UserID}&title=${title}&imageString=${image}`,
      headers: {
        accept: "application/json",
      },
    });

    const result = response.data;
    return result;
  } catch (e) {
    console.log(e);
  }
};

/*GetAllMoviesInDB*/
export const GetMoviesFromDBById = async (MovieID: number) => {
  try {
    const response = await axios({
      method: "GET",
      url: `${URLKAPS}/getMovie?id=${MovieID}`,
      headers: {
        accept: "application/json",
      },
    });

    const result = response.data;
    console.log(result);
  } catch (e) {
    console.log(e);
  }
};

export const GetOurTopRatedMovies = async () => {
  try {
    const response = await axios({
      method: "GET",
      url: `${URLKAPS}/getTopRatedMovies`,
      headers: {
        accept: "application/json",
      },
    });

    const result = response.data;
    return result;
  } catch (e) {
    console.log(e);
  }
};

/*CreateMovieForDB*/
export const CreateMovieForDB = async (MovieID: number, MovieTitle: string) => {
  try {
    const response = await axios({
      method: "POST",
      url: `${URLKAPS}/createMovie?id=${MovieID}&title=${MovieTitle}`,
      headers: {
        accept: "application/json",
      },
    });

    const result = response.data;
    console.log(result);
  } catch (e) {
    console.log(e);
  }
};

/*CreateReviewForMovie*/
export const CreateReview = async (
  MovieID: number,
  UserID: number,
  Comment: string,
  rating: number,
  movieTitle: string,
  movieSrc: string
) => {
  try {
    const response = await axios({
      method: "POST",
      url: `${URLKAPS}/createReview?comment=${Comment}&rating=${rating}&user_id=${UserID}&movie_id=${MovieID}&title=${movieTitle}&image=${movieSrc}`,
      headers: {
        accept: "application/json",
      },
    });

    const result = response.data;
    console.log(result);
  } catch (e) {
    console.log(e);
  }
};

/*GetReviewForMovie*/
export const ReviewByMovieId = async (MovieID: number) => {
  try {
    const response = await axios({
      method: "GET",
      url: `${URLKAPS}/getReviewByMovieId?movie_id=${MovieID}`,
      headers: {
        accept: "application/json",
      },
    });

    const result = response.data;
    return result;
  } catch (e) {
    console.log(e);
  }
};

/*SearchForMovie*/
export const SearchMovieByName = async (search: string) => {
  try {
    const response = await axios({
      method: "GET",
      url: `${URLKAPS}/getMoviesFromSearch?searchString=${search}`,
      headers: {
        accept: "application/json",
      },
    });

    const result = response.data;
    return result;
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const getUserByUserId = async (userid: number) => {
  try {
    const response = await axios({
      method: "GET",
      url: `${URLKAPS}/getUserWithId?id=${userid}`,
      headers: {
        accept: "application/json",
      },
    });

    const result = response.data;
    return result;
  } catch (e) {
    console.log(e);
    return [];
  }
};
