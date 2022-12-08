/*
Contributor' Router
This router contains all endpoints for the Tithe entit
*/
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const contributorCtrl = require("../controllers/contributorController");

router.get("/", contributorCtrl.getAll);

// router.get("/:actives", contributorCtrl.getActives);

router.get("/:id", contributorCtrl.get);

router.post("/", contributorCtrl.create);

router.post("/:id", contributorCtrl.update);

router.delete("/:id", auth, contributorCtrl.remove);

router.get("/:id/contribution", contributorCtrl.contributions);

router.post("/:id/contribution", contributorCtrl.addContribution);

router.post("/:id/contribution/:id_contrib", contributorCtrl.updateContribution);

router.delete("/:id/contribution/:id_contrib", contributorCtrl.removeContribution);

router.post("/:id/child", contributorCtrl.addChild);

//router.param('id', contributorCtrl.load);

module.exports = router;
