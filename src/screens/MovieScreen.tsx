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
} from "@mantine/core";
import MovieCover from "../assets/movieCover.jpg";
import { Comment } from "../components/Comment";
import { IconBookmarkMinus, IconBookmarkPlus } from "@tabler/icons-react";

export interface MovieScreenProps {
  //Props goes here
}

export const MovieScreen = ({ ...props }: MovieScreenProps) => {
  let { isbn } = useParams();
  const [bookmarked, setBookmarked] = React.useState(false);

  return (
    <div style={{ marginTop: "125px" }} {...props}>
      <Flex>
        <Image
          maw={640}
          mx="auto"
          radius="md"
          src={MovieCover}
          alt="wolf of wall street"
        />
        <div style={{ width: "128px" }}></div>
        <div style={{ width: "100%" }}>
          <Flex justify={"space-between"}>
            <Text>ISBN: {isbn}</Text>
            <UnstyledButton onClick={() => setBookmarked(!bookmarked)}>
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
            <Title size={42}>The Shawshank Redemption</Title>
            <Rating defaultValue={4.5} size="lg" fractions={2} readOnly />
          </Flex>

          <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
            <Badge>Horror</Badge>
            <Badge>Idk</Badge>
            <Badge>True story</Badge>
            <Badge>Realistic</Badge>
          </div>

          <Flex mt="md">
            <Text>
              Chronicles the experiences of a formerly successful banker as a
              prisoner in the gloomy jailhouse of Shawshank after being found
              guilty of a crime he did not commit. The film portrays the man's
              unique way of dealing with his new, torturous life; along the way
              he befriends a number of fellow prisoners, most notably a wise
              long-term inmate named Red.—J-S-Golden
            </Text>
          </Flex>

          <div style={{ marginTop: "64px" }}>
            <Accordion>
              <Accordion.Item value="customization">
                <Accordion.Control>Directors</Accordion.Control>
                <Accordion.Panel>
                  Colors, fonts, shadows and many other parts are customizable
                  to fit your design needs
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item value="flexibility">
                <Accordion.Control>Writers</Accordion.Control>
                <Accordion.Panel>
                  Configure components appearance and behavior with vast amount
                  of settings or overwrite any part of component styles
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item value="focus-ring">
                <Accordion.Control>Actors</Accordion.Control>
                <Accordion.Panel>
                  With new :focus-visible pseudo-class focus ring appears only
                  when user navigates with keyboard
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>
      </Flex>

      <div style={{ marginTop: "64px" }}>
        <Title size={42}>Comments</Title>
        <Flex justify={"center"} direction={"column"} gap={64} mt={16} mb={128}>
          <div></div>

          <div style={{}}>
            <Comment
              postedAt="17 February 2021"
              rating={3.5}
              body="It is no wonder that the film has such a high rating, it is quite literally breathtaking. What can I say that hasn't said before? Not much, it's the story, the acting, the premise, but most of all, this movie is about how it makes you feel. Sometimes you watch a film, and can't remember it days later, this film loves with you, once you've seen it, you don't forget.
            The ultimate story of friendship, of hope, and of life, and overcoming adversity.
            I understand why so many class this as the best film of all time, it isn't mine, but I get it. If you haven't seen it, or haven't seen it for some time, you need to watch it, it's"
              author={{ name: "Sleepin_Dragon", image: "lol" }}
            />
          </div>
          <div style={{}}>
            <Comment
              postedAt="17 February 2021"
              rating={1}
              body="It is no wonder that the film has such a high rating, it is quite literally breathtaking. What can I say that hasn't said before? Not much, it's the story, the acting, the premise, but most of all, this movie is about how it makes you feel. Sometimes you watch a film, and can't remember it days later, this film loves with you, once you've seen it, you don't forget.
            The ultimate story of friendship, of hope, and of life, and overcoming adversity.
            I understand why so many class this as the best film of all time, it isn't mine, but I get it. If you haven't seen it, or haven't seen it for some time, you need to watch it, it's"
              author={{ name: "Sleepin_Dragon", image: "lol" }}
            />
          </div>
        </Flex>
      </div>
    </div>
  );
};
