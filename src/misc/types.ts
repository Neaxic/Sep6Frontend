export interface IUserReview {
  movieID: string;
  movieTitle: string;
  movieSrc: string;
  date: string;
  rating: number;
  comment: string;
}

export interface IUser {
  userId: number;
  username: string;
  email: string;
  isAdmin: boolean;
  isBanned: boolean;
  firstname: string;
  lastname: string;
}

export interface ITopReviews {
  id: number;
  title: string;
  imageString: string;
  rating: number;
}

export interface IUserBookmarks {
  id: number;
  title: string;
  imageString: string;
  date: string;
}

export interface IReview {
  username: string;
  movieID: string;
  date: string;
  rating: number;
  comment: string;
}

export interface IGenre {
  id: number;
  name: string;
}

export interface IMovie {
  adult?: boolean;
  backdrop_path?: string;
  budget?: number;
  genres?: { id: number; name: string }[];
  homepage?: string;
  id?: number;
  revenue?: number;
  spoken_languages?: { iso_639_1: string; name: string }[];
  production_companies?: { id: number; logo_path: string; name: string }[];
  production_countries?: { iso_3166_1: string; name: string }[];
  imdb_id?: string;
  original_language?: string;
  original_title?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string;
  release_date?: string;
  runtime?: number;
  tagline?: string;
  title?: string;

  src?: string;
  description?: string;
  rating?: number;
  reviews?: IReview[];
}
