import { makeStyles } from "@material-ui/core/styles";
var useStyles = makeStyles(function (theme) {
  return {
    root: {
      minHeight: "250px",
      "& .screen-list--list-item": {
        "&:not(:first-child)": {
          marginTop: theme.spacing(1)
        }
      }
    }
  };
});
export default useStyles;