import React, { useContext, useEffect, useState } from "react";
import TemplatesProvider from "../../contexts/templates/TemplateProvider";
import { axiosWithAuth } from "../../utils/auth/axiosWithAuth";
import PathnameContext from "../../contexts/PathnameContext";
import TemplateContext from "../../contexts/templates/TemplateContext";
import searchTermContext from "../../contexts/searching/searchTerm";
import styled, { css } from "styled-components";
import MeatBallsDrop from "../tasks/MeatBallsDrop";
import { set } from "date-fns";
const IndividualTemplate = props => {

  //getting info for templates and template tasks from context
  const { templateTask, setTemplatesTask, getTemplateTasks } = useContext(
    TemplateContext
  );
  //getting pathname from contexxt
  const { pathname, setPathname } = useContext(PathnameContext);

  console.log(templateTask);
  useEffect(() => {
    setPathname(window.location.pathname);
    getTemplateTasks();
  }, []);

  //this shows the tasks for an indvidual template
  return (
    <div>
      <Section>{/* <h1>individual template</h1> */}</Section>

      {templateTask.map(task => {
        return (
          <Container>
            {" "}
            <TitleText>{task.task_name}</TitleText>{" "}
            <MeatBallsDrop task={task} />{" "}
          </Container>
        );
      })}
    </div>
  );
};

export default IndividualTemplate;

const TitleText = styled.p`
  width: 200px;

  font-size: 14px;
  line-height: 16px;
  font-family: "Roboto";
  color: #3f3a36;
  margin-bottom: 8px;
`;

const Section = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;

  p {
    font-family: "Roboto";
    font-size: 16px;
    line-height: 19px;
    color: #8a827d;
    font-weight: 500;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100px;
  background: white;
  padding: 16px 32px 32px 32px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;

  :nth-child(odd) {
    background: #fbfaf9;
  }
`;

const Card = styled.div`
  border: 1px solid #dcd9d5;
`;
