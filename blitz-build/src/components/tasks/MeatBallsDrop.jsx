import React, { useState, useEffect } from "react";

import EditTask from "./EditTask";
import DeleteTask from "./DeleteTask";

//styles
import styled from "styled-components";
import {
  TaskI,
  StyledLi,
  MeatBalls,
  DropDown,
  DropP
} from "../../styles/Tasks/tasks";

const Geo = styled.div``;

export default function MeatBallsDrop({ task }) {
  const [dropStatus, setDropStatus] = useState(false);
  const [editStatus, setEditStatus] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState(false);

  //   useEffect(() => {
  //     document.addEventListener("mousedown", );
  //   }, [])

  const toggleDrop = e => {
    e.stopPropagation();
    setDropStatus(!dropStatus);
  };

  const closeDrop = () => {
    setDropStatus(false);
  };

  //edit modal functions
  const handleEditOpen = e => {
    e.stopPropagation();
    setEditStatus(true);
  };
  const handleEditClose = e => {
    setEditStatus(false);
    closeDrop();
  };

  //delete modal functions
  const handleDeleteOpen = e => {
    e.stopPropagation();
    setDeleteStatus(true);
  };
  const handleDeleteClose = e => {
    setDeleteStatus(false);
    closeDrop();
  };

  return (
    <>
      <MeatBalls className="ion-ios-more" onClick={toggleDrop}>
        {dropStatus && (
          <>
            {/* <Geo></Geo> */}
            <DropDown>
              {/* <Geo></Geo> */}
              <StyledLi>
                <DropP>Complete</DropP>
                <TaskI className="ion-md-checkmark-circle" />
              </StyledLi>
              <StyledLi onClick={handleEditOpen}>
                <DropP>Edit</DropP>
                <TaskI className="ion-md-create" />
              </StyledLi>
              <StyledLi>
                <DropP>Delay</DropP>
                <TaskI className="ion-md-clock" />
              </StyledLi>
              <StyledLi onClick={handleDeleteOpen}>
                <DropP>Delete</DropP>
                <TaskI className="ion-md-trash" />
              </StyledLi>
            </DropDown>
          </>
        )}
      </MeatBalls>
      <EditTask
        task={task}
        closeDrop={closeDrop}
        editStatus={editStatus}
        handleEditClose={handleEditClose}
      />
      <DeleteTask
        task={task}
        closeDrop={closeDrop}
        deleteStatus={deleteStatus}
        handleDeleteClose={handleDeleteClose}
        
      />
    </>
  );
}
