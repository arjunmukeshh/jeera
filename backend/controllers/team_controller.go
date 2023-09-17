package controllers

import (
	"errors"
	"fmt"
	"strconv"

	"github.com/BalkanID-University/ssn-chennai-2023-fte-hiring-arjunmukeshh/config"
	"github.com/BalkanID-University/ssn-chennai-2023-fte-hiring-arjunmukeshh/models"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

func ViewAllTeams(c *fiber.Ctx) error {
	var Teams []models.Team
	config.DB.Table("Teams").Find(&Teams)
	fmt.Print(Teams)
	return c.JSON(&Teams)
}

func AddTeam(c *fiber.Ctx) error {
	// Get the project ID from the request parameters
	var newTeam models.Team

	// Parse request body to get task details
	if err := c.BodyParser(&newTeam); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"success": false,
			"message": "Invalid request body",
		})
	}

	// Create the task
	config.DB.Table("Teams").Create(&newTeam)

	return c.Status(201).JSON(fiber.Map{
		"success": true,
		"message": "Task created successfully",
		"data":    newTeam,
	})
}

func DeleteTeam(c *fiber.Ctx) error {
	teamID := c.Params("team_id")

	// Check if the team exists
	var team models.Team
	result := config.DB.Table("Teams").First(&team, teamID)
	if errors.Is(result.Error, gorm.ErrRecordNotFound) {
		return c.Status(404).JSON(fiber.Map{
			"success": false,
			"message": "Team not found",
		})
	}

	// Delete the team
	config.DB.Table("Teams").Delete(&team)

	return c.Status(200).JSON(fiber.Map{
		"success": true,
		"message": "Team deleted successfully",
	})
}

// ViewTeamMembers retrieves the usernames of users belonging to a specific team
func ViewTeamMembers(c *fiber.Ctx) error {
	// Get the team ID from the request parameters
	teamID := c.Params("team_id")

	// Fetch team members from the database
	var teamMembers []models.TeamMember
	result := config.DB.Table("Team_Members").Where("team_id = ?", teamID).Find(&teamMembers)
	if result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"success": false,
			"message": "Failed to fetch team members",
		})
	}

	fmt.Print(teamMembers)
	// Fetch usernames based on user IDs
	var usernames []string
	for _, member := range teamMembers {
		var user models.User
		result := config.DB.Table("Users").First(&user, member.UserID)
		if result.Error != nil {
			continue // Skip if user not found
		}
		usernames = append(usernames, user.Username)
	}

	return c.JSON(fiber.Map{
		"success":   true,
		"usernames": usernames,
	})
}

func AddTeamMemberByUsername(c *fiber.Ctx) error {
	// Get the team ID and username from the request body
	type Request struct {
		Username string `json:"username"`
	}

	teamID := c.Params("team_id")
	var req Request
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"success": false,
			"message": "Invalid request body",
		})
	}

	// Check if the team exists
	var team models.Team
	result := config.DB.Table("Teams").First(&team, teamID)
	if result.Error != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"success": false,
			"message": "Team not found",
		})
	}

	// Check if the user exists
	var user models.User
	result = config.DB.Table("Users").Where("username = ?", req.Username).First(&user)
	if result.Error != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"success": false,
			"message": "User not found",
		})
	}

	// Check if the user is already a member of the team
	var existingMember models.TeamMember
	result = config.DB.Table("Team_Members").Where("team_id = ? AND user_id = ?", teamID, user.UserID).First(&existingMember)
	if result.RowsAffected > 0 {
		return c.Status(fiber.StatusConflict).JSON(fiber.Map{
			"success": false,
			"message": "User is already a member of the team",
		})
	}

	team_id, err := strconv.ParseUint(teamID, 10, 64)
	if err != nil {
		return err
	}
	tid := uint(team_id)
	// Create a new team member entry
	newMember := models.TeamMember{
		TeamID: tid,
		UserID: user.UserID,
	}

	result = config.DB.Table("Team_Members").Create(&newMember)
	if result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"success": false,
			"message": "Failed to add team member",
		})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"success": true,
		"message": "Team member added successfully",
		"data":    newMember,
	})
}

func RemoveTeamMemberByUsername(c *fiber.Ctx) error {
	// Get the team ID and username from the request body
	type Request struct {
		Username string `json:"username"`
	}
	teamID := c.Params("team_id")
	var req Request
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"success": false,
			"message": "Invalid request body",
		})
	}

	// Check if the team exists
	var team models.Team
	result := config.DB.Table("Teams").First(&team, teamID)
	if result.Error != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"success": false,
			"message": "Team not found",
		})
	}

	// Check if the user exists
	var user models.User
	result = config.DB.Table("Users").Where("username = ?", req.Username).First(&user)
	if result.Error != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"success": false,
			"message": "User not found",
		})
	}

	// Check if the user is a member of the team
	var existingMember models.TeamMember
	result = config.DB.Table("Team_Members").Where("team_id = ? AND user_id = ?", teamID, user.UserID).First(&existingMember)
	if result.RowsAffected == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"success": false,
			"message": "User is not a member of the team",
		})
	}

	// Remove the team member
	result = config.DB.Table("Team_Members").Delete(&existingMember)
	if result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"success": false,
			"message": "Failed to remove team member",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"success": true,
		"message": "Team member removed successfully",
		"data":    existingMember,
	})
}
