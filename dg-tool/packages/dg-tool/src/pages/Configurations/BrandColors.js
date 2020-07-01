import React, { useCallback, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Card, CardHeader, CardContent } from "@material-ui/core";

import { ColorPicker } from "@displaygecko/dg-components";
import { brandColors as defaultColors } from "../../constants/defaults";
import { company } from "@displaygecko/dg-modules";

const mapState = state => ({
  company: company.companySelector(state)
});

const mapDispatch = {
  updateCompany: company.updateCompany
};

function BrandColors({ company, updateCompany }) {
  const [state, setState] = useState(defaultColors);

  useEffect(() => {
    if (company) setState(company.brandColors || defaultColors);
  }, [company]);

  const handleChange = useCallback(
    name => value => {
      setState({ ...state, [name]: value.color });
    },
    [state]
  );

  const handleBlur = useCallback(
    name => value => {
      updateCompany({
        brandColors: {
          ...state,
          [name]: value.color
        }
      });
    },
    [state, updateCompany]
  );

  return (
    <Card>
      <CardHeader title="Brand Colors" />
      <CardContent>
        <ColorPicker
          label="Background Color"
          labelWidth="200px"
          value={state.bgColor}
          onChange={handleChange("bgColor")}
          onBlur={handleBlur("bgColor")}
        />
        <ColorPicker
          label="Highlight Color"
          labelWidth="200px"
          value={state.highlightColor}
          onChange={handleChange("highlightColor")}
          onBlur={handleBlur("highlightColor")}
        />
        <ColorPicker
          label="Secondary Color"
          labelWidth="200px"
          value={state.secondaryColor}
          onChange={handleChange("secondaryColor")}
          onBlur={handleBlur("secondaryColor")}
        />
        <ColorPicker
          label="Tertiary Color"
          labelWidth="200px"
          value={state.tertiaryColor}
          onChange={handleChange("tertiaryColor")}
          onBlur={handleBlur("tertiaryColor")}
        />
      </CardContent>
    </Card>
  );
}

export default connect(mapState, mapDispatch)(BrandColors);
