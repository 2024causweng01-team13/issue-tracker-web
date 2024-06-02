export enum IssuePriority {
  Blocker = 'BLOCKER',
  Critical = 'CRITICAL',
  Major = 'MAJOR',
  Minor = 'MINOR',
  Trivial = 'TRIVIAL',
}

export enum IssueStatus {
  New = 'NEW',
  Assigned = 'ASSIGNED',
  Resolved = 'RESOLVED',
  Closed = 'CLOSED',
  Reopened = 'REOPENED',
}

export enum ProjectStatus {
  Open = "OPEN",
	InProgress = "IN_PROGRESS",
	Done = "DONE",
	Closed = "CLOSED"
}
