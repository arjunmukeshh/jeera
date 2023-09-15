// models/team_task.go

package models

type TeamTask struct {
	TeamID uint `gorm:"primaryKey" json:"team_id"`
	TaskID uint `gorm:"primaryKey" json:"task_id"`
}
