import React, { useState, useCallback } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Slide,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField
} from "@material-ui/core";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DeleteUserConfirmationDialog = ({ open, onDelete, onRequestClose }) => {
  const [leavingReasons, setLeavingReasons] = useState({
    "not-enough-control": false,
    "too-hard": false,
    "too-expensive": false,
    "out-of-business": false,
    "different-product": false,
    other: false,
    otherReason: ""
  });

  const handleChangeReason = useCallback(
    e => {
      const name = e.target.name;
      setLeavingReasons({
        ...leavingReasons,
        [name]: name === "otherReason" ? e.target.value : e.target.checked
      });
    },
    [leavingReasons]
  );

  const handleDeleteAccount = useCallback(() => {
    onDelete(leavingReasons);
  }, [leavingReasons, onDelete]);

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      disableBackdropClick
      disableEscapeKeyDown
      onClose={onRequestClose}
    >
      <DialogTitle>Please Confirm</DialogTitle>
      <DialogContent>
        <FormControl component="fieldset">
          <FormLabel component="legend">
            Please tell us why you are leaving
          </FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  name="not-enough-control"
                  checked={leavingReasons["not-enough-control"]}
                  onChange={handleChangeReason}
                  value="not-enough-control"
                />
              }
              label="Does not provide enough design control"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="too-hard"
                  checked={leavingReasons["too-hard"]}
                  onChange={handleChangeReason}
                  value="too-hard"
                />
              }
              label="Too hard to use"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="too-expensive"
                  checked={leavingReasons["too-expensive"]}
                  onChange={handleChangeReason}
                  value="too-expensive"
                />
              }
              label="Too expensive"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="out-of-business"
                  checked={leavingReasons["out-of-business"]}
                  onChange={handleChangeReason}
                  value="out-of-business"
                />
              }
              label="Out of business"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="different-product"
                  checked={leavingReasons["different-product"]}
                  onChange={handleChangeReason}
                  value="different-product"
                />
              }
              label="Using a different product"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="other"
                  checked={leavingReasons["other"]}
                  onChange={handleChangeReason}
                  value="other"
                />
              }
              label="Other"
            />
            {leavingReasons.other && (
              <TextField
                name="otherReason"
                value={leavingReasons.otherReason}
                onChange={handleChangeReason}
                multiline
                rows={4}
              />
            )}
          </FormGroup>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button variant="text" color="secondary" onClick={handleDeleteAccount}>
          Delete Account
        </Button>
        <Button variant="contained" color="primary" onClick={onRequestClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteUserConfirmationDialog;
