package models

// ProjectsTeams represents the model for the ProjectsTeams table
type ProjectsTeams struct {
	ProjectID   string `gorm:"not null" json:"project_id"`
	Teamname    string `gorm:"not null" json:"teamname"`
	WriteTasks  string `gorm:"not null" json:"writeTasks"`
	WriteIssues string `gorm:"not null" json:"writeIssues"`
}
