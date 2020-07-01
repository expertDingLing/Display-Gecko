import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  list: {
    maxHeight: 800,
    minHeight: 300,
    overflow: "auto",
    padding: theme.spacing(1),
    backgroundColor: theme.palette.grey[200]
  },
  listTitle: {
    fontWeight: 700,
    color: theme.palette.text.secondary
  }
}));

export default useStyles;
