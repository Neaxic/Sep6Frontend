import { ReactNode } from "react";
import { JsxElement } from "typescript";
import { Header } from "./Header";

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
      <Header></Header>
      <div>{children}</div>
    </div>
  );
};
