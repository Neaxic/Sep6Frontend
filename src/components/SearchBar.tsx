import { useState } from "react";
import { Card, Input, UnstyledButton } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { SearchMovieByName } from "../api/TMDBMovie";
import { Link } from "react-router-dom";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

interface IMovieData {
  id: number;
  title: string;
  imageString: string;
  rating: number;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [movieData, setMovieData] = useState<IMovieData[]>([]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(query);

    const data: IMovieData[] = await SearchMovieByName(query);
    setMovieData(data);
    if (data.length === 1) {
      navigate(`/movie/${data[0].id}`);
    }
  };

  return (
    <form onChange={handleSubmit}>
      <Input
        placeholder="Search..."
        value={query}
        onChange={(event) => setQuery(event.currentTarget.value)}
      />
      {movieData.length > 1 && (
        <Card
          withBorder
          style={{
            display: "flex",
            flexDirection: "column",
            position: "absolute",
            zIndex: 2000,
          }}
        >
          {movieData.map((movie) => (
            <UnstyledButton
              component={Link}
              key={movie.id}
              to={`/movie/${movie.id}`}
            >
              {movie.title}
            </UnstyledButton>
          ))}
        </Card>
      )}
    </form>
  );
};

export default SearchBar;
