import React, { useState, useCallback } from "react";
import { connect } from "react-redux";
import { Box, Tabs, Tab } from "@material-ui/core";
import Tour from 'reactour';

import { tour } from "@displaygecko/dg-modules";

import Administration from "./Administration";
import Personalization from "./Personalization";

const mapState = (state) => ({
  configurationTourOpen: tour.configurationTourSelector(state),
});

const mapDispatch = {
  disableConfigurationTour: tour.disableConfigurationTour,
};

const Components = {
  0: Administration,
  1: Personalization
};

function Configurations({configurationTourOpen, disableConfigurationTour}) {
  const [selectedTab, selectTab] = useState(0);

  const handleChange = useCallback((event, newValue) => {
    selectTab(newValue);
  }, []);

  const Component = Components[selectedTab];

  const tourConfig = [
    {
      selector: '[data-tut="reactour_configuration_update_membership"]',
      content: `The trial ends after 30 days.  Please update your membership by clicking this button and entering your payment information.  If you have not done this by the end of your trial period, the TV display will stop displaying your content.`,
      action: () => selectTab(0)
    },
    {
      selector: '[data-tut="reactour_configuration_delete_account"]',
      content: `DisplayGecko wants you to love our product.  However if you decide it is not right for you, this button will delete all your data from our system.`,
      action: () => selectTab(0)
    },
    {
      selector: '[data-tut="reactour_configuration_enable_tour"]',
      content: `If you forget anything from this tour and you would like to see it again, click this button.`,
      action: () => selectTab(0)
    },
    {
      selector: '[data-tut="reactour_dashboard_button"]',
      content: `Click this button to return to your list of screens and templates.`
    },
    {
      selector: '[data-tut="reactour_logout_button"]',
      content: `This is the Logout Button.`
    },
    {
      selector: '[data-tut="reactour_contextual_help"]',
      content: `This icon brings up detailed contextual help for everything on this page.  If you get lost, try here first.`
    },
    {
      selector: '[data-tut="reactour_configuration_personalization"]',
      content: `Please`,
      action: () => selectTab(1)
    },
    {
      selector: '[data-tut="reactour_configuration_font"]',
      content: `Select which fonts you want for each of your text sizes in the editor.`,
      action: () => selectTab(1)
    },
    {
      selector: '[data-tut="reactour_configuration_display_resolution"]',
      content: `Choose which resolution your TV will display.  This changes the size of the editable regions of your templates.`,
      action: () => selectTab(1)
    },
  ];

  return (
    <>
      <Box>
        <Tabs
          value={selectedTab}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Administration" />
          <Tab label="Personalization" data-tut="reactour_configuration_personalization"/>
        </Tabs>
        <Box m={1} mt={2}>
          <Component />
        </Box>
      </Box>

      <Tour
          onRequestClose={disableConfigurationTour}
          steps={tourConfig}
          isOpen={configurationTourOpen}
      />
    </>
  );
}

export default connect(mapState, mapDispatch)(Configurations);

