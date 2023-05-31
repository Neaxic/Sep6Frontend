import { Select } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useMovieContext } from "../contexts/MovieContext";

function GenreListPopover() {
  const navigate = useNavigate();
  const { genres } = useMovieContext();
  const [value, setValue] = useState<string | null>(null);

  React.useEffect(() => {
    if (value) {
      console.log(value);
      navigate(`/catagory/${value}`);
    }
  }, [navigate, value]);

  return (
    <>
      <Select
        style={{ zIndex: 1000, position: "absolute" }}
        placeholder="Pick one"
        data={genres.map((genre) => {
          return { label: genre.name, value: genre.id.toString() };
        })}
        value={value}
        onChange={setValue}
      />
    </>
  );
}

export default GenreListPopover;
