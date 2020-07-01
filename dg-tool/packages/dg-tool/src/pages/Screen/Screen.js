import React, { useEffect, useCallback, useState, useRef } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { Box } from "@material-ui/core";
import PanZoom from "react-easy-panzoom";
import sizeMe from "react-sizeme";
import Tour from 'reactour';

import { Region, Loader } from "@displaygecko/dg-components";
import { screen as screenModule, helpLink, tour } from "@displaygecko/dg-modules";

import { initContentTools, cloudinary } from "../../helpers";
import "./screen.css";

import { loadFonts } from "../../helpers";
import { brandFonts as defaultFonts } from "../../constants/defaults";
import { company as companyModule } from "@displaygecko/dg-modules";

const mapState = (state, { match }) => ({
  screen: screenModule.screenSelector(match.params.screenId)(state),
  screenTourOpen: tour.screenTourSelector(state),
  company: companyModule.companySelector(state)
});

const mapDispatch = {
  setCurrentPageIndex: helpLink.setCurrentPageIndex,
  getScreen: screenModule.getScreen,
  updateScreen: screenModule.updateScreen,
  disableScreenTour: tour.disableScreenTour,
};

let editor = null;

function Screen({
  size,
  match,
  screen,
  screenTourOpen,
  company,
  setCurrentPageIndex,
  getScreen,
  updateScreen,
  disableScreenTour,
}) {
  const [panAllowed, setPanAllowed] = useState(false);
  const [editorStarted, setEditorStarted] = useState(false);
  const [brandFonts, setBrandFonts] = useState(defaultFonts);

  useEffect(() => {
    if (company) setBrandFonts(company.brandFonts || defaultFonts);
    loadFonts();
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

  useEffect(() => {
    setCurrentPageIndex(helpLink.HELP_SUPPORT_PAGES[1].pageIndex);
  }, [setCurrentPageIndex]);

  useEffect(() => {
    document.getElementById("pageInnerView").style.overflowY = "hidden";

    return function cleanup() {
      document.getElementById("pageInnerView").style.overflowY = "inherit";
    };
  }, []);

  useEffect(() => {
    const screenId = match.params.screenId;
    getScreen(screenId);
  }, [match, getScreen]);

  const handleSaveScreen = useCallback(
    async (ev, screen) => {
      const regions = ev.detail().regions;

      if (Object.keys(regions).length === 0) return;

      editor.busy(true);

      try {
        await updateScreen({
          id: screen.id,
          regionsData: {
            ...screen.regions.reduce((m, r) => {
              // AttributeValue in DynamoDB may not contain an empty string for key
              if (r.html) {
                m[r.id] = r.html;
              }
              return m;
            }, {}),
            ...regions,
          },
        });

        editor.busy(false);
        new window.ContentTools.FlashUI("ok");
      } catch (error) {
        console.log("err", error);
        editor.busy(false);
        new window.ContentTools.FlashUI("no");
      }
    },
    [updateScreen]
  );

  const handlerImageUpload = useCallback((dialog) => {
    let _image;

    function upload(ev) {
      const file = ev.detail().file;

      cloudinary.upload(file, {
        onStart: () => {
          // Set the dialog state to uploading and reset the progress bar to 0
          dialog.state("uploading");
          dialog.progress(0);
        },
        onProgress: (progress) => {
          // Set the progress for the upload
          dialog.progress(progress);
        },
        onComplete: (image) => {
          // Populate the dialog
          _image = image;
          dialog.populate(image.url, [image.width, image.height]);
        },
        onError: () => {
          new window.ContentTools.FlashUI("no");
        },
      });
    }

    function rotate(angle) {
      _image = cloudinary.rotate(_image, angle);

      // Update the image in the dialog
      dialog.populate(_image.url, [_image.width, _image.height]);
    }

    function save() {
      _image = cloudinary.crop(_image, dialog.cropRegion());

      // Save/insert the image
      dialog.save(_image.url, [_image.width, _image.height]);
    }

    dialog.addEventListener("imageuploader.fileready", upload);
    dialog.addEventListener("imageuploader.rotatecw", function () {
      rotate(90);
    });
    dialog.addEventListener("imageuploader.rotateccw", function () {
      rotate(-90);
    });
    dialog.addEventListener("imageuploader.save", save);
  }, []);

  /**
   * Initialize the editor.
   */
  useEffect(() => {
    if (screen) {
      editor = initContentTools(handlerImageUpload);

      editor.addEventListener("start", function () {
        setEditorStarted(true);
      });

      editor.addEventListener("stop", function () {
        setEditorStarted(false);
      });

      editor.addEventListener("saved", function (ev) {
        handleSaveScreen(ev, screen);
      });
    }

    return function cleanup() {
      if (editor) editor.destroy();
    };
  }, [screen, handleSaveScreen, handlerImageUpload]);

  /**
   * Allow / Disallow the panning .
   */
  useEffect(() => {
    function downHandler({ key }) {
      if (key === "Control") {
        setPanAllowed(true);
      }
    }

    const upHandler = ({ key }) => {
      if (key === "Control") {
        setPanAllowed(false);
      }
    };

    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);

    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, []);

  const panZoomEl = useRef(null);

  const handlePreventPan = useCallback(() => {
    if (editorStarted) {
      return !panAllowed;
    }

    return false;
  }, [editorStarted, panAllowed]);

  const handleDoubleClickPan = useCallback(() => {
    if (!editorStarted) {
      panZoomEl.current.reset();
    }
  }, [editorStarted]);

  const tourConfig = [
    {
      selector: '[data-tut="reactour_dashboard_button"]',
      content: `Click this button to return to your list of screens and templates.`
    },
    {
      selector: '[data-tut="reactour_configuration_button"]',
      content: `Similarly, this button lets you go to the Configuration Page, where you can change system settings and manage your payments.`
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
      selector: '[data-tut="reactour_screen_pixel_dimension"]',
      content: `Pixel dimension of the template.`
    },
    {
      selector: '[data-tut="reactour_screen_edit_button"]',
      content: `Let's start editing. Click this button.`
    },
    {
      selector: '[data-tut="reactour_screen_toolbox"]',
      content: `This is the editing toolbox.  You can use the various editing tools here for changing your content.  If the toolbox is in your way, you can grab it and drag it to a new location.`,
      action: () => document.getElementsByClassName("ct-ignition__button--edit")[0].click()
    },
    {
      selector: '[data-tut="reactour_screen_editing_area"]',
      content: `Each editable area of the template lets you click to start editing.  If there is no content yet, you will notice small dots in the upper left of the template section--click there to start editing.`
    },
    {
      selector: '[data-tut="reactour_screen_cancel_button"]',
      content: `If you don’t want to save your changes, click this button to discard all changes.`
    },
    {
      selector: '[data-tut="reactour_screen_confirm_button"]',
      content: `Click this button to save your changes.`
    },
  ];

  return (
    <>
      <PanZoom
        id="panzoom"
        style={{
          height: size.height
        }}
        disableDoubleClickZoom
        realPinch
        autoCenter
        autoCenterZoomLevel={0.9}
        ref={panZoomEl}
        preventPan={handlePreventPan}
        onDoubleClick={handleDoubleClickPan}
        disableKeyInteraction={editorStarted ? true : false}
      >
        <Box position="relative" width="1920px" height="1080px">
          <Loader
            actionCreator={screenModule.getScreen}
            selector={screenModule.screenSelector(match.params.screenId)}
          >
            {(screen) =>
              screen ? (
                screen.regions.map((region, index) => (
                  <Region key={index} region={region} index={screen.regions.length === 4 ? index : index + 1}/>
                ))
              ) : (
                <Box></Box>
              )
            }
          </Loader>
        </Box>
      </PanZoom>

      <Tour
        onRequestClose={disableScreenTour}
        steps={tourConfig}
        isOpen={screenTourOpen}
      />
    </>
  );
}

const enhance = compose(
  connect(mapState, mapDispatch),
  sizeMe({ monitorHeight: true })
);

export default enhance(Screen);
