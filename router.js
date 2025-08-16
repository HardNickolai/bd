import Router from "express";
import DataController from "./DataController.js";

const router = new Router();
const dataController = new DataController();

router.post("/create-client",  (req, res) => dataController.createClient(req, res));
router.post("/login",  (req, res) => dataController.login(req, res));

export default router;
