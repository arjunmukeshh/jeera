package routes

import (
	"github.com/BalkanID-University/ssn-chennai-2023-fte-hiring-arjunmukeshh/controllers"
	"github.com/gofiber/fiber/v2"
)

func SetupUserRoutes(app *fiber.App) {
	// Define routes related to users
	app.Get("/users", controllers.GetAllUsers)
	app.Post("/user/:username/login", controllers.Login)
	app.Post("/user/:username/logout", controllers.Logout)
	app.Post("/user/register", controllers.RegisterUser)
	app.Delete("/users/:username", controllers.DeleteUserByUsername)
	app.Get("/users/:username/details", controllers.GetUserDetails)
	app.Put("/users/:username", controllers.UpdateUserStatus)

}

func SetupProtectedUserRoutes(app *fiber.App) {
	// app.Get("/protected-route", controllers.ProtectedTest)
}
