export interface IUserReview {
  movieID: string;
  movieTitle: string;
  movieSrc: string;
  date: string;
  rating: number;
  comment: string;
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

export interface IMovie {
  id: string;
  title: string;
  src: string;
  description: string;
  rating: number;
  reviews: IReview[];
}
