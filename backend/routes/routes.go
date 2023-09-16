package routes

import "github.com/gofiber/fiber/v2"

func SetupRoutes(app *fiber.App) {
	SetupUserRoutes(app)
	SetupProjectRoutes(app)
	SetupTaskRoutes(app)
	SetupIssueRoutes(app)
}

func SetupProtectedRoutes(app *fiber.App) {
	SetupProtectedUserRoutes(app)
	SetupProtectedProjectRoutes(app)
}
