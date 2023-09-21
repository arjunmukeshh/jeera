package models

type ProjectsTeams struct {
	ProjectID  string `gorm:"column:project_id"`
	Teamname   string `gorm:"column:teamname"`
	WriteTasks string `gorm:"column:writeTasks"`
	WriteIssues string `gorm:"column:writeIssues"`
}
