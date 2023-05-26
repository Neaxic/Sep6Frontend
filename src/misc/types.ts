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

export interface IUserBookmarks {
  movieID: string;
  movieTitle: string;
  movieSrc: string;
  date: string;
}

export interface IReview {
  user: string;
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
  imdb_id?: string;
  original_language?: string;
  original_title?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string;
  release_date?: string;
  tagline?: string;
  title?: string;

  src?: string;
  description?: string;
  rating?: number;
  reviews?: IReview[];
}
