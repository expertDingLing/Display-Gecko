import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Card, CardHeader, CardContent } from "@material-ui/core";

import { FontPicker } from "@displaygecko/dg-components";
import { loadFonts, FontsList } from "../../helpers";
import { brandFonts as defaultFonts } from "../../constants/defaults";
import { company } from "@displaygecko/dg-modules";

const mapState = state => ({
  company: company.companySelector(state)
});

const mapDispatch = {
  updateCompany: company.updateCompany
};

function BrandFonts({ company, updateCompany }) {
  const [state, setState] = useState(defaultFonts);

  useEffect(() => {
    loadFonts();
    if (company) setState(company.brandFonts || defaultFonts);
  }, [company]);

  const handleChange = useCallback(
    e => {
      setState({
        ...state,
        [e.target.name]: e.target.value
      });
      updateCompany({
        brandFonts: {
          ...state,
          [e.target.name]: e.target.value
        }
      });
    },
    [state, updateCompany]
  );

  return (
    <Card data-tut="reactour_configuration_font">
      <CardHeader title="Brand Fonts" />
      <CardContent>
        <FontPicker
          fontsList={FontsList}
          label="Large Font"
          name="largeFont"
          value={state.largeFont}
          fullWidth
          onChange={handleChange}
        />
        <FontPicker
          fontsList={FontsList}
          label="Medium Font"
          name="mediumFont"
          fullWidth
          value={state.mediumFont}
          onChange={handleChange}
        />
        <FontPicker
          fontsList={FontsList}
          label="Small Font"
          name="smallFont"
          fullWidth
          value={state.smallFont}
          onChange={handleChange}
        />
      </CardContent>
    </Card>
  );
}

export default connect(mapState, mapDispatch)(BrandFonts);
