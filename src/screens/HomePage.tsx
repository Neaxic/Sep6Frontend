import { CardsCarousel } from "../components/CardsCarousel";
import { HeroText } from "../components/HeroText";
import { Page } from "../components/Page";

export const HomePage = () => {
  return (
    <div>
      <div style={{ marginTop: "128px" }}>
        <HeroText></HeroText>
      </div>
      <div style={{ marginTop: "64px" }}>
        <CardsCarousel></CardsCarousel>
      </div>
    </div>
  );
};
