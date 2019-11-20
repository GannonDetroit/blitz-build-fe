import React, { useState, useEffect } from "react";
import axios from "axios";
import AddProject from "../modal/AddProject";
import styled, { css } from "styled-components";

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

const ProjectContainer = styled.div`
  width: 1090px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const ProjectTopContainer = styled.div`
  display: flex;
  width: 1080px;
  height: 51px;
  background-color: #ffffff;
  justify-content: space-between;
  align-items: center;
`;
const ProjectCategories = styled.div`
  display: flex;
  width: 50%;
`;

const ProjectCategoriesSecond = styled.div`
  display: flex;
  width: 40%;
`;
const ProjectUl = styled.div`
  display: flex;
  width: 55%;
  justify-content: space-around;
`;
const ProjectUlSecond = styled.div`
  display: flex;
  width: 80%;
  justify-content: space-around;
`;

const ProjectLi = styled.div`
  color: #dd6b20;
  height: 19px;
  left: 307px;
  top: 75px;

  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
`;

const ProjectListContainer = styled.div`
  display: flex;
  width: 1080px;
  height: 100px;
  background-color: white;

  :nth-child(odd) {
    background: #fbfaf9;
  }
`;

const ProjectListCategories = styled.div`
  display: flex;
  width: 62.8%
  
  line-height: 50px;
`;
const ProjectListCategoriesSecond = styled.div`
  display: flex;
  justify-content: space-between;
  width: 27%;
  line-height: 50px;
`;

const ProjectListIcons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 3%;
  margin-left: 4%;
`;

const ProjectListName = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  margin-left: 7%;
  width: 12%;
`;
const Name = styled.div`
  /* Heading 4 */
  width: 100px;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  /* 500 Gray */

  color: #3f3a36;
`;

const ProjectListAddress = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  margin-left: 12%;
`;
const Address = styled.div`
  font-size: 1.1em;

  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  /* identical to box height, or 171% */

  /* 500 Gray */

  color: #3f3a36;
`;
const ProjectListDateCreated = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
`;
const DateCreated = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;

  /* identical to box height, or 171% */

  text-align: right;

  /* 500 Gray */

  color: #3f3a36;
`;
const ProjectListDateModified = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  margin-left: -30px;
`;
const DateModified = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;

  /* identical to box height, or 171% */

  text-align: right;

  /* 500 Gray */

  color: #3f3a36;
`;
const ProjectListStatus = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  margin-right: -20px;
`;
const Status = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;

  /* identical to box height */

  text-align: right;

  /* 500 Gray */

  color: #3f3a36;
`;
const ProjectListCreate = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
`;
const Create = styled.div`
  font-size: 1.1em;
  color: rgb(50, 129, 168);
`;
const ProjectListDestroy = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
`;
const Destroy = styled.div`
  font-size: 1.1em;
  color: rgb(50, 129, 168);
`;

const Projects = props => {
  const [project, setProject] = useState([]);

  useEffect(() => {

    axios
      .get("https://blitz-build.herokuapp.com/projects", project)
      .then(res => {
        console.log(res);
        setProject(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Section>
        {" "}
        <p> Your Project List </p>
      </Section>
      <ProjectContainer>
        <ProjectTopContainer>
          <ProjectCategories>
            <ProjectUl>
              <ProjectLi> Project Name </ProjectLi>
              <ProjectLi> Address </ProjectLi>
            </ProjectUl>
          </ProjectCategories>
          <ProjectCategoriesSecond>
            <ProjectUlSecond>
              <ProjectLi> Date Created </ProjectLi>
              <ProjectLi> Date Last Modified </ProjectLi>
              <ProjectLi> Status </ProjectLi>
            </ProjectUlSecond>
          </ProjectCategoriesSecond>
        </ProjectTopContainer>

        {project.map(project => {
          return (
            <ProjectListContainer
              // key={project.projectID}
              // onClick={() => {
              //   props.history.push(`/project/${project.projectID}`);
              // }}
              key={project.id}
              onClick={() => {
                props.history.push(`/project/${project.id}`);
              }}
            >
              <ProjectListCategories>
                <ProjectListName>
                  <Name> {project.project_name} </Name>
                </ProjectListName>

                <ProjectListAddress>
                  <Address> 12 Fairview Lane, Moorhead MN 56560-1543</Address>
                </ProjectListAddress>
              </ProjectListCategories>
              <ProjectListCategoriesSecond>
                <ProjectListDateCreated>
                  <DateCreated> 05/10/2019</DateCreated>
                </ProjectListDateCreated>

                <ProjectListDateModified>
                  <DateModified> 08/18/2019 </DateModified>
                </ProjectListDateModified>

                <ProjectListStatus>
                  <Status>Complete</Status>
                </ProjectListStatus>
              </ProjectListCategoriesSecond>
              {/* <ProjectListIcons>
               <ProjectListCreate>
                 <Create className = "ion-ios-create"></Create>
               </ProjectListCreate>
               <ProjectListDestroy>
                 <Destroy className = "ion-ios-trash"></Destroy>
               </ProjectListDestroy>
             </ProjectListIcons> */}
            </ProjectListContainer>
          );
        })}

        <AddProject /> 
      </ProjectContainer>
    </div>
  );
};

export default Projects;
