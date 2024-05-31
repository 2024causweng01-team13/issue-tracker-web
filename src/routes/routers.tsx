import { Home } from "@/pages";
import  {Login}  from "@/pages/login";
import ProjectMainBoard from "@/pages/projects";
import  ProjectDetail  from "@/pages/projects/projectId";
import { ProjectAnalytics } from "@/pages/projects/projectId/analytics";
import IssueDetail from "@/pages/projects/projectId/issues/issueId";
import  CreateIssue  from "@/pages/projects/projectId/new";
import  {SignUp}  from "@/pages/sign-up";
import { Route, Routes } from "react-router-dom";

export const PATHS = {
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/sign-up",
  PROJECTS_BOARD: "/projects",
  CREATE_PROJECT: "/projects/new",
  PROJECT_DETAIL: "/projects/:projectId",
  PROJECT_ANALYTICS: "/projects/:projectId/analytics",
  ISSUE_DETAIL: "/projects/:projectId/issues/:issueId",
  CREATE_ISSUE: "/projects/:projectId/new",
};

export const Router = () => {
  return (
    <Routes>
      <Route path={PATHS.HOME} element={<Home />} />
      <Route path={PATHS.LOGIN} element={<Login />} />
      <Route path={PATHS.SIGNUP} element={<SignUp />} />
      <Route path={PATHS.PROJECTS_BOARD} element={<ProjectMainBoard />} />
      <Route path={PATHS.PROJECT_DETAIL} element={<ProjectDetail />} />
      <Route path={PATHS.PROJECT_ANALYTICS} element={<ProjectAnalytics />} />
      <Route path={PATHS.ISSUE_DETAIL} element={<IssueDetail />} />
      <Route path={PATHS.CREATE_ISSUE} element={<CreateIssue />} />
    </Routes>
  );
};
