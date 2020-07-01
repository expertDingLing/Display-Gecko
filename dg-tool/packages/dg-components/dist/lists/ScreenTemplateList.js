import React, { Fragment } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { Box, Typography, RootRef } from "@material-ui/core";
import useStyles from "./screenTemplateList.styles";

function ScreenTemplateList(_ref) {
  var data = _ref.data;
  var classes = useStyles({});
  return React.createElement(Droppable, {
    droppableId: "screen-templates",
    isDropDisabled: true
  }, function (provided, snapshot) {
    return React.createElement(RootRef, {
      rootRef: provided.innerRef
    }, React.createElement(Box, {
      className: classes.root
    }, data.map(function (t, i) {
      return React.createElement(Draggable, {
        key: t.id,
        draggableId: t.id,
        index: i
      }, function (provided, snapshot) {
        return React.createElement(Fragment, null, React.createElement(RootRef, {
          rootRef: provided.innerRef
        }, React.createElement(Box, Object.assign({
          className: "screen-template-list--list-item",
          bgcolor: "white",
          p: 1
        }, provided.draggableProps, provided.dragHandleProps), React.createElement(Typography, {
          variant: "body1"
        }, t.title))), snapshot.isDragging && React.createElement(Box, {
          className: "screen-template-list--list-item screen-template-list--list-item--copy",
          bgcolor: "white",
          p: 1
        }, React.createElement(Typography, {
          variant: "body1"
        }, t.title)));
      });
    })));
  });
}

export default ScreenTemplateList;