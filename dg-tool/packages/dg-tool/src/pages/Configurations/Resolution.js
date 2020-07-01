import React, { useState, useCallback, useEffect } from "react";
import { connect } from "react-redux";
import {
  Card,
  CardHeader,
  CardContent,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box
} from "@material-ui/core";

import { resolution as defaultResolution } from "../../constants/defaults";
import { company } from "@displaygecko/dg-modules";

const mapState = state => ({
  company: company.companySelector(state)
});

const mapDispatch = {
  updateCompany: company.updateCompany
};

function Resolution({ company, updateCompany }) {
  const [resolution, setResolution] = useState(defaultResolution);

  useEffect(() => {
    if (company) setResolution(company.resolution || defaultResolution);
  }, [company]);

  const handleChange = useCallback(
    e => {
      setResolution(e.target.value);
      updateCompany({ resolution: e.target.value });
    },
    [updateCompany]
  );

  return (
    <Card data-tut="reactour_configuration_display_resolution">
      <CardHeader title="Monitor Display Resolution" />
      <CardContent>
        <Box display="flex" justifyContent="flex-start">
          <RadioGroup
            name="resolution"
            value={resolution}
            onChange={handleChange}
          >
            <FormControlLabel
              value="4k"
              control={<Radio color="default" />}
              label="4K (default)"
              labelPlacement="start"
            />
            <FormControlLabel
              value="1080p"
              control={<Radio color="default" />}
              label="1080p"
              labelPlacement="start"
            />
          </RadioGroup>
        </Box>
      </CardContent>
    </Card>
  );
}

export default connect(mapState, mapDispatch)(Resolution);
