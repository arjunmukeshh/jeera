// models/team_project.go

package models

type TeamProject struct {
	TeamID    uint `gorm:"primaryKey" json:"team_id"`
	ProjectID uint `gorm:"primaryKey" json:"project_id"`
}
