import { Text, Card, Button, Flex, UnstyledButton } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { useUserContext } from "../contexts/UserContext";
import { UserCardImage } from "../components/UserCardImage";
import { Link, useParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { useCallback, useEffect, useState } from "react";
import { IUser, IUserBookmarks, IUserReview } from "../misc/types";
import {
  GetAllBookMarksByUserID,
  ReviewByUserId,
  getUserByUserId,
} from "../api/TMDBMovie";

export interface ProfileScreenProps {
  // Props goes here
}

export const ProfileScreen = ({ ...props }: ProfileScreenProps) => {
  const { id } = useParams();
  const { userReviews, userData, userBookmarks } = useUserContext();

  const [personBookmarks, setPersonBookmarks] = useState<IUserBookmarks[]>([]);
  const [personReviews, setPersonReviews] = useState<IUserReview[]>([]);
  const [personData, setPersonData] = useState<IUser>();

  //Persondata = en anden end en selv - ie. ikke userData.
  const fetchPersonData = useCallback(async () => {
    //fetch user data
    //Api calls burde nok ikke være her, men nu er det her
    if (id) {
      const BookmarkData = await GetAllBookMarksByUserID(+id);
      if (BookmarkData) {
        setPersonBookmarks(BookmarkData);
      }

      const userData = await getUserByUserId(+id);
      if (userData) {
        setPersonData(userData);
      }

      const reviewData = await ReviewByUserId(+id);
      if (reviewData) {
        setPersonReviews(reviewData);
      }
    }
  }, [id]);

  useEffect(() => {
    fetchPersonData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

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
                  name={
                    !id && !personData
                      ? userData?.username!
                      : personData?.username!
                  }
                  role={
                    !id && !personData
                      ? userData?.isAdmin
                        ? "Admin"
                        : "User"
                      : personData?.isAdmin
                      ? "Admin"
                      : "User"
                  }
                  stats={[
                    {
                      label: "Reviews",
                      value:
                        !id && !personData
                          ? userReviews.length.toString()
                          : personReviews.length.toString(),
                    },
                    {
                      label: "Bookmarks",
                      value:
                        !id && !personData
                          ? userBookmarks.length.toString()
                          : personBookmarks.length.toString(),
                    },
                  ]}
                />
              </Flex>
            </div>
            <div style={{ width: "60%" }}>
              {/* RIGHT SIDE STATS */}
              <div>
                <Text align="left" variant="h1" size={24} weight={900}>
                  {!id && !personData ? (
                    <>Your movie Reviews</>
                  ) : (
                    <>{personData?.username}'s movie Reviews</>
                  )}
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
                  {id && personReviews
                    ? personReviews.map((film, index) => (
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
                                src={
                                  "https://image.tmdb.org/t/p/w220_and_h330_face/" +
                                  film.image
                                }
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
                            {film.comment && <Text>{film.comment}</Text>}
                            <Text
                              variant="h5"
                              color="gray"
                            >{`Rating: ${film.rating}`}</Text>
                            {id && !personData && (
                              <Button size="sm">Rediger</Button>
                            )}
                          </Card>
                        </Carousel.Slide>
                      ))
                    : userReviews &&
                      userReviews.map((film, index) => (
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
                                src={
                                  "https://image.tmdb.org/t/p/w220_and_h330_face/" +
                                  film.image
                                }
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
                            <Text
                              variant="h3"
                              component={Link}
                              to={`/movie/${film.movie_id}`}
                            >
                              {film.title}
                            </Text>
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
                  {!id && !personData ? (
                    <>Your Bookmarks</>
                  ) : (
                    <>{personData?.username}'s Bookmarks</>
                  )}
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
                  {id && personBookmarks
                    ? personBookmarks.map((film, index) => (
                        <Carousel.Slide>
                          <UnstyledButton
                            component={Link}
                            to={`/movie/${film.id}`}
                          >
                            <MovieCard
                              movie={{
                                id: film.id,
                                image:
                                  "https://image.tmdb.org/t/p/w220_and_h330_face" +
                                  film.imageString,
                                title: film.title,
                                height: "320",
                                description: ``,
                                genreID: 1,
                              }}
                            />
                          </UnstyledButton>
                        </Carousel.Slide>
                      ))
                    : userBookmarks.map((film, index) => (
                        <Carousel.Slide>
                          <UnstyledButton
                            component={Link}
                            to={`/movie/${film.id}`}
                          >
                            <MovieCard
                              movie={{
                                id: film.id,
                                image:
                                  "https://image.tmdb.org/t/p/w220_and_h330_face" +
                                  film.imageString,
                                title: film.title,
                                height: "320",
                                description: ``,
                                genreID: 1,
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
