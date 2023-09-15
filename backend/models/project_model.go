package models

import "time"

type Project struct {
	ProjectID    uint      `gorm:"primaryKey" json:"project_id"`
	Name         string    `gorm:"not null" json:"name"`
	Description  string    `json:"description"`
	MaintainerID uint      `json:"maintainer_id"`
	CreatedAt    time.Time `gorm:"type:timestamp;default:CURRENT_TIMESTAMP" json:"created_at"`
}
