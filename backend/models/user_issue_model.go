// models/user_issue.go

package models

type UserIssue struct {
	UserID  uint `gorm:"primaryKey" json:"user_id"`
	IssueID uint `gorm:"primaryKey" json:"issue_id"`
}
