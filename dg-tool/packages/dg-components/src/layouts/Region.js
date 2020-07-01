import React from "react";
import Box from "@material-ui/core/Box";

import useStyles from "./region.styles";

function computeRegionSize(size) {
  const width = parseInt(size.width.replace("%", ""));
  const height = parseInt(size.height.replace("%", ""));

  return {
    width: Math.trunc((1920 * width) / 100),
    height: Math.trunc((1080 * height) / 100),
  };
}

function Region({ index, region, readOnly }) {
  const classes = useStyles({});
  const computedSize = computeRegionSize(region.size);
  const regionBackgroundColors = [
    { backgroundColor: "rgba(242, 116, 0.02, 0.2)" },
    { backgroundColor: "rgba(33, 217, 0.016, 0.2)" },
    { backgroundColor: "rgba(71, 149, 0.016, 0.2)" },
    { backgroundColor: "rgba(17, 115, 0.008, 0.2)" },
  ];

  return (
    <div
      style={{
        position: "absolute",
        ...region.size,
        ...region.styles,
        ...regionBackgroundColors[index]
      }}
    >
      <div
        data-tut="reactour_screen_editing_area"
        data-editable
        data-name={region.id}
        dangerouslySetInnerHTML={{ __html: region.html }}
      />
      {!readOnly && (
        <Box className={classes.regionTag} data-tut="reactour_screen_pixel_dimension">
          {`${computedSize.width}x${computedSize.height}`}
        </Box>
      )}
    </div>
  );
}

export default Region;
