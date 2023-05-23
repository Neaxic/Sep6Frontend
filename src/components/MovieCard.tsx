import React from "react";
import { Card, Image, Text, UnstyledButton } from "@mantine/core";
import { Link } from "react-router-dom";

interface Movie {
  id?: number;
  image: string;
  title: string;
  description: string;
  genreID: number;
}

const MovieCard: React.FC<{ movie: Movie }> = ({ movie }) => (
  <UnstyledButton component={Link} to={movie.id ? `../movie/${movie.id}` : ``}>
    <Card
      shadow="sm"
      padding="xl"
      component="a"
      target="_blank"
      style={{ width: "300px", height: "520px" }} // Adjust these values to get your desired card size
    >
      <Card.Section>
        <Image src={movie.image} height={430} alt={movie.title} />
      </Card.Section>

      <Text weight={500} size="lg" mt="md">
        {movie.title}
      </Text>

      <Text mt="xs" color="dimmed" size="sm">
        {movie.description}
      </Text>
    </Card>
  </UnstyledButton>
);

export default MovieCard;
