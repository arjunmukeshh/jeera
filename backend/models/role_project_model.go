// models/role_project.go

package models

type RoleProject struct {
	RoleID    uint `gorm:"primaryKey" json:"role_id"`
	ProjectID uint `gorm:"primaryKey" json:"project_id"`
}
