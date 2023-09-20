// models/label.go

package models

type Label struct {
	LabelID uint   `gorm:"primaryKey" json:"label_id"`
	Name    string `gorm:"not null" json:"name"`
}
