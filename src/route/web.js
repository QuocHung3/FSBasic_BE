import express from "express";

import userController from "../controller/userController";
import homeController from "../controller/homeController";

let router = express.Router();

let initWebRoutes = (app) => {
  app.get("/", homeController.getHomePage);
  app.get("/crud", homeController.getCRUD);

  app.post("/post-crud", homeController.postCRUD);
  app.get("/get-crud", homeController.displayGetCRUD);
  app.get("/edit-crud", homeController.editCRUD);
  app.post("/put-crud", homeController.putCRUD);
  app.get("/delete-crud", homeController.deleteCRUD);

  app.post("/api/login", userController.handleLogin);
  app.get("/api/get-all-users", userController.handleGetAllUsers);

  return app.use("/", router);
};

module.exports = initWebRoutes;
