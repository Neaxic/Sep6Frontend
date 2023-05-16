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
      <div style={{ marginLeft: "5%", marginRight: "5%", marginTop: "5%" }}>
        <div>{children}</div>
      </div>
    </div>
  );
};
