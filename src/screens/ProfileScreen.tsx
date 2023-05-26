import { Text, Card, Button, Flex, UnstyledButton } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { useUserContext } from "../contexts/UserContext";
import { UserCardImage } from "../components/UserCardImage";
import { Link } from "react-router-dom";
import MovieCard from "../components/MovieCard";

export interface ProfileScreenProps {
  // Props goes here
}

export const ProfileScreen = ({ ...props }: ProfileScreenProps) => {
  const { userReviews, userData, userBookmarks } = useUserContext();

  return (
    <>
      <div style={{ marginTop: "56px" }}>
        <div>
          <Flex>
            <div style={{ width: "40%" }}>
              <Flex direction={"column"} align={"center"}>
                {/* LEFT SIDE USER STUFF */}
                <UserCardImage
                  avatar="{IMDB_Logo_2016}"
                  name={userData?.username!}
                  role={userData?.isAdmin ? "Admin" : "User"}
                  stats={[
                    { label: "Followers", value: "231" },
                    { label: "Following", value: "231" },
                    { label: "Reviews", value: "2.31k" },
                    { label: "Bookmarks", value: "22" },
                    { label: "Join date", value: "12/12/12" },
                  ]}
                />
              </Flex>
            </div>
            <div style={{ width: "60%" }}>
              {/* RIGHT SIDE STATS */}
              <div>
                <Text align="left" variant="h1" size={24} weight={900}>
                  Movie Reviews
                </Text>
                <Carousel
                  withIndicators
                  height={400}
                  slideSize="25%"
                  loop
                  align="start"
                  breakpoints={[
                    { maxWidth: "md", slideSize: "50%" },
                    { maxWidth: "sm", slideSize: "100%", slideGap: 0 },
                  ]}
                >
                  {userReviews.map((film, index) => (
                    <Carousel.Slide>
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
                            src={film.movieSrc}
                            alt={film.movieTitle}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              objectPosition: "center",
                              borderRadius: "50%",
                            }}
                          />
                        </div>
                        <Text variant="h3">{film.movieTitle}</Text>
                        {film.comment && <Text>{film.comment}</Text>}
                        <Text
                          variant="h5"
                          color="gray"
                        >{`Rating: ${film.rating}`}</Text>
                        <Button size="sm">Rediger</Button>
                      </Card>
                    </Carousel.Slide>
                  ))}
                </Carousel>{" "}
              </div>
              <div>
                <Text align="left" variant="h1" size={24} weight={900}>
                  Bookmarks
                </Text>
                <Carousel
                  withIndicators
                  height={400}
                  slideSize="25%"
                  loop
                  align="start"
                  breakpoints={[
                    { maxWidth: "md", slideSize: "50%" },
                    { maxWidth: "sm", slideSize: "100%", slideGap: 0 },
                  ]}
                >
                  {userBookmarks.map((film, index) => (
                    <Carousel.Slide>
                      <UnstyledButton component={Link} to={`/movie/${film.id}`}>
                        <MovieCard
                          movie={{
                            id: film.id,
                            image:
                              "https://image.tmdb.org/t/p/w220_and_h330_face" +
                              film.imageString,
                            title: film.title,
                            height: "320",
                            description: ``,
                            genreID: 1, // Assuming genreID is required for your MovieCard component.
                          }}
                        />
                      </UnstyledButton>
                    </Carousel.Slide>
                  ))}
                </Carousel>{" "}
              </div>
            </div>
          </Flex>
        </div>
      </div>
    </>
  );
};
