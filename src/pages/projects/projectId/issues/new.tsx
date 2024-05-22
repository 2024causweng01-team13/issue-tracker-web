import { useParams } from "react-router-dom";

export const CreateIssue = () => {
  const { projectId } = useParams();

  return (
    <div>
      <h1>Create a new issue for Project {projectId}</h1>
    </div>
  )

}