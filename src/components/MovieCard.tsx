import React from "react";
import { Card, Image, Text } from "@mantine/core";

interface Movie {
  image: string;
  title: string;
  description: string;
  genreID: number;
}

const MovieCard: React.FC<{ movie: Movie }> = ({ movie }) => (
  <Card
    shadow="sm"
    padding="xl"
    component="a"
    target="_blank"
    style={{ width: "180px", height: "240px" }} // Adjust these values to get your desired card size
  >
    <Card.Section>
      <Image src={movie.image} height={160} alt={movie.title} />
    </Card.Section>

    <Text weight={500} size="lg" mt="md">
      {movie.title}
    </Text>

    <Text mt="xs" color="dimmed" size="sm">
      {movie.description}
    </Text>
  </Card>
);

export default MovieCard;
