package models

type Issue struct {
	IssueID     uint   `gorm:"primaryKey" json:"issue_id"`
	IssueTypeID uint   `json:"issue_type_id"`
	TaskID      uint   `json:"task_id"`
	Summary     string `gorm:"not null" json:"summary"`
	Attachments string `json:"attachments"`
	Description string `json:"description"`
	ReportsTo   uint   `json:"reports_to"`
	AssigneeID  uint   `json:"assignee_id"`
	Priority    string `json:"priority"`
	Label       string `json:"label"`
	Status      string `gorm:"default:'open'" json:"status"`
}
