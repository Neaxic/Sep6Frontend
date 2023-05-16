import { ReactNode } from "react";
import { HeaderMenu } from "./HeaderMenu";

interface PageProps {
  title?: string;
  subtitle?: string;
  children?: ReactNode;
}

export const Page = ({
  title = "A title",
  subtitle = "A subtitle",
  children,
}: PageProps) => {
  return (
    <div>
      <HeaderMenu></HeaderMenu>
      <div>{children}</div>
    </div>
  );
};
