package routes

import (
	"github.com/BalkanID-University/ssn-chennai-2023-fte-hiring-arjunmukeshh/controllers"
	"github.com/gofiber/fiber/v2"
)

func SetupTeamRoutes(app *fiber.App) {
	app.Delete("/teams/:team_id", controllers.DeleteTeam)
	app.Get("/teams", controllers.ViewAllTeams)
	app.Post("/teams", controllers.AddTeam)

	app.Get("/teams/:team_id/members", controllers.ViewTeamMembers)
	app.Post("/teams/:team_id/add_member", controllers.AddTeamMemberByUsername)
	app.Delete("/teams/:team_id/remove_member", controllers.RemoveTeamMemberByUsername)
}
