// models/role_task.go

package models

type RoleTask struct {
	RoleID uint `gorm:"primaryKey" json:"role_id"`
	TaskID uint `gorm:"primaryKey" json:"task_id"`
}
