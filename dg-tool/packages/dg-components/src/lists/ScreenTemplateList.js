import React, { Fragment } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { Box, Typography, RootRef } from "@material-ui/core";

import useStyles from "./screenTemplateList.styles";

function ScreenTemplateList({ data }) {
  const classes = useStyles({});

  return (
    <Droppable droppableId="screen-templates" isDropDisabled={true}>
      {(provided, snapshot) => (
        <RootRef rootRef={provided.innerRef}>
          <Box className={classes.root}>
            {data.map((t, i) => (
              <Draggable key={t.id} draggableId={t.id} index={i}>
                {(provided, snapshot) => (
                  <Fragment>
                    <RootRef rootRef={provided.innerRef}>
                      <Box
                        className="screen-template-list--list-item"
                        bgcolor="white"
                        p={1}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Typography variant="body1">{t.title}</Typography>
                      </Box>
                    </RootRef>
                    {snapshot.isDragging && (
                      <Box
                        className="screen-template-list--list-item screen-template-list--list-item--copy"
                        bgcolor="white"
                        p={1}
                      >
                        <Typography variant="body1">{t.title}</Typography>
                      </Box>
                    )}
                  </Fragment>
                )}
              </Draggable>
            ))}
          </Box>
        </RootRef>
      )}
    </Droppable>
  );
}

export default ScreenTemplateList;
