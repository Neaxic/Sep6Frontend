import * as React from "react";
import { useState } from "react";
import { IUser, IUserBookmarks, IUserReview } from "../misc/types";
import { useNavigate } from "react-router-dom";
import { GetAllBookMarksByUserID } from "../api/TMDBMovie";

interface UserContextInterface {
  userData: IUser | undefined;
  userBookmarks: IUserBookmarks[];
  userReviews: IUserReview[];
  loggedIn: boolean;
  login: (
    userId: number,
    username: string,
    email: string,
    isAdmin: boolean,
    isBanned: boolean,
    firstname: string,
    lastname: string
  ) => void;
  signup: (
    email: string,
    username: string,
    firstname: string,
    lastname: string,
    password: string
  ) => void;
  logout: () => void;
  postReview: (comment: string, rating: number) => void;
}

export const UserContext = React.createContext<UserContextInterface>({
  userData: undefined,
  userBookmarks: [],
  userReviews: [],
  loggedIn: false,
  login: () => {},
  signup: () => {},
  logout: () => {},
  postReview: () => {},
});

export const UserProvider = (props: any) => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const [userData, setUserData] = useState<IUser | undefined>(undefined);
  const [userReviews, setUserReviews] = useState<IUserReview[]>([]);
  const [userBookmarks, setUserBookmarks] = useState<IUserBookmarks[]>([]);

  React.useEffect(() => {
    setUserData(undefined);
    setLoggedIn(false);
    setUserBookmarks([]);
    setUserReviews([]);
  }, []);

  const login = async (
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

  const signup = async (
    email: string,
    username: string,
    firstname: string,
    lastname: string,
    password: string
  ) => {
    //API CALL
    setLoggedIn(true);
  };

  const fetchProfileData = async () => {
    //API CALL
    if (loggedIn) {
      const data = await GetAllBookMarksByUserID(userData?.userId!);
      if (data) {
        setUserBookmarks(data);
      }
    }
  };

  const postReview = async (comment: string, rating: number) => {
    //API CALL
  };

  const logout = async () => {
    setLoggedIn(false);
    setUserData(undefined);
    setUserBookmarks([]);
    setUserReviews([]);
    navigate("/");
  };

  return (
    <UserContext.Provider
      value={{
        loggedIn,
        userData,
        userBookmarks,
        userReviews,
        login,
        signup,
        postReview,
        logout,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => React.useContext(UserContext);
