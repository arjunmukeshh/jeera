package models

import "time"

type Task struct {
	TaskID      uint      `gorm:"primaryKey" json:"task_id"`
	ProjectID   uint      `json:"project_id"`
	Name        string    `gorm:"not null" json:"name"`
	Description string    `json:"description"`
	Status      string    `gorm:"default:'to do'" json:"status"`
	Priority    string    `json:"priority"`
	CreatedAt   time.Time `gorm:"type:timestamp;default:CURRENT_TIMESTAMP" json:"created_at"`
}
