package main

import (
	"github.com/BalkanID-University/ssn-chennai-2023-fte-hiring-arjunmukeshh/config"
	"github.com/BalkanID-University/ssn-chennai-2023-fte-hiring-arjunmukeshh/middleware"
	"github.com/BalkanID-University/ssn-chennai-2023-fte-hiring-arjunmukeshh/routes"
	"github.com/gofiber/fiber/v2"
)

func main() {
	_, err := config.InitDB()
	if err != nil {
		panic("Failed to connect to the database: " + err.Error())
	}

	app := fiber.New()

	// Define your Fiber routes and start your server here

	routes.SetupRoutes(app)

	//Authorized routes
	app.Use(middleware.AuthMiddleware)

	routes.SetupProtectedRoutes(app)

	app.Listen(":3000")
}
