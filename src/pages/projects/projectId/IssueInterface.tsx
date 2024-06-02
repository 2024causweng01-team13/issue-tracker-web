import { IssuePriority, IssueStatus } from "@/apis/enums";

export interface Issue {
  id: number;
  title: string;
  description?: string;
  reporterName: string;
  assigneeName?: string;
  fixerName?: string;
  priority: IssuePriority;
  status: IssueStatus;
  comments: Comment[];
  createdAt: Date;
  updatedAt: Date;
}


export interface Comment {
  id: number;
  content: string;
  authorName: string;
  createdAt: Date;
}

