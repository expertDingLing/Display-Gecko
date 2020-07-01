import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  regionTag: {
    position: "absolute",
    bottom: "4px",
    right: "4px",
    zIndex: 101,
    backgroundColor: "white"
  }
}));

export default useStyles;
