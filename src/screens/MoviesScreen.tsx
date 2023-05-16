import * as React from "react";
import { TableReviews } from "../components/TableReviews";
import { Title } from "@mantine/core";

export interface MoviesScreenProps {
  //Props goes here
}

export const MoviesScreen = ({ ...props }: MoviesScreenProps) => {
  return (
    <div style={{ marginTop: "64px" }} {...props}>
      <Title mb="md">All movies</Title>
      <TableReviews
        data={[
          {
            title: "The wolf of wall street",
            author: "A guy",
            year: 2002,
            reviews: 2.5,
            isbn: "20",
          },
          {
            title: "To Kill a Mockingbird",
            author: "Harper Lee",
            year: 1960,
            reviews: 4.8,
            isbn: "20",
          },
          {
            title: "Pride and Prejudice",
            author: "Jane Austen",
            year: 1813,
            reviews: 4.5,
            isbn: "20",
          },
          {
            title: "The Great Gatsby",
            author: "F. Scott Fitzgerald",
            year: 1925,
            reviews: 4.2,
            isbn: "20",
          },
          {
            title: "1984",
            author: "George Orwell",
            year: 1949,
            reviews: 4.7,
            isbn: "20",
          },
          {
            title: "The Catcher in the Rye",
            author: "J.D. Salinger",
            year: 1951,
            reviews: 4.1,
            isbn: "20",
          },
        ]}
      ></TableReviews>
    </div>
  );
};
