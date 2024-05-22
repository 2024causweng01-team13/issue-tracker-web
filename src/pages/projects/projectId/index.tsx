import { useParams } from "react-router-dom";

export const ProjectDetail = () => {
  const { projectId } = useParams();

  return (
    <div>
      <h1>Project Detail for Project {projectId}</h1>
    </div>
  )
}
