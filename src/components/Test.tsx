import { Button } from "@mantine/core";
import * as React from "react";

export interface TestProps {
  //Props goes here
}

export const Test = ({ ...props }: TestProps) => {
  return (
    <div {...props}>
      <Button>lol</Button>
    </div>
  );
};
