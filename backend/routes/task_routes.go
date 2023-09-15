package routes

import (
	"strconv"

	"github.com/BalkanID-University/ssn-chennai-2023-fte-hiring-arjunmukeshh/controllers"
	"github.com/gofiber/fiber/v2"
)

func SetupTaskRoutes(app *fiber.App) {
	app.Post("/projects/:project_id/tasks", controllers.AddTask)

	app.Get("/projects/:project_id/tasks", controllers.ViewTasks)

	app.Get("/projects/:project_id/tasks/:task_id", controllers.ViewTask)

	app.Put("/projects/:project_id/tasks/:task_id", controllers.UpdateTask)

	app.Delete("/projects/:project_id/tasks/:task_id", controllers.DeleteTask)
	app.Get("/tasks/:task_id/issues", func(c *fiber.Ctx) error {
		taskID := c.Params("task_id")

		// Validate if taskID is a valid uint
		if _, err := strconv.ParseUint(taskID, 10, 64); err != nil {
			return c.Status(400).JSON(fiber.Map{
				"success": false,
				"message": "Invalid task ID",
			})
		}

		// Call the controller function to get issues for the task
		return controllers.GetIssuesForTask(c)
	})
}

func SetupProtectedTaskRoutes(app *fiber.App) {

}
