import axios from "axios";
import {
  fetchMovie,
  fetchTopratedMovies,
  fetchHotMovies,
  deleteBookmark,
  fetchGenres,
} from "./TMDBMovie";

describe("API Tests", () => {
  test("should fetch a movie by ID", async () => {
    const movieId = "238";
    const movie = await fetchMovie(movieId);
    expect(movie).toBeDefined();
    expect(movie?.id).toBe(parseInt(movieId));
  });

  test("should fetch top-rated movies", async () => {
    const page = 1;
    const movies = await fetchTopratedMovies(page);
    expect(movies).toBeDefined();
    expect(movies?.length).toBeGreaterThan(0);
  });

  test("should fetch hot movies", async () => {
    const page = 1;
    const movies = await fetchHotMovies(page);
    expect(movies).toBeDefined();
    expect(movies?.length).toBeGreaterThan(0);
  });

  test("should fetch genres", async () => {
    const genres = await fetchGenres();
    expect(genres).toBeDefined();
    expect(genres?.length).toBeGreaterThan(0);
  });
});
