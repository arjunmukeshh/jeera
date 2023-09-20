package models

type LinkedIssue struct {
	IssueID       uint `gorm:"primaryKey" json:"issue_id"`
	LinkedIssueID uint `gorm:"primaryKey" json:"linked_issue_id"`
}
