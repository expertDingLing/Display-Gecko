import { makeStyles } from "@material-ui/core/styles";
var useStyles = makeStyles(function (theme) {
  return {
    root: {
      "& .screen-template-list--list-item": {
        "&:not(:first-child)": {
          marginTop: theme.spacing(1)
        }
      },
      "& .screen-template-list--list-item--copy": {
        "& ~ div": {
          transform: "none !important"
        },
        "& ~ [data-rbd-placeholder-context-id]": {
          display: "none !important"
        }
      }
    }
  };
});
export default useStyles;