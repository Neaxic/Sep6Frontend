import { Link } from "react-router-dom";
import { CardsCarousel } from "../components/CardsCarousel";
import { HeroText } from "../components/HeroText";
import { Button, Flex, Text } from "@mantine/core";
import React from "react";
import { MovieData } from "../api/IMovieData";
import { IMovie, ITopReviews } from "../misc/types";
import { GetOurTopRatedMovies, fetchHotMovies } from "../api/TMDBMovie";

export const HomePage = () => {
  const [highestRated, setHeighestRated] = React.useState<ITopReviews[]>([]);
  const [hotMovies, setHotMovies] = React.useState<IMovie[]>([]);
  const [newMovies, setNewMovies] = React.useState<ITopReviews[]>([]);

  const fetchMovies = React.useCallback(async () => {
    setHotMovies(await fetchHotMovies(1));

    const response = await GetOurTopRatedMovies();
    if (response) {
      setHeighestRated(response);
    }
    console.log(response);
  }, []);

  React.useEffect(() => {
    fetchMovies();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div style={{ marginTop: "128px" }}>
        <HeroText></HeroText>
      </div>
      <div style={{ marginTop: "64px" }}>
        <Text
          variant="gradient"
          gradient={{ from: "indigo", to: "cyan", deg: 45 }}
          sx={{
            fontFamily: "Greycliff CF, sans-serif",
            textTransform: "uppercase",
          }}
          size={32}
          fw={900}
        >
          Our highest rated
        </Text>
        <CardsCarousel movies={highestRated}></CardsCarousel>
      </div>
      <div style={{ marginTop: "64px" }}>
        <Text
          variant="gradient"
          gradient={{ from: "indigo", to: "cyan", deg: 45 }}
          sx={{
            fontFamily: "Greycliff CF, sans-serif",
            textTransform: "uppercase",
          }}
          size={32}
          fw={900}
        >
          Hot right now
        </Text>
        <CardsCarousel movies={hotMovies}></CardsCarousel>
      </div>
      <div style={{ marginTop: "64px" }}>
        <Text
          variant="gradient"
          gradient={{ from: "indigo", to: "cyan", deg: 45 }}
          sx={{
            fontFamily: "Greycliff CF, sans-serif",
            textTransform: "uppercase",
          }}
          size={32}
          fw={900}
        >
          Coming soon
        </Text>
        {/* <CardsCarousel></CardsCarousel> */}
      </div>
      <Flex
        mt={128}
        mb={128}
        mih={50}
        gap="md"
        justify="center"
        align="center"
        direction="column"
        wrap="wrap"
      >
        <Text
          variant="gradient"
          gradient={{ from: "indigo", to: "cyan", deg: 45 }}
          sx={{
            fontFamily: "Greycliff CF, sans-serif",
            textTransform: "uppercase",
          }}
          size={32}
          fw={900}
        >
          Or just view at all movies
        </Text>
        <Button component={Link} to={"/movies"}>
          Here
        </Button>
      </Flex>
    </div>
  );
};
function fetchTopratedMovies(
  page: any
): MovieData[] | PromiseLike<MovieData[]> {
  throw new Error("Function not implemented.");
}
