import { DeviceUUID } from "device-uuid";
import { getDataFromDevice } from "./device";
import config from "../config";

let ws = null;

const trackDevice = userId => {
  const deviceData = getDataFromDevice();
  console.log("device data", deviceData);

  if (window.AmazonAdvertising || deviceData.deviceType === "firetv") {
    const send = deviceUUID => {
      ws.send(
        JSON.stringify({
          action: "track-device",
          body: {
            userId,
            deviceType: "firetv",
            deviceUUID,
            newSignIn: !Boolean(window.DISPLAY_GECKO_SESSION_ON_LOAD)
          }
        })
      );
    };

    if (window.AmazonAdvertising) {
      window.AmazonAdvertising.getAdvertisingId(
        adId => {
          send(adId);
        },
        error => {
          console.log("error on getting firetv advertising id", error);
        }
      );
    } else {
      send(deviceData.deviceId);
    }
  } else {
    const deviceUUID = new DeviceUUID().get();

    console.log("device uuid", deviceUUID);
    ws.send(
      JSON.stringify({
        action: "track-device",
        body: {
          userId,
          deviceType: "browser",
          deviceUUID,
          newSignIn: !Boolean(window.DISPLAY_GECKO_SESSION_ON_LOAD)
        }
      })
    );
  }
};

export const connectWebsocket = (userId, handler) => {
  ws = new WebSocket(config.apiGateway.WEBSOCKET_URL);

  ws.onopen = event => {
    trackDevice(userId);
    console.log("websocket onopen", event);
  };
  ws.onmessage = event => {
    console.log("websocket onmessage", event);
    handler(event.data);
  };
  ws.onclose = event => {
    console.log("websocket onclose", event);
  };
};

export const closeWebsocket = () => {
  ws.close();
};
