import { makeStyles } from "@material-ui/core/styles";
var useStyles = makeStyles(function (theme) {
  return {
    regionTag: {
      position: "absolute",
      bottom: "4px",
      right: "4px",
      zIndex: 101,
      backgroundColor: "white"
    }
  };
});
export default useStyles;