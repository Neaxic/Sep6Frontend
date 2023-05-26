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
} from "@mantine/core";
import { Comment } from "../components/Comment";
import { IconBookmarkMinus, IconBookmarkPlus } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { ReviewByMovieId, fetchMovie, deleteBookmark } from "../api/TMDBMovie";
import { IMovie, IReview } from "../misc/types";
import { useUserContext } from "../contexts/UserContext";

export interface MovieScreenProps {
  //Props goes here
}

export const MovieScreen = ({ ...props }: MovieScreenProps) => {
  let { isbn } = useParams();
  const { postBookmark, userBookmarks, userData } = useUserContext();
  const [bookmarked, setBookmarked] = React.useState(false);
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

      form.reset();
    }
  };

  const featchingData = React.useCallback(async () => {
    if (isbn) {
      const movieOBJ = (await fetchMovie(isbn)) as IMovie;
      setMovie(movieOBJ);

      const reviews = await ReviewByMovieId(+isbn);
      setReviews(reviews);
    }
  }, [isbn]);

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
  }, [bookmarked, movie, postBookmark]);

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
  }, []);

  React.useEffect(() => {
    checkBookmarked();
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
                  <Accordion.Item value="customization">
                    <Accordion.Control>Directors</Accordion.Control>
                    <Accordion.Panel>
                      Colors, fonts, shadows and many other parts are
                      customizable to fit your design needs
                    </Accordion.Panel>
                  </Accordion.Item>

                  <Accordion.Item value="flexibility">
                    <Accordion.Control>Writers</Accordion.Control>
                    <Accordion.Panel>
                      Configure components appearance and behavior with vast
                      amount of settings or overwrite any part of component
                      styles
                    </Accordion.Panel>
                  </Accordion.Item>

                  <Accordion.Item value="focus-ring">
                    <Accordion.Control>Actors</Accordion.Control>
                    <Accordion.Panel>
                      With new :focus-visible pseudo-class focus ring appears
                      only when user navigates with keyboard
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

              {reviews.map((review, index) => (
                <Comment
                  key={index}
                  postedAt={review.date}
                  rating={review.rating}
                  body={review.comment}
                  author={{ name: review.user, image: "lol" }}
                />
              ))}
            </Flex>
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};
