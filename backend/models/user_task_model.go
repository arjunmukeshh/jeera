// models/user_task.go

package models

type UserTask struct {
	UserID uint `gorm:"primaryKey" json:"user_id"`
	TaskID uint `gorm:"primaryKey" json:"task_id"`
}
