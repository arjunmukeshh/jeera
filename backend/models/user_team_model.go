// models/user_team.go

package models

type UserTeam struct {
	UserID uint `gorm:"primaryKey" json:"user_id"`
	TeamID uint `gorm:"primaryKey" json:"team_id"`
}
