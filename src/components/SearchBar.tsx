import { useState } from "react";
import { Input } from "@mantine/core";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(query);
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
