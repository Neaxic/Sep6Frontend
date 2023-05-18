import * as React from "react";
import { useState } from "react";
import { IUserBookmarks, IUserReview } from "../misc/types";

interface UserContextInterface {
  username: string;
  userRole: string;
  userBookmarks: IUserBookmarks[];
  userReviews: IUserReview[];
}

export const UserContext = React.createContext<UserContextInterface>({
  username: "",
  userRole: "",
  userBookmarks: [],
  userReviews: [],
});

export const UserProvider = (props: any) => {
  const [username, setUsername] = useState<string>("");
  const [userRole, setUserRole] = useState<string>("");
  const [userReviews, setUserReviews] = useState<IUserReview[]>([]);
  const [userBookmarks, setUserBookmarks] = useState<IUserBookmarks[]>([]);

  React.useEffect(() => {
    setUsername("IReallyLikeReviewing");
    setUserRole("Admin");
    setUserBookmarks([]);
    setUserReviews([
      {
        movieID: "1",
        movieTitle: "idk",
        movieSrc: "4",
        date: "2021-05-01",
        rating: 4.5,
        comment: "This is a comment",
      },
      {
        movieID: "2",
        movieTitle: "Harry Potter",
        comment: "Lort",
        date: "2021-05-01",
        rating: Math.floor(Math.random() * 5),
        movieSrc:
          "https://www.elgiganten.dk/image/dv_web_D180001002957408/DVDHP6DOC/harry-potter-og-halvblodsprinsen-dokumentar-dvd--pdp_zoom-3000.jpg",
      },
      {
        movieID: "3",
        movieTitle: "Star Wars",
        date: "2021-05-01",
        rating: Math.floor(Math.random() * 5),
        comment: "Lort",
        movieSrc:
          "https://www.elgiganten.dk/image/dv_web_D1800010021291949/571132/star-wars-jedi-survivor-deluxe-edition-xbox-series-x--pdp_zoom-3000--pdp_main-960.jpg",
      },
      {
        movieID: "4",
        movieTitle: "The Lord of the Rings",
        date: "2021-05-01",
        rating: Math.floor(Math.random() * 5),
        comment: "Lort",
        movieSrc:
          "https://m.media-amazon.com/images/I/51kfFS5-fnL._SY291_BO1,204,203,200_QL40_FMwebp_.jpg",
      },
      {
        movieID: "5",
        movieTitle: "Jurassic Park",
        date: "2021-05-01",
        comment: "Lort",
        rating: Math.floor(Math.random() * 5),
        movieSrc:
          "https://www.elgiganten.dk/image/dv_web_D180001002295082/BDVDJURPARK13/jurassic-park-ultimate-trilogy-blu-ray--pdp_zoom-3000--pdp_main-960.jpg",
      },
    ]);
  }, []);

  return (
    <UserContext.Provider
      value={{
        username,
        userRole,
        userBookmarks,
        userReviews,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => React.useContext(UserContext);