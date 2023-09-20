package models

type Role struct {
	RoleID uint   `gorm:"primaryKey" json:"role_id"`
	Name   string `gorm:"not null" json:"name"`
}
