package config

import (
	"github.com/BalkanID-University/ssn-chennai-2023-fte-hiring-arjunmukeshh/models"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitDB() (*gorm.DB, error) {

	dsn := "root:example@tcp(localhost:3306)/Jeera?charset=utf8mb4&parseTime=True&loc=Local"

	// Open a database connection
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{
		PrepareStmt: true,
	})
	if err != nil {
		return nil, err
	}


	DB = db

	return db, nil
}

func AutoMigrateAllModels(db *gorm.DB) {
	db.AutoMigrate(&models.Issue{})
	db.AutoMigrate(&models.IssueLabel{})
	db.AutoMigrate(&models.IssueType{})
	db.AutoMigrate(&models.Label{})
	db.AutoMigrate(&models.LinkedIssue{})
	db.AutoMigrate(&models.Project{})
	db.AutoMigrate(&models.Role{})
	db.AutoMigrate(&models.RoleIssue{})
	db.AutoMigrate(&models.RoleProject{})
	db.AutoMigrate(&models.RoleTask{})
	db.AutoMigrate(&models.Task{})
	db.AutoMigrate(&models.Team{})
	db.AutoMigrate(&models.TeamIssueType{})
	db.AutoMigrate(&models.TeamMember{})
	db.AutoMigrate(&models.TeamProject{})
	db.AutoMigrate(&models.TeamRole{})
	db.AutoMigrate(&models.TeamTask{})
	db.AutoMigrate(&models.User{})
	db.AutoMigrate(&models.UserIssue{})
	db.AutoMigrate(&models.UserProject{})
	db.AutoMigrate(&models.UserRole{})
	db.AutoMigrate(&models.UserTask{})
	db.AutoMigrate(&models.UserTeam{})
}
