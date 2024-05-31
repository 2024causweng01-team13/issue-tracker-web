export interface Issue {
  id: number;
  title: string;
  description: string;
  reporter: string;
  reportedDate?: string;
  fixer: string;
  assignee: string;
  priority: 'Blocker' | 'Critical' | 'Major' | 'Minor' | 'Trivial';
  status: 'New' | 'Assigned' | 'Resolved' | 'Closed' | 'Reopened';
  comments: Comment[];
  keyword:string;
}


export interface Comment {
  id: number;
  content: string;
  commentedDate: Date;
  commentedBy: string;
}

