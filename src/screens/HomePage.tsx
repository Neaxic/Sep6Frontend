import { Button, Card } from "antd";
import { Page } from "../components/Page";
import { usePageContext } from "../contexts/PageContext";

interface HomeProps {}

export const HomePage = ({}: HomeProps) => {
  const { handleClick, isDarkMode } = usePageContext();

  return (
    <Page>
      <Button>lol</Button>
      <div className="App">
        <header className="App-header">
          <Button></Button>
          <Card style={{ width: "max-content" }}>
            <Button onClick={handleClick}>
              Change Theme to {isDarkMode ? "Light" : "Dark"}
            </Button>
          </Card>
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    </Page>
  );
};
