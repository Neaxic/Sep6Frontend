import "./App.css";
import { Router } from "./components/Router";
import { MovieProvider } from "./contexts/MovieContext";
import { PageProvider } from "./contexts/PageContext";
import { UserProvider } from "./contexts/UserContext";
import { ColorScheme, MantineProvider } from "@mantine/core";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";

function App() {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "dark",
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) => {
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  };

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  return (
    <PageProvider>
      <UserProvider>
        <MovieProvider>
          <MantineProvider
            theme={{
              colorScheme,
            }}
            withGlobalStyles
            withNormalizeCSS
          >
            <Router></Router>
          </MantineProvider>
        </MovieProvider>
      </UserProvider>
    </PageProvider>
  );
}

export default App;
