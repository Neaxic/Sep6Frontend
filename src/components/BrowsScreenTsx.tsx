import { useDisclosure } from "@mantine/hooks";
import { Popover, Button, Paper, Col, Group, Text } from "@mantine/core";
import { GenreData } from "../api/IGenreData";
import { fetchGenre } from "../api/GetGerneList";
import { Link, useNavigate } from "react-router-dom";
import React from "react";

function GenreListPopover() {
  const [opened, { open, close }] = useDisclosure(false);
  const [genreData, setGenreData] = React.useState<GenreData[]>([]);

  React.useEffect(() => {
    fetchData();
  }, []);
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const res = await fetchGenre();
      console.log("Response from API:", res); // This will log the response from your API

      // Check if the response is an array
      if (Array.isArray(res)) {
        setGenreData(res);
      } else {
        console.error(
          "Unexpected data structure. Expected an array, received:",
          res
        );
      }
    } catch (error) {
      console.error("Error fetching data from API:", error); // This will log any error that occurs when fetching from your API
    }
  };

  const handleClick = (genreName: string) => {
    close(); // Close the popover
    console.log(`You clicked on genre: ${genreName}`);
    navigate(`/Browser/${genreName}`);
  };

  return (
    <Popover
      width={200}
      position="bottom"
      withArrow
      shadow="md"
      opened={opened}
    >
      <Popover.Target>
        <Button onMouseEnter={open}>Hover to see genres</Button>
      </Popover.Target>
      <Popover.Dropdown>
        {genreData.map((genre) => (
          <Group key={genre.id} onClick={() => handleClick(genre.name)}>
            <button>{genre.name}</button>
          </Group>
        ))}
      </Popover.Dropdown>
    </Popover>
  );
}

export default GenreListPopover;
