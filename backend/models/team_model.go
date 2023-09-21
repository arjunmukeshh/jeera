// models/team.go

package models

type Team struct {
	TeamID      uint   `gorm:"primaryKey" json:"team_id"`
	Name        string `gorm:"not null" json:"name"`
	Description string `json:"description"`
}
