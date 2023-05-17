import React from "react";
import { Avatar, Text, Card, Center, Button } from "@mantine/core";

export interface ProfileScreenProps {
  // Props går her
}

export const ProfileScreen = ({ ...props }: ProfileScreenProps) => {
  const films = [
    {
      title: "Harry Potter",
      kommentar: "Lort",
      rating: Math.floor(Math.random() * 5),
      image:
        "http://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/neutral-face.png",
    },
    {
      title: "Star Wars",
      rating: Math.floor(Math.random() * 5),
      image:
        "http://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/neutral-face.png",
    },
    {
      title: "The Lord of the Ring",
      rating: Math.floor(Math.random() * 5),
      image:
        "http://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/neutral-face.png",
    },
    {
      title: "Jurassic Park",
      kommentar: "Lort",
      rating: Math.floor(Math.random() * 5),
      image:
        "http://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/neutral-face.png",
    },
  ];

  //const handleEdit = (film) => {
  // Logik for at håndtere redigeringen af en film
  //console.log("Rediger", film);
  //};

  return (
    <Card shadow="sm" padding="lg">
      <Center>
        <Avatar size="xl" src="profil-billede.jpg" alt="Profilbillede" />
      </Center>

      <Text align="center" variant="h1">
        John Doe
      </Text>
      <Text align="center" variant="h4" color="gray">
        Webudvikler
      </Text>

      <div
        style={{
          marginTop: "2rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "1rem",
        }}
      >
        {films.map((film, index) => (
          <Card
            key={index}
            shadow="sm"
            padding="md"
            style={{ border: "1px solid #2c3f48", borderRadius: "4px" }}
          >
            <img
              src={film.image}
              alt={film.title}
              style={{
                width: "100%",
                objectFit: "cover",
                marginBottom: "1rem",
                borderRadius: "50%",
              }}
            />

            <Text variant="h3">{film.title}</Text>
            {film.kommentar && <Text>{film.kommentar}</Text>}
            <Text variant="h5" color="gray">{`Rating: ${film.rating}`}</Text>
            <Button size="sm">Rediger</Button>
          </Card>
        ))}
      </div>
    </Card>
  );
};
