package controllers

import (
	"fmt"

	"github.com/BalkanID-University/ssn-chennai-2023-fte-hiring-arjunmukeshh/config"
	"github.com/BalkanID-University/ssn-chennai-2023-fte-hiring-arjunmukeshh/models"
	"github.com/gofiber/fiber/v2"
)

func GetTeamsByProjectID(c *fiber.Ctx) error {
	projectID := c.Params("projectID")

	if projectID == "" {
		return c.Status(400).JSON(fiber.Map{
			"success": false,
			"message": "Project ID is required",
		})
	}

	var teams []models.Team

	// Assuming you have a model called `Projects_Teams` with foreign keys `project_id` and `teamname`
	config.DB.Table("Teams").Joins("JOIN Projects_Teams ON Teams.name = Projects_Teams.teamname").
		Where("Projects_Teams.project_id = ?", projectID).Find(&teams)

	return c.JSON(&teams)
}

func AddTeamToProject(c *fiber.Ctx) error {
	projectID := c.Params("projectID")

	// Assuming you have a model called `Projects_Teams` with fields `project_id`, `teamname`, and `write`
	var projectTeam models.ProjectsTeams

	// Parse the request body into the projectTeam struct
	if err := c.BodyParser(&projectTeam); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"success": false,
			"message": "Invalid request",
		})
	}

	// Set the project ID from the route parameter
	projectTeam.ProjectID = projectID

	fmt.Print(projectTeam)
	// Check if project ID, team name, and write value are provided
	if projectTeam.ProjectID == "" || projectTeam.Teamname == "" {
		return c.Status(400).JSON(fiber.Map{
			"success": false,
			"message": "Project ID, Team Name, and Write value are required",
		})
	}

	// Assuming you have a model called `Projects_Teams`
	if err := config.DB.Table("Projects_Teams").Create(&projectTeam).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{
			"success": false,
			"message": "Failed to add team to project",
		})
	}

	return c.Status(201).JSON(fiber.Map{
		"success": true,
		"message": "Team added to project successfully",
	})
}

func DeleteProjectsTeam(c *fiber.Ctx) error {
	// Get project ID and team name from URL parameters
	projectID := c.Params("project_id")
	teamname := c.Params("teamname")

	// Delete the entry from Projects_Teams
	result := config.DB.Table("Projects_Teams").Where("project_id = ? AND teamname = ?", projectID, teamname).Delete(nil)

	if result.Error != nil {
		return c.Status(500).JSON(fiber.Map{
			"success": false,
			"message": "Failed to delete entry from Projects_Teams",
		})
	}

	return c.Status(200).JSON(fiber.Map{
		"success": true,
		"message": "Entry deleted successfully",
	})
}

func GetProjectTeamsByUserIDAndProjectID(c *fiber.Ctx) error {
	userID := c.Params("user_id")
	projectID := c.Params("project_id")

	if userID == "" || projectID == "" {
		return c.Status(400).JSON(fiber.Map{
			"success": false,
			"message": "User ID and Project ID are required",
		})
	}

	var projectTeams []models.ProjectsTeams

	// Assuming you have a model called `Projects_Teams` with fields `project_id`, `teamname`, and `write`
	config.DB.Raw(`select * from Projects_Teams where project_id=? and teamname IN(select name from Teams where team_id IN(select team_id from Team_Members where user_id=?))`, projectID, userID).Scan(&projectTeams)

	return c.JSON(&projectTeams)
}
