export const getDataFromDevice = () => {
  const nodes1 = Array.prototype.slice.call(
    document.getElementsByName("dg-device-type")
  );
  const nodes2 = Array.prototype.slice.call(
    document.getElementsByName("dg-device-id")
  );
  const deviceType = nodes1.length > 0 ? nodes1[0].content : "unknown";
  const deviceId = nodes2.length > 0 ? nodes2[0].content : "";

  return { deviceType, deviceId };
};
