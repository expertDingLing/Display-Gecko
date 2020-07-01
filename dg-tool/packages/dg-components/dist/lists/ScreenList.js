import _objectSpread from "/home/home/temp/dg-tool/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectSpread2";
import _slicedToArray from "/home/home/temp/dg-tool/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/slicedToArray";
import React, { useCallback, useMemo, useState } from "react";
import { Box, Typography, RootRef, IconButton, TextField, Tooltip } from "@material-ui/core";
import { DragIndicator as DragIndicatorIcon, Edit as EditIcon, Delete as DeleteIcon, Done as DoneIcon } from "@material-ui/icons";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { NavLink } from "react-router-dom";
import moment from "moment";
import useStyles from "./screenList.styles";

function ScreenItem(_ref) {
  var provided = _ref.provided,
      screen = _ref.screen,
      index = _ref.index,
      onUpdateScreenName = _ref.onUpdateScreenName,
      onDeleteScreen = _ref.onDeleteScreen;

  var _useState = useState({
    isEditing: false,
    title: "",
    titleHasError: false
  }),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];

  var handleToggleEditing = useCallback(function () {
    if (state.isEditing && !state.title) {
      setState(_objectSpread({}, state, {
        titleHasError: true
      }));
    } else if (state.isEditing) {
      setState({
        isEditing: false
      });
      onUpdateScreenName(screen, state.title);
    } else {
      setState({
        title: screen.title,
        isEditing: !state.isEditing,
        titleHasError: false
      });
    }
  }, [state, onUpdateScreenName, screen]);
  var handleTitleChange = useCallback(function (e) {
    setState(_objectSpread({}, state, {
      title: e.target.value,
      titleHasError: false
    }));
  }, [state]);
  var handleDeleteScreen = useCallback(function () {
    onDeleteScreen(screen);
  }, [onDeleteScreen, screen]);
  return React.createElement(Box, Object.assign({
    "data-tut": "reactour_dashboard_5",
    className: "screen-list--list-item",
    bgcolor: "white"
  }, provided.draggableProps), React.createElement(Box, {
    display: "flex",
    alignItems: "center",
    p: 1
  }, React.createElement(Tooltip, {
    title: "Move up or down"
  }, React.createElement(Box, provided.dragHandleProps, React.createElement(DragIndicatorIcon, {
    "data-tut": "reactour_dashboard_4"
  }))), React.createElement(Box, {
    flexGrow: 1,
    pl: 1
  }, state.isEditing ? React.createElement(TextField, {
    value: state.title,
    onChange: handleTitleChange,
    inputProps: {
      maxLength: 40,
      required: true
    },
    autoFocus: true,
    fullWidth: true,
    error: state.titleHasError,
    helperText: state.titleHasError ? "Required" : "Max 40 characters"
  }) : React.createElement(NavLink, {
    to: "/screens/".concat(screen.id)
  }, React.createElement(Typography, {
    variant: "body1"
  }, screen.title), screen.updatedAt ? React.createElement(Box, null, React.createElement(Typography, {
    variant: "caption",
    color: "textSecondary"
  }, "Updated at ".concat(moment(screen.updatedAt).format("MM/DD/YYYY HH:mm A")))) : React.createElement(Box, null, React.createElement(Typography, {
    variant: "caption",
    color: "textSecondary"
  }, "Created at ".concat(moment(screen.createdAt).format("MM/DD/YYYY HH:mm A")))))), React.createElement(Tooltip, {
    title: state.isEditing ? "Save screen title" : "Edit screen title"
  }, React.createElement(IconButton, {
    size: "small",
    onClick: handleToggleEditing
  }, state.isEditing ? React.createElement(DoneIcon, {
    "data-tut": "reactour_dashboard_2"
  }) : React.createElement(EditIcon, {
    "data-tut": "reactour_dashboard_2"
  }))), React.createElement(Tooltip, {
    title: "Delete screen"
  }, React.createElement(IconButton, {
    onClick: handleDeleteScreen,
    size: "small"
  }, React.createElement(DeleteIcon, {
    "data-tut": "reactour_dashboard_3"
  })))));
}

function ScreenList(_ref2) {
  var data = _ref2.data,
      onUpdateScreenName = _ref2.onUpdateScreenName,
      onDeleteScreen = _ref2.onDeleteScreen;
  var classes = useStyles({});
  var orderedScreenList = useMemo(function () {
    return data.sort(function (a, b) {
      return a.orderWeight - b.orderWeight;
    });
  }, [data]);
  return React.createElement(Droppable, {
    droppableId: "screens"
  }, function (provided, snapshot) {
    return React.createElement(RootRef, {
      rootRef: provided.innerRef
    }, React.createElement(Box, {
      className: classes.root
    }, orderedScreenList.map(function (s, i) {
      return React.createElement(Draggable, {
        key: s.id,
        draggableId: s.id,
        index: i
      }, function (provided, snapshot) {
        return React.createElement(RootRef, {
          rootRef: provided.innerRef
        }, React.createElement(ScreenItem, {
          key: i,
          provided: provided,
          screen: s,
          index: i,
          onUpdateScreenName: onUpdateScreenName,
          onDeleteScreen: onDeleteScreen
        }));
      });
    }), provided.placeholder));
  });
}

export default ScreenList;