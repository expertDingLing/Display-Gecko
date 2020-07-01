import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: "250px",
    "& .screen-list--list-item": {
      "&:not(:first-child)": {
        marginTop: theme.spacing(1)
      }
    }
  }
}));

export default useStyles;
