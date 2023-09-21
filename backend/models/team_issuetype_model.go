// models/team_issue_type.go

package models

type TeamIssueType struct {
	TeamID      uint `gorm:"primaryKey" json:"team_id"`
	IssueTypeID uint `gorm:"primaryKey" json:"issue_type_id"`
}
