import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withAuthenticator, SignIn } from "aws-amplify-react";
import Auth from "@aws-amplify/auth";
import { Helmet } from "react-helmet";

import { Loader } from "@displaygecko/dg-components";
import { SlideScreens } from "./pages";

import { screen, version } from "@displaygecko/dg-modules";
import { connectWebsocket } from "./helpers";

const mapState = (state) => ({
  currentVersions: version.currentVersionsSelector(state),
  prevVersions: version.prevVersionsSelector(state),
});

const mapDispatch = {
  getAllScreens: screen.getAllScreens,
  getVersions: version.getVersions,
};

class App extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    console.log("[App] Render");
    return (
      <Loader
        actionCreator={screen.getAllScreens}
        selector={screen.screenListSelector}
      >
        {(screenList) => <SlideScreens screenList={screenList} />}
      </Loader>
    );
  }
}

function AppWrapper({
  authData,
  currentVersions,
  prevVersions,
  getAllScreens,
  getVersions,
}) {
  // const [appScale, setAppScale] = useState(0.5);
  const [appScale] = useState(0.5);
  const [webViewInitialized, setWebViewInitialized] = useState(false);

  useEffect(() => {
    let time = 0;
    const intervalId = setInterval(() => {
      const nodes = Array.prototype.slice.call(
        document.getElementsByName("dg-webview-initialized")
      );
      const initialized =
        nodes.length > 0 ? nodes[0].content === "true" : false;
      console.log("webview initialized", initialized);

      if (initialized) {
        setWebViewInitialized(true);
        clearInterval(intervalId);
      } else {
        time += 100;
        if (time >= 10000) {
          clearInterval(intervalId);
        }
      }
    }, 100);

    return function cleanup() {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (!webViewInitialized) return;

    window.ReactNativeWebView.postMessage("dg-sig-signedin");

    const nodes = Array.prototype.slice.call(
      document.getElementsByName("dg-sig-signout")
    );
    const sigSignOut = nodes.length > 0 ? nodes[0].content === "true" : false;
    if (sigSignOut) {
      nodes[0].setAttribute("content", "false");
      window.ReactNativeWebView.postMessage("dg-sig-signout");
      Auth.signOut();
    }
  }, [webViewInitialized]);

  // Load all information upon loading
  useEffect(() => {
    getAllScreens();
    getVersions();
  }, [getAllScreens, getVersions]);

  // Version syncing for every 10 mins
  useEffect(() => {
    const tenMins = 1000 * 60 * 10;
    const intervalId = setInterval(() => {
      getVersions();
    }, tenMins);

    return function cleanup() {
      clearInterval(intervalId);
    };
  }, [getVersions]);

  // Version syncing
  useEffect(() => {
    if (
      prevVersions &&
      currentVersions &&
      currentVersions.screens > prevVersions.screens
    ) {
      console.log("[AppWrapper] Screens are updated");
      getAllScreens();
    }
  }, [currentVersions, prevVersions, getAllScreens]);

  // initiate the web socket upon login / reload
  useEffect(() => {
    const userId = authData.username;

    setTimeout(() => {
      connectWebsocket(userId, (message) => {
        if (message === "FORCE_SIGN_OUT") {
          Auth.signOut();
        }
      });
    }, 0);
  }, [authData]);

  // adjust the viewport
  // useEffect(() => {
  //   if (company) {
  //     const resolution = company.resolution || "1080p";
  //     const scale =
  //       resolution === "1080p" ? 0.5 : resolution === "4k" ? 1 : 0.5;
  //     setAppScale(scale);
  //   }
  // }, [company]);

  // If the app gets online again, initiate the closed web socket.
  useEffect(() => {
    async function updateStatus() {
      if (window.navigator.onLine) {
        try {
          const user = await Auth.currentUserInfo();
          const userId = user.attributes.sub;

          connectWebsocket(userId, (message) => {
            if (message === "FORCE_SIGN_OUT") {
              Auth.signOut();
            }
          });
        } catch (error) {
          console.log("unauthenticated app", error);
        }
      }
    }

    window.addEventListener("online", updateStatus);
    return function cleanup() {
      window.removeEventListener("online", updateStatus);
    };
  }, []);

  console.log("[AppWrapper] Render");
  return (
    <>
      <Helmet>
        <meta
          name="viewport"
          content={`width=device-width, initial-scale=${appScale}, user-scalable=no`}
        />
      </Helmet>
      <App />
    </>
  );
}

export default withAuthenticator(
  connect(mapState, mapDispatch)(AppWrapper),
  false,
  [<SignIn />]
);
