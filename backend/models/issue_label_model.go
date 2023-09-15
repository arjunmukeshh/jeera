// models/issue_label.go

package models

type IssueLabel struct {
	IssueID uint `gorm:"primaryKey" json:"issue_id"`
	LabelID uint `gorm:"primaryKey" json:"label_id"`
}
