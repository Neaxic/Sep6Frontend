import * as React from "react";
import { useParams } from "react-router-dom";
import { Text } from "@mantine/core";

export interface MovieScreenProps {
  //Props goes here
}

export const MovieScreen = ({ ...props }: MovieScreenProps) => {
  let { title } = useParams();

  return (
    <div {...props}>
      <Text>{title}</Text>
    </div>
  );
};
