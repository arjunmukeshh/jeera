// models/issue_type.go

package models

type IssueType struct {
	IssueTypeID uint   `gorm:"primaryKey" json:"issue_type_id"`
	Name        string `gorm:"not null" json:"name"`
}
