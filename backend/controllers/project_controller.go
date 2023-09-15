package controllers

import (
	"github.com/BalkanID-University/ssn-chennai-2023-fte-hiring-arjunmukeshh/config"
	"github.com/BalkanID-University/ssn-chennai-2023-fte-hiring-arjunmukeshh/models"
	"github.com/gofiber/fiber/v2"
)

func GetAllProjects(c *fiber.Ctx) error {
	var Projects []models.Project
	config.DB.Table("Projects").Find(&Projects)
	return c.JSON(&Projects)
}

func GetProject(c *fiber.Ctx) error {
	var Project models.Project
	project_id := c.Params("project_id")

	config.DB.Table("Projects").Where("project_id = ?", project_id).First(&Project)

	return c.JSON(&Project)
}

func AddProject(c *fiber.Ctx) error {
	var project models.Project

	// Parse the request body to get project details
	if err := c.BodyParser(&project); err != nil {
		return err
	}

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
