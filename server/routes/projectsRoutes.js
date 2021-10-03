const express = require("express");

const projectsController = require("../controllers/projectsController");

const projectsRouter = express.Router();

projectsRouter
    .route("/projects")
    .get(projectsController.getAllProjects)
    .post(projectsController.postProjects);

projectsRouter
    .route("/projects/accomplished")
    .get(projectsController.getAccomplishedProjects);

projectsRouter
    .route("/projects/ongoing")
    .get(projectsController.getOngoingProjects);

projectsRouter
    .route("/projects/updateViewCount/:id")
    .post(projectsController.updateViewCount);

projectsRouter
    .route("/projects/:id")
    .get(projectsController.getProject)
    .patch(projectsController.patchProject);

projectsRouter
    .route("/projects/update-projects/:id")
    .put(projectsController.updateProject);

module.exports = projectsRouter;