package routes

import (
	"github.com/BalkanID-University/ssn-chennai-2023-fte-hiring-arjunmukeshh/controllers"
	"github.com/gofiber/fiber/v2"
)

func SetupIssueRoutes(app *fiber.App) {
	// Assuming these are the routes for managing issues under projects and tasks

	app.Post("/projects/:project_id/tasks/:task_id/issues/add", controllers.AddIssue)
	app.Get("/projects/:project_id/tasks/:task_id/issues", controllers.ViewAllIssues)
	app.Get("/projects/:project_id/tasks/:task_id/issues/:issue_id", controllers.ViewIssue)
	app.Delete("/projects/:project_id/tasks/:task_id/issues/:issue_id", controllers.DeleteIssue)
	app.Put("/projects/:project_id/tasks/:task_id/issues/:issue_id", controllers.UpdateIssue)

}
