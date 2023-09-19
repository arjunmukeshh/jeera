package routes

import (
	"github.com/BalkanID-University/ssn-chennai-2023-fte-hiring-arjunmukeshh/controllers"
	"github.com/gofiber/fiber/v2"
)

func SetupProjectTeamsRoutes(app *fiber.App) {
	app.Get("/projects/:projectID/teams", controllers.GetTeamsByProjectID)
	app.Post("/projects/:projectID/teams", controllers.AddTeamToProject)
	app.Delete("/projects/:project_id/:teamname", controllers.DeleteProjectsTeam)
	app.Get("/projects/:user_id/:project_id", controllers.GetProjectTeamsByUserIDAndProjectID)
}
