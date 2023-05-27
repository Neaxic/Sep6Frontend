import { useState } from "react";
import { Input } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { SearchMovieByName } from "../api/TMDBMovie";

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(query);

    const movieData: IMovieData[] = await SearchMovieByName(query);
    if (movieData.length > 0) {
      navigate(`/movie/${movieData[0].id}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        placeholder="Search..."
        value={query}
        onChange={(event) => setQuery(event.currentTarget.value)}
      />
    </form>
  );
};

export default SearchBar;
