import { Home } from "@/pages";
import { useUser } from "@/pages/UserContext";
import { Login } from "@/pages/login";
import ProjectMainBoard from "@/pages/projects";
import ProjectDetail from "@/pages/projects/projectId";
import ProjectAnalytics from "@/pages/projects/projectId/analytics";
import IssueDetail from "@/pages/projects/projectId/issues/issueId";
import CreateIssue from "@/pages/projects/projectId/new";
import { SignUp } from "@/pages/sign-up";
import { Navigate, Route, Routes } from "react-router-dom";

export const PATHS = {
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/sign-up",
  PROJECTS_BOARD: "/projects",
  CREATE_PROJECT: "/projects/new",
  PROJECT_DETAIL: "/projects/:projectId",
  PROJECT_ANALYTICS: "/projects/:projectId/analytics",
  ISSUE_DETAIL: "/issuedetail/:id",
  CREATE_ISSUE: "/projects/:projectId/new",
};

export const Router = () => {
  const { isLoggedIn } = useUser();

  const AUTH_PATHS = [PATHS.LOGIN, PATHS.SIGNUP];
  const UNAUTH_PATHS = Object.values(PATHS).filter((path) => !AUTH_PATHS.includes(path));

  return (
    <Routes>
      {isLoggedIn ? (
        <>
          {AUTH_PATHS.map(
            (path) => (
              <Route path={PATHS[path as keyof typeof PATHS]} element={<Navigate to={PATHS.PROJECTS_BOARD} />} />
            )
          )}
          <Route path={PATHS.HOME} element={<Home />} />
          <Route path={PATHS.PROJECTS_BOARD} element={<ProjectMainBoard />} />
          <Route path={PATHS.PROJECT_DETAIL} element={<ProjectDetail />} />
          <Route path={PATHS.PROJECT_ANALYTICS} element={<ProjectAnalytics />} />
          <Route path={PATHS.ISSUE_DETAIL} element={<IssueDetail />} />
          <Route path={PATHS.CREATE_ISSUE} element={<CreateIssue />} />
        </>
      ) : 
        <>
          {UNAUTH_PATHS.map(
            (path) => (
              <Route path={PATHS[path as keyof typeof PATHS]} element={<Navigate to={PATHS.LOGIN} />} />
            )
          )}
          <Route path={PATHS.LOGIN} element={<Login />} />
          <Route path={PATHS.SIGNUP} element={<SignUp />} />
        </>
      }
    </Routes>
  );
};
