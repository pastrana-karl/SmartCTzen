const express = require("express");

const projectsController = require("../controllers/projectsController");

const projectsRouter = express.Router();

projectsRouter
    .route("/projects")
    .get(projectsController.getAllProjects)
    .post(projectsController.postProjects);

projectsRouter
    .route("/projects/:id")
    .get(projectsController.getProject)
    .patch(projectsController.patchProject);

projectsRouter
    .route("/projects/accomplished")
    .get(projectsController.aliasAccomplishedProjects);

projectsRouter
    .route("/projects/ongoing")
    .get(projectsController.aliasOngoingProjects);

module.exports = projectsRouter;