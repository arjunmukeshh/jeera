// models/role_issue.go

package models

type RoleIssue struct {
	RoleID  uint `gorm:"primaryKey" json:"role_id"`
	IssueID uint `gorm:"primaryKey" json:"issue_id"`
}
