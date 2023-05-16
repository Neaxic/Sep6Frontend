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
} from "@mantine/core";
import MovieCover from "../assets/movieCover.jpg";

export interface MovieScreenProps {
  //Props goes here
}

export const MovieScreen = ({ ...props }: MovieScreenProps) => {
  let { isbn } = useParams();

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
          <Flex align={"center"} justify={"space-between"}>
            <Title size={42}>The Shawshank Redemption</Title>
            <Rating defaultValue={4.5} size="lg" fractions={2} readOnly />
          </Flex>

          <div style={{ display: "flex", gap: "10px" }}>
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
    </div>
  );
};
