import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  Paper,
  Box,
  TextField,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography,
  Button,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { helpLink } from "@displaygecko/dg-modules";

const mapState = (state) => ({
  helpLinks: helpLink.helpLinksSelector(state),
});

const mapDispatch = {
  getHelpLinks: helpLink.getHelpLinks,
  createHelpLink: helpLink.createHelpLink,
  updateHelpLink: helpLink.updateHelpLink,
};

function HelpDeskCMS({
  helpLinks,
  getHelpLinks,
  createHelpLink,
  updateHelpLink,
}) {
  const [selectedPage, selectPage] = useState(false);
  const [state, setState] = useState(
    helpLink.HELP_SUPPORT_PAGES.reduce((m, page) => {
      m[page.pageIndex] = {
        pageIndex: page.pageIndex,
        articleUrl: "",
        articleTitle: "",
        articleDescription: "",
      };
      return m;
    }, {})
  );

  useEffect(() => {
    const state = helpLink.HELP_SUPPORT_PAGES.reduce((m, page) => {
      const helpLink = helpLinks.find(
        (item) => item.pageIndex === page.pageIndex
      );

      if (helpLink) {
        m[page.pageIndex] = {
          articleUrl: "",
          articleTitle: "",
          articleDescription: "",
          ...helpLink,
        };
      } else {
        m[page.pageIndex] = {
          pageIndex: page.pageIndex,
          articleUrl: "",
          articleTitle: "",
          articleDescription: "",
        };
      }
      return m;
    }, {});
    setState(state);
  }, [helpLinks]);

  useEffect(() => {
    getHelpLinks();
  }, [getHelpLinks]);

  const handleExpandPage = (pageIndex) => (_, isExpanded) => {
    selectPage(isExpanded ? pageIndex : false);
  };

  const handleSaveHelpLink = (pageIndex) => () => {
    const helpLink = helpLinks.find(
      (helpLink) => helpLink.pageIndex === pageIndex
    );
    if (helpLink) {
      updateHelpLink(state[pageIndex]);
    } else {
      createHelpLink(state[pageIndex]);
    }
  };

  const handleChangeHelpLink = (pageIndex) => (e) => {
    setState({
      ...state,
      [pageIndex]: {
        ...state[pageIndex],
        [e.target.name]: e.target.value,
      },
    });
  };

  return (
    <Box mt={2}>
      <Paper>
        <Box pl={2} pt={2}>
          <Typography>Help Links</Typography>
        </Box>
        <Box p={2}>
          {helpLink.HELP_SUPPORT_PAGES.map((page, index) => (
            <ExpansionPanel
              key={index}
              expanded={selectedPage === page.pageIndex}
              onChange={handleExpandPage(page.pageIndex)}
            >
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                id={page.pageIndex}
              >
                <Typography>{page.title} Page</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Box display="flex" flexDirection="column" width="100%">
                  <TextField
                    name="articleUrl"
                    variant="outlined"
                    size="small"
                    label="Article URL"
                    value={state[page.pageIndex].articleUrl}
                    onChange={handleChangeHelpLink(page.pageIndex)}
                    fullWidth
                  />
                  <Box mt={1} />
                  <TextField
                    name="articleTitle"
                    variant="outlined"
                    size="small"
                    label="Article Title"
                    value={state[page.pageIndex].articleTitle}
                    onChange={handleChangeHelpLink(page.pageIndex)}
                    fullWidth
                  />
                  <Box mt={1} />
                  <TextField
                    name="articleDescription"
                    variant="outlined"
                    size="small"
                    label="Article Content"
                    value={state[page.pageIndex].articleDescription}
                    onChange={handleChangeHelpLink(page.pageIndex)}
                    fullWidth
                    multiline
                    rows={2}
                    rowsMax={5}
                  />
                  <Box mt={1} />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSaveHelpLink(page.pageIndex)}
                  >
                    Save
                  </Button>
                </Box>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          ))}
        </Box>
      </Paper>
    </Box>
  );
}

export default connect(mapState, mapDispatch)(HelpDeskCMS);
