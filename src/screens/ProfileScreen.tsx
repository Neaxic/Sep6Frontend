import React, { useState } from "react";
import { Avatar, Text, Card, Center, Button, Slider } from "@mantine/core";
import { useHover } from "@mantine/hooks";

export interface ProfileScreenProps {
  // Props goes here
}

export const ProfileScreen = ({ ...props }: ProfileScreenProps) => {
  const films = [
    {
      title: "Harry Potter",
      kommentar: "Lort",
      rating: Math.floor(Math.random() * 5),
      image:
        "https://www.elgiganten.dk/image/dv_web_D180001002957408/DVDHP6DOC/harry-potter-og-halvblodsprinsen-dokumentar-dvd--pdp_zoom-3000.jpg",
    },
    {
      title: "Star Wars",
      rating: Math.floor(Math.random() * 5),
      image:
        "https://www.elgiganten.dk/image/dv_web_D1800010021291949/571132/star-wars-jedi-survivor-deluxe-edition-xbox-series-x--pdp_zoom-3000--pdp_main-960.jpg",
    },
    {
      title: "The Lord of the Rings",
      rating: Math.floor(Math.random() * 5),
      image:
        "https://m.media-amazon.com/images/I/51kfFS5-fnL._SY291_BO1,204,203,200_QL40_FMwebp_.jpg",
    },
    {
      title: "Jurassic Park",
      kommentar: "Lort",
      rating: Math.floor(Math.random() * 5),
      image:
        "https://www.elgiganten.dk/image/dv_web_D180001002295082/BDVDJURPARK13/jurassic-park-ultimate-trilogy-blu-ray--pdp_zoom-3000--pdp_main-960.jpg",
    },
  ];

  const { hovered, ref } = useHover();
  const [sliderValue, setSliderValue] = useState<number>(0);

  const handleSliderChange = (value: number) => {
    setSliderValue(value);
  };

  const startIndex = Math.floor(sliderValue / 50) * 2;
  const endIndex = startIndex + 2;
  const displayedFilms = films.slice(startIndex, endIndex);

  return (
    <Card shadow="sm" padding="lg">
      <Center>
        <Avatar size="xl" src="profil-billede.jpg" alt="Profilbillede" />
      </Center>

      <Text align="center" variant="h1">
        Username
      </Text>
      <Text align="center" variant="h4" color="gray">
        Gay andreas
      </Text>

      <div
        style={{
          marginTop: "2rem",
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        {displayedFilms.map((film, index) => (
          <Card
            key={index}
            shadow="sm"
            padding="md"
            style={{
              border: "1px solid #ccc",
              borderRadius: "4px",
              width: "250px",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "200px",
                marginBottom: "1rem",
                borderRadius: "50%",
                overflow: "hidden",
              }}
            >
              <img
                src={film.image}
                alt={film.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                  borderRadius: "50%",
                }}
              />
            </div>
            <Text variant="h3">{film.title}</Text>
            {film.kommentar && <Text>{film.kommentar}</Text>}
            <Text variant="h5" color="gray">{`Rating: ${film.rating}`}</Text>
            <Button size="sm">Rediger</Button>
          </Card>
        ))}
      </div>
      <Slider
        value={sliderValue}
        onChange={handleSliderChange}
        min={0}
        max={100}
        ref={ref}
        label={null}
        styles={{
          thumb: {
            transition: "opacity 150ms ease",
            opacity: hovered ? 1 : 0,
          },
          dragging: {
            opacity: 1,
          },
        }}
        style={{ marginTop: "2rem" }}
      />
    </Card>
  );
};
