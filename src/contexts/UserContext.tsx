import * as React from "react";
import { useState } from "react";
import { IUserBookmarks, IUserReview } from "../misc/types";
import { useNavigate } from "react-router-dom";

interface UserContextInterface {
  username: string;
  email: string;
  userRole: string;
  userBookmarks: IUserBookmarks[];
  userReviews: IUserReview[];
  loggedIn: boolean;
  login: (email: string, password: string) => void;
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
  username: "",
  email: "",
  userRole: "",
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
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [userRole, setUserRole] = useState<string>("");
  const [userReviews, setUserReviews] = useState<IUserReview[]>([]);
  const [userBookmarks, setUserBookmarks] = useState<IUserBookmarks[]>([]);

  React.useEffect(() => {
    setUsername("");
    setUserRole("Login");
    setEmail("");
    setLoggedIn(false);
    setUserBookmarks([]);
    setUserReviews([]);
  }, []);

  const login = async (username: string, password: string) => {
    //API CALL
    setUsername(username);
    setLoggedIn(true);
    setUserRole("User");
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
    setUsername(username);
    setEmail(email);
    setUserRole("User");
  };

  const postReview = async (comment: string, rating: number) => {
    //API CALL
  };

  const logout = async () => {
    setLoggedIn(false);
    setUsername("");
    setEmail("");
    setUserRole("");
    setUserBookmarks([]);
    setUserReviews([]);
    navigate("/");
  };

  return (
    <UserContext.Provider
      value={{
        loggedIn,
        username,
        email,
        userRole,
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
