import * as React from "react";
import { useParams } from "react-router-dom";
import {
  Flex,
  Rating,
  Image,
  Text,
  Title,
  Accordion,
  Badge,
  UnstyledButton,
  Textarea,
  Button,
  Card,
  Avatar,
} from "@mantine/core";
import { Comment } from "../components/Comment";
import { IconBookmarkMinus, IconBookmarkPlus } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { useUserContext } from "../contexts/UserContext";
import {
  fetchMovie,
  ReviewByMovieId,
  deleteBookmark,
  fetchMovieCredits,
} from "../api/TMDBMovie";
import { ICast, IMovie, IReview } from "../misc/types";

export interface MovieScreenProps {
  //Props goes here
}

export const MovieScreen = ({ ...props }: MovieScreenProps) => {
  let { isbn } = useParams();
  const { postBookmark, userBookmarks, userData } = useUserContext();
  const [bookmarked, setBookmarked] = React.useState(false);
  const { postReview } = useUserContext();
  const [movie, setMovie] = React.useState<IMovie>();
  const [reviews, setReviews] = React.useState<IReview[]>([]);
  const form = useForm({
    initialValues: {
      rating: 2.5,
      comment: "",
    },
    validate: {
      rating: (val) => (val > 0 && val <= 5 ? null : "Invalid rating"),
      comment: (val) =>
        val.length <= 6 ? "Comment should include at least 6 characters" : null,
    },
  });

  const handleFormSubmit = () => {
    form.validate();
    if (form.isValid()) {
      console.log("valid");
      //Smid det til apien
      createReviews();

      form.reset();
    }
  };

  const featchingData = React.useCallback(async () => {
    if (isbn) {
      const movieOBJ = (await fetchMovie(isbn)) as IMovie;

      //Splitter moviecast obj ud, da der både er cast og crew i samme obj
      const movieCast = (await fetchMovieCredits(+isbn)) as unknown;
      const cast = (movieCast as any).cast as ICast[];
      const crew = (movieCast as any).crew as ICast[];

      const tmp = movieOBJ;
      tmp.cast = cast;
      tmp.crew = crew;

      setMovie(tmp);

      const reviews = await ReviewByMovieId(+isbn);
      setReviews(reviews);
    }
  }, [isbn]);

  const createReviews = React.useCallback(async () => {
    if (movie && movie.id && movie.title && movie.poster_path) {
      await postReview(
        form.values.comment,
        form.values.rating,
        movie.id,
        movie.title,
        movie.poster_path
      );
    }
  }, [form.values.comment, form.values.rating, movie, postReview]);

  const deleteBookmarkById = React.useCallback(async () => {
    if (movie && movie.id && bookmarked && userData?.userId) {
      const response = await deleteBookmark(userData?.userId, +movie.id);
      console.log(response);
      if (response) {
        setBookmarked(!bookmarked);
      }
    }
  }, [bookmarked, movie, userData?.userId]);

  const registerBookmark = React.useCallback(async () => {
    if (movie && movie.id && movie.title && movie.poster_path) {
      if (!bookmarked) {
        const response = await postBookmark(
          movie.id,
          movie.title,
          movie.poster_path
        );
        if (response) {
          setBookmarked(!bookmarked);
        }
      } else {
        deleteBookmarkById();
      }
    }
  }, [bookmarked, deleteBookmarkById, movie, postBookmark]);

  const checkBookmarked = React.useCallback(() => {
    if (userBookmarks && movie && movie.id && userBookmarks.length > 0) {
      userBookmarks.forEach((bookmark) => {
        if (bookmark.id === movie.id) {
          setBookmarked(true);
        }
      });
    }
  }, [movie, userBookmarks]);

  React.useEffect(() => {
    featchingData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isbn]);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  React.useEffect(() => {
    checkBookmarked();
    console.log(movie);
  }, [userBookmarks, movie, checkBookmarked]);

  return (
    <div style={{ marginTop: "125px" }} {...props}>
      {movie ? (
        <>
          <Flex>
            <Image
              maw={640}
              mx="auto"
              radius="md"
              src={
                "https://image.tmdb.org/t/p/w220_and_h330_face/" +
                movie?.poster_path
              }
              alt="wolf of wall street"
            />
            <div style={{ width: "128px" }}></div>
            <div style={{ width: "100%" }}>
              <Flex justify={"space-between"}>
                <UnstyledButton onClick={() => registerBookmark()}>
                  {!bookmarked ? (
                    <IconBookmarkPlus size={32}></IconBookmarkPlus>
                  ) : (
                    <IconBookmarkMinus
                      size={32}
                      color={"#e69c27"}
                    ></IconBookmarkMinus>
                  )}
                </UnstyledButton>
              </Flex>
              <Flex align={"center"} justify={"space-between"}>
                <Title size={42}>{movie?.title}</Title>
                <Rating defaultValue={4.5} size="lg" fractions={2} readOnly />
              </Flex>

              <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                {movie.genres && (
                  <>
                    {movie?.genres.map((genre) => (
                      <Badge key={genre.id}>{genre.name}</Badge>
                    ))}
                  </>
                )}
              </div>

              <Flex mt="md" direction={"column"}>
                <Flex direction={"row"}>
                  <Text color="gray">Release date</Text>
                  <Text color="gray">: {movie.release_date}</Text>
                </Flex>
                <Text>{movie?.overview}</Text>
              </Flex>

              <div style={{ marginTop: "64px" }}>
                <Accordion>
                  <Accordion.Item value="production">
                    <Accordion.Control>Production</Accordion.Control>
                    <Accordion.Panel>
                      Revenue:
                      {movie.revenue && formatter.format(+movie.revenue)} <br />
                      Runtime: {movie.runtime} minutes <br />
                      Production companies;
                      <div>
                        {movie.production_companies?.map((company) => (
                          <div key={company.id}>
                            <img
                              style={{ width: "200px", height: "50px" }}
                              src={
                                "https://image.tmdb.org/t/p/original" +
                                company.logo_path
                              }
                              alt={company.name}
                            ></img>
                            {company.name}
                          </div>
                        ))}
                      </div>
                      <div>
                        Production countries;
                        {movie.production_countries?.map((country) => (
                          <div key={country.name}>
                            <img
                              style={{ width: "50px", height: "50px" }}
                              src={
                                "https://www.countryflags.io/" +
                                country.iso_3166_1 +
                                "/flat/64.png"
                              }
                              alt={country.name}
                            ></img>
                          </div>
                        ))}
                      </div>
                    </Accordion.Panel>
                  </Accordion.Item>

                  <Accordion.Item value="languages">
                    <Accordion.Control>Languages</Accordion.Control>
                    <Accordion.Panel>
                      Movie is spoken in;
                      {movie.spoken_languages?.map((language) => (
                        <div key={language.name}>
                          <img
                            style={{ width: "50px", height: "50px" }}
                            src={
                              "https://www.countryflags.io/" +
                              language.iso_639_1 +
                              "/flat/64.png"
                            }
                            alt={language.name}
                          ></img>
                          {language.name}
                        </div>
                      ))}
                    </Accordion.Panel>
                  </Accordion.Item>

                  <Accordion.Item value="cast">
                    <Accordion.Control>Cast</Accordion.Control>
                    <Accordion.Panel>
                      The following cast was in the movie;
                      {movie.cast?.map((cast) => (
                        <Card key={cast.name} style={{ margin: "20px 0px" }}>
                          <Flex>
                            <Avatar
                              src={
                                "https://image.tmdb.org/t/p/original" +
                                cast.profile_path
                              }
                            />
                            <div style={{ marginLeft: "20px" }}>
                              <div style={{ display: "flex" }}>
                                <Title size={"sm"}>{cast.name}</Title>
                                <Text ml={18}>as {cast.character}</Text>
                              </div>
                              <Text>{cast.known_for_department}</Text>
                            </div>
                          </Flex>
                        </Card>
                      ))}
                    </Accordion.Panel>
                  </Accordion.Item>

                  <Accordion.Item value="crew">
                    <Accordion.Control>Crew</Accordion.Control>
                    <Accordion.Panel>
                      The following crew was in the movie;
                      {movie.crew?.map((crew) => (
                        <Card key={crew.name} style={{ margin: "20px 0px" }}>
                          <Flex>
                            <Avatar
                              src={
                                "https://image.tmdb.org/t/p/original" +
                                crew.profile_path
                              }
                            />
                            <div style={{ marginLeft: "20px" }}>
                              <div style={{ display: "flex" }}>
                                <Title size={"sm"}>{crew.name}</Title>
                                <Text ml={18}>{crew.department}</Text>
                              </div>
                              <Text>{crew.job}</Text>
                            </div>
                          </Flex>
                        </Card>
                      ))}
                    </Accordion.Panel>
                  </Accordion.Item>
                </Accordion>
              </div>
            </div>
          </Flex>

          <div style={{ marginTop: "64px" }}>
            <Title size={42}>Comments</Title>
            <Flex
              justify={"center"}
              direction={"column"}
              gap={64}
              mt={16}
              mb={128}
            >
              <div>
                <form onSubmit={form.onSubmit(() => {})}>
                  <Flex justify={"space-between"}>
                    <Text size={"lg"}>Write your own review</Text>
                    <Rating
                      fractions={2}
                      defaultValue={2.5}
                      value={form.values.rating}
                      onChange={(event) => form.setFieldValue("rating", event)}
                      size="lg"
                    />
                  </Flex>
                  <Textarea
                    mt="md"
                    value={form.values.comment}
                    onChange={(event) =>
                      form.setFieldValue("comment", event.currentTarget.value)
                    }
                    error={
                      form.errors.comment &&
                      "Comment should include at least 6 characters"
                    }
                  ></Textarea>
                  <Flex justify={"flex-end"} mt="md">
                    <Button onClick={handleFormSubmit}>Send</Button>
                  </Flex>
                </form>
              </div>

              {reviews && (
                <>
                  {reviews.map((review, index) => (
                    <Comment
                      key={index}
                      postedAt={review.date}
                      rating={review.rating}
                      body={review.comment}
                      author={{ name: review.username, image: "lol" }}
                    />
                  ))}
                </>
              )}
            </Flex>
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};
