package controllers

import (
	"github.com/BalkanID-University/ssn-chennai-2023-fte-hiring-arjunmukeshh/config"
	"github.com/BalkanID-University/ssn-chennai-2023-fte-hiring-arjunmukeshh/models"
	"github.com/gofiber/fiber/v2"
)

// AddIssue adds a new issue to a specific task in a project
func AddIssue(c *fiber.Ctx) error {
	var issue models.Issue

	// Parse the request body to get issue details
	if err := c.BodyParser(&issue); err != nil {
		return err
	}

	// Create the project in the database
	result := config.DB.Table("Issues").Create(&issue)
	if result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"success": false,
			"message": "Failed to create issue",
		})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"success": true,
		"message": "Issue created successfully",
		"data":    issue,
	})
}

// ViewAllIssues returns all issues in a specific task of a project
func ViewAllIssues(c *fiber.Ctx) error {

	var Issues []models.Issue
	config.DB.Table("Issues").Find(&Issues)
	return c.JSON(&Issues)

}

// ViewIssue returns details of a specific issue
func ViewIssue(c *fiber.Ctx) error {
	issueID := c.Params("issue_id")
	var issue models.Issue
	config.DB.Table("Issues").Where("issue_id=?", issueID).Find(&issue)
	return c.Status(200).JSON(fiber.Map{
		"success": true,
		"message": "Success",
		"data":    issue,
	})
}

// DeleteIssue deletes a specific issue
func DeleteIssue(c *fiber.Ctx) error {

	issue_id := c.Params("issue_id")
	var issue models.Issue
	result := config.DB.Table("Issues").First(&issue, issue_id)
	if result.Error != nil {
		return c.Status(404).JSON(fiber.Map{
			"success": false,
			"message": "Issue not found",
		})
	}

	// Delete the project
	config.DB.Table("Issues").Delete(&issue)
	return c.Status(200).JSON(fiber.Map{
		"success": true,
		"message": "Project deleted successfully",
	})
}

// UpdateIssue updates details of a specific issue
func UpdateIssue(c *fiber.Ctx) error {
	// Get the project ID from the request parameters
	issue_id := c.Params("user_id")

	// Check if the project exists
	var issue models.Issue
	result := config.DB.Table("Issues").First(&issue, issue_id)
	if result.Error != nil {
		return c.Status(404).JSON(fiber.Map{
			"success": false,
			"message": "Project not found",
		})
	}

	// Parse request body to get updated project details
	var updatedIssue models.Issue
	if err := c.BodyParser(&updatedIssue); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"success": false,
			"message": "Invalid request body",
		})
	}

	// Update project details
	config.DB.Table("Issues").Model(&issue).Updates(updatedIssue)

	return c.Status(200).JSON(fiber.Map{
		"success": true,
		"message": "Project updated successfully",
		"data":    issue,
	})
}
