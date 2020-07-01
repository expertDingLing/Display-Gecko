import React, { useEffect, useState, useCallback } from "react";
import { connect } from "react-redux";
import Dock from "react-dock";
import { Box, Typography, IconButton, Link } from "@material-ui/core";
import { Clear as ClearIcon } from "@material-ui/icons";

import { helpLink as helpLinkModule } from "@displaygecko/dg-modules";

const duration = 200;
const dur = duration / 1000;
const transitions = ["left", "top", "width", "height"]
  .map((p) => `${p} ${dur}s cubic-bezier(0, 1.5, 0.5, 1)`)
  .join(",");

const mapState = (state) => ({
  currentPageIndex: helpLinkModule.currentPageIndexSelector(state),
  helpLinks: helpLinkModule.helpLinksSelector(state),
});

function HelpDock({ open, close, currentPageIndex, helpLinks, onRequestClose }) {
  const [helpLink, setHelpLink] = useState(null);
  useEffect(() => {
    setHelpLink(helpLinks.find((item) => item.pageIndex === currentPageIndex));
  }, [currentPageIndex, helpLinks]);

  return (
    <Dock
      position="right"
      isVisible={open}
      dimStyle={{ background: "rgba(0, 0, 100, 0.2)" }}
      dockStyle={{ transition: transitions }}
      dockHiddenStyle={{
        transition: [transitions, `opacity 0.01s linear ${dur}s`].join(","),
      }}
      onVisibleChange={onRequestClose}
    >
      {helpLink && (
        <Box display="flex" flexDirection="column" p={1}>
          <Box pt={6} display="flex" justifyContent="center">
            <Typography variant="h6">{helpLink.articleTitle}</Typography>
          </Box>
          <Box>
            <Typography variant="h6" dangerouslySetInnerHTML={{ __html: helpLink.articleDescription }}></Typography>
          </Box>
          <Box>
            <Link href={helpLink.articleUrl} target="_blank" rel="noopener">
              Learn More
            </Link>
          </Box>
          <Box position="absolute" right="10px" top="10px">
            <IconButton onClick={close}>
              <ClearIcon />
            </IconButton>
          </Box>
        </Box>
      )}
    </Dock>
  );
}

export default connect(mapState)(HelpDock);
