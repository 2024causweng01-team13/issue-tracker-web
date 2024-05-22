import { useParams } from "react-router-dom";

export const IssueDetail = () => {
  const { projectId, issueId } = useParams();

  return (
    <div>
      <h1>Issue Detail for Issue {issueId} in Project {projectId}</h1>
    </div>
  )
}