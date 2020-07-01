import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Box } from "@material-ui/core";

import { screen, company } from "@displaygecko/dg-modules";
import { Region } from "@displaygecko/dg-components";

import "./screen.css";

const mapState = (state, ownProps) => ({
  screen: screen.screenSelector(ownProps.screenId)(state),
  company: company.companySelector(state)
});

const mapDispatch = {
  getScreen: screen.getScreen
};

function Screen({ screenId, screen, company, getScreen }) {
  
  useEffect(() => {
    getScreen(screenId);
  }, [getScreen, screenId]);

  console.log(`[Screen ID ${screenId}] Render`);

  const defaultFonts = {
    largeFont: "Source Sans Pro",
    mediumFont: "Quattrocento Sans",
    smallFont: "Ubuntu"
  };

  const [brandFonts, setBrandFonts] = useState(defaultFonts);

  useEffect(() => {
    if (company) setBrandFonts(company.brandFonts || defaultFonts);
  }, [company]);

  var head = document.getElementsByTagName('head')[0];
  var styleElements = head.getElementsByTagName('style');
  var fontStyle = document.createElement('style');
  var html = '';
  fontStyle.type = 'text/css';
  html += 'h1 { font-family: ' + brandFonts.largeFont + '; }';
  html += 'h2 { font-family: ' + brandFonts.mediumFont + '; }';
  html += 'p, table, ul, ol { font-family: ' + brandFonts.smallFont + '; }';
  fontStyle.innerHTML = html;
  if (styleElements.length !== 0){
    for (var i = 0; i < styleElements.length; i++){
      if (styleElements[i].innerHTML.substring(0,16) === 'h1 { font-family'){
        head.removeChild(styleElements[i]);
      }
    }
  }
  head.appendChild(fontStyle);

   return (
    <div style={{ height: "100vh" }}>
      {screen ? (
        screen.regions.map((region, index) => (
          <Region key={index} region={region} index={screen.regions.length === 4 ? index : index + 1} readOnly />
        ))
      ) : (
        <Box />
      )}
    </div>
  );
}

export default connect(mapState, mapDispatch)(Screen);
