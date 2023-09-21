// models/team_member.go

package models

type TeamMember struct {
	TeamID uint `gorm:"primaryKey" json:"team_id"`
	UserID uint `gorm:"primaryKey" json:"user_id"`
}
