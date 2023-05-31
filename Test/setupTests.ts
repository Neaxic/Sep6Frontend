// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { HeaderMenu } from "../components/HeaderMenu";
import { Router } from "react-router-dom";

test("renders the header menu correctly", () => {
  render(
    <Router>
      <HeaderMenu />
    </Router>
  );

  // Test for at kontrollere, om "MOVIEMANIA" teksten vises
  const logoText = screen.getByText(/MOVIEMANIA/i);
  expect(logoText).toBeInTheDocument();

  // Test for at kontrollere, om "Home" linket vises
  const homeLink = screen.getByText(/Home/i);
  expect(homeLink).toBeInTheDocument();

  // Test for at kontrollere, om "Movies" linket vises
  const moviesLink = screen.getByText(/Movies/i);
  expect(moviesLink).toBeInTheDocument();

  // Test for at kontrollere, om "Log in" knappen vises
  const loginButton = screen.getByText(/Log in/i);
  expect(loginButton).toBeInTheDocument();

  // Test for at kontrollere, om "Sign up" knappen vises
  const signupButton = screen.getByText(/Sign up/i);
  expect(signupButton).toBeInTheDocument();
});
