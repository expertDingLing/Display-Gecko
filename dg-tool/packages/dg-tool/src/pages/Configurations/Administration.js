import React, { useState, useCallback } from "react";
import { connect } from "react-redux";
import { Box, Button } from "@material-ui/core";
import Auth from "@aws-amplify/auth";

import { DeleteUserConfirmationDialog, ConfirmationDialog } from "@displaygecko/dg-components";
import General from "./General";
import PaymentInformation from "./PaymentInformation";
import ResetPassword from "./ResetPassword";

import { useToggle } from "../../helpers";
import { user, tour } from "@displaygecko/dg-modules";

const mapDispatch = {
  deleteAccount: user.deleteAccount,
  enableTour: tour.enableTour,
};

function Administration({ deleteAccount, enableTour }) {

  const [enableTourDialogOptions, setEnableTourDialogOptions] = useState({});

  const {
    on: confirmDialogOpen,
    setOn: showConfirmDialog,
    setOff: closeConfirmDialog
  } = useToggle();

  const {
    on: enableTourDialogOpen,
    setOn: showEnableTourDialog,
    setOff: closeEnableTourDialog
  } = useToggle();

  const handleDeleteUser = useCallback(() => {
    showConfirmDialog();
  }, [showConfirmDialog]);

  const handleDeleteUserConfirmed = useCallback(
    async reasons => {
      await deleteAccount(reasons);
      closeConfirmDialog();
      Auth.signOut();
    },
    [deleteAccount, closeConfirmDialog]
  );

  const handleEnableTour = useCallback(
    () => {
      const enableTourDialogOptions = {
        title: "Enable Tour",
        contentText: "Are you sure that you want to enable tour?",
        yesHandler: () => {
          enableTour();
          closeEnableTourDialog();
        },
        noHandler: () => {
          closeEnableTourDialog();
        },
      };
      setEnableTourDialogOptions(enableTourDialogOptions);
      showEnableTourDialog();
    },
    [closeEnableTourDialog, showEnableTourDialog, enableTour]
  );

  return (
    <>
      <Box>
        <General />
        <Box mt={2} />
        <PaymentInformation />
        <Box mt={2} />
        <ResetPassword />
        <Box mt={2} />
        <Box display="flex" justifyContent="space-between">
          <Button onClick={handleEnableTour} data-tut="reactour_configuration_enable_tour">Enable Tour</Button>
          <Button onClick={handleDeleteUser} data-tut="reactour_configuration_delete_account">Delete My Account</Button>
        </Box>
      </Box>
      <DeleteUserConfirmationDialog
        open={confirmDialogOpen}
        onRequestClose={closeConfirmDialog}
        onDelete={handleDeleteUserConfirmed}
      />
      <ConfirmationDialog
        open={enableTourDialogOpen}
        onRequestClose={closeEnableTourDialog}
        options={enableTourDialogOptions}
      />
    </>
  );
}

export default connect(null, mapDispatch)(Administration);
