import * as React from "react";
import { useState } from "react";

interface PageContextInterface {
  isDarkMode: boolean;
  handleClick: () => void;
}

export const PageContext = React.createContext<PageContextInterface>({
  isDarkMode: false,
  handleClick: () => {},
});

export const PageProvider = (props: any) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleClick = () => {
    setIsDarkMode((previousValue) => !previousValue);
  };

  return (
    <PageContext.Provider
      value={{
        isDarkMode,
        handleClick,
      }}
    >
      {props.children}
    </PageContext.Provider>
  );
};

export const usePageContext = () => React.useContext(PageContext);
