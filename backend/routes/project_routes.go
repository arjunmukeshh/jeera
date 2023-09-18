package routes

import (
	"github.com/BalkanID-University/ssn-chennai-2023-fte-hiring-arjunmukeshh/controllers"
	"github.com/gofiber/fiber/v2"
)

func SetupProjectRoutes(app *fiber.App) {
	app.Get("/projects", controllers.GetAllProjects)
	app.Get("/projects/:project_id", controllers.GetProject)
	app.Post("/projects/add", controllers.AddProject)
	app.Get("/projects/delete/:id", controllers.DeleteProject)  //ToBe Protected
	app.Post("/projects/update/:id", controllers.UpdateProject) //ToBe Protected
	app.Get("/user/:username/projects", controllers.GetProjectsByUser)

}

func SetupProtectedProjectRoutes(app *fiber.App) {

}
