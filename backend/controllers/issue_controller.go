package controllers

import (
	"fmt"
	"strconv"

	"github.com/BalkanID-University/ssn-chennai-2023-fte-hiring-arjunmukeshh/config"
	"github.com/BalkanID-University/ssn-chennai-2023-fte-hiring-arjunmukeshh/models"
	"github.com/gofiber/fiber/v2"
)

type DummyIssue struct {
	IssueID     uint   `gorm:"primaryKey" json:"issue_id"`
	IssueTypeID string `json:"issue_type_id"`
	TaskID      string `json:"task_id"`
	Summary     string `gorm:"not null" json:"summary"`
	Attachments string `json:"attachments"`
	Description string `json:"description"`
	ReportsTo   string `json:"reports_to"`
	AssigneeID  string `json:"assignee_id"`
	Priority    string `json:"priority"`
	Label       string `json:"label"`
	Status      string `gorm:"default:'open'" json:"status"`
}

// AddIssue adds a new issue to a specific task in a project
func AddIssue(c *fiber.Ctx) error {
	var issue models.Issue
	var dummyIssue DummyIssue
	// Parse the request body to get issue details
	if err := c.BodyParser(&dummyIssue); err != nil {
		return err
	}

	fmt.Print(dummyIssue)
	issue.Summary = dummyIssue.Summary
	issue.Attachments = dummyIssue.Attachments
	issue.Description = dummyIssue.Description
	issue.Priority = dummyIssue.Priority
	issue.Label = dummyIssue.Label
	issue.Status = dummyIssue.Status

	IssueTypeID, err := strconv.ParseUint(dummyIssue.IssueTypeID, 10, 64)
	if err != nil {
		return err
	}
	issue.IssueTypeID = uint(IssueTypeID)

	reports_to, err := strconv.ParseUint(dummyIssue.ReportsTo, 10, 64)
	if err != nil {
		return err
	}
	issue.ReportsTo = uint(reports_to)

	assignee_id, err := strconv.ParseUint(dummyIssue.AssigneeID, 10, 64)
	if err != nil {
		return err
	}
	issue.AssigneeID = uint(assignee_id)

	dummyIssue.TaskID = c.Params("task_id")
	taskID, err := strconv.ParseUint(dummyIssue.TaskID, 10, 64)
	if err != nil {
		return err
	}
	issue.TaskID = uint(taskID)
	// Create the project in the database
	result := config.DB.Table("issues").Create(&issue)
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

// ViewAllissues returns all issues in a specific task of a project
func ViewAllIssues(c *fiber.Ctx) error {

	task_id := c.Params("task_id")
	var issues []models.Issue
	config.DB.Table("issues").Where("task_id = ?", task_id).Find(&issues)
	return c.JSON(&issues)

}

// ViewIssue returns details of a specific issue
func ViewIssue(c *fiber.Ctx) error {
	issueID := c.Params("issue_id")
	var issue models.Issue
	config.DB.Table("issues").Where("issue_id=?", issueID).Find(&issue)
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
	result := config.DB.Table("issues").First(&issue, issue_id)
	if result.Error != nil {
		return c.Status(404).JSON(fiber.Map{
			"success": false,
			"message": "Issue not found",
		})
	}

	// Delete the project
	config.DB.Table("issues").Delete(&issue)
	return c.Status(200).JSON(fiber.Map{
		"success": true,
		"message": "Project deleted successfully",
	})
}

// UpdateIssue updates details of a specific issue
func UpdateIssue(c *fiber.Ctx) error {
	// Get the project ID from the request parameters
	issue_id := c.Params("issue_id")
	var issue models.Issue
	var dummyIssue DummyIssue
	// Parse the request body to get issue details
	if err := c.BodyParser(&dummyIssue); err != nil {
		return err
	}

	fmt.Print(dummyIssue)
	issue.Summary = dummyIssue.Summary
	issue.Attachments = dummyIssue.Attachments
	issue.Description = dummyIssue.Description
	issue.Priority = dummyIssue.Priority
	issue.Label = dummyIssue.Label
	issue.Status = dummyIssue.Status

	IssueTypeID, err := strconv.ParseUint(dummyIssue.IssueTypeID, 10, 64)
	if err != nil {
		return err
	}
	issue.IssueTypeID = uint(IssueTypeID)

	reports_to, err := strconv.ParseUint(dummyIssue.ReportsTo, 10, 64)
	if err != nil {
		return err
	}
	issue.ReportsTo = uint(reports_to)

	assignee_id, err := strconv.ParseUint(dummyIssue.AssigneeID, 10, 64)
	if err != nil {
		return err
	}
	issue.AssigneeID = uint(assignee_id)

	dummyIssue.TaskID = c.Params("task_id")
	taskID, err := strconv.ParseUint(dummyIssue.TaskID, 10, 64)
	if err != nil {
		return err
	}
	issue.TaskID = uint(taskID)
	// Check if the project exists
	result := config.DB.Table("issues").First(&issue, issue_id)
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
	config.DB.Table("issues").Model(&issue).Updates(updatedIssue)

	return c.Status(200).JSON(fiber.Map{
		"success": true,
		"message": "Project updated successfully",
		"data":    issue,
	})
}
