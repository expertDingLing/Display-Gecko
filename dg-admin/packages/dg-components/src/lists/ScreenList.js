import React, { useCallback, useMemo, useState } from "react";
import {
  Box,
  Typography,
  RootRef,
  IconButton,
  TextField,
  Tooltip
} from "@material-ui/core";
import {
  DragIndicator as DragIndicatorIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Done as DoneIcon
} from "@material-ui/icons";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { NavLink } from "react-router-dom";
import moment from "moment";

import useStyles from "./screenList.styles";

function ScreenItem({
  provided,
  screen,
  index,
  onUpdateScreenName,
  onDeleteScreen
}) {
  const [state, setState] = useState({
    isEditing: false,
    title: "",
    titleHasError: false
  });

  const handleToggleEditing = useCallback(() => {
    if (state.isEditing && !state.title) {
      setState({ ...state, titleHasError: true });
    } else if (state.isEditing) {
      setState({ isEditing: false });
      onUpdateScreenName(screen, state.title);
    } else {
      setState({
        title: screen.title,
        isEditing: !state.isEditing,
        titleHasError: false
      });
    }
  }, [state, onUpdateScreenName, screen]);

  const handleTitleChange = useCallback(
    e => {
      setState({
        ...state,
        title: e.target.value,
        titleHasError: false
      });
    },
    [state]
  );

  const handleDeleteScreen = useCallback(() => {
    onDeleteScreen(screen);
  }, [onDeleteScreen, screen]);

  return (
    <Box
      data-tut="reactour_dashboard_5"
      className="screen-list--list-item"
      bgcolor="white"
      {...provided.draggableProps}
    >
      <Box display="flex" alignItems="center" p={1}>
        <Tooltip title="Move up or down">
          <Box {...provided.dragHandleProps}>
            <DragIndicatorIcon data-tut="reactour_dashboard_4"/>
          </Box>
        </Tooltip>
        <Box flexGrow={1} pl={1}>
          {state.isEditing ? (
            <TextField
              value={state.title}
              onChange={handleTitleChange}
              inputProps={{ maxLength: 40, required: true }}
              autoFocus
              fullWidth
              error={state.titleHasError}
              helperText={
                state.titleHasError ? "Required" : "Max 40 characters"
              }
            />
          ) : (
            <NavLink to={`/screens/${screen.id}`}>
              <Typography variant="body1">{screen.title}</Typography>

              {screen.updatedAt ? (
                <Box>
                  <Typography
                    variant="caption"
                    color="textSecondary"
                  >{`Updated at ${moment(screen.updatedAt).format(
                    "MM/DD/YYYY HH:mm A"
                  )}`}</Typography>
                </Box>
              ) : (
                <Box>
                  <Typography
                    variant="caption"
                    color="textSecondary"
                  >{`Created at ${moment(screen.createdAt).format(
                    "MM/DD/YYYY HH:mm A"
                  )}`}</Typography>
                </Box>
              )}
            </NavLink>
          )}
        </Box>
        <Tooltip
          title={state.isEditing ? "Save screen title" : "Edit screen title"}
        >
          <IconButton size="small" onClick={handleToggleEditing}>
            {state.isEditing ? <DoneIcon data-tut="reactour_dashboard_2"/> : <EditIcon data-tut="reactour_dashboard_2"/>}
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete screen">
          <IconButton onClick={handleDeleteScreen} size="small">
            <DeleteIcon data-tut="reactour_dashboard_3"/>
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}

function ScreenList({ data, onUpdateScreenName, onDeleteScreen }) {
  const classes = useStyles({});

  const orderedScreenList = useMemo(() => {
    return data.sort((a, b) => a.orderWeight - b.orderWeight);
  }, [data]);

  return (
    <Droppable droppableId="screens">
      {(provided, snapshot) => (
        <RootRef rootRef={provided.innerRef}>
          <Box className={classes.root}>
            {orderedScreenList.map((s, i) => (
              <Draggable key={s.id} draggableId={s.id} index={i}>
                {(provided, snapshot) => (
                  <RootRef rootRef={provided.innerRef}>
                    <ScreenItem
                      key={i}
                      provided={provided}
                      screen={s}
                      index={i}
                      onUpdateScreenName={onUpdateScreenName}
                      onDeleteScreen={onDeleteScreen}
                    />
                  </RootRef>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </Box>
        </RootRef>
      )}
    </Droppable>
  );
}

export default ScreenList;
