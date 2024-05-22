import { useParams } from "react-router-dom";

export const ProjectAnalytics = () => {
  const { projectId } = useParams();

  return (
    <div>
      <h1>Analytics for Project {projectId}</h1>
    </div>
  )
}
