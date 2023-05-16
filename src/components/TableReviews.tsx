import {
  Table,
  Anchor,
  ScrollArea,
  Rating,
  UnstyledButton,
} from "@mantine/core";
import { Link } from "react-router-dom";

interface TableReviewsProps {
  data: {
    title: string;
    author: string;
    year: number;
    reviews: number;
    isbn: string;
  }[];
}

export function TableReviews({ data }: TableReviewsProps) {
  const rows = data.map((row) => {
    return (
      <tr key={row.title}>
        <td>
          <UnstyledButton component={Link} to={`/movie/${row.isbn}`}>
            <Anchor component="button" fz="sm">
              {row.title}
            </Anchor>
          </UnstyledButton>
        </td>
        <td>{row.year}</td>
        <td>{row.author}</td>
        <td>{Intl.NumberFormat().format(2)}</td>
        <td>
          <Rating value={row.reviews} fractions={2} readOnly></Rating>
        </td>
      </tr>
    );
  });

  return (
    <ScrollArea>
      <Table sx={{ minWidth: 800 }} verticalSpacing="xs">
        <thead>
          <tr>
            <th>Book title</th>
            <th>Year</th>
            <th>Author</th>
            <th>Reviews</th>
            <th>Reviews distribution</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}
