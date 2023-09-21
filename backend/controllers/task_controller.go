package controllers

import (
	"github.com/BalkanID-University/ssn-chennai-2023-fte-hiring-arjunmukeshh/config"
	"github.com/BalkanID-University/ssn-chennai-2023-fte-hiring-arjunmukeshh/models"
	"github.com/gofiber/fiber/v2"
)

func AddTask(c *fiber.Ctx) error {
	// Get the project ID from the request parameters
	projectID := c.Params("project_id")

	var newTask models.Task

	// Parse request body to get task details
	if err := c.BodyParser(&newTask); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"success": false,
			"message": "Invalid request body",
		})
	}

	// Check if the associated project exists
	var project models.Project
	result := config.DB.Table("Projects").First(&project, projectID)
	if result.Error != nil {
		return c.Status(404).JSON(fiber.Map{
			"success": false,
			"message": "Associated project not found",
		})
	}

	// Set the project ID for the new task
	newTask.ProjectID = project.ProjectID

	// Create the task
	config.DB.Table("Tasks").Create(&newTask)

	return c.Status(201).JSON(fiber.Map{
		"success": true,
		"message": "Task created successfully",
		"data":    newTask,
	})
}



func ViewTasks(c *fiber.Ctx) error {
	// Get the project ID from the request parameters
	projectID := c.Params("project_id")
	userID := c.Params("user_id")
	var tasks []models.Task
	var wt[] models.ProjectsTeams
	// Retrieve all tasks associated with the project
	config.DB.Table("Tasks").Where("project_id = ?", projectID).Find(&tasks)
	
	config.DB.Raw(`select * from Projects_Teams where project_id=? and teamname IN(select name from teams where team_id IN(select team_id from team_members where user_id=?))`, projectID, userID).Scan(&wt)
	
	return c.Status(200).JSON(fiber.Map{
		"tasksjson": map[string]interface{}{
			"success": true,
			"data":    tasks,
		},
		"writejson":map[string]interface{}{
			"success":true,
			"data" : wt,
		},

	})
}

func ViewTask(c *fiber.Ctx) error {
	// Get the project and task IDs from the request parameters
	projectID := c.Params("project_id")
	taskID := c.Params("task_id")

	// Check if the associated project exists
	var project models.Project
	result := config.DB.Table("Projects").First(&project, projectID)
	if result.Error != nil {
		return c.Status(404).JSON(fiber.Map{
			"success": false,
			"message": "Associated project not found",
		})
	}

	// Check if the task exists within the project
	var task models.Task
	result = config.DB.Table("Tasks").Where("project_id = ? AND task_id = ?", projectID, taskID).First(&task)
	if result.Error != nil {
		return c.Status(404).JSON(fiber.Map{
			"success": false,
			"message": "Task not found within the project",
		})
	}

	return c.Status(200).JSON(fiber.Map{
		"success": true,
		"data":    task,
	})
}

func UpdateTask(c *fiber.Ctx) error {
	// Get the project and task IDs from the request parameters
	projectID := c.Params("project_id")
	taskID := c.Params("task_id")

	// Check if the associated project exists
	var project models.Project
	result := config.DB.Table("Projects").First(&project, projectID)
	if result.Error != nil {
		return c.Status(404).JSON(fiber.Map{
			"success": false,
			"message": "Associated project not found",
		})
	}

	// Check if the task exists within the project
	var task models.Task
	result = config.DB.Table("Tasks").Where("project_id = ? AND task_id = ?", projectID, taskID).First(&task)
	if result.Error != nil {
		return c.Status(404).JSON(fiber.Map{
			"success": false,
			"message": "Task not found within the project",
		})
	}

	// Parse request body to get updated task details
	var updatedTask models.Task
	if err := c.BodyParser(&updatedTask); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"success": false,
			"message": "Invalid request body",
		})
	}

	// Update task details
	config.DB.Table("Tasks").Model(&task).Updates(updatedTask)

	return c.Status(200).JSON(fiber.Map{
		"success": true,
		"message": "Task updated successfully",
		"data":    task,
	})
}

func DeleteTask(c *fiber.Ctx) error {
	// Get the project and task IDs from the request parameters
	projectID := c.Params("project_id")
	taskID := c.Params("task_id")

	// Check if the associated project exists
	var project models.Project
	result := config.DB.Table("Projects").First(&project, projectID)
	if result.Error != nil {
		return c.Status(404).JSON(fiber.Map{
			"success": false,
			"message": "Associated project not found",
		})
	}

	// Check if the task exists within the project
	var task models.Task
	result = config.DB.Table("Tasks").Where("project_id = ? AND task_id = ?", projectID, taskID).First(&task)
	if result.Error != nil {
		return c.Status(404).JSON(fiber.Map{
			"success": false,
			"message": "Task not found within the project",
		})
	}

	// Delete the task
	config.DB.Table("Tasks").Delete(&task)

	return c.Status(200).JSON(fiber.Map{
		"success": true,
		"message": "Task deleted successfully",
	})
}

func GetIssuesForTask(c *fiber.Ctx) error {
	taskID := c.Params("task_id")

	// Assuming you have a way to validate if the task_id is valid

	var issues []models.Issue
	result := config.DB.Table("Issues").Where("task_id = ?", taskID).Find(&issues)

	if result.Error != nil {
		return c.Status(500).JSON(fiber.Map{
			"success": false,
			"message": "Failed to get issues for task",
		})
	}

	return c.JSON(fiber.Map{
		"success": true,
		"message": "Issues for task retrieved successfully",
		"data":    issues,
	})
}
