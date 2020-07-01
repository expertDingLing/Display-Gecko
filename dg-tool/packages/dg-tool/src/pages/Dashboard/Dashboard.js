import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Box, Paper, Grid, Typography, Tooltip } from "@material-ui/core";
import { Info as InfoIcon } from "@material-ui/icons";
import { DragDropContext } from "react-beautiful-dnd";
import Tour from 'reactour';

import {
  ScreenList,
  ScreenTemplateList,
  ConfirmationDialog,
} from "@displaygecko/dg-components";
import { template, screen, helpLink, tour } from "@displaygecko/dg-modules";

import { useToggle } from "../../helpers";

import useStyles from "./dashboard.styles";

const mapState = (state) => ({
  templateList: template.templateListSelector(state),
  screenList: screen.screenListSelector(state),
  dashboardTourOpen: tour.dashboardTourSelector(state),
});

const mapDispatch = {
  setCurrentPageIndex: helpLink.setCurrentPageIndex,
  getAllTemplates: template.getAllTemplates,
  getAllScreens: screen.getAllScreens,
  reorderScreens: screen.reorderScreens,
  createScreenFromTemplate: screen.createScreenFromTemplate,
  updateScreen: screen.updateScreen,
  deleteScreen: screen.deleteScreen,
  disableDashboardTour: tour.disableDashboardTour,
};

function Dashboard({
  templateList,
  screenList,
  dashboardTourOpen,
  setCurrentPageIndex,
  getAllTemplates,
  getAllScreens,
  reorderScreens,
  createScreenFromTemplate,
  updateScreen,
  deleteScreen,
  disableDashboardTour,
}) {
  const classes = useStyles({});

  const [confirmDialogOptions, setConfirmDialogOptions] = useState({});

  const {
    on: confirmDialogOpen,
    setOn: showConfirmDialog,
    setOff: closeConfirmDialog,
  } = useToggle();

  useEffect(() => {
    setCurrentPageIndex(helpLink.HELP_SUPPORT_PAGES[0].pageIndex);
  }, [setCurrentPageIndex]);

  useEffect(() => {
    getAllTemplates();
    getAllScreens();
  }, [getAllTemplates, getAllScreens]);

  const onDragEnd = useCallback(
    (result) => {
      const { source, destination } = result;

      if (!destination) {
        return;
      }

      switch (source.droppableId) {
        case destination.droppableId:
          reorderScreens(source.index, destination.index);
          break;
        case "screen-templates":
          createScreenFromTemplate(
            templateList[source.index],
            destination.index
          );
          break;
        default:
          break;
      }
    },
    [createScreenFromTemplate, reorderScreens, templateList]
  );

  const handleUpdateScreenName = useCallback(
    (screen, newTitle) => {
      updateScreen({
        id: screen.id,
        title: newTitle,
      });
    },
    [updateScreen]
  );

  const handleDeleteScreen = useCallback(
    (screen) => {
      const confirmDialogOptions = {
        title: "Delete Screen",
        contentText: "Are you sure that you want to delete this screen?",
        yesHandler: async () => {
          await deleteScreen(screen);
          closeConfirmDialog();
        },
        noHandler: () => {
          closeConfirmDialog();
        },
      };
      setConfirmDialogOptions(confirmDialogOptions);
      showConfirmDialog();
    },
    [closeConfirmDialog, deleteScreen, showConfirmDialog]
  );

  const tourConfig = [
    {
      selector: '[data-tut="reactour_dashboard_1"]',
      content: `Choose one of the Screen Templates and drag and drop it to the Your Screens pane.`
    },
    {
      selector: '[data-tut="reactour_dashboard_2"]',
      content: `Click this button to edit the screen’s title to something that makes sense to you.`,
    },
    {
      selector: '[data-tut="reactour_dashboard_3"]',
      content: `Delete the screen by clicking this button.`,
    },
    {
      selector: '[data-tut="reactour_dashboard_4"]',
      content: `Grab this button to drag and drop a screen into a different presentation order.`
    },
    {
      selector: '[data-tut="reactour_dashboard_5"]',
      content: `Clicking on the screen title brings you to the Edit Screen Page.  This is where you change the content of each screen.`
    },
    {
      selector: '[data-tut="reactour_dashboard_6"]',
      content: `Once you move your mouse onto this icon it will show the information about your screens.`
    },
    {
      selector: '[data-tut="reactour_dashboard_7"]',
      content: `Once you move your mouse onto this icon it will show the information about how to use templates.`
    },
    {
      selector: '[data-tut="reactour_contextual_help"]',
      content: `This icon brings up detailed contextual help for everything on this page.  If you get lost, try here first.`
    },
    {
      selector: '[data-tut="reactour_configuration_button"]',
      content: `This button brings you to the Configuration Page where you can change system settings and enter your payment information.`
    },
    {
      selector: '[data-tut="reactour_logout_button"]',
      content: `This is the Logout Button.`
    },
  ];

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <Box p={1}>
              <Paper className={classes.list}>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography variant="h6" className={classes.listTitle}>
                    Your Screens
                  </Typography>
                  <Tooltip title="These are the screens you want to appear on your TV display.  To add a new screen, drag a Screen Template into the list position of your choice.">
                    <InfoIcon fontSize="small" data-tut="reactour_dashboard_6"/>
                  </Tooltip>
                </Box>
                <Box mt={2}>
                  <ScreenList
                    data={screenList}
                    onUpdateScreenName={handleUpdateScreenName}
                    onDeleteScreen={handleDeleteScreen}
                  />
                </Box>
              </Paper>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box p={1}>
              <Paper className={classes.list}>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography variant="h6" className={classes.listTitle}>
                    Screen Templates
                  </Typography>
                  <Tooltip title="These templates are available for you to create your own screens.  Simply drag a template to Your Screens and place it where you would like.">
                    <InfoIcon fontSize="small" data-tut="reactour_dashboard_7"/>
                  </Tooltip>
                </Box>
                <Box mt={2} data-tut="reactour_dashboard_1">
                  <ScreenTemplateList data={templateList} />
                </Box>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </DragDropContext>

      <ConfirmationDialog
        open={confirmDialogOpen}
        onRequestClose={closeConfirmDialog}
        options={confirmDialogOptions}
      />

      <Tour
          onRequestClose={disableDashboardTour}
          steps={tourConfig}
          isOpen={dashboardTourOpen}
        />
    </>
  );
}

export default connect(mapState, mapDispatch)(Dashboard);
