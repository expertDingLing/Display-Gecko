import React, { useEffect, useState, useCallback } from "react";
import { connect } from "react-redux";
import { Paper, TextField, Box, Button, Typography } from "@material-ui/core";

import { emailTemplate } from "@displaygecko/dg-modules";

const mapState = (state) => ({
  emailTemplates: emailTemplate.billingEmailTemplatesSelector(state),
});

const mapDispatch = {
  getEmailTemplates: emailTemplate.getBillingEmailTemplates,
  setEmailTemplate: emailTemplate.setBillingEmailTemplate,
};

function EmailTemplates({
  emailTemplates,
  getEmailTemplates,
  setEmailTemplate,
}) {
  const [inited, setInited] = useState(false);
  const [state, setState] = useState({
    "trial-reminder-1": "",
    "trial-reminder-2": "",
    "renewal-reminder-1": "",
    "renewal-reminder-2": "",
  });

  useEffect(() => {
    getEmailTemplates();
  }, [getEmailTemplates]);

  useEffect(() => {
    if (!inited && Object.keys(emailTemplates).length !== 0) {
      setState({
        "trial-reminder-1": emailTemplates["trial-reminder-1"] || "",
        "trial-reminder-2": emailTemplates["trial-reminder-2"] || "",
        "renewal-reminder-1": emailTemplates["renewal-reminder-1"] || "",
        "renewal-reminder-2": emailTemplates["renewal-reminder-2"] || "",
      });
      setInited(true);
    }
  }, [emailTemplates, inited]);

  const handleChangeTemplateId = useCallback(
    (e) => {
      setState({
        ...state,
        [e.target.name]: e.target.value,
      });
    },
    [state]
  );

  const handleSaveTemplateId = useCallback(
    (e) => {
      const templateType = e.target.name;
      const templateId = e.target.value;
      if (emailTemplates[templateType] !== templateId) {
        setEmailTemplate(templateType, templateId);
      }
    },
    [emailTemplates, setEmailTemplate]
  );

  return (
    <Paper>
      <Box pl={2} pt={2}>
        <Typography>Email Templates</Typography>
      </Box>
      <Box p={2} display="flex" alignItems="center">
        <TextField
          name="trial-reminder-1"
          variant="outlined"
          size="small"
          label="Trial Reminder 1"
          value={state["trial-reminder-1"]}
          onChange={handleChangeTemplateId}
          onBlur={handleSaveTemplateId}
        />
        <Box ml={1}>
          <Button variant="outlined" color="primary">
            Test
          </Button>
        </Box>
      </Box>
      <Box p={2} display="flex" alignItems="center">
        <TextField
          name="trial-reminder-2"
          variant="outlined"
          label="Trial Reminder 2"
          size="small"
          value={state["trial-reminder-2"]}
          onChange={handleChangeTemplateId}
          onBlur={handleSaveTemplateId}
        />
        <Box ml={1}>
          <Button variant="outlined" color="primary">
            Test
          </Button>
        </Box>
      </Box>
      <Box p={2} display="flex" alignItems="center">
        <TextField
          name="renewal-reminder-1"
          variant="outlined"
          label="Renewal Reminder 1"
          size="small"
          value={state["renewal-reminder-1"]}
          onChange={handleChangeTemplateId}
          onBlur={handleSaveTemplateId}
        />
        <Box ml={1}>
          <Button variant="outlined" color="primary">
            Test
          </Button>
        </Box>
      </Box>
      <Box p={2} display="flex" alignItems="center">
        <TextField
          name="renewal-reminder-2"
          variant="outlined"
          label="Renewal Reminder 2"
          size="small"
          value={state["renewal-reminder-2"]}
          onChange={handleChangeTemplateId}
          onBlur={handleSaveTemplateId}
        />
        <Box ml={1}>
          <Button variant="outlined" color="primary">
            Test
          </Button>
        </Box>
      </Box>
      <Box p={2}>
        <TextField variant="outlined" label="Recipient Email" size="small" />
      </Box>
    </Paper>
  );
}

export default connect(mapState, mapDispatch)(EmailTemplates);
