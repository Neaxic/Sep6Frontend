import { Table, Anchor, ScrollArea, Rating } from "@mantine/core";

interface TableReviewsProps {
  data: {
    title: string;
    author: string;
    year: number;
    reviews: number;
  }[];
}

export function TableReviews({ data }: TableReviewsProps) {
  const rows = data.map((row) => {
    return (
      <tr key={row.title}>
        <td>
          <Anchor component="button" fz="sm">
            {row.title}
          </Anchor>
        </td>
        <td>{row.year}</td>
        <td>
          <Anchor component="button" fz="sm">
            {row.author}
          </Anchor>
        </td>
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
