import { Link } from "react-router-dom";
import { CardsCarousel } from "../components/CardsCarousel";
import { HeroText } from "../components/HeroText";
import { Button, Flex, Text } from "@mantine/core";

export const HomePage = () => {
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
          Highest rated
        </Text>
        <CardsCarousel></CardsCarousel>
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
          Just landed
        </Text>
        <CardsCarousel></CardsCarousel>
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
        <CardsCarousel></CardsCarousel>
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
