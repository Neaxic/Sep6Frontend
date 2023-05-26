import * as React from "react";
import { useState } from "react";
import { IUser, IUserBookmarks, IUserReview } from "../misc/types";
import { useNavigate } from "react-router-dom";
import { CreateBookMarks, GetAllBookMarksByUserID } from "../api/TMDBMovie";

interface UserContextInterface {
  userData: IUser | undefined;
  userBookmarks: IUserBookmarks[];
  userReviews: IUserReview[];
  loggedIn: boolean;
  saveUser: (
    userId: number,
    username: string,
    email: string,
    isAdmin: boolean,
    isBanned: boolean,
    firstname: string,
    lastname: string
  ) => void;
  setRememberMe: (rememberMe: boolean) => void;
  logout: () => void;
  postReview: (comment: string, rating: number) => void;
  postBookmark: (
    movieId: number,
    movieTitel: string,
    image: string
  ) => Promise<boolean>;
}

export const UserContext = React.createContext<UserContextInterface>({
  userData: undefined,
  userBookmarks: [],
  userReviews: [],
  loggedIn: false,
  saveUser: () => {},
  setRememberMe: () => {},
  logout: () => {},
  postReview: () => {},
  postBookmark: async () => false,
});

export const UserProvider = (props: any) => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const [userData, setUserData] = useState<IUser | undefined>(undefined);
  const [userReviews, setUserReviews] = useState<IUserReview[]>([]);
  const [userBookmarks, setUserBookmarks] = useState<IUserBookmarks[]>([]);

  React.useEffect(() => {
    const stored = localStorage.getItem("userData");
    if (stored && stored !== "undefined") {
      //Burde check login her igen, men save pass i localstorage er ikke smart
      //+ tokens er ikke implementeret endnu
      setUserData(JSON.parse(stored));
      setLoggedIn(true);
      fetchProfileData();
    } else {
      setUserData(undefined);
      setLoggedIn(false);
      setUserBookmarks([]);
      setUserReviews([]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (loggedIn && userData) {
      if (rememberMe) {
        localStorage.setItem("userData", JSON.stringify(userData));
      }
      fetchProfileData();
    }
  }, [loggedIn, userData]);

  const saveUser = async (
    userId: number,
    username: string,
    email: string,
    isAdmin: boolean,
    isBanned: boolean,
    firstname: string,
    lastname: string
  ) => {
    setUserData({
      userId: userId,
      username: username,
      email: email,
      isAdmin: isAdmin,
      isBanned: isBanned,
      firstname: firstname,
      lastname: lastname,
    });

    setLoggedIn(true);
  };

  const fetchProfileData = async () => {
    if (loggedIn) {
      const BookmarkData = await GetAllBookMarksByUserID(userData?.userId!);
      if (BookmarkData) {
        setUserBookmarks(BookmarkData);
      }
    }
  };

  const postBookmark = async (
    movieId: number,
    movieTitel: string,
    image: string
  ) => {
    if (movieId && userData?.userId) {
      const data = await CreateBookMarks(
        movieId,
        userData?.userId,
        movieTitel,
        image
      );
      if (data) return true;
      else return false;
    }
    return false;
  };

  const postReview = async (comment: string, rating: number) => {
    //API CALL
  };

  const logout = async () => {
    localStorage.setItem("userData", JSON.stringify(undefined));
    setLoggedIn(false);
    setUserData(undefined);
    setUserBookmarks([]);
    setUserReviews([]);
    navigate("/");
  };

  return (
    <UserContext.Provider
      value={{
        setRememberMe,
        loggedIn,
        userData,
        userBookmarks,
        userReviews,
        saveUser,
        postReview,
        postBookmark,
        logout,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => React.useContext(UserContext);
