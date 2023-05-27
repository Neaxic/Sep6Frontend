import { Carousel } from "@mantine/carousel";
import { createStyles, Paper, Title, Button, rem } from "@mantine/core";
import { Link } from "react-router-dom";
import { IMovie, ITopReviews } from "../misc/types";

const useStyles = createStyles((theme) => ({
  card: {
    height: rem(440),
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    color: theme.white,
    lineHeight: 1.2,
    fontSize: rem(32),
    marginTop: theme.spacing.xs,
  },

  category: {
    color: theme.white,
    opacity: 0.7,
    fontWeight: 700,
    textTransform: "uppercase",
  },
}));

interface CardProps {
  id?: string;
  title?: string;
  imageString?: string;
  rating?: number;
}

function Card({ id, title, imageString, rating }: CardProps) {
  const { classes } = useStyles();

  return (
    <Paper
      shadow="md"
      p="xl"
      radius="md"
      sx={{
        backgroundBlendMode: "color-dodge",
        backgroundImage: `url(https://image.tmdb.org/t/p/w220_and_h330_face/${imageString})`,
      }}
      className={classes.card}
    >
      <div>
        <Title order={3} className={classes.title}>
          {rating}
        </Title>
        <Title order={3} className={classes.title}>
          {title}
        </Title>
      </div>
      <Button variant="white" color="dark" component={Link} to={`movie/${id}`}>
        View movie
      </Button>
    </Paper>
  );
}

interface CardsCarouselProps {
  movies?: ITopReviews[] | IMovie[];
}

export const CardsCarousel = ({ movies, ...props }: CardsCarouselProps) => {
  const isMovie = (item: ITopReviews | IMovie): item is ITopReviews => {
    return "imageString" in item;
  };

  const slides =
    movies &&
    movies.map((item) => (
      <Carousel.Slide key={item.title}>
        <Card
          id={"" + item.id}
          title={item.title}
          imageString={isMovie(item) ? item.imageString : item.poster_path}
          rating={item.rating}
        />
      </Carousel.Slide>
    ));

  return (
    <Carousel
      slideSize="25%"
      breakpoints={[{ maxWidth: "sm", slideSize: "100%", slideGap: rem(2) }]}
      slideGap="xl"
      align="start"
      slidesToScroll={1}
    >
      {slides}
    </Carousel>
  );
};
