package controllers

import (
	"fmt"
	"os"
	"time"

	"github.com/BalkanID-University/ssn-chennai-2023-fte-hiring-arjunmukeshh/config"
	"github.com/BalkanID-University/ssn-chennai-2023-fte-hiring-arjunmukeshh/models"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt"
	"golang.org/x/crypto/bcrypt"
)

func GetUserDetails(c *fiber.Ctx) error {
	var user models.User
	username := c.Params("username")
	config.DB.Raw(`select * from Users where username = ?`, username).Scan(&user)
	return c.JSON(&user)
}
func GetAllUsers(c *fiber.Ctx) error {
	var Users []models.User
	config.DB.Table("Users").Find(&Users)
	return c.JSON(&Users)
}

func UpdateUserStatus(c *fiber.Ctx) error {
	username := c.Params("username")

	var request struct {
		Active string `json:"active"`
	}

	if err := c.BodyParser(&request); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid request body",
		})
	}

	var user models.User
	if result := config.DB.Table("Users").Where("username = ?", username).First(&user); result.Error != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "User not found",
		})
	}

	// Update user status
	user.Active = request.Active
	config.DB.Table("Users").Model(&user).Update("active", request.Active)

	return c.JSON(fiber.Map{
		"message": "User status updated successfully",
	})
}

func Login(c *fiber.Ctx) error {
	username := c.Params("username")
	var data map[string]string

	err := c.BodyParser(&data)

	if err != nil {
		return c.Status(400).JSON(fiber.Map{
			"success": false,
			"message": "Invalid Post request",
		})
	}

	//check if password is empty
	if data["password"] == "" {
		return c.Status(400).JSON(fiber.Map{
			"success": false,
			"message": "Password is required",
			"error":   map[string]interface{}{},
		})
	}
	var user models.User
	config.DB.Table("Users").Where("username = ?", username).First(&user)

	//check if user exist
	if user.Username == "" {
		return c.Status(404).JSON(fiber.Map{
			"success": false,
			"message": "User Not found",
			"error":   map[string]interface{}{},
		})
	}

	if user.Active == "0" {
		return c.Status(405).JSON(fiber.Map{
			"success": false,
			"message": "User not active",
			"error":   map[string]interface{}{},
		})
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(data["password"]))
	if err != nil {
		return c.Status(401).JSON(fiber.Map{
			"success": false,
			"message": "Passwords Do Not Match",
			"error":   map[string]interface{}{},
		})
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"Issuer":    user.Username,
		"ExpiresAt": time.Now().Add(time.Hour * 24).Unix(), //1 day
	})
	tokenString, err := token.SignedString([]byte(os.Getenv("JWT_SECRET")))
	if err != nil {
		return c.Status(401).JSON(fiber.Map{
			"success": false,
			"message": "Token Expired or invalid",
		})
	}

	userData := make(map[string]interface{})
	userData["Authorization"] = tokenString

	return c.Status(200).JSON(fiber.Map{
		"success": true,
		"message": "Success",
		"data":    userData,
		"isAdmin": user.IsAdmin,
	})
}

func Logout(c *fiber.Ctx) error {
	username := c.Params("username")
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return err
	}

	// Check if passcode is empty
	if data["password"] == "" {
		return c.Status(400).JSON(fiber.Map{
			"success": false,
			"Message": "Passcode is required",
		})
	}

	var user models.User
	config.DB.Table("Users").Where("username = ?", username).First(&user)

	// Check if user exists
	if user.Username == "" {
		return c.Status(404).JSON(fiber.Map{
			"success": false,
			"Message": "User Not found",
		})
	}

	// Compare hashed passwords
	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(data["password"]))
	if err != nil {
		return c.Status(401).JSON(fiber.Map{
			"success": false,
			"Message": "Passwords Do Not Match",
		})
	}

	// If passwords match, perform logout actions

	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    "",
		Expires:  time.Now().Add(-time.Hour),
		HTTPOnly: true,
	}

	c.Cookie(&cookie)

	return c.Status(200).JSON(fiber.Map{
		"success": true,
		"Message": "Success, logged out",
	})
}

func RegisterUser(c *fiber.Ctx) error {
	var user models.User

	// Parse the request body into the user struct
	if err := c.BodyParser(&user); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"success": false,
			"message": "Invalid request",
		})
	}

	fmt.Println(user.Password)
	// Check if username, full name, email, and password are provided
	if user.Username == "" || user.FullName == "" || user.EmailID == "" || user.Password == "" {
		return c.Status(400).JSON(fiber.Map{
			"success": false,
			"message": "Username, Full Name, Email, and Password are required",
		})
	}

	// Check if username and email are unique
	var existingUser models.User
	config.DB.Table("Users").Where("username = ?", user.Username).Or("email_id = ?", user.EmailID).First(&existingUser)
	if existingUser.Username != "" || existingUser.EmailID != "" {
		return c.Status(400).JSON(fiber.Map{
			"success": false,
			"message": "Username or Email already exists",
		})
	}

	// Hash the password before storing it
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"success": false,
			"message": "Internal Server Error",
		})
	}
	user.Password = string(hashedPassword)

	// Create the user in the database
	if err := config.DB.Table("Users").Create(&user).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{
			"success": false,
			"message": "Failed to create user",
		})
	}

	return c.Status(201).JSON(fiber.Map{
		"success": true,
		"message": "User registered successfully",
	})
}

func DeleteUserByUsername(c *fiber.Ctx) error {
	username := c.Params("username")

	// Check if username is provided
	if username == "" {
		return c.Status(400).JSON(fiber.Map{
			"success": false,
			"message": "Username is required",
		})
	}

	var user models.User
	config.DB.Table("Users").Where("username = ?", username).First(&user)

	// Check if user exists
	if user.Username == "" {
		return c.Status(404).JSON(fiber.Map{
			"success": false,
			"message": "User Not found",
		})
	}

	// Delete the user from the database
	if err := config.DB.Table("Users").Where("username = ?", username).Delete(&user).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{
			"success": false,
			"message": "Failed to delete user",
		})
	}

	return c.Status(200).JSON(fiber.Map{
		"success": true,
		"message": "User deleted successfully",
	})
}
