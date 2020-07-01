import React from "react";
import { Carousel } from "react-responsive-carousel";

import Screen from "./Screen";

function SlideScreens({ screenList }) {
  return (
    <Carousel
      autoPlay
      interval={10000}
      infiniteLoop
      showThumbs={false}
      showArrows={false}
      showIndicators={false}
      useKeyboardArrows
    >
      {screenList.map(screen => (
        <Screen key={screen.id} screenId={screen.id} />
      ))}
    </Carousel>
  );
}

export default SlideScreens;
