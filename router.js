import Router from "express";
import DataController from "./DataController.js";

const router = new Router();
const dataController = new DataController();

router.post("/create-client", (req, res) =>
  dataController.createClient(req, res)
);
router.post("/login", (req, res) => dataController.login(req, res));
router.get("/check-login", (req, res) => dataController.checkLogin(req, res));
router.put("/edit-profile", (req, res) => dataController.editProfile(req, res));

export default router;
