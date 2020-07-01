import React from "react";
import { Box } from "@material-ui/core";

import EmailTemplates from "./EmailTemplates";
import HelpDeskCMS from "./HelpDeskCMS";

function Dashboard() {
  return (
    <Box>
      <EmailTemplates />
      <HelpDeskCMS />
    </Box>
  );
}

export default Dashboard;
