// models/team_role.go

package models

type TeamRole struct {
	TeamID uint `gorm:"primaryKey" json:"team_id"`
	RoleID uint `gorm:"primaryKey" json:"role_id"`
}
