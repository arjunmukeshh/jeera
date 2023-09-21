package middleware

import (
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt"
)

func AuthMiddleware(c *fiber.Ctx) error {
	// Get the token from the request header
	tokenString := c.Get("Authorization")

	// Parse the token
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return []byte(os.Getenv("JWT_SECRET")), nil
	})

	if err != nil || !token.Valid {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "Unauthorized",
		})
	}

	// Access the claims (payload) of the token
	claims := token.Claims.(jwt.MapClaims)
	username := claims["Issuer"].(string) // Assuming you set the Issuer as the username

	// Store the username in the context for later use
	c.Locals("username", username)

	// Proceed with the request
	return c.Next()
}
