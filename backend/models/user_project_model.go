// models/user_project.go

package models

type UserProject struct {
	UserID    uint `gorm:"primaryKey" json:"user_id"`
	ProjectID uint `gorm:"primaryKey" json:"project_id"`
}
