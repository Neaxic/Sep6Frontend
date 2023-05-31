import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { HeaderMenu } from "./HeaderMenu";
import { ColorSchemeProvider } from "@mantine/core";
import "@testing-library/jest-dom/extend-expect";

test("renders the header menu correctly", () => {
  render(
    <Router>
      <ColorSchemeProvider colorScheme="light" toggleColorScheme={() => {}}>
        <HeaderMenu />
      </ColorSchemeProvider>
    </Router>
  );

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
