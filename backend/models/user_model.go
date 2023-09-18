package models

type User struct {
	UserID   uint   `gorm:"primaryKey" json:"user_id"`
	Username string `gorm:"unique;not null" json:"username"`
	FullName string `gorm:"not null" json:"full_name"`
	EmailID  string `gorm:"unique;not null" json:"email_id"`
	Password string `gorm:"not null" json:"password"`
	IsAdmin  bool   `gorm:"column:isAdmin;default:false" json:"isAdmin"`
	Active   string `gorm:"default:1" json:"active"`
}
