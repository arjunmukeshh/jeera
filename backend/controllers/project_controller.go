package controllers

import (
	"strconv"
	"time"

	"github.com/BalkanID-University/ssn-chennai-2023-fte-hiring-arjunmukeshh/config"
	"github.com/BalkanID-University/ssn-chennai-2023-fte-hiring-arjunmukeshh/models"
	"github.com/gofiber/fiber/v2"
)

func GetAllProjects(c *fiber.Ctx) error {
	var Projects []models.Project
	config.DB.Table("Projects").Find(&Projects)
	return c.JSON(&Projects)
}

func GetProjectsByUser(c *fiber.Ctx) error {
	username := c.Params("username")

	var admin bool
	var projects []models.Project
	config.DB.Raw(`select isAdmin from Users where username=?`, username).First(&admin)
	if admin {
		config.DB.Raw(`select * from Projects`).Scan(&projects)
	} else {
		config.DB.Raw(`
		select * from Projects where project_id IN(select project_id from Projects_Teams where teamname IN(select name from Teams where team_id IN (select team_id from Team_Members where user_id=(select user_id from Users where username=?))))
	`, username).Scan(&projects)
	}

	return c.JSON(&projects)
}

func GetProject(c *fiber.Ctx) error {
	var Project models.Project
	project_id := c.Params("project_id")

	config.DB.Table("Projects").Where("project_id = ?", project_id).First(&Project)

	return c.JSON(&Project)
}

func AddProject(c *fiber.Ctx) error {
	var project models.Project
	var dummy struct {
		ProjectID    uint      `gorm:"primaryKey" json:"project_id"`
		Name         string    `gorm:"not null" json:"name"`
		Description  string    `json:"description"`
		MaintainerID string    `json:"maintainer_id"`
		CreatedAt    time.Time `gorm:"type:timestamp;default:CURRENT_TIMESTAMP" json:"created_at"`
	}
	// Parse the request body to get project details
	if err := c.BodyParser(&dummy); err != nil {
		return err
	}

	project.ProjectID = dummy.ProjectID
	project.Name = dummy.Name
	project.Description = dummy.Description
	project.CreatedAt = dummy.CreatedAt
	maintainerID, err := strconv.ParseUint(dummy.MaintainerID, 10, 64)
	if err != nil {
		return err
	}
	project.MaintainerID = uint(maintainerID)
	// Create the project in the database
	result := config.DB.Table("Projects").Create(&project)
	if result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"success": false,
			"message": "Failed to create project",
		})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"success": true,
		"message": "Project created successfully",
		"data":    project,
	})
}

func DeleteProject(c *fiber.Ctx) error {
	// Get the project ID from the request parameters
	projectID := c.Params("id")

	// Check if the project exists
	var project models.Project
	result := config.DB.Table("Projects").First(&project, projectID)
	if result.Error != nil {
		return c.Status(404).JSON(fiber.Map{
			"success": false,
			"message": "Project not found",
		})
	}

	// Delete the project
	config.DB.Table("Projects").Delete(&project)

	return c.Status(200).JSON(fiber.Map{
		"success": true,
		"message": "Project deleted successfully",
	})
}

func UpdateProject(c *fiber.Ctx) error {
	// Get the project ID from the request parameters
	projectID := c.Params("id")

	// Check if the project exists
	var project models.Project
	result := config.DB.Table("Projects").First(&project, projectID)
	if result.Error != nil {
		return c.Status(404).JSON(fiber.Map{
			"success": false,
			"message": "Project not found",
		})
	}

	// Parse request body to get updated project details
	var updatedProject models.Project
	if err := c.BodyParser(&updatedProject); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"success": false,
			"message": "Invalid request body",
		})
	}

	// Update project details
	config.DB.Table("Projects").Model(&project).Updates(updatedProject)

	return c.Status(200).JSON(fiber.Map{
		"success": true,
		"message": "Project updated successfully",
		"data":    project,
	})
}
